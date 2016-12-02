DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255) NOT NULL
);

CREATE TABLE articles (
  id              SERIAL PRIMARY KEY,
  title           VARCHAR NOT NULL,
  url             VARCHAR NOT NULL,
  user_id         INTEGER REFERENCES users
);





