import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { sessionsQuery, participantsQuery, settingsQuery, type Participant } from "@/lib/queries";
import { getPresentation } from "@/data/catalog";
import { scorePercent } from "@/lib/certificate";
import { canAttempt } from "@/lib/assessment";
import { supabase } from "@/integrations/supabase/client";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/_authenticated/avaliacoes")({
  loader: ({ context }) => context.queryClient.ensureQueryData(sessionsQuery),
  head: () => pageHead("Avaliações", "Avaliação presencial dos participantes e resultados da turma."),
  component: AssessmentsPage,
});

function AssessmentsPage() {
  const { data: sessions } = useSuspenseQuery(sessionsQuery);
  const [sessionId, setSessionId] = useState("");
  const selected = sessionId || sessions[0]?.id || "";
  return <AppShell title="Avaliações">{!sessions.length ? <p className="text-muted-foreground">Cadastre uma turma e seus participantes antes de aplicar a avaliação.</p> : <><label className="text-sm font-semibold" htmlFor="assessment-class">Turma</label><select id="assessment-class" className="mb-6 mt-2 block h-10 w-full max-w-lg rounded-md border bg-card px-3" value={selected} onChange={(e) => setSessionId(e.target.value)}>{sessions.map((s) => <option key={s.id} value={s.id}>{s.class_name} · {s.institution}</option>)}</select><AssessmentClass key={selected} sessionId={selected} presentationId={sessions.find((s) => s.id === selected)?.presentation_id ?? ""} /></>}</AppShell>;
}
function AssessmentClass({ sessionId, presentationId }: { sessionId: string; presentationId: string }) {
  const { data: participants = [] } = useQuery(participantsQuery(sessionId));
  const { data: settings } = useQuery(settingsQuery);
  const qc = useQueryClient();
  const p = getPresentation(presentationId);
  const [person, setPerson] = useState<Participant | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  async function submit() {
    if (!p || !person || !settings || !canAttempt(person.attempts, settings.max_attempts)) return;
    if (answers.length !== p.assessment.length || answers.some((a) => a === null)) { toast.error("Responda todas as questões."); return; }
    setBusy(true);
    const score = scorePercent(answers, p.assessment.map((q) => q.answer));
    const { data, error } = await supabase.from("participants").update({ score, attempts: person.attempts + 1 }).eq("id", person.id).eq("attempts", person.attempts).select("id").maybeSingle();
    if (error || !data) toast.error("Não foi possível registrar a avaliação. Atualize a página e tente novamente.");
    else { setResult(score); setPerson(null); await qc.invalidateQueries({ queryKey: ["participants", sessionId] }); toast.success("Avaliação registrada."); }
    setBusy(false);
  }
  if (!p) return null;
  const evaluated = participants.filter((x) => x.score !== null);
  return <section><h2 className="text-xl font-bold">{p.title}</h2><p className="mt-2 text-sm text-muted-foreground">{p.assessment.length} questões · Nota mínima: {settings?.min_score ?? "—"}% · Até {settings?.max_attempts ?? "—"} tentativas</p>
    {result !== null && <p role="status" className="mt-4 border-l-4 border-success pl-3">Resultado da avaliação: {result}%</p>}
    {!person ? <><p className="my-6 text-sm">{evaluated.length}/{participants.length} avaliados · {evaluated.filter((x) => settings && (x.score ?? 0) >= settings.min_score).length} aprovados</p><div className="divide-y border-y">{participants.map((x) => <div key={x.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="font-semibold">{x.name}</p><p className="text-xs text-muted-foreground">{x.attempts} tentativas{settings?.show_individual_results && x.score !== null ? ` · Nota: ${x.score}%` : ""}</p></div><Button variant="outline" disabled={!settings || !canAttempt(x.attempts, settings.max_attempts)} onClick={() => { setPerson(x); setAnswers(p.assessment.map(() => null)); setResult(null); }}>Aplicar avaliação</Button></div>)}</div>{!participants.length && <p className="mt-4 text-muted-foreground">Cadastre participantes em Turmas e histórico.</p>}</> : <form onSubmit={(e) => { e.preventDefault(); void submit(); }} className="mt-6"><h3 className="font-bold">Avaliação de {person.name}</h3>{p.assessment.map((q, i) => <fieldset key={i} className="my-6 border-b pb-6"><legend className="mb-3 font-semibold">{i + 1}. {q.q}</legend><div className="space-y-3">{q.options.map((option, j) => <label key={j} className="flex items-start gap-3 text-sm"><input required type="radio" name={`question-${i}`} checked={answers[i] === j} onChange={() => setAnswers(answers.map((a, k) => k === i ? j : a))} className="mt-1 accent-primary" />{option}</label>)}</div></fieldset>)}<div className="flex gap-3"><Button disabled={busy}>Registrar avaliação</Button><Button type="button" variant="outline" onClick={() => setPerson(null)} disabled={busy}>Cancelar</Button></div></form>}
  </section>;
}
