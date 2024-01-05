const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { auth } = require('express-openid-connect');
const { User } = require('./db.js');
const server = express();

// Middleware de registro de solicitudes (morgan)
server.use(morgan('dev'));

// Middleware para procesar cookies
server.use(cookieParser('secreto'));

// Middleware para habilitar CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Especifica el origen exacto para entornos de producción
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Manejar solicitudes OPTIONS (preflights)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// Middleware para sesiones
server.use(
    session({
        secret: 'secreto',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true, // Cambia a true si estás usando HTTPS
            maxAge: 24 * 60 * 60 * 1000, // Duración de la sesión en milisegundos (1 día en este caso)
        },
    })
);

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'LQs3H9MCa17POv0zIb21TY3qUqM068pdoggH4FtGmQ9w9OlgNtml9d7cdncYOMsH',
    baseURL: 'http://localhost:3001',
    clientID: 'kEaCI7mlY2rpa1h4q3mX8Lk0UEf4Gj3N',
    issuerBaseURL: 'https://drewili.us.auth0.com'
  };
  


server.use(auth(config));

server.get('/', async (req, res) => {
    try {
        if (req.oidc.isAuthenticated()) {
            const userId = req.oidc.user.sub; // ID
            const userName = req.oidc.user.name; // Nombre
            const userEmail = req.oidc.user.email; // Email
            console.log(userId, userName, userEmail);

            const user = await User.findOne({
                where: { auth0UserId: userId }
            })

            if (!user) {
                await User.create({
                    auth0UserId: userId,
                    auth0DisplayName: userName,
                    auth0Email: userEmail,
                    username: userName
                })
            }
            const redirectURL = `http://localhost:5173/?userId=${userId}&userName=${userName}&userEmail=${userEmail}`;
            res.redirect(redirectURL);
        } else {
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'BadRequestError' && error.error === 'access_denied') {
            // Personaliza el mensaje de error y la respuesta
            res.redirect('http://localhost:5173');
            return
        }
    }
});
// Middleware para procesar JSON en solicitudes
server.use(express.json());

// Middleware de enrutamiento
server.use('/', routes);


module.exports = server;
