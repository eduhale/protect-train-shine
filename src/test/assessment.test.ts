import { expect, it } from "vitest";
import { canAttempt } from "@/lib/assessment";
it("blocks an assessment after the configured maximum attempts", () => { expect(canAttempt(1, 2)).toBe(true); expect(canAttempt(2, 2)).toBe(false); });