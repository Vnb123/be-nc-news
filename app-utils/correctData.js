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

module.exports = { isCommentDataIncorrect };
