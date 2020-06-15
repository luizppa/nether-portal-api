const User = require('../models/user')

exports.check_identity = (req, res, next) => {
    let key = req.header('Authorization')
    User.findOne({key}, (error, user) => {
        if(error || user == null){
            return res.status(403).send('No, thanks')
        }
        else{
            req['user'] = user
            next()
        }
    })
}