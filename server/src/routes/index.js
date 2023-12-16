const { Router } = require('express')
const productRouter = require ('./productRouter')
const userRouter = require ('./userRouter')
const salesCartRouter = require("./salesCartRouter")


const router = Router()

router.use("/product", productRouter)
router.use("/user", userRouter)
router.use("/salesCart", salesCartRouter)

module.exports = router