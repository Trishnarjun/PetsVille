const express = require("express");
const router = express.Router();
const pool = require("../database");

// //create chats
router.post("/:id", (req, res) => {
  const { message, message_date, id } = req.body;
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  }
  pool
    .query(
      "INSERT INTO chats (message, message_date, user_id) VALUES($1, $2, $3)",
      [message, message_date, id]
    )
    .then((chats) => {
      res.json(chats.rows);
    })
    .catch((err) => {
      res.send(err).status(400);
    });
});

//get all chats
router.get("/", (req, res) => {
  pool
    .query("SELECT * FROM chats")
    .then((chats) => {
      res.json(chats.rows);
    })
    .catch((err) => {
      res.send(err).status(400);
    });
});

// //delete chats
router.delete("/:id", (req, res) => {
  const { id } = req.body;
  pool
    .query("DELETE FROM chats WHERE user_id = $1", [id])
    .then((chats) => {
      res.json(chats.rows);
    })
    .catch((err) => {
      res.send(err).status(400);
    });
});

module.exports = router;
