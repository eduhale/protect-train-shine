export function clampSlide(index: number, count: number) {
  return Math.max(0, Math.min(Math.max(0, count - 1), Number.isFinite(index) ? Math.floor(index) : 0));
}