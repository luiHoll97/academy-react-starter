const Pool = require("pg").Pool

// variable for url
const connectionString = process.env.DATABASE_URL
if (!connectionString) {
    throw new Error("missing DATABASE_URL Env Var")
}

const pool = new Pool({
    connectionString,
    ssl: true
});

module.exports = pool;

// user: "academy",
// host: "localhost",
// port: 5432,
// database: "tododb"