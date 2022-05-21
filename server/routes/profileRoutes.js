const express = require("express");
const router = express.Router();
const pool = require("../database");

const searchByLocation = function (lng, lat) {
  let queryString = ` select profiles.*, SQRT(POW(69.1 * (users.lat::float -  lng::float), 2) + 
POW(69.1 * (lat::float - users.lng::float) * COS(users.lat::float / 57.3), 2)) AS distance FROM profiles INNER JOIN users ON profiles.user_id = users.id ORDER BY distance`;
  const values = [lng, lat];
  return pool
    .query(queryString)
    .then((dbRes) => {
      console.log("++++++++", dbRes.rows);
      return dbRes.rows;
    })
    .catch((error) => console.error("query error", error.stack));
};
//create profile
router.post("/", (req, res) => {
  const { user_id, pet_name, size, breed, species, age, picture } = req.body;
  console.log(req.body);
  pool
    .query(
      "INSERT INTO profiles (user_id, pet_name, size, breed, species, age, picture) VALUES($1, $2, $3, $4, $5, $6, $7)",
      [user_id, pet_name, size, breed, species, age, picture]
    )
    .then((profile) => {
      //res.status(200).send({user: user_id})
      res.json(profile.rows);
    })
    .catch((err) => {
      res.send(err).status(400);
    });
});

//get all profiles
router.get("/", (req, res) => {
  console.log("_______________IM IN PROFILES_");
  const searchType = req.query.searchType;
  const lng = req.query.lng;
  const lat = req.query.lat;
  console.log(req.query);
  if (searchType === "location") {
    searchByLocation(lng, lat).then((results) => {
      res.json(results);
    });
  }
  if (searchType === "size") {
    searchBySize();
  }
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
