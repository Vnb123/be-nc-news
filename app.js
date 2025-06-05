const express = require("express");
const { getTopics, getArticles } = require("./controllers/news.controller");
const { getApi } = require("./controllers/api.controller");
const app = express();

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

module.exports = app;
