import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize, Minimize, Pause, Play, NotebookPen, Flag, X, Check, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { getPresentation, images } from "@/data/catalog";
import type { Slide } from "@/data/types";
import { sessionQuery } from "@/lib/queries";
import { supabase } from "@/integrations/supabase/client";
import { clampSlide } from "@/lib/presentation";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/_authenticated/apresentar/$presentationId")({
  validateSearch: (s: Record<string, unknown>) => ({
    session: typeof s["session"] === "string" ? s["session"] : undefined,
    slide: Number(s["slide"] ?? 0) || 0,
  }),
  loaderDeps: ({ search }) => ({ session: search.session }),
  loader: async ({ params, deps, context }) => {
    const presentation = getPresentation(params.presentationId);
    if (!presentation) throw notFound();
    const session = deps.session ? await context.queryClient.ensureQueryData(sessionQuery(deps.session)) : null;
    if (deps.session && (!session || session.presentation_id !== presentation.id)) throw notFound();
    return { presentation, session };
  },
  head: ({ loaderData }) => pageHead(`Apresentação: ${loaderData?.presentation.title ?? "Treinamento"}`, "Aula presencial com slides, perguntas interativas e acompanhamento do instrutor."),
  component: PresentationPage,
});

function PresentationPage() {
  const { presentation: p, session } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [index, setIndex] = useState(() => clampSlide(session?.current_slide ?? search.slide, p.slides.length));
  const [busy, setBusy] = useState(false);
  const [notes, setNotes] = useState(false);
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [finish, setFinish] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [points, setPoints] = useState<Record<number, boolean>>({});
  const current = p.slides[index];
  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const resize = new ResizeObserver(([entry]) => { if (entry) setScale(Math.min(entry.contentRect.width / 1920, entry.contentRect.height / 1080)); });
    resize.observe(node); return () => resize.disconnect();
  }, []);
  useEffect(() => {
    const handler = () => { setFullscreen(Boolean(document.fullscreenElement)); setNotes(false); };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);
  useEffect(() => { if (paused || finish) return; const id = window.setInterval(() => setElapsed((e) => e + 1), 1000); return () => window.clearInterval(id); }, [paused, finish]);
  async function go(next: number) {
    if (busy || paused) return;
    const target = clampSlide(next, p.slides.length);
    if (target === index) return;
    setBusy(true);
    try {
      if (session) { const { error } = await supabase.from("training_sessions").update({ current_slide: target, status: "em andamento", updated_at: new Date().toISOString() }).eq("id", session.id); if (error) throw error; }
      setIndex(target); setSelected(null); setRevealed(false);
    } catch { toast.error("Não foi possível salvar o progresso. Tente novamente."); } finally { setBusy(false); }
  }
  useEffect(() => {
    function key(e: KeyboardEvent) {
      const target = e.target;
      if (target instanceof HTMLElement && (target.closest("input,textarea,select,[role=dialog]") || target.isContentEditable)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); void go(index + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); void go(index - 1); }
    }
    window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key);
  });
  async function toggleFullscreen() {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else { setNotes(false); await root.current?.requestFullscreen(); } } catch { toast.error("Tela cheia indisponível neste navegador."); }
  }
  async function end() {
    setBusy(true);
    try {
      if (session) { const { error } = await supabase.from("training_sessions").update({ status: "concluída", current_slide: index, updated_at: new Date().toISOString() }).eq("id", session.id); if (error) throw error; }
      if (document.fullscreenElement) await document.exitFullscreen();
      await qc.invalidateQueries({ queryKey: ["sessions"] });
      toast.success("Aula encerrada. Registre a participação e a avaliação da turma.");
      await navigate({ to: "/turmas" });
    } catch { toast.error("Não foi possível encerrar a aula."); } finally { setBusy(false); }
  }
  async function leave() { if (document.fullscreenElement) await document.exitFullscreen(); await qc.invalidateQueries({ queryKey: ["sessions"] }); await navigate({ to: "/dashboard" }); }
  if (!current) return null;
  const options = current.options ?? (current.kind === "truefalse" ? ["Verdadeiro", "Falso"] : []);
  return <div ref={root} className={`presentation-shell bg-stage ${p.theme === "ccb" ? "theme-ccb" : ""}`}>
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-sidebar-border bg-navy px-4 py-3 text-navy-foreground">
      <div className="min-w-0"><p className="text-xs opacity-70">{session?.institution ?? "Prévia do treinamento"} · {p.level}</p><h1 className="max-w-2xl truncate text-sm font-bold">{p.title}</h1></div>
      <div className="flex gap-2"><Button variant="ghost" size="icon" title="Sair e retomar depois" aria-label="Sair e retomar depois" className="text-navy-foreground hover:bg-sidebar-accent hover:text-navy-foreground" onClick={() => void leave()}><X /></Button><Button variant="destructive" size="sm" onClick={() => setFinish(true)}><Flag className="h-4 w-4" />Encerrar aula</Button></div>
    </header>
    <div ref={stage} className="presentation-stage relative flex items-center justify-center overflow-hidden">
      <div className="relative shrink-0" style={{ width: 1920 * scale, height: 1080 * scale }}><article key={index} className="slide-content animate-slide-in" style={{ transform: `scale(${scale})`, transformOrigin: "top left" }} aria-label={`Slide ${index + 1}`}>
        <div className="absolute inset-x-0 top-0 flex h-20 items-center justify-between bg-slide-band px-24 text-slide-band-fg"><span className="slide-kicker">{current.kicker ?? p.track}</span><span className="slide-chrome">{String(index + 1).padStart(2, "0")} / {p.slides.length}</span></div>
        <div className="absolute inset-x-0 bottom-20 top-20 flex gap-16 px-24 py-16">
          <div className="flex min-w-0 flex-1 flex-col justify-center"><p className="slide-kicker mb-6 text-slide-accent">{kindLabel(current)}</p><h2 className={current.kind === "cover" ? "slide-title-lg" : "slide-title"}>{current.title}</h2>
            {current.subtitle && <p className="slide-subtitle mt-8 text-slide-muted">{current.subtitle}</p>}
            {current.question && <p className="slide-body-lg mt-8 font-semibold">{current.question}</p>}
            {!!current.bullets?.length && <ul className="slide-body mt-10 space-y-5">{current.bullets.map((b) => <li key={b} className="flex gap-5"><span className="text-slide-accent">—</span><span>{b}</span></li>)}</ul>}
            {options.length > 0 && <div className="mt-8 grid gap-4">{options.map((o, i) => <Button key={o} variant="outline" onClick={() => { if (!revealed) setSelected(i); }} className={`slide-body h-auto min-h-20 justify-start whitespace-normal border-2 px-6 py-4 text-left ${revealed && current.answer === i ? "border-success bg-success/10 text-slide-fg" : selected === i ? "border-slide-accent bg-slide-panel text-slide-fg" : "border-border bg-slide text-slide-fg"}`}><span className="mr-3">{String.fromCharCode(65 + i)}.</span>{o}{revealed && current.answer === i && <Check className="ml-auto h-9 w-9 shrink-0 text-success" />}</Button>)}</div>}
            {options.length > 0 && !revealed && <Button className="slide-caption mt-6 h-16 w-fit bg-slide-band px-8 text-slide-band-fg" onClick={() => { setRevealed(true); if (selected !== null) setPoints({ ...points, [index]: selected === current.answer }); }}><Eye className="mr-3 h-8 w-8" />Revelar resposta</Button>}
            {revealed && current.explanation && <p className="slide-caption mt-6 border-l-4 border-slide-accent pl-6">{current.explanation}</p>}
          </div>
          {current.image && options.length === 0 && <div className="flex w-[680px] shrink-0 items-center"><img src={images[current.image]} alt={current.title} className="max-h-full w-full rounded-lg object-contain" /></div>}
        </div>
        <footer className="absolute inset-x-0 bottom-0 flex min-h-20 items-center justify-between gap-8 border-t px-24 py-4"><p className="slide-chrome max-w-[1250px] whitespace-normal text-slide-muted">{current.ref ?? "Centro de Treinamento · Segurança, Prevenção e Emergência"}</p>{current.warning && <p className="slide-chrome max-w-[850px] whitespace-normal font-semibold text-slide-accent">{current.warning}</p>}</footer>
      </article></div>
      {paused && <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-stage text-navy-foreground"><Pause className="h-16 w-16" /><h2 className="text-3xl font-bold">Apresentação pausada</h2><Button onClick={() => setPaused(false)}><Play />Continuar</Button></div>}
    </div>
    <footer className="border-t border-sidebar-border bg-navy text-navy-foreground"><div className="h-1 bg-sidebar-accent"><div className="h-full bg-alert transition-all" style={{ width: `${((index + 1) / p.slides.length) * 100}%` }} /></div><div className="flex flex-wrap items-center justify-between gap-3 p-3">
      <div className="flex items-center gap-2"><Button variant="secondary" size="icon" aria-label="Slide anterior" title="Slide anterior" disabled={index === 0 || busy || paused} onClick={() => void go(index - 1)}><ArrowLeft /></Button><select aria-label="Ir para slide" className="h-9 max-w-56 rounded-md border border-sidebar-border bg-navy px-2 text-sm text-navy-foreground" value={index} disabled={busy || paused} onChange={(e) => void go(Number(e.target.value))}>{p.slides.map((s, i) => <option value={i} key={i}>{i + 1}. {s.title}</option>)}</select><Button variant="secondary" size="icon" aria-label="Próximo slide" title="Próximo slide" disabled={index === p.slides.length - 1 || busy || paused} onClick={() => void go(index + 1)}><ArrowRight /></Button></div>
      <p className="text-xs tabular-nums opacity-80">{index + 1}/{p.slides.length} · {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")} · Quiz: {Object.values(points).filter(Boolean).length}/{Object.keys(points).length}{busy ? " · Salvando…" : session ? " · Progresso salvo" : ""}</p>
      <div className="flex gap-2"><Button variant="secondary" size="icon" title={paused ? "Continuar apresentação" : "Pausar apresentação"} aria-label={paused ? "Continuar apresentação" : "Pausar apresentação"} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</Button>{!fullscreen && <Button variant="secondary" size="icon" aria-label="Notas do instrutor" title="Notas do instrutor" aria-pressed={notes} onClick={() => setNotes(!notes)}><NotebookPen /></Button>}<Button variant="secondary" size="icon" aria-label={fullscreen ? "Sair da tela cheia" : "Tela cheia"} title={fullscreen ? "Sair da tela cheia" : "Tela cheia"} onClick={() => void toggleFullscreen()}>{fullscreen ? <Minimize /> : <Maximize />}</Button></div>
    </div></footer>
    {notes && !fullscreen && <aside className="max-h-64 overflow-y-auto bg-card px-6 py-5 text-card-foreground"><h2 className="font-bold">Notas do instrutor · {current.minutes ?? "—"} min sugeridos</h2><p className="mt-2 text-sm">{current.notes}</p>{current.answer !== undefined && <p className="mt-2 text-sm font-semibold">Resposta: {options[current.answer]}</p>}{session?.notes && <p className="mt-2 border-t pt-2 text-sm">Observações da turma: {session.notes}</p>}</aside>}
    <Dialog open={finish} onOpenChange={setFinish}><DialogContent><DialogHeader><DialogTitle>Encerrar esta aula?</DialogTitle><DialogDescription>O progresso será mantido e a turma ficará no histórico. A conclusão da aula não emite certificados automaticamente.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" disabled={busy} onClick={() => setFinish(false)}>Continuar aula</Button><Button disabled={busy} onClick={() => void end()}>Confirmar encerramento</Button></DialogFooter></DialogContent></Dialog>
  </div>;
}

function kindLabel(s: Slide) {
  const labels: Record<Slide["kind"], string> = { cover: "Treinamento presencial", content: "Conhecimento que protege", image: "Observe e identifique", quiz: "Pergunta ao grupo", truefalse: "Verdadeiro ou falso", discussion: "Vamos conversar", case: "O que você faria?", practice: "Prática supervisionada", video: "Demonstração", summary: "Pontos-chave", section: "Próxima etapa" };
  return labels[s.kind];
}
