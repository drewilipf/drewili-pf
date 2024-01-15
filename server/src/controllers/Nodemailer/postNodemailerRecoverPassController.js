const transporter = require ("../../../nodemailer")
const fs = require('fs');
const path = require('path');

const postNodemailerUserRegisterController = async (username, email, otp ) =>{
    let htmlContent = fs.readFileSync(path.join(__dirname, 'recoverPass.html'), 'utf-8');
    htmlContent = htmlContent.replace(/\{username\}/g, username);
    htmlContent = htmlContent.replace(/\{otp\}/g, otp);

    
    await transporter.sendMail({

        from: "mensaje enviado desde drewillipf@gmail.com",
        to: email,
        subject: `Recuperacion de contraseña ${username}`,
        html: htmlContent,
    });
  };
  
  module.exports = postNodemailerUserRegisterController;