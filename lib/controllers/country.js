const { Country } = require("../models");
const paginate = require("express-paginate");

module.exports = {
  index: async (req, res) => {
    //to go to next page it is /resource?page=[pagenumber] (not zero based)
    try {
      const [results, itemCount] = await Promise.all([
        Country.find({})
          .limit(req.query.limit)
          .skip(req.skip)
          .lean()
          .exec(),
        Country.countDocuments({})
      ]);
      const pageCount = Math.ceil(itemCount / req.query.limit);
      let monthLength;
      let newResults = results.map(country => {
        monthLength = country.months.length;
        delete country.months;
        country.months = monthLength;
        return country;
      });
      res.json({
        object: "list",
        has_more: paginate.hasNextPages(req)(pageCount),
        data: newResults
      });
    } catch (err) {
      next(err);
    }
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
