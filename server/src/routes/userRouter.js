const {Router} = require('express')
const postUserHandler = require('../handlers/postUserHandler')
const getUserHandler = require('../handlers/getUserHandler')


const router = Router()

router.get("/", getUserHandler)
router.post("/", postUserHandler)

module.exports = router