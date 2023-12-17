const { Router } = require('express')
const productRouter = require ('./productRouter')
const userRouter = require ('./userRouter')
const categoryRouter = require('./categoryRouter')
const brandRouter = require('./brandRouter')
const salesCartRouter = require("./salesCartRouter")


const router = Router()

router.use("/product", productRouter)
router.use("/user", userRouter)
router.use("/category", categoryRouter)
router.use("/brand", brandRouter)
router.use("/salescart", salesCartRouter)

module.exports = router