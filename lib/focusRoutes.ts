/**
 * Routes with in-progress answering state. AppShell hides its chrome here,
 * and SyncProvider must never remount the page subtree mid-test — a pulled
 * update waits until the user leaves these routes.
 */
export const FOCUS_ROUTES = [
  "/quiz",
  "/mock-test",
  "/listening-mock",
  "/full-mock",
] as const;

export function isWithinRoute(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function isFocusRoute(pathname: string): boolean {
  return FOCUS_ROUTES.some((route) => isWithinRoute(pathname, route));
}
