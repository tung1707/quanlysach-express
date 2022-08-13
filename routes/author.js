const router = require("express").Router()

const authorController = require("../controllers/authorController")

//POST method
router.post("/",authorController.addAuthor)//goi den phuong thuc addAuthor trong controller

//GET All author
router.get("/",authorController.getAllAuthors)

//GET 1 author bang id
router.get("/:id",authorController.getAnAuthor)

//UPDATE author
router.put("/:id",authorController.updateAuthor)

//DELETE author
router.delete("/:id",authorController.deleteAuthor)
module.exports = router