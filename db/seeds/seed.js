const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate } = require("./utils.js");

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
    title VARCHAR,
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
    })
    .then(() => {
      const formattedTopicsValues = topicData.map(
        ({ slug, description, img_url }) => {
          return [slug, description, img_url];
        }
      );

      const sqlString = format(
        `INSERT INTO topics(slug, description, img_url) VALUES %L RETURNING *`,
        formattedTopicsValues
      );

      return db.query(sqlString);
    })
    .then(() => {
      const formattedUsersValues = userData.map(
        ({ username, name, avatar_url }) => {
          return [username, name, avatar_url];
        }
      );

      const sqlString = format(
        `INSERT INTO users(username, name, avatar_url) VALUES %L RETURNING *`,
        formattedUsersValues
      );

      return db.query(sqlString);
    })
    .then(() => {
      const formattedArticlesValues = articleData.map((article) => {
        const {
          title,
          topic,
          author,
          body,
          created_at,
          votes,
          article_img_url,
        } = convertTimestampToDate(article);

        return [title, topic, author, body, created_at, votes, article_img_url];
      });

      const sqlString = format(
        `INSERT INTO articles( title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`,
        formattedArticlesValues
      );

      return db.query(sqlString);
    })
    .then(() => {
      const formattedCommentsValues = commentData.map((comment) => {
        const { body, votes, author, created_at } =
          convertTimestampToDate(comment);

        return [body, votes, author, created_at];
      });

      const sqlString = format(
        `INSERT INTO comments( body, votes, author, created_at) VALUES %L RETURNING *`,
        formattedCommentsValues
      );

      return db.query(sqlString);
    });
};
module.exports = seed;
