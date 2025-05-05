const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser");
const connection = require("./db/connection")
const bookRouter = require("./routes/book.route")
const userRouter = require("./routes/user.route")


const app= express();
app.use(bodyParser.json());

app.use("/book",bookRouter)
app.use("/user",userRouter)
app.use("/", (req,res)=>{
    res.status(200).send("Application is running")
})


app.use((req,res)=>{
    res.status(404).send(`<html>
    <head>
        <title>404</title>
    </head>
    <body>
        <h1>PAGE NOT FOUND</h1>
    </body>
</html>`)
 })

app.listen(1455,()=>{
    console.log("server listening on 1455")
});