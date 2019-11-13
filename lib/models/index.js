const mongoose = require("../db/connection");
const worldSchema = require("./World");
const monthSchema = require("./Month");
const countrySchema = require("./Country");

module.exports = {
    World = mongoose.model("World", worldSchema),
    Month = mongoose.model("Month", monthSchema),
    Country = mongoose.model("Country", countrySchema)
}