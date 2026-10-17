import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ClipboardCheck, History, PlayCircle, Settings, Library, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { areas, formatMinutes, getPresentation, images, presentationsByArea } from "@/data/catalog";
import { sessionsQuery } from "@/lib/queries";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Painel — Centro de Treinamento" },
      { name: "description", content: "Painel do instrutor com áreas de treinamento, turmas e avaliações." },
      { property: "og:title", content: "Painel do instrutor" },
      { property: "og:description", content: "Conhecimento que protege vidas." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { data: sessions = [] } = useQuery(sessionsQuery);
  const last = sessions.find((s) => s.status !== "concluída");
  const lastPres = last ? getPresentation(last.presentation_id) : undefined;

  return (
    <AppShell>
      <section className="rounded-xl bg-navy px-6 py-10 text-navy-foreground sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-alert">Painel do instrutor</p>
        <h1 className="mt-2 text-2xl font-extrabold sm:text-4xl">CENTRO DE TREINAMENTO — SEGURANÇA, PREVENÇÃO E EMERGÊNCIA</h1>
        <p className="mt-2 text-lg opacity-80">Conhecimento que protege vidas.</p>
        {last && lastPres && (
          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-lg bg-sidebar-accent p-4">
            <PlayCircle className="h-8 w-8 text-alert" />
            <div className="min-w-0 flex-1">
              <p className="text-sm opacity-80">Continuar treinamento</p>
              <p className="font-semibold">{lastPres.title} · {last.institution || last.class_name || "Turma"} · slide {last.current_slide + 1}/{lastPres.slides.length}</p>
            </div>
            <Button asChild variant="destructive">
              <Link to="/apresentar/$presentationId" params={{ presentationId: lastPres.id }} search={{ session: last.id, slide: last.current_slide }}>
                Retomar
              </Link>
            </Button>
          </div>
        )}
      </section>

      <h2 className="mb-4 mt-10 text-xl font-bold">Treinamentos disponíveis</h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {areas.map((a) => {
          const list = presentationsByArea(a.id);
          const levels = Array.from(new Set(list.map((p) => p.level)));
          const total = list.reduce((s, p) => s + p.durationMin, 0);
          return (
            <article key={a.id} className={`flex flex-col overflow-hidden rounded-xl border bg-card ${a.id === "ccb" ? "theme-ccb" : ""}`}>
              <img src={images[a.image]} alt={a.title} loading="lazy" width={1280} height={800} className="aspect-[16/10] w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold">{a.title}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{a.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                  {levels.map((l) => (
                    <span key={l} className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">{l === "Único" ? "Trilha única" : l}</span>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{list.length} apresentações · {formatMinutes(total)} de conteúdo</p>
                <Button asChild className="mt-4">
                  <Link to="/area/$areaId" params={{ areaId: a.id }}>Acessar treinamento <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Shortcut to="/turmas" icon={<History />} title="Histórico de aulas" text={`${sessions.length} turmas registradas`} />
        <Shortcut to="/avaliacoes" icon={<ClipboardCheck />} title="Avaliações" text="Questões e resultados" />
        <Shortcut to="/materiais" icon={<BookOpen />} title="Materiais de apoio" text="Checklists e roteiros" />
        <Shortcut to="/configuracoes" icon={<Settings />} title="Configurações" text="Instrutor, notas e senha" />
      </div>
      <Link to="/referencias" className="mt-4 flex items-center gap-3 rounded-xl border bg-card p-4 text-sm hover:border-primary">
        <Library className="h-5 w-5 text-primary" /> Referências normativas — consulte fontes, versões e datas antes de cada curso.
      </Link>
    </AppShell>
  );
}

function Shortcut({ to, icon, title, text }: { to: "/turmas" | "/avaliacoes" | "/materiais" | "/configuracoes"; icon: React.ReactNode; title: string; text: string }) {
  return (
    <Link to={to} className="flex items-center gap-3 rounded-xl border bg-card p-4 hover:border-primary">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary [&_svg]:h-5 [&_svg]:w-5">{icon}</span>
      <span>
        <span className="block font-semibold">{title}</span>
        <span className="text-sm text-muted-foreground">{text}</span>
      </span>
    </Link>
  );
}
