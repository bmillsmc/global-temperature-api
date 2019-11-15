//TODO: create a script that splits refactored-country-json.json into three seperate files to be seeded seperatly
const refactoredJson = require("./refactored-country-json.json");
const filesystem = require("fs");
const JSONStream = require("JSONStream");

let keys = Object.keys(refactoredJson);
let keyLength = keys.length;
let object1Length = keyLength / 3;
let object2Length = keyLength / 3;
let object1 = {};
let object2 = {};
let object3 = {};
keys.forEach((key, index) => {
  if (index >= 0 && index < object1Length) {
    object1[key] = refactoredJson[key];
  } else if (index >= object1Length && index < object1Length+object2Length) {
    object2[key] = refactoredJson[key];
  } else {
    object3[key] = refactoredJson[key];
  }
});
let objectArray = [object1, object2, object3];
objectArray.forEach((object, index) => {
  let transformStream = JSONStream.stringifyObject();
  let outputStream = filesystem.createWriteStream(
    __dirname + `/refactored-split-json${index + 1}.json`
  );
  transformStream.pipe(outputStream);
  let objectKeys = Object.keys(object);
  objectKeys.forEach(key => {
    transformStream.write([key, object[key]]);
  });
  transformStream.end();
  outputStream.on("finish", () => {
    console.log(`file ${index + 1} written`);
  });
});
