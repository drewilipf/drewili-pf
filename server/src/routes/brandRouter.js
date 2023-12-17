const {Router} = require('express')
const postBrandHandler = require('../handlers/Brand/postBrandHandler')
const getBrandHandler = require('../handlers/Brand/getBrandHandler')
const deleteBrandHandler = require('../handlers/Brand/deleteBrandHandler')


const router = Router()

router.get("/", getBrandHandler)
router.post("/", postBrandHandler)
router.delete("/:id", deleteBrandHandler)

module.exports = router
