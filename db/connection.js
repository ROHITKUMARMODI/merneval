const mongoose = require("mongoose")

let mongourl = process.env.MONGO_URL

mongoose.connect(mongourl)
.then(()=>console.log("connected to database"))
.catch((err)=>console.log(err))