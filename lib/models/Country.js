const mongoose = require("../db/connection");
const Schema = mongoose.Schema;
const monthSchema = require("./Month");

const countrySchema = new Schema({
  country: {
    type: String
  },
  country_lower: {
    type: String
  },
  months: [monthSchema]
});

module.exports = countrySchema;
