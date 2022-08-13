const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const morgan  = require('morgan')
const dotenv = require('dotenv')
const authorRoute = require("./routes/author")
const bookRoute = require("./routes/book")

dotenv.config()//khoi tao env config
//Connect Database 
mongoose.connect((process.env.MONGODB_URL),()=>{//noi db voi file env
    console.log("Connected to MongoDB")
})
app.use(bodyParser.json({limit:"50mb"}))
app.use(cors())
app.use(morgan('common'))

//ROUTES API
app.use("/v1/author",authorRoute)
app.use("/v1/book",bookRoute)//trong json truyen vao phai nhapj id author de db match sang bang author


app.listen(3000,()=>{
    console.log("Server is running port 3000...")
})