const db = require("../db/connection");

const fetchArticles = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return rows;
    });
};

const fetchUsername = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
    });
};

const isCommentDataIncorrect = (username, body) => {
  if (
    !username ||
    typeof username !== "string" ||
    !body ||
    typeof body !== "string"
  ) {
    return true;
  } else {
    return false;
  }
};
module.exports = { fetchArticles, fetchUsername, isCommentDataIncorrect };
