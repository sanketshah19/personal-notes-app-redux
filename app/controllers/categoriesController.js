const Category = require('../models/category')

module.exports.list = (req,res) => {
        Category.find({user: req.user._id}) // like array filter
            .then((categories) => {
                res.send(categories)
            })
            .catch((err) => {
                res.send(err)
            })
}

module.exports.create = (req, res) => {
        const body = req.body
        const category = new Category(body)
        category.user = req.user._id
        category.save() // to save database - asynchronous operation
            .then((category) => {
                res.send(category)
            })
            .catch((err) => {
                res.send(err)
            })    
}


module.exports.show = (req,res) => {
        const id = req.params.id
        Category.findOne({_id: id, user: req.user._id})
                .then((category) => {
                    if(category){
                        res.send(category)
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
        Category.findOneAndDelete({_id: id, user: req.user._id})
                .then((category) => {
                    if(category){
                        res.send(category)
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
        Category.findOneAndUpdate({_id: id, user: req.user._id}, body, {new: true, runValidators: true})
                .then((category) => {
                    if(category){
                        res.send(category)
                    }else{
                        res.send({})
                    }
                })
                .catch((err) => {
                    res.send(err)
                })
}