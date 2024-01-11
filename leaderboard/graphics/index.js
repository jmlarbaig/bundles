
// initialization
let athlete;
let athletes;
let timerId;
let timecapNTP = [];
let startTimeNTP;
let heatId;
let heat_Name;
let heatName;
let resetVar = false;
let athletes_final = new Array();
let timerInterval = null;
let dataTime;
let athletesDivison;
let Mvt_name = []
let height_top = 100;
let root = document.documentElement;
let Clrs = {}
let chrono;

configBefore = {};

let timerAutomatic1 = null;
let timerAutomatic2 = null;
let timerAutomatic3 = null;
let timerAutomatic4 = null;


let showDrapeau;
let varPresented;

const timerNTP = nodecg.Replicant('timerNTP', 'connector');
const setupLeaderboard = nodecg.Replicant('setupLeaderboard');

const Fonts = nodecg.Replicant('assets:font', 'configuration');
const Colors = nodecg.Replicant('Colors', 'configuration');

const adjustT = nodecg.Replicant('adjustT')

const logoEvent = nodecg.Replicant('assets:logoEvent', 'connector')
const mainSponsors = nodecg.Replicant('assets:mainSponsor', 'connector')

const timeNTP = nodecg.Replicant('timeNTP', 'connector')
const nowNtp = nodecg.Replicant('nowNtp', 'connector')

const listCis = nodecg.Replicant('CIS', 'connector')

// Destructuration du fichier static
const eventInfos = nodecg.Replicant('eventInfos', 'connector');
const heatInfos = nodecg.Replicant('heatInfos', 'connector');
const workoutInfo = nodecg.Replicant('workoutInfo', 'connector');
const s_athletes = nodecg.Replicant('s_athletes', 'connector');

// Destructuration du fichier Dynamic
const statusHeat = nodecg.Replicant('status', 'connector');
const d_athletes = nodecg.Replicant('d_athletes', 'connector');

const bottomSponsors = nodecg.Replicant('assets:bottomSponsors', 'connector')

const TopScore = nodecg.Replicant('TopScore', 'connector')
const listWarmpUp = nodecg.Replicant('listWarmpUp', 'connector');

const manualChrono = nodecg.Replicant('manualChrono')

// Value from MQTT Kairos
// const divisionMQTT = nodecg.Replicant('divisionMQTT')
const workoutsMQTT = nodecg.Replicant('workoutsMQTT', 'connector')
const heatMQTT = nodecg.Replicant('heatMQTT', 'connector')

let laneEcho = 0

// Initialisation du choix de la vue

let overlay = ''

// if is android
var isAndroid = false;

$('document').ready(() => {
    console.log(document)
    let ch = document.location.pathname.split('/')
    overlay = ch[ch.length - 1].replace('.html', '')
    console.log(overlay)
    if (overlay == 'sk' || overlay == 'head_judge') {
        setInterval(() => {
            const date = new Date();
            const hour = date.getHours();
            const min = date.getMinutes();
            const sec = date.getSeconds();
            $('.hours').text(hour + ':' + min + ':' + sec);
        }, 1000)
        createKairosView();
    } else if (overlay.includes('echo') || overlay.includes('lane')) {
        laneEcho = parseInt(window.location.search.replace('?lane=', ''))
    }
    var userAgent = navigator.userAgent.toLowerCase();
    var Android = userAgent.indexOf("android") > -1;

    // widthWindow = window.outerWidth;
    // heightWindowd = window.outerHeight;


    widthWindow = window.innerWidth;
    heightWindowd = window.innerHeight;

    if (Android) {
        isAndroid = true;

    }
    document.querySelector(':root').style.setProperty('--zoom', (widthWindow / 1920) * 100 + '%');
    console.log(widthWindow)
    console.log(heightWindowd)
})

let newHeat = false;

// on récupère les infos provenant du connecteur

eventInfos.on('change', (newValue, oldValue) => {
    if (newValue != undefined) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
            resetHeat(newValue);
            if (newValue.heatId != heat.heatId) {
                if ($('#box_svg').is(':visible')) {
                    $('#box_svg').slideUp(1000)
                }
                newHeat = true;
                best = []
                bestPerf = []
            } else {
                newHeat = false
            }
        }
    }
})

let tc
let heat = {}
let heatSize = 0;

heatInfos.on('change', (newValue, oldValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        heat = typeWorkout(newValue)
        launchTimer()
        showTime(heat.timecap)
        if (overlay == 'sk' || overlay == 'head_judge') {
            $('#timeCapKairos').text(newValue[0].timeCap)
            heatSize = newValue[0].heatsSize
        }
    }
})

let workouts = {}

workoutInfo.on('change', (newValue, oldValue) => {
    if (newValue != oldValue) {
        workouts = treatWorkouts(newValue);
        workouts = newValue
    }
})

s_athletes.on('change', (newValue, oldValue) => {
    console.log('update Static :', JSON.stringify(newValue) !== JSON.stringify(oldValue))
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {

        if (timerAutomatic1 != null) {
            clearInterval(timerAutomatic1)
            timerAutomatic1 = null;
        }

        if (timerAutomatic2 != null) {
            clearInterval(timerAutomatic2)
            timerAutomatic2 = null;
        }

        if (timerAutomatic3 != null) {
            clearInterval(timerAutomatic3)
            timerAutomatic3 = null;
        }


        if (setupLeaderboard.value.automaticSchedule) {

            let config = setupLeaderboard.value;
            configBefore = config;

            config.box_chrono = false;
            config.box_heat = false;
            config.leaderboards = false;
            config.box_bandeau = false;
            setupLeaderboard.value = config;

            setTimeout(() => {

                let config = setupLeaderboard.value;
                config.attributionLane = true;

                setupLeaderboard.value = config;


                setTimeout(() => {
                    let config = configBefore;

                    // config.leaderboards = true;

                    // $('.leaderboard').hide()
                    config.attributionLane = false;

                    setupLeaderboard.value = config;
                    setTimeout(() => {
                        resetLeaderboard(newValue);

                    }, 2000)
                }, 10000)
            }, 2000)
        } else {

            resetLeaderboard(newValue);
        }

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
                $(".chrono").find('#time').text('STOP');
            }
        }
    }
}

statusHeat.on('change', (newValue, oldValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        if (!setupLeaderboard.value.manualChrono) {
            $(".chrono").find('#cap').text("CAP " + tc[1] + "'" + (tc[0] != "00" ? tc[0] : ''));
            if (newValue.PosixTimeStart !== ntpStartTime) {
                ntpStartTime = newValue.PosixTimeStart
                startTime = parseInt(ntpStartTime);
                launchTimer();
                newHeat = false

            }
        } else {
            if (timerLaunch != null) {
                clearInterval(timerLaunch)
                timerLaunch = null;
            }
        }
        statusWorkout = newValue.status
        if (overlay == 'sk' || overlay == 'head_judge') {
            switch (newValue.status) {
                case '0':
                    $('.stateTimer').css('background-color', 'white')
                    $('.stateTimer').css('color', 'black')
                    $('#stateTimer').text('HEAT LOADED, VERIFY IF THIS THE GOOD HEAT')
                    break;
                case 'R':
                    $('.stateTimer').css('background-color', 'orange')
                    $('.stateTimer').css('color', 'white')
                    $('#stateTimer').text('STANDBY')
                    break;
                case 'W':
                    $('.stateTimer').css('background-color', 'green')
                    $('.stateTimer').css('color', 'white')
                    $('#stateTimer').text('HEAT LAUNCHED')
                    break;
                case 'T':
                    $('.stateTimer').css('background-color', 'orange')
                    $('.stateTimer').css('color', 'black')
                    $('#stateTimer').text('HEAT FINISHED')
                    break;
            }
        }
    }
})

manualChrono.on('change', (newValue, oldValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        if (setupLeaderboard.value.manualChrono) {
            $(".chrono").find('#cap').text('CAP ' + newValue.timecap + "'");
            switch (newValue.launchedTimer) {
                case 'start':
                    ntpStartTime = newValue.timer
                    startTime = parseInt(ntpStartTime);
                    // endTime = timeToDateTime(ntpStartTime).setMinutes(startTime.getMinutes() + parseInt(newValue.timecap));
                    if (timerLaunch != null) {
                        clearInterval(timerLaunch)
                        timerLaunch = null;
                    }
                    newHeat = false
                    timerLaunch = setInterval(updateTime, 500);
                    break;
                case 'stop':
                    if (timerLaunch != null) {
                        clearInterval(timerLaunch)
                        timerLaunch = null;
                    }
                    break;
                case 'reset':
                    endTime = timeToDateTime(ntpStartTime).setMinutes(startTime.getMinutes() + parseInt(newValue.timecap));
                    resetTimer()
                    break;
            }
        }
    }
})

d_athletes.on('change', (newValue, oldValue) => {
    if (overlay != 'sk' || overlay != 'head_judge') {
        if (newValue != undefined && statusWorkout != 0) {
            updateDynamics(newValue, statusWorkout);
        }
    }
})

let listOverall = []

listWarmpUp.on('change', (newValue, oldValue) => {
    if (newValue != undefined && JSON.stringify(newValue) != JSON.stringify(oldValue) && overlay == 'commentator') {
        let participantsHeat = newValue.warmUp[0].wod.participants
        let stations = newValue.warmUp[0].heat.stations
        for (let station of stations) {
            let data = participantsHeat.find(element => element.id === station.participantId)
            listOverall[station.station] = {}
            listOverall[station.station].oR = data.rank
            listOverall[station.station].oP = data.points

            $('#oP_' + station.station).text(data.points)
            $('#oR_' + station.station).text(data.rank)
        }
        // console.log('warmup : ', newValue)
    }
})


TopScore.on('change', (newValue, oldValue) => {
    // console.log("top Score = ",newValue[0][0].scores[0].score)
    if (newValue != undefined && newValue.length > 0) {
        let index = 0;
        if (!newValue[0].hasOwnProperty('error')) {
            for (let teams of newValue[0]) {
                console.log("top index =", index)
                $('.repTarget' + index).html("-> " + teams.scores[0].score)
                index++
            }
        }
    }
})


// Catégorie Assets

logoEvent.on('change', (newValue, oldValue) => {
    try {
        if (newValue.length > 0) {
            $("#logo").css("background-image", "url(" + newValue[0].url + ")");
            setupLeaderboard.value.logo != true ? $("#box_logo").hide() : ""
        }
    }
    catch (e) {
        console.log(e)
    }
});


mainSponsors.on('change', (newValue) => {
    if (newValue.length > 0) {

        $(".mainSponsor").css("background-image", "url(" + newValue[0].url + ")");
        $(".mainSponsor").toggle("slide")
    }
    else {
        $(".mainSponsor").toggle("slide")
    }
})


bottomSponsors.on('change', (newValue) => {

    var $list = $("#sponsorLogo");
    $list.find(".sponsorImg").remove();

    if (newValue.length > 0) {
        $("#sponsorLogo").css('background-color', "black")
        newValue.forEach(element => {
            var $item = $('<img class="sponsorImg" id="sponsorImg" src="' + element.url + '"></img>')
            $list.append($item);
        });
    }
    else {
        $("#sponsorLogo").css('background-color', "rgba(0,0,0,0)")
    }
})

let eventName

// Congifuration et setup
setupLeaderboard.on('change', (newValue, oldValue) => {
    if (!configBefore.hasOwnProperty('leaderboards')) {
        configBefore = newValue;
    }
    Object.keys(newValue).forEach((params, index) => {
        let authorize = newValue[params]
        if (overlay == 'leaderboard' || overlay == 'progression' || overlay == 'commentator' || overlay == 'sk' || overlay == 'head_judge' || overlay == 'lane') {
            if (params != 'flag' && params != 'lane') {
                authorize = true
            }
        }
        // if(overlay=='commentator' || overlay=='sk' ){
        //     authorize = true;
        // }
        switch (authorize) {
            case true:
                $('.' + params).fadeIn(1000)
                break;
            case false:
                $('.' + params).fadeOut(1000)
                break;
        }
    })


    if (!newValue.manualChrono) {
        if (statusHeat.value != undefined && statusHeat.value.PosixTimeStart !== undefined) {
            ntpStartTime = statusHeat.value.PosixTimeStart
            startTime = parseInt(ntpStartTime);

            launchTimer()
        }
    } else {
        if (timerLaunch != null) {
            clearInterval(timerLaunch)
            timerLaunch = null;
            resetTimer();
        }
    }


    if (overlay == 'overlay_side' || overlay == 'overlay_top') {
        if (newValue.lowerthird) {
            $(function () {
                if ($("#frame").find('#lower').length > 0) {
                    $("#frame").find('#lower').show()
                    $("#lower").contents().find('body').css('background', 'transparent')
                } else {
                    let $item = $('<iframe id="lower" src="../../lowerthird/graphics/lowerthirds.html" frameBorder="0"></iframe>')
                    $item.hide()
                    $("#frame").append($item)
                    $item.contents().find('body').css('background', 'transparent')
                    $item.show()
                }
            });
        } else {
            $("#frame").find('#lower').hide()
        }
        if (newValue.attributionLane) {
            $(function () {
                if ($("#frame").find('#attributionLane').length > 0) {
                    $("#frame").find('#attributionLane').slideDown()
                } else {
                    let $item = $('<iframe id="attributionLane" class="foreground" src="../../competition-corner/graphics/attribution-lane.html" frameBorder="0"></iframe>')
                    $item.hide()
                    $("#frame").append($item)
                    setTimeout(() => {
                        $item.slideDown()
                    }, 1000)
                }
            });
        } else {
            $("#frame").find('#attributionLane').slideUp()
        }
        if (newValue.heatResults) {
            $(function () {
                if ($("#frame").find('#heatResults').length > 0) {
                    $("#frame").find('#heatResults').slideDown()
                } else {
                    let $item = $('<iframe id="heatResults" class="foreground" src="../../competition-corner/graphics/heat-result.html" frameBorder="0"></iframe>')
                    $item.hide()
                    $("#frame").append($item)
                    setTimeout(() => {
                        $item.slideDown()
                    }, 1000)
                }
            });
        } else {
            $("#frame").find('#heatResults').slideUp()
        }
        if (newValue.overallStandingDivwod) {
            $(function () {
                if ($("#frame").find('#osDivWod').length > 0) {
                    $("#frame").find('#osDivWod').slideDown()
                } else {
                    let $item = $('<iframe id="osDivWod" class="foreground" src="../../competition-corner/graphics/overall-division-workout.html" frameBorder="0"></iframe>')
                    $item.hide()
                    $("#frame").append($item)
                    setTimeout(() => {
                        $item.slideDown()
                    }, 1000)
                }
            });
        } else {
            $("#frame").find('#osDivWod').slideUp()
        }
        setTimeout(() => {
            // widthWindow = window.outerWidth;
            // heightWindowd = window.outerHeight;


            widthWindow = window.innerWidth;
            heightWindowd = window.innerHeight;
            console.log(window)
            // document.querySelector(':root').style.setProperty('--zoom', (widthWindow / 1920) * 100 + '%');
            console.log($("#frame").find("iframe").contents().find('body').css('zoom', (widthWindow / 1920) * 100 + '%'))

        }, 1000)
    }

})

function loadFont(name, url) {
    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode('@font-face{font-family: ' + name + '; src: url(' + url + ');}'));
    document.body.appendChild(newStyle)
}

Fonts.on('change', (newValue, oldValue) => {
    if (newValue != oldValue) {
        let tabFont = newValue
        Object.keys(tabFont).forEach((font) => {
            loadFont(tabFont[font].name, tabFont[font].url)
        })
    }
})

Colors.on('change', (newValue, oldValue) => {

    let tabColor = newValue

    Object.keys(newValue).forEach((color, index) => {

        let _color = tabColor[color]

        if (color == 'font-select') {

        }

        if (overlay == 'commentator' && color == 'bg__color') {
            _color = 'black'
        }

        if (color == "text_presented_by") {
            $("#prt").text(_color);
            varPresented = _color;
        }


        root.style.setProperty("--" + color, _color);
        Clrs[color] = _color
    })

})

function createKairosView() {
    workoutsMQTT.on('change', (newValue, oldValue) => {
        console.log('workoutsMQTT ', newValue)
        if (JSON.stringify(newValue) != JSON.stringify(oldValue)) {
            _workoutsFromMQTT = newValue
            createOptionWorkout(newValue)
        }
    })

    $("#workoutsMqtt").on('change', function () {
        console.log(this.value)
        let workout = _workoutsFromMQTT.find(x => x.id === parseInt(this.value))
        createOptionHeat(workout)
    })
}


function createOptionWorkout(data) {
    $("#workoutsMqtt option").remove()

    $("#workoutsMqtt").append('<option value=0>-- Please Choose Workout --</option>')

    for (let workout of data) {
        $("#workoutsMqtt").append('<option value=' + workout.id + '>' + workout.name + ' (' + workout.format.substring(0, 1).toUpperCase() + ')</option>');
    }
}

function createOptionHeat(workout) {
    console.log(workout)
    $("#heatsMqtt option").remove()

    $("#heatsMqtt").append('<option value=0>-- Please Choose Heat --</option>')

    for (let i = 0; i < workout.heatId.length; i++) {
        $("#heatsMqtt").append('<option value=' + workout.heatId[i] + '>' + workout.heatName[i] + '</option>');
    }
}

function changeHeat() {
    let data = {
        'workoutId': 0,
        'heatId': 0
    }

    data.workoutId = $('#workoutsMqtt').val()
    data.heatId = $('#heatsMqtt').val()


    resetChrono()
    nodecg.sendMessageToBundle('change_heat', 'connector', data)

    $('#changeHeat').css('background-color', 'green')
    $('#changeHeat').css('color', 'white')
    setTimeout(() => {
        $('#changeHeat').css('background-color', 'white')
        $('#changeHeat').css('color', 'black')
    }, 3000)

}


function startChrono() {
    let data = {
        'minutes': 0,
        'secondes': 0,
        'type': 'time',
        'count': 5
    }

    data.type = heatInfos.value[0].type
    data.count = $('#countTimer').val()

    let timeCap = heatInfos.value[0].timeCap

    data.minutes = parseInt(timeCap.split(':')[1])
    data.secondes = parseInt(timeCap.split(':')[2])


    console.log(data)

    nodecg.sendMessageToBundle('start_chrono', 'connector', data)


    $('#startChrono').css('background-color', 'green')
    $('#startChrono').css('color', 'white')
    setTimeout(() => {
        $('#startChrono').css('background-color', 'white')
        $('#startChrono').css('color', 'black')
    }, 3000)

}

function resetChrono() {
    nodecg.sendMessage('reset_timer')
    nodecg.sendMessageToBundle('reset_chrono_heat', 'connector')
}

function reloadWorkout() {
    nodecg.sendMessageToBundle('reloadWorkout', 'connector')
}



const videoInfos = nodecg.Replicant('videoInfos', 'video')
const videoShow = nodecg.Replicant('videoShow', 'video')

let videocontainer = document.getElementById('video');
let videosource = document.getElementById('sourceVid');

videoShow.on('change', (newValue) => {
    console.group();
    console.log("Video")
    console.log(videoInfos.value);
    console.log(videoShow.value);
    console.groupEnd();
    switch (newValue) {
        case true:

            videosource.setAttribute('src', videoInfos.value);
            videocontainer.load();
            videocontainer.play();

            $('#video').fadeIn(1000)
            break;
        case false:
            $('#video').fadeOut(1000)
            break;
    }
})

nodecg.listenFor('reset_timer', () => {
    if (timerLaunch != null) {
        clearInterval(timerLaunch)
        timerLaunch = null;
    }
    resetTimer()
})
