var mysql      = require('mysql');
var {decrypt} = require('./crypto')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : decrypt('pLJ68kn/unrNPP1egg//KQ=='),
    database : 'alb_cs_rabbit_integra'
});
    
module.exports={connection};