// useScrollProgress removed: kept as a no-op stub to avoid leftover imports during refactor.
// If you want to reintroduce a scroll progress hook, implement it here.
export const useScrollProgress = () =>
  ({ progress: 0, isAtBottom: false } as const);
