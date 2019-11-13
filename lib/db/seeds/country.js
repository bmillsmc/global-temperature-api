const { Country } = require("../../models");
const countryData = require("../../data/global-land-temp-by-country.json");
const globalData = require("../../data/global-temperatures.json");

//create an array with all of the months in it, adding the corresponding global data for each date to each object to match the model of Month. After create a couuntry array with a country name and an array of all its months. Use the names in the countrydata to make each country object. Maybe use filter method to compare names of each object, when object name is different than last index's return it, otherwise dont. Then add a months array by comparing the names already in the country array to the names stored in the month array. after mapping get rid of country names in the month array. this should be the correct object syntax for the Country model and you should be able to create.

const month