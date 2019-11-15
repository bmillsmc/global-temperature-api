const { Country } = require("../models");

module.exports = {
  index: (req, res) => {
    Country.find({}).then(countries => {
      let monthLength;
      let newCountries = countries.map(country => {
        let newCountry = country.toObject();
        monthLength = newCountry.months.length;
        delete newCountry.months;
        newCountry.months = monthLength;
        return newCountry;
      });
      let base = 0;
      let returnArray;
      if (req.params.id && req.params.id !== 0) {
        base = parseInt(req.params.id, 10) * 20;
        if (newCountries.length - base < 20) {
          returnArray = newCountries.slice(
            base,
            base + (newCountries.length - base)
          );
        } else {
          returnArray = newCountries.slice(base, base + 20);
        }
      } else {
        returnArray = newCountries.slice(base, base + 20);
      }
      res.json(returnArray);
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
