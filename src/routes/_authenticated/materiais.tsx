import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/_authenticated/materiais")({
  head: () => ({ meta: [{ title: "materiais — Centro de Treinamento" }, { name: "description", content: "Seção materiais da plataforma." }, { property: "og:title", content: "materiais" }, { property: "og:description", content: "Centro de Treinamento" }] }),
  component: () => <AppShell title="materiais"><p className="text-muted-foreground">Seção em desenvolvimento.</p></AppShell>,
});
