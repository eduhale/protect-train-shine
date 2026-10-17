# Protect Train Shine

PROMPT PARA O LOVABLE — PLATAFORMA DE TREINAMENTOS PRESENCIAIS DE BRIGADA DE INCÊNDIO, PRIMEIROS SOCORROS E COMBATE A INCÊNDIO



1. OBJETIVO DO PROJETO



Desenvolva uma plataforma web profissional, moderna, responsiva e interativa para ministrar treinamentos presenciais de brigada de incêndio, primeiros socorros, Lei Lucas e combate a incêndio, destinados a igrejas, empresas, comércios e instituições.



A plataforma funcionará como um sistema de apresentação de treinamentos presenciais, semelhante a um PowerPoint profissional, mas com recursos interativos, imagens ilustrativas, vídeos, animações, perguntas ao público, estudos de caso, exercícios simulados, avaliações e orientações para atividades práticas.



O instrutor utilizará a plataforma em notebook, computador ou tablet conectado a um projetor ou televisão durante as aulas presenciais.



O conteúdo deve ser organizado em módulos, níveis de formação e apresentações em slides, permitindo que o instrutor conduza a aula sem precisar utilizar outros programas.



O projeto deve considerar a legislação brasileira aplicável e as normas e instruções técnicas vigentes do Corpo de Bombeiros da Polícia Militar do Estado de São Paulo (CBPMESP), incluindo a IT 17 — Brigada de Incêndio, quando aplicável, a legislação de segurança contra incêndio e as normas técnicas pertinentes.



Não invente exigências normativas. Sempre identifique a fonte, a versão e a data de referência dos requisitos técnicos. Quando houver necessidade de confirmação, sinalize que o conteúdo deve ser validado pelo responsável técnico antes de ser ministrado como treinamento regulamentado.



2. LOGIN E SEGURANÇA



Ao acessar o endereço da plataforma, exibir uma tela de login antes de liberar qualquer módulo.



Criar uma página de acesso elegante com:



- Logotipo e nome da plataforma.

- Campo de usuário.

- Campo de senha.

- Botão “Entrar na plataforma”.

- Opção para mostrar ou ocultar senha.

- Mensagens de erro claras.

- Layout profissional e adaptado para celular e computador.



Credenciais iniciais para ambiente de demonstração:



Usuário: Eduardobc



Senha inicial: 123456



IMPORTANTE: essas credenciais devem ser utilizadas somente para configurar o acesso inicial de demonstração. Na versão publicada, implementar autenticação real, armazenamento seguro de senhas, controle de sessão, proteção de rotas e possibilidade de alterar a senha. Não armazenar senhas em texto puro, código JavaScript público ou banco de dados sem proteção.



Utilizar Supabase Auth ou uma solução equivalente para autenticação e Supabase para banco de dados, se necessário.



Criar inicialmente um perfil de administrador/instrutor com acesso aos cursos, configurações, avaliações e gerenciamento de conteúdo.



3. DASHBOARD PRINCIPAL



Após o login, exibir um painel inicial com o título:



“CENTRO DE TREINAMENTO — SEGURANÇA, PREVENÇÃO E EMERGÊNCIA”



Subtítulo:



“Conhecimento que protege vidas.”



O dashboard deve apresentar três grandes áreas principais:



1. Brigada de Incêndio.

2. Primeiros Socorros.

3. Combate a Incêndio.



Cada área deve possuir um card com imagem ilustrativa, descrição, níveis disponíveis, duração estimada e botão “Acessar treinamento”.



Adicionar também:



- Continuar treinamento.

- Treinamentos disponíveis.

- Materiais de apoio.

- Avaliações.

- Histórico de aulas ministradas.

- Configurações do instrutor.



4. ESTRUTURA DOS MÓDULOS



MÓDULO 1 — BRIGADA DE INCÊNDIO



Criar uma área completa de treinamento de brigada de incêndio, separada em dois públicos.



1.1. BRIGADA DE INCÊNDIO PARA IGREJAS



Disponibilizar três níveis:



- Básico.

- Intermediário.

- Avançado.



O nível básico deve priorizar uma apresentação objetiva, visual e acessível, adequada à realidade de uma igreja e à rotina de seus voluntários.



O conteúdo deve considerar prevenção, reconhecimento de riscos, organização da evacuação, acionamento dos serviços de emergência e procedimentos seguros em situações de princípio de incêndio.



O nível intermediário deve aprofundar a análise de riscos, a organização das equipes, a comunicação durante emergências e os exercícios de abandono.



O nível avançado deve abordar cenários complexos, coordenação das equipes, simulações integradas e análise pós-exercício, respeitando os limites de atuação e a capacitação dos participantes.



1.2. BRIGADA DE INCÊNDIO PARA EMPRESAS



Disponibilizar três níveis:



- Básico.

- Intermediário.

- Avançado.



Organizar o conteúdo de acordo com o perfil da ocupação, os riscos da atividade, as características da edificação, a quantidade de participantes e os requisitos legais aplicáveis.



Abordar prevenção de incêndios, identificação de riscos, procedimentos de emergência, abandono de área, comunicação, primeiros socorros, equipamentos de proteção e combate inicial ao fogo, quando compatível com a formação e os recursos disponíveis.



O sistema deve permitir selecionar o tipo de estabelecimento, como comércio, escritório, indústria, condomínio, escola ou instituição religiosa.



Os conteúdos, a carga horária e os critérios de conclusão devem ser configuráveis para atender aos requisitos vigentes aplicáveis a cada ocupação e nível de treinamento.



MÓDULO EXCLUSIVO — CONGREGAÇÃO CRISTÃ NO BRASIL (CCB)



Criar uma seção exclusiva denominada:



“PREVENÇÃO E SEGURANÇA — CONGREGAÇÃO CRISTÃ NO BRASIL”



Este módulo terá identidade visual própria, discreta, sóbria e respeitosa, utilizando branco, azul-marinho e tons neutros como referência visual inicial, sem inventar ou alterar símbolos oficiais da instituição.



Não utilizar logotipos oficiais sem autorização.



A apresentação deve respeitar o ambiente religioso, utilizando linguagem simples, respeitosa, acolhedora e objetiva, sem transformar o treinamento em uma pregação ou inserir conteúdo doutrinário não solicitado.



Treinamento básico para igrejas — duração-alvo de até 3 horas.



Criar uma apresentação planejada para aproximadamente 180 minutos, incluindo explicações teóricas, perguntas ao público, demonstrações e uma atividade prática segura.



Estrutura sugerida:



1. Abertura e sensibilização — 10 minutos.

2. Prevenção de incêndios no templo — 20 minutos.

3. Identificação de riscos e equipamentos de segurança — 20 minutos.

4. Alarme, comunicação e acionamento do Corpo de Bombeiros — 15 minutos.

5. Rotas de fuga e abandono organizado — 25 minutos.

6. Cuidados com crianças, idosos e pessoas com mobilidade reduzida — 20 minutos.

7. Primeiros cuidados em situações de emergência — 15 minutos.

8. Demonstração prática de equipamentos e procedimentos seguros — 30 minutos.

9. Simulação orientada de abandono de área — 15 minutos.

10. Perguntas, revisão e avaliação final — 10 minutos.



Total previsto: 180 minutos.



Essa distribuição é uma proposta didática, não uma declaração de carga horária regulamentar. Antes de apresentar o curso como formação oficial de brigadistas, verificar os requisitos aplicáveis à ocupação e à formação exigida pelo CBPMESP.



O treinamento deve enfatizar:



- Prevenção de incêndios durante cultos e reuniões.

- Organização da saída dos ocupantes.

- Desobstrução de corredores, portas e saídas de emergência.

- Identificação das rotas de fuga e dos pontos de encontro.

- Cuidados com instalações elétricas.

- Uso seguro de equipamentos de combate a incêndio.

- Acionamento do telefone 193 em emergências.

- Apoio a crianças, idosos e pessoas com deficiência.

- Comunicação clara, calma e organizada.

- Proibição de retorno à edificação durante uma emergência sem autorização competente.



Criar opções de aprofundamento intermediário e avançado para igrejas que necessitem de preparação complementar, conforme os riscos identificados e os requisitos aplicáveis.



As aulas devem conter teoria e prática. Não substituir atividades práticas obrigatórias por simples apresentação de slides.



MÓDULO 2 — PRIMEIROS SOCORROS



Criar uma área específica para primeiros socorros com duas trilhas.



2.1. LEI LUCAS



Desenvolver um treinamento voltado à prevenção de acidentes e aos primeiros socorros em ambientes escolares e de educação infantil, observando a Lei Federal nº 13.722/2018 e demais regras aplicáveis.



Conteúdo sugerido:



- Objetivo e aplicação da Lei Lucas.

- Prevenção de acidentes.

- Avaliação inicial da segurança do local.

- Reconhecimento de situações de emergência.

- Acionamento do SAMU (192) e do Corpo de Bombeiros (193), conforme a ocorrência.

- Engasgo em bebês, crianças e adultos.

- Desmaios e convulsões.

- Quedas, ferimentos e hemorragias.

- Parada cardiorrespiratória.

- Noções de RCP e uso do DEA.

- Simulações práticas supervisionadas.

- Avaliação final.



Diferenciar claramente o que pode ser ensinado em uma apresentação teórica e o que exige prática presencial, equipamentos apropriados e instrutor qualificado.



2.2. PRIMEIROS SOCORROS — BÁSICO, INTERMEDIÁRIO E AVANÇADO



Criar três níveis progressivos.



Básico:



- Segurança da cena.

- Avaliação inicial.

- Acionamento da emergência.

- Desmaios, quedas e ferimentos.

- Engasgo e reconhecimento de situações graves.



Intermediário:



- Avaliação sistemática da vítima.

- Hemorragias e controle inicial.

- Emergências clínicas.

- RCP e DEA, conforme treinamento prático apropriado.

- Organização do atendimento até a chegada do socorro especializado.



Avançado:



- Cenários simulados integrados.

- Gestão inicial de múltiplas vítimas.

- Comunicação e coordenação da equipe.

- Simulações práticas de maior complexidade.



O termo “avançado” deve representar o nível didático do curso, sem sugerir habilitação profissional em atendimento pré-hospitalar ou autorização para executar procedimentos restritos a profissionais de saúde.



MÓDULO 3 — COMBATE A INCÊNDIO



Criar um módulo completo, organizado em níveis progressivos.



Conteúdo:



- Conceitos fundamentais do fogo e da combustão.

- Tetraedro do fogo.

- Classes de incêndio.

- Métodos de extinção.

- Tipos de extintores e aplicações.

- Sistemas de hidrantes e mangotinhos.

- Alarmes e detecção de incêndio.

- Equipamentos de proteção.

- Riscos de fumaça e gases tóxicos.

- Isolamento e abandono de área.

- Limites de atuação da brigada.

- Simulações de tomada de decisão.

- Avaliação final.



Utilizar exemplos visuais de diferentes equipamentos e instalações.



Todas as atividades com fogo real devem ser realizadas exclusivamente em local apropriado, com controle dos riscos, equipamentos adequados e supervisão de instrutor habilitado. Não orientar participantes a combater incêndios fora dos limites seguros de sua capacitação.



5. SISTEMA DE APRESENTAÇÃO EM SLIDES



Este é um dos recursos mais importantes da plataforma.



Criar um modo de apresentação presencial que ocupe toda a tela, semelhante a um PowerPoint profissional.



Cada aula deve ser composta por slides com:



- Título objetivo.

- Texto curto e de fácil leitura.

- Fotografias e ilustrações de boa qualidade.

- Diagramas explicativos.

- Ícones e destaques visuais.

- Animações discretas, quando úteis.

- Perguntas para discussão.

- Situações-problema.

- Resumos e pontos-chave.



Adicionar os seguintes controles:



- Slide anterior.

- Próximo slide.

- Iniciar apresentação.

- Pausar apresentação.

- Tela cheia.

- Mostrar ou ocultar notas do instrutor.

- Ir para um slide específico.

- Encerrar apresentação.

- Indicador de progresso.

- Contador de slides.

- Atalho pelo teclado com setas.



A interface deve ser legível a distância, com fontes grandes, bom contraste e pouco texto por slide.



Criar um modo do instrutor com notas explicativas, respostas das perguntas, duração sugerida e orientação da atividade prática. As notas devem ficar ocultas para o público durante a apresentação.



6. INTERAÇÃO COM OS PARTICIPANTES



O treinamento não pode ser apenas uma sequência de textos.



Criar recursos para tornar as aulas dinâmicas, descontraídas e participativas:



- Perguntas de múltipla escolha.

- Verdadeiro ou falso.

- Quiz com pontuação.

- Perguntas para discussão em grupo.

- Estudos de caso.

- Simulações de tomada de decisão.

- Situações de “O que você faria?”.

- Identificação de riscos em imagens.

- Desafios rápidos entre equipes.

- Revisão dos principais conceitos.



Exemplo de atividade:



“Durante uma reunião na igreja, uma pessoa percebe fumaça saindo de uma sala próxima. Qual deve ser a primeira atitude?”



Apresentar alternativas, permitir que o instrutor peça respostas aos participantes e, depois, revelar a resposta comentada.



As atividades devem ensinar a conduta correta, explicar os riscos das escolhas inadequadas e reforçar quando o mais seguro é abandonar a área e acionar o socorro.



Não depender de celulares individuais para que as atividades funcionem. O instrutor deve poder conduzir toda a interação oralmente, com o projetor.



7. IMAGENS, VÍDEOS E RECURSOS VISUAIS



Utilizar imagens relevantes e tecnicamente coerentes com o tema de cada slide.



Priorizar:



- Bombeiros civis em treinamentos.

- Equipamentos de proteção.

- Extintores e hidrantes.

- Rotas de fuga.

- Plantas simplificadas de edificações.

- Simulações de abandono.

- Atendimento inicial de primeiros socorros.

- Ambientes de igrejas, escolas e empresas.



Evitar imagens decorativas sem relação com o conteúdo ou fotografias que representem procedimentos incorretos.



Criar espaços preparados para incorporar vídeos demonstrativos, com opção de reprodução e pausa durante a apresentação.



Utilizar somente imagens e vídeos com direitos de uso adequados. Quando houver conteúdo externo, registrar a fonte.



8. NORMAS E REFERÊNCIAS TÉCNICAS



Criar uma área denominada “Referências Normativas”.



Ela deverá reunir, conforme a aplicabilidade:



- Regulamento de Segurança Contra Incêndios das edificações e áreas de risco do Estado de São Paulo.

- Instrução Técnica IT 17 — Brigada de Incêndio, em sua versão vigente.

- Demais Instruções Técnicas do CBPMESP pertinentes ao conteúdo ministrado.

- Normas ABNT aplicáveis, com identificação correta da edição.

- Lei Federal nº 13.722/2018 — Lei Lucas.

- Outras leis e normas relacionadas ao tema de cada curso.



Sempre que um slide mencionar uma exigência normativa, exibir uma referência curta e rastreável, quando pertinente.



Criar campos para registrar o número da norma, título, edição ou versão, data de consulta e link para a fonte oficial.



Não inventar números de normas, artigos, tabelas ou exigências. Não apresentar recomendações didáticas como obrigações legais.



Se não houver mecanismo de consulta automática, permitir atualização manual das referências pelo administrador.



9. CADASTRO E ORGANIZAÇÃO DOS TREINAMENTOS



Criar uma estrutura que permita ao instrutor selecionar:



- Público-alvo.

- Instituição ou empresa.

- Tipo de treinamento.

- Nível do curso.

- Data da aula.

- Carga horária prevista.

- Quantidade de participantes.

- Conteúdo programado.

- Avaliação.

- Atividades práticas.



Permitir salvar o progresso da apresentação e retomar a aula posteriormente.



Permitir cadastrar diferentes turmas e consultar treinamentos ministrados anteriormente.



Criar uma tela de preparação da aula com checklist de equipamentos, materiais necessários, riscos da atividade prática e orientações para o instrutor.



10. AVALIAÇÕES E CERTIFICADOS



Criar um módulo de avaliação com perguntas relacionadas ao conteúdo ministrado.



Permitir configurar nota mínima, quantidade de questões e tentativas.



Exibir resultado individual ou consolidado da turma, conforme a configuração de privacidade.



Preparar um modelo de certificado com campos para:



- Nome do participante.

- Nome do treinamento.

- Carga horária efetivamente cumprida.

- Data de realização.

- Identificação do instrutor.

- Identificação da instituição responsável.

- Assinaturas.

- Código de verificação, quando implementado.



O certificado somente poderá ser emitido depois do registro dos requisitos de participação e conclusão definidos para o curso.



Não declarar automaticamente que o certificado atende às exigências oficiais de formação de brigadistas. A emissão e a validade devem respeitar os requisitos aplicáveis, as qualificações do instrutor e as condições de realização do treinamento.



11. IDENTIDADE VISUAL E EXPERIÊNCIA DO USUÁRIO



Criar uma interface moderna, profissional e confiável, com aparência de um centro de formação em segurança.



Direção visual:



- Fundo predominantemente branco ou cinza-claro nas áreas administrativas.

- Azul-marinho para elementos institucionais.

- Vermelho para alertas, incêndio e situações de risco.

- Ícones profissionais.

- Cards com bordas discretas.

- Tipografia de excelente legibilidade.

- Imagens grandes e de qualidade.

- Navegação simples e intuitiva.



No módulo exclusivo da Congregação Cristã no Brasil, aplicar uma identidade visual sóbria e respeitosa, separada da identidade geral da plataforma.



Evitar excesso de cores, efeitos chamativos, excesso de texto e elementos que prejudiquem a leitura em projeção.



A plataforma deve funcionar em computadores, tablets e celulares, com prioridade para o modo de apresentação em telas grandes.



12. REQUISITOS TÉCNICOS



Desenvolver a aplicação com uma arquitetura organizada e fácil de manter.



Utilizar:



- React com TypeScript.

- Tailwind CSS.

- Componentes reutilizáveis.

- Supabase para autenticação e banco de dados, se aplicável.

- Banco de dados organizado para cursos, módulos, aulas, slides, avaliações e turmas.

- Políticas de segurança e controle de acesso.

- Layout responsivo.

- Tratamento de erros e estados de carregamento.



Não criar apenas uma landing page ou um protótipo visual sem funcionalidades.



Os botões devem funcionar, a navegação entre os módulos deve ser real e o modo de apresentação deve permitir avançar e voltar entre os slides.



Persistir os dados necessários para que os treinamentos cadastrados não desapareçam ao atualizar a página.



Criar dados de demonstração para todos os módulos, com conteúdo inicial organizado e funcional.



13. CONTEÚDO INICIAL OBRIGATÓRIO



A plataforma não deve abrir com módulos vazios.



Criar pelo menos uma apresentação inicial completa para cada uma destas áreas:



1. Brigada de incêndio para igrejas — básico.

2. Brigada de incêndio para igrejas — intermediário.

3. Brigada de incêndio para igrejas — avançado.

4. Brigada de incêndio para empresas — básico.

5. Brigada de incêndio para empresas — intermediário.

6. Brigada de incêndio para empresas — avançado.

7. Congregação Cristã no Brasil — treinamento básico de até 3 horas.

8. Lei Lucas — primeiros socorros.

9. Primeiros socorros — básico.

10. Primeiros socorros — intermediário.

11. Primeiros socorros — avançado.

12. Combate a incêndio.



Cada apresentação deve conter uma sequência lógica de slides, explicações para o instrutor, exemplos visuais, perguntas interativas, resumo e avaliação final.



O conteúdo deve ser em português brasileiro, com linguagem técnica correta e explicações acessíveis para pessoas sem experiência prévia.



14. ORDEM DE DESENVOLVIMENTO



Desenvolver o projeto em etapas, mantendo a aplicação funcional em cada etapa.



ETAPA 1 — Criar o login, a autenticação e o dashboard.



ETAPA 2 — Criar os módulos, submódulos, níveis e navegação.



ETAPA 3 — Implementar o visualizador de slides, modo tela cheia, notas do instrutor e controles de apresentação.



ETAPA 4 — Implementar imagens, perguntas interativas, quizzes e avaliações.



ETAPA 5 — Desenvolver os conteúdos iniciais, especialmente o treinamento básico para igrejas e o módulo exclusivo da Congregação Cristã no Brasil.



ETAPA 6 — Criar cadastro de turmas, histórico, certificados e materiais de apoio.



ETAPA 7 — Validar responsividade, segurança, funcionamento dos botões, persistência dos dados e referências normativas.



15. INSTRUÇÃO FINAL AO LOVABLE



Comece implementando a estrutura real da aplicação, não apenas a aparência.



Priorize primeiro uma experiência funcional de login, dashboard e apresentação de slides. Em seguida, desenvolva os módulos de treinamento com conteúdo de demonstração de qualidade.



Não utilize botões sem ação, links fictícios, avaliações vazias ou conteúdos genéricos repetidos.



Antes de concluir, verifique se o instrutor consegue entrar na plataforma, selecionar um treinamento, iniciar a apresentação, avançar e voltar pelos slides, realizar uma pergunta interativa, consultar suas notas e finalizar a aula.



O resultado deve ser uma plataforma que eu possa utilizar presencialmente com um projetor para ministrar treinamentos profissionais de brigada de incêndio, primeiros socorros e combate a incêndio para igrejas e empresas.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ba993e36-c03e-49de-872e-5c0c69178acf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
