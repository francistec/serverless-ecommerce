const AWS = require('aws-sdk');
const s3 = new AWS.S3();



exports.handler = (event) => {  
    return new Promise( async (resolve, reject)=>{
        const bucketName = `drone-store.francistec.io`;
        const keyName = `states/mexico.json`;


        let content = await readFile(bucketName, keyName);
        console.log(content);

        resolve({
            statusCode:200,
            body: JSON.stringify({})
        })

    });
};

 
function readFile (bucketName, filename) {
   return new Promise((resolve, reject)=>{
        const params = { Bucket: bucketName, Key: filename };
        s3.getObject(params, function (err, data) {
            console.log(data);
            if (!err) 
                resolve({
                    filename, 
                    data: data.Body.toString()
                });
            else
                reject(err);
        });
   })
}

function readFileContent(filename, content) {
    console.log(content);
    //do something with the content of the file
}

function onError (err) {
    console.log('error: ' + err);
}      