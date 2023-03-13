CREATE TABLE public.users (
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	username varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	CONSTRAINT user_data_pkey PRIMARY KEY (id),
	CONSTRAINT user_data_username_key UNIQUE (username)
);


CREATE TABLE public.todos (
	id int NOT NULL GENERATED ALWAYS AS IDENTITY,
	description varchar(100) NOT NULL,
	status varchar(30) NOT NULL,
	user_id int NOT NULL,
	CONSTRAINT todos_pkey PRIMARY KEY (id),
	CONSTRAINT todos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
