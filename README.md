# uft-electiva
Proyecto Saia

## Base de datos
Scripts iniciales para la base de datos
```sql
/* habilitar la funcion uuid_generate_v4() */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/* crear la tabla de usuarios */
CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

/* crear la tabla de tareas */
CREATE TABLE tasks (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(userId) REFERENCES users(id),
);
```