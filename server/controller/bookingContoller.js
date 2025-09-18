const { Booking } = require('../models');

module.exports = {
  addBooking: async (req, res) => {
    try {
      const { user_id, date, slots } = req.body;

      const existingBooking = await Booking.findOne({
        where: { date, slots, status_booking: 1 }
      });

      if (existingBooking) {
        return res.status(400).json({
          success: false,
          message: `Slot ${slots} already booked on ${date}`
        });
      }

      // Create new booking
      const newBooking = await Booking.create({
        user_id,
        date,
        slots,
        status_booking: 1,
      });

      return res.status(201).json({
        success: true,
        message: "New booking added successfully",
        data: newBooking,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  },

  getBookings: async (req, res) => {
    try {
      const bookings = await Booking.findAll({
        where: { status_booking: 1 }
      })
      return res.status(201).json({
        success: true,
        message: "Get all Booking slots successfully",
        data: bookings,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  }

};
