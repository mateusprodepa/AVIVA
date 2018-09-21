const express = require('express');
const http = require('http');

const app = express();
const port = process.env.PORT || 5000;
const serverIsListeningMessage = `[x] => Servidor rodando na porta ${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

server.listen(port, () => console.info(serverIsListeningMessage));
