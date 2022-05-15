const express = require('express')
const router = express.Router()
const pool = require("../database")

// //create chats
router.post("/:id", (req,res) => {
  const {message, message_date, id} = req_body
  pool.query("INSERT INTO chats (message, message_date, user_id) VALUES($1, $2, $3)", [message, message_date, id]).then((chats) => {
    res.json(chats.rows)
  })
});

//get all chats
router.get("/", (req,res) => {
  pool.query("SELECT * FROM chats").then((chats) => {
    res.json(chats.rows)
  })
});

// //delete chats
router.delete("/:id", (req,res) => {
  const { id } = req.body
  pool.query("DELETE FROM chats WHERE user_id = $1", [id]).then((chats) => {
    res.json(chats.rows)
  })
});

module.exports = router