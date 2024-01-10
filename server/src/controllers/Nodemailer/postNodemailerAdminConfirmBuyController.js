const transporter = require ("../../../nodemailer")
const fs = require('fs');
const path = require('path');

const postNodemailerAdminConfirmBuyController = async (name, email, product, cuantity, price, total, adress, phone, dropshiping, payment) =>{
    let htmlContent = fs.readFileSync(path.join(__dirname, 'adminBuy.html'), 'utf-8');
    htmlContent = htmlContent.replace(/\{name\}/g, name);
    htmlContent = htmlContent.replace(/\{product\}/g, product);
    htmlContent = htmlContent.replace(/\{cuantity\}/g, cuantity);
    htmlContent = htmlContent.replace(/\{price\}/g, price);
    htmlContent = htmlContent.replace(/\{total\}/g, total);
    htmlContent = htmlContent.replace(/\{adress\}/g, adress);
    htmlContent = htmlContent.replace(/\{phone\}/g, phone);
    htmlContent = htmlContent.replace(/\{dropshiping\}/g, dropshiping);
    htmlContent = htmlContent.replace(/\{payment\}/g, payment);
    await transporter.sendMail({

        from: "mensaje enviado desde drewillipf@gmail.com",
        to: "drewilipf@gmail.com",
        subject: `${name} realizo una nueva compra`,
        html: htmlContent,
    });
  };
  
  module.exports = postNodemailerAdminConfirmBuyController;