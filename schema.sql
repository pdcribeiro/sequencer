-- private schema

create schema private;

-- functions

create function private.set_updated_timestamp()
returns trigger
language plpgsql
security definer
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- elements

create table elements (
  id bigint generated always as identity primary key,

  name text not null check (trim(name) <> ''),
  description text not null default '',
  owner uuid references auth.users on delete cascade not null,

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone
);

alter table elements
  enable row level security;
create policy "Users can insert their own elements"
  on elements for insert
  to authenticated -- specifying authenticated role stops execution for anon users
  with check ((select auth.uid()) = owner);
create policy "Users can view their own elements"
  on elements for select
  to authenticated
  using ((select auth.uid()) = owner);
create policy "Users can update their own elements"
  on elements for update
  to authenticated
  using ((select auth.uid()) = owner);

create trigger after_update_elements__set_updated_timestamp
  after update on elements
  for each row execute procedure private.set_updated_timestamp();

-- element_connections

create table element_connections (
  id bigint generated always as identity primary key,

  element bigint references elements on delete cascade not null,
  next bigint references elements on delete cascade not null,

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone
);

alter table element_connections
  enable row level security;
create policy "Users can insert their own element connections"
  on element_connections for insert
  to authenticated
  with check (
    element in (
      select id
      from elements
      where (select auth.uid()) = owner
    )
  );
create policy "Users can view their own element connections"
  on element_connections for select
  to authenticated
  using (
    element in (
      select id
      from elements
      where (select auth.uid()) = owner
    )
  );
create policy "Users can delete their own element connections"
  on element_connections for delete
  to authenticated
  using (
    element in (
      select id
      from elements
      where (select auth.uid()) = owner
    )
  );

create trigger after_update_element_connections__set_updated_timestamp
  after update on element_connections
  for each row execute procedure private.set_updated_timestamp();

-- sequences

create table sequences (
  id bigint generated always as identity primary key,

  name text not null check (trim(name) <> ''),
  description text not null default '',
  owner uuid references auth.users on delete cascade not null,

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone
);

alter table sequences
  enable row level security;
create policy "Users can insert their own sequences"
  on sequences for insert
  to authenticated
  with check ((select auth.uid()) = owner);
create policy "Users can view their own sequences"
  on sequences for select
  to authenticated
  using ((select auth.uid()) = owner);
create policy "Users can update their own sequences"
  on sequences for update
  to authenticated
  using ((select auth.uid()) = owner);

create trigger after_update_sequences__set_updated_timestamp
  after update on sequences
  for each row execute procedure private.set_updated_timestamp();

-- sequence_elements

create table sequence_elements (
  id bigint generated always as identity primary key,

  sequence bigint references sequences on delete cascade not null,
  element bigint references elements on delete set null,
  prev bigint references sequence_elements on delete set null,
  next bigint references sequence_elements on delete set null,

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone
);

alter table sequence_elements
  enable row level security;
create policy "Users can insert their own sequence elements"
  on sequence_elements for insert
  to authenticated
  with check (
    sequence in (
      select id
      from sequences
      where (select auth.uid()) = owner
    )
  );
create policy "Users can view their own sequence elements"
  on sequence_elements for select
  to authenticated
  using (
    sequence in (
      select id
      from sequences
      where (select auth.uid()) = owner
    )
  );
create policy "Users can delete their own sequence elements"
  on sequence_elements for delete
  to authenticated
  using (
    sequence in (
      select id
      from sequences
      where (select auth.uid()) = owner
    )
  );

create trigger after_update_sequence_elements__set_updated_timestamp
  after update on sequence_elements
  for each row execute procedure private.set_updated_timestamp();
