const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const app = require("../app");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});
describe("GET /api/topics", () => {
  test("200: responds with an an object with the key of topics and the value of an array of topic objects with specific properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics.length).not.toBe(0);

        topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
          expect(topic).not.toHaveProperty("img_url");
        });
      });
  });
});
describe("GET /api/articles", () => {
  test("200: responds with an object with the key of articles and the value of an array of article objects with specific properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).not.toBe(0);
        articles.forEach((article) => {
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.author).toBe("string");
          expect(article).not.toHaveProperty("body");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        });
      });
  });
});
describe("GET /api/users", () => {
  test("200: responds with an object with the key of users and the value of an array of objects with all of its properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users.length).not.toBe(0);
        users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});
describe("GET /api/articles/:article_id", () => {
  test("200: responds with an object with a key of article and the value of an article object containing data belonging to the relevant article_id ", () => {
    return request(app)
      .get("/api/articles/4")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.article_id).toBe(4);
        expect(article).toHaveProperty("body");
      });
  });
  test("404: responds with an error message if article_id does not exist", () => {
    return request(app)
      .get("/api/articles/99")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400: responds with an error message when recieving an invalid input", () => {
    return request(app)
      .get("/api/articles/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with an object with a key of comments and the value of an array of comments for the given article_id in descending order", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments.length).not.toBe(0);
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(comment.article_id).toBe(1);
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.created_at).toBe("string");
        });
      });
  });
  test("404: responds with an error message if article_id does not exist", () => {
    return request(app)
      .get("/api/articles/99/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400: responds with an error message when recieving an invalid input", () => {
    return request(app)
      .get("/api/articles/notAnId/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("200: responds with an empty array if article_id exists but there are no comments", () => {
    return request(app)
      .get("/api/articles/4/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toEqual([]);
      });
  });
});
describe("POST /api/articles/:article_id/comments", () => {
  test("201: Responds with a posted comment", () => {
    return request(app)
      .post("/api/articles/9/comments")
      .send({ username: "rogersop", body: "Well what are they then?" })
      .expect(201)
      .then(({ body }) => {
        const comment = body.comments[0];
        expect(comment).toHaveProperty("comment_id");
        expect(comment.author).toBe("rogersop");
        expect(typeof comment.body).toBe("string");
      });
  });
  test("400: responds with an error message when posting a comment without required fields", () => {
    return request(app)
      .post("/api/articles/9/comments")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("400: responds with an error message when the value of the field is invalid", () => {
    return request(app)
      .post("/api/articles/9/comments")
      .send({ username: 2534, body: {} })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("404: responds with an error message when there is a foreign key violation", () => {
    return request(app)
      .post("/api/articles/9/comments")
      .send({ username: "Meow250", body: "Oops" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
describe("PATCH /api/articles/:article_id", () => {
  test("200: responds with an increase in votes in the article when updated", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.votes).toBe(1);
      });
  });
  test("200: responds with a decrease in votes in the article when updated", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: -1 })
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.votes).toBe(-1);
      });
  });
  test("200: Responds with an ignored patch request if no body is found, and sends back unchanged article to the user", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({})
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.votes).toBe(0);
      });
  });
  test("400: responds with an error when attempting to update a body with invalid fields", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: "hello" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("404: responds with an error message if article_id does not exist", () => {
    return request(app)
      .get("/api/articles/99/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
describe("DELETE /api/comments/:comment_id", () => {
  test("204: delete the given comment by comment_id", () => {
    return request(app)
      .delete("/api/comments/8")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
});
test("404: respond with an error when attempting to delete a resource that doesn't exist", () => {
  return request(app)
    .delete("/api/comments/99")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("not found");
    });
});
test("400: respond with an error when attempting to delete a comment referenced by an invalid ID", () => {
  return request(app)
    .delete("/api/comments/notAnId")
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("bad request");
    });
});
