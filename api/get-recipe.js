var AWS = require('aws-sdk');    

exports.handler = function(event, context, callback) {
  console.log("Getting a Recipe!");
  console.log(`${event}`);
  var bucketName = process.env.S3_BUCKET;       
  callback(null, bucketName);     
}
