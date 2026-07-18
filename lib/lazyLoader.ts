/**
 * Memoized lazy loader for the big data-bank chunks. `load()` dedupes
 * concurrent calls and clears the pending promise on rejection so a transient
 * chunk-fetch failure can be retried; `get()` gives synchronous access after
 * `load()` has resolved and throws `notLoadedMessage` otherwise.
 */
export function createLazyLoader<T>(
  importer: () => Promise<T>,
  notLoadedMessage: string,
): { load: () => Promise<T>; get: () => T; isLoaded: () => boolean } {
  let loaded: T | null = null;
  let pending: Promise<T> | null = null;

  function load(): Promise<T> {
    if (loaded !== null) return Promise.resolve(loaded);
    pending ??= importer().then(
      (value) => {
        loaded = value;
        return value;
      },
      (error: unknown) => {
        pending = null;
        throw error;
      },
    );
    return pending;
  }

  return {
    load,
    get: () => {
      if (loaded === null) throw new Error(notLoadedMessage);
      return loaded;
    },
    isLoaded: () => loaded !== null,
  };
}
