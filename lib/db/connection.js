const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:4000/global-temperatures", {
  useNewUrlParser: true
});
module.exports = mongoose;
