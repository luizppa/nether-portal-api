let mongoose = require('mongoose')

let Schema = mongoose.Schema

let log_schema = new Schema({
    action: {type: String, required: true, unique: false},
    time: {type: Date, required: true, unique: false},
    actor: {type: String, required: true}
})

let Log = mongoose.model('logs', log_schema)
module.exports = Log