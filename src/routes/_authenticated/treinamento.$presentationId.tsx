import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/_authenticated/treinamento/$presentationId")({
  component: () => <AppShell title="Preparar aula"><p className="text-muted-foreground">Tela de preparação em desenvolvimento.</p></AppShell>,
});
