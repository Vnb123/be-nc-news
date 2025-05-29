const db = require("../connection");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
    .then(() => {
      return db.query(
        ` CREATE TABLE topics(
    slug VARCHAR(40) PRIMARY KEY,
    description VARCHAR(40) NOT NULL,
    img_url VARCHAR(1000)
    );`
      );
    })

    .then(() => {
      return db.query(
        `CREATE TABLE users(
    username VARCHAR(40) PRIMARY KEY,
    name VARCHAR(40),
    avatar_url VARCHAR(1000)
    );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE articles(
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    topic VARCHAR(40) REFERENCES topics (slug),
    author VARCHAR(40) REFERENCES users (username),
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT DEFAULT 0,
    article_img_url VARCHAR(1000)
    );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles (article_id),
    body TEXT,
    votes INT DEFAULT 0,
    author VARCHAR(40) REFERENCES users (username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
      );
    });
};

module.exports = seed;
