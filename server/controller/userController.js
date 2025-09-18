
const { User, Booking } = require('../models');
const { uploadImage } = require('../uitls/imageUplord');
const { Op } = require("sequelize");

module.exports = {

createUser: async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User already exists",
        data: existingUser, 
        alreadyExists: true, 
      });
    }

    let imagePath = "";
    if (req.files && req.files.image) {
      imagePath = await uploadImage(req.files.image);
    }

    const newUser = await User.create({
      name,
      email,
      phone,
      address,
      role: 3,
      image: imagePath,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
      alreadyExists: false,
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



 getUser: async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // base condition: role = 3 users only
    let whereCondition = { role: 3  };

    // search filter agar diya hai
    if (search) {
      whereCondition = {
        ...whereCondition,
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereCondition,
      offset: (page - 1) * limit,
      limit: limit,
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Booking,
          as: "bookings",
          
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: rows,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        perPage: limit,
        totalRecords: count,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
},

};
