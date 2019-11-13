const filesystem = require("fs");
const JSONStream = require("JSONStream");
const { Country } = require("../../models");
const countryData = require("../../data/global-land-temp-by-country.json");
const globalData = require("../../data/global-temperatures.json");

//create an array with all of the months in it, adding the corresponding global data for each date to each object to match the model of Month. After create a couuntry array with a country name and an array of all its months. Use the names in the countrydata to make each country object. Maybe use filter method to compare names of each object, when object name is different than last index's return it, otherwise dont. Then add a months array by comparing the names already in the country array to the names stored in the month array. after mapping get rid of country names in the month array. this should be the correct object syntax for the Country model and you should be able to create.

const transformStream = JSONStream.parse("*");
const inputStream = filesystem.createReadStream(
  __dirname + "/../../data/global-land-temp-by-country.json"
);
let uniqueCountries = [];
let inputArray = [];
let inputArrayCount = 0;

inputStream
  .pipe(transformStream)
  .on("data", data => {
    if (inputArray.length === 0) {
      uniqueCountries.push(data);
      console.log("adding " + data.Country);
    } else {
      if (data.Country !== inputArray[inputArray.length - 1].Country) {
        uniqueCountries.push(data);
        console.log("adding " + data.Country);
      }
    }
    if (inputArrayCount > 4) {
      inputArrayCount = 0;
      inputArray = [];
    }
    inputArray.push(data);
    inputArrayCount++;
  })
  .on("finish", () => {
    const countryNames = uniqueCountries
      .map(item => item.Country)
      .then(() => {
        console.log(countryNames);
      });
  });

/*
const uniqueCountries = countryData.filter((item, index, array) => {
  //filters the countrydata array so only unique country object are in the array
  if (index === 0) {
    return item;
  }
  return item.Country !== array[index - 1].Country;
});
const countryNames = uniqueCountries.map(item => item.Country); //takes only the country string from the filtered country objects
const countryObjects = countryNames.map(item => {
  //maps the country names to objects that match the Country model
  let countryOb = {
    country: item,
    country_lower: item.toLowerCase()
  };
  countryOb.months = countryData //adds the months array populated with data to match the Month model
    .filter(element => element.Country === item) //filters out all month objects that are not for the current country
    .map(elem => {
      //maps the months to an object
      let monthOb = {
        temp: elem.AverageTemperature,
        tempUncert: elem.AverageTemperatureUncertainty,
        date: elem.dt
      };
      let globalTemp;
      globalData.forEach(monthItem => {
        //determines which month in the global data should be used and then sets it to an object that matches the World model syntax. If there is such global date for that month the global is set to undefined
        if (monthItem.dt === elem.dt) {
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
      monthOb.global = globalTemp;
      return monthOb;
    });
  return countryOb;
});

Country.deleteMany({}).then(() => {
  //deletes any existing data
  Country.create(countryObjects) //creates the new collection populated with the countryObjects array
    .then(countries => {
      console.log(countries);
      console.log(countries[0].months[0]);
    })
    .catch(err => {
      console.log(err);
    });
});
*/
