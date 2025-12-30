const { pgTable, integer,varchar,uuid,text } = require("drizzle-orm/pg-core")

const authorTable = pgTable("authors",{
    id: uuid("id").primaryKey().defaultRandom(),
    authorName: varchar("author_name", { length: 200 }).notNull(),
    email: varchar("email", { length: 200 }).notNull().unique()
})

module.exports = { authorTable }