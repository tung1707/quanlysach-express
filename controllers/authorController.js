const {Author,Book} = require("../model/model") //goi den model.js de tao 1 doi tuong

const authorController = {
    //ADD method
    addAuthor : async (req, res) => {
        try {
            const newAuthor = new Author(req.body)//tao 1 author moi trong author model
            const savedAuthor = await newAuthor.save()
            res.status(200).json(savedAuthor)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //GET all author
    getAllAuthors:async(req,res)=>{
        try {
            const authors = await Author.find()
            res.status(200).json(authors)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //GET an author
    getAnAuthor: async(req,res)=>{
        try {
            const author = await Author.findById(req.params.id).populate("books")//populate de lay thong tin ve sach cua tac gia
            res.status(200).json(author)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //UPDATE author
    updateAuthor: async(req,res)=>{
        try {
            const author = await Author.findById(req.params.id)
            await author.updateOne({$set : req.body})
            res.status(200).json("UPDATED SUCCESS")
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //DELETE author
    deleteAuthor: async(req,res)=>{
        try {
            //UPDATE book trong author
            await Book.updateMany({
                author: req.params.id
            }, {author:null})
            await Author.findByIdAndDelete(req.params.id) //xoa sach theo id
            res.status(200).json("DELETE SUCCESS")
        } catch (err) {
            res.status(500).json(err)
        }
    },
}
//export module
module.exports = authorController