const { Router } = require ("express")
const transporter = require ("../../nodemailer")
const postNodemailerUserRegister = require('../handlers/Nodemailer/postNodemailerUserRegister')

const router = Router()

router.post('/userregister', postNodemailerUserRegister)

module.exports = router