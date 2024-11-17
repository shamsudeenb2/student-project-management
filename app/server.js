import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 5000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

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

    })
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });