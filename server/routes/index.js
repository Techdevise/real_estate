var express = require('express');
const real_estateCantoller = require('../cantroller/real_estateCantoller');
var router = express.Router();

/* GET home page. */
 router.get('/by-location',real_estateCantoller.getParcelByLocation);
 router.get('/location',real_estateCantoller.getProperties);
 router.get('/by-id/:uuid',real_estateCantoller.getParcelById);



 

module.exports = router;
