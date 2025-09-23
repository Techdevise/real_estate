const { Property } = require("../models");

module.exports = {
    getProperty: async (req, res) => {
        try {

            const property = await Property.findAll({ where: { status: 1 } });
            return res.status(201).json({
                success: true,
                message: "Get All Property successfully",
                data: property,
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

}