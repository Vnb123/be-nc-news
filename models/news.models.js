const db = require("../db/connection");

const selectAllTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    const topic = rows;
    return topic;
  });
};

module.exports = { selectAllTopics };
