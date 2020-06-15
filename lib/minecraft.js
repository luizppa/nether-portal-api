const https = require('https')

let format_info = (data) => {
    info = {
        online: data.online,
        port: data.port,
        players: null,
        version: null,
        icon: null
    }
    if(info.online){
        info.players = data.players
        info.version = data.version
        info.icon = data.icon
    }
    return info
}

exports.status = (address, success, error) => {
    https.get(`${process.env.MINECRAFT_STATUS_ENDPOINT}${address}`, (res) => {
        let data = ''

        res.on('data', (chunk) => {
            data += chunk;
        })

        res.on('end', () => {
            success(format_info(JSON.parse(data)));
        })

    }).on("error", (err) => {
        error(err)
    })
}