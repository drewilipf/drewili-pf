const { Router } = require("express");
const loginHandler = require("../handlers/Auth/loginHandler");
const logOutHandler = require("../handlers/Auth/logoutHandler");


const router = Router()
router.post('/login', loginHandler)
router.post('/logout', logOutHandler)

module.exports = router