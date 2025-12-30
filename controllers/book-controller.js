const { bookTable } = require('../Models/books-schema') /*{ BOOKS } -> is a object bcoz require returns object and i */
const { authorTable } = require('../Models/author-schema');
const db = require('../database/orm-to-postgres')
const { eq, ilike } = require("drizzle-orm")//eq means equal

/*ilike lets you search text without caring about uppercase or lowercase.

Example:

"Sandesh" matches "sandesh"

"BOOK" matches "book"

"Author" matches "AUTH"*/

exports.homepage = function(req,res){
    // console.log(req.headers)
    res.status(200)
    return res.end("HOMEPAGE :- For accessing the books please go on the book store")
}

exports.getallbooks = async function(req,res){

    const search = req.query.search

    // query handling
    if(search){
        const searchedbooks = await db.select().from(bookTable).where(ilike(bookTable.title,`%${search}%`))
        return res.json(searchedbooks)
    }
    
    const books = await db.select().from(bookTable)
    return res.json(books) //json is key value pair format
}

exports.getBookById = async function(req,res){
    const id = req.params.id.trim() //params ae the part on which server work it
    
    // if(isNaN(id)){ //if id is not a number like anyother value -- 'isNaN' checks the whether it is integer
    //     return res.status(400).json({error:`id should be in the form of number`})
    // }

    //const book = BOOKS.find(e => e.id == id) /*find the whether the 'id' which you mentioned
                                                //is present in the books store or not*/

    const book = await db.select().from(bookTable).where(eq(bookTable.bookId,id)).leftJoin(authorTable,eq(bookTable.authorId,authorTable.id))

    if(book.length===0){
        return res.status(404).json({error:`the book with the id ${id} is not found in  the book store`}) // so here error is a key in json
    }
    
    return res.json(book) //json is key value pair format 

    /*Use LEFT JOIN when:

    You want all authors, even if they have no books.

    Most common in real-world apps.

    Use RIGHT JOIN when:

    You want all books, even if their author is missing.*/
    
}

exports.addbook = async function(req,res){
    const { title, authorId, description } = req.body //what should be in the body 

    //if the user not entered the title in the frontend
    if(!title || title === ""){
        return res.status(404).end("please enter a valid title of the book")
    }

    if (!authorId) {
        return res.status(400).json({ error: "authorId is required" });
    }
    //if the user not entered the author in the frontend

    //if(!author || author === ""){
       // return res.status(404).json({ error: "please enter a valid author of the book"})
    //}

    const [result] = await db.insert(bookTable).values({
        title,
        authorId,
        description
    }).returning({
        id: bookTable.bookId
    })

    //const id = BOOKS.length+1 //new book id should be one more than actual length of the book store


    // const book = {title,author} //created a book if author and title is correctly send

    // BOOKS.push(book)

    return res.status(201).json({ msg: `the new book has been created with the is ${result.id}`,})
}


exports.deletebook = async function(req,res){
    const id = req.params.id.trim() //accessing id from the request url id

    const [a] = await db.delete(bookTable).where(eq(bookTable.bookId,id)).returning({
        title: bookTable.title
    })

    if (!a) {
        return res.status(404).json({ error: `Book with title ${a.title} not found` });
    }
    return res.status(200).end("the book deleted successfully")
}



exports.editbookbyid = async function(req,res){
    const id = req.params.id.trim()
    const { title, authorId, description } = req.body


    const t = await db.update(bookTable).set({
        title,
        authorId,
        description
    }).where(eq(bookTable.bookId,id)).returning({
        title: bookTable.title
    })


    // const updatedata = req.body

    // BOOKS[index] = {
    //     ...BOOKS[index],//keeps the old data
    //     ...updatedata //this overied the old data with the new data
    // }

    res.status(201).end(`the changes made succesfully in the book ${t[0].title}`)
}