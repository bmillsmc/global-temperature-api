const { Country } = require("../models");

module.exports = {
  index: (req, res) => {
    Country.find({}).then(countries => {
      res.json(countries);
    });
  },
  showDate: (req, res) => {},
  create: (req, res) => {},
  edit: (req, res) => {},
  delete: (req, res) => {}
};
