const { Country } = require("../models");

module.exports = {
  index: (req, res) => {
    Country.find({}).then(countries => {
      res.json(countries);
    });
  },
  showCountry: (req, res) => {
    Country.find({ country_lower: req.params.name.toLowerCase() }).then(
      country => {
        res.json(country);
      }
    );
  },
  create: (req, res) => {
    Country.create(req.body).then(country => {
      res.json(country);
    });
  },
  edit: (req, res) => {
    Country.findOneAndUpdate(
      { country_lower: req.params.name.toLowerCase() },
      req.body,
      {
        new: true
      }
    ).then(country => {
      res.json(country);
    });
  },
  delete: (req, res) => {
    Country.findOneAndDelete({
      country_lower: req.params.name.toLowerCase()
    }).then(country => {
      res.json(country);
    });
  }
};
