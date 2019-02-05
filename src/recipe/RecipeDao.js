var mysql = require('mysql');

var AWS = require('aws-sdk');
var ssm = new AWS.SSM();

var connection = mysql.createConnection({
    host     : 'example.org', // get host from ssm
    user     : 'bob', // get user from ssm
    password : 'secret' // get pass from ssm
});
   
connection.connect((err) => {
    if (err) {
        console.error(`Error connecting: ${err.stack}`);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);
});


