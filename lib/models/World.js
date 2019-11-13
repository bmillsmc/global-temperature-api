const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const worldSchema = new Schema({
  landAverageTemperature: {
    type: Number
  },
  landAverageTemperatureUncertainty: {
    type: Number
  },
  landMaxTemperature: {
    type: Number
  },
  landMaxTemperatureUncertainty: {
    type: Number
  },
  landMinTemperature: {
    type: Number
  },
  LandMinTemperatureUncertainty: {
    type: Number
  },
  landAndOceanAverageTemperature: {
    type: Number
  },
  landAndOceanAverageTemperatureUncertainty: {
    type: Number
  }
});

module.exports = worldSchema;
