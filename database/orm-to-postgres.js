const { drizzle } = require("drizzle-orm/node-postgres")
require('dotenv/config')
//for connecting the orm with the postgres we have to put the url of our postgres
const db = drizzle(process.env.DATABASE_URL)

module.exports = db