const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/global-temperatures", {
  useNewUrlParser: true
});
module.exports = mongoose;
