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
        delete country.country_lower;
        country.months = monthLength;
        return country;
      });
      let fullUrl;
      if (req.originalUrl === "/country") {
        fullUrl =
          req.protocol + "://" + req.get("host") + req.originalUrl + "?page=2";
      } else {
        let newPage = req.originalUrl.split("");
        newPage[newPage.length - 1] =
          parseInt(newPage[newPage.length - 1], 10) + 1;
        newPage = newPage.join("");
        fullUrl = req.protocol + "://" + req.get("host") + newPage;
      }
      res.json({
        object: "10 Countries",
        has_more: paginate.hasNextPages(req)(pageCount),
        next_page: fullUrl,
        data: newResults
      });
    } catch (err) {
      console.log(err);
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
