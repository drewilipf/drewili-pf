const { Router } = require("express");
const loginHandler = require("../handlers/Login/loginHandler");

const router = Router()
router.post('/', loginHandler)

module.exports = router