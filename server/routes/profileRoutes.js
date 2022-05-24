const express = require("express");
const router = express.Router();
const pool = require("../database");

const searchByLocation = function (lng, lat) {
  let queryString = ` select profiles.*, SQRT(POW(69.1 * (users.lat::float -  $1::float), 2) + 
POW(69.1 * ($2::float - users.lng::float) * COS(users.lat::float / 57.3), 2)) AS distance FROM profiles INNER JOIN users ON profiles.user_id = users.id ORDER BY distance`;
  const values = [lat, lng];
  return pool
    .query(queryString, values)
    .then((dbRes) => {
      return dbRes.rows;
    })
    .catch((error) => console.error("query error", error.stack));
};
const searchBySpecies = function (species, lng, lat) {
  let queryString = ` 
    SELECT profiles.*, SQRT(POW(69.1 * (users.lat::float -  $3::float), 2) + 
      POW(69.1 * ($2::float - users.lng::float) * COS(users.lat::float / 57.3), 2)) AS distance 
    FROM profiles 
    INNER JOIN users ON profiles.user_id = users.id 
    WHERE species = $1 
    ORDER BY distance `;
  const values = [species, lng, lat];
  return pool
    .query(queryString, values)
    .then((dbRes) => {
      return dbRes.rows;
    })
    .catch((error) => console.error("query error", error.stack));
};
const searchByAge = function (age, lng, lat) {
  let queryString = ` 
    SELECT profiles.*, SQRT(POW(69.1 * (users.lat::float -  $3::float), 2) + 
      POW(69.1 * ($2::float - users.lng::float) * COS(users.lat::float / 57.3), 2)) AS distance 
    FROM profiles 
    INNER JOIN users ON profiles.user_id = users.id 
    WHERE age = $1 
    ORDER BY distance `;
  const values = [age, lng, lat];
  return pool
    .query(queryString, values)
    .then((dbRes) => {
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
  const { searchType, lng, lat, species, age } = req.query;
  if (searchType === "location") {
    searchByLocation(lng, lat).then((results) => {
      res.json(results);
    }).catch((err) => {
      res.send(err).status(400);
    });
  }
  if (searchType === "species") {
    searchBySpecies(species, lng, lat).then((results) => {
      res.json(results);
    });
  }
  if (searchType === "age") {
    searchByAge(age, lng, lat).then((results) => {
      res.json(results);
    });
  }
});

//update profiles
router.post("/update", (req, res) => {
  const { user_id, pet_name, size, breed, species, age, picture } = req.body;
  pool
    .query(
      "UPDATE profiles SET pet_name = $1, size = $2, breed = $3, species = $4, age = $5, picture = $6 WHERE user_id = $7",
      [pet_name, size, breed, species, age, picture, user_id]
    )
    .then((chats) => {})
    .catch((err) => {
      res.send(err).status(400);
    });
});

module.exports = router;
