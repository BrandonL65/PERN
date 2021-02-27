const Pool = require("pg").Pool;

//Contains user/password/port/db to query into
const pool = new Pool({
  user: "postgres",
  password: "Ilove0417!",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

module.exports = pool;
