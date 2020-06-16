const User = require('../models/user')

exports.login = (req, res) => {
    let params = {
        username: req.body.user.username,
        key: req.body.user.key
    }
    User.findOne(params, (error, user) => {
        if(error || user == null){
            return res.status(406).send('No, thanks')
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