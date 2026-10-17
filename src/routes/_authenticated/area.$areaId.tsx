import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Users, Layers } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { areas, formatMinutes, images, presentationsByArea } from "@/data/catalog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/area/$areaId")({
  loader: ({ params }) => {
    const area = areas.find((a) => a.id === params.areaId);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.area.title ?? "Área"} — Centro de Treinamento` },
      { name: "description", content: loaderData?.area.description ?? "Área de treinamento" },
      { property: "og:title", content: loaderData?.area.title ?? "Área de treinamento" },
      { property: "og:description", content: loaderData?.area.description ?? "" },
    ],
  }),
  component: AreaPage,
});

function AreaPage() {
  const { area } = Route.useLoaderData();
  const list = presentationsByArea(area.id);
  const tracks = Array.from(new Set(list.map((p) => p.track)));
  return (
    <AppShell>
      <div className={area.id === "ccb" ? "theme-ccb" : ""}>
        <div className="relative overflow-hidden rounded-xl">
          <img src={images[area.image]} alt={area.title} width={1280} height={800} className="h-56 w-full object-cover sm:h-72" />
          <div className="absolute inset-0 bg-navy/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-navy-foreground sm:p-10">
            <Link to="/dashboard" className="text-sm opacity-80 hover:underline">← Painel</Link>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{area.id === "ccb" ? "PREVENÇÃO E SEGURANÇA — CONGREGAÇÃO CRISTÃ NO BRASIL" : area.title}</h1>
            <p className="mt-1 opacity-85">{area.description}</p>
          </div>
        </div>
        {area.id === "ccb" && (
          <p className="mt-4 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            Módulo com identidade visual própria e linguagem respeitosa. Não utiliza logotipos ou símbolos oficiais da instituição. A distribuição de 180 minutos é uma proposta didática, não uma carga horária regulamentar.
          </p>
        )}
        {tracks.map((t) => (
          <section key={t} className="mt-8">
            <h2 className="mb-4 text-xl font-bold">{t}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {list.filter((p) => p.track === t).map((p) => (
                <article key={p.id} className="flex flex-col rounded-xl border bg-card p-5">
                  <span className="w-fit rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">{p.level === "Único" ? "Trilha única" : p.level}</span>
                  <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.objective}</p>
                  <div className="mt-4 grid gap-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {formatMinutes(p.durationMin)} previstos</span>
                    <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" /> {p.slides.length} slides · {p.assessment.length} questões</span>
                    <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {p.audience}</span>
                  </div>
                  <Button asChild className="mt-4">
                    <Link to="/treinamento/$presentationId" params={{ presentationId: p.id }}>Preparar aula</Link>
                  </Button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
