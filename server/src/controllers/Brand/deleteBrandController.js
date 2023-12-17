const {Brand} = require("../../db")

const deleteBrandController = async(id) =>{
const deleteBrand = await Brand.destroy({
    where:{
        id:id
    }
})
return deleteBrand
}

module.exports = deleteBrandController;