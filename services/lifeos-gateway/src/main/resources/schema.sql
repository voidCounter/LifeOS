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