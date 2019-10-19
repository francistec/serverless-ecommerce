module.exports = (confirmation) =>{
    return new Promise((resolve, reject) => {
        const AWS = require("aws-sdk");
    
        AWS.config.update({
            region: "us-east-1",
        });
    
        const docClient = new AWS.DynamoDB.DocumentClient();
    
        const table = "drones";
    
        const params = {
            TableName: table,
            Key:{
                "confirmation": confirmation,
            }
        };
    
        docClient.get(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                resolve(data);
            }
        });
    })
}