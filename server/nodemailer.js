// const nodemailer = require ("nodemailer")
// require('dotenv').config();
// const {PASS_MAIL} = process.env

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: "drewilipf@gmail.com",
//         pass: PASS_MAIL,
//         method: 'PLAIN'
//     },
//     requireTLS: true
// })
// transporter.verify().then(()=> console.log ("email enviado!!")).catch(error=>console.error);

// module.exports = transporter
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "juan.ruize@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: oauth2Client.getAccessToken(),
  },
});

transporter
  .verify()
  .then(() => console.log("Email enviado!!"))
  .catch((error) => console.error("Error al verificar el transporte:", error));

module.exports = transporter;
