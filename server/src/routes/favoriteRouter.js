const {Router} = require('express')
const getFavoriteHandler = require('../handlers/Favorites/getFavoriteHandler')
const favoriteDeleteHandler = require('../handlers/Favorites/deleteFavoriteHandler')
const postFavoriteHandler = require('../handlers/Favorites/postFavoriteHandler')


const router = Router()

router.get("/", getFavoriteHandler)
router.post("/", postFavoriteHandler)
router.delete("/:id", favoriteDeleteHandler)

module.exports = router



