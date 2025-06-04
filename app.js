const express = require("express");
const { getApi, getAllTopics } = require("./controllers/news.controllers");
const app = express();

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getAllTopics);

module.exports = app;
