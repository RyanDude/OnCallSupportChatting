const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const admin_service = require('./admin/admin-service');

app.use(express.static(__dirname + '/public'));

/**
 * @router
 */

app.get('/chat', (req, res)=>{
    res.sendFile(path.join(__dirname, '/chat.html'));
});

app.get('/client', (req, res)=>{
    res.sendFile(path.join(__dirname, '/client/client.html'));
});

app.get('/admin', (req, res)=>{
    res.sendFile(path.join(__dirname, '/admin/admin.html'));
});
app.get('/admin/login', ()=>{
    res.sendFile(path.join(__dirname, '/admin/login.html'));
});
/**
 * @api
 */
app.post('/api/admin/reg', (req, res)=>{
    const service = new admin_service();
    service.reg('admin','123');
    res.send('ok');
});
app.post('/api/admin/login', (req, res)=>{
    const service = new admin_service();
    service.login('admin','123');
    res.send('ok');
});

/**
 * @listeners
 */

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // broadcast channel, redirecting msg from admin to all users
  socket.on('braodcast', (message) => {
    console.log('Received message:', message);
    io.emit('braodcast', message);
  });

  // join the room
  socket.on('join room', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });
  // one to one chatting channel
  socket.on('message', (data)=>{
    io.to(data.room).emit('message', data.msg);
  });
});

http.listen(5000, () => {
  console.log('Server started on port 5000');
});