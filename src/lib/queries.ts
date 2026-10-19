import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Session = Database["public"]["Tables"]["training_sessions"]["Row"];
export type Participant = Database["public"]["Tables"]["participants"]["Row"];
export type Settings = Database["public"]["Tables"]["instructor_settings"]["Row"];
export type NormRef = Database["public"]["Tables"]["normative_references"]["Row"];

export const sessionsQuery = queryOptions({
  queryKey: ["sessions"],
  queryFn: async () => {
    const { data, error } = await supabase.from("training_sessions").select("*").order("updated_at", { ascending: false });
    if (error) throw error;
    return data;
  },
});

export const sessionQuery = (id: string) =>
  queryOptions({
    queryKey: ["session", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("training_sessions").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const participantsQuery = (sessionId: string) =>
  queryOptions({
    queryKey: ["participants", sessionId],
    queryFn: async () => {
      const { data, error } = await supabase.from("participants").select("*").eq("session_id", sessionId).order("name");
      if (error) throw error;
      return data;
    },
  });

export const participantQuery = (id: string) =>
  queryOptions({
    queryKey: ["participant", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("participants").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const settingsQuery = queryOptions({
  queryKey: ["settings"],
  queryFn: async (): Promise<Settings> => {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) throw new Error("Sessão expirada. Entre novamente.");
    const { data, error: readError } = await supabase.from("instructor_settings").select("*").eq("user_id", u.user.id).maybeSingle();
    if (readError) throw readError;
    if (data) return data;
    const { data: created, error } = await supabase
      .from("instructor_settings")
      .insert({ user_id: u.user.id })
      .select()
      .single();
    if (error) throw error;
    return created;
  },
});

export const refsQuery = queryOptions({
  queryKey: ["refs"],
  queryFn: async () => {
    const { data, error } = await supabase.from("normative_references").select("*").order("code");
    if (error) throw error;
    return data;
  },
});

export const isAdminQuery = queryOptions({
  queryKey: ["is-admin"],
  queryFn: async () => {
    const { data } = await supabase.from("user_roles").select("role").eq("role", "admin");
    return (data?.length ?? 0) > 0;
  },
});
