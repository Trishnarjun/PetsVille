const pg = require("pg").pool

const pool = new pg({
  user: "development",
  password: "development",
  host: "localhost",
  port: 5432,
  database: "petsville_development"
});

module.exports = pool;