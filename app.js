const express = require("express");
const app = express();
const {
  getTopics,
  getArticles,
  getUsers,
  getComments,
  postComments,
  patchArticles,
  deleteComments,
  patchComments,
} = require("./controllers/news.controller");
const { getApi } = require("./controllers/api.controller");

const {
  handlePostgressErrors,
  handleServerErrors,
  handleCustomErrors,
} = require("./errors.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComments);

app.patch("/api/articles/:article_id", patchArticles);

app.patch("/api/comments/:comment_id", patchComments);

app.delete("/api/comments/:comment_id", deleteComments);

app.use(handlePostgressErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
