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

-- alter table elements
--   enable row level security;

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

-- alter table element_connections
--   enable row level security;

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

-- alter table sequences
--   enable row level security;

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

-- alter table sequence_elements
--   enable row level security;

create trigger after_update_sequence_elements__set_updated_timestamp
  after update on sequence_elements
  for each row execute procedure private.set_updated_timestamp();
