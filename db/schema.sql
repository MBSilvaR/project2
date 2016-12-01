DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
  id              SERIAL PRIMARY KEY,
  title             VARCHAR(255) NOT NULL,
  user_id         INTEGER REFERENCES users
);

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255) NOT NULL
);




