const {Router} = require('express')
const postProductsHandler = require('../handlers/Product/postProductHandler')
const getProductsHandler = require('../handlers/Product/getProductHandler')

const productSoftDeleteHandler = require('../handlers/Product/deleteProductHandler')

const putProductsHandler= require('../handlers/Product/putProductHandler')
const getProductId = require('../handlers/Product/getProductId')
const getProductKeyWordHandler = require('../handlers/Product/getProductKeyWordHandler')
const sortRecommendedProductHandler = require('../handlers/Product/sortByRecommendedHandler')
const sortProductsDateHandler = require('../handlers/Product/sortDateHandler')



const router = Router()

router.get("/", getProductsHandler)
router.get("/product", getProductKeyWordHandler)
router.get("/recommended", sortRecommendedProductHandler)
router.get("/date", sortProductsDateHandler)
router.get('/:id', getProductId)
router.post("/", postProductsHandler)

router.delete("/:id", productSoftDeleteHandler)


router.put("/:id", putProductsHandler)


module.exports = router