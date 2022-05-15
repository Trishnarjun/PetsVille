const express = require("express")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 3001;
const pool = require("./database")
const chats = require("./routes/chatRoutes")
const users = require("./routes/userRoutes")
const profiles = require("./routes/profileRoutes")
const conversations = require("./routes/conversationRoutes")
const locations = require("./routes/locationRoutes")

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("server has started on port 3001")
})

//routues//


app.get("/", (req,res) => {
    res.send("Welcome to the the API SERVER")
});

//chat routes
app.use("/chats", chats)

//conversation routes
app.use("/conversations",conversations)

//location routes
app.use("/locations",locations)

//profile route
app.use("/profiles", profiles)


//user routes
app.use("/users", users)

