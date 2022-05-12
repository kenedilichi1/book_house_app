const express = require('express');
const server = express();
const router = require('./routes/books');
const userRoute = require('./routes/users');
const bookShelfRoute = require('./routes/bookshelf')
const cors = require('cors');

server.use(cors())
server.use(express.json());
server.use('/bookhouse', router);
server.use('/auth', userRoute);
server.use('/bookshelf', bookShelfRoute);

module.exports = server