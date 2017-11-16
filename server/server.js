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

    var wMsg = { 
        from: 'Admin', 
        text:'Welcome to Chat room', 
        createdAt: new Date().getTime()
    };
    var nUserMsg = { 
        from: 'Admin', 
        text:'New user joined the chat room',
        createdAt: new Date().getTime()
    };
    
    socket.emit('newMessage', wMsg);
    socket.broadcast.emit('newMessage', nUserMsg);

    socket.on('createMessage', (msg)=>{
        console.log('createMessage',msg);
        var mesg = {
            from: msg.from,
            text: msg.message,
            createdAt : new Date().getTime()
        };
        
        // io.emit('newMessage', msg);
        socket.broadcast.emit('newMessage', mesg);
    })

});



app.use(express.static(publicPath));

server.listen(port, ()=>{
    console.log(`Server is up at ${port}`);
});