const express = require('express')
const controller = require('../controllers/book-controller')


//Specifically for handling routes (GET/POST/PUT/DELETE etc.)
const router = express.Router()
/*router is like a mini version of your main Express app.
You attach routes to this object instead of app.*/


router.get('/',controller.homepage)

router.get('/books',controller.getallbooks)

router.get('/books/:id',controller.getBookById)

router.post('/books',controller.addbook)

router.delete('/books/:id',controller.deletebook)

router.patch('/books/:id',controller.editbookbyid)

module.exports = router // default export