const AWS = require('aws-sdk')
const AWS_CONFIG = require('../lib/aws_config')
const Log = require('../models/log')

exports.open = (req, res) => {
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
            let instance = data.StartingInstances[0]
            if(instance.PreviousState.Name == 'stopped'){
                Log.create({
                    action: 'Start',
                    time: new Date(),
                    actor: req.user.name
                })
            }
            res.status(200).send(instance)
        }
    })
}

exports.reboot = (req, res) => {
    AWS.config.update({credentials: AWS_CONFIG.credentials(), region: process.env.AWS_EC2_REGION})
    const EC2 = new AWS.EC2({apiVersion: '2016-11-15'})

    var params = {
        InstanceIds: [process.env.EC2_INSTANCE_ID]
    }
    EC2.rebootInstances(params, (err, data) => {
        if (err){
            console.log(err, err.stack)
            res.status(406).send(err)
        }
        else {
            let instance = data.RebootingInstances[0]
            if(instance.PreviousState.Name == 'stopped' || instance.PreviousState.Name == 'running'){
                Log.create({
                    action: 'Reboot',
                    time: new Date(),
                    actor: req.user.name
                })
            }
            res.status(200).send(instance)
        }
    })
}

exports.close = (req, res) => {
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
            let instance = data.StoppingInstances[0]
            if(instance.PreviousState.Name == 'running'){
                Log.create({
                    action: 'Stop',
                    time: new Date(),
                    actor: req.user.name
                })
            }
            res.status(200).send(instance)
        }
    })
}

exports.status = (_req, res) => {
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