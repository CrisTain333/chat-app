const io = require("socket.io")(8800, {
  cors: {},
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (newUserId) {
      if (
        !activeUsers.some(
          (user) => user.userId === newUserId
        )
      ) {
        activeUsers.push({
          userId: newUserId,
          socketId: socket.id,
        });
        console.log("New User Connected", activeUsers);
      }
    }

    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter(
      (user) => user.socketId !== socket.id
    );
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find(
      (user) => user.userId === receiverId?._id
    );
    console.log("Sending from socket to :", receiverId);
    console.log("Data: ", data);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});

// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const socketIO = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// const PORT = process.env.PORT || 3000;

// app.use(cors());
// // Simple Express route for testing purposes
// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// // Socket.io event handling
// io.on("connection", (socket) => {
//   console.log("A user connected.");

//   // Event when a client sends a message
//   socket.on("message", (data) => {
//     console.log("Received message:", data);

//     // Broadcast the message to all connected clients except the sender
//     socket.broadcast.emit("message", data);
//   });

//   // Event when a client disconnects
//   socket.on("disconnect", () => {
//     console.log("A user disconnected.");
//   });
// });

// // Start the server
// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
