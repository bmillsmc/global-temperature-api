//TODO: create script to refactor json array of objects, create one object in new document with a key for each country that is an array of all the months for that country. Use readstream, process and then write to file.
const filesystem = require("fs");
const JSONStream = require("JSONStream");
let index = 0;
let keyCount = 0;
let countriesObject = {};
let transformStream = JSONStream.parse("*");
// const inputStream = filesystem.createReadStream(
//   __dirname + "/country-data-sample2.json"
// );
const inputStream = filesystem.createReadStream(
  __dirname + "/global-land-temp-by-country.json"
);
inputStream
  .pipe(transformStream)
  .on("data", data => {
    if (index === 0) {
      countriesObject[data.Country] = [data];
    } else {
      let keys = Object.keys(countriesObject);
      keys.forEach(item => {
        if (data.Country === item) {
          countriesObject[item].push(data);
          keyCount++;
        }
      });
      if (keyCount === 0) {
        countriesObject[data.Country] = [data];
      } else {
        keyCount = 0;
      }
    }
    index++;
  })
  .on("end", () => {
    console.log(countriesObject);
    let outputStream = filesystem.createWriteStream(
      __dirname + "/refactored-country-json.json"
    );
    transformStream = JSONStream.stringifyObject();
    transformStream.pipe(outputStream);
    let keys = Object.keys(countriesObject);
    keys.forEach(item => {
      transformStream.write([item, countriesObject[item]]);
    });
    transformStream.end();
    outputStream.on("finish", () => {
      console.log("file written");
    });
  });
