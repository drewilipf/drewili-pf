const {Router} = require('express')
const postCategoryHandler = require('../handlers/Category/postCategoryHandler')
const getCategoryHandler = require('../handlers/Category/getCategoryHandler')
const deleteCategoryHandler = require('../handlers/Category/deleteCategoryHandler')

const router = Router()

router.get("/", getCategoryHandler)
router.post("/", postCategoryHandler)
router.delete("/:id", deleteCategoryHandler)

module.exports = router



