
let staticJSONString = ''
const fs = require("fs");


module.exports = (nodecg, Connected) => {

    // Destructuration du fichier static
    const eventInfos = nodecg.Replicant('eventInfos');
    const heatInfos = nodecg.Replicant('heatInfos');
    const workoutInfo = nodecg.Replicant('workoutInfo');
    const s_athletes = nodecg.Replicant('s_athletes');

    // Destructuration du fichier Dynamic
    const statusHeat = nodecg.Replicant('status');
    const d_athletes = nodecg.Replicant('d_athletes');

    let intervalStatic = null;
    let intervalDynamic = null;

    nodecg.listenFor('reconnection', () => {
        staticJSONString = ''
    })

    function connectionSK(addIp) {

        let ip = addIp;

        if (addIp.charAt(addIp.length - 1) != '/') {
            ip = addIp + '/'
        }

        let adr_IP_static = ip + 'Static.json';
        let adr_IP_dynamics = ip + 'Dynamics.json';

        if (intervalStatic != null) {
            console.log('clear')
            clearInterval(intervalStatic)
            intervalStatic = null;
        }

        if (intervalDynamic != null) {
            console.log('clear')
            clearInterval(intervalDynamic)
            intervalDynamic = null;
        }

        if (addIp.includes('http')) {
            intervalStatic = setInterval(getStatics, 333, adr_IP_static)
            intervalDynamic = setInterval(getDynamics, 333, adr_IP_dynamics)
        } else {
            intervalStatic = setInterval(getStaticsFile, 333, adr_IP_static)
            intervalDynamic = setInterval(getDynamicsFile, 333, adr_IP_dynamics)
        }
    }

    function deconnectionSK() {
        clearInterval(intervalStatic)
        intervalStatic = null;
        clearInterval(intervalDynamic)
        intervalDynamic = null;
    }

    function getStaticsFile(ip) {
        if (intervalStatic != null) {
            console.log('Statics file read')
            fs.readFile(__dirname + '/' + ip, "utf8", (err, jsonString) => {
                if (err) {
                    console.log("Error reading file from disk:", err);
                    return;
                }
                try {
                    Connected.value.static = 'connected'
                    const statics = JSON.parse(jsonString);
                    if (statics.eventId != undefined) {
                        let sameJson = (staticJSONString) == JSON.stringify(statics);
                        if (sameJson) {
                            return
                        }

                        staticJSONString = JSON.stringify(statics);

                        const { WorkoutInfo, heatInfo, athletes, ...rest } = statics

                        eventInfos.value = rest
                        heatInfos.value = heatInfo
                        workoutInfo.value = WorkoutInfo
                        s_athletes.value = athletes

                        nodecg.sendMessage('static_update', statics);
                    }
                } catch (err) {
                    console.log("Error parsing JSON string:", err);
                }
            });
        } else {
            clearInterval(intervalStatic)
            intervalStatic = null;
            console.log('Interval Static cleared')
            Connected.value.static = 'disconnected'
            return;
        }
    }

    function getDynamicsFile(ip) {
        if (intervalDynamic != null) {
            console.log('Dynamics file read')
            fs.readFile(__dirname + '/' + ip, "utf8", (err, jsonString) => {
                if (err) {
                    console.log("Error reading file from disk:", err);
                    return;
                }
                try {
                    console.log('test');
                    Connected.value.dynamic = 'connected'
                    const dynamics = JSON.parse(jsonString);
                    if (dynamics.eventId != undefined) {
                        const { athletes, status, NtpTimeStart, PosixTimeStart, ...rest } = dynamics

                        // Insert des datas dans l'objet status
                        statusHeat.value = { status, NtpTimeStart, PosixTimeStart }

                        // Insert des nouvelles datas des athletes
                        d_athletes.value = athletes

                    }
                } catch (err) {
                    console.log("Error parsing JSON string:", err);
                }
            });
        } else {
            clearInterval(intervalDynamic)
            intervalDynamic = null;
            console.log('Interval Dynamic cleared')
            Connected.value.dynamic = 'disconnected'
            return;
        }
    }

    async function getStatics(skStaticUrl) {
        if (intervalStatic != null) {
            console.log('Statics read')
            return fetch(skStaticUrl, { cache: "no-store" })
                .then((response) => {
                    return response.json()
                }).then((statics) => {

                    if (statics.eventId != undefined) {
                        let sameJson = (staticJSONString) == JSON.stringify(statics);
                        if (sameJson) {
                            return
                        }

                        staticJSONString = JSON.stringify(statics);

                        const { WorkoutInfo, heatInfo, athletes, ...rest } = statics

                        eventInfos.value = rest
                        heatInfos.value = heatInfo
                        workoutInfo.value = WorkoutInfo
                        s_athletes.value = athletes

                        nodecg.sendMessage('static_update', statics);
                    }

                }).then(() => {
                    Connected.value.static = 'connected'
                })
                .catch((e) => {
                    console.log(e)
                    Connected.value.static = 'error :' + e
                });
        } else {
            clearInterval(intervalStatic)
            intervalStatic = null;
            console.log('Interval Static cleared')
            Connected.value.static = 'disconnected'
            return;
        }

    }

    async function getDynamics(skDynamicUrl) {
        if (intervalDynamic != null) {
            console.log('Dynamics read')
            return fetch(skDynamicUrl, { cache: "no-store" })
                .then((response) => {
                    return response.json()
                }).then((dynamics) => {

                    if (dynamics.eventId != undefined) {
                        const { athletes, status, NtpTimeStart, PosixTimeStart, ...rest } = dynamics

                        // Insert des datas dans l'objet status
                        statusHeat.value = { status, NtpTimeStart, PosixTimeStart }

                        // Insert des nouvelles datas des athletes
                        d_athletes.value = athletes

                    }
                }).then(() => {
                    Connected.value.dynamic = 'connected'
                })
                .catch((e) => {
                    console.log(e)
                    console.log("error")
                    Connected.value.dynamic = 'error :' + e
                })
        } else {
            clearInterval(intervalDynamic)
            intervalDynamic = null;
            console.log('Interval Dynamic cleared')
            Connected.value.dynamic = 'disconnected'
            return;
        }

    }

    return { connectionSK, deconnectionSK }

}