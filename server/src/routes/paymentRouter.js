const {Router} = require('express')
const checkoutHandler = require('../handlers/Payment/createCheckoutHandler')
const successlHandler = require('../handlers/Payment/successHandler')
const cancelHandler = require('../handlers/Payment/cancelHandler')

const router =  Router()

router.get('/create-checkout-session', checkoutHandler)
router.get('/success', successlHandler)
router.get('cancel', cancelHandler)

module.exports = router