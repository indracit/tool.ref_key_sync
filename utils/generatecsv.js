const fs = require('fs');
const fsPromises = require('fs').promises;

    const writeCsv =  async (data) => {
    try {
        await fsPromises.writeFile('./aadhaarno.csv', data)
        console.log('file generated sucessfully...');
    } catch (err) {
        console.error(err);
    }
    }

const csvmaker = async function (data) {
                            let csvRows = [];
                            csvRows.push('aadhaarnumber');
                            for(let row of data){
                            csvRows.push(row.aadhaarnumber);
                            }
                            let final = csvRows.join('\n')
                            await writeCsv(final)
                        }

module.exports={csvmaker}