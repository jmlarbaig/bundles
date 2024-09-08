'use strict';

const fs = require('fs');
const url = require('url')

const setupFile = __dirname + '/setupFile.json'

let modelScoring = {
    nameA1: "",
    nameA2: "",
    nameB1: "",
    nameB2: "",
    setA1: 0,
    setA2: 0,
    setA3: 0,
    pointA: 0,
    setB1: 0,
    setB2: 0,
    setB3: 0,
    pointB: 0,
}


module.exports = function (nodecg) {


    const padelPlayers = nodecg.Replicant('padelPlayers')

    padelPlayers.on('change', (newValue, oldValue) => {
        if (newValue != oldValue) {
            modelScoring = newValue;
        }
    })

    const router = nodecg.Router();

    router.post('/chrono', (req, res) => {
        console.log(req.params)
    });


    router.post('/:type/:direction', (req, res) => {
        console.log(req.params)
        let type = req.params.type;
        let direction = req.params.direction;
        if (type != '' && direction != '') {
            lead(type, direction);
        }
    });

    nodecg.mount('/padel', router);


    function lead(state, direction) {
        if (direction == 'minus') {
            const keyTarget = state;
            let value = modelScoring[keyTarget]

            if (keyTarget.includes('point')) {
                switch (value) {
                    case 0:
                        value = 0;
                        break;
                    case 15:
                        value = 0;
                        break;
                    case 30:
                        value = 15;
                        break;
                    case 40:
                        value = 30;
                        break;
                    case 'A':
                        value = 40;
                        break;
                    default:
                        value = 0;
                        break;
                }
            } else {
                value = value - 1;
                if (value < 0) {
                    value = 0
                }
            }

            modelScoring[keyTarget] = value;
        } else if (direction == 'plus') {
            const keyTarget = state;
            let value = modelScoring[keyTarget]

            if (keyTarget.includes('point')) {
                switch (value) {
                    case 0:
                        value = 15;
                        break;
                    case 15:
                        value = 30;
                        break;
                    case 30:
                        value = 40;
                        break;
                    case 40:
                        if (keyTarget == 'pointA') {
                            if (modelScoring.pointB == 40) {
                                value = 'A'
                            } else {
                                value = 0;
                                modelScoring.pointA = 0;
                                modelScoring.pointB = 0;
                            }
                        }
                        if (keyTarget == 'pointB') {
                            if (modelScoring.pointA == 40) {
                                value = 'A'
                            } else {
                                value = 0;
                                modelScoring.pointA = 0;
                                modelScoring.pointB = 0;
                            }
                        }

                        break;
                    case 'A':
                        value = 0;
                        modelScoring.pointA = 0;
                        modelScoring.pointB = 0;
                        break;
                    default:
                        value = 0;
                        break;
                }
            } else {
                value = value + 1;
                if (value < 0) {
                    value = 0
                }
            }

            modelScoring[keyTarget] = value;
        }
        padelPlayers.value = modelScoring;
    }


    const setupLeaderboard = nodecg.Replicant('setupLeaderboard')

    if (fs.existsSync(setupFile)) {
        try {
            setupLeaderboard.value = JSON.parse(fs.readFileSync(setupFile))
        }
        catch (err) {
            console.error(err)
        }
    } else {
        console.log("Creating the file")
        fs.writeFileSync(setupFile, "{}");
    }

    nodecg.listenFor('setupFile', (value, ack) => {
        let data = JSON.stringify(value);
        fs.writeFile(setupFile, data, 'utf8', function (err) {
            if (err) throw err;
            console.log('complete');
        })
        setupLeaderboard.value = value
    })

};
