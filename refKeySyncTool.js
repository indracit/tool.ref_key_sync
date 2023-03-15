const fs = require('fs')
var {updateRefKey,getAdhaarNo}= require('./utils/updatekey')
const process = require('process');
const { parse } = require('csv-parse');
    

    if(process.argv[2]=='getAadhaarNo'){
        return getAdhaarNo()
    }


    const data = [];

    fs.createReadStream(`./${process.argv[2]}.csv`)
        .pipe(
        parse({
            delimiter: "|",
            columns: true,
            ltrim: true,
        })
        )
        .on("data", function (row) {
        data.push(row);
        })
        .on("error", function (error) {
        console.log(error.message);
        })
        .on("end", function () {
        updateRefKey(data)
        });



