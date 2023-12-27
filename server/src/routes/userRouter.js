const {Router} = require('express')
const postUserHandler = require('../handlers/User/postUserHandler')
const getUserHandler = require('../handlers/User/getUserHandler')
const userByPk = require ('../handlers/User/userBypkHandler')
const userSoftDeleteHandler = require('../handlers/User/deleteUserHandler')

const putUserHandler = require ('../handlers/User/putUserHandler')



const router = Router()

router.get("/", getUserHandler)
router.post("/", postUserHandler)
router.get('/bypk/:id', userByPk)
router.delete("/:id", userSoftDeleteHandler)

router.put("/:id", putUserHandler)


module.exports = router