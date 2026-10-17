import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/_authenticated/avaliacoes")({
  head: () => ({ meta: [{ title: "avaliacoes — Centro de Treinamento" }, { name: "description", content: "Seção avaliacoes da plataforma." }, { property: "og:title", content: "avaliacoes" }, { property: "og:description", content: "Centro de Treinamento" }] }),
  component: () => <AppShell title="avaliacoes"><p className="text-muted-foreground">Seção em desenvolvimento.</p></AppShell>,
});
