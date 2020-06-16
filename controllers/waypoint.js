const Waypoint = require('../models/waypoint')

exports.create = (req, res) => {

    let waypoint = {
        ...req.body.waypoint,
        creator: req.user.name
    }
    console.log(waypoint)

    Waypoint.create(waypoint).then(
        (waypoint) => {
            return res.status(201).send(waypoint)
        }
    ).catch(
        (error) => {
            return res.status(406).send(error)
        }
    )
}

exports.get = (req, res) => {
    Waypoint.findById(req.params.id, (error, waypoint) => {
        if(error || waypoint == null){
            return res.status(406).send(error)
        }
        else{
            return res.status(200).send(waypoint)
        }
    })
}

exports.list = (_req, res) => {
    Waypoint.find({}, (error, waypoints) => {
        if(error){
            return res.status(406).send(error)
        }
        else{
            return res.status(200).send(waypoints)
        }
    })
}

exports.update = (req, res) => {
    delete req.body.waypoint.creator
    delete req.body.waypoint._id
    Waypoint.findOneAndUpdate({_id: req.params.id}, {...req.body.waypoint}, (error, waypoint) => {
        if(error){
            return res.status(406).send(error)
        }
        else{
            return res.status(200).send(waypoint)
        }
    })
}

exports.delete = (req, res) => {
    Waypoint.findByIdAndDelete(req.params.id, (error, result) => {
        if(error || result == null){
            return res.status(406).send(error)
        }
        else{
            return res.sendStatus(204)
        }
    })
}