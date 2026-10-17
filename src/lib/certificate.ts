export interface CertInput {
  attended: boolean;
  practical_done: boolean;
  score: number | null;
  hours_completed: number;
}

/** Certificate only after attendance, practical activity, minimum score and recorded hours. */
export function certificateEligibility(p: CertInput, minScore: number) {
  const reasons: string[] = [];
  if (!p.attended) reasons.push("Presença não registrada");
  if (!p.practical_done) reasons.push("Atividade prática não registrada");
  if (p.score == null) reasons.push("Avaliação não realizada");
  else if (p.score < minScore) reasons.push(`Nota abaixo do mínimo (${minScore})`);
  if (!(p.hours_completed > 0)) reasons.push("Carga horária cumprida não informada");
  return { eligible: reasons.length === 0, reasons };
}

export function makeVerificationCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  const arr = crypto.getRandomValues(new Uint8Array(10));
  for (const b of arr) s += chars[b % chars.length];
  return `CT-${s.slice(0, 5)}-${s.slice(5)}`;
}

export function scorePercent(answers: (number | null)[], correct: number[]) {
  if (!correct.length) return 0;
  const ok = correct.filter((c, i) => answers[i] === c).length;
  return Math.round((ok / correct.length) * 100);
}
