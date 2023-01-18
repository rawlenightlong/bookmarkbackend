const express = require('express')
const app = express()
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const { restart } = require('nodemon')
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

// LANDING GET ROUTE
app.get("/", (req, res) => {
    res.redirect("/bookmarks")
})

// INDEX ROUTE
app.get('/bookmarks', async (req, res) => {
    try{
        res.json(await Bookmarks.find({}))
    }
    catch(error){
        res.status(400).json(error)
    }
})


// CREATE ROUTE
app.post('/bookmarks', async (req, res) => {
    try{
        res.json(await Bookmarks.create(req.body))
    }catch(error){
        res.status(400).json(error)
    }
})


// UPDATE ROUTE
app.put('/bookmarks/:id', async (req, res) => {
    try{
        res.json(await Bookmarks.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    }catch(error){
        res.status(400).json(error)
    }
})

// DELETE ROUTE
app.delete('/bookmarks/:id', async (req, res) => {
    try{
        res.json(await Bookmarks.findByIdAndRemove(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})

// SHOW ROUTE
app.get('/bookmarks/:id', async (req, res) => {
    try
        {res.json(await Bookmarks.findById(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})



app.listen(PORT, () => {
    console.log(`Hey there Delilah, what's it like in Port ${PORT}`)
})