
const fs = require('fs');
const path = require('path');



let connect = {
    'cc': 'deconnected',
    'static': 'deconnected',
    'dynamic': 'deconnected'
}



module.exports = function (nodecg) {

    require('events').EventEmitter.defaultMaxListeners = 0;

    const Connected = nodecg.Replicant('Connected', { persistent: false });

    const AttributionLane = nodecg.Replicant('AttributionLane');

    const HeatResultsFromCC = nodecg.Replicant('HeatResults')
    const OSDivisionWorkoutFromCC = nodecg.Replicant('OSDivisionWorkout')
    const OSResultFromCC = nodecg.Replicant('OSResult')

    Connected.value = connect

    let cc = require('./js/toolsCC')(nodecg, Connected)
    let sk = require('./js/toolsSK')(nodecg, Connected)
    require('./js/tools')(nodecg)

    const router = nodecg.Router();
    const dataConfig = nodecg.Replicant('dataConfig')

    const pkgPath = path.join(__dirname, "connectionFile.json");



    router.post('/companion', (req, res) => {
        console.log("Bien recu :", req.body)
    });

    router.get('/laneAssignements', (req, res) => {
        res.json(AttributionLane.value);
    })

    router.get('/heatResults', (req, res) => {
        nodecg.sendMessage('actualiser-heatResults');
        res.json(HeatResultsFromCC.value);
    })

    router.get('/overallResultsByWorkout', (req, res) => {
        nodecg.sendMessage('actualiser-overallResultsByWorkout');
        res.json(OSDivisionWorkoutFromCC.value);
    })

    router.get('/overallResults', (req, res) => {
        nodecg.sendMessage('actualiser-overallResults');
        res.json(OSResultFromCC.value);
    })


    nodecg.mount('/functionnalVision', router);

    if (fs.existsSync(pkgPath)) {
        try {
            const data_ = JSON.parse(fs.readFileSync(pkgPath))
            dataConfig.value = data_
        }
        catch (err) {
            console.error(err)
        }
    } else {
        console.log("Creating the file")
        fs.writeFileSync(pkgPath, "{}");
    }

    function writeConfig(value) {
        let data = JSON.stringify(value, undefined, 4);
        fs.writeFileSync(pkgPath, data)
        dataConfig.value = value
    }



    nodecg.listenFor('connection', (value, ack) => {

        nodecg.sendMessage('reconnection')

        let data = { cc: 'connecting', 'static': 'connecting', 'dynamic': 'connecting' }
        Connected.value = data;

        const { user, passwd, event, addIp, ntpAdress } = value

        cc.connectionCC(user, passwd, event)
        sk.connectionSK(addIp)

        writeConfig(value)

    })

    nodecg.listenFor('deconnection', (value, ack) => {
        let data = { cc: 'deconnecting', 'static': 'deconnecting', 'dynamic': 'deconnecting' }
        Connected.value = data;

        sk.deconnectionSK()

        data = { cc: 'deconnected', 'static': 'deconnected', 'dynamic': 'deconnected' }
        Connected.value = data;
    })


    nodecg.log.info(`bundle\'s ${__filename} init!`);

};
