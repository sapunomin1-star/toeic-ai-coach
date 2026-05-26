import "dotenv/config";

export type Accent = "US" | "UK" | "AU" | "CA";
export type VoiceHint = "male" | "female";

const DEFAULT_MODEL = "openai/gpt-4o-mini-tts-2025-12-15";
const DEFAULT_BASE_URL = "https://openrouter.ai/api/v1";

const ACCENT_INSTRUCTIONS: Record<Accent, string> = {
  US: "Speak clearly in a natural American English accent at TOEIC test speed.",
  UK: "Speak clearly in a natural British English accent at TOEIC test speed.",
  AU: "Speak clearly in a natural Australian English accent at TOEIC test speed.",
  CA: "Speak clearly in a natural Canadian English accent at TOEIC test speed.",
};

const VOICES: Record<VoiceHint, readonly string[]> = {
  male: ["echo", "onyx"],
  female: ["nova", "shimmer"],
};

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function pickVoice(
  accent: Accent,
  voiceHint: VoiceHint | undefined,
  speakerSeed: string | undefined,
): string {
  if (!voiceHint) return "alloy";
  const options = VOICES[voiceHint];
  return options[hashSeed(`${accent}:${speakerSeed ?? voiceHint}`) % options.length];
}

/**
 * Generates an MP3 through OpenRouter's OpenAI-compatible speech endpoint.
 *
 * Source verified 2026-05-26:
 * https://openrouter.ai/docs/features/multimodal/tts
 * The default model was also verified by GET /api/v1/models?output_modalities=speech
 * and a minimal MP3 probe against POST /api/v1/audio/speech on that date.
 */
export async function generateSpeech(opts: {
  text: string;
  accent: Accent;
  voiceHint?: VoiceHint;
  speakerSeed?: string;
}): Promise<Buffer> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }
  if (!opts.text.trim()) {
    throw new Error("TTS input text must not be empty");
  }

  const baseUrl = (process.env.OPENROUTER_BASE_URL ?? DEFAULT_BASE_URL).replace(
    /\/+$/,
    "",
  );
  const model = process.env.OPENROUTER_TTS_MODEL ?? DEFAULT_MODEL;
  const response = await fetch(`${baseUrl}/audio/speech`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: opts.text,
      voice: pickVoice(opts.accent, opts.voiceHint, opts.speakerSeed),
      response_format: "mp3",
      provider: {
        options: {
          openai: {
            instructions: ACCENT_INSTRUCTIONS[opts.accent],
          },
        },
      },
    }),
  });

  const bytes = Buffer.from(await response.arrayBuffer());
  if (!response.ok) {
    throw new Error(
      `OpenRouter TTS error (${response.status}): ${bytes.toString("utf8").slice(0, 300)}`,
    );
  }
  return bytes;
}
