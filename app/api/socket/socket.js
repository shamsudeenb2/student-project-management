import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  let onLineUser =[]
  io.on("connection", (socket) => {
    console.log("new connection",socket.id)
    //listen to connection
    socket.on("addNewUser", (userId)=>{
        !onLineUser.some(user => user.userId === userId) &&
        onLineUser.push({
            userId,
            socketId:socket.id
        })
        console.log("onlineUser")
        io.emit("getOnlineUsers",onLineUser)
    });

    socket.on("disconnet", ()=>{
        onLineUser = onLineUser.filter(user => user.socketId !== socket.id)

        io.emit("getOnlineUsers",onLineUser)
    });
  });

  console.log("Setting up socket");
  res.end();
}