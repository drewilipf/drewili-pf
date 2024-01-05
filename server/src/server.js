const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');

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

// Middleware para procesar JSON en solicitudes
server.use(express.json());

// Middleware de enrutamiento
server.use('/', routes);


module.exports = server;
