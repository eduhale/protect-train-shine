import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/_authenticated/turmas")({
  head: () => ({ meta: [{ title: "turmas — Centro de Treinamento" }, { name: "description", content: "Seção turmas da plataforma." }, { property: "og:title", content: "turmas" }, { property: "og:description", content: "Centro de Treinamento" }] }),
  component: () => <AppShell title="turmas"><p className="text-muted-foreground">Seção em desenvolvimento.</p></AppShell>,
});
