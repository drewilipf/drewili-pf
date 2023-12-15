const {Router} = require('express')
const postUserHandler = require('../handlers/postUserHandler')
const getUserHandler = require('../handlers/getUserHandler')


const router = Router()

router.get("/users", getUserHandler)
router.post("/users", postUserHandler)

module.exports = router