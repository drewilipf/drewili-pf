const { Brand } = require('../db')

const createNewBrand = async (brand) =>
{
    if(!brand){
        throw Error('Debe ingresar una marca')
    }
            const newBrand = await Brand.create({
            name: category
        })
        return newBrand;
    } 

module.exports = createNewBrand;