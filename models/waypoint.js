let mongoose = require('mongoose')

let Schema = mongoose.Schema

let waypoint_schema = new Schema({
    name: {type: String, required: true, unique: true, dropDups: true},
    location: {
        x: {type: Number, required: true, unique: false},
        y: {type: Number, required: false, unique: false},
        z: {type: Number, required: true, unique: false}
    },
    world: {type: String, required: true, enum: ['overworld', 'nether', 'end']},
    creator: {type: String, required: true, unique: false}
})

let Waypoint = mongoose.model('waypoints', waypoint_schema)
module.exports = Waypoint