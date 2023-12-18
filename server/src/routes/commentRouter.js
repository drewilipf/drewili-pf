const {Router} = require('express')
const postCommentHandler = require('../handlers/Comment/postCommentHandler')

const router = Router()

router.post("/", postCommentHandler)

module.exports = router