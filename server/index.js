const express = require("express")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 3001;
const ENV = require("./environment");

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("server")
}).then(
    console.error("error!") 
)