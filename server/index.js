const express = require("express")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 3001;
const pool = require("./database")

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("server")
}).then(
    console.error("error!") 
)

//routues//

//get all chats

//update chats

//delete chats

//get all conversations

//update conversations

//delete all converstions

// get all locations

//get all profiles

//update profiles

//get all users

//update a user

