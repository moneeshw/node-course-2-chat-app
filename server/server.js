const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'..','public');
const port = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('New user connected!');

    socket.on('disconnect', (socket)=>{
        console.log('User disconnected!');
    });

    socket.on('createMessage', (msg)=>{
        console.log('createMessage',msg);
    })

    socket.emit('newMessage',{
        from: 'User1',
        message: 'Hi how are you',
        createdAt: new Date()
    });

});



app.use(express.static(publicPath));

server.listen(port, ()=>{
    console.log(`Server is up at ${port}`);
});