

let Clrs = {}
let root = document.documentElement;



const setupLeaderboard = nodecg.Replicant('setupLeaderboard', 'leaderboard')
const Colors = nodecg.Replicant('Colors', 'configuration');

const logoEvent = nodecg.Replicant('assets:logoEvent', 'connector')
const mainSponsors = nodecg.Replicant('assets:mainSponsor', 'connector')

const timeNTP = nodecg.Replicant('timeNTP', 'connector')
const nowNtp = nodecg.Replicant('nowNtp', 'connector')

// Destructuration du fichier static
const eventInfos = nodecg.Replicant('eventInfos', 'connector');
const heatInfos = nodecg.Replicant('heatInfos', 'connector');

// Destructuration du fichier Dynamic
const statusHeat = nodecg.Replicant('status', 'connector');

// on récupère les infos provenant du connecteur

eventInfos.on('change', (newValue, oldValue) => {
    if (newValue != undefined) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
            // resetHeat(newValue);
            if (newValue.heatId != heat.heatId) {
                newHeat = true;
            } else {
                newHeat = false
            }
        }
    }
})

let tc
let heat = {}

heatInfos.on('change', (newValue, oldValue) => {
    if (newValue != undefined) {
        heat = typeWorkout(newValue)
        launchTimer()
        showTime(heat.timecap)
    }
})

let statusWorkout = '0'
let ntpStartTime;
let startTime = 0;
let endTime;
let timerLaunch = null;


function launchTimer() {
    if (heat != {}) {
        if (startTime != 0) {
            var timecapIn = ((parseInt(tc.length ? parseInt(tc[1]) : 0) * 60) + parseInt(tc.length ? parseInt(tc[2]) : 0)) * 1000;
            endTime = parseInt(startTime) + parseInt(timecapIn)
            if (timerLaunch != null) {
                clearInterval(timerLaunch)
                timerLaunch = null;
            }
            timerLaunch = setInterval(updateTime, 500);
        } else {
            if (timerLaunch != null) {
                clearInterval(timerLaunch)
                timerLaunch = null;
                // $(".chrono").find('#time').text(tc[1] + ":" + tc[0]);
                $(".chrono").find('#time').text('STOP');
            }
        }
    }
}

statusHeat.on('change', (newValue, oldValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        if (newValue.PosixTimeStart !== ntpStartTime) {
            ntpStartTime = newValue.PosixTimeStart
            startTime = parseInt(ntpStartTime);
            // var timecapIn = ((parseInt( tc.length ? parseInt(tc[1]) : 0)* 60) + parseInt( tc.length ? parseInt(tc[2]) : 0)) * 1000;
            // console.log(timecapIn);
            // endTime = parseInt(startTime) + parseInt(timecapIn)
            // if(timerLaunch != null){
            //     clearInterval(timerLaunch)
            //     timerLaunch = null;
            // }
            // timerLaunch = setInterval(updateTime, 500);
            launchTimer()
            newHeat = false
        }
        statusWorkout = newValue.status
    }
})

// Catégorie Assets

logoEvent.on('change', (newValue, oldValue) => {
    try {
        if (newValue.length > 0) {
            $("#logo").css("background-image", "url(" + newValue[0].url + ")");
            $(".box_logo").css("background-image", "url(" + newValue[0].url + ")");
        }
    }
    catch (e) {
        console.log(e)
    }
});


mainSponsors.on('change', (newValue) => {
    if (newValue.length > 0) {

        $(".mainSponsor").css("background-image", "url(" + newValue[0].url + ")");
        $(".mainSponsor").fadeIn(1000)
    }
    else {
        $(".mainSponsor").fadeOut(1000)
    }
})


Colors.on('change', (newValue, oldValue) => {

    let tabColor = newValue

    Object.keys(newValue).forEach((color, index) => {

        let _color = tabColor[color]

        root.style.setProperty("--" + color, _color);
        Clrs[color] = _color
    })

})

// Congifuration et setup
setupLeaderboard.on('change', (newValue, oldValue) => {
    if (newValue != undefined) {

        Object.keys(newValue).forEach((params, index) => {
            if (params == 'fortimeAmrap') {
                switch (newValue[params]) {
                    case true:
                        $('.' + params).fadeIn(1000)
                        break;
                    case false:
                        $('.' + params).fadeOut(1000)
                        break;
                }
            }
        })
    }
})