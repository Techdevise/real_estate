const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {

 DashBoard:async (req,res)=>{
  try {
       const userid = req.user.id;
      const loginUser = await User.findOne({
        where: { id: userid, role: 0 },
        attributes: ["name", "email", "image"],
      });
    const userCount = await User.count({ where: { role: 3 } });
    return res.status(200).json({
      success: true,
      data: { userCount,loginUser },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
},


    // LOGIN
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            if (user.role !== 0) {
                return res.status(403).json({ success: false, message: "Access denied. Only role 0 can login." });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: "Invalid password" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.SECRET_KEY,
                { expiresIn: "24h" }
            );

            return res.status(200).json({
                success: true,
                message: "Login successful",
                token,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    // GET USER DETAILS



    // CHANGE PASSWORD
    changePassword: async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body;

            const user = await User.findByPk(req.user.id);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Old password is incorrect" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await user.update({ password: hashedPassword });

            return res.status(200).json({ success: true, message: "Password changed successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    logout: async (req, res) => {
        try {
            return res.status(200).json({
                success: true,
                message: "Logged out successfully. Please clear token on client side.",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
