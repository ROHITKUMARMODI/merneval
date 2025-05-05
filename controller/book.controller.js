const {validationResult} = require("express-validator");
const bookModel = require("../db/models/book.model");

let getAllBooks = async(req,res)=>{
    let skip = req.query.skip ||0;
    let limit = req.query.limit || 5;
    let title = req.query.title;
    let query={}
    if(title && title!=""){
        query["title"] = title;
    }
    let allBooks = await bookModel.find(query).skip(skip).limit(limit)
   res.status(200).json({success:true,message:"book details fetched successfully"})
}

let getBookById = async(req,res)=>{
    let bookId = req.params.id;
    let book = await bookModel.findById(bookId)
    if(!book){
        res.status(404).json({success:false,message:"product not found"})
    }
    res.status(200).json({success:true,message:"Book Fetched successfully"})
}

let createBook= async(req,res)=>{
    let body = req.body;
    try{
        let errors = validationResult(req);
        if(errors && errors.length){
            return res.status(401).json({message:errors[0].message})
        }
        let newBook = new bookModel({
            title:body.title,
            author:body.author,
            genre:body.genre
        })
        await newBook.save()
        res.status(201).json({message:"product created successfully"})
    }
    catch(err){
       res.status(500).json({success:false,message:"Internal Server error"})
    }
}

let updateBook = async(req,res)=>{
    let bookId = req.params.id;
    let book = await bookModel.findById(bookId)
    if(!book){
        return res.status(404).json({message:"book not found"})
    }
    let body = req.body;
    let newTitle = req.body.title;
    let newAuthor = req.body.author;
    let newGenre = req.body.genre;

    if(newTitle && newTitle!=""){
         body.title = newTitle
    }
    if(newAuthor && newAuthor!=""){
        body.author = newAuthor
   }
   if(newGenre && newGenre!=""){
    body.title = newGenre
  }
  await book.save()
  res.status(201).json({message:"book updated successfully"})
}

let deleteBook = async(req,res)=>{
  let bookId = req.params.id;
  let book = await bookModel.deleteOne(bookId);
  await book.save()
  res.status(200).json({success:true,message:"product deleted successfully"})
}


module.exports = {
    getAllBooks,getBookById,createBook,deleteBook,updateBook
}