const User = require('../models/user')
const Token = require('../models/token')

exports.check_identity = (req, res, next) => {
    let token_value = req.header('Authorization')
    Token.findOne({value: token_value}, (error, token) => {
        if(error || token == null){
            return res.status(403).send('No, thanks')
        }
        else{
            User.findById(token.user, (error, user) => {
                if(error || user == null){
                    return res.status(403).send('No, thanks')
                }
                else{
                    req['user'] = user
                    next()
                }
            })
        }
    })
}