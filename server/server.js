const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3002;
const pool = require("./database");
const chats = require("./routes/chatRoutes");
const users = require("./routes/userRoutes");
const profiles = require("./routes/profileRoutes");
const conversations = require("./routes/conversationRoutes");
const http = require("http");
// const locations = require("./routes/locationRoutes")
//const { Server } = require("socket.io");
//const cookieSession = require("cookie-session");

app.use(cors());
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["super secret"],
//     domain: "http://localhost:3003",
//     // Cookie Options
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours));
//   })
// );

app.use(express.json());

const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3003", //which server is being called and making calls to websocket
//     methods: ["GET", "POST"],
//   },
// });

// io.on means it is listening to the event
// io.on("connection", (socket) => {
//   console.log(`User Connected ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

// socket.on("send_message", (data) => {
//   socket.to(data.room).emit("recieve_message", data);
// });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

server.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});

//routues//

app.get("/", (req, res) => {
  res.json("Welcome to the the API SERVER");
});

//chat routes
app.use("/chats", chats);

//conversation routes
//app.use("/conversations", conversations);

//profile route
app.use("/profiles", profiles);

//user routes
app.use("/users", users);
