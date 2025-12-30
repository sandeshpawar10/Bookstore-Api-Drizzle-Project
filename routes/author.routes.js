const express  = require("express")
const controller = require("../controllers/author-controller")
const router = express.Router();

router.get('/authors',controller.getallauthors);

router.get('/authors/:id',controller.getAuthorById);

router.post('/authors',controller.addAuthor);

router.delete('/authors/:id',controller.deleteauthorbyid);

router.get('/:id/books',controller.getAllBooksByAuthor)

module.exports = router