var mysql      = require('mysql');
var {decrypt} = require('./crypto')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : decrypt('614d1996d58e474817892631af360988'),
    database : 'alb_cs_rabbit_integra'
});
    
module.exports={connection};