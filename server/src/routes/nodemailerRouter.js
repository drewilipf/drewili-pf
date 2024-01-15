const { Router } = require ("express")
const transporter = require ("../../nodemailer")
const postNodemailerUserRegister = require('../handlers/Nodemailer/postNodemailerUserRegister')
const postNodemailerUserConfirmBuy = require('../handlers/Nodemailer/postNodemailerUserConfirmBuy.js')
const postNodemailerAdminConfirmBuy = require('../handlers/Nodemailer/postNodemailerAdminConfirmBuy.js')
const postNodemailerRecoverPass = require('../handlers/Nodemailer/postNodemailerrecoverPass.js')

const router = Router()

router.post('/userregister', postNodemailerUserRegister)
router.post('/userCormirmBuy', postNodemailerUserConfirmBuy)
router.post('/adminConfirmBuy', postNodemailerAdminConfirmBuy)
router.post('/recoverPass', postNodemailerRecoverPass)

module.exports = router