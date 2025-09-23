var express = require('express');
const userCantroller = require('../controller/userController');
const bookingContoller = require('../controller/bookingContoller');
const authController = require('../controller/authController');
const authenticateToken = require('../middleware/verifyToken');
const propertyController = require('../controller/propertyController');

var router = express.Router();


 router.post('/login',authController.login); 
 
 router.post('/add/user',userCantroller.createUser);
 router.post('/add/bookings',bookingContoller.addBooking);
 router.get('/bookings',bookingContoller.getBookings);
 
 
 router.use(authenticateToken); // Apply authentication middleware to all routes below

router.get("/dashboard", authController.DashBoard);
router.get("/user", userCantroller.getUser);
router.get("/property", propertyController.getProperty);
router.post("/change-password", authController.changePassword);
router.post("/logout", authController.logout);
/* GET users listing. */



module.exports = router;
