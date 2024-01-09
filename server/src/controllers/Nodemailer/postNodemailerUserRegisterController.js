const transporter = require ("../../../nodemailer")

const postNodemailerUserRegisterController = async (name, email) =>{
    await transporter.sendMail({

        from: "mensaje enviado desde drewillipf@gmail.com",
        to: email,
        subject: `Bienvenido a Drewili ${name}`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            .boton-compra {
              background-color: #E62F05;
              color: #F2F2F2;
              padding: 10px 20px;
              font-size: 16px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              text-decoration: none; /* Evitar subrayado en enlaces */
              display: inline-block; /* Alineación en línea con otros elementos */
            }
        
            .boton-whatsapp {
              background-color: #25D366;
              color: #FFF;
              padding: 10px 20px;
              font-size: 16px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              text-decoration: none;
              display: inline-block;
            }
        
            .boton-insta {
              background: linear-gradient(to right, #833AB4, #F56040);
              color: #FFF;
              padding: 10px 20px;
              font-size: 16px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              text-decoration: none; 
              display: inline-block; 
            }
        
            body {
              font-family: 'Arial', sans-serif;
              text-align: center;
              margin: 50px;
            }
          </style>
        </head>
        
        <body>
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Arial', sans-serif;">
            <h2>Bienvenido a Drewili</h2>
            <p>Hola ${name},</p>
            <p>¡Gracias por crear tu perfil en Drewili! </p>
            <p>Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
            <p>A partir de ahora, puedes comprar productos, realizar dropshipping, dejar tus reseñas y muchas cosas más.</p>
            <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte.
            </p>
            <p>¡Esperamos que disfrutes de tu experiencia en Drewili!</p>
            <p>Saludos,</p>
            <p>El equipo de Drewili</p>
            <a href="https://drewilifront.vercel.app/" class="boton-compra">Compra ahora</a>
            <hr></hr>
            <br></br>
            <div>
              <a href="https://www.instagram.com/dropshipping.peru/" class="boton-insta">Instagram</a>
              <a href="https://wa.me/51971985484" class="boton-whatsapp">Whatsapp</a>
            </div>
          </div>
        </body>
        
        </html>
        
      `,
    });
  };
  
  module.exports = postNodemailerUserRegisterController;