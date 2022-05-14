const express = require('express')
const router = express.Router()
const pool = require("../database")


//get all users
router.get("/", (req,res) => {
  pool.query("SELECT * FROM users").then((users) => {
    res.json(users.rows)
  })
});

//create a user
router.post("/:id", (req,res) => {
  const {name, email, password, location_id} = req_body
  pool.query("INSERT INTO users (name, email, password, location_id) VALUES($1, $2, $3, $4)", [message, message_date, user_id]).then((users) => {
    res.json(users.rows)
  })
});

//update a user
// router.post("/:id", (req,res) => {
//   const {name, email, password, location_id} = req_body
//   pool.query("UPDATE users SET name, email, password, location_id) VALUES($1, $2, $3, $4)", [message, message_date, user_id]).then((users) => {
//     res.json(users.rows)
//   })
// });

module.exports = router