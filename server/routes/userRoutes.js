const { application } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../database");
const bcrypt = require("bcrypt");
//const jwt = require('jsonwebtoken')

//get all users
router.get("/", (req, res) => {
  pool
    .query("SELECT * FROM users")
    .then((users) => {
      res.json(users.rows);
    })
    .catch((err) => {
      res.send(err).status(400);
    });
});

//create a user
// try {
//   const  data  =  await client.query(`SELECT * FROM users WHERE email= $1;`, [email]); //Checking if user already exists
//     const  arr  =  data.rows;
//     if (arr.length  !=  0) {
//     return  res.status(400).json({
//     error: "Email already there, No need to register again.",
//     });
//     }
// } catch(err) {
// console.log(err)
// }

router.post("/register", async (req, res) => {
  const { email, password, lng, lat } = req.body;
  try {
    const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]); //Checking if user already exists
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    }
  } catch (err) {
    console.log(err);
  }

  pool
    .query(
      "INSERT INTO users (email, password, lng, lat) VALUES($1, $2, $3, $4)",
      [email, password, lng, lat]
    )
    .then((data) => {
      console.log("data", data);
      //

      // res.status(200)
      // res.json({message: "success"})
      // const hashedpassword = bcrypt.hash(password, 10)
    })
    .catch((err) => {
      res.status(400).send(err);
    });

  try {
    const dataNew = await pool.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]);
    const arrNew = dataNew.rows;
    //console.log("after added", arrNew[0].id)
    res.status(200).send({ user: arrNew[0].id });
    arrNew;
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  try {
    // const correctPassword = await bcrypt.compare(password, user.hashed_password)

    //Checking if user already exists
    pool.query(`SELECT * FROM users WHERE email= $1;`, [email]).then((data) => {
      const arr = data.rows;
      // token = jwt.sign({ user_id: arr[0].id, users: arr[0].email});
      // console.log(data, password, "arr is", arr)
      if (arr.length != 0) {
        const correctPassword = arr[0].password;

        if (correctPassword == password) {
          // token = jwt.sign({ user_id: arr[0].id, users: arr[0].email}, "shhhhh");

          res.status(200).send({ user: arr[0].id });
          return;
        }
      }
      res.status(400).send("unable to authenticate");
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//
router.get("/isLoggedIn", (req, res) => {
  if (req.session.user_id) {
    res.status(200).send("true");
  } else {
    res.status(200).send("false");
  }
});

//     pool.query("INSERT INTO users (email, password, lng, lat) VALUES($1, $2, $3, $4)", [email, password, lng, lat]).then((data) => {

//       console.log("data", data)
//       res.send("Finished")

//     // res.status(200)
//     // res.json({message: "success"})
//    // const hashedpassword = bcrypt.hash(password, 10)
//   })
//   .catch(err => {
//     res.send(err).status(400)
//   })
// });

// try {
//   const  data  =  await client.query(`SELECT * FROM users WHERE email= $1;`, [email]); //Checking if user already exists
//     const  arr  =  data.rows;
//     if (arr.length  !=  0) {
//     return  res.status(400).json({
//     error: "Email already there, No need to register again.",
//     });
//     }
//       else {
//       bcrypt.hash(password, 10, (err, hash) => {
//       if (err)
//       res.status(err).json({
//       error: "Server error",
//       });
//       const  user  = {
//       email,
//       password: hash,
//       lng,
//       lat
//       };
//       pool.query("INSERT INTO users (email, password, lng, lat) VALUES($1, $2, $3, $4)", [email, password, lng, lat])

// router.post("/register", async (req,res) => {
//   const {email, password, lng, lat} = req.body
//   // pool.query("INSERT INTO users (email, password, lng, lat) VALUES($1, $2, $3, $4)", [email, password, lng, lat]).then((data) => {

//     const genertaeduserID = uuidv4()
//     const hashedpassword = await bcrypt.hash(password, 10)

//     try {
//       const exisitingUser = users.find({email})

//       if (exisitingUser) {
//         return res.status(409).send("user already exists. Please login")
//       }

//       const sanitizedEmail = email.toLowerCase()

//       const data = {
//         user_id: genertaeduserID,
//         email: sanitizedEmail,
//         hashedpassword: hashedpassword
//       }
//       pool.query("INSERT INTO users (email, password, lng, lat) VALUES($1, $2, $3, $4)", [email, password, lng, lat]).then((data) => {

//      const insertedUser =  users.insert(data)

//      const token = jwt.sign(insertedUser, sanitizedEmail, {
//        expiresIn: 60 * 24,

//     })
//      res.status(201).json({ token, userId: genertaeduserID, email: sanitizedEmail})
//     })
//   } catch(err) {
//     console.log(err)
//   }

// });

// res.status(200)
// res.json({message: "success"})

//update a user
// router.post("/:id", (req,res) => {
//   const {name, email, password, location_id} = req_body
//   pool.query("UPDATE users SET name, email, password, location_id) VALUES($1, $2, $3, $4)", [message, message_date, user_id]).then((users) => {
//     res.json(users.rows)
//   })
// });

module.exports = router;
