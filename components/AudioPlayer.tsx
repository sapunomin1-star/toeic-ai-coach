"use client";

import { useRef, useState } from "react";

type AudioPlayerProps = {
  src: string;
  autoPlay?: boolean;
  allowReplay?: boolean;
  onEnded?: () => void;
};

type AudioStatus = "idle" | "loading" | "playing" | "buffering" | "ended" | "error";

export default function AudioPlayer({
  src,
  autoPlay = false,
  allowReplay = false,
  onEnded,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<AudioStatus>("idle");
  const [progress, setProgress] = useState(0);

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
        onPlaying={() => setStatus("playing")}
        onWaiting={() => setStatus("buffering")}
        onError={() => setStatus("error")}
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
