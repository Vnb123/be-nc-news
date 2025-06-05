const endpoint = require("../endpoints.json");
const getApi = (request, response) => {
  response.status(200).send({ endpoints: endpoint });
};

module.exports = { getApi };
