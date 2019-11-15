//TODO: create a script that splits refactored-country-json.json into three seperate files to be seeded seperatly
const refactoredJson = require("./refactored-country-json.json");
const filesystem = require("fs");
const JSONStream = require("JSONStream");

let keys = Object.keys(refactoredJson);
let keyLength = keys.length;
if (keyLength % 3 !== 0) {
  let object3Length = keyLength / 3 + (keyLength % 3);
} else {
  let object3Length = keyLength / 3;
}
let object1Length = keyLength / 3;
let object2Length = keyLength / 3;
let object1 = {};
let object2 = {};
let object3 = {};
keys.forEach((key, index) => {
  if (index >= 0 && index < object1Length) {
    object1[key] = refactoredJson[key];
  } else if (index >= object1Length && index < object2Length) {
    object2[key] = refactoredJson[key];
  } else {
    object3[key] = refactoredJson[key];
  }
});
let objectArray = [object1, object2, object3];
let transformStreams = [JSONStream.stringifyObject(), JSONStream.stringifyObject(), JSONStream.stringifyObject()];
let outputStreams = [filesystem.createWriteStream(
    __dirname + `/refactored-split-json1.json`
  ), filesystem.createWriteStream(
    __dirname + `/refactored-split-json2.json`
  ), filesystem.createWriteStream(
    __dirname + `/refactored-split-json3.json`
  )]
objectArray.forEach((object, index) => {
  transformStreams[index].pipe(outputStreams[index]);
  let objectKeys = Object.keys(object);
  objectKeys.forEach(key => {
    transformStreams[index].write([key, object[key]]);
  });
  transformStreams[index].end();
  outputStreams[index].on("finish", () => {
    console.log(`file ${index + 1} written`);
  });
});
