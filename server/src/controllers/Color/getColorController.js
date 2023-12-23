const {Colors} = require("../../db")

const getColorController = async() =>{
    const colors = await Colors.findAll({
        
    });

    return colors
}

module.exports = getColorController;