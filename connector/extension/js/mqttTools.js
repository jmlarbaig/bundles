
const mqtt = require('mqtt')

var data = {}
var dataTab = []

module.exports = (nodecg) => {

    const dataRow = nodecg.Replicant('dataRow')
    const dataMinos = nodecg.Replicant('dataMinos')
    const dataMinosLane = nodecg.Replicant('dataMinosLane')
    const Mqtt_connected = nodecg.Replicant('Mqtt_connected', { defaultValue: { connected: false, error: '' }, persistent: false })
    let client = null;

    const divisionMQTT = nodecg.Replicant('divisionMQTT')
    const workoutsMQTT = nodecg.Replicant('workoutsMQTT')
    const heatMQTT = nodecg.Replicant('heatMQTT')


    let _eventId = 0
    let _workouts = []
    let _division = []
    let _currentHeat = {}
    let chrono = '';
    let countdown = 10000;

    let receivedHeats;
    let lastWorkouts;
    let lastDiv;
    let launchTimer = null;
    let online = false;

    function connectionMQTT(ip_broker, _location) {
        online = _location;
        if (client == null) {
            client = mqtt.connect('mqtt://' + ip_broker + ':1883');
            streamMQTT()
        } else {
            disconnectMQTT()
        }
    }

    function disconnectMQTT() {
        if (client != null) {
            client.end(true)
            client = null
        }
    }

    function streamMQTT() {
        client.on('connect', function () {
            console.log('Connected MQTT')
            Mqtt_connected.value = { connected: true, error: '' };
            if (online) {

            } else {
                client.subscribe('kairos/+/ERG/#');
                client.subscribe('kairos/Minos');
                client.subscribe('kairos/+/SCORE');
                // client.subscribe('kairos/+/eventDescription');
                client.subscribe('kairos/request');
                client.subscribe('kairos/timer');
                // client.subscribe(`kairos/+/heat_start_time`);
                // client.subscribe(`kairos/+/nextHeat`);
                client.subscribe(`kairos/eventId`);
                client.subscribe(`kairos/+/currentHeat`);
                // client.subscribe(`kairos/+/heat_status`);
                // client.subscribe(`kairos/+/currentDiv`);
                client.subscribe(`kairos/+/workouts`);
                getEvent()
                getListWorkouts();
                getCurrentHeat();
            }
        })

        client.on('disconnect', () => {
            console.log('disconnected', new Date())
            Mqtt_connected.value = { connected: false, error: '' };
            // client.reconnect()
        });
        client.on('close', () => {
            console.log('close', new Date())
            Mqtt_connected.value = { connected: false, error: '' };
        });
        client.on('error', err => {
            console.error('error', err)
            Mqtt_connected.value = { connected: false, error: err };
            // client.reconnect()
        });

        client.on('message', function (topic, message) {
            console.log('Heure de la requete :', msToTime(Date.now()))
            message = message.toString()
            console.log(topic)


            if (topic.includes('eventId')) {
                if (message != "" && _eventId != parseInt(message)) {
                    _eventId = parseInt(message);
                    getHeatStatus();
                }

            } else if (topic.includes('workouts')) {
                if (lastWorkouts != message) {
                    let wods = JSON.parse(message.toString());
                    _workouts = []
                    _division = []
                    _currentHeat = {}
                    for (let wod of wods) {
                        _workouts.push(wod)
                    }
                    workoutsMQTT.value = _workouts
                }
            } else if (topic.includes('currentHeat')) {
                if (message != '{}') {
                    if (message != receivedHeats) {
                        receivedHeats = message.toString();
                    }
                    _currentHeat = JSON.parse(receivedHeats)
                    heatMQTT.value = _currentHeat
                }
            } else if (topic.includes('request')) {
                if (message == 'heatChrono') {
                    if (launchTimer != null) {
                        clearTimeout(launchTimer)
                        launchTimer = null;
                    }
                    launchTimer = setTimeout(() => {
                        let epoch = Date.now()
                        //TODO Changemnt du NaN NaN 
                        if (chrono) {
                            let chronoForPublish = `00:${msToTime(epoch - chrono - countdown + 1000)}.0`;
                            client.publish(`kairos/${_eventId}/chronoHeat`, `${chronoForPublish};${epoch}`)
                        }
                    }, 2000)
                }
            } else if (topic.includes('timer')) {
                if (message != '') {
                    if (message != '0') {
                        chrono = message.split(';')[2]
                        countdown = parseInt(message.split(';')[1])
                    } else {
                        chrono = 0;
                    }
                }
            } else if (topic.includes('chronoHeat')) {
                clearTimeout(launchTimer)
                launchTimer = null;
            }

            if (topic.includes("ERG")) {
                let ch = topic.split('/');
                let lane = parseInt(ch[1].replace("minos", "")) - 1
                let mes = message.toString().split(';');

                data = {}
                data.lane = lane;
                data.displayUnit = mes[0];
                data.displayType = mes[1];
                data.workoutState = mes[2];
                data.erg = ch[3];
                data.spm = mes[4];
                data.distance = mes[5];
                data.calories = mes[6];
                data.power = mes[7];
                data.calH = mes[8];
                data.stroke = mes[9];
                data.byteState = mes[10];

                dataTab[lane] = data;
                dataRow.value = dataTab;

            }
            else if (topic.includes('Minos')) {
                let mes = message.toString().split(';');

                let minos = Object.assign({}, floorMinos)
                minos.ip = parseInt(mes[0])
                minos.lane = parseInt(mes[1])
                minos.type = parseInt(mes[2])
                minos.battery = parseInt(mes[3])
                minos.signal = (mes[4])

                tableOfMinosOnFloor[minos.ip] = minos;

                if (tableOfMinosLaneOnFloor[minos.lane] != undefined) {
                    tableOfMinosOnFloor[minos.ip].status = tableOfMinosLaneOnFloor[minos.lane].status;
                    tableOfMinosOnFloor[minos.ip].rep = tableOfMinosLaneOnFloor[minos.lane].rep;
                    tableOfMinosOnFloor[minos.ip].time = tableOfMinosLaneOnFloor[minos.lane].time;
                }

                dataMinos.value = tableOfMinosOnFloor

                if (tableTimer[minos.ip] != null) {
                    clearTimeout(tableTimer[minos.ip])
                    tableTimer[minos.ip] = null
                }
                tableTimer[minos.ip] = setTimeout(() => {
                    tableOfMinosOnFloor[minos.ip] = {}
                }, 5000)
            }
            else if (topic.includes('minos') && topic.includes('SCORE')) {
                let lane = parseInt(topic.split('/')[1].replace("minos", ""))
                let mes = message.toString().split(';');

                console.log(mes)

                tableOfMinosLaneOnFloor[lane] = {}
                tableOfMinosLaneOnFloor[lane].status = mes[0] || 0;
                tableOfMinosLaneOnFloor[lane].rep = mes[4] || 0;
                tableOfMinosLaneOnFloor[lane].time = mes[12] || 0;
            }
        })
    }

    function getEvent() {
        if (client.connected) {
            client.publish('kairos/request', 'eventId');
        }
    }

    function getListWorkouts() {
        if (client.connected) {
            client.publish('kairos/request', 'workouts');
        }
    }

    function getCurrentHeat() {
        if (client.connected) {
            client.publish('kairos/request', 'currentHeat');
        }
    }

    function getHeatStatus() {
        if (client.connected) {
            if (_eventId == undefined && _eventId != 0) {
                client.publish(`kairos/${_eventId}/timer`, '');
            }
        }
    }

    function getListCurrentHeat(workoutId, heatId) {
        if (client.connected) {
            if (_eventId == undefined && _eventId != 0) {
                client.publish('kairos/request', 'eventId')
                setTimeout(() => {
                    client.publish(`kairos/${_eventId}/nextHeat`, `${workoutId},${heatId}`);
                }, 2000)
            } else {
                client.publish(`kairos/${_eventId}/nextHeat`, `${workoutId},${heatId}`);
            }
        }
    }

    function msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        if (secs < 10) { secs = '0' + secs }
        if (mins < 10) { mins = '0' + mins }
        return mins + ':' + secs;
    }

    function startChrono(minutes, secondes, type, count) {

        let epochTime = Date.now()
        let _s = (minutes * 60) + secondes;
        let _time = `${_s}.0`;
        let timer = '';

        switch (type) {
            case 'time':
                timer = `+${_time}`;
                break;
            case 'amrap':
                timer = `-${_time}`;
                break;
            default:
                timer = `+${_time}`;
                break;
        }

        if (client.connected) {
            client.publish(`kairos/timer`, `${timer};${count * 1000};${epochTime}`);
        }
    }

    nodecg.listenFor('static_update', () => {
        tableOfMinosOnFloor = [];
        tableOfMinosLaneOnFloor = []
        dataMinos.value = tableOfMinosOnFloor;
    })

    nodecg.listenFor('change_heat', (value) => {
        if (client != undefined) {

            getListCurrentHeat(value.workoutId, value.heatId)
        }
    })

    nodecg.listenFor('start_chrono', (value) => {
        if (client != undefined) {
            startChrono(value.minutes, value.secondes, value.type, value.count)
        }
    })

    nodecg.listenFor('reset_chrono_heat', (value) => {
        if (client != undefined) {
            client.publish('kairos/timer', '0')
        }
    })

    nodecg.listenFor('request_minos', (lane) => {
        if (client.connected) {
            let message = '01'
            if (lane < 9) {
                message = '0' + lane + message;
            } else {
                message = lane + message;
            }
            client.publish('kairos/Minos/AYTRequest', message)
        }
    })

    nodecg.listenFor('reject_minos', (infos) => {
        if (client.connected) {
            let _i = infos.split("_");
            let lane = _i[0];
            if (parseInt(_i[0]) < 100 && parseInt(_i[0]) > 9) {
                lane = "0" + _i[0];
            } else if (parseInt(_i[0]) < 10 && parseInt(_i[0]) > 1) {
                lane = "00" + _i[0];
            }
            console.log(`kairos/minos${lane}/${_i[1]}`);
            client.publish(`kairos/minos${lane}/${_i[1]}`, `reject`);
        }
    })

    nodecg.listenFor('reloadWorkout', () => {
        getListWorkouts();
        getCurrentHeat();
        getHeatStatus();
    })

    nodecg.listenFor('reloadWorkoutFromHermes', () => {
        if (client.connected) {
            client.publish('kairos/command', 'Ask Reload Workouts')
        }
    })

    let tableOfMinosOnFloor = []
    let tableOfMinosLaneOnFloor = []
    let tableTimer = []
    let floorMinos = {
        'type': '',
        'rep': 0,
        'ip': 0,
        'lane': 0,
        'battery': 0,
        'status': 0,
        'time': 0,
        'signal': ''
    }


    return { connectionMQTT, disconnectMQTT }
}
