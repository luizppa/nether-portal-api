let mongoose = require('mongoose')

let Schema = mongoose.Schema

let user_schema = new Schema({
    name: {type: String, required: true, unique: false, dropDups: false},
    user_name: {type: String, required: true, unique: true, dropDups: true},
    key: {type: String, required: [true, 'Key required'], minlength: 8}
})

let User = mongoose.model('users', user_schema)
module.exports = User