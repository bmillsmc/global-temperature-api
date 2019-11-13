const mongoose = require("../db/connection");
const Schema = mongoose.Schema;
const worldSchema = require("./World");

const monthSchema = new Schema({
  temp: {
    type: Number
  },
  tempUncert: {
    type: Number
  },
  date: {
    type: Date
  },
  global: worldSchema
});

module.exports = monthSchema;
