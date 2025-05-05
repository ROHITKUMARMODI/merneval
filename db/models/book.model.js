const mongoose = require("mongoose")

const bookSchema= new mongoose.Schema({
    title:{
        type:String,
    },
    author:{
        type:String
    },
    genre:{
        type:String
    },
    year:{
        type:Date,
    }
})

let bookModel = mongoose.model("book",bookSchema)

module.exports = bookModel