export type AreaId = "brigada" | "socorros" | "combate" | "ccb";
export type Level = "Básico" | "Intermediário" | "Avançado" | "Único";
export type ImageKey = "brigada" | "socorros" | "combate" | "igreja";

export type SlideKind =
  | "cover"
  | "content"
  | "image"
  | "quiz"
  | "truefalse"
  | "discussion"
  | "case"
  | "practice"
  | "video"
  | "summary"
  | "section";

export interface Slide {
  kind: SlideKind;
  title: string;
  kicker?: string;
  subtitle?: string;
  bullets?: string[];
  image?: ImageKey;
  question?: string;
  options?: string[];
  answer?: number; // index of correct option (quiz) or 0=Verdadeiro/1=Falso
  explanation?: string;
  ref?: string; // short normative reference shown on slide
  notes: string; // instructor notes (hidden from audience)
  minutes?: number;
  warning?: string;
}

export interface AssessmentQuestion {
  q: string;
  options: string[];
  answer: number;
}

export interface Presentation {
  id: string;
  area: AreaId;
  track: string;
  level: Level;
  title: string;
  audience: string;
  durationMin: number;
  theme?: "ccb";
  objective: string;
  checklist: string[];
  practicalRisks: string[];
  slides: Slide[];
  assessment: AssessmentQuestion[];
}
