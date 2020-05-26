const mongoose = require('mongoose')
const Schema = mongoose.Schema


// schema - like blueprint --> what type of value should i'll store --> what are the fields my node documents should contain

const noteSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Category' // model name not the variable name // ref is not requried for saving
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    })

// model - constructor function - defition of a colletion

const Note = mongoose.model('Note', noteSchema)

module.exports = Note