
function timeToDateTime(time) {
    var times = time.split(':');
    if (times.length == 3) {
        var hours = times[0];
        var minutes = times[1];
        var secmili = times[2].split('.');
        var seconds = secmili[0];
        var mili = secmili[1];

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();

        // Pas de milliseconds dans le constructeur Date
        return new Date(year, month, day, hours, minutes, seconds);
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

function msToTimeSK(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    s = (s - mins) / 60;
    var hrs = s % 60;
    if (secs < 10) { secs = '0' + secs }
    if (mins < 10) { mins = '0' + mins }
    if (hrs < 10) { hrs = '0' + hrs }
    return mins + ':' + secs;
}


function typeWorkout(data) {

    //! on traite le wod en cours 
    let typeWod = data[0].type;
    let formatWod = data[0].format
    let timecap = data[0].timeCap
    let heatId = data[0].heatId;

    tc = timecap.split(':');

    if (tc[0] != "00") {
        timecap = tc[0] + ":" + tc[1] + ":" + tc[2];
    }
    else if (tc[1] != "00") {
        timecap = tc[1] + ":" + tc[2];
    }
    else {
        timecap = "0'" + tc[2];
    }

    if (ntpStartTime != undefined) {
        // endTime = timeToDateTime(ntpStartTime).setMinutes(startTime.getMinutes() + parseInt(tc[1] || 0));
        var timecapIn = ((parseInt(tc.length ? parseInt(tc[1]) : 0) * 60) + parseInt(tc.length ? parseInt(tc[2]) : 0)) * 1000;
        endTime = parseInt(ntpStartTime) + parseInt(timecapIn)
    }
    return ({ typeWod, formatWod, timecap, heatId })
}

function treatReptarget(repTarget) {
    var textRep = ""
    if (heat.typeWod == "amrap") {
        textRep = "MAX REPS"
    }
    else if (heat.typeWod == "time") {
        if (repTarget == undefined) {
            textRep = "FOR TIME";
        }
        else {
            textRep = repTarget + " REPS";
        }
    }
    return textRep
}

function treatDisplayName(displayName) {
    if (heat.formatWod == "individual") {
        let char = [];
        char = displayName.toString().split(/\s+/)
        newName = char[0].substring(0, 1) + ". " + char[1] + " " + (char[2] || "")
    }
    else {
        newName = displayName.toLowerCase().replace("crossfit", "");
    }
    return newName.toUpperCase();
}

let auth = {};

function treatWorkouts(data) {

    auth = {}

    for (let workout of data) {
        const { description, mvt_id, mvt_names, mvt_reps, mvt_units, increments, total_reps, rounds, rep_per_rounds, division, mvt_type } = workout

        if (mvt_id.length > 0) {
            auth[division] = true
        } else {
            auth[division] = false
        }

        console.log('Workout :', auth)
    }
}

function treatDivisions(divisions, newAth) {

    let leaderboards = [];

    for (var y = 0; y < divisions.length; y++) {
        let _athletes = new Array();
        for (let i = 0; i < newAth.length; i++) {
            // console.log("i =", i)
            if (newAth[i] != undefined) {
                if (newAth[i].division == divisions[y]) {
                    _athletes[i] = JSON.parse(JSON.stringify(athletes_init));
                    _athletes[i] = Object.assign({}, _athletes[i], newAth[i])
                    if (_athletes[i].countryCode == "" || _athletes[i].countryCode == null) { _athletes[i].countryCode = "FR" }
                    else {
                        for (let f = 0; f < flag.length; f++) {
                            if (_athletes[i].countryCode == flag[f]["3L"]) {
                                _athletes[i].countryCode = flag[f]["2L"];
                                break;
                            }
                        }
                    }
                }
            }
        }
        // console.log(_athletes)
        leaderboards[y] = _athletes
    }
    return leaderboards;

}


function ascendingRank(a, b) { return Number(a.CurrentRank) - Number(b.CurrentRank) }
function descendingRank(a, b) { return Number(a.CurrentRank) + Number(b.CurrentRank) }
function ascendingLane(a, b) { return Number(a.lane) - Number(b.lane) }
function descendingLane(a, b) { return Number(a.lane) + Number(b.lane) }

function reposition(leaderboard, athletes) {
    switch (overlay) {
        case 'overlay_top':
            repoLeft(leaderboard, athletes)
            break;
        default:
            repoTop(leaderboard, athletes);
            break;
    }

}

function repoLeft(lead_, aths_) {
    let y = 0;
    let margin = 0
    Object.values(aths_).forEach(elm => {
        if (elm.$item.css('margin') != '') {
            margin = parseInt(elm.$item.css('margin').replace('px', ''))
        } else {
            margin = 0;
        }
        console.log(lead_)
        if (elm.$item.find(lead_) != undefined) {
            elm.$item.css("left", y + "px");
            if (elm.$item.is(':hidden')) {
                y += 0 + margin
            } else {
                y += elm.$item.width() + margin;
            }
        }
    })
}

function repoTop(lead_, aths_) {
    //initialisation la position de départ
    let y = parseInt($(lead_ + " .header").css('height').replace('px', ''));
    Object.values(aths_).forEach(elm => {
        if (elm.$item.find(lead_) != undefined) {
            elm.$item.css("top", y + "px");
            y += elm.$item.height();
            y += parseInt(elm.$item.css('margin').split(' ')[0].replace('px', ''));
        }
    })
}

function fetchNewData(data, lane) {
    for (var x in data) {
        if ((data[x].lane == lane) == true) {
            return data[x];
        }
    }
    return null;
}


function mvtIndexForTime(nbrReps, division) {
    // console.log("FOR TIMENbr De reps = ", nbrReps, " & Division = ", division)
    let res = nbrReps;
    let index = 0;
    let arrayMvt = [];
    // console.log(workouts)
    for (let wod of workouts) {
        if (wod.division == division) {
            if (res != 0) {
                // console.log("RepTarget= ", wod.mvt_reps[0])
                if (res == wod.total_reps && wod.mvt_names[wod.mvt_names.length - 1] == "Sprint") {
                    res = 0
                    index = wod.mvt_names.length - 1
                }
                else {
                    while (res >= 0) {
                        res = (res - wod.mvt_reps[index])
                        // console.log("je suis à l'index : ", index)
                        if (res >= 0) {
                            index++;
                        }
                    }
                }
            }
            else {
                index = 0
                res = -wod.mvt_reps[index];
            }
            for (let i = index; i < wod.mvt_names.length; i++) {
                mvtToUP = wod.mvt_names[i].toLowerCase();
                arrayMvt.push("<span>" + wod.mvt_names[i].toLowerCase() + "</span>")
            }
            return ({ 'scoreAbsMvt': wod.mvt_reps[index] + res, 'scoreRelMvt': res, 'id': wod.mvt_id[index], 'repTarget': wod.mvt_reps[index], 'rounds': 0, 'totalReps': wod.total_reps, 'mvtNames': wod.mvt_names[index], 'arrayMvt': arrayMvt })
        }
    }
    return ({ 'scoreAbsMvt': res, 'scoreRelMvt': res, 'id': 0, 'repTarget': 0, 'rounds': 0, 'totalReps': wod.total_reps, 'mvtNames': 'WORKOUT', 'arrayMvt': ['WORKOUTS'] })
}

function mvtIndexAmrap(nbrReps, division) {
    let res = nbrReps;
    let index = 0;
    let repTarget;
    let repAmrap = 0;
    let arrayMvt = [];
    for (let wod of workouts) {
        if (wod.division == division) {
            let totalRep = wod.total_reps;
            if (res != 0) {
                if (wod.mvt_reps[index] == 0) {
                    return ({ 'scoreAbsMvt': (wod.mvt_reps[index] + res) || res, 'scoreRelMvt': res, 'id': wod.mvt_id[index] || 0, 'repTarget': 'MAX' || res, 'mvtNames': wod.mvt_names[index].replaceAll('_', ' ') || 'WORKOUT', 'rounds': (rounds + 1) || 1, 'totalReps': (wod.total_reps) || res, 'arrayMvt': arrayMvt || {} })
                } else {
                    if (totalRep != 0) {
                        rounds = Math.floor(res / totalRep) + 1;
                        if (rounds > 1) {
                            res -= totalRep * (rounds - 1);
                        }
                        repAmrap = res;
                    } else {
                        rounds = 1;
                        repAmrap = nbrReps;
                    }
                    while (res >= 0) {
                        res -= wod.mvt_reps[index];
                        if (res >= 0) {
                            index++;
                        }
                        if (wod.mvt_reps[index] == 0) {
                            break;
                        }
                    }
                    repMvt = wod.mvt_reps[index] + res;
                    repTarget = wod.mvt_reps[index] || 'MAX'
                }
            }
            else {
                rounds = 1;
                repTarget = wod.mvt_reps[0] || 'MAX'
                repMvt = 0;
            }
            for (let i = index; i < wod.mvt_names.length; i++) {
                mvtToUP = wod.mvt_names[i].toLowerCase();
                arrayMvt.push("<span>" + wod.mvt_names[i].toLowerCase() + "</span>")
            }
            return ({ 'scoreAbsMvt': repMvt, 'scoreRelMvt': repAmrap, 'id': wod.mvt_id[index] || 0, 'repTarget': repTarget || res, 'mvtNames': wod.mvt_names[index].replaceAll('_', ' ') || 'WORKOUT', 'rounds': (rounds) || 0, 'totalReps': totalRep || nbrReps, 'arrayMvt': arrayMvt || {} })
        }
    }
}

function mvtIndexRepMax(nbrReps, loadAttempted) {
    let res = nbrReps;
    let index = 0;
    let arrayMvt = [];
    for (let wod of workouts) {
        if (true) {
            if (res != 0) {
                // console.log("RepTarget= ", wod.mvt_reps[0])
                if (res == wod.total_reps && wod.mvt_names[wod.mvt_names.length - 1] == "Sprint") {
                    res = 0
                    index = wod.mvt_names.length - 1
                }
                else {
                    while (res >= 0) {
                        res = (res - wod.mvt_reps[index])
                        // console.log("je suis à l'index : ", index)
                        if (res >= 0) {
                            index++;
                        }
                    }
                }
            }
            else {
                index = 0
                res = -wod.mvt_reps[index];
            }
            for (let i = index; i < wod.mvt_names.length; i++) {
                mvtToUP = wod.mvt_names[i].toLowerCase();
                arrayMvt.push("<span>" + wod.mvt_names[i].toLowerCase() + "</span>")
            }
            return ({ 'scoreAbsMvt': nbrReps, 'scoreRelMvt': res, 'id': 0, 'repTarget': loadAttempted, 'rounds': 0, 'totalReps': 1, 'mvtNames': 'Barbell', 'arrayMvt': ['BARBELL'] })
        }
    }
    return ({ 'scoreAbsMvt': res, 'scoreRelMvt': res, 'id': 0, 'repTarget': 0, 'rounds': 0, 'totalReps': 1, 'mvtNames': 'BARBELL', 'arrayMvt': ['WORKOUTS'] })
}


function launchAutomaticSchedule() {
    timerAutomatic2 = setTimeout(() => {

        // nodecg.sendMessageToBundle('heat_result', 'connector', { workoutHeatSelected: eventInfos.value.workoutId, heatSelected: eventInfos.value.heatId, num_heats: 10 })

        let config = setupLeaderboard.value;
        console.log("before")
        console.table(configBefore)
        configBefore = setupLeaderboard.value;

        config.box_chrono = false;
        config.box_heat = false;
        config.box_logo = false;
        config.box_bandeau = false;
        config.attributionLane = false;

        setupLeaderboard.value = config;

        timerAutomatic3 = setTimeout(() => {

            let config = setupLeaderboard.value;

            // config.box_chrono = configBefore.box_chrono;
            // config.box_heat = configBefore.box_heat;
            // config.box_logo = configBefore.box_logo;
            // config.heatResults = false;


            setupLeaderboard.value = configBefore;

        }, 10000)
    }, 2000)
}