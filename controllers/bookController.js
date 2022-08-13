const {
    Book,
    Author
} = require("../model/model")

const bookController = {
    //ADD book
    addABook: async (req, res) => {
        try {
            const newBook = new Book(req.body) //req.body tuong tu nhi request
            const savedBook = await newBook.save()
            if (req.body.author) { //req.body.author = request->author,neu sach co id tac gia
                const author = Author.findById(req.body.author) //tim id trong cuon sach
                await author.updateOne({
                    $push: {
                        books: savedBook._id
                    }
                })
            }
            res.status(200).json(savedBook)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //GET all books
    getAllBook: async (req, res) => {
        try {
            const allBooks = await Book.find()
            res.status(200).json(allBooks)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //GET a book
    getABook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id).populate("author")
            res.status(200).json(book)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //UPDATE a book
    updateBook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id)
            await book.updateOne({
                $set: req.body
            })
            res.status(200).json("UPDATE SUCCESS")
        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteBook: async (req, res) => {
        try {
            //UPDATE book trong author
            await Author.updateMany({
                books: req.params.id
            }, {
                $pull: {//pull dung voi array
                    books: req.params.id
                }
            })
            await Book.findByIdAndDelete(req.params.id) //xoa sach theo id
            res.status(200).json("DELETE SUCCESS")
        } catch (err) {
            res.status(500).json(err)
        }
    }
};

module.exports = bookController