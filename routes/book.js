const bookController = require("../controllers/bookController")

const router = require("express").Router()

//ADD books method
router.post("/",bookController.addABook)

//GET all books
router.get("/",bookController.getAllBook)

//GET a book
router.get("/:id",bookController.getABook)

//UPDATE a book
router.put("/:id",bookController.updateBook)

//DELETE book
router.delete("/:id",bookController.deleteBook)

module.exports = router