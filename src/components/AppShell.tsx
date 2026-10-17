import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Flame, LogOut, Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/dashboard", label: "Painel" },
  { to: "/turmas", label: "Turmas e histórico" },
  { to: "/avaliacoes", label: "Avaliações" },
  { to: "/materiais", label: "Materiais" },
  { to: "/referencias", label: "Referências normativas" },
  { to: "/configuracoes", label: "Configurações" },
] as const;

export function AppShell({ children, title, actions }: { children: ReactNode; title?: string; actions?: ReactNode }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="no-print sticky top-0 z-30 bg-navy text-navy-foreground">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-alert text-alert-foreground">
              <Flame className="h-5 w-5" />
            </span>
            <span className="font-display text-sm font-extrabold leading-tight sm:text-base">Centro de Treinamento</span>
          </Link>
          <nav className="ml-6 hidden gap-1 lg:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="rounded-md px-3 py-2 text-sm opacity-80 hover:bg-sidebar-accent hover:opacity-100" activeProps={{ className: "bg-sidebar-accent opacity-100" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={signOut} className="text-navy-foreground hover:bg-sidebar-accent hover:text-navy-foreground">
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sair</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-navy-foreground hover:bg-sidebar-accent hover:text-navy-foreground lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {open && (
          <nav className="grid gap-1 border-t border-sidebar-border px-4 py-3 lg:hidden">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent">
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        {(title || actions) && (
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            {title && <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>}
            {actions}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
