var express = require('express');
const real_estateContoller = require('../controller/real_estateContoller');
var router = express.Router();

/* GET home page. */
 router.get('/by-location',real_estateContoller.getParcelByLocation);
 router.get('/location',real_estateContoller.getProperties);
 router.get('/by-id/:uuid',real_estateContoller.getParcelById);



 

module.exports = router;
