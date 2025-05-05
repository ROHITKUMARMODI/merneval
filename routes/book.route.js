const express = require("express")
const {getAllBooks,getBookById,updateBook,deleteBook,createBook} =  require("../controller/book.controller")
const {check} = require("express-validator")
const auth = require('../middleware/auth');
const isAdmin = require("../middleware/isAdmin");
const bookRouter = express.Router()

bookRouter.get("/",auth,getAllBooks);
bookRouter.get("/:id",getBookById)
bookRouter.post("/",[
  check("title").not().isEmpty(),
  check("author").not().isEmpty()
],createBook)
bookRouter.put("/:id",isAdmin,updateBook)
bookRouter.delete("/:id",isAdmin,deleteBook)