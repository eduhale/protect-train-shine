import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Play, Users } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ParticipantManager } from "@/components/ParticipantManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sessionsQuery } from "@/lib/queries";
import { getPresentation } from "@/data/catalog";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/_authenticated/turmas")({
  loader: ({ context }) => context.queryClient.ensureQueryData(sessionsQuery),
  head: () => pageHead("Turmas e histórico", "Turmas presenciais, aulas ministradas, participação e certificados."),
  component: ClassesPage,
});

function ClassesPage() {
  const { data: sessions } = useSuspenseQuery(sessionsQuery);
  const [filter, setFilter] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const list = sessions.filter((s) => `${s.class_name} ${s.institution} ${getPresentation(s.presentation_id)?.title ?? ""}`.toLowerCase().includes(filter.toLowerCase()));
  return <AppShell title="Turmas e histórico" actions={<Button asChild><Link to="/dashboard">Nova turma</Link></Button>}><Input aria-label="Buscar turma" placeholder="Buscar turma ou instituição" value={filter} onChange={(e) => setFilter(e.target.value)} className="mb-6 max-w-md" />
    {!list.length && <div className="border-y py-12 text-center"><Users className="mx-auto h-9 w-9 text-muted-foreground" /><h2 className="mt-4 text-lg font-bold">Nenhuma turma encontrada</h2><p className="mt-2 text-sm text-muted-foreground">{sessions.length ? "Altere a busca." : "Selecione um treinamento para preparar sua primeira aula."}</p></div>}
    <div className="space-y-5">{list.map((s) => { const p = getPresentation(s.presentation_id); return <article key={s.id} className="rounded-lg border bg-card p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><span className={`text-xs font-bold uppercase ${s.status === "concluída" ? "text-success" : "text-alert"}`}>{s.status}</span><h2 className="mt-1 text-xl font-bold">{s.class_name || "Turma"}</h2><p className="text-sm text-muted-foreground">{s.institution} · {p?.title}</p><p className="mt-2 text-xs text-muted-foreground">{new Date(`${s.session_date}T12:00:00`).toLocaleDateString("pt-BR")} · {s.planned_hours}h previstas · {s.participants_count} participantes previstos · slide {s.current_slide + 1}/{p?.slides.length ?? "—"}</p></div><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => setExpanded(expanded === s.id ? null : s.id)}><Users className="h-4 w-4" />Participantes</Button>{p && <Button asChild variant={s.status === "concluída" ? "outline" : "default"}><Link to="/apresentar/$presentationId" params={{ presentationId: p.id }} search={{ session: s.id, slide: s.current_slide }}><Play className="h-4 w-4" />{s.status === "concluída" ? "Revisar slides" : "Retomar aula"}</Link></Button>}</div></div>{expanded === s.id && <ParticipantManager session={s} />}</article>; })}</div>
  </AppShell>;
}
