const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/index.js')
const session = require('express-session')

const server = express()

server.use(morgan('dev'))
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();

})

server.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Cambia a true si estás usando HTTPS
        maxAge: 24 * 60 * 60 * 1000, // Duración de la sesión en milisegundos (1 día en este caso)
    },
}))

server.use(express.json())
server.use('/', routes)


module.exports = server;