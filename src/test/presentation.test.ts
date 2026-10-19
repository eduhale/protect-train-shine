import { describe, it, expect } from "vitest";
import { clampSlide } from "@/lib/presentation";
describe("presentation navigation", () => {
  it("does not go before the first slide", () => expect(clampSlide(-1, 10)).toBe(0));
  it("does not go after the last slide", () => expect(clampSlide(10, 10)).toBe(9));
  it("can go back and forward", () => { expect(clampSlide(4, 10)).toBe(4); expect(clampSlide(2, 10)).toBe(2); });
});