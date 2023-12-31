const {Router} = require('express')
const postCommentHandler = require('../handlers/Comment/postCommentHandler')
const putCommentHandler = require('../handlers/Comment/putCommentHandler')
const getCommentsHandler = require('../handlers/Comment/getCommentHandler')
const commentDeleteHandler = require('../handlers/Comment/deleteCommentHandler')

const router = Router()

router.get("/", getCommentsHandler)
router.post("/", postCommentHandler)
router.put("/:commentId", putCommentHandler)
router.delete("/:id", commentDeleteHandler)

module.exports = router