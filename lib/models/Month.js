const mongoose = require("../db/connection");
const Schema = mongoose.Schema;
const World = require("./World");

const Month = new Schema({
  temp: {
    type: Number
  },
  tempUncert: {
    type: Number
  },
  date: {
    type: Date
  },
  global: World
});

module.exports = Month;
