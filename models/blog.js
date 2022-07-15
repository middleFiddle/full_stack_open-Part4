const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    _id: String,
    title: String,
    author: String,
    url: String,
    likes: Number,
    __v: Number
})

module.exports = mongoose.model('Blog', blogSchema)