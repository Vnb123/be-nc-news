const db = require("../db/connection");

const selectTopics = () => {
  return db.query(`SELECT slug, description FROM topics`).then(({ rows }) => {
    return rows;
  });
};

const selectArticles = (article_id) => {
  if (article_id) {
    return db
      .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
      .then(({ rows }) => {
        if (!rows.length) {
          return Promise.reject({ status: 404, msg: "not found" });
        }
        return rows;
      });
  } else {
    return db
      .query(
        `SELECT articles.article_id, title, topic, articles.author, articles.created_at, articles.votes, article_img_url, COUNT (comments.article_id) as comment_count FROM articles LEFT JOIN comments ON (articles.article_id = comments.article_id) GROUP BY articles.article_id ORDER BY articles.created_at DESC`
      )
      .then(({ rows }) => {
        return rows;
      });
  }
};

const selectUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
};

const selectComments = (article_id) => {
  const queryParams = [];
  let queryString = `SELECT * FROM comments `;
  if (article_id) {
    queryParams.push(article_id);
    queryString += ` WHERE article_id = $${queryParams.length} `;
  }
  queryString += ` ORDER BY created_at DESC`;
  return db.query(queryString, queryParams).then(({ rows }) => {
    return rows;
  });
};

const insertComments = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments(article_id, author, body) VALUES ($1, $2, $3) RETURNING *`,
      [article_id, username, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

const updateArticles = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

const removeComments = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then(({ rows }) => {
      return rows[0];
    });
};
module.exports = {
  selectTopics,
  selectArticles,
  selectUsers,
  selectComments,
  insertComments,
  updateArticles,
  removeComments,
};
