const transporter = require ("../../../nodemailer")
const fs = require('fs');
const path = require('path');

const postNodemailerUserConfirmBuyController = async (name, email, product, cuantity, price, total, adress) =>{
    let htmlContent = fs.readFileSync(path.join(__dirname, 'userBuy.html'), 'utf-8');
    htmlContent = htmlContent.replace(/\{name\}/g, name);
    htmlContent = htmlContent.replace(/\{product\}/g, product);
    htmlContent = htmlContent.replace(/\{cuantity\}/g, cuantity);
    htmlContent = htmlContent.replace(/\{price\}/g, price);
    htmlContent = htmlContent.replace(/\{total\}/g, total);
    htmlContent = htmlContent.replace(/\{adress\}/g, adress);
    await transporter.sendMail({

        from: "mensaje enviado desde drewillipf@gmail.com",
        to: email,
        subject: `Gracias por tu compra ${name}`,
        html: htmlContent,
    });
  };
  
  module.exports = postNodemailerUserConfirmBuyController;