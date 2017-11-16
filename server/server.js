const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {isRealString} = require('./utils/validation')

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'..','public');
const port = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('New user connected!');

    socket.on('join', (params, callback)=>{
        if(! isRealString(params.name) || !isRealString(params.room)){
            callback('Name and room name are required');
        }

        socket.join(params.room);

        
        socket.emit('newMessage', generateMessage('Admin','Welcome to Chat room'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined the chat room`));
        callback();
    });

    socket.on('createMessage', (msg, callback)=>{
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback();
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