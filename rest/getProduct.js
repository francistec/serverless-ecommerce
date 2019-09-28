'use strict';
const utils = require('./utils');
const currency = require('currency-formatter');
module.exports.handler = async event => {
  const products = [];
  for(let t=0; t<20; t++){
    let id = utils.padLeft((t+1)+'', 5, '0'); 
    let price = randomInt(10000,40000);
    products.push({
      Id: id,
      Name: "Celular",
      Price: {
        formated: currency.format(price,{code: 'MXN'}),
        clean: price
      },
      SKU: `dron-${id}`,
      Img: `http://drone-store.francistec.io.s3-website-us-east-1.amazonaws.com/uploads/dron_${id}.webp`
    });
  }


  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET"
    },
    body: JSON.stringify(products),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}