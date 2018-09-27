const express = require('express');
const morgan = require('morgan');
const http = require('http');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;
const connection = mongoose.connect('mongodb://localhost/aviva_db', { useNewUrlParser: true, useCreateIndex: true })

const AuthRoute = require('./routes/Auth');
const RequestRoute = require('./routes/Requests');
const UserRoute = require('./routes/User');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/requests', RequestRoute);
app.use('/api/v1/user', UserRoute);

const server = http.createServer(app);

server.listen(port, () => console.info(`[x] => Servidor rodando na porta ${port}`));
