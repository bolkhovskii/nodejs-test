const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pern",
  password: "qwerty123",
  port: 5432,
});

module.exports = pool;
