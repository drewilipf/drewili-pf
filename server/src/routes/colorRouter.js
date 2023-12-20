const {Router} = require('express')
const getColorHandler = require('../handlers/Color/getColorHandler')

const router = Router()

router.get("/", getColorHandler)


module.exports = router