import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/_authenticated/configuracoes")({
  head: () => ({ meta: [{ title: "configuracoes — Centro de Treinamento" }, { name: "description", content: "Seção configuracoes da plataforma." }, { property: "og:title", content: "configuracoes" }, { property: "og:description", content: "Centro de Treinamento" }] }),
  component: () => <AppShell title="configuracoes"><p className="text-muted-foreground">Seção em desenvolvimento.</p></AppShell>,
});
