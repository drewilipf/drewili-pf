const {Router} = require('express')
const postUserHandler = require('../handlers/User/postUserHandler')
const getUserHandler = require('../handlers/User/getUserHandler')


const router = Router()

router.get("/", getUserHandler)
router.post("/", postUserHandler)

module.exports = router