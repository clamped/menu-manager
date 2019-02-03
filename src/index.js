'use strict';

var AWS = require('aws-sdk');
var uuid = require('uuid');
const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

const createResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body).trim()
  }
};

exports.getRecipe = (event, context, callback) => {
  let params = {
    TableName: tableName,
    Key: {
      id: event.pathParameters.recipeId
    }
  };

  let dbGet = (params) => { return dynamo.get(params).promise() };

  dbGet(params).then((data) => {
    if (!data.Item) {
      callback(null, createResponse(404, "ITEM NOT FOUND"));
      return;
    }
    console.log(`RETRIEVED ITEM SUCCESSFULLY WITH doc = ${JSON.stringify(data.Item.doc)}`);
    callback(null, createResponse(200, data.Item.doc));
  }).catch((err) => {
    console.log(`GET ITEM FAILED FOR doc = ${params.Key.id}, WITH ERROR: ${err}`);
    callback(null, createResponse(500, err));
  });
};

exports.getAllRecipes = (event, context, callback) => {
  let params = {
    TableName: tableName
  };

  let dbScan = (params) => { return dynamo.scan(params).promise() };

  dbScan(params).then((data) => {
    console.log(`RETRIEVED ${data.Count} ITEMS SUCCESSFULLY: ${JSON.stringify(data.Items)}`);
    
    callback(null, createResponse(200, data.Items));
  }).catch((err) => {
    console.log(`GET ITEMS FAILED WITH ERROR: ${err}`);
    callback(null, createResponse(500, err));
  });
};

exports.addRecipe = (event, context, callback) => {
  let item = {
    id: uuid.v1(),
    doc: event.body
  };

  let params = {
    TableName: tableName,
    Item: item
  };

  let dbPut = (params) => { return dynamo.put(params).promise() };

  dbPut(params).then((data) => {
    console.log(`PUT ITEM SUCCEEDED WITH doc = ${item.doc}`);
    callback(null, createResponse(201, null));
  }).catch((err) => {
    console.log(`PUT ITEM FAILED FOR doc = ${item.doc}, WITH ERROR: ${err}`);
    callback(null, createResponse(500, err));
  });
};

exports.updateRecipe = (event, context, callback) => {
  let item = {
    id: event.pathParameters.recipeId,
    doc: event.body
  };

  let params = {
    TableName: tableName,
    Item: item
  };

  let dbUpdate = (params) => { return dynamo.update(params).promise() };

  dbUpdate(params).then((data) => {
    console.log(`UPDATE ITEM SUCCEEDED WITH doc = ${item.doc}`);
    callback(null, createResponse(200, null));
  }).catch((err) => {
    console.log(`UPDATE ITEM FAILED FOR doc = ${item.doc}, WITH ERROR: ${err}`);
    callback(null, createResponse(500, err));
  });
};

exports.deleteRecipe = (event, context, callback) => {
  let params = {
    TableName: tableName,
    Key: {
      id: event.pathParameters.recipeId
    },
    ReturnValues: 'ALL_OLD'
  };

  let dbDelete = (params) => { return dynamo.delete(params).promise() };

  dbDelete(params).then((data) => {
    if (!data.Attributes) {
      callback(null, createResponse(404, "ITEM NOT FOUND FOR DELETION"));
      return;
    }
    console.log(`DELETED ITEM SUCCESSFULLY WITH id = ${event.pathParameters.recipeId}`);
    callback(null, createResponse(200, null));
  }).catch((err) => {
    console.log(`DELETE ITEM FAILED FOR id = ${event.pathParameters.recipeId}, WITH ERROR: ${err}`);
    callback(null, createResponse(500, err));
  });
};
