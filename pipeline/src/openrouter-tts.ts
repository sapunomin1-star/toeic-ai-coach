import "dotenv/config";

export type Accent = "US" | "UK" | "CA";
export type VoiceHint = "male" | "female";
export type KokoroVoice =
  | "af_bella"
  | "af_nicole"
  | "af_jessica"
  | "af_sarah"
  | "af_nova"
  | "am_michael"
  | "am_adam"
  | "am_eric"
  | "am_liam"
  | "am_onyx"
  | "am_echo"
  | "bf_emma"
  | "bf_alice"
  | "bf_isabella"
  | "bf_lily"
  | "bm_lewis"
  | "bm_daniel"
  | "bm_george"
  | "bm_fable";

const DEFAULT_MODEL = "hexgrad/kokoro-82m";
const FALLBACK_MODEL = "openai/gpt-4o-mini-tts";
const DEFAULT_BASE_URL = "https://openrouter.ai/api/v1";

const VOICE_POOLS: Record<"US" | "UK", Record<VoiceHint, readonly KokoroVoice[]>> = {
  US: {
    female: ["af_bella", "af_nicole", "af_jessica", "af_sarah", "af_nova"],
    male: ["am_michael", "am_adam", "am_eric", "am_liam", "am_onyx", "am_echo"],
  },
  UK: {
    female: ["bf_emma", "bf_alice", "bf_isabella", "bf_lily"],
    male: ["bm_lewis", "bm_daniel", "bm_george", "bm_fable"],
  },
};

const warnedFallbackAccents = new Set<"CA">();
let modelFallbackCount = 0;

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function supportedAccent(accent: Accent): "US" | "UK" {
  if (accent === "CA") {
    if (!warnedFallbackAccents.has(accent)) {
      console.warn("Kokoro no CA, using US");
      warnedFallbackAccents.add(accent);
    }
    return "US";
  }
  return accent;
}

export function pickVoice(
  accent: Accent,
  voiceHint: VoiceHint = "female",
  speakerSeed: string = voiceHint,
): KokoroVoice {
  const pool = VOICE_POOLS[supportedAccent(accent)][voiceHint];
  return pool[hashSeed(`${accent}:${speakerSeed}`) % pool.length];
}

export function getTtsFallbackCount(): number {
  return modelFallbackCount;
}

function fallbackVoice(voiceHint?: VoiceHint): "alloy" | "nova" | "onyx" {
  if (voiceHint === "female") return "nova";
  if (voiceHint === "male") return "onyx";
  return "alloy";
}

async function requestSpeech(
  baseUrl: string,
  apiKey: string,
  body: { model: string; input: string; voice: string; response_format: "mp3" },
): Promise<Response> {
  return fetch(`${baseUrl}/audio/speech`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

/**
 * Generates MP3 speech through OpenRouter's OpenAI-compatible endpoint.
 *
 * Endpoint source checked 2026-05-26:
 * https://openrouter.ai/docs/features/multimodal/tts
 *
 * Kokoro voices encode US/UK accent directly; CA is mapped to the closest
 * supported North American pool. Only server errors trigger the American
 * OpenAI fallback.
 */
export async function generateSpeech(opts: {
  text: string;
  accent: Accent;
  voiceHint?: VoiceHint;
  speakerSeed?: string;
  voice?: KokoroVoice;
}): Promise<Buffer> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not set");
  if (!opts.text.trim()) throw new Error("TTS input text must not be empty");

  const baseUrl = (process.env.OPENROUTER_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
  const model = process.env.OPENROUTER_TTS_MODEL ?? DEFAULT_MODEL;
  const voice = opts.voice ?? pickVoice(opts.accent, opts.voiceHint, opts.speakerSeed);
  let response = await requestSpeech(baseUrl, apiKey, {
    model,
    input: opts.text,
    voice,
    response_format: "mp3",
  });

  if (response.status >= 500 && model === DEFAULT_MODEL) {
    modelFallbackCount++;
    console.warn(`Kokoro TTS returned ${response.status}; falling back to ${FALLBACK_MODEL} with US voice`);
    response = await requestSpeech(baseUrl, apiKey, {
      model: FALLBACK_MODEL,
      input: opts.text,
      voice: fallbackVoice(opts.voiceHint),
      response_format: "mp3",
    });
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (!response.ok) {
    throw new Error(
      `OpenRouter TTS error (${response.status}): ${bytes.toString("utf8").slice(0, 300)}`,
    );
  }
  return bytes;
}
