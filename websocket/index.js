const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);


//Socket.io handle

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
});






app.use(express.static(path.resolve("./public")));


app.get("/", (req, res) => {
    return res.sendFile('/public/index.html');
});


server.listen(9000, () => {
    console.log('Server running at 9000........');
});





