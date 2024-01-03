'use strict';


const file = __dirname + '/configDefault.json'

const fs = require('fs');

module.exports = function (nodecg) {
	const lowerThirdConfig = nodecg.Replicant('lowerThirdConfig')

    if (fs.existsSync(file)) {   
        try {
            lowerThirdConfig.value = JSON.parse(fs.readFileSync(file))
          } 
        catch (err) {
            console.error(err)
          }
	}else{
        console.log("Creating the file")
        fs.writeFileSync(file, "{}");
    }


    nodecg.listenFor('configOverwrite', (value, ack) =>{

        let data = JSON.stringify(value);
        fs.writeFile(file, data, 'utf8',function(err) {
            if (err) throw err;
            console.log('complete');
            })
            lowerThirdConfig.value = value
    })


};
