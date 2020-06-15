const Log = require('../models/log')

exports.list = (_req, res) => {
    Log.find({}).sort({date: 'desc'}).exec((error, logs) => {
        if(error || logs == null){
            return res.status(406).send(error)
        }
        else{
            return res.status(200).send(logs)
        }
    })
}