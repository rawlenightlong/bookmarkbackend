const express = require('express')
const app = express()
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL


app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.set('strictQuery', false);

// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

const BookmarkSchema = new mongoose.Schema({
    title: String,
    url: String
})

const Bookmarks = mongoose.model("Bookmarks", BookmarkSchema)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Hey there Delilah, what's it like in Port ${PORT}`)
})