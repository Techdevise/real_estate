
const { User } = require('../models');
const { uploadImage } = require('../uitls/imageUplord');

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, email, phone, address, } = req.body;

      let imagePath = "";
      if (req.files && req.files.image) {
        imagePath = await uploadImage(req.files.image);
      }

      const newUser = await User.create({
        name,
        email,
        phone,
        address,
        role:3,
        image: imagePath, 
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
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
};
