const {Router} = require('express')
const getSalesCartHandler = require('../handlers/getSalesCartHandler')


const router = Router()

router.get("/", getSalesCartHandler)

module.exports = router