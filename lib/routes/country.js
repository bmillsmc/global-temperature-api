const express = require("express");
const router = express.Router();
const countryController = require("../controllers/country");

router.get("/country", countryController.index);
router.get("/country/:name", countryController.showDate);
router.post("/country", countryController.create);
router.put("/country/:name", countryController.edit);
router.delete("/country/:name", countryController.delete);

module.exports = router;
