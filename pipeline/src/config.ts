import dotenv from "dotenv";
dotenv.config({ override: true });

export const config = {
  deepseek: {
    apiKey: process.env.DEEPSEEK_API_KEY ?? "",
    model: process.env.DEEPSEEK_MODEL ?? "deepseek-chat",
    baseUrl:
      process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com/v1",
  },
  kimi: {
    apiKey: process.env.KIMI_API_KEY ?? "",
    model: process.env.KIMI_MODEL ?? "moonshot-v1-8k",
    baseUrl:
      process.env.KIMI_BASE_URL ?? "https://api.moonshot.cn/v1",
  },
} as const;

export function checkConfig(): string[] {
  const errors: string[] = [];
  if (!config.deepseek.apiKey)
    errors.push("DEEPSEEK_API_KEY is not set");
  if (!config.kimi.apiKey) errors.push("KIMI_API_KEY is not set");
  return errors;
}
