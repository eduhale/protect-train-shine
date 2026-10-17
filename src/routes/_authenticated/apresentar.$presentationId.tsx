import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/_authenticated/apresentar/$presentationId")({
  validateSearch: (s: Record<string, unknown>) => ({
    session: typeof s.session === "string" ? s.session : undefined,
    slide: Number(s.slide ?? 0) || 0,
  }),
  component: () => <AppShell title="Apresentação"><p className="text-muted-foreground">Modo de apresentação em desenvolvimento.</p></AppShell>,
});
