const express = require('express')
const router = express.Router()
const pool = require("../database")

//create profile
router.post("/", (req,res) => {
  const {user_id, pet_name, size, breed, species, age, picture} = req.body
  pool.query("INSERT INTO profiles (user_id, pet_name, size, breed, species, age, picture) VALUES($1, $2, $3, $4, $5, $6, $7)", [user_id, pet_name, size, breed, species, age, picture]).then((profile) => {
    res.json(profile.rows);
  }).catch(err => {
    res.send(err).status(400)
  }) 
});

//get all profiles
router.get("/", (req,res) => {
  pool.query("SELECT * FROM profiles").then((profile) => {
    res.json(profile.rows)
  }).catch(err => {
    res.send(err).status(400)
  }) 
});

//update profiles
router.post("/:id", (req,res) => {
  const {user_id, pet_name, size, breed, species, age, picture} = req.body
  pool.query("UPDATE profiles pet_name = $1, size = $2, breed = $3, species = $4, age = $5, picture = $6 WHERE user_id = $7", [pet_name, size, breed, species, age, picture, user_id]).then((chats) => {
    
  }).catch(err => {
    res.send(err).status(400)
  }) 
});

module.exports = router
