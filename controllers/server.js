const AWS = require('aws-sdk')
const AWS_CONFIG = require('../lib/aws_config')

exports.open = (_req, res) => {
    AWS.config.update({credentials: AWS_CONFIG.credentials(), region: process.env.AWS_EC2_REGION})
    const EC2 = new AWS.EC2({apiVersion: '2016-11-15'})

    var params = {
        InstanceIds: [process.env.EC2_INSTANCE_ID]
    }
    EC2.startInstances(params, (err, data) => {
        if (err){
            console.log(err, err.stack)
            res.status(406).send(err)
        }
        else {
            console.log(data);
            res.status(200).send(data.StartingInstances[0])
        }
    })
}

exports.close = (_req, res) => {
    AWS.config.update({credentials: AWS_CONFIG.credentials(), region: process.env.AWS_EC2_REGION})
    const EC2 = new AWS.EC2({apiVersion: '2016-11-15'})
    
    var params = {
        InstanceIds: [process.env.EC2_INSTANCE_ID]
    }
    EC2.stopInstances(params, (err, data) => {
        if (err){
            console.log(err, err.stack)
            res.status(406).send(err)
        }
        else {
            console.log(data);
            res.status(200).send(data.StoppingInstances[0])
        }
    })
}

exports.status = (req, res) => {
    AWS.config.update({credentials: AWS_CONFIG.credentials(), region: process.env.AWS_EC2_REGION})
    const EC2 = new AWS.EC2({apiVersion: '2016-11-15'})

    var params = {
        InstanceIds: [process.env.EC2_INSTANCE_ID]
    }
    EC2.describeInstances(params, (err, data) => {
        if (err){
            console.log(err, err.stack)
            res.status(406).send(err)
        }
        else{
            const instance = data.Reservations[0].Instances[0]
            let instance_data = {
                endpoint: instance.PrivateDnsName,
                ip: instance.PublicIpAddress,
                status: instance.State.Name,
                launch_time: instance.LaunchTime
            }
            console.log(instance_data);
            res.status(200).send(instance_data)
        }
    })
}