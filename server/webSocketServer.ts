import app from './app';
import http from "http";
import socketIo from "socket.io";
import config from './config';

const { WSPORT } = config;
const server = http.createServer(app);
const socket = socketIo(server);

socket.on("connection", socket => {
  console.log("New client connected");
  socket.on("disconnect",() => console.log("Client disconnected"));
});

server.listen(WSPORT, () => console.log(`WebSocket server started on PORT ${WSPORT}`));

export default socket;