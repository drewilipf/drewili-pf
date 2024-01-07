const { Brand } = require('../../db')

const createNewBrand = async (brand) =>
{
    if(!brand){
        throw Error('Debe ingresar una marca')
    }
        await Brand.create({
            brand: brand
        })
        const brands = Brand.findAll()
        return brands
    } 

module.exports = createNewBrand;