
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

function timeToTimestamp(time) {
    // trame : 00:00:06.10
    var times = time.split(':');
    if (times.length == 3) {
        var hours = parseInt(times[0]) * 3600;
        var minutes = parseInt(times[1]) * 60000;
        var secmili = times[2].split('.');
        var seconds = parseInt(secmili[0]) * 1000;
        var mili = parseInt(secmili[1]);


        var timestamp = hours + minutes + seconds + mili;

        // Pas de milliseconds dans le constructeur Date
        return timestamp;
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

function msToTime2(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (secs < 10) { secs = '0' + secs }
    if (mins < 10) { mins = '0' + mins }
    return mins + ':' + secs + '.' + ms;
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
    let char = [];
    let newName = "";
    if (heat.formatWod == "individual") {
        switch (setupLeaderboard.value.nameSelect) {
            case 'first':
                char = displayName.toString().split(/\s+/)
                newName = char[0]
                break;
            case 'last':
                char = displayName.toString().split(/\s+/)
                newName = char[1] + " " + (char[2] || "")
                break;
            case 'pointFirst':
                char = displayName.toString().split(/\s+/)
                newName = char[0].substring(0, 1) + ". " + char[1] + " " + (char[2] || "")
                break;
            case 'full':
                newName = displayName.toString()
                break;
        }

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

        // console.log('Workout :', auth)
    }
}


const athletes_init = {
    "lane": 0,
    "displayName": "",
    "rank": 0,
    "affiliate": "",
    "division": "",
    "status": "",
    "OldRank": 0,
    "CurrentRank": 0,
    "score_abs": 0,
    "score_rel": 0,
    "currentRound": 0,
    "tieBreak": "",
    "result": "",
    "currentMvt": {}
}

function treatDivisions(divisions, newAth) {

    let leaderboards = [];

    for (let y = 0; y < divisions.length; y++) {
        let _athletes = new Array();
        for (let i = 0; i < newAth.length; i++) {
            if (newAth[i] != undefined) {
                // if (overlay != 'overlay_wpa') {
                if (newAth[i].division == divisions[y]) {
                    _athletes.push(JSON.parse(JSON.stringify(athletes_init)));
                    _athletes[_athletes.length - 1] = { ..._athletes[i], ...newAth[i] }
                    if (_athletes[_athletes.length - 1].countryCode == "" || _athletes[_athletes.length - 1].countryCode == null) { _athletes[_athletes.length - 1].countryCode = "FR" }
                    else {
                        for (const element of flag) {
                            if (_athletes[_athletes.length - 1].countryCode == element["3L"]) {
                                _athletes[_athletes.length - 1].countryCode = element["2L"];
                                break;
                            }
                        }
                    }
                }
                // } else {
                //     if (newAth[i].affiliate == divisions[y]) {
                //         _athletes.push(JSON.parse(JSON.stringify(athletes_init)));
                //         _athletes[_athletes.length - 1] = { ..._athletes[i], ...newAth[i] }
                //         if (_athletes[_athletes.length - 1].countryCode == "" || _athletes[_athletes.length - 1].countryCode == null) { _athletes[_athletes.length - 1].countryCode = "FR" }
                //         else {
                //             for (const element of flag) {
                //                 if (_athletes[_athletes.length - 1].countryCode == element["3L"]) {
                //                     _athletes[_athletes.length - 1].countryCode = element["2L"];
                //                     break;
                //                 }
                //             }
                //         }
                //     }
                // }
            }
        }
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
        case 'overlay_wpa':
            repoWpa(leaderboard, athletes);
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

function noJudge(ath) {
    ath.$item.find('rank').text('DNF');
    ath.$item.css('opacity', '0.2');
}

function withJudge(ath) {
    ath.$item.css('opacity', '1');
}

function repoTop(lead_, aths_) {
    //initialisation la position de départ
    let y = parseInt($(lead_ + " .header").css('height').replace('px', ''));
    // console.table("Aths : ", aths_)
    Object.values(aths_).forEach(elm => {
        if (elm.$item.find(lead_) != undefined) {
            if (true) {
                // if (elm.status != '0') {
                !elm.$item.is(':visible') && elm.$item.show()
                elm.$item.css("top", y + "px");
                y += elm.$item.height();
                y += parseInt(elm.$item.css('margin').split(' ')[0].replace('px', ''));
            } else {
                // elm.$item.hide();
            }
        }
    })
}

function repoWpa(lead_, aths_) {
    //initialisation la position de départ
    let y = parseInt($(lead_ + " .header").css('height').replace('px', ''));
    //console.table("Aths : ", aths_)
    Object.values(aths_).forEach(elm => {
        if (elm.$item.find(lead_) != undefined) {
            if (elm.status != '0') {
                !elm.$item.is(':visible') && elm.$item.show()
                elm.$item.css("top", y + "px");
                y += elm.$item.height();
                y += parseInt(elm.$item.css('margin').split(' ')[0].replace('px', ''));
            } else {
                elm.$item.hide();
            }
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




/////////////// MVT


function TreatMvt(elementAth) {
    let currentMvt = {}

    // On regarde si la division a bien des mouvements, si le type de workout est un repmax
    // console.log(workouts.find((element) => element.division == elementAth.division))
    // console.log("Workout lenght", workouts.length)
    // console.log("elementAth Division", elementAth.division)
    // console.log("Workout ", workouts)
    // console.log("Workout ID", workouts.find((element) => element.division == elementAth.division).mvt_id.length)

    if ((auth[elementAth.division] || heat.typeWod == 'repmax') && workouts.length > 0 && workouts.find((element) => element.division == elementAth.division).mvt_id.length > 1) {
        if (elementAth.result == "") {
            switch (heat.typeWod) {
                case 'amrap':
                    currentMvt = mvtIndexAmrap(elementAth.score_abs, elementAth.division, elementAth.log_round_time[0].length + 1)
                    break;
                case 'repmax':
                    // console.log('Load' + elementAth.loadAttempted)
                    currentMvt = mvtIndexRepMax(elementAth.score_abs, elementAth.loadAttempted)
                    break;
                case 'time':
                    currentMvt = mvtIndexForTime(elementAth.score_abs, elementAth.division)
                    break;
                default:
                    break;
            }
        } else {
            currentMvt = mvtIndexFinish(elementAth.division)
        }
    } else if (heat.typeWod == 'repmax') {
        if (elementAth.result == "") {
            currentMvt = mvtIndexRepMax(elementAth.score_abs, elementAth.loadAttempted)
        }
    } else {
        currentMvt = {
            'scoreAbsMvt': elementAth.score_abs,
            'scoreRelMvt': elementAth.score_rel,
            'id': 1,
            'repTarget': 0,
            'mvtNames': 'WORKOUT',
            'rounds': 0,
            'totalReps': 0,
            'arrayMvt': {}
        }
    }

    return currentMvt;
}

function mvtIndexFinish(division) {
    // console.log("FINISH - Division = ", division)
    let index = 0;
    let arrayMvt = [];
    for (let wod of workouts) {
        if (wod.division == division) {

            return ({
                'scoreAbsMvt': wod.totalRep,
                'scoreRelMvt': 0,
                'id': wod.mvt_id[wod.mvt_id.length - 1],
                'repTarget': wod.repTarget,
                'mvtNames': 'FINISH',
                'rounds': 0,
                'totalReps': wod.totalRep,
                'arrayMvt': {}
            })
        }
    }
    return ({ 'scoreAbsMvt': 0, 'scoreRelMvt': 0, 'id': 0, 'repTarget': 0, 'rounds': 0, 'totalReps': 0, 'mvtNames': 'WORKOUT', 'arrayMvt': ['WORKOUTS'] })
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
                let r = 'MAX';
                if (wod.mvt_reps[i] != 0) {
                    r = wod.mvt_reps[i].toString().toLowerCase()
                }
                arrayMvt.push("<span>" + r + ' ' + wod.mvt_names[i].toLowerCase() + "</span>")
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

                    rounds = 1;
                    repTarget = wod.mvt_reps[0] || 'MAX'
                    repMvt = 0;
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
                let r = 'MAX';
                if (wod.mvt_reps[i] != 0) {
                    r = wod.mvt_reps[i].toString().toLowerCase()
                }
                arrayMvt.push("<span>" + r + ' ' + wod.mvt_names[i].toLowerCase() + "</span>")
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
                let r = 'MAX';
                if (wod.mvt_reps[i] != 0) {
                    r = wod.mvt_reps[i].toString().toLowerCase()
                }
                arrayMvt.push("<span>" + r + ' ' + wod.mvt_names[i].toLowerCase() + "</span>")
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
        // console.log("before")
        // console.table(configBefore)
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


function changeColor(ath, element) {
    let rank = ath.CurrentRank
    if (overlay == 'overlay_top' || overlay == 'versus') {
        rank != 1 ? rank = 4 : rank
    }

    if (overlay == 'overlay_wpa') { return };
    switch (rank) {
        case 1:
            ath.$item.find(element).addClass('first_rank')
            ath.$item.find(element).removeClass('initial_rank_top second_rank third_rank other_rank', false)
            overlay == 'versus' && ath.$item.find(element).removeClass('initial_rank_versus')
            break;
        case 2:
            ath.$item.find(element).addClass('second_rank')
            ath.$item.find(element).toggleClass('first_rank third_rank other_rank', false)
            break;
        case 3:
            ath.$item.find(element).addClass('third_rank')
            ath.$item.find(element).toggleClass('second_rank first_rank other_rank', false)
            break;
        default:
            if (overlay != 'overlay_top') {
                ath.$item.find(element).addClass('other_rank')
                ath.$item.find(element).toggleClass('second_rank third_rank first_rank', false)
            } else if (overlay == 'versus') {
                ath.$item.find(element).addClass('initial_rank_versus')
                ath.$item.find(element).removeClass('first_rank second_rank third_rank other_rank')
            } else {
                ath.$item.find(element).addClass('initial_rank_top')
                ath.$item.find(element).removeClass('first_rank second_rank third_rank')
            } break;
    }
}

function eraseInitialRank(ath, element) {


    if (overlay == 'overlay_wpa') { return };
    if (overlay != 'overlay_top') {
        // ath.$item.find(element).addClass('')
        ath.$item.find(element).removeClass('initial_rank initial_rank_ath other_rank other_rank_ath finish_rank finish_rank_ath second_rank second_rank_ath third_rank third_rank_ath first_rank first_rank_ath', false)
    } else if (overlay == 'versus') {
        ath.$item.find(element).addClass('initial_rank_versus')
        ath.$item.find(element).removeClass(' first_rank second_rank third_rank other_rank')
    } else {
        ath.$item.find(element).addClass('initial_rank_top')
        ath.$item.find(element).removeClass('first_rank second_rank third_rank')
    }
}

function initialRankChange(ath, element) {

    if (overlay == 'overlay_wpa') { return };
    if (overlay != 'overlay_top') {
        ath.$item.find(element).addClass('initial_rank')
        ath.$item.find(element).toggleClass('finish_rank finish_rank_ath second_rank third_rank first_rank', false)
    } else if (overlay == 'versus') {
        ath.$item.find(element).addClass('initial_rank_versus')
        ath.$item.find(element).removeClass('first_rank second_rank third_rank other_rank')
    } else {
        ath.$item.find(element).addClass('initial_rank_top')
        ath.$item.find(element).removeClass('first_rank second_rank third_rank')
    }
}

function changeColorFinish(ath, element) {

    if (overlay == 'overlay_wpa') { return };
    // console.log("ath :", ath)
    // console.log("element : ", element)
    ath.$item.find(element).addClass('finish_rank')
    ath.$item.find(element).removeClass('initial_rank first_rank second_rank third_rank other_rank', false)
    overlay == 'versus' && ath.$item.find(element).removeClass('initial_rank_versus')
}

function changeColorFinishAth(ath, element) {

    if (overlay == 'overlay_wpa') { return };
    ath.$item.find(element).addClass('finish_rank_ath')
    ath.$item.find(element).removeClass('initial_rank_top_ath first_rank_ath second_rank_ath third_rank_ath other_rank_ath', false)
    overlay == 'versus' && ath.$item.find(element).removeClass('initial_rank_versus')
}

function changeColorAth(ath, element) {

    if (overlay == 'overlay_wpa') { return };
    let rank = ath.CurrentRank
    if (overlay == 'overlay_top' || overlay == 'versus') {
        rank != 1 ? rank = 4 : rank
    }
    switch (rank) {
        case 1:
            ath.$item.find(element).addClass('first_rank_ath')
            ath.$item.find(element).removeClass('initial_rank_top_ath second_rank_ath third_rank_ath other_rank_ath', false)
            overlay == 'versus' && ath.$item.find(element).removeClass('initial_rank_versus')
            break;
        case 2:
            ath.$item.find(element).addClass('second_rank_ath')
            ath.$item.find(element).toggleClass('first_rank_ath third_rank_ath other_rank_ath', false)
            break;
        case 3:
            ath.$item.find(element).addClass('third_rank_ath')
            ath.$item.find(element).toggleClass('second_rank_ath first_rank_ath other_rank_ath', false)
            break;
        default:
            if (overlay != 'overlay_top') {
                ath.$item.find(element).addClass('other_rank_ath')
                ath.$item.find(element).toggleClass('second_rank_ath third_rank_ath first_rank_ath', false)
            } else if (overlay == 'versus') {
                ath.$item.find(element).addClass('initial_rank_versus_ath')
                ath.$item.find(element).removeClass('first_rank_ath second_rank_ath third_rank_ath other_rank_ath')
            } else {
                ath.$item.find(element).addClass('initial_rank_top_ath')
                ath.$item.find(element).removeClass('first_rank_ath second_rank_ath third_rank_ath')
            } break;
    }
}



function changeRank(elementAth) {
    if (overlay == 'overlay_side' || overlay == 'overlay_side_v1') {
        if (elementAth.CurrentRank != elementAth.OldRank && elementAth.score_abs != 0) {
            if (elementAth.CurrentRank < elementAth.OldRank) {
                // elementAth.$item.find('.rank').addClass('up_rank')
                elementAth.$item.find('.triangle').addClass('up_rank')
                elementAth.$item.find('.triangle').addClass('triangle-up')
            } else if (elementAth.CurrentRank > elementAth.OldRank) {
                // elementAth.$item.find('.rank').addClass('down_rank')
                elementAth.$item.find('.triangle').addClass('triangle-down')
                elementAth.$item.find('.triangle').addClass('triangle-down')

            }
            elementAth.$item.find('.triangle').show()
            setTimeout(() => {
                // elementAth.$item.find('.rank').removeClass('up_rank down_rank')
                elementAth.$item.find('.triangle').removeClass('triangle-down triangle-up')
                elementAth.$item.find('.triangle').hide()

            }, 1500)
        }
    }

    changeLaneToRank(elementAth)
}

function treatBigScreenMvt(elementAth) {
    if (heat.typeWod == 'amrap' && !Number.isNaN(elementAth.currentMvt.rounds)) {
        percent = (elementAth.currentMvt.scoreRelMvt / elementAth.currentMvt.totalReps) * 95
        elementAth.$item.find(".rounds").text("R" + (elementAth.currentMvt.rounds));
        elementAth.$item.find(".popup").text("R" + (elementAth.currentMvt.rounds) + ' - ' + elementAth.currentMvt.mvtNames);
        elementAth.$item.find(".popup_top").text("R" + (elementAth.currentMvt.rounds) + ' - ' + elementAth.currentMvt.mvtNames);
    } else {
        percent = (elementAth.score_abs / elementAth.currentMvt.totalReps) * 95
        elementAth.$item.find(".popup").text(elementAth.currentMvt.mvtNames);
        elementAth.$item.find(".popup_top").text(elementAth.currentMvt.mvtNames);
    }
    elementAth.$item.find(".popup").show();
    elementAth.$item.find(".popup_top").show();
    $('#circle' + elementAth.lane).css("transform", "translateX(" + percent + "%)");
}

function treatTimeResult(time) {
    var t = time.toString().split(':');
    var result = "";
    if (t[0] != "00") {
        result = t[0] + ":" + t[1] + ":" + t[2].substring(0, 2);
    }
    else if (t[1] != "00") {
        result = t[1] + ":" + t[2].substring(0, 2);
    }
    else {
        result = "00:" + t[2].substring(0, 2);
    }
    return result;
}

function treatFinishStatus(elementAth) {
    let result = elementAth.result;
    var t = result.toString().split(':');

    if (t[0] != "00") {
        result = t[0] + ":" + t[1] + ":" + t[2].substring(0, 2);
    }
    else if (t[1] != "00") {
        result = t[1] + ":" + t[2].substring(0, 2);
    }
    else {
        result = "00:" + t[2].substring(0, 2);
    }

    console.log("Resultat Final : ", result)

    if (overlay == "overlay_side" || overlay == "overlay_wpa") {

        elementAth.$item.find(".score").show()
        elementAth.$item.find(".score").text(result);
        elementAth.$item.find(".popup").hide();
        elementAth.$item.find(".popup_top").text(result);
        elementAth.$item.find(".popup_top").hide();


        // elementAth.$item.find(".score").text('FIN')
    } else {
        elementAth.$item.find(".popup").text(result);
        elementAth.$item.find(".popup").show();
        elementAth.$item.find(".popup_top").text(result);
        elementAth.$item.find(".popup_top").show();
        elementAth.$item.find(".score").text('FIN')
    }
    if (overlay == 'progression') {
        $('#circle' + elementAth.lane).css("transform", "translateX(95%)");
    }
}

function treatTimeCapStatus(elementAth) {
    let result = elementAth.score_abs;
    let total = elementAth.currentMvt.totalReps;
    let text2 = total != undefined ? (total != 1 ? '/' + total : '') : ''
    let text = result

    if (overlay == "overlay_side" || overlay == "overlay_wpa") {
        elementAth.$item.find(".popup").hide();
        elementAth.$item.find(".popup_top").hide();
        elementAth.$item.find(".score").show();
        if (overlay == 'overlay_side') {
            elementAth.$item.find(".score").text(text + ' ' + setupLeaderboard.value.unitSelect);
        } else {
            elementAth.$item.find(".score").text(text);
        }
    } else {
        elementAth.$item.find(".popup").show();
        elementAth.$item.find(".popup_top").show();
        elementAth.$item.find(".score").text('FIN');
        elementAth.$item.find(".popup").text(result + ' ' + setupLeaderboard.value.unitSelect);
        elementAth.$item.find(".popup_top").text(result + ' ' + setupLeaderboard.value.unitSelect);
    }
}


function treatTextMvt(mvts) {
    if (overlay == "versus" && heat.typeWod != 'repmax') {
        if (mvts != "") {
            $('.box_mvt').slideDown(1000)
            $('.box_mvt').find('#mvt').html(mvts)
        } else {
            $('.box_mvt').hide()
        }
    } else {
        $('#mvt').html(mvts)
        $('.mvt').html(mvts)
    }
}


function showSprint(elementAth) {
    elementAth.$item.find(".popup").text("FINISH");
    elementAth.$item.find(".popup").show();
    elementAth.$item.find(".score").text(chrono);
}

function showRepMax(elementAth) {
    // console.log('REP TARGET : ' + elementAth.currentMvt.repTarget)
    if (elementAth.currentMvt.repTarget != elementAth.currentMvt.scoreAbsMvt) {
        if (elementAth.currentMvt.repTarget != 0) {
            elementAth.$item.find(".popup").html('ATTEMPTS &#10140; ' + elementAth.currentMvt.repTarget + ' ' + setupLeaderboard.value.unitSelect);
            overlay == 'versus' ? elementAth.$item.find(".popup").slideDown(1000) : elementAth.$item.find(".popup").show();
            elementAth.$item.find(".popup_top").html('ATTEMPTS &#10140; ' + elementAth.currentMvt.repTarget + ' ' + setupLeaderboard.value.unitSelect);
            overlay == 'versus' ? elementAth.$item.find(".popup_top").slideDown(1000) : elementAth.$item.find(".popup_top").fadeIn(1000);
        }
    } else {
        elementAth.$item.find(".popup").html('');
        overlay == 'versus' ? elementAth.$item.find(".popup").slideUp(1000) : elementAth.$item.find(".popup").fadeOut(1000);
        elementAth.$item.find(".popup_top").html('');
        overlay == 'versus' ? elementAth.$item.find(".popup_top").slideUp(1000) : elementAth.$item.find(".popup_top").fadeOut(1000);
    }
    elementAth.$item.find(".score").text(elementAth.currentMvt.scoreAbsMvt + ' ' + setupLeaderboard.value.unitSelect);
}

function showRepMvtInScore(elementAth) {
    elementAth.$item.find(".score").show();
    switch (setupLeaderboard.value.scoreConfig) {
        case 'abs_score':
            elementAth.$item.find(".score").text(elementAth.score_abs)
            hideMvtInPopup(elementAth)
            break;
        case 'rel_score':
            elementAth.$item.find(".score").text(elementAth.score_rel)
            hideMvtInPopup(elementAth)
            break;
        case 'mvt_score':
            if (elementAth.currentMvt.mvtNames.toUpperCase() != "WORKOUT") {
                elementAth.$item.find(".score").text(elementAth.currentMvt.scoreAbsMvt + "/" + elementAth.currentMvt.repTarget);
                showMvtInPopup(elementAth)
            } else {
                elementAth.$item.find(".score").text(elementAth.currentMvt.scoreAbsMvt);
                hideMvtInPopup(elementAth)
            }
            break;
        case 'mvt_total_score':
            if (elementAth.currentMvt.mvtNames.toUpperCase() != "WORKOUT") {
                elementAth.$item.find(".score").text(elementAth.score_abs + (elementAth.currentMvt.totalReps != 1 ? ('/' + elementAth.currentMvt.totalReps) : '') + ' (' + elementAth.currentMvt.scoreAbsMvt + ')');
                showMvtInPopup(elementAth)
            } else {
                elementAth.$item.find(".score").text(elementAth.currentMvt.scoreAbsMvt);
                hideMvtInPopup(elementAth)
            }
            break;
        default:
    }
}
function hideRepMvtInScore(elementAth) {
    elementAth.$item.find(".score").hide();
}

function showMvtInPopup(elementAth) {
    const reg = new RegExp("\(([^\)]+)\).", "g")
    let mvt = elementAth.currentMvt.mvtNames.replace(/(([^\)]+)\).)/g, "")
    // console.log(mvt)
    elementAth.$item.find(".popup").show();
    elementAth.$item.find(".popup").text(mvt);
    elementAth.$item.find(".popup_top").show();
    elementAth.$item.find(".popup_top").text(mvt);
}

function hideMvtInPopup(elementAth) {
    elementAth.$item.find(".popup").hide();
    elementAth.$item.find(".popup").text();
    elementAth.$item.find(".popup_top").hide();
    elementAth.$item.find(".popup_top").text();
}


function treatLeaderboardAuto() {
    if ($('.leaderboard').is(':visible')) {
        if (overlay.search("overlay") >= 0 || overlay == 'versus') {

            timerAutomatic1 = setTimeout(() => {
                // $('#box_svg').slideUp(1000)
                // $('.leaderboard').slideUp(1000)
                // $('.box_chrono').slideUp(1000)
                // $('.box_heat').slideUp(1000)
                // $(".mainSponsor").slideUp(1000)
                if (overlay == 'versus') {

                    $('.box_mvt').slideUp(1000)
                }
                if (setupLeaderboard.value.automaticSchedule) {
                    launchAutomaticSchedule()
                }
            }, 5000)
        }
    }
}


function treatDisplayMvtForOthers(elementAth, idToCompare) {
    // Si l'athlète présent avant est à un mouvement différent de toi, on affiche le mouvement)
    let repTarget = elementAth.currentMvt.repTarget;

    if (repTarget == 0) {
        repTarget = "MAX"
    }
    let mvt = elementAth.currentMvt.mvtNames.replace(/(([^\)]+)\).)/g, "")

    let nextMvt = ''
    if (elementAth.currentMvt.arrayMvt.length > 2) {
        nextMvt = elementAth.currentMvt.arrayMvt[1].replace('<span>', "").replace('</span>', "")
    }

    let textTomvt = repTarget + ' ' + mvt;

    if (elementAth.currentMvt.id != idToCompare) {
        if (heat.typeWod == 'amrap' && !Number.isNaN(elementAth.currentMvt.rounds)) {
            elementAth.$item.find(".rounds").text("R" + (elementAth.currentMvt.rounds));
            elementAth.$item.find(".popup").text("R" + (elementAth.currentMvt.rounds) + ' - ' + textTomvt);
            elementAth.$item.find(".popup_top").text("R" + (elementAth.currentMvt.rounds) + ' - ' + textTomvt);
        } else {
            elementAth.$item.find(".popup").text(textTomvt);
            elementAth.$item.find(".popup_top").text(textTomvt);
        }
        if (overlay != "overlay_wpa") {
            elementAth.$item.find(".popup").show();
            elementAth.$item.find(".popup_top").show();
        }
    }
    else {
        elementAth.$item.find(".popup").hide();
        elementAth.$item.find(".popup_top").hide();
    }
}

function treatDisplayMvtFirst(elementAth) {
    let mvt = elementAth.currentMvt.mvtNames.replace(/(([^\)]+)\).)/g, "")
    let repTarget = elementAth.currentMvt.repTarget;

    if (repTarget == 0) {
        repTarget = "MAX"
    }
    // console.log(mvt)
    let nextMvt = ''
    if (elementAth.currentMvt.arrayMvt.length > 2) {
        nextMvt = elementAth.currentMvt.arrayMvt[1].replace('<span>', "").replace('</span>', "")
    }

    // let textTomvt = repTarget + ' ' + mvt + ' THEN ' + nextMvt;
    let textTomvt = repTarget + ' ' + mvt;

    if (elementAth.currentMvt.mvtNames == "" || elementAth.currentMvt.mvtNames.includes("Workout")) {
        overlay != "versus" && elementAth.$item.find(".popup").hide();
        overlay != "versus" && elementAth.$item.find(".popup_top").hide();
    }
    else {
        if (heat.typeWod == 'amrap' && !Number.isNaN(elementAth.currentMvt.rounds)) {
            elementAth.$item.find(".popup").text("R" + (elementAth.currentMvt.rounds) + ' - ' + textTomvt);
            elementAth.$item.find(".popup_top").text("R" + (elementAth.currentMvt.rounds) + ' - ' + textTomvt);
        } else {
            elementAth.$item.find(".popup").text(textTomvt);
            elementAth.$item.find(".popup_top").text(textTomvt);
        }
        if (overlay != "overlay_wpa") {
            elementAth.$item.find(".popup").show();
            elementAth.$item.find(".popup_top").show();
        }

    }
}

function hiddenAthlete(elementAth) {
    if (elementAth.CurrentRank > 1 && elementAth.$item.is(':visible')) {
        setTimeout(() => {
            elementAth.$item.fadeOut(1000);
        }, 5000)
    }
}

function showHiddenAthlete(elementAth) {
    setTimeout(() => {
        elementAth.$item.fadeIn(1000)
    }, 3000)
}

function treatPerfArray(elementAth) {
    if (overlay == 'commentator') {
        if (bestPerf[elementAth.lane] == undefined) {
            bestPerf[elementAth.lane] = []
        }
        Object.values(elementAth.log_mvt[0]).forEach((time, index) => {

            if (time != '00:00.0') {
                if (elementAth.$item.find("#mvt_id_" + index + "_" + elementAth.lane).text() == '-') {

                    let secondes = time.split(':').map(Number)
                    let min = secondes[0] * 60;
                    let total = secondes[1] + min

                    if (total > 3) {
                        elementAth.$item.find("#mvt_id_" + index + "_" + elementAth.lane).text(time)
                        bestPerf[elementAth.lane][index] = total

                        if (best[index] == undefined) {
                            best[index] = total
                        }

                        if (bestPerf[elementAth.lane][index] <= best[index]) {
                            best[index] = bestPerf[elementAth.lane][index]

                            $('#leaderboard' + key).find('.mvt_id_' + index).removeClass('bestStat');
                            elementAth.$item.find("#mvt_id_" + index + "_" + elementAth.lane).addClass('bestStat');
                        }

                    }
                }
            }
        })
    }
}

function changeLaneToRank(elementAth) {
    elementAth.OldRank = elementAth.CurrentRank
    elementAth.$item.find(".rank").text(elementAth.CurrentRank);
}

function changeRankToLane(elementAth) {
    elementAth.OldRank = elementAth.CurrentRank
    elementAth.$item.find(".rank").text(elementAth.lane);
    eraseInitialRank(elementAth, ".rank")
    eraseInitialRank(elementAth, ".ath")
    eraseInitialRank(elementAth, ".popup")
}



function treatResultTimeWPA(elementAth) {
    let time = 0;
    let index = 0;
    if (elementAth.result != "" && elementAth.result.includes(':')) {
        time = timeToTimestamp(elementAth.result)
        index++;
    }
    return { time, index };
}

function treatResultDisplayRepWPA(score) {
    let r = [0, 0];
    if (score[0].rep > score[1].rep) {
        r[0] = score[0].rep
        r[1] = score[1].rep - score[0].rep
    } else if (score[0].rep < score[1].rep) {
        r[0] = score[0].rep - score[1].rep
        r[1] = score[1].rep
    } else {
        r[0] = score[0].rep
        r[1] = score[1].rep
    }

    let m = 'TOTAL';
    if (setupLeaderboard.value.timeConfig == 'avg') {
        m = 'AVERAGE'
    }

    if (score[0].time != 0) {
        $("#ahtTop1").find('.popup_top').show()
        $("#ahtTop1").find('.popup_top').text("TIME " + m + ": " + msToTime2(score[0].time))

        $("#ahtTop1").find('.score').text(r[0])
    } else {
        $("#ahtTop1").find('.popup_top').hide()
        $("#ahtTop1").find('.popup_top').text('')
        $("#ahtTop1").find('.score').text(r[0])
    }
    if (score[1].time != 0) {
        $("#ahtTop2").find('.popup_top').show()
        $("#ahtTop2").find('.popup_top').text("TIME " + m + ": " + msToTime2(score[1].time))
        $("#ahtTop2").find('.score').text(r[1])
    } else {
        $("#ahtTop2").find('.popup_top').hide()
        $("#ahtTop2").find('.popup_top').text('')
        $("#ahtTop2").find('.score').text(r[1])
    }
}


function treatResultDisplayResultWPA(score) {

    console.log("SCORE WPA : ", score[0].time)

    if (score[0].time != 0) {
        $("#ahtTop1").find('.popup_top').show()
        $("#ahtTop1").find('.score').text(msToTime2(score[0].time))
        $("#ahtTop1").find('.popup_top').text(score[0].rep)
    } else {
        $("#ahtTop1").find('.popup_top').hide()
        $("#ahtTop1").find('.popup_top').text('')
        let n = score[0].rep
        if (heat.typeWod == 'repmax') {
            n = score[0].rep
        }
        $("#ahtTop1").find('.score').text(n)
    }

    if (score[1].time != 0) {
        $("#ahtTop2").find('.popup_top').show()
        $("#ahtTop2").find('.score').text(msToTime2(score[1].time))
        $("#ahtTop2").find('.popup_top').text(score[1].rep)
    } else {
        $("#ahtTop2").find('.popup_top').hide()
        $("#ahtTop2").find('.popup_top').text('')
        let n = score[1].rep
        if (heat.typeWod == 'repmax') {
            n = score[1].rep
        }
        $("#ahtTop2").find('.score').text(n)
    }
}


function hideWaitingWPA(score) {
    $("#ahtTop1").find('.popup_top').hide()
    // $("#ahtTop1").find('.score').text(score[0].rep)
    $("#ahtTop1").find('.score').text("WPA")
    $("#ahtTop2").find('.popup_top').hide()
    // $("#ahtTop2").find('.score').text(score[1].rep)
    $("#ahtTop2").find('.score').text("WPA")
}


function hideResultWPA(score) {
    $("#ahtTop1").find('.popup_top').hide()
    // $("#ahtTop1").find('.score').text(score[0].rep)
    $("#ahtTop1").find('.score').text("STBY")
    $("#ahtTop2").find('.popup_top').hide()
    // $("#ahtTop2").find('.score').text(score[1].rep)
    $("#ahtTop2").find('.score').text("STBY")
}
