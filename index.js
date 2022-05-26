const dgram = require('dgram');
const busylight = require('busylight').get();

//create UDP socket

const socket = dgram.createSocket('udp4');

socket.on('message', (msg) => {
  console.log('message received, ', msg.toString());
  busylight.light(msg.toString())
})

socket.bind('8000', '127.0.0.1');
