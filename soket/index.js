const io = require("socket.io")(8800, {
  cors: {},
});

let activeUsers = [];