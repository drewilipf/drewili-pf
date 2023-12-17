const {Router} = require('express')
const postCategoryHandler = require('../handlers/postCategoryHandler')
const getCategoryHandler = require('../handlers/getCategoryHandler')
const deleteCategoryHandler = require('../handlers/deleteCategoryHandler')

const router = Router()

router.get("/", getCategoryHandler)
router.post("/", postCategoryHandler)
router.delete("/:id", deleteCategoryHandler)
module.exports = router



