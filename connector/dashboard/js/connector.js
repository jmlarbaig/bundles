const dataNewConfig = {
    "staticServer":"",
    "timeStatic":0,
    "dynamicServer":"",
    "timeDynamics":0
}

var WorkoutTab =     {
    "date":"",
    "description":"",
    "end":"",
    "format":"",
    "hasHeats":"",
    "heats":[],
    "id":0,
    "location":"",
    "name":"",
    "participants":[],
    "start":""
}

const dataNewConfigCC = {"usernameCC":"","passwordCC":"", "eventId":0}

const statics_R = nodecg.Replicant('statics');
const dynamics_R = nodecg.Replicant('dynamics');
const Connection_R = nodecg.Replicant('Connected');
const ParticipantsWod = nodecg.Replicant('ParticipantsWod');

const DatesEvent = nodecg.Replicant('DatesEvent');
const WodTab = nodecg.Replicant('WodTab');
const WarmUpTab = nodecg.Replicant('WarmUpTab');
const WorkoutInfos = nodecg.Replicant('WorkoutInfos');

const AttributionLane = nodecg.Replicant('AttributionLane')

const LogoImg = nodecg.Replicant('LogoImg')
const sponsorWod = nodecg.Replicant('sponsorWod')

const logoEvent = nodecg.Replicant('assets:logoEvent')

const sponsor = nodecg.Replicant('assets:sponsors')

const data_ath = nodecg.Replicant('assets:dataAth')

const ipAddress = nodecg.Replicant('ipAddress')

var staticJSONString = "";
var dynamicJSONString = "";
var heatId = "";
var athletes_final = new Array();
let sameJson;
var adr_IP_static;
var adr_IP_dynamics;
var EventPlanner = [];
var heatWUP = []
var static_
var workoutId;
var wodId;

var statics_timer;
var dynamics_timer;

var init = false

var data = []


async function updateOverlayStatics() {
    getStatics(adr_IP_static)
            .then(function(statics) {

                if(statics.eventId != undefined){
                    let sameJson = sha256(staticJSONString) == sha256(JSON.stringify(statics));
                    if (sameJson) {
                        return
                    }
                    staticJSONString = JSON.stringify(statics);
                    // statics.logoUrl = LogoImg.value
    
                    statics_R.value = statics
    
                    console.log("statics from update = ",statics)
    
                    document.getElementById('log_static').innerHTML = JSON.stringify(statics, undefined, 4);
                    updateWarmUp(statics.logoUrl, statics.workoutId, statics.heatId)
                    if(workoutId != statics.workoutId){
                        updateWorkout(statics.eventId);
                        workoutId = statics.workoutId;
                        // console.log("Workout Infos",WorkoutInfos.value)
                        // var data = (WorkoutInfos.value.find(element => element.id == workoutId))
                        // if (data.logoPath != undefined){
                        //     // sponsorWod.value = "https://competitioncorner.net/file.aspx/mainFilesystem?file=" + data.logoPath
                        // }
                        // else {
                        //     sponsorWod.value = ""
                        // }
                    }
                    // AttributionLane.value = loadAttributionLane(statics.heatId)
                }

            })
            .catch(function(e) {
                console.log(e)
                document.getElementById('log_error_static').innerHTML = e;
            })
}

async function updateOverlayDynamics() {
    getDynamics(adr_IP_dynamics)
        .then(function(dynamics) {

            document.getElementById('log_dyn').innerHTML = JSON.stringify(dynamics, undefined, 4);
            // if (dynamics.status != "0" && dynamics.athletes[0].CurrentRank != null){
                dynamics_R.value = dynamics
            // }
        })
        .catch(function(e) {
            console.log(e)
            document.getElementById('log_error_dynamic').innerHTML = e;
        })
}

async function updateEvent(eventId){
    var data = await loadInfoEventCC(eventId);
    // LogoImg.value = data.logoUrl;
    console.log(logoEvent.value[0])
    LogoImg.value = logoEvent.value[0].url
}

    logoEvent.on('change', (newValue) => {
        console.log(newValue[0].url)
        LogoImg.value = newValue[0].url
    })

async function updateWorkoutInfos(eventId){
    var data = await loadWorkouts(eventId);
    WorkoutInfos.value = data;
}

async function updateWorkout(eventId){
    var data = await loadWorkoutsPlanning(eventId);

    WorkoutTab = data.workouts;

    for(let workout of WorkoutTab){
        workout.heats = await loadHeats(workout.id)
        
        workout.participants = await loadParticpant(eventId, workout.id)
    }

    EventPlanner = [];

    for(let date of data.dates){
        EventPlanner.push(date)
    }

    for(let date of EventPlanner){
        date.wods = []
        for(let wod of WorkoutTab){
            if(wod.date == date.value){
                date.wods.push(wod)
            }
        }
    }

    console.log("EventTab = ", EventPlanner)


    console.log("WorkoutTab = ", WorkoutTab)
    ParticipantsWod.value = WorkoutTab
    console.log("ParticipantsWod = ", ParticipantsWod.value)

    console.log("EventPlanner = ", EventPlanner)
    WodTab.value = EventPlanner;
    console.log("WodTab = ", WodTab.value)

}

function updateWarmUp(logoUrl, workoutId, heatId){

    try{
    // var heatWUP = {"wod":[],"heat":[]};

    heatWUP = []
    var d = {"wod" :"", "heat":""}
    var d2 = {"wod" :"", "heat":""}
    var d3 = {"wod" :"", "heat":""}
    console.log("Workout Id =", workoutId)
    console.log("heat Id =", heatId)
    console.log("Workout Tab = ", WorkoutTab)
    if (WorkoutTab != undefined){
        for (let i=0; i < WorkoutTab.length; i++){
            if(WorkoutTab[i].id == workoutId){
                for(let y=0; y < WorkoutTab[i].heats.length; y++){
                    if (WorkoutTab[i].heats[y].id == heatId){
                        d.wod = (WorkoutTab[i])
                        d.heat = (WorkoutTab[i].heats[y])
                        if(WorkoutTab[i].heats[y+1] == undefined){
                            if(WorkoutTab[i+1].heats[0] != undefined){
                                d2.heat = (WorkoutTab[i+1].heats[0])
                                d2.wod = (WorkoutTab[i+1])
                                if(WorkoutTab[i+1].heats[1] != undefined){
                                    d3.heat = (WorkoutTab[i+1].heats[1])
                                    d3.wod = (WorkoutTab[i+1])
                                }
                            }
                        }
                        else {
                            d2.heat = (WorkoutTab[i].heats[y+1])
                            d2.wod = (WorkoutTab[i])

                            if(WorkoutTab[i].heats[y+2] == undefined){
                                if(WorkoutTab[i+1].heats[0] != undefined){
                                    d3.heat = (WorkoutTab[i+1].heats[0])
                                    d3.wod = (WorkoutTab[i+1])
                                }
                            }
                            else {
                                d3.heat = (WorkoutTab[i].heats[y+2])
                                d3.wod = (WorkoutTab[i])
                            }
                        }
                    }
                }
            }
        }
        
        d.heat.current = "CURRENT"
        d2.heat.current = "NEXT"
        d3.heat.current = "CALL FOR WARM UP"
        
        heatWUP.push(d)
        heatWUP.push(d2)
        heatWUP.push(d3)

        WarmUpTab.value = heatWUP
        console.log(heatWUP)
    }
    }
    catch(e){
        console.log(e)
        document.getElementById('log_error_static').innerHTML = e;
    }
}

async function ConnectionCC(){
    try{
        let user = document.getElementById('usernameCC').value.toString()
        let passwd = document.getElementById('passwordCC').value.toString()
        let eventId = document.getElementById('eventId').value

        document.getElementById('log_CC').value = "WAITING ! WAITING ! WAITING !"
        
        await logCC(user, passwd)

        dataNewConfigCC.usernameCC = user
        dataNewConfigCC.passwordCC = passwd
        dataNewConfigCC.eventId = eventId

        nodecg.sendMessage('dataOverwriteCC', dataNewConfigCC);
        
        await updateEvent(eventId)
        await updateWorkout(eventId)
        await updateWorkoutInfos(eventId)

        document.getElementById('log_CC').value = "CONNECTED."
        // document.getElementById('log_CC').value = "Connected." + token
        // document.getElementById('connection_but_CC').disabled = true;
    }
    catch(e){
        console.log(e)
        document.getElementById('log_CC').value = "ERROR CONNECTION"
        alert(e)
    }
}

function Connection(){
    try{
        adr_IP_static = document.getElementById('address_IP_statics').value.toString();
        adr_IP_dynamics = document.getElementById('address_IP_dynamics').value.toString();

        var timer_updatestatic = document.getElementById('timer_static').value;
        var timer_updatedynamic = document.getElementById('timer_dynamic').value;
        
        updateOverlayStatics();

        Connection_R.value = true;
        statics_timer = setInterval(updateOverlayStatics, timer_updatestatic);
        dynamics_timer = setInterval(updateOverlayDynamics, timer_updatedynamic);

        //  !Faire les configs pour planning / wod / warmup

        document.getElementById('connection_but').disabled = true;
        
        dataNewConfig.staticServer = adr_IP_static
        dataNewConfig.dynamicServer = adr_IP_dynamics
        dataNewConfig.timeStatic = timer_updatestatic
        dataNewConfig.timeDynamics = timer_updatedynamic

        nodecg.sendMessage('dataOverwrite', dataNewConfig);
    }
    catch(e){
        console.log(e)
        document.getElementById('log_static').innerHTML = e;
        document.getElementById('log_dyn').innerHTML = e;
    }
}

function Deconnection(){
    try{
        document.getElementById('connection_but').disabled = false;
        document.getElementById('log_static').innerHTML = "Deconnection succesful";
        document.getElementById('log_dyn').innerHTML = "Deconnection succesful";
        nodecg.sendMessageToBundle('connection', 'leaderboard', false);
        clearInterval(statics_timer)
        clearInterval(dynamics_timer)
        Connection_R.value = false;
        staticJSONString = "";
        dynamicJSONString = "";

        document.getElementById('log_error_static').innerHTML = "";
        document.getElementById('log_error_dynamic').innerHTML = "";
    }
    catch(e){
        console.log(e)
        document.getElementById('log_static').innerHTML = e;
        document.getElementById('log_dyn').innerHTML = e;
    }
}


nodecg.readReplicant('dataConfig', (value) =>{
    document.getElementById('address_IP_statics').value = value.staticServer.toString()
    document.getElementById('timer_static').value = value.timeStatic.toString()
    document.getElementById('address_IP_dynamics').value = value.dynamicServer.toString()
    document.getElementById('timer_dynamic').value = value.timeDynamics.toString()
})


nodecg.readReplicant('dataConfigCC', (value) =>{
    document.getElementById('usernameCC').value = value.usernameCC.toString()
    document.getElementById('passwordCC').value = value.passwordCC.toString()
    document.getElementById('eventId').value = value.eventId.toString()
})


/**
 * Get Local IP Address
 * 
 * @returns Promise Object
 *
 * getLocalIP().then((ipAddr) => {
 *    console.log(ipAddr); // 192.168.0.122
 * });
 */
 function getLocalIP() {
    return new Promise(function(resolve, reject) {
      // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
      var RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
  
      if (!RTCPeerConnection) {
        reject('Your browser does not support this API');
      }
      
      var rtc = new RTCPeerConnection({iceServers:[]});
      var addrs = {};
      addrs["0.0.0.0"] = false;
      
      function grepSDP(sdp) {
          var hosts = [];
          var finalIP = '';
          sdp.split('\r\n').forEach(function (line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
              if (~line.indexOf("a=candidate")) {     // http://tools.ietf.org/html/rfc4566#section-5.13
                  var parts = line.split(' '),        // http://tools.ietf.org/html/rfc5245#section-15.1
                      addr = parts[4],
                      type = parts[7];
                  if (type === 'host') {
                      finalIP = addr;
                  }
              } else if (~line.indexOf("c=")) {       // http://tools.ietf.org/html/rfc4566#section-5.7
                  var parts = line.split(' '),
                      addr = parts[2];
                  finalIP = addr;
              }
          });
          return finalIP;
      }
      
      if (1 || window.mozRTCPeerConnection) {      // FF [and now Chrome!] needs a channel/stream to proceed
          rtc.createDataChannel('', {reliable:false});
      };
      
      rtc.onicecandidate = function (evt) {
          // convert the candidate to SDP so we can run it through our general parser
          // see https://twitter.com/lancestout/status/525796175425720320 for details
          if (evt.candidate) {
            var addr = grepSDP("a="+evt.candidate.candidate);
            resolve(addr);
          }
      };
      rtc.createOffer(function (offerDesc) {
          rtc.setLocalDescription(offerDesc);
      }, function (e) { console.warn("offer failed", e); });
    });
  }

    getLocalIP().then((ipAddr) => {
        console.log(ipAddr); // 192.168.0.122
        ipAddress.value = ipAddr
    });