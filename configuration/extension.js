'use strict';

const colorFile = __dirname + '/colorDefaut.json'

const fs = require('fs');

module.exports = function (nodecg) {

    const Colors = nodecg.Replicant('Colors')

    if (fs.existsSync(colorFile)) {
        try {
            Colors.value = JSON.parse(fs.readFileSync(colorFile))
        }
        catch (err) {
            console.error(err)
        }
    } else {
        console.log("Creating the file")
        var val = JSON.stringify(Colors.value)
        if (val == undefined) {
            val = {}
        }
        fs.writeFileSync(colorFile, val.toString());
    }

    nodecg.listenFor('colorOverwrite', (value, ack) => {

        let data = JSON.stringify(value);
        fs.writeFile(colorFile, data, 'utf8', function (err) {
            if (err) throw err;
            console.log('complete');
        })
        Colors.value = value
    })

};
