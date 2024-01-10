const transporter = require ("../../../nodemailer")
const fs = require('fs');
const path = require('path');

const postNodemailerUserRegisterController = async (name, email) =>{
    let htmlContent = fs.readFileSync(path.join(__dirname, 'bienvenida.html'), 'utf-8');
    htmlContent = htmlContent.replace(/\{name\}/g, name);

    
    await transporter.sendMail({

        from: "mensaje enviado desde drewillipf@gmail.com",
        to: email,
        subject: `Bienvenido a Drewili ${name}`,
        html: htmlContent,
    });
  };
  
  module.exports = postNodemailerUserRegisterController;