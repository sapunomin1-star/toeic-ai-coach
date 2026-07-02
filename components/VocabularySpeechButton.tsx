"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";

type SpeechStatus = "idle" | "playing" | "error";

type ActivePlayback = {
  ownerId: string;
  /** Unique per speak() call so a click during the voice-list wait supersedes the older one. */
  token: symbol;
  reset: () => void;
};

let activePlayback: ActivePlayback | null = null;

const PREFERRED_US_VOICES = [
  "Samantha",
  "Google US English",
  "Microsoft Aria Online",
  "Microsoft Jenny Online",
  "Alex",
];

const VOCABULARY_SPEECH_RATE = 0.8;

function getPreferredVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const usVoices = voices.filter((voice) => voice.lang.toLowerCase() === "en-us");

  for (const preferredName of PREFERRED_US_VOICES) {
    const match = usVoices.find((voice) => voice.name.includes(preferredName));
    if (match) return match;
  }

  return (
    usVoices.find((voice) => voice.localService) ??
    usVoices[0] ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith("en"))
  );
}

function stopCurrentSpeech(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const current = activePlayback;
  activePlayback = null;
  window.speechSynthesis.cancel();
  current?.reset();
}

/**
 * Chrome (and some Safari versions) populate getVoices() asynchronously: the
 * first call returns [] until `voiceschanged` fires. Speaking at that moment
 * falls back to the system default voice — often non-English on a zh-TW
 * machine. Wait briefly for the list before picking a voice.
 */
function waitForVoices(): Promise<void> {
  const synth = window.speechSynthesis;
  if (synth.getVoices().length > 0) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => {
      window.clearTimeout(timer);
      synth.removeEventListener("voiceschanged", done);
      resolve();
    };
    const timer = window.setTimeout(done, 300);
    synth.addEventListener("voiceschanged", done);
  });
}

function subscribeToSpeechSupport(): () => void {
  return () => {};
}

function getSpeechSupport(): boolean {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window
  );
}

export default function VocabularySpeechButton({
  text,
  label,
  variant = "icon",
}: {
  text: string;
  label: string;
  variant?: "icon" | "text";
}) {
  const ownerId = useId();
  const supported = useSyncExternalStore(
    subscribeToSpeechSupport,
    getSpeechSupport,
    () => false,
  );
  const [status, setStatus] = useState<SpeechStatus>("idle");

  useEffect(() => {
    return () => {
      if (activePlayback?.ownerId !== ownerId) return;
      window.speechSynthesis.cancel();
      activePlayback = null;
    };
  }, [ownerId]);

  // Kick off the async voice-list load at mount so the first click usually
  // finds the preferred en-US voice already cached.
  useEffect(() => {
    if (supported) window.speechSynthesis.getVoices();
  }, [supported]);

  async function speak(): Promise<void> {
    if (!supported || !text.trim()) return;

    stopCurrentSpeech();

    const token = Symbol("speech-playback");
    activePlayback = {
      ownerId,
      token,
      reset: () => setStatus("idle"),
    };
    setStatus("playing");

    await waitForVoices();
    // A newer click (any button) took over while the voice list loaded.
    if (activePlayback?.token !== token) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getPreferredVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = "en-US";
    utterance.rate = VOCABULARY_SPEECH_RATE;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setStatus("playing");
    utterance.onend = () => {
      if (activePlayback?.ownerId === ownerId) activePlayback = null;
      setStatus("idle");
    };
    utterance.onerror = (event) => {
      if (activePlayback?.ownerId === ownerId) activePlayback = null;
      setStatus(
        event.error === "canceled" || event.error === "interrupted"
          ? "idle"
          : "error",
      );
    };

    window.speechSynthesis.speak(utterance);
  }

  const accessibleLabel = supported
    ? `${status === "playing" ? "重新播放" : "播放"}${label}，固定 0.8 倍速`
    : "此瀏覽器不支援語音播放";

  if (variant === "text") {
    return (
      <button
        type="button"
        onClick={speak}
        disabled={!supported}
        aria-label={accessibleLabel}
        title={accessibleLabel}
        className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
          supported
            ? status === "error"
              ? "border-rose-200 bg-rose-50 text-rose-700"
              : "border-indigo-200 bg-indigo-50 text-indigo-700 active:scale-[0.98]"
            : "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
        }`}
      >
        <span aria-hidden="true" className={status === "playing" ? "animate-pulse" : ""}>
          {status === "error" ? "↻" : "🔊"}
        </span>
        <span>{status === "error" ? "重試例句" : label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={speak}
      disabled={!supported}
      aria-label={accessibleLabel}
      title={accessibleLabel}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-base transition ${
        supported
          ? status === "error"
            ? "border-rose-200 bg-rose-50 text-rose-700"
            : "border-indigo-200 bg-indigo-50 text-indigo-700 active:scale-[0.96]"
          : "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
      } ${status === "playing" ? "animate-pulse" : ""}`}
    >
      <span aria-hidden="true">{status === "error" ? "↻" : "🔊"}</span>
    </button>
  );
}
