import { config } from "./config";
import { traditionalizeDeep } from "./traditionalize";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type LLMResponse = {
  content: string;
  model: string;
  usage?: { promptTokens: number; completionTokens: number };
};

type UsageEntry = {
  calls: number;
  promptTokens: number;
  completionTokens: number;
};

const usageByModel = new Map<string, UsageEntry>();

export function getLlmUsage(): Record<string, UsageEntry> {
  return Object.fromEntries(usageByModel.entries());
}

async function chatCompletion(
  baseUrl: string,
  apiKey: string,
  model: string,
  messages: ChatMessage[],
  temperature = 0.7,
  maxTokens = 8192
): Promise<LLMResponse> {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(
      `LLM API error (${response.status}): ${errText.slice(0, 500)}`
    );
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[];
    model: string;
    usage?: { prompt_tokens: number; completion_tokens: number };
  };

  const usage = data.usage
    ? {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
      }
    : undefined;
  const entry = usageByModel.get(data.model) ?? {
    calls: 0,
    promptTokens: 0,
    completionTokens: 0,
  };
  entry.calls += 1;
  entry.promptTokens += usage?.promptTokens ?? 0;
  entry.completionTokens += usage?.completionTokens ?? 0;
  usageByModel.set(data.model, entry);

  return {
    content: data.choices[0]?.message?.content ?? "",
    model: data.model,
    usage,
  };
}

/** DeepSeek v4 Pro — primary question generation model */
export async function deepseek(
  systemPrompt: string,
  userPrompt: string,
  temperature = 0.8
): Promise<LLMResponse> {
  return chatCompletion(
    config.deepseek.baseUrl,
    config.deepseek.apiKey,
    config.deepseek.model,
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature,
    8192
  );
}

/** Kimi 2.6 — Chinese explanation optimization */
export async function kimi(
  systemPrompt: string,
  userPrompt: string
): Promise<LLMResponse> {
  return chatCompletion(
    config.kimi.baseUrl,
    config.kimi.apiKey,
    config.kimi.model,
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    0.5,
    1024
  );
}

/** Extract JSON array from LLM response (handles markdown code fences) */
export function extractJsonArray(text: string): string {
  // Try to find JSON array inside markdown code fences
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) return fenceMatch[1].replace(/^json\s*/i, "").trim();

  // Strip leading "json" or other prefix before the array
  const stripped = text.replace(/^json\s*/i, "").trim();

  // Try to find bare JSON array
  const arrayMatch = stripped.match(/\[\s*\{[\s\S]*\}\s*\]/);
  if (arrayMatch) return arrayMatch[0].trim();

  // Return stripped text — let caller try to parse
  return stripped;
}

/** Parse JSON array from LLM response with retry logic */
export function parseGeneratedJson(text: string): unknown[] {
  const cleaned = extractJsonArray(text);
  try {
    return traditionalizeDeep(JSON.parse(cleaned) as unknown[]);
  } catch {
    // Try repairing common issues
    const repaired = cleaned
      .replace(/,\s*]/g, "]") // trailing comma before ]
      .replace(/,\s*}/g, "}") // trailing comma before }
      .replace(/```/g, ""); // stray backticks
    return traditionalizeDeep(JSON.parse(repaired) as unknown[]);
  }
}
