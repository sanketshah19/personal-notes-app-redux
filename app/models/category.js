const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category