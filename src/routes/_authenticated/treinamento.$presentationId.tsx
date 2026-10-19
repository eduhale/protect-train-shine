import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Play, Save, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { getPresentation, establishmentTypes, formatMinutes } from "@/data/catalog";
import { supabase } from "@/integrations/supabase/client";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/_authenticated/treinamento/$presentationId")({
  loader: ({ params }) => { const presentation = getPresentation(params.presentationId); if (!presentation) throw notFound(); return { presentation }; },
  head: ({ loaderData }) => pageHead(`Preparar ${loaderData?.presentation.title ?? "aula"}`, "Planejamento da turma, equipamentos e segurança da aula presencial."),
  component: PreparePage,
});

function PreparePage() {
  const { presentation: p } = Route.useLoaderData();
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({ institution: "", class_name: "", audience: p.audience, establishment_type: establishmentTypes[0], session_date: new Date().toLocaleDateString("en-CA"), planned_hours: p.durationMin / 60, participants_count: 0, notes: "" });
  async function save(start: boolean) {
    if (!form.class_name.trim() || !form.institution.trim()) { toast.error("Informe o nome da turma e a instituição."); return; }
    setBusy(true);
    try {
      const { data, error } = await supabase.from("training_sessions").insert({ ...form, instructor_id: user.id, presentation_id: p.id, checklist, status: start ? "em andamento" : "planejada" }).select().single();
      if (error) throw error;
      await qc.invalidateQueries({ queryKey: ["sessions"] });
      if (start) await navigate({ to: "/apresentar/$presentationId", params: { presentationId: p.id }, search: { session: data.id, slide: 0 } });
      else { toast.success("Turma salva."); await navigate({ to: "/turmas" }); }
    } catch { toast.error("Não foi possível salvar a turma. Tente novamente."); } finally { setBusy(false); }
  }
  return <AppShell title="Preparar aula"><div className={p.theme === "ccb" ? "theme-ccb" : ""}>
    <p className="text-sm font-semibold text-alert">{p.track} · {p.level}</p><h2 className="mt-2 text-2xl font-bold">{p.title}</h2><p className="mt-2 max-w-3xl text-muted-foreground">{p.objective}</p><p className="mt-3 text-sm">{formatMinutes(p.durationMin)} previstos · {p.slides.length} slides · {p.assessment.length} questões</p>
    <form onSubmit={(e) => { e.preventDefault(); void save(true); }} className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <section className="space-y-5"><h3 className="border-b pb-3 text-lg font-bold">Dados da turma</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label htmlFor="class-name">Nome da turma</Label><Input id="class-name" required value={form.class_name} onChange={(e) => setForm({ ...form, class_name: e.target.value })} /></div>
          <div className="space-y-2"><Label htmlFor="institution">Instituição / igreja / empresa</Label><Input id="institution" required value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} /></div>
          <div className="space-y-2"><Label htmlFor="date">Data da aula</Label><Input id="date" required type="date" value={form.session_date} onChange={(e) => setForm({ ...form, session_date: e.target.value })} /></div>
          <div className="space-y-2"><Label htmlFor="establishment">Tipo de estabelecimento</Label><select id="establishment" className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={form.establishment_type} onChange={(e) => setForm({ ...form, establishment_type: e.target.value })}>{establishmentTypes.map((t) => <option key={t}>{t}</option>)}</select></div>
          <div className="space-y-2"><Label htmlFor="hours">Carga horária prevista (horas)</Label><Input id="hours" required type="number" min="0.25" step="0.25" value={form.planned_hours} onChange={(e) => setForm({ ...form, planned_hours: Number(e.target.value) })} /></div>
          <div className="space-y-2"><Label htmlFor="count">Quantidade prevista de participantes</Label><Input id="count" type="number" min="0" value={form.participants_count} onChange={(e) => setForm({ ...form, participants_count: Number(e.target.value) })} /></div>
        </div>
        <div className="space-y-2"><Label htmlFor="audience">Público</Label><Input id="audience" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} /></div>
        <div className="space-y-2"><Label htmlFor="notes">Observações do instrutor</Label><Textarea id="notes" rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
        <div className="flex flex-wrap gap-3"><Button type="submit" disabled={busy}><Play className="h-4 w-4" />Iniciar apresentação</Button><Button type="button" variant="outline" disabled={busy} onClick={() => void save(false)}><Save className="h-4 w-4" />Salvar turma</Button></div>
      </section>
      <section><h3 className="border-b pb-3 text-lg font-bold">Checklist de preparação</h3><div className="mt-4 space-y-4">{p.checklist.map((item, i) => <label key={item} className="flex items-start gap-3 text-sm"><Checkbox checked={Boolean(checklist[String(i)])} onCheckedChange={(checked) => setChecklist({ ...checklist, [String(i)]: checked === true })} /><span>{item}</span></label>)}</div>
        <h3 className="mt-8 flex items-center gap-2 border-b pb-3 text-lg font-bold"><AlertTriangle className="h-5 w-5 text-alert" />Segurança da prática</h3><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{p.practicalRisks.map((r) => <li key={r}>{r}</li>)}</ul>
        <p className="mt-6 border-l-4 border-alert pl-4 text-sm text-muted-foreground">A carga horária é um planejamento didático. Valide as normas aplicáveis, a qualificação do instrutor e as atividades práticas antes da aula.</p>
      </section>
    </form></div></AppShell>;
}
