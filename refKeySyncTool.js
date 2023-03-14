
const fs = require('fs')
const csv = require('fast-csv');
var {updateRefKey,getAdhaarNo}= require('./utils/updatekey')
const process = require('process');

    

    if(process.argv[2]=='getAadhaarNo'){

        return getAdhaarNo()
    }

    var data = []
    
    fs.createReadStream(`./${process.argv[2]}.csv`)
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => data.push(row))
        .on('end', () => updateRefKey(data))

