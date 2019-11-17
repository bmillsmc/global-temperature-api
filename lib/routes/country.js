const express = require("express");
const router = express.Router();
const countryController = require("../controllers/country");

router.get("/country", countryController.index);
// Query String:
// http://localhost:3000/country?name=Ireland
router.get("/country/:name", countryController.showCountry);
router.post("/country", countryController.create);
router.put("/country/:name", countryController.edit);
router.delete("/country/:name", countryController.delete);
// router.get("/country/:name/month/:date");

module.exports = router;
