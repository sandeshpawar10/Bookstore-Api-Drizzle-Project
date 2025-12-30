const { authorTable } = require("../Models/author-schema")
const { bookTable } = require("../Models/books-schema")
const db = require("../database/orm-to-postgres")
const { eq } = require("drizzle-orm")



exports.getallauthors = async function(req, res){
    const authors = await db.select().from(authorTable)
    return res.status(200).json(authors)
}



exports.getAuthorById = async function(req, res){
    const id = req.params.id.trim()

    const author = await db.select().from(authorTable).where(eq(authorTable.id,id))

    if(author.length===0){
        return res.status(404).json({error:`author not found in the database`})
    }
    return res.status(200).json(author)
}


exports.addAuthor = async function(req, res){
    const { authorName, email } = req.body

    if(!authorName || authorName.length===0){
        return res.status(404).json({msg:`the authorname is required`})
    }
    if(!email || email.length===0){
        return res.status(404).json({msg:`the email is required`})
    }

    const [aid] = await db.insert(authorTable).values({
        authorName,
        email
    }).returning({
        id: authorTable.id
    })

    return res.status(201).json({msg: `the author with the id ${aid.id} is added to database`})

}


exports.deleteauthorbyid = async function(req, res){
    const id = req.params.id.trim()

    if(!id || id.length === 0){
        return res.status(404).json({msg:`the id is required to delete the author`})
    }

    await db.delete(authorTable).where(eq(authorTable.id,id))

    // if (!a) {
    //     return res.status(404).json({ error: `Book with the author name ${a.author_name} not found` });
    // }

    return res.status(200).json({error: `book deleted successfully`})
}


exports.getAllBooksByAuthor = async function(req,res){
    const id = req.params.id.trim()

    if(!id || id.length === 0){
        return res.status(404).json({msg:`the id is required`})
    }

    const books = await db.select().from(bookTable).where(eq(bookTable.authorId,id))

    return res.status(200).json(books)
}
