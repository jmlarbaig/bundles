'use strict';


const file_config = __dirname + '/lowerThirdConfig.json'
const file_free = __dirname + '/LowerThirdFree.json'
const file_pres = __dirname + '/LowerThirdPres.json'
const file_waiting = __dirname + '/LowerThirdWaiting.json'
const file_wod = __dirname + '/lowerThirdWodConfig.json'

const fs = require('fs');

module.exports = function (nodecg) {

    const router = nodecg.Router();
    const lowerThirdConfig = nodecg.Replicant('lowerThirdConfig')
    const LowerThirdPres = nodecg.Replicant('LowerThirdPres')
    const LowerThirdWaiting = nodecg.Replicant('LowerThirdWaiting')
    const LowerThirdFree = nodecg.Replicant('LowerThirdFree')
    const lowerThirdData = nodecg.Replicant('lowerThirdData');
    const lowerThirdWodConfig = nodecg.Replicant('lowerThirdWodConfig', { defaultValue: [] });
    const cmdFromStreamDeck = nodecg.Replicant('cmdFromStreamDeck')

    if (fs.existsSync(file_config)) {
        try {
            lowerThirdConfig.value = JSON.parse(fs.readFileSync(file_config))
        }
        catch (err) {
            console.error(err)
        }
    } else {
        console.log("Creating the file_config")
        fs.writeFileSync(file_config, "{}");
    }

    lowerThirdConfig.on('change', (value, ack) => {

        let data = JSON.stringify(value);
        fs.writeFile(file_config, data, 'utf8', function (err) {
            if (err) throw err;
            console.log('complete');
        })
    })

    if (fs.existsSync(file_wod)) {
        try {
            lowerThirdWodConfig.value = JSON.parse(fs.readFileSync(file_wod))
        }
        catch (err) {
            console.error(err)
        }
    } else {
        console.log("Creating the file_config")
        fs.writeFileSync(file_wod, "{}");
    }

    lowerThirdWodConfig.on('change', (value, ack) => {

        let data = JSON.stringify(value);
        fs.writeFile(file_wod, data, 'utf8', function (err) {
            if (err) throw err;
            console.log('complete');
        })
    })

    if (fs.existsSync(file_free)) {
        try {
            LowerThirdFree.value = JSON.parse(fs.readFileSync(file_free))
        }
        catch (err) {
            console.error(err)
        }
    } else {
        console.log("Creating the file_free")
        fs.writeFileSync(file_free, "{}");
    }

    LowerThirdFree.on('change', (value, ack) => {

        let data = JSON.stringify(value);
        fs.writeFile(file_free, data, 'utf8', function (err) {
            if (err) throw err;
            console.log('complete');
        })
    })

    if (fs.existsSync(file_pres)) {
        try {
            LowerThirdPres.value = JSON.parse(fs.readFileSync(file_pres))
        }
        catch (err) {
            console.error(err)
        }
    } else {
        console.log("Creating the file_pres")
        fs.writeFileSync(file_pres, "{}");
    }

    LowerThirdPres.on('change', (value, ack) => {

        let data = JSON.stringify(value);
        fs.writeFile(file_pres, data, 'utf8', function (err) {
            if (err) throw err;
            console.log('complete');
        })
    })


    if (fs.existsSync(file_waiting)) {
        try {
            LowerThirdWaiting.value = JSON.parse(fs.readFileSync(file_waiting))
        }
        catch (err) {
            console.error(err)
        }
    } else {
        console.log("Creating the file_waiting")
        fs.writeFileSync(file_waiting, "{}");
    }

    LowerThirdWaiting.on('change', (value, ack) => {

        let data = JSON.stringify(value);
        fs.writeFile(file_waiting, data, 'utf8', function (err) {
            if (err) throw err;
            console.log('complete');
        })
    })

    nodecg.mount('/lowerthird', router);
    router.post('/lowerthirdathlete', (req, res) => {
        console.log(req.body)
        cmdFromStreamDeck.value = req.body;
    });



};
