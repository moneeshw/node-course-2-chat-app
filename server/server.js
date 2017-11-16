const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'..','public');
const port = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('New user connected!');

    socket.emit('newMessage', generateMessage('Admin','Welcome to Chat room'));

    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined the chat room'));

    socket.on('createMessage', (msg, callback)=>{
        console.log('createMessage',msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', (socket)=>{
        console.log('User disconnected!');
    });
});



app.use(express.static(publicPath));

server.listen(port, ()=>{
    console.log(`Server is up at ${port}`);
});