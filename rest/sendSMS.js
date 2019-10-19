let AWS = require('aws-sdk');
const sns = new AWS.SNS();

const confirmation = require('./utils/confirmation');
exports.handler = (event) => { 
    return new Promise( async (resolve, reject) => {
        let data = await confirmation(event.id);
        await sns.publish({
            Message: `Hola ${data.Item.data.name}, te confirmamos tu compra en drone store, , el Folio de seguimiento es: ${data.Item.confirmation}; y recuerda vuela tan alto como tus sueños`,
            MessageAttributes: {
                'AWS.SNS.SMS.SenderID': {
                    DataType: 'String',
                    StringValue: "DroneStore"
                },
            },
            PhoneNumber: data.Item.data.phone
        }).promise().catch(err=>{
            console.log(err);
            reject(err);
        });

        await sns.publish({
            Message: `${data.Item.data.name} realizo una compra de drones, el Folio de seguimiento es: ${data.Item.confirmation}`,
            MessageAttributes: {
                'AWS.SNS.SMS.SenderID': {
                    DataType: 'String',
                    StringValue: "DroneStore"
                },
            },
            PhoneNumber: process.env.PHONE
        }).promise().catch(err=>{
            console.log(err);
            reject(err);
        });

        resolve(data);
    });
 }