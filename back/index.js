const express = require('express');
const app = express();
const http = require('http');
const socket = require('socket.io');
const axios = require('axios');

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({ ok: true });
})

const server = http.createServer(app);

const io = socket(server);

let interval;

io.on('connection', socket => {
  console.log('New client connected');
  if(interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  });
})

server.listen(port, () => console.log(`Listening on port ${port}`));

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      'http://api.weatherapi.com/v1/current.json?key=d4607d49225a43ecb4444645200404&q=belo horizonte'
    );
    console.log(res.data.current.temp_c)
    socket.emit('temperature', res.data.current.temp_c);
  } catch (err) {
    console.error('Error:', err)
  }
};
