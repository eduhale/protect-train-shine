import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Centro de Treinamento — Segurança, Prevenção e Emergência" },
      { name: "description", content: "Conhecimento que protege vidas. Treinamentos presenciais de brigada, primeiros socorros e combate a incêndio." },
      { property: "og:title", content: "Centro de Treinamento — Segurança e Emergência" },
      { property: "og:description", content: "Conhecimento que protege vidas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    throw redirect({ to: data.user ? "/dashboard" : "/auth" });
  },
  component: () => null,
});
