"use client";

import { useEffect, useRef, useState } from "react";

type AudioPlayerProps = {
  src: string;
  autoPlay?: boolean;
  allowReplay?: boolean;
  onPlaybackStart?: () => void;
  onEnded?: () => void;
  onError?: () => void;
};

type AudioStatus = "idle" | "loading" | "playing" | "buffering" | "ended" | "error";

export default function AudioPlayer({
  src,
  autoPlay = false,
  allowReplay = false,
  onPlaybackStart,
  onEnded,
  onError,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const teardownTimer = useRef<number | null>(null);
  const [status, setStatus] = useState<AudioStatus>("idle");
  const [progress, setProgress] = useState(0);

  // A media element removed from the DOM keeps playing its audio (HTML spec),
  // so navigating to another question mid-playback would overlap two tracks
  // with no way to stop the old one. Stop it on unmount. The teardown is a
  // cancelable 0ms timeout: StrictMode's dev-only mount→cleanup→mount cycle
  // re-enters the effect before the timer fires, so autoplay is not killed.
  useEffect(() => {
    if (teardownTimer.current !== null) {
      window.clearTimeout(teardownTimer.current);
      teardownTimer.current = null;
    }
    const audio = audioRef.current;
    return () => {
      teardownTimer.current = window.setTimeout(() => {
        if (!audio) return;
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      }, 0);
    };
  }, []);

  const isReplayBlocked = status === "ended" && !allowReplay;
  const isBusy = status === "loading" || status === "buffering";
  const isPlaying = status === "playing";

  async function play() {
    const audio = audioRef.current;
    if (!audio || isReplayBlocked) return;

    if (status === "ended" && allowReplay) {
      audio.currentTime = 0;
      setProgress(0);
    }

    try {
      setStatus("loading");
      await audio.play();
      setStatus("playing");
    } catch {
      setStatus("error");
    }
  }

  function retry() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setStatus("idle");
    setProgress(0);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        autoPlay={autoPlay}
        onCanPlay={() => {
          if (status === "loading" || status === "buffering") {
            setStatus("idle");
          }
        }}
        onPlaying={() => {
          setStatus("playing");
          onPlaybackStart?.();
        }}
        onWaiting={() => setStatus("buffering")}
        onError={() => {
          setStatus("error");
          onError?.();
        }}
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          if (!audio.duration || Number.isNaN(audio.duration)) return;
          setProgress((audio.currentTime / audio.duration) * 100);
        }}
        onEnded={() => {
          setStatus("ended");
          setProgress(100);
          onEnded?.();
        }}
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={status === "error" ? retry : play}
          disabled={isReplayBlocked || isBusy}
          aria-label={status === "error" ? "重試載入音檔" : "播放音檔"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white disabled:bg-slate-300"
        >
          {status === "error" ? "↻" : isPlaying ? "▶" : "▶"}
        </button>
        <div className="min-w-0 flex-1">
          <div
            className="h-2 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label={`音檔播放進度 ${Math.round(progress)}%`}
          >
            <div
              className="h-full bg-indigo-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          {status === "error" ? (
            <p className="mt-1 text-xs text-rose-600">音檔載入失敗</p>
          ) : (
            <p className="mt-1 text-xs text-slate-500">
              {isBusy ? "載入音檔中…" : isReplayBlocked ? "音檔已播放完畢" : "聽力音檔"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
