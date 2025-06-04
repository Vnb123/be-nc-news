const { selectAllTopics } = require("../models/news.models");
const endpoint = require("../endpoints.json");

const getApi = (request, response) => {
  response.status(200).send({ endpoints: endpoint });
};
const getAllTopics = (request, response) => {
  selectAllTopics().then((topics) => {
    response.status(200).send(topics);
  });
};

module.exports = { getApi, getAllTopics };
