const Pool = require("pg").Pool;

const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "accountmanager",
    password: "12345",
    port: 5432
  });

  module.exports=db;