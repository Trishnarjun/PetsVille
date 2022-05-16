const express = require('express')
const router = express.Router()
const pool = require("../database")

//create locations
router.post("/:id", (req,res) => {
  const {lng, lat} = req.body
  pool.query("INSERT INTO locations (lng, lat) VALUES ($1, $2)", [lng, lat]).then((locations) => {
    res.json(locations.rows)
  })
});

// get all locations
router.get("/", (req,res) => {
  pool.query("SELECT * FROM locations").then((locations) => {
    res.json(locations.rows)
  })
});

module.exports = router