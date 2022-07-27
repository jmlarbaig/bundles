'use strict';

const fs = require('fs');
const path = require('path');

const mqtt = require('mqtt')
// const client = mqtt.connect('mqtt://146.59.153.17:1883')
const client = mqtt.connect('mqtt://10.17.86.100:1883')
var data = {}
var dataTab = []


const NTP = require('ntp-time').Client;
// const clientNtp = new NTP('10.17.86.1', '123', { timeout: 5000 });
// const clientNtp = new NTP('time.google.com', '123', { timeout: 5000 });
var ntpClient = require('ntp-client');



module.exports = function (nodecg, bundlePath) {

    const timeNTP = nodecg.Replicant('timeNTP')
    const nowNtp = nodecg.Replicant('nowNtp')
    const dataConfig = nodecg.Replicant('dataConfig')
    const dataConfigCC = nodecg.Replicant('dataConfigCC')
    const currentPath = process.cwd() + "/bundles/connector/";
	const pkgPath = path.join(currentPath,"connectionFile.json");
	const pkgPathCC = path.join(currentPath,"connectionFileCC.json");

    const dataRow = nodecg.Replicant('dataRow')

    client.subscribe('kairos/+/ERG/#')

    client.on('message', function (topic, message) {
        console.log(topic)
        var ch = topic.split('/');
        var lane = parseInt(ch[1].replace("minos",""))-1

        console.log("lane =", lane)
        if(topic.includes("ERG")){
            var erg = ch[3];
            var ch2 = message.toString().split(';');

            data={}

            console.log(ch2)
            data.lane = lane;
            data.displayUnit = ch2[0];
            data.displayType = ch2[1];
            data.workoutState = ch2[2];
            data.timeWorkout = ch2[3];
            data.spm = ch2[4];
            data.distance = ch2[5];
            data.calories = ch2[6];
            data.power = ch2[7];
            data.calH = ch2[8];
            data.stroke = ch2[9];
            data.byteState = ch2[10];
            data.erg = ch[3];

            console.log(lane)
            console.log(erg)
            console.log(data)
            dataTab[lane] = data;
            dataRow.value = dataTab;

            console.log(dataTab)
        }
      })

    if (fs.existsSync(pkgPath)) {   
        try {
            const data_ = JSON.parse(fs.readFileSync(pkgPath))
            dataConfig.value = data_
          } 
        catch (err) {
            console.error(err)
          }
	}

    nodecg.listenFor('dataOverwrite', (value, ack) =>{
        let data = JSON.stringify(value, undefined, 4);
        fs.writeFileSync(pkgPath, data)
        dataConfig.value = value
    })

    if (fs.existsSync(pkgPathCC)) {   
        try {
            const data_ = JSON.parse(fs.readFileSync(pkgPathCC))
            dataConfigCC.value = data_
          } 
        catch (err) {
            console.error(err)
          }
	}

    nodecg.listenFor('dataOverwriteCC', (value, ack) =>{
        let data = JSON.stringify(value);
        fs.writeFileSync(pkgPathCC, data)
        dataConfigCC.value = value
    })

    function time (){
        // clientNtp
        //     .syncTime()
        //     .then(time => {
        //         console.log(time.time)
        //         timeNTP.value = time.time
        //     }) // time is the whole NTP packet
        //     .catch(console.log);
        ntpClient.getNetworkTime('time.google.com', 123, function(err, date) {
            if(err) {
                console.error(err);
                return;
            }
         
            console.log("Current time : ");
            console.log(date.toString()); // Mon Jul 08 2013 21:31:31 GMT+0200 (Paris, Madrid (heure d’été))
            nowNtp.value = date
            timeNTP.value = date.getTime()
        });
    }


    setInterval(time, 1000);

	nodecg.log.info(`Bundle "${__filename}" is initialized.`);
        
};
