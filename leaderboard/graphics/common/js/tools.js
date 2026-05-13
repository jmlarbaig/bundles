
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



//CHANGE: msToTimeCt => msToTime 
//CHANGE: msToTime2 => msToTime
//CHANGE: msToTimeSK => msToTime
function msToTime(s) {
    var ms = Math.floor((s % 1000));
    s = (s - ms) / 1000;
    var secs = Math.floor((s % 60));
    s = (s - secs) / 60;
    var mins = Math.floor(((s % 60)));
    var hrs = ((s - mins) / 60);
    if (secs < 10) { secs = '0' + (secs) }
    if (mins < 10) { mins = '0' + mins }
    // console.log("Timer : ", mins + ':' + secs)
    return mins + ':' + secs;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const centiseconds = Math.round((seconds % 1) * 100);

    const mm = String(minutes).padStart(2, '0');
    const ss = String(secs).padStart(2, '0');
    const ms = String(centiseconds).padStart(2, '0');

    return `${mm}:${ss}.${ms}`;
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
    if (repTarget == undefined) {
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
    } else {
        textRep = repTarget
    }
    return textRep
}

function treatDisplayName(displayName) {
    let char = [];
    let newName = "";
    if (heat.formatWod == "individual") {
        let splitName = splitFullName(displayName);
        switch (setupFlat.nameSelect) {
            case 'first':
                newName = '<div class="name"><span class="firstName">' + splitName.title + ' </span><span class="lastName"> ' + splitName.firstName + '</span></div>';
                break;
            case 'last':
                newName = '<div class="name"><span class="firstName">' + splitName.title + ' </span><span class="lastName"> ' + splitName.lastName + '</span></div>';
                break;
            case 'f.Last':
                pointFirstName = splitName.firstName.substring(0, 1) + ". "
                // console.log(splitName.title)
                newName = '<div class="name"><span class="firstName">' + splitName.title + ' </span><span class="firstName">' + pointFirstName + ' </span><span class="lastName"> ' + splitName.lastName + '</span></div>';
                break;
            case 'full':
                newName = '<div class="name"><span class="firstName">' + splitName.title + ' </span><span class="firstName">' + splitName.firstName + ' </span><span class="lastName"> ' + splitName.lastName + '</span></div>';
                break;
        }

    }
    else {
        newName = '<div class="name"><span class="lastName"> ' + displayName.toLowerCase() + '</span></div>';
    }
    return newName;
}

function refreshDisplayName(dataAthlete) {
    // console.log('DataAthlete', dataAthlete)
    dataAthlete.forEach((athlete) => {
        let newName = treatDisplayName(athlete.displayName);
        // console.log("newName", newName)
        // console.log("athlete.lane", athlete.lane)
        $(".leaderboards").find("#aht" + athlete.lane).find(".name").find("span").remove();
        // console.log("find name", $(".leaderboards").find("#aht" + athlete.lane).find(".name"))
        $(".leaderboards").find("#aht" + athlete.lane).find(".name").replaceWith(newName);
    });
}


function splitFullName(fullName) {
    if (!fullName || !fullName.trim()) {
        return { title: '', firstName: '', lastName: '' };
    }

    // --- LISTES DE PRÉFIXES ---

    const civilites = [
        'mr', 'mr.', 'mrs', 'mrs.', 'ms', 'ms.', 'miss', 'mme', 'mme.', 'mle', 'mlle',
        'dr', 'dr.', 'prof', 'prof.', 'professeur', 'docteur', 'me', 'me.', 'maitre'
    ];

    const militaires = [
        'general', 'général', 'gen', 'gen.', 'colonel', 'col', 'col.',
        'commandant', 'cmd', 'capitaine', 'cpt', 'lieutenant', 'lt', 'lt.',
        'sergent', 'sgt', 'sgt.', 'caporal', 'cpl', 'amiral', 'admiral',
        'major', 'maj', 'maj.', 'marshal', 'maréchal', 'tsgt', 'sra', 'smsgt', 'msgt'
    ];

    const religieux = [
        'father', 'fr', 'fr.', 'sister', 'sr', 'sr.', 'brother', 'br', 'br.',
        'pastor', 'reverend', 'rev', 'rev.', 'bishop', 'archbishop',
        'sheikh', 'sheik', 'imam', 'rabbi', 'père', 'soeur', 'abbé'
    ];

    // Particules de noblesse — restent attachées au lastName
    const particules = [
        'van', 'von', 'de', 'du', 'des', 'der', 'den',
        'le', 'la', 'les', 'del', 'della', 'di', 'da',
        'bin', 'bint', 'al', 'el', 'ibn', 'af', 'av', 'of'
    ];

    const allTitles = [...civilites, ...militaires, ...religieux];

    // --- TRAITEMENT ---

    const parts = fullName.trim().replace(/\s+/g, ' ').split(' ').map(p => p.toLowerCase());
    // console.log("Parts:", parts);
    let title = '';
    let remaining = [...parts];

    // Extraire les titres en début de chaîne (peut y en avoir plusieurs ex: "Dr. Prof.")
    while (remaining.length > 0 && allTitles.includes(remaining[0].toLowerCase().replace(',', ''))) {
        // console.log("Found title:", remaining[0]);
        title += (title ? ' ' : '') + remaining.shift();
    }

    // console.log("Title:", title, "Remaining:", remaining);

    if (remaining.length === 0) return { title, firstName: '', lastName: '' };
    if (remaining.length === 1) return { title, firstName: remaining[0], lastName: '' };

    // Détecter où commence le lastName (particule ou dernier mot)
    let splitIndex = 1; // par défaut : 1er mot = firstName
    for (let i = 1; i < remaining.length; i++) {
        if (particules.includes(remaining[i].toLowerCase().replace(/[^a-zàâéèêëîïôùûüç-]/gi, ''))) {
            splitIndex = i;
            break;
        }
        // Si on atteint l'avant-dernier sans particule trouvée : le dernier mot = lastName
        if (i === remaining.length - 1) {
            splitIndex = remaining.length - 1;
        }
    }

    return {
        title,
        firstName: remaining.slice(0, splitIndex).join(' '),
        lastName: remaining.slice(splitIndex).join(' ')
    };
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
        case 'overlay_top_v2':
            repoLeft(leaderboard, athletes)
            break;
        case 'overlay_wpa':
            repoWpa(leaderboard, athletes);
            break;
        case 'overlay_side_v1':
        case 'overlay_side':
            repoTop(leaderboard, athletes);
            break;
        default:
            break;
    }

}

function repoLeft(lead_, aths_) {
    let y = 0;
    let margin = 0
    let padding = 0;
    let widthOfLeaderboard = 0;
    let widthOfAthlete = 0;
    let numberOfAthlete = 1;
    widthOfLeaderboard = parseInt($('.leaderboard').width());
    if (setupFlat != undefined && setupFlat != {}) {
        let numberOfAthlete = setupFlat.numberAthletes;
        widthOfAthlete = widthOfLeaderboard / numberOfAthlete;
        margin = parseInt($('.athlete').css('margin').replace('px', ''))
        $('.athlete').width(widthOfAthlete - (2 * margin));
        // $('.athlete').find('.name').css('min-width', 100 + 'px');
    }
    Object.values(aths_).forEach((elm, index) => {
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
                y += elm.$item.width() + (2 * margin);
            }
        }
        // if (setupFlat != undefined && setupFlat != {} && ((setupFlat.numberAthletes - 1) == index || (aths_.length - 1) < index) || (aths_.length - 1 < setupFlat.numberAthletes)) {
        //     $('.leaderboard').width(y)
        // }
    })
}

function repoTop(lead_, aths_) {
    //initialisation la position de départ
    let y = parseInt($(lead_ + " .header").css('height').replace('px', ''));
    Object.values(aths_).forEach((elm, index) => {
        if (elm.$item.find(lead_) != undefined) {
            !elm.$item.is(':visible') && elm.$item.show()
            elm.$item.css("top", y + "px");
            y += elm.$item.height();
            y += parseInt(elm.$item.css('margin').replace('px', ''));
        }
        console.log("ath legnth", aths_.length)
        console.log("index", index)
        if (setupFlat != undefined && setupFlat != {} && ((setupFlat.numberAthletes - 1) == index || (aths_.length - 1) < index) || (aths_.length - 1 < setupFlat.numberAthletes)) {
            console.log("Height leaderboard : ", y)
            $('.leaderboard').height(y)
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

function repoWpa(lead_, aths_) {
    //initialisation la position de départ
    let y = parseInt($(lead_ + " .header").css('height').replace('px', ''));
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



function TreatMvt(elementAth) {
    let currentMvt = {}
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
    let index = 0;
    let arrayMvt = [];
    for (let wod of workouts) {
        if (wod.division == division) {

            return ({
                'scoreAbsMvt': wod.totalRep,
                'scoreRelMvt': 0,
                'id': wod.mvt_id[wod.mvt_id.length - 1],
                'repTarget': wod.repTarget,
                'mvtNames': '',
                'rounds': 0,
                'totalReps': wod.totalRep,
                'arrayMvt': {}
            })
        }
    }
    return ({ 'scoreAbsMvt': 0, 'scoreRelMvt': 0, 'id': 0, 'repTarget': 0, 'rounds': 0, 'totalReps': 0, 'mvtNames': 'WORKOUT', 'arrayMvt': ['WORKOUTS'] })
}

function mvtIndexForTime(nbrReps, division) {
    let res = nbrReps;
    let index = 0;
    let arrayMvt = [];
    for (let wod of workouts) {
        if (wod.division == division) {
            if (res != 0) {
                if (res == wod.total_reps && wod.mvt_names[wod.mvt_names.length - 1] == "Sprint") {
                    res = 0
                    index = wod.mvt_names.length - 1
                }
                else {
                    while (res >= 0) {
                        res = (res - wod.mvt_reps[index])
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
        for (let i = index; i < wod.mvt_names.length; i++) {
            mvtToUP = wod.mvt_names[i].toLowerCase() != 'workout' ? wod.mvt_names[i].toLowerCase() : 'BARBELL';
            let r = wod.mvt_names[i].toLowerCase() != 'workout' ? 'MAX' : '';
            if (wod.mvt_reps[i] != 0) {
                r = wod.mvt_reps[i].toString().toLowerCase()
            }
            arrayMvt.push("<span>" + r + ' ' + mvtToUP + "</span>")
        }
        return ({ 'scoreAbsMvt': nbrReps, 'scoreRelMvt': nbrReps, 'id': 0, 'repTarget': loadAttempted, 'rounds': 0, 'totalReps': 1, 'mvtNames': 'Barbell', 'arrayMvt': arrayMvt })
    }
    return ({ 'scoreAbsMvt': res, 'scoreRelMvt': res, 'id': 0, 'repTarget': loadAttempted, 'rounds': 0, 'totalReps': 1, 'mvtNames': 'BARBELL', 'arrayMvt': ['BARBELL'] })
}


function launchAutomaticSchedule() {
    timerAutomatic2 = setTimeout(() => {

        // nodecg.sendMessageToBundle('heat_result', 'connector', { workoutHeatSelected: eventInfos.value.workoutId, heatSelected: eventInfos.value.heatId, num_heats: 10 })

        let config = setupFlat;
        // console.log("before")
        // console.table(configBefore)
        configBefore = setupFlat;

        config.box_chrono = false;
        config.box_heat = false;
        config.box_logo = false;
        config.box_bandeau = false;
        config.attributionLane = false;

        setupFlat = config;

        timerAutomatic3 = setTimeout(() => {

            let config = setupFlat;

            // config.box_chrono = configBefore.box_chrono;
            // config.box_heat = configBefore.box_heat;
            // config.box_logo = configBefore.box_logo;
            // config.heatResults = false;


            setupFlat = configBefore;

        }, 10000)
    }, 2000)
}



function treatTimeResult(result) {
    var t = result.toString().split(':');
    switch (setupFlat.timeFormat) {
        case 'hh-mm-ss-msms':
            result = t[0] + ":" + t[1] + ":" + t[2].substring(0, 5);
            break;
        case 'hh-mm-ss-ms':
            result = t[0] + ":" + t[1] + ":" + t[2].substring(0, 4);
            break;
        case 'hh-mm-ss':
            result = t[0] + ":" + t[1] + ":" + t[2].substring(0, 2);
            break;
        case 'mm-ss-msms':
            result = t[1] + ":" + t[2].substring(0, 5);
            break;
        case 'mm-ss-ms':
            result = t[1] + ":" + t[2].substring(0, 4);
            break;
        case 'mm-ss':
            result = t[1] + ":" + t[2].substring(0, 2);
            break;
        case 'ss-msms':
            result = t[2].substring(0, 5);
            break;
        case 'ss-ms':
            result = t[2].substring(0, 4);
            break;
        default:
            result = t[0] + ":" + t[1] + ":" + t[2].substring(0, 2);
            break;
    }

    return result;
}
