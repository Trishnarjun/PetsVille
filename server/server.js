const express = require("express")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 3001;
const pool = require("./database")
const chats = require("./routes/chatRoutes")
const users = require("./routes/userRoutes")

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("server has started on port 3001")
})

//routues//

//chat routes
app.use("/chats", chats)

//create conversations

//get all conversations

//update conversations

//delete converstions

//delete all converstions //stretch

//create locations

// get all locations

//create profile

//get all profiles

//update profiles

//user routes
app.use("/users", users)
