const {Router} = require('express')
const postBrandHandler = require('../handlers/postBrandsHandler')
const getBrandHandler = require('../handlers/getBrandHandler')
const deleteBrandHandler = require('../handlers/deleteBrandHandler')


const router = Router()

router.get("/", getBrandHandler)
router.post("/", postBrandHandler)
router.delete("/:id", deleteBrandHandler)

module.exports = router
