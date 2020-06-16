let mongoose = require('mongoose')
let Token = require('./token')

let Schema = mongoose.Schema

let user_schema = new Schema({
    name: {type: String, required: true, unique: false},
    username: {type: String, required: true, unique: true},
    key: {type: String, required: [true, 'Key required'], minlength: 8}
})

user_schema.statics.random_token = () => {
    let pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678901234567890123456789"
    let token_value = ''
    for (let i = 0; i < 64; i++) token_value += pool.charAt(Math.floor(Math.random() * pool.length))
    return token_value
}

user_schema.statics.generate_token = async (user, callback, error) => {
    let dup = true
    let token_value = User.random_token()
    while(dup){
        try {
            dup_token = await Token.find({value: token_value})
        }
        catch(err){
            return error(err)
        }
        if(dup_token.length == 0) dup = false
        else token_value = User.random_token()
    }
    let token_data = {
        value: token_value,
        user: user._id
    }
    Token.create(token_data, (err, token) => {
        if(err || token == null){
            return error(err)
        }
        else{
            return callback(token)
        }
    })
}

let User = mongoose.model('users', user_schema)
module.exports = User