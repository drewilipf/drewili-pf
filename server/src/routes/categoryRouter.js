const {Router} = require('express')
const postCategoryHandler = require('../handlers/Category/postCategoryHandler')
const getCategoryHandler = require('../handlers/Category/getCategoryHandler')
const deleteSoftCategoryHandler = require('../handlers/Category/deleteCategoryHandler')


const router = Router()

router.get("/", getCategoryHandler)
router.post("/", postCategoryHandler)
router.put("/:id", deleteSoftCategoryHandler)

module.exports = router



