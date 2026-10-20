import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ExternalLink, AlertTriangle } from "lucide-react";
import { refsQuery } from "@/lib/queries";
import { pageHead } from "@/lib/page-head";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/referencias")({
  loader: ({ context }) => context.queryClient.ensureQueryData(refsQuery),
  head: () => pageHead("Referências normativas", "Fontes legais, versões e pendências de validação técnica dos treinamentos."),
  component: ReferencesPage,
});

function ReferencesPage() {
  const { data: refs } = useSuspenseQuery(refsQuery);
  return <AppShell title="Referências normativas"><p className="mb-8 flex items-start gap-3 border-l-4 border-alert pl-4 text-sm text-muted-foreground"><AlertTriangle className="h-5 w-5 shrink-0 text-alert" />Confirme a edição vigente, a ocupação e os requisitos aplicáveis com o responsável técnico antes de apresentar o treinamento como formação regulamentada.</p><div className="divide-y border-y">{refs.map((r) => <article key={r.id} className="flex flex-wrap items-start justify-between gap-5 py-6"><div className="min-w-0 flex-1"><p className={`text-xs font-bold ${r.needs_validation ? "text-alert" : "text-muted-foreground"}`}>{r.needs_validation ? "VALIDAÇÃO TÉCNICA PENDENTE" : "CONFIRMAR APLICABILIDADE LOCAL"}</p><h2 className="mt-1 text-lg font-bold">{r.code}</h2><p className="mt-1 text-sm">{r.title}</p><p className="mt-2 text-sm text-muted-foreground">Versão: {r.edition || "Não informada"}</p><p className="text-sm text-muted-foreground">Consulta registrada: {r.consulted_at ? new Date(`${r.consulted_at}T12:00:00`).toLocaleDateString("pt-BR") : "Não registrada"}</p><p className="mt-1 text-sm text-muted-foreground">Aplicação: {r.scope}</p></div>{/^https:\/\//.test(r.url) && <Button asChild variant="outline" size="sm"><a href={r.url} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" />Fonte oficial</a></Button>}</article>)}</div></AppShell>;
}
