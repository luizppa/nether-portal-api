let mongoose = require('mongoose')

let Schema = mongoose.Schema

let token_schema = new Schema({
    value: {type: String, required: true, unique: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, unique: false}
})

let Token = mongoose.model('tokens', token_schema)
module.exports = Token