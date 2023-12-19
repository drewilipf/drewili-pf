const {Router} = require('express')
const postCommentHandler = require('../handlers/Comment/postCommentHandler')
const putCommentHandler = require('../handlers/Comment/putCommentHandler')
const getCommentsHandler = require('../handlers/Comment/getCommentHandler')

const router = Router()

router.get("/", getCommentsHandler)
router.post("/", postCommentHandler)
router.put("/:commentId", putCommentHandler)

module.exports = router