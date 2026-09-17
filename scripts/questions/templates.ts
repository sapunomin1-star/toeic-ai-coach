import type { Part } from "../../types/question";

/** Deliberately incomplete; validation prevents accidentally publishing a template. */
export function createPackDraft(id: string, part: Part = "Part 5") {
  const count =
    part === "Part 6"
      ? 4
      : part === "Part 3" || part === "Part 4"
        ? 3
        : part === "Part 7"
          ? 2
          : 1;
  const listening = part === "Part 3" || part === "Part 4";
  const reading = part === "Part 6" || part === "Part 7";
  const letters = part === "Part 2" ? ["A", "B", "C"] : ["A", "B", "C", "D"];
  return {
    schemaVersion: 1,
    id,
    title: "請填寫題庫名稱",
    questions: Array.from({ length: count }, (_, index) => ({
      id: `p${part.slice(-1)}-${id}-${String(index + 1).padStart(3, "0")}`,
      part,
      question: part === "Part 6" ? `____(${letters[index]})____` : "",
      choices: Object.fromEntries(letters.map((letter) => [letter, ""])),
      answer: "",
      explanation_zh: "",
      skill_tag:
        part === "Part 1"
          ? "listening_photo"
          : part === "Part 2"
            ? "listening_response"
            : listening
              ? "listening_detail"
              : part === "Part 7"
                ? "reading_detail"
                : "tense",
      difficulty: "B1",
      vocabulary: [],
      ...(listening ? { transcript: "", question_order: index + 1 } : {}),
      ...(reading
        ? {
            passage:
              part === "Part 6"
                ? "____(A)____ … ____(B)____ … ____(C)____ … ____(D)____"
                : "",
            passage_group_id: `${id}-group-001`,
            question_order: index + 1,
          }
        : {}),
      ...(part === "Part 7" ? { passage_group_type: "single" } : {}),
      ...(part === "Part 1"
        ? { imageAlt: "", audioScript: "(A) \n(B) \n(C) \n(D) " }
        : {}),
      ...(part === "Part 2" ? { audioScript: "Q: \n(A) \n(B) \n(C) " } : {}),
    })),
  };
}
