// const net = require("net")
const mc = require('minecraft-protocol')

const format_info = (data) => {
    info = {
        online: data.online,
        port: data.port,
        players: {
            max: data.players.max,
            online: data.players.online,
            list: data.players.online > 0 ? data.players.sample.map(player => player.name) : []
        },
        version: data.version.name
    }
    return info
}

exports.offline_data = {
    online: false,
    port: process.env.MINECRAFT_PORT,
    players: null,
    version: null
}

exports.status = (host, port, success) => {
    let response_sent = false
    setTimeout(
        () => {
            if(!response_sent){
                response_sent = true
                success(this.offline_data)
            }
        }, 5000
    )
    mc.ping({host, port}, (err, data) => {
        if(!response_sent){
            response_sent = true
            if(err || data == null){
                return success(this.offline_data)
            }
            success(format_info({...data, online: true}))
        }
    })
}