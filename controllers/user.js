const User = require('../models/user')

exports.login = (req, res) => {
    let params = {
        username: req.body.username,
        key: req.body.key
    }
    User.findOne(params, (error, user) => {
        if(error || user == null){
            return res.status(403).send('No, thanks')
        }
        else{
            User.generate_token(user,
                (token) => {
                    return res.status(201).send(token)
                },
                (error) => {
                    return res.status(406).send(error)
                }
            )
        }
    })
}