const mongoose = require("../db/connection");
const Schema = mongoose.Schema;
const Month = require("./Month");

const Country = new Schema({
  country: {
    type: String
  },
  months: [Month]
});

module.exports = Country;
