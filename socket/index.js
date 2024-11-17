const express = require('express')
const {Server}= require('socket.io')
// import { Server } from "socket.io";
// import {createServer} from "http"

// const server = createServer()
// const io = new Server(server);
const io = new Server({cors:"http://localhost:3000" });

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
      console.log("onlineUser", onLineUser)

      io.emit("getOnlineUsers", onLineUser)
  });

  //add message
  socket.on("sendMessage", (message)=>{
    const user = onLineUser.find(user=> user.userId === message.recipientId)

    if(user){
        io.to(user.socketId).emit("getMessage", message)
        io.to(user.socketId).emit("getNotification", {senderId: message.senderId,
          isRead:false,
          date:new Date()
        })
    }
  })

  socket.on("disconnect", ()=>{
      onLineUser = onLineUser.filter(user => user.socketId !== socket.id)

      io.emit("getOnlineUsers",onLineUser)
  });
});

io.listen(5000);