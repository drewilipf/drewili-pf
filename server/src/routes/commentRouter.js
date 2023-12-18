const {Router} = require('express')
const postCommentHandler = require('../handlers/Comment/postCommentHandler')
const putCommentHandler = require('../handlers/Comment/putCommentHandler')

const router = Router()

router.post("/", postCommentHandler)
router.put("/:commentId", putCommentHandler)

module.exports = router