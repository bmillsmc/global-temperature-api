const { Country } = require("../models");
const paginate = require("express-paginate");

module.exports = {
  index: async (req, res) => {
    let base = 0;
    let max = 20;
    if (req.params.id && req.params.id !== 0) {
      base = parseInt(req.params.id, 10) * 20;
      max = base + 20;
      console.log(req.params.id);
    }
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
      // let monthLength;
      // let newResults = results.map(country => {
      //   // let newCountry = country.toObject();
      //   monthLength = newCountry.months.length;
      //   delete newCountry.months;
      //   newCountry.months = monthLength;
      //   return newCountry;
      // });
      res.json({
        object: "list",
        has_more: paginate.hasNextPages(req)(pageCount),
        data: results
      });
    } catch (err) {
      next(err);
    }
    // Country.find({})
    //   .cursor()
    //   .then(cursor => {
    //     let num = 0;
    //     let countries = [];
    //     let promise = cursor.next((err, doc) => {
    //       console.log(num + 1 + ". " + doc.toObject().country);
    //       console.log(base + " " + max + " " + num);
    //       if (num >= base && num < max) {
    //         countries.push(doc);
    //         console.log("pushed");
    //       }
    //       num++;
    //     });
    //     promise.then(() => {
    //       let monthLength;
    //       console.log(countries);
    //       let newCountries = countries.map(country => {
    //         let newCountry = country.toObject();
    //         monthLength = newCountry.months.length;
    //         delete newCountry.months;
    //         newCountry.months = monthLength;
    //         console.log(newCountry);
    //         return newCountry;
    //       });
    //       res.json(newCountries);
    //     });
    //   });
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
