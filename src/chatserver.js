const express = require('express');
const app = express();
const http = require('http').Server(app);


const io = require('socket.io')(http, {
  cors: {
    origin: '*', // 모든 도메인에서의 요청 허용
    methods: ['GET', 'POST'], // 허용할 HTTP 메서드
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // 클라이언트로부터의 메시지를 수신하고 다른 클라이언트에게 전달
  socket.on('chat', (message) => {
    const messageWithClient = {
      ...message,
    };
    console.log("nickname : " + message.nickname + ", message : " + message.html);
    console.log("message : "+ message.html);
    console.log("message isMine : "+ message.isMine);
    io.emit('chat', messageWithClient);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(3001, () => {
  console.log('Server is running on port 3001');
});
