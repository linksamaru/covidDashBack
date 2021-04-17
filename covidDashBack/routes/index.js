let express = require('express');
let router = express.Router();

let covidController = new (require(SERVER_ROOT_PATH + '/controller/covidController'))();
let fatcsController = new (require(SERVER_ROOT_PATH + '/controller/factsController'))();

router.get('/countryList', async (req, res) => {
  let result = await covidController.getAllCountries();
  res.status(result.code).send(result.msg);
});

router.get('/countryInfo', async (req, res) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let result = await covidController.getCountryData(ip);
  res.status(result.code).send(result.msg);
});

router.get('/chuckFact', async (req, res) => {
  let result = await fatcsController.getChuckFact();
  res.status(result.code).send(result.msg.value);
});

router.get('/numberFact', async (req, res) => {
  let result = await fatcsController.getNumberFact();
  res.status(result.code).send(result.msg);
});
module.exports = router;
