const express = require("express");
const router = express.Router();
const pool = require("../database");

const searchByLocation = function (lng, lat) {
  console.log("++++++++");
  let queryString = `SELECT * , ST_Distance(geography(ST_MakePoint(users.lng, users.lat)),
  geography(ST_MakePoint($1, $2))) AS distance FROM profiles INNER JOIN users ON profiles.user_id = users.id ORDER BY 13`;
  const values = [lng, lat];
  return pool
    .query(queryString, values)
    .then((dbRes) => {
      console.log("++++++++", dbRes.rows);
      return dbRes.rows;
    })
    .catch((error) => console.error("query error", error.stack));
};
//create profile
router.post("/", (req, res) => {
  const { user_id, pet_name, size, breed, species, age, picture } = req.body;
  pool
    .query(
      "INSERT INTO profiles (user_id, pet_name, size, breed, species, age, picture) VALUES($1, $2, $3, $4, $5, $6, $7)",
      [user_id, pet_name, size, breed, species, age, picture]
    )
    .then((profile) => {
      res.json(profile.rows);
    })
    .catch((err) => {
      res.send(err).status(400);
    });
});

//get all profiles
router.get("/", (req, res) => {
  //const searchType = req.query.searchType;
  const lng = req.query.lng;
  const lat = req.query.lat;
  searchByLocation(lng, lat).then((results) => {
    res.json(results);
  });
  console.log("________________");
  // if (searchType === "location") {
  // } else {
  //   console.log("_________++++++++_______");
  //   pool
  //     .query(
  //       "SELECT * FROM profiles INNER JOIN users ON profiles.user_id = users.id "
  //     )
  //     .then((profile) => {
  //       console.log("++++++++_____", profile.rows);
  //       res.json(profile.rows);
  //     })
  //     .catch((err) => {
  //       res.send(err).status(400);
  //     });
  // }
});

//update profiles
router.post("/:id", (req, res) => {
  const { user_id, pet_name, size, breed, species, age, picture } = req.body;
  pool
    .query(
      "UPDATE profiles pet_name = $1, size = $2, breed = $3, species = $4, age = $5, picture = $6 WHERE user_id = $7",
      [pet_name, size, breed, species, age, picture, user_id]
    )
    .then((chats) => {})
    .catch((err) => {
      res.send(err).status(400);
    });
});

module.exports = router;