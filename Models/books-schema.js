const { pgTable,integer,varchar,uuid,text } = require("drizzle-orm/pg-core")
// const { title } = require("process")
const { authorTable } = require("./author-schema")
const { index } = require("drizzle-orm/gel-core")
/*A database index is a small, optimized structure (like a sorted list) that helps the 
database quickly find rows without scanning the entire table.*/


const bookTable = pgTable("books",{
    bookId: uuid("book_id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    authorId: uuid("author_id").references(() => authorTable.id).notNull()
    
    /*here is a refrence of a author id in book table 
    because if anybody want to finds the book by using 
    authorid but the author id is not present in the author 
    table we cannot access that book*/

    /*this is a relation that we can use it in a sql i.e postgres
    but we cannot use it in a mongodb*/


},(table)=>({
    titleindex: index("book_title_index").on(table.title)
}))

/*this extra configuration function means what extra things you have to do with the table other than book schema
and it will return the all the colum names in the object form and that we can use with the name table*/

module.exports = { bookTable }