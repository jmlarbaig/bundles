const ColorNewConfig = {
    "BgColor":"",
    "MainColor":"",
    "SecondColor":"",
    "FinishRankColor":"",
    "FirstRankColor":"",
    "SecondRankColor":"",
    "ThirdRankColor":"",
    "TransparenceLogo":0
}

const statics = nodecg.Replicant('statics', 'connector');
// const dynamics = nodecg.Replicant('dynamics', 'connector');

const timeReplicant = nodecg.Replicant('time')
const time_startReplicant = nodecg.Replicant('time_startReplicant')    

const UrlChange = nodecg.Replicant('UrlChange');

const showLeaderboard_lead = nodecg.Replicant('showLeaderboard_Lead')
const showFlag = nodecg.Replicant('showFlag')
const showWodDetails = nodecg.Replicant('showWodDetails')

// const laneInfos = nodecg.Replicant('laneInfos')
// const laneShow = nodecg.Replicant('laneShow',{defaultValue:false})
const ParticipantsWod = nodecg.Replicant('ParticipantsWod','connector');

const videoInfos = nodecg.Replicant('videoInfos')
const videoShow = nodecg.Replicant('videoShow')

const showLogo = nodecg.Replicant('showLogo')
const showChrono = nodecg.Replicant('showChrono')
const FVReplicant = nodecg.Replicant('FVspot')
const LogoFVFixe = nodecg.Replicant('LogoFVFixe')

const showHeat = nodecg.Replicant('showHeat')

const logoEvent = nodecg.Replicant('assets:logoEvent');
const pubVideo = nodecg.Replicant('assets:pub');
const videoAth = nodecg.Replicant('assets:ath');

const lowerThirdVoidName = nodecg.Replicant('lowerThirdVoidName')
const lowerThirdVoidShow = nodecg.Replicant('lowerThirdVoidShow')

const widthLogoEvent = nodecg.Replicant('widthLogoEvent')

const Ft_Ap = nodecg.Replicant('fortime_amrap')
const ipAddress = nodecg.Replicant('ipAddress', 'connector')

const athletesHeat = nodecg.Replicant('athletesHeat')

var participantEvent = {}
var participantsCurrentHeats = {}
var currentHeat = {}


statics.on('change', (newValue, oldValue) => {
    console.log("static = ", newValue)
    console.log("ParticipantsWod = ", ParticipantsWod.value)

    // LogoImg.value = newValue.logoUrl
    if(ParticipantsWod.value != undefined){
        currentHeat =  ParticipantsWod.value.find(element => element.id == newValue.workoutId)
        console.log(" currentHeat : ",currentHeat)
        participantsCurrentHeats = currentHeat.heats.find(element => element.id == newValue.heatId)
        console.log(" participantsCurrentHeats : ",participantsCurrentHeats)
        
        newValue.athletes.forEach(function(element){
            console.log(element.lane-1)
            element.affiliate = participantsCurrentHeats.stations.find(elt => elt.station == element.lane).affiliate
        })
        
        participantsCurrentHeats.isCurrent = currentHeat.name
        athletesHeat.value = participantsCurrentHeats
    
        resetLane(newValue)
    }
}); 

nodecg.listenFor('connection', 'connector', value => {
    ConnectionLeaderboard.value = value;
})

function actualiserLogo(){
    var select = document.getElementById('logo-select');
    select.innerHTML = "";
    logoEvent.value.forEach((element, index) => {
        var opt = document.createElement('option')
        opt.value = element.url
        opt.innerHTML = element.name
        select.appendChild(opt)
    })
}

function Actualiser(){
    showLogo.value = document.getElementById("logo").checked;
    // LogoImg.value = document.getElementById('logo-select').value;
    showHeat.value = document.getElementById("heatDetails").checked;
    showFlag.value = document.getElementById("showFlag").checked;
    showWodDetails.value = document.getElementById("showWod").checked;
    showChrono.value = document.getElementById("showChrono").checked;
    Ft_Ap.value = document.getElementById("fortime_amrap").checked;
    
    // UrlChange.value = document.getElementById("showChrono").checked;

    showLeaderboard_lead.value = document.getElementById("showLeader").checked;
    console.log("Show leaderboard = ",showLeaderboard_lead.value)

}

function functionFV(){
    if (FVReplicant.value != true){
        FVReplicant.value = true;
    }
    console.log(document.getElementById("LogoFvFixe").checked);
    if (!document.getElementById("LogoFvFixe").checked){
        setTimeout(function(){  
            FVReplicant.value = false; }, 10000);
    }
}

videoAth.on('change', (newValue)=>{
    resetVideo(newValue)
})

pubVideo.on('change', (newValue)=> {
    resetVideoPub(newValue);
})

// $('#widthLogo').on('input propertychange paste', function() {
//     //my Textarea content has changed
//     // console.log($('#widthLogo'))
//     widthLogoEvent.value =  document.getElementById("widthLogo").value;
// });


function affichage_leaderboardTV(){
    UrlChange.value  = "http://"+ipAddress.value+":9090/bundles/leaderboard-tv/graphics/index.html"
}

function affichage_ProgressView(){
    UrlChange.value  = "http://"+ipAddress.value+":9090/bundles/progress-view/graphics/index.html"
}

nodecg.readReplicant('showLogo', (value) =>{
    document.getElementById('logo').checked = value
})

nodecg.readReplicant('showChrono', (value) =>{
    document.getElementById('showChrono').checked = value
})

nodecg.readReplicant('showWodDetails', (value) =>{
    document.getElementById('showWod').checked = value
})

nodecg.readReplicant('showHeat', (value) =>{
    document.getElementById('heatDetails').checked = value
})

nodecg.readReplicant('showFlag', (value) =>{
    document.getElementById('showFlag').checked = value
})

nodecg.readReplicant('showLeaderboard_lead', (value) =>{
    document.getElementById('showLeader').checked = value
})

nodecg.readReplicant('fortime_amrap', (value) =>{
    document.getElementById('fortime_amrap').checked = value
})