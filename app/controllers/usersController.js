const User = require('../models/user')

module.exports.register = (req,res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.login = (req, res) => {
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then((user) => {
            return user.generateToken()
        })
        .then((token) => {
            res.send({token})
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.account = (req, res) => {
    const {user} = req
    res.send(user)
}

module.exports.logout = (req, res) => {
    const {user, token} = req
    User.findByIdAndUpdate(user._id, { $pull: {tokens: {token: token}}})
        .then(function(){
            res.send({notic: "successfully logged out"})
        })
        .catch(function(err){
            res.send(err)
        })
}