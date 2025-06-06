const handlePostgressErrors = (err, request, responds, next) => {
  if (err.code === "22P02") {
    responds.status(400).send({ msg: "bad request" });
  }
};

const handleCustomErrors = (err, request, responds, next) => {
  if (err.status && err.msg) {
    responds.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handleServerErrors = (err, request, responds, next) => {
  responds.status(500).send({ msg: "Internal server error" });
};

module.exports = {
  handlePostgressErrors,
  handleServerErrors,
  handleCustomErrors,
};
