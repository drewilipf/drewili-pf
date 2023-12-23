const {Router} = require('express')
const getColorHandler = require('../handlers/Color/getColorHandler')
const postColorHandler = require('../handlers/Color/postColorHandler')
const putColorHandler = require('../handlers/Color/putColorHandler')

const router = Router()

router.get("/", getColorHandler)
router.post("/", postColorHandler)
router.put("/:id", putColorHandler)

module.exports = router