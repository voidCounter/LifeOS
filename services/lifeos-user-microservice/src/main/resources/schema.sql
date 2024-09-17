create table if not exists
    public.users
(
    user_id      uuid   not null,
    name         text   null,
    knowledge_xp bigint null,
    password     text   not null,
    email        text   null,
    avatar_url   text   null,
    username     text   null,
    constraint user_pkey primary key (user_id),
    constraint users_email_key unique (email),
    constraint users_username_key unique (username)
) tablespace pg_default;

create table if not exists
    public.refresh_tokens
(
    token_id    uuid                     not null,
    expiry_date timestamp with time zone not null default now(),
    issued_at   timestamp with time zone null,
    user_id     uuid                     null,
    token       text                     null,
    constraint refresh_tokens_pkey primary key (token_id),
    constraint refresh_tokens_token_key unique (token),
    constraint refresh_tokens_user_id_fkey foreign key (user_id) references users (user_id) on delete cascade
) tablespace pg_default;