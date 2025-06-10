const app = require("./app");
const { PORT = 7070 } = process.env;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on ${PORT}`);
  }
});
