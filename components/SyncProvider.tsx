"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { isFocusRoute } from "@/lib/focusRoutes";
import {
  initSyncEngine,
  initialPull,
  subscribeSyncDataChanges,
} from "@/lib/syncEngine";

const OVERLAY_TIMEOUT_MS = 2500;

/**
 * Children ALWAYS render (pages are statically prerendered; hiding them on
 * first client render would be a hydration mismatch). When sync is enabled,
 * an overlay covers the initial pull, and any pull that changed local data
 * remounts the page subtree (key bump) so mount-time localStorage reads
 * rerun — except on focus routes, where the remount waits until the user
 * leaves the test.
 */
export default function SyncProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const pendingRemount = useRef(false);
  const [epoch, setEpoch] = useState(0);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const applyOrDefer = useCallback(() => {
    if (isFocusRoute(pathnameRef.current)) {
      pendingRemount.current = true;
      return;
    }
    setEpoch((value) => value + 1);
  }, []);

  useEffect(() => {
    if (!initSyncEngine()) return;
    // Deferred one tick: the overlay must not be part of the hydration
    // render, and effect bodies must not set state synchronously.
    const showTimer = setTimeout(() => setOverlay(true), 0);
    const hideTimer = setTimeout(() => setOverlay(false), OVERLAY_TIMEOUT_MS);
    let cancelled = false;
    void initialPull().then(({ changedKeys }) => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      if (cancelled) return;
      setOverlay(false);
      if (changedKeys.length > 0) applyOrDefer();
    });
    const unsubscribe = subscribeSyncDataChanges(() => applyOrDefer());
    return () => {
      cancelled = true;
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      unsubscribe();
    };
  }, [applyOrDefer]);

  useEffect(() => {
    if (pendingRemount.current && !isFocusRoute(pathname)) {
      pendingRemount.current = false;
      setEpoch((value) => value + 1);
    }
  }, [pathname]);

  return (
    <>
      <div key={epoch} style={{ display: "contents" }}>
        {children}
      </div>
      {overlay && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
        >
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm">
            同步中…
          </div>
        </div>
      )}
    </>
  );
}
