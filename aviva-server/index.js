const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./sockets/index');

const port = process.env.PORT || 5000;
const connection = mongoose.connect('mongodb://localhost/aviva_db', { useNewUrlParser: true, useCreateIndex: true })

const AuthRoute = require('./routes/Auth');
const RequestRoute = require('./routes/Requests');
const UserRoute = require('./routes/User');

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/requests', RequestRoute);
app.use('/api/v1/user', UserRoute);

http.listen(port, () => console.info(`[x] => Servidor rodando na porta ${port}`));

sockets.createSockets(io);
