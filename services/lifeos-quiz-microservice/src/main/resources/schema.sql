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
    public.quizzes
(
    quiz_id             uuid                        not null,
    user_id             uuid                        not null,
    created_at          timestamp without time zone null default now(),
    published           boolean                     null default false,
    deleted             boolean                     null default false,
    quiz_title          text                        null,
    last_modified_at    timestamp without time zone null,
    quiz_description    text                        null,
    language            text                        null,
    categories          text[]                      null,
    number_of_questions integer                     null,
    constraint quiz_pkey primary key (quiz_id),
    constraint quiz_set_quiz_set_id_key unique (quiz_id),
    constraint quiz_user_id_fkey foreign key (user_id) references users (user_id)
) tablespace pg_default;

create table if not exists
    public.quiz_tests
(
    quiz_id         uuid                     not null,
    user_id         uuid                     not null,
    quiz_test_score integer                  null,
    test_taken_at   timestamp with time zone not null default now(),
    constraint quiz_test_pkey primary key (quiz_id, user_id),
    constraint quiz_test_quiz_id_fkey foreign key (quiz_id) references quizzes (quiz_id) on delete set null
) tablespace pg_default;


create table if not exists
    public.questions
(
    question_id         uuid                        not null,
    question_statement  text                        not null,
    created_at          timestamp without time zone null default now(),
    quiz_id             uuid                        null,
    question_type       text                        null,
    question_difficulty text                        null,
    constraint question_pkey primary key (question_id),
    constraint question_quiz_id_fkey foreign key (quiz_id) references quizzes (quiz_id) on delete cascade
) tablespace pg_default;

create table if not exists
    public.true_false_questions
(
    question_id              uuid    not null,
    true_option_explanation  text    not null,
    false_option_explanation text    null,
    answer                   boolean null,
    constraint true_false_question_pkey primary key (question_id),
    constraint true_false_question_question_id_fkey foreign key (question_id) references questions (question_id) on delete cascade
) tablespace pg_default;


create table if not exists
    public.short_answer_questions
(
    question_id        uuid not null,
    answer             text not null,
    answer_explanation text null,
    constraint short_answer_question_pkey primary key (question_id),
    constraint short_answer_question_question_id_fkey foreign key (question_id) references questions (question_id) on delete cascade
) tablespace pg_default;

create table if not exists
    public.multiple_choice_questions
(
    question_id uuid not null,
    constraint multiple_choice_question_pkey primary key (question_id),
    constraint multiple_choice_questions_question_id_fkey foreign key (question_id) references questions (question_id) on delete cascade
) tablespace pg_default;

create table if not exists
    public.multiple_choice_options
(
    question_id        uuid    not null,
    option_text        text    null,
    option_explanation text    null,
    correct            boolean null,
    option_id          uuid    not null,
    constraint multiple_choice_option_pkey primary key (option_id),
    constraint multiple_choice_options_question_id_fkey foreign key (question_id) references questions (question_id) on delete cascade
) tablespace pg_default;

create table if not exists
    public.folders
(
    folder_id    uuid                        not null,
    user_id      uuid                        not null,
    folder_title text                        null,
    created_at   timestamp without time zone null,
    constraint folder_pkey primary key (folder_id),
    constraint folder_creator_fkey foreign key (user_id) references users (user_id) on delete cascade
) tablespace pg_default;

create table if not exists
    public.folder_quizzes
(
    quiz_id   uuid not null,
    folder_id uuid not null,
    constraint folder_quizzes_pkey primary key (quiz_id, folder_id),
    constraint folder_quizzes_folder_id_fkey foreign key (folder_id) references folders (folder_id) on delete cascade,
    constraint folder_quizzes_quiz_id_fkey foreign key (quiz_id) references quizzes (quiz_id) on delete cascade
) tablespace pg_default;