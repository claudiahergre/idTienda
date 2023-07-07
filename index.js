const http = require('http');
const app = require('./src/app');

//config de env.
require('dotenv').config()

// config DB
require('./src/config/db');

// creamos server
const server = http.createServer(app)

//poner el servidor a escuchar
const PORT = process.env.PORT || 3000
server.listen(PORT);

server.on('listening', () => console.log('servidor escuchando en puerto 3000'))