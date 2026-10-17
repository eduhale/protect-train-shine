import { describe, expect, it } from "vitest";
import { certificateEligibility, scorePercent } from "@/lib/certificate";

const ok = { attended: true, practical_done: true, score: 80, hours_completed: 3 };

describe("certificate rules", () => {
  it("is eligible when all requirements are met", () => {
    expect(certificateEligibility(ok, 70).eligible).toBe(true);
  });
  it("blocks without the practical activity", () => {
    expect(certificateEligibility({ ...ok, practical_done: false }, 70).eligible).toBe(false);
  });
  it("blocks when score is below the minimum", () => {
    expect(certificateEligibility({ ...ok, score: 60 }, 70).eligible).toBe(false);
  });
  it("blocks without attendance", () => {
    expect(certificateEligibility({ ...ok, attended: false }, 70).eligible).toBe(false);
  });
  it("computes percentage score", () => {
    expect(scorePercent([0, 1, 2, null], [0, 1, 0, 3])).toBe(50);
  });
});
