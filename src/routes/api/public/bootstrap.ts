import { createFileRoute } from "@tanstack/react-router";

// Account provisioning is never available through an unauthenticated public endpoint.
export const Route = createFileRoute("/api/public/bootstrap")({
  server: {
    handlers: {
      POST: async () => Response.json({ error: "Recurso indisponível." }, { status: 410 }),
    },
  },
});
