/** Event-driven visible time and audible playback overlap, in milliseconds. */
export function createStudyClock() {
  let lastAt = 0;
  let running = false;
  let hidden = false;
  let activeMs = 0;
  let hiddenMs = 0;
  let audioMs = 0;
  const playing = new Set<string>();

  function tick(now: number) {
    const elapsed = Math.max(0, now - lastAt);
    lastAt = now;
    if (!running) return;
    if (hidden) hiddenMs += elapsed;
    else {
      activeMs += elapsed;
      if (playing.size > 0) audioMs += elapsed;
    }
  }
  return {
    start(now: number, isHidden = false) {
      lastAt = now;
      running = true;
      hidden = isHidden;
      activeMs = hiddenMs = audioMs = 0;
      // A shared conversation can continue across question changes.
    },
    setHidden(isHidden: boolean, now: number) { tick(now); hidden = isHidden; },
    setAudioPlaying(id: string, audible: boolean, now: number) {
      tick(now);
      if (audible) playing.add(id);
      else playing.delete(id);
    },
    snapshot(now: number) {
      tick(now);
      return { activeMs, hiddenMs, audioMs, wallMs: activeMs + hiddenMs };
    },
    finish(now: number) {
      tick(now);
      running = false;
      return { activeMs, hiddenMs, audioMs, wallMs: activeMs + hiddenMs };
    },
  };
}
