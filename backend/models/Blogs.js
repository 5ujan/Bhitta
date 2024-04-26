const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String
    },
    createdBy: {
        type: String
    }
})

module.exports = mongoose.model("Blog", BlogSchema)