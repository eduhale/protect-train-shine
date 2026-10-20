import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { presentations, getPresentation, formatMinutes } from "@/data/catalog";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/_authenticated/materiais")({
  head: () => pageHead("Materiais de apoio", "Roteiros, equipamentos e orientações de segurança para cada treinamento."),
  component: MaterialsPage,
});

function MaterialsPage() {
  const [id, setId] = useState(presentations[0]?.id ?? "");
  const p = getPresentation(id);
  return <AppShell title="Materiais de apoio" actions={<Button className="no-print" variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4" />Imprimir roteiro</Button>}><select aria-label="Selecionar treinamento" className="no-print mb-6 h-10 w-full max-w-xl rounded-md border bg-card px-3" value={id} onChange={(e) => setId(e.target.value)}>{presentations.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select>{p && <><h2 className="text-2xl font-bold">{p.title}</h2><p className="mt-2 text-muted-foreground">{p.objective}</p><p className="mt-3 text-sm">{formatMinutes(p.durationMin)} didáticos previstos · {p.level}</p><div className="mt-8 grid gap-10 md:grid-cols-2"><section><h3 className="border-b pb-3 text-lg font-bold">Equipamentos e preparação</h3><ul className="mt-4 space-y-3 text-sm">{p.checklist.map((c) => <li key={c}>□ {c}</li>)}</ul></section><section><h3 className="border-b pb-3 text-lg font-bold">Segurança das atividades</h3><ul className="mt-4 space-y-3 text-sm">{p.practicalRisks.map((r) => <li key={r}>{r}</li>)}</ul></section></div><h3 className="mb-4 mt-10 border-b pb-3 text-lg font-bold">Roteiro do instrutor</h3><div className="divide-y">{p.slides.map((slide, i) => <section key={i} className="break-inside-avoid py-4"><h4 className="font-semibold">{i + 1}. {slide.title} {slide.minutes ? `· ${slide.minutes} min` : ""}</h4><p className="mt-2 text-sm text-muted-foreground">{slide.notes}</p>{slide.ref && <p className="mt-2 text-xs text-muted-foreground">Referência: {slide.ref}</p>}</section>)}</div></>}</AppShell>;
}
