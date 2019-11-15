const { Country } = require("../../models");
const countryData = require("../../data/refactored-country-json.json");
const globalData = require("../../data/global-temperatures.json");

//create an array with all of the months in it, adding the corresponding global data for each date to each object to match the model of Month. After create a couuntry array with a country name and an array of all its months. Use the names in the countrydata to make each country object. Maybe use filter method to compare names of each object, when object name is different than last index's return it, otherwise dont. Then add a months array by comparing the names already in the country array to the names stored in the month array. after mapping get rid of country names in the month array. this should be the correct object syntax for the Country model and you should be able to create.

//TODO: make a series of scripts that runs on default json and creates an array of objects perfectly matching the country schema. this is the end goal, doesnt need to be done for this project. delete the old file each time you run seed and run scripts whenever you enter new data.

const countryNames = Object.keys(countryData);
const countryObjects = countryNames.map(item => {
  //maps the country names to objects that match the Country model
  console.log(item);
  let countryOb = {
    country: item,
    country_lower: item.toLowerCase()
  };
  countryNames.forEach(key => {
    if (key === item) {
      countryOb.months = countryData[key].map(month => {
        let monthOb = {
          temp: month.AverageTemperature,
          tempUncert: month.AverageTemperatureUncertainty,
          date: month.dt
        };
        return monthOb;
      });
    }
  });
  countryOb.months.forEach(month => {
    let globalTemp;
    globalData.forEach(monthItem => {
      //determines which month in the global data should be used and then sets it to an object that matches the World model syntax. If there is such global date for that month the global is set to undefined
      if (monthItem.dt === month.dt) {
        globalTemp = {
          landAverageTemperature: monthItem.LandAverageTemperature,
          landAverageTemperatureUncertainty:
            monthItem.LandAverageTemperatureUncertainty,
          landMaxTemperature: monthItem.LandMaxTemperature,
          landMaxTemperatureUncertainty:
            monthItem.LandMaxTemperatureUncertainty,
          landMinTemperature: monthItem.LandMinTemperature,
          landMinTemperatureUncertainty:
            monthItem.LandMinTemperatureUncertainty,
          landAndOceanAverageTemperature:
            monthItem.LandAndOceanAverageTemperature,
          landAndOceanAverageTemperatureUncertainty:
            monthItem.LandAndOceanAverageTemperatureUncertainty
        };
      }
    });
    month.global = globalTemp;
  });
  return countryOb;
});

Country.deleteMany({}).then(() => {
  //deletes any existing data
  countryObjects.forEach(country => {
    console.log(country.country);
    Country.create(country) //creates the new collection populated with the countryObjects array
      .then(countries => {
        console.log(countries);
        console.log(countries[0].months[0]);
      })
      .catch(err => {
        console.log(err);
      });
  });
});
