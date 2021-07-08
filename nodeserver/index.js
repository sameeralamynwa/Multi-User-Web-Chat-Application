/* Node Server which will handle socket io connections. */

/*
    Using socket.io on the 8000 port.
    Running a socket.io server which attaches itself to an instance of HTTP.
    It listens to the incoming events. 
*/

const io = require('socket.io')(8000)

const users = {};

/*
    io.on here is like a socket.io instance which will listen to all socket connections.
    socket.on handles the connections of a particular individual.
*/

/*
    new-user-joined here is an event which will run a call-back after the server recognises this event.
*/

/*
    Whenever these callbacks are fired they emit the events to client.js.
*/

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})
