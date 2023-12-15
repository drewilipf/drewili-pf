const {Router} = require('express')
const postUserHandler = require("../handlers/postUserHandler");

const router = Router()

router.post('/users', postUserHandler);

module.exports = router