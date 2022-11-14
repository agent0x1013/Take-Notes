const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
    image: String,
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: String,
}, {
    timestamps: true
})

module.exports = mongoose.model("Note", noteSchema)