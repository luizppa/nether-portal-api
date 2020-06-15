const AWS = require('aws-sdk')

exports.credentials = () => {
    const credentials = new AWS.Credentials({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
    return credentials
}
