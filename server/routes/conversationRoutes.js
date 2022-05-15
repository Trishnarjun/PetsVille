const express = require('express')
const router = express.Router()
const pool = require("../database")

//create conversations
router.post("/:id", (req,res) => {
  const {user_id, chat_id} = req_body
  pool.query("INSERT INTO conversations (user_id, chat_id) VALUES($1, $2)", [user_id, chat_id]).then((conversations) => {
    res.json(conversations.rows)
  })
});

//get all conversations
router.get("/", (req,res) => {
  pool.query("SELECT * FROM conversations").then((conversations) => {
    res.json(conversations.rows)
  })
});

//delete converstions
router.delete("/:id", (req,res) => {
  const {chat_id} = req_body
  pool.query("DELETE FROM conversations WHERE user_id = $1 ", [chat_id]).then((conversations) => {
    res.json(conversations.rows)
  })
});

//delete all converstions //stretch


module.exports = router