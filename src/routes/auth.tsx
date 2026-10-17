import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Flame, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usernameToEmail } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import brigadaImg from "@/assets/brigada.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Centro de Treinamento" },
      { name: "description", content: "Acesso do instrutor à plataforma de treinamentos de segurança e emergência." },
      { property: "og:title", content: "Entrar — Centro de Treinamento" },
      { property: "og:description", content: "Acesso restrito a instrutores." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password) {
      setError("Informe usuário e senha.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: usernameToEmail(username), password });
    setLoading(false);
    if (error) {
      setError("Usuário ou senha incorretos. Verifique e tente novamente.");
      return;
    }
    navigate({ to: "/dashboard", replace: true });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src={brigadaImg} alt="Bombeiros civis em treinamento com extintor" className="absolute inset-0 h-full w-full object-cover" width={1280} height={800} />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="relative flex h-full flex-col justify-end p-12 text-navy-foreground">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">Segurança · Prevenção · Emergência</p>
          <h2 className="mt-3 max-w-md text-4xl font-extrabold">Conhecimento que protege vidas.</h2>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <form onSubmit={submit} className="w-full max-w-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-alert text-alert-foreground">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-lg font-extrabold leading-tight">Centro de Treinamento</p>
              <p className="text-xs text-muted-foreground">Segurança, Prevenção e Emergência</p>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Acesso do instrutor</h1>
            <p className="text-sm text-muted-foreground">Entre com seu usuário e senha.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user">Usuário</Label>
            <Input id="user" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pass">Senha</Label>
            <div className="relative">
              <Input id="pass" type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="pr-10" />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Ocultar senha" : "Mostrar senha"} className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {error && <p role="alert" className="rounded-md bg-alert/10 px-3 py-2 text-sm text-alert">{error}</p>}
          <Button type="submit" className="h-11 w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Entrar na plataforma
          </Button>
        </form>
      </div>
    </div>
  );
}
