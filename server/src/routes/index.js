const { Router } = require('express')
const productRouter = require ('./productRouter')
const userRouter = require ('./userRouter')
const categoryRouter = require('./categoryRouter')
const brandRouter = require('./brandRouter')
const salesCartRouter = require("./salesCartRouter")
const commentRouter = require("./commentRouter")
const loginRouter = require('./loginRouter')
const filterRouter = require('./filterRouter')
const favoriteRouter = require('./favoriteRouter')

const router = Router()

router.use("/product", productRouter)
router.use("/user", userRouter)
router.use("/category", categoryRouter)
router.use("/brand", brandRouter)
router.use("/salescart", salesCartRouter)
router.use("/comment", commentRouter)
router.use("/login", loginRouter)

module.exports = router