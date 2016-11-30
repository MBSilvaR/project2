DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255) NOT NULL
);



DROP TABLE IF EXISTS artwork;

CREATE TABLE articles (
  id              SERIAL          PRIMARY KEY,
  abstract        VARCHAR(255)    NOT NULL,
  byline          VARCHAR(255)    NOT NULL,
  media           VARCHAR(255)    NOT NULL,
  published_date  VARCHAR(255)    NOT NULL,
  title           VARCHAR(255)    NOT NULL,
  url             VARCHAR(255)    NOT NULL,
  user_id         INTEGER REFERENCES users
);
