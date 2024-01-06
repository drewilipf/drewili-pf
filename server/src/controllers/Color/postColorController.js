const { Colors } = require("../../db");

const postColorController = async (color) => {
 
    if(!color){
        throw Error("Ingrese un color!")
    }
    await Colors.create({
        color: color
    })

    const allColors = await Colors.findAll()

    return allColors

};

module.exports = postColorController;
