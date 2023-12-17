const getSalesCartController = require("../../controllers/SalesCart/getSalesCartController")

const getSalesCartHandler = async (req, res) => {
    try {
        const {userId} = req.params

        const data = await getSalesCartController(userId);

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = getSalesCartHandler;
