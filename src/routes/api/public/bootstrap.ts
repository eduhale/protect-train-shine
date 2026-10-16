import { createFileRoute } from "@tanstack/react-router";

// One-time demo bootstrap: creates the initial instructor account if no admin exists yet.
export const Route = createFileRoute("/api/public/bootstrap")({
  server: {
    handlers: {
      POST: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { count } = await supabaseAdmin
          .from("user_roles")
          .select("id", { count: "exact", head: true })
          .eq("role", "admin");
        if ((count ?? 0) > 0) return Response.json({ ok: true, skipped: true });
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
          email: "eduardobc@centrotreinamento.app",
          password: "123456",
          email_confirm: true,
          user_metadata: { username: "Eduardobc" },
        });
        if (error || !data.user) return Response.json({ ok: false, error: error?.message }, { status: 500 });
        await supabaseAdmin.from("user_roles").insert([
          { user_id: data.user.id, role: "admin" },
          { user_id: data.user.id, role: "instructor" },
        ]);
        await supabaseAdmin
          .from("instructor_settings")
          .insert({ user_id: data.user.id, display_name: "Eduardo Alexandre" });
        return Response.json({ ok: true });
      },
    },
  },
});
