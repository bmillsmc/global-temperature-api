const express = require("express");
const app = express();
const router = require("./routes");
const parser = require("body-parser");

app.use(parser.json());
app.use(router);
app.get("/", (req, res) => {
  res.json({
    "Temperature by Country": "http://localhost:4000/country"
  });
});

app.listen(4000, () => {
  console.log("running on port 4000");
});
