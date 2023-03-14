const {connection} = require('./dbConfig')
var {logEvents} = require('./logger')
var {csvmaker} = require('./generatecsv')


const getAdhaarNo = () =>{

    connection.connect(function(err) {
    if (err) {
    console.error('error connecting: ' + err.stack);
    return;
    }
    console.log(`Database connected sucessfully\nconnected as id :  ${connection.threadId}`);
});

    let sql= 'select aadhaarnumber from mis_agentmaster where refkey is null and agent_status="3"';

    connection.query(sql,(error, results, fields) => {
            if (error){
            return console.error(error.message);
            }
            
                // console.log(results);
                csvmaker(results)
            // var miscount = `total rows updated in mis_agentmaster : ${results[0].total_rows_updated}`
            // console.log(miscount)
            // logEvents(miscount,'synclog.log')
        })
        connection.end();
        console.log('Database connection closed');
}

const updateRefKey=(data)=>{

    connection.connect(function(err) {
    if (err) {
    console.error('error connecting: ' + err.stack);
    return;
    }
    console.log(`Database connected sucessfully\nconnected as id :  ${connection.threadId}`);
});
    
    var csvcount = `total rows in csv file : ${data.length}`
    console.log(csvcount);
    logEvents(csvcount,'synclog.log')

    for(obj of data){
        let sql1= `update mis_agentmaster set refkey=${obj['Refkey']} where aadhaarnumber=${obj['aadhaarnumber']}`
        connection.query(sql1,(error, results, fields) => {
            if (error){
            return console.error(error.message);
            }
        });

        let sql = `update age_agentmaster set refkey=${obj['Refkey']} where aadhaarno=${obj['aadhaarnumber']}`
        connection.query(sql,(error, results, fields) => {
            if (error){
            return console.error(error.message);
            }  
        });
    }

    var values = ''
    for(obj of data){
        values += `${obj['aadhaarnumber']},`
    }

    values = values.slice(0, -1);
    let sql1= `select count(*) as total_rows_updated from mis_agentmaster where aadhaarnumber in (${values}) and refkey is not null`;

        connection.query(sql1,(error, results, fields) => {
            if (error){
            return console.error(error.message);
            }
            var miscount = `total rows updated in mis_agentmaster : ${results[0].total_rows_updated}`
            console.log(miscount)
            logEvents(miscount,'synclog.log')
        })

        let sql = `select count(*) as total_rows_updated from age_agentmaster where aadhaarno in (${values}) and refkey is not null`;
    
        connection.query(sql,(error, results, fields) => {
            if (error){
            return console.error(error.message);
            }

            var agecount = `total rows updated in age_agentmaster : ${results[0].total_rows_updated}`
            console.log(agecount)
            logEvents(agecount,'synclog.log')
        })
        connection.end();
        console.log('Database connection closed');
    }
    
    

module.exports={updateRefKey,getAdhaarNo}