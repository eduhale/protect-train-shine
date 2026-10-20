import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { settingsQuery } from "@/lib/queries";
import { supabase } from "@/integrations/supabase/client";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/_authenticated/configuracoes")({
  loader: ({ context }) => context.queryClient.ensureQueryData(settingsQuery),
  head: () => pageHead("Configurações do instrutor", "Identificação, critérios de avaliação, privacidade e troca de senha."),
  component: SettingsPage,
});

function SettingsPage() {
  const { data } = useSuspenseQuery(settingsQuery);
  const qc = useQueryClient();
  const [form, setForm] = useState(data);
  const [busy, setBusy] = useState(false);
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  async function save(e: React.FormEvent) { e.preventDefault(); setBusy(true); const { error } = await supabase.from("instructor_settings").update({ display_name: form.display_name, institution_name: form.institution_name, credentials: form.credentials, min_score: form.min_score, max_attempts: form.max_attempts, show_individual_results: form.show_individual_results, updated_at: new Date().toISOString() }).eq("user_id", data.user_id); if (error) toast.error("Não foi possível salvar."); else { await qc.invalidateQueries({ queryKey: ["settings"] }); toast.success("Configurações salvas."); } setBusy(false); }
  async function changePassword(e: React.FormEvent) { e.preventDefault(); if (password !== confirmation) { toast.error("As novas senhas não coincidem."); return; } setBusy(true); const { error } = await supabase.auth.updateUser({ password, current_password: current }); if (error) toast.error("Não foi possível alterar a senha. Confira a senha atual e os requisitos da nova senha."); else { setCurrent(""); setPassword(""); setConfirmation(""); toast.success("Senha alterada."); } setBusy(false); }
  return <AppShell title="Configurações do instrutor"><div className="grid gap-12 lg:grid-cols-2"><form onSubmit={save} className="space-y-5"><h2 className="border-b pb-3 text-lg font-bold">Identificação e avaliação</h2>{([{ key: "display_name", label: "Nome do instrutor" }, { key: "institution_name", label: "Instituição responsável" }, { key: "credentials", label: "Qualificações / identificação profissional" }] as const).map((f) => <div key={f.key} className="space-y-2"><Label htmlFor={f.key}>{f.label}</Label><Input id={f.key} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} /></div>)}<div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="min-score">Nota mínima (%)</Label><Input id="min-score" type="number" min="0" max="100" required value={form.min_score} onChange={(e) => setForm({ ...form, min_score: Number(e.target.value) })} /></div><div className="space-y-2"><Label htmlFor="attempts">Máximo de tentativas</Label><Input id="attempts" type="number" min="1" step="1" required value={form.max_attempts} onChange={(e) => setForm({ ...form, max_attempts: Number(e.target.value) })} /></div></div><label className="flex items-center justify-between gap-4 text-sm">Exibir notas individuais na lista da turma<Switch checked={form.show_individual_results} onCheckedChange={(v) => setForm({ ...form, show_individual_results: v })} /></label><Button disabled={busy}><Save className="h-4 w-4" />Salvar configurações</Button></form><form onSubmit={changePassword} className="space-y-5"><h2 className="border-b pb-3 text-lg font-bold">Trocar senha</h2><div className="space-y-2"><Label htmlFor="current-password">Senha atual</Label><Input id="current-password" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} required /></div><div className="space-y-2"><Label htmlFor="new-password">Nova senha</Label><Input id="new-password" type="password" autoComplete="new-password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required /></div><div className="space-y-2"><Label htmlFor="confirm-password">Confirmar nova senha</Label><Input id="confirm-password" type="password" autoComplete="new-password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} required /></div><Button disabled={busy} variant="outline">Alterar senha</Button></form></div></AppShell>;
}
