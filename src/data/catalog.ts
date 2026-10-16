import brigadaImg from "@/assets/brigada.jpg";
import socorrosImg from "@/assets/socorros.jpg";
import combateImg from "@/assets/combate.jpg";
import igrejaImg from "@/assets/igreja.jpg";
import type { AreaId, ImageKey, Presentation } from "./types";
import { brigadaIgrejas } from "./presentations/brigada-igrejas";
import { brigadaEmpresas } from "./presentations/brigada-empresas";
import { ccb } from "./presentations/ccb";
import { socorros } from "./presentations/socorros";
import { combate } from "./presentations/combate";

export const images: Record<ImageKey, string> = {
  brigada: brigadaImg,
  socorros: socorrosImg,
  combate: combateImg,
  igreja: igrejaImg,
};

export const presentations: Presentation[] = [...brigadaIgrejas, ...brigadaEmpresas, ccb, ...socorros, combate];

export function getPresentation(id: string) {
  return presentations.find((p) => p.id === id);
}

export interface Area {
  id: AreaId;
  title: string;
  description: string;
  image: ImageKey;
}

export const areas: Area[] = [
  { id: "brigada", title: "Brigada de Incêndio", description: "Prevenção, abandono e resposta inicial para igrejas e empresas.", image: "brigada" },
  { id: "socorros", title: "Primeiros Socorros", description: "Lei Lucas e trilha progressiva de atendimento inicial.", image: "socorros" },
  { id: "combate", title: "Combate a Incêndio", description: "Fogo, extintores, hidrantes e limites de atuação.", image: "combate" },
  { id: "ccb", title: "Prevenção e Segurança — CCB", description: "Módulo exclusivo para a Congregação Cristã no Brasil, até 3 horas.", image: "igreja" },
];

export function presentationsByArea(area: AreaId) {
  return presentations.filter((p) => p.area === area);
}

export const establishmentTypes = ["Comércio", "Escritório", "Indústria", "Condomínio", "Escola", "Instituição religiosa"];

export function formatMinutes(m: number) {
  const h = Math.floor(m / 60);
  const r = m % 60;
  return h ? `${h}h${r ? ` ${r}min` : ""}` : `${r}min`;
}
