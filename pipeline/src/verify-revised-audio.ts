/** Verify a versioned release: public bytes, full decode, duration and independent STT.
 * API contract: https://openrouter.ai/blog/tutorials/transcription-on-openrouter/
 * Only generated public learning audio is sent; no learner recordings or records.
 */
import "dotenv/config";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { QUESTIONS } from "../../data/questions";
const version = process.argv[2];
if (!version || !/^[a-z0-9-]+$/.test(version)) throw new Error("Pass a safe release version");
const dir = fileURLToPath(new URL(`../output/audio-revisions/${version}/`, import.meta.url));
const digest = (buf: Buffer) => createHash("sha256").update(buf).digest("hex");
const tokens = (text: string) => text.toLowerCase().replace(/’/g, "'")
  .replace(/\bi've\b/g,"i have").replace(/\bthey're\b/g,"they are").replace(/\bdidn't\b/g,"did not")
  .replace(/\b4\b/g,"four").replace(/[^a-z0-9 ]/g," ").split(/\s+/).filter(Boolean);
function wordErrorRate(expected: string, actual: string) {
  const a=tokens(expected), b=tokens(actual);
  let row=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++) {
    const next=[i];
    for(let j=1;j<=b.length;j++) next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));
    row=next;
  }
  return row[b.length]/Math.max(1,a.length);
}
async function main() {
  const results=[];
  for(const file of readdirSync(dir).filter(f=>/^p2-gen-\d+\.json$/.test(f)).sort()) {
    const manifest=JSON.parse(readFileSync(dir+file,"utf8"));
    const question=QUESTIONS.find(q=>q.id===manifest.id);
    const scripted=question && [question.question, ...(["A","B","C"] as const).map(letter=>`Letter ${letter}. ${question.choices[letter]}`)];
    if(!scripted || JSON.stringify(scripted)!==JSON.stringify(manifest.segments.map((s:{text:string})=>s.text))) throw new Error(`${manifest.id}: manifest differs from current question text`);
    const bytes=readFileSync(manifest.localFile);
    const remote=await fetch(manifest.url,{signal:AbortSignal.timeout(30_000)});
    if(!remote.ok || digest(Buffer.from(await remote.arrayBuffer()))!==manifest.audioSha256 || digest(bytes)!==manifest.audioSha256) throw new Error(`${manifest.id}: public bytes differ`);
    const wav=manifest.localFile.replace(/\.mp3$/,".wav");
    execFileSync("ffmpeg",["-v","error","-y","-i",manifest.localFile,"-ac","1","-ar","16000",wav]);
    const duration=Number(execFileSync("ffprobe",["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",wav],{encoding:"utf8"}).trim());
    if(!Number.isFinite(duration) || duration<3 || duration>60) throw new Error(`${manifest.id}: suspicious duration`);
    const transcriptFile=dir+manifest.id+".transcript.json";
    let transcription;
    if(existsSync(transcriptFile)) transcription=JSON.parse(readFileSync(transcriptFile,"utf8"));
    else {
      const response=await fetch(`${process.env.OPENROUTER_BASE_URL??"https://openrouter.ai/api/v1"}/audio/transcriptions`,{
        method:"POST",signal:AbortSignal.timeout(90_000),
        headers:{Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`,"Content-Type":"application/json"},
        body:JSON.stringify({model:"openai/whisper-1",input_audio:{data:readFileSync(wav).toString("base64"),format:"wav"},language:"en"}),
      });
      if(!response.ok) throw new Error(`Transcription HTTP ${response.status}`);
      transcription=await response.json();
      writeFileSync(transcriptFile,JSON.stringify(transcription,null,2));
    }
    const expected=manifest.segments.map((s:{text:string})=>s.text).join(" ");
    const actual=transcription.text;
    if(typeof actual!=="string") throw new Error(`${manifest.id}: missing transcript`);
    const wer=wordErrorRate(expected,actual);
    const passed=wer<=0.12;
    const result={id:manifest.id,url:manifest.url,audioSha256:manifest.audioSha256,duration,expected,transcript:actual,wordErrorRate:wer,passed};
    results.push(result);
    console.log(JSON.stringify(result));
  }
  writeFileSync(dir+"verification.json",JSON.stringify(results,null,2));
  if(results.length!==4 || results.some(r=>!r.passed)) throw new Error("Four passing recordings required");
}
main().catch(error=>{console.error(error instanceof Error ? error.message : "Audio verification failed");process.exitCode=1;});
