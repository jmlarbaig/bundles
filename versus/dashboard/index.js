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

// var lowerthirdData = {
//     "Name":"",
//     "Fonction":"",
//     "url":"",
// }

// const LowerThirdConfig = nodecg.Replicant('LowerThirdConfig')

const statics = nodecg.Replicant('statics', 'connector');
// const dynamics = nodecg.Replicant('dynamics', 'connector');

const timeReplicant = nodecg.Replicant('time')
const time_startReplicant = nodecg.Replicant('time_startReplicant')

const showLeaderboard_lead = nodecg.Replicant('showLeaderboard_Lead')
const showWodDetails = nodecg.Replicant('showWodDetails')

const laneInfos = nodecg.Replicant('laneInfos')
const laneShow = nodecg.Replicant('laneShow',{defaultValue:false})
const ParticipantsWod = nodecg.Replicant('ParticipantsWod','connector');

const videoInfos = nodecg.Replicant('videoInfos')
const videoShow = nodecg.Replicant('videoShow')

const showLogo = nodecg.Replicant('showLogo')
const showChrono = nodecg.Replicant('showChrono')
const FVReplicant = nodecg.Replicant('FVspot')
const LogoFVFixe = nodecg.Replicant('LogoFVFixe')

const showManuel = nodecg.Replicant('showManuel')

const sponsorLower = nodecg.Replicant('assets:sponsorLower')

const Teams = nodecg.Replicant('Teams')

const Att_poids = nodecg.Replicant('Att_poids')

const Ft_Ap = nodecg.Replicant('fortime_amrap')

var participantEvent = {}
var participantsCurrentHeats = {}
var currentHeat = {}
var Att_poids_sub = []
var lowerThird = []


sponsorLower.on('change', (newValue)=> {
    resetSelectSponsor(newValue)
    // A revoir
})


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
        
        resetSelect(newValue);
        // resetLane(newValue);
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
    showManuel.value = document.getElementById("Manual").checked;
    showWodDetails.value = document.getElementById("showWod").checked;
    showChrono.value = document.getElementById("showChrono").checked;    
    showLeaderboard_lead.value = document.getElementById("showLeader").checked;
    Ft_Ap.value = document.getElementById("fortime_amrap").checked;

    var team1 = document.getElementById("leftTeam").value;
    var team2 = document.getElementById("rigthTeam").value;
    Teams.value = [team1,team2]

    console.log(Teams.value)
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




nodecg.readReplicant('showLogo', (value) =>{
    document.getElementById('logo').checked = value
})

nodecg.readReplicant('showChrono', (value) =>{
    document.getElementById('showChrono').checked = value
})

nodecg.readReplicant('showWodDetails', (value) =>{
    document.getElementById('showWod').checked = value
})

nodecg.readReplicant('showLeaderboard_Lead', (value) =>{
    document.getElementById('showLeader').checked = value
})

nodecg.readReplicant('showManuel', (value) =>{
    document.getElementById('Manual').checked = value
})

nodecg.readReplicant('fortime_amrap', (value) =>{
    document.getElementById('fortime_amrap').checked = value
})

// const Att_poids_Show = nodecg.Replicant("Att_poids_Show")

function Aff_poids(){

    var data1 = {}
    var data2 = {}
    var data3 = {}
    var data4 = {}
    var data5 = {}
    var data6 = {}
    Att_poids_sub = []

    data1.name = document.getElementById('Name_11').value
    data1.poids = document.getElementById('Poids_11').value

    data2.name = document.getElementById('Name_21').value
    data2.poids = document.getElementById('Poids_21').value

    data3.name = document.getElementById('Name_31').value
    data3.poids = document.getElementById('Poids_31').value

    data4.name = document.getElementById('Name_12').value
    data4.poids = document.getElementById('Poids_12').value

    data5.name = document.getElementById('Name_22').value
    data5.poids = document.getElementById('Poids_22').value

    data6.name = document.getElementById('Name_32').value
    data6.poids = document.getElementById('Poids_32').value

    Att_poids_sub.push(data1)
    Att_poids_sub.push(data2)
    Att_poids_sub.push(data3)
    Att_poids_sub.push(data4)
    Att_poids_sub.push(data5)
    Att_poids_sub.push(data6)

    console.log(Att_poids_sub)
    Att_poids.value = Att_poids_sub

}

nodecg.readReplicant('Att_poids', (value) =>{

    console.log(value)
    document.getElementById('Name_11').value = value[0].name
    document.getElementById('Poids_11').value = value[0].poids

    document.getElementById('Name_21').value = value[1].name
    document.getElementById('Poids_21').value = value[1].poids

    document.getElementById('Name_31').value = value[2].name
    document.getElementById('Poids_31').value = value[2].poids

    document.getElementById('Name_12').value = value[3].name
    document.getElementById('Poids_12').value = value[3].poids

    document.getElementById('Name_22').value = value[4].name
    document.getElementById('Poids_22').value = value[4].poids

    document.getElementById('Name_32').value = value[5].name
    document.getElementById('Poids_32').value = value[5].poids
    Aff_poids();
})