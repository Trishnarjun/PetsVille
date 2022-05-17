const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 3002;
const pool = require("./database")
const chats = require("./routes/chatRoutes")
const users = require("./routes/userRoutes")
const profiles = require("./routes/profileRoutes")
const conversations = require("./routes/conversationRoutes")

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`)
})

//routues//


app.get("/", (req,res) => {
    res.send("Welcome to the the API SERVER")
});

//chat routes
app.use("/chats", chats)

//conversation routes
app.use("/conversations",conversations)

//profile route
app.use("/profiles", profiles)


//user routes
app.use("/users", users)

