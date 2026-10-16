import type { Presentation } from "../types";

export const combate: Presentation = {
  id: "combate-incendio",
  area: "combate",
  track: "Combate a Incêndio",
  level: "Básico",
  title: "Combate a Incêndio — Fundamentos",
  audience: "Brigadistas e colaboradores",
  durationMin: 240,
  objective: "Compreender o fogo, escolher o agente extintor, operar equipamentos e reconhecer os limites de atuação.",
  checklist: ["Extintores de treino (água, pó ABC, CO₂)", "Área externa preparada", "EPIs", "Abrigo de hidrante para demonstração"],
  practicalRisks: ["Fogo real só em local apropriado com instrutor habilitado", "Inalação de pó: posição a favor do vento"],
  slides: [
    { kind: "cover", title: "Combate a Incêndio", subtitle: "Fundamentos, equipamentos e limites de atuação", image: "brigada", notes: "Objetivo e regras de segurança da prática.", minutes: 5 },
    { kind: "content", kicker: "Combustão", title: "Tetraedro do fogo", bullets: ["Combustível", "Comburente (oxigênio)", "Calor", "Reação em cadeia"], notes: "Retire um elemento e o fogo se extingue: base dos métodos de extinção.", minutes: 20 },
    { kind: "content", kicker: "Extinção", title: "Métodos de extinção", bullets: ["Resfriamento — retira calor", "Abafamento — retira oxigênio", "Isolamento — retira combustível", "Quebra da reação em cadeia — agentes químicos"], notes: "Dê exemplos de cada um.", minutes: 20 },
    { kind: "content", kicker: "Classes", title: "Classes de incêndio", bullets: ["A — sólidos que deixam brasa", "B — líquidos e gases inflamáveis", "C — equipamentos energizados", "D — metais combustíveis · K — óleos de cozinha"], ref: "Conforme normas técnicas vigentes (IT 21 / ABNT) — confirmar", notes: "Associe cada classe a um ambiente.", minutes: 20 },
    { kind: "image", title: "Extintores e hidrantes", subtitle: "Identifique o agente pelo rótulo e verifique lacre, manômetro e validade", image: "combate", notes: "Passe extintores de treino de mão em mão.", minutes: 15 },
    { kind: "quiz", title: "Qual agente?", question: "Fogo em uma panela de óleo na cozinha. O que NÃO fazer?", options: ["Desligar o gás, se seguro", "Tampar a panela", "Jogar água", "Usar extintor classe K, se disponível"], answer: 2, explanation: "Água em óleo quente causa uma explosão de vapor que espalha o fogo. Abafar e cortar a fonte de calor é o correto.", notes: "Mostre um vídeo demonstrativo se disponível.", minutes: 8 },
    { kind: "content", kicker: "Fumaça", title: "O maior perigo é a fumaça", bullets: ["Gases tóxicos como monóxido de carbono", "Perda de visibilidade e desorientação", "Calor que queima as vias aéreas", "A maioria das vítimas é atingida pela fumaça"], notes: "Reforce: não entrar em ambiente com fumaça.", minutes: 20 },
    { kind: "content", kicker: "Limites", title: "Limites de atuação da brigada", bullets: ["Combater apenas princípios de incêndio", "Sempre com rota de fuga às costas", "Se não apagar em segundos, abandone", "Isolar a área, fechar portas e acionar 193"], warning: "Nunca combata incêndios fora dos limites seguros da sua capacitação.", notes: "Slide central do curso.", minutes: 15 },
    { kind: "case", title: "Tomada de decisão", question: "Você esvaziou um extintor e o fogo no depósito continua crescendo, com fumaça escura. E agora?", explanation: "Abandonar imediatamente, fechar a porta ao sair se possível, acionar o alarme e o 193, isolar a área e informar os bombeiros.", notes: "Discussão em grupo.", minutes: 10 },
    { kind: "video", title: "Vídeo demonstrativo", subtitle: "Espaço para vídeo de uso autorizado (ex.: operação de extintor)", notes: "Insira um vídeo com direitos de uso adequados e registre a fonte.", minutes: 7 },
    { kind: "practice", title: "Prática com extintores e hidrante", bullets: ["Inspeção e transporte do extintor", "Aproximação a favor do vento", "Jato na base, varrendo", "Linha de mangueira em dupla"], warning: "Fogo real apenas em local apropriado, com controle de riscos e instrutor habilitado.", notes: "Todos executam.", minutes: 80 },
    { kind: "summary", title: "Pontos-chave", bullets: ["Tetraedro e métodos de extinção", "Agente certo para cada classe", "Fumaça mata: não entre", "Respeite os limites e abandone a tempo"], notes: "Avaliação.", minutes: 20 },
  ],
  assessment: [
    { q: "Os elementos do tetraedro do fogo são:", options: ["Combustível, comburente, calor e reação em cadeia", "Água, ar, terra e fogo", "Fumaça, calor, luz e gás", "Oxigênio, CO₂, água e pó"], answer: 0 },
    { q: "Abafamento retira:", options: ["Calor", "Oxigênio", "Combustível", "Pressão"], answer: 1 },
    { q: "Em óleo de cozinha em chamas, nunca use:", options: ["Tampa", "Água", "Extintor classe K", "Desligar o gás"], answer: 1 },
    { q: "Se o fogo não apaga em poucos segundos com o extintor:", options: ["Buscar outro e insistir sozinho", "Abandonar, isolar e acionar 193", "Abrir janelas", "Jogar água"], answer: 1 },
  ],
};
