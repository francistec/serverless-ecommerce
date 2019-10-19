const AWS = require('aws-sdk');
const s3 = new AWS.S3();



exports.handler = (event) => {  
    return new Promise( async (resolve, reject)=>{
        const bucketName = `drone-store.francistec.io`;
        const keyName = `states/${event.pathParameters.country}.json`;

        
        let hasError = false; 
        let content = await readFile(bucketName, keyName).catch(err=>{
            hasError = true;
        });

        resolve({
            statusCode: (hasError) ? 501 : 200,
            body: (hasError) ? JSON.stringify({error:'Invalid country'}) : content.data
        })

    });
};

 
function readFile (bucketName, filename) {
   return new Promise((resolve, reject)=>{
        const params = { Bucket: bucketName, Key: filename };
        s3.getObject(params, function (err, data) {
            if (!err) 
                resolve({
                    filename, 
                    data: data.Body.toString()
                });
            else
                reject(err);
        });
   });
}

