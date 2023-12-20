const { Colors } = require("../../db");

const postColorController = async (color) => {
 
    if(!color){
        throw Error("Ingrese un color!")
    }
    const newColor = await Colors.create({
        color: color
    })

    return newColor

};

module.exports = postColorController;
