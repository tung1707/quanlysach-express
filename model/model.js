//tao model giong laravel,cac thuoc tinh,kieu
const mongoose = require('mongoose')
const authorSchema = new mongoose.Schema({
    name: {
        type: String
    },
    year: {
        type: Number,
        required:true
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }],
})
//khoi tao model cho book
const bookSchema = new mongoose.Schema({
    name: {
        type: String,//khai bao kieu du lieu
        required: true//validate truong name bat buoc
    },
    publishedData: {
        type: String
    },
    genres: {
        type: [String] //String array
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,//noi voi 1 bang khac theo objectid,kieu du lieu dat theo mongoose
        ref: "Author"//giong nhu dat khoa ngoai trong sql
    }
})

let Book = mongoose.model("Book", bookSchema)
let Author = mongoose.model("Author", authorSchema)
module.exports = {Book,Author}