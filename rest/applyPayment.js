const AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1"
});
Lambda = new AWS.Lambda({
    region: 'us-east-1' //change to your region
});

 // @TODO antes de marcar la transaccion como completada en necesario 
 // validar la transaccion en paypal y realizar una recotización de nuestro lado
 // para asegurar que se realizo completo el pago
module.exports.handler = async event => {
        return new Promise((resolve, reject)=>{
            console.log(event.body);
            const body = JSON.parse(event.body);

            var docClient = new AWS.DynamoDB.DocumentClient();
            var table = "drones";

            // @TODO sanitizar los datos
            var params = {
                TableName: table,
                Item:{
                    "confirmation": body.confirmation,
                    "data": body.value
                }
            };
            docClient.put(params, function(err, data) {
                console.log(err, data);
                Lambda.invoke({
                    FunctionName: 'DroneStore-dev-sendSMS',
                    Payload: JSON.stringify({
                        id: body.confirmation
                    }, null, 2) 
                }).promise();
                resolve({
                    statusCode: 200,
                    headers: {
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Methods": "OPTIONS,GET"
                    },
                    body: JSON.stringify(params),
                  });
            });
        });
}