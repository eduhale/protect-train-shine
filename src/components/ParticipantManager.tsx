import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserPlus, Printer, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { participantsQuery, settingsQuery, type Participant, type Session } from "@/lib/queries";
import { certificateEligibility, makeVerificationCode } from "@/lib/certificate";
import { getPresentation } from "@/data/catalog";
import { supabase } from "@/integrations/supabase/client";

export function ParticipantManager({ session }: { session: Session }) {
  const { data: participants = [], isPending, error } = useQuery(participantsQuery(session.id));
  const { data: settings } = useQuery(settingsQuery);
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [certificate, setCertificate] = useState<Participant | null>(null);
  const p = getPresentation(session.presentation_id);
  async function refresh() { await qc.invalidateQueries({ queryKey: ["participants", session.id] }); }
  async function add(e: React.FormEvent) {
    e.preventDefault(); if (!name.trim()) return; setBusy(true);
    const { error } = await supabase.from("participants").insert({ name: name.trim(), session_id: session.id, instructor_id: session.instructor_id });
    if (error) toast.error("Não foi possível cadastrar o participante."); else { setName(""); await refresh(); }
    setBusy(false);
  }
  async function update(id: string, values: Partial<Participant>) {
    const { error } = await supabase.from("participants").update(values).eq("id", id);
    if (error) toast.error("Não foi possível salvar a participação."); else await refresh();
  }
  async function remove(participant: Participant) {
    if (!window.confirm(`Excluir ${participant.name} desta turma?`)) return;
    const { error } = await supabase.from("participants").delete().eq("id", participant.id);
    if (error) toast.error("Não foi possível excluir."); else await refresh();
  }
  async function issue(participant: Participant) {
    if (!settings || !certificateEligibility(participant, settings.min_score).eligible) return;
    if (!settings.display_name || !settings.institution_name) { toast.error("Preencha a identificação do instrutor e da instituição nas configurações."); return; }
    const code = participant.certificate_code ?? makeVerificationCode();
    const { error } = await supabase.from("participants").update({ certificate_code: code }).eq("id", participant.id);
    if (error) { toast.error("Não foi possível registrar o certificado."); return; }
    setCertificate({ ...participant, certificate_code: code }); await refresh();
  }
  return <section className="mt-6 border-t pt-5"><h3 className="text-lg font-bold">Participantes e conclusão</h3>
    <form onSubmit={add} className="mt-4 flex flex-wrap gap-2"><Input aria-label="Nome do participante" placeholder="Nome completo" className="max-w-md" value={name} onChange={(e) => setName(e.target.value)} required /><Button disabled={busy}><UserPlus className="h-4 w-4" />Cadastrar participante</Button></form>
    {isPending && <p className="mt-4 text-sm text-muted-foreground">Carregando participantes…</p>}{error && <p role="alert" className="mt-4 text-alert">Não foi possível carregar os participantes.</p>}
    {!isPending && !participants.length && <p className="mt-5 text-sm text-muted-foreground">Nenhum participante cadastrado nesta turma.</p>}
    <div className="mt-5 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="p-3">Participante</th><th className="p-3">Presença</th><th className="p-3">Prática</th><th className="p-3">Horas cumpridas</th><th className="p-3">Nota</th><th className="p-3">Certificado</th><th className="p-3" /></tr></thead><tbody>{participants.map((person) => {
      const eligibility = settings ? certificateEligibility(person, settings.min_score) : { eligible: false, reasons: ["Carregando critérios"] };
      return <tr key={person.id} className="border-b"><td className="min-w-44 p-3 font-semibold">{person.name}</td><td className="p-3"><Checkbox aria-label={`Presença de ${person.name}`} checked={person.attended} onCheckedChange={(v) => void update(person.id, { attended: v === true })} /></td><td className="p-3"><Checkbox aria-label={`Prática de ${person.name}`} checked={person.practical_done} onCheckedChange={(v) => void update(person.id, { practical_done: v === true })} /></td><td className="p-3"><Input key={`${person.id}-${person.hours_completed}`} aria-label={`Horas cumpridas de ${person.name}`} className="w-24" type="number" min="0" step="0.25" defaultValue={person.hours_completed} onBlur={(e) => { const hours = Number(e.target.value); if (Number.isFinite(hours) && hours >= 0 && hours !== person.hours_completed) void update(person.id, { hours_completed: hours }); }} /></td><td className="p-3">{person.score ?? "—"}</td><td className="p-3"><Button variant="outline" size="sm" disabled={!eligibility.eligible} title={eligibility.reasons.join("; ")} onClick={() => void issue(person)}><Printer className="h-4 w-4" />Certificado</Button>{!eligibility.eligible && <p className="mt-1 max-w-64 text-xs text-muted-foreground">{eligibility.reasons.join(" · ")}</p>}</td><td className="p-3"><Button size="icon" variant="ghost" aria-label={`Excluir ${person.name}`} onClick={() => void remove(person)}><Trash2 className="h-4 w-4" /></Button></td></tr>;
    })}</tbody></table></div>
    <Dialog open={Boolean(certificate)} onOpenChange={(open) => { if (!open) setCertificate(null); }}><DialogContent className="certificate-dialog max-w-4xl"><DialogHeader className="no-print"><DialogTitle>Certificado de participação</DialogTitle><DialogDescription>Registro de participação no treinamento presencial.</DialogDescription></DialogHeader>{certificate && <div className="certificate-paper border-2 border-primary px-8 py-12 text-center"><p className="text-sm font-bold uppercase">{settings?.institution_name}</p><h2 className="mt-8 text-3xl font-bold">CERTIFICADO DE PARTICIPAÇÃO</h2><p className="mt-8">Certificamos a participação de</p><p className="mt-3 text-2xl font-bold">{certificate.name}</p><p className="mt-6">no treinamento <strong>{p?.title}</strong>, realizado em {new Date(`${session.session_date}T12:00:00`).toLocaleDateString("pt-BR")}, com carga horária efetivamente cumprida de <strong>{certificate.hours_completed} horas</strong>.</p><p className="mt-3">{session.institution}</p><div className="mt-16 grid gap-8 sm:grid-cols-2"><div className="border-t pt-3">{settings?.display_name}<p className="text-xs">{settings?.credentials}</p></div><div className="border-t pt-3">Instituição responsável</div></div><p className="mt-8 text-xs text-muted-foreground">Código de registro: {certificate.certificate_code} · Confirmação junto à instituição emissora.</p><p className="mt-4 text-xs text-muted-foreground">Este documento não declara automaticamente formação oficial de brigadista. A validade depende dos requisitos aplicáveis, das atividades realizadas e das qualificações do instrutor.</p></div>}<Button className="no-print" onClick={() => window.print()}><Printer />Imprimir certificado</Button></DialogContent></Dialog>
  </section>;
}