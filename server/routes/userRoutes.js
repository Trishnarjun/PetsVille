const { application } = require('express');
const express = require('express')
const router = express.Router()
const pool = require("../database")
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')


//get all users
router.get("/", (req,res) => {
  pool.query("SELECT * FROM users").then((users) => {
    res.json(users.rows)
  }).catch(err => {
    res.send(err).status(400)
  }) 
});

//create a user
router.post("/register", (req,res) => {
  const {email, password, lng, lat} = req.body
  pool.query("INSERT INTO users (email, password, lng, lat) VALUES($1, $2, $3, $4)", [email, password, lng, lat]).then((data) => {
  
    console.log("data", data)
    res.send("Finished")
    // res.status(200)
    // res.json({message: "success"})
   // const hashedpassword = bcrypt.hash(password, 10)  
  })
  .catch(err => {
    res.send(err).status(400)
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