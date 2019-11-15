//TODO: create a script that splits refactored-country-json.json into three seperate files to be seeded seperatly
const refactoredJson = require("./refactored-country-json.json");
const filesystems = [require("fs"), require("fs"), require("fs")]
const JSONStreams = [require("JSONStream"), require("JSONStream"), require("JSONStream")];

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
  } else if (index >= object1Length && index < object1Length+object2Length) {
    object2[key] = refactoredJson[key];
  } else {
    object3[key] = refactoredJson[key];
  }
  if(index === keys.length - 1) {
      console.log("set objects");
  }
});
console.log(object2);
let objectArray = [object1, object2, object3];
let transformStreams = [JSONStreams[0].stringifyObject(), JSONStreams[1].stringifyObject(), JSONStreams[2].stringifyObject()];
let outputStreams = [filesystems[0].createWriteStream(
    __dirname + `/refactored-split-json1.json`
  ), filesystems[1].createWriteStream(
    __dirname + `/refactored-split-json2.json`
  ), filesystems[2].createWriteStream(
    __dirname + `/refactored-split-json3.json`
  )]
objectArray.forEach((object, index) => {
    console.log(`creating file ${index + 1}`)
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
