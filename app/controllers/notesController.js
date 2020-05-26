const Note = require('../models/note')
const Category = require('../models/category')

module.exports.list = (req,res) => {
        Note.find({user: req.user._id}).populate('categoryId', ['_id', 'name']) // like array filter // instance method // populate method returns an object and the second argument is what information we want
            .then((notes) => {
                res.send(notes)
            })
            .catch((err) => {
                res.send(err)
            })
}
module.exports.create = (req, res) => {
    const body = req.body
    // const note = new Note({title: body.title , description: body.description})
    const note = new Note(body)
    note.user = req.user._id
    note.save() // to save database - asynchronous operation
        .then((note) => {
            res.send(note)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    // Note.findById(id).populate('categoryId')
    Note.findOne({_id: id, user: req.user._id})
        .then((note) => {
            if(note){
                Category.findById(note.categoryId)
                        .then((category) => {
                            Object.assign(note, {categoryId: category})
                            res.send(note)
                        })
            }else{
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    Note.findOneAndUpdate({_id: id, user: req.user._id}, body, {new: true, runValidators: true})
        .then((note) => {
            if(note){
                res.send(note)
            }else{
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    Note.findOneAndDelete({_id: id, user: req.user._id})
        .then((note) => {
            if(note){
                res.send(note)
            }else{
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
}