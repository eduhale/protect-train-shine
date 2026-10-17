import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/_authenticated/referencias")({
  head: () => ({ meta: [{ title: "referencias — Centro de Treinamento" }, { name: "description", content: "Seção referencias da plataforma." }, { property: "og:title", content: "referencias" }, { property: "og:description", content: "Centro de Treinamento" }] }),
  component: () => <AppShell title="referencias"><p className="text-muted-foreground">Seção em desenvolvimento.</p></AppShell>,
});
