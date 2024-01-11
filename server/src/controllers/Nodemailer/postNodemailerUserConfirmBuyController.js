const transporter = require ("../../../nodemailer")
const fs = require('fs');
const path = require('path');

<<<<<<< HEAD
const postNodemailerUserConfirmBuyController = async (name, email, products, total, adress, status) =>{
    let htmlContent = fs.readFileSync(path.join(__dirname, 'userBuy.html'), 'utf-8');
    htmlContent = htmlContent.replace(/\{name\}/g, name);
    
    htmlContent = htmlContent.replace(/\{total\}/g, total);
    htmlContent = htmlContent.replace(/\{adress\}/g, adress);
    
    const productHtml = products.map(product => (
        `<tr>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
        </tr>`
    )).join('');

    htmlContent = htmlContent.replace(/\{products\}/g, productHtml);

await transporter.sendMail({
=======
const postNodemailerUserConfirmBuyController = async (name, email, products, total, address, status) => {
    let htmlContent = fs.readFileSync(path.join(__dirname, 'userBuy.html'), 'utf-8');
    htmlContent = htmlContent.replace(/\{name\}/g, name);
    htmlContent = htmlContent.replace(/\{total\}/g, total);
    htmlContent = htmlContent.replace(/\{address\}/g, address);
    htmlContent = htmlContent.replace(/\{status\}/g, status);
    
    const productHtml = products.map(product => {
        return `
            <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>${product.quantity * product.price}</td>
            </tr>
        `;
    }).join('');
    
    htmlContent = htmlContent.replace(/\{products\}/g, productHtml);

    await transporter.sendMail({
>>>>>>> 01755e1ede265bf29797edbd8d3e914ddd6c5f15

        from: "mensaje enviado desde drewillipf@gmail.com",
        to: email,
        subject: `Gracias por tu compra ${name}`,
        html: htmlContent,
    });
  };
  
  module.exports = postNodemailerUserConfirmBuyController;