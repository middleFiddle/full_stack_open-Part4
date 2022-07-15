const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const { MONGODB_URI } = require('./utils/config')



mongoose.connect(MONGODB_URI)
    .then(result => console.log('connected to Mongo'))



app.use(cors())

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app