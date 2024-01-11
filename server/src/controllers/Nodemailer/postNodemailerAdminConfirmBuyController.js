const transporter = require ("../../../nodemailer")
const fs = require('fs');
const path = require('path');

const postNodemailerAdminConfirmBuyController = async (name, email, phone, products, total, address, dropshiping,status) =>{
    let htmlContent = fs.readFileSync(path.join(__dirname, 'adminBuy.html'), 'utf-8');
    htmlContent = htmlContent.replace(/\{name\}/g, name);
    htmlContent = htmlContent.replace(/\{total\}/g, total);
    htmlContent = htmlContent.replace(/\{address\}/g, address);
    htmlContent = htmlContent.replace(/\{phone\}/g, phone);
    htmlContent = htmlContent.replace(/\{status\}/g, status);
    console.log(products)

    const productHtml = products?.map(product => {
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

        from: "mensaje enviado desde drewillipf@gmail.com",
        to: "drewilipf@gmail.com",
        subject: `${name} realizo una nueva compra`,
        html: htmlContent,
    });
  };
  
  module.exports = postNodemailerAdminConfirmBuyController;