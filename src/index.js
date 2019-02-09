'use strict';

var uuid = require('uuid');
var mysql = require('mysql');
var AWS = require('aws-sdk');
var ssm = new AWS.SSM();

const createResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body).trim()
  }
};

exports.getRecipe = (event, context, callback) => {
  console.log("getRecipe");

  var params = {
    Names: ['menuwizard-db-host','menuwizard-db-username','menuwizard-db-password'],
    WithDecryption: true
  };

  console.log(`params: ${params}`);

  ssm.getParameters(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
      callback(null, createResponse(200, data));
    }
  });
};

exports.getAllRecipes = (event, context, callback) => {
  console.log("getAllRecipes");

  var params = {
    Names: ['menuwizard-db-host','menuwizard-db-username','menuwizard-db-password'],
    WithDecryption: true
  };

  console.log(`params: ${params}`);

  var secrets;
  ssm.getParameters(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      createResponse(500, {});
    } else {
      console.log(JSON.stringify(data));
      secrets = Object.assign({}, ...data.Parameters.map(nvp => ({[nvp['Name']]: nvp['Value']})));

      console.log(`secrets: ${JSON.stringify(secrets)}`);

      var connection = mysql.createConnection({
        host     : secrets['menuwizard-db-host'],
        user     : secrets['menuwizard-db-username'],
        password : secrets['menuwizard-db-password'],
        database : 'menuwizard'
      });
       
      connection.connect();
       
      var sol;
      connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) {
          connection.end();
          throw error;
        }
        sol = results[0].solution;
        console.log('The solution is: ', results[0].solution);
        connection.end();
        createResponse(200, sol);
      });
    }
  });
};

exports.addRecipe = (event, context, callback) => {
  console.log("addRecipe");

};

exports.updateRecipe = (event, context, callback) => {
  console.log("updateRecipe");

};

exports.deleteRecipe = (event, context, callback) => {
  console.log("deleteRecipe");
};