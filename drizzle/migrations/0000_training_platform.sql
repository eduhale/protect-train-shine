create type public.app_role as enum ('admin','instructor');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create table public.training_sessions (
  id uuid primary key default gen_random_uuid(),
  instructor_id uuid not null default auth.uid(),
  presentation_id text not null,
  institution text not null default '',
  audience text not null default '',
  establishment_type text not null default '',
  class_name text not null default '',
  session_date date not null default current_date,
  planned_hours numeric not null default 0,
  participants_count int not null default 0,
  current_slide int not null default 0,
  status text not null default 'planejada',
  checklist jsonb not null default '{}'::jsonb,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.training_sessions to authenticated;
grant all on public.training_sessions to service_role;
alter table public.training_sessions enable row level security;
create policy "own sessions" on public.training_sessions for all to authenticated using (auth.uid() = instructor_id) with check (auth.uid() = instructor_id);

create table public.participants (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.training_sessions(id) on delete cascade,
  instructor_id uuid not null default auth.uid(),
  name text not null,
  attended boolean not null default false,
  practical_done boolean not null default false,
  score numeric,
  attempts int not null default 0,
  hours_completed numeric not null default 0,
  certificate_code text,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.participants to authenticated;
grant all on public.participants to service_role;
alter table public.participants enable row level security;
create policy "own participants" on public.participants for all to authenticated using (auth.uid() = instructor_id) with check (auth.uid() = instructor_id);

create table public.instructor_settings (
  user_id uuid primary key default auth.uid(),
  display_name text not null default '',
  credentials text not null default '',
  institution_name text not null default '',
  min_score numeric not null default 70,
  max_attempts int not null default 2,
  show_individual_results boolean not null default false,
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.instructor_settings to authenticated;
grant all on public.instructor_settings to service_role;
alter table public.instructor_settings enable row level security;
create policy "own settings" on public.instructor_settings for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.normative_references (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  title text not null,
  edition text not null default '',
  consulted_at date,
  url text not null default '',
  scope text not null default '',
  needs_validation boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.normative_references to authenticated;
grant insert, update, delete on public.normative_references to authenticated;
grant all on public.normative_references to service_role;
alter table public.normative_references enable row level security;
create policy "read refs" on public.normative_references for select to authenticated using (true);
create policy "admin write refs" on public.normative_references for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "admin update refs" on public.normative_references for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin delete refs" on public.normative_references for delete to authenticated using (public.has_role(auth.uid(),'admin'));

insert into public.normative_references (code, title, edition, url, scope, needs_validation) values
('Decreto Estadual nº 69.118/2024','Regulamento de Segurança Contra Incêndios das edificações e áreas de risco do Estado de São Paulo','Confirmar versão vigente','https://www.corpodebombeiros.sp.gov.br','Todos os cursos de brigada',true),
('IT 17','Instrução Técnica 17 — Brigada de Incêndio (CBPMESP)','Confirmar edição vigente no portal do CBPMESP','https://www.corpodebombeiros.sp.gov.br','Brigada de incêndio (igrejas, empresas, CCB)',true),
('IT 21','Instrução Técnica 21 — Sistema de proteção por extintores de incêndio (CBPMESP)','Confirmar edição vigente','https://www.corpodebombeiros.sp.gov.br','Combate a incêndio',true),
('IT 22','Instrução Técnica 22 — Sistemas de hidrantes e de mangotinhos (CBPMESP)','Confirmar edição vigente','https://www.corpodebombeiros.sp.gov.br','Combate a incêndio',true),
('IT 11','Instrução Técnica 11 — Saídas de emergência (CBPMESP)','Confirmar edição vigente','https://www.corpodebombeiros.sp.gov.br','Rotas de fuga e abandono',true),
('Lei Federal nº 13.722/2018','Lei Lucas — capacitação em noções básicas de primeiros socorros em estabelecimentos de ensino e recreação infantil','4 de outubro de 2018','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13722.htm','Lei Lucas',false),
('ABNT NBR 14276','Brigada de incêndio e emergência — Requisitos e procedimentos','Confirmar edição vigente na ABNT','https://www.abntcatalogo.com.br','Referência técnica complementar',true);