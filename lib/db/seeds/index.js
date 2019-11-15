
const countrySeeds = [
  require("./country1"),
  require("./country2"),
  require("./country3")
];
//TODO: Use async https://stackoverflow.com/questions/24586110/resolve-promises-one-after-another-i-e-in-sequence to run each seed file one after another

//maybe use one seed file but pass in the file path to do the seeding on using this index

async function readFiles(files) {
    for(const file of countrySeeds) {
        await readFile(file);
    }
}