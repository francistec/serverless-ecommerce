'use strict';
const utils = require('./utils');
const currency = require('currency-formatter');

module.exports.handler = async event => {
  const products = [];
  
  const names = [
    'dji mavic',
    'skadio',
    'dji mavic air',
    'dji phanton 1',
    'dji phanton 2',
    'dji phanton 3',
    'dji phanton 4',
    'dji mavic pro',
    'dji mavic pro 2',
    'dji mavic pro zoom',
    'Tello',
    'Pilas',
    'Helices',
    'dji mavic air Fly More Combo',
    'dji phanton 1 Fly More Combo',
    'dji phanton 2 Fly More Combo',
    'dji phanton 3 Fly More Combo',
    'dji phanton 4 Fly More Combo',
    'dji mavic pro Fly More Combo',
    'dji mavic pro 2 Fly More Combo',
    'dji mavic pro zoom Fly More Combo',
    'Tello Fly More Combo'
  ]; 

  const limit = (event.queryStringParameters && event.queryStringParameters.limit) ? event.queryStringParameters.limit : 20;
  for(let t=0; t<limit; t++){
    let id = utils.padLeft((t+1)+'', 5, '0'); 
    let price = randomInt(10000,40000);
    products.push({
      Id: id,
      Name: names[Math.floor(Math.random()*names.length)],
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