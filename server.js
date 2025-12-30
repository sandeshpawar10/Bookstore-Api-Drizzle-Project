const express = require('express')
const bookrouter = require('./routes/book.routes')
const authorrouter = require('./routes/author.routes')
require('dotenv/config')
const app = express()
const port = 8000


app.use(express.json())//this convert the json format file into js object which can be used in body of req
app.use('/',bookrouter)
app.use('/',authorrouter)


app.listen(port,()=>{
    console.log("my server is running on port 8000")
})