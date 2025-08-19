
const fs = require('fs');
const path = require('path');

const cors = require('cors');


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


    const connectionPath = path.join(__dirname, "statusFile.json");

    if (fs.existsSync(connectionPath)) {
        try {
            const data_ = JSON.parse(fs.readFileSync(connectionPath))
            Connected.value = data_
            console.log(data_.static)
        }
        catch (err) {
            console.error(err)
        }
    } else {
        console.log("Creating the file")
        fs.writeFileSync(connectionPath, JSON.stringify(connect, undefined, 4));
    }


    let cc = require('./js/toolsCC')(nodecg, Connected)
    let sk = require('./js/toolsSK')(nodecg, Connected)
    require('./js/tools')(nodecg)

    const router = nodecg.Router();
    const dataConfig = nodecg.Replicant('dataConfig')

    const pkgPath = path.join(__dirname, "connectionFile.json");


    router.use(cors({ origin: '*' }));

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

    function writeStatus(value) {
        let data = JSON.stringify(value, undefined, 4);
        fs.writeFileSync(connectionPath, data)
        Connected.value = value
    }

    if (Connected.value.static == 'connected' || Connected.value.static == 'connecting') {
        if (dataConfig.value != {}) {
            nodecg.sendMessage('connection', dataConfig.value)
        }
    }

    nodecg.listenFor('loadCCData', (value, ack) => {
        if (value) {
            cc.connectionCC(value.user, value.passwd, value.event)
        }
    })


    nodecg.listenFor('connection', (value, ack) => {

        nodecg.sendMessage('reconnection')

        let data = { 'cc': 'connecting', 'static': 'connecting', 'dynamic': 'connecting' }
        Connected.value = data;

        const { user, passwd, event, addIp, ntpAdress, floorId } = value

        let connectionIp = addIp + floorId

        if (connectionIp.substring(connectionIp.length - 1) != '/') {
            connectionIp = connectionIp + '/'
        }

        sk.connectionSK(connectionIp)

        writeConfig(value)
        writeStatus(data)

    })

    nodecg.listenFor('deconnection', (value, ack) => {
        let data = { 'cc': 'deconnecting', 'static': 'deconnecting', 'dynamic': 'deconnecting' }
        Connected.value = data;

        sk.deconnectionSK()

        data = { 'cc': 'deconnected', 'static': 'deconnected', 'dynamic': 'deconnected' }
        Connected.value = data;
        writeStatus(data)
    })


    nodecg.log.info(`bundle\'s ${__filename} init!`);

};
