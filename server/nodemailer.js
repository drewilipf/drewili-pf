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
  .then(() => console.log("Nodemailer en linea"))
  .catch((error) => console.error("Error al verificar el transporte:", error));

module.exports = transporter;
