const express = require("express");
const app = express();
const router = require("./routes");
const parser = require("body-parser");
const cors = require("cors");

app.use(parser.json());
app.use(cors());
app.use(router);
app.get("/", (req, res) => {
  res.json({
    "Temperature by Country": "http://localhost:4000/country"
  });
});
app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}`);
});
