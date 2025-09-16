var express = require('express');
const userCantroller = require('../cantroller/userCantroller');
const bookingContoller = require('../cantroller/bookingContoller');

var router = express.Router();

/* GET users listing. */
 router.post('/add/user',userCantroller.createUser);




 router.post('/add/bookings',bookingContoller.addBooking);
 router.get('/bookings',bookingContoller.getBookings);

module.exports = router;
