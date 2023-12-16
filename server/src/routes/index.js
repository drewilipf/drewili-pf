const { Router } = require('express')
const productRouter = require ('./productRouter')
const userRouter = require ('./userRouter')
const { postCategoryHandler } = require('../handlers/postCategoryHandler')


const router = Router()

router.use("/product", productRouter)
router.use("/user", userRouter)
router.post("/category", postCategoryHandler)
module.exports = router