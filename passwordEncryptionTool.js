const { encrypt} = require('./utils/crypto')
const process = require('process');
const text = process.argv[2]

console.log(encrypt(text))
