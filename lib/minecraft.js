// const net = require("net")
const mc = require('minecraft-protocol')

let format_info = (data) => {
    info = {
        online: data.online,
        port: data.port,
        players: null,
        version: null
    }
    if(info.online){
        info.players = {
            max: data.players.max,
            online: data.players.online,
            list: data.players.online > 0 ? data.players.sample.map(player => player.name) : []
        }
        info.version = data.version.name
    }
    return info
}

exports.status = (host, port, success) => {
    mc.ping({host, port}, (err, data) => {
        if(err || data == null){
            return success({
                online: false,
                port: port,
                players: null,
                version: null,
                icon: null
            })
        }
        success(format_info({...data, online: true}))
    })
}