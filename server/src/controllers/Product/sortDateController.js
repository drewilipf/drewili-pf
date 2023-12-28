const { Product } = require("../../db");


const sortProductDateController = async (sortBy) => {
    let order = [['createdAt', 'DESC']];

    if (sortBy === 'oldest') {
        order = [['createdAt', 'ASC']];
    }

    return Product.findAll({
        order,
       
    });
};


module.exports = sortProductDateController;

