
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
    var ms = Math.floor((s % 1000));
    s = (s - ms) / 1000;
    var secs = Math.floor((s % 60));
    s = (s - secs) / 60;
    var mins = Math.floor(((s % 60)));
    var hrs = ((s - mins) / 60);
    if (secs < 10) { secs = '0' + (secs) }
    if (mins < 10) { mins = '0' + mins }
    console.log("Timer : ", mins + ':' + secs)
    return mins + ':' + secs;
}

function msToTimeCt(s) {
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

function msToTime2(s) {
    var ms = Math.round(s % 1000);
    s = (s - ms) / 1000;
    var secs = Math.round(s % 60);
    s = (s - secs) / 60;
    var mins = Math.round(s % 60);
    var hrs = (s - mins) / 60;
    if (secs < 10) { secs = '0' + secs }
    if (mins < 10) { mins = '0' + mins }
    // console.log("Time : ", mins + ':' + secs)
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
    let char = [];
    let newName = "";
    if (heat.formatWod == "individual") {
        let splitName = splitFullName(displayName);
        switch (setupLeaderboard.value.nameSelect) {
            case 'first':
                newName = '<div class="name"><span class="firstName">' + splitName.title + ' </span><span class="lastName"> ' + splitName.firstName + '</span></div>';
                break;
            case 'last':
                newName = '<div class="name"><span class="firstName">' + splitName.title + ' </span><span class="lastName"> ' + splitName.lastName + '</span></div>';
                break;
            case 'pointFirst':
                pointFirstName = splitName.firstName.substring(0, 1) + ". "
                console.log(splitName.title)
                newName = '<div class="name"><span class="firstName">' + splitName.title + ' </span><span class="firstName">' + pointFirstName + ' </span><span class="lastName"> ' + splitName.lastName + '</span></div>';
                break;
            case 'full':
                newName = '<div class="name"><span class="firstName">' + splitName.title + ' </span><span class="firstName">' + splitName.firstName + ' </span><span class="lastName"> ' + splitName.lastName + '</span></div>';
                break;
        }

    }
    else {
        newName = '<div class="name"><span class="lastName"> ' + displayName.toLowerCase().replace("crossfit", "") + '</span></div>';
    }
    return newName;
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
    console.log("Parts:", parts);
    let title = '';
    let remaining = [...parts];

    // Extraire les titres en début de chaîne (peut y en avoir plusieurs ex: "Dr. Prof.")
    while (remaining.length > 0 && allTitles.includes(remaining[0].toLowerCase().replace(',', ''))) {
        console.log("Found title:", remaining[0]);
        title += (title ? ' ' : '') + remaining.shift();
    }

    console.log("Title:", title, "Remaining:", remaining);

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
        case 'overlay_top_v2':
            repoLeft(leaderboard, athletes)
            break;
        case 'overlay_wpa':
            repoWpa(leaderboard, athletes);
            break;
        case 'versus_hyperfit':
        case 'versus':
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
                y += elm.$item.width() + (2 * margin);
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
    // console.log("height Ath : ", y)
    // console.log("Lead : ", lead_)
    // console.table("Aths : ", aths_)
    Object.values(aths_).forEach(elm => {
        if (elm.$item.find(lead_) != undefined) {
            if (true) {
                // if (elm.status != '0') {
                !elm.$item.is(':visible') && elm.$item.show()
                elm.$item.css("top", y + "px");
                console.table("Aths : ", elm.$item.height())
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
    // console.log("elementAth :", elementAth)

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
            // if (res != 0) {
            //     // console.log("RepTarget= ", wod.mvt_reps[0])
            //     if (res == wod.total_reps && wod.mvt_names[wod.mvt_names.length - 1] == "Sprint") {
            //         res = 0
            //         index = wod.mvt_names.length - 1
            //     }
            //     else {
            //         while (res >= 0) {
            //             res = (res - wod.mvt_reps[index])
            //             // console.log("je suis à l'index : ", index)
            //             if (res >= 0) {
            //                 index++;
            //             }
            //         }
            //     }
            // }
            // else {
            //     index = 0
            //     res = -wod.mvt_reps[index];
            // }
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
    }
    return ({ 'scoreAbsMvt': res, 'scoreRelMvt': res, 'id': 0, 'repTarget': loadAttempted, 'rounds': 0, 'totalReps': 1, 'mvtNames': 'BARBELL', 'arrayMvt': ['BARBELL'] })
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
    if (overlay.includes('overlay_top') || overlay.includes('versus')) {
        rank != 1 ? rank = 4 : rank
    }

    if (overlay == 'overlay_wpa') { return };
    switch (rank) {
        case 1:
            if (!overlay.includes('overlay_top')) {
                ath.$item.find(element).addClass('first_rank')
                ath.$item.find(element).removeClass('initial_rank_top second_rank third_rank other_rank', false)
                overlay == 'versus' && ath.$item.find(element).removeClass('initial_rank_versus')
            } else {
                ath.$item.find(element).addClass('first_rank_top')
                ath.$item.find(element).removeClass('initial_rank_top second_rank_top third_rank_top other_rank_top', false)
            }
            break;
        case 2:
            if (!overlay.includes('overlay_top')) {
                ath.$item.find(element).addClass('second_rank')
                ath.$item.find(element).toggleClass('first_rank third_rank other_rank', false)
            } else {

                ath.$item.find(element).addClass('second_rank_top')
                ath.$item.find(element).toggleClass('first_rank_top third_rank_top other_rank_top', false)
            }
            break;
        case 3:

            if (!overlay.includes('overlay_top')) {
                ath.$item.find(element).addClass('third_rank')
                ath.$item.find(element).toggleClass('second_rank first_rank other_rank', false)
            } else {

                ath.$item.find(element).addClass('initial_rank_top')
                ath.$item.find(element).toggleClass('second_rank_top first_rank_top other_rank_top', false)
            }
            break;
        default:
            if (!overlay.includes('overlay_top')) {
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
    if (!overlay.includes('overlay_top')) {
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
    if (overlay == 'overlay_top_v2') { return };
    if (!overlay.includes('overlay_top')) {
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

    if (overlay == 'overlay_top_v2') { return };
    // console.log("ath :", ath)
    // console.log("element : ", element)
    ath.$item.find(element).addClass('finish_rank')
    ath.$item.find(element).removeClass('initial_rank first_rank second_rank third_rank other_rank', false)
    overlay == 'versus' && ath.$item.find(element).removeClass('initial_rank_versus')
}

function changeColorFinishAth(ath, element) {

    if (overlay == 'overlay_wpa') { return };
    if (overlay.includes('overlay_top')) {
        if (ath.CurrentRank == 1) {
            ath.$item.find(element).addClass('finish_first_rank_ath_top')
            ath.$item.find(element).removeClass('initial_rank_top_ath finish_rank_ath_top second_rank_ath_top third_rank_ath_top other_rank_ath_top', false)
        } else {
            ath.$item.find(element).addClass('finish_rank_ath_top')
            ath.$item.find(element).removeClass('initial_rank_ath finish_first_rank_ath_top first_rank_ath_top second_rank_ath_top third_rank_ath_top other_rank_ath_top', false)
        }
    } else {
        ath.$item.find(element).addClass('finish_rank_ath')
        ath.$item.find(element).removeClass('initial_rank_top_ath first_rank_ath second_rank_ath third_rank_ath other_rank_ath', false)
        overlay == 'versus' && ath.$item.find(element).removeClass('initial_rank_versus')
    }
}

function changeColorAth(ath, element) {

    if (overlay == 'overlay_wpa') { return };
    let rank = ath.CurrentRank
    if (overlay.includes('overlay_top') || overlay == 'versus') {
        rank != 1 ? rank = 4 : rank
    }
    switch (rank) {
        case 1:
            if (!overlay.includes('overlay_top')) {
                ath.$item.find(element).addClass('first_rank_ath')
                ath.$item.find(element).removeClass('initial_rank_ath second_rank_ath third_rank_ath other_rank_ath', false)
                overlay == 'versus' && ath.$item.find(element).removeClass('initial_rank_versus')
            } else {
                ath.$item.find(element).addClass('finish_first_rank_ath_top')
                ath.$item.find(element).removeClass('initial_rank_top_ath second_rank_ath_top third_rank_ath_top other_rank_ath_top', false)
            }
            break;
        case 2:
            if (!overlay.includes('overlay_top')) {
                ath.$item.find(element).addClass('second_rank_ath')
                ath.$item.find(element).toggleClass('first_rank_ath third_rank_ath other_rank_ath', false)
            } else {
                ath.$item.find(element).addClass('second_rank_ath_top')
                ath.$item.find(element).toggleClass('first_rank_ath_top third_rank_ath_top other_rank_ath_top', false)
            }
            break;
        case 3:
            if (!overlay.includes('overlay_top')) {
                ath.$item.find(element).addClass('third_rank_ath')
                ath.$item.find(element).toggleClass('second_rank_ath first_rank_ath other_rank_ath', false)
            } else {

                ath.$item.find(element).addClass('third_rank_ath_top')
                ath.$item.find(element).toggleClass('first_rank_ath_top second_rank_ath_top other_rank_ath_top', false)
            }
            break;
        default:
            if (!overlay.includes('overlay_top')) {
                ath.$item.find(element).addClass('other_rank_ath_top')
                ath.$item.find(element).toggleClass('second_rank_ath_top third_rank_ath_top first_rank_ath_top', false)
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
        elementAth.$item.find(".popup").text("R" + (elementAth.currentMvt.rounds) + ' - ' + Math.abs(elementAth.currentMvt.scoreRelMvt) + ' ' + elementAth.currentMvt.mvtNames);
        elementAth.$item.find(".popup_top").text("R" + (elementAth.currentMvt.rounds) + ' - ' + Math.abs(elementAth.currentMvt.scoreRelMvt) + ' ' + elementAth.currentMvt.mvtNames);
    } else {
        percent = (elementAth.score_abs / elementAth.currentMvt.totalReps) * 95
        elementAth.$item.find(".popup").text(Math.abs(elementAth.currentMvt.scoreRelMvt) + ' ' + elementAth.currentMvt.mvtNames);
        elementAth.$item.find(".popup_top").text(Math.abs(elementAth.currentMvt.scoreRelMvt) + ' ' + elementAth.currentMvt.mvtNames);
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

    switch (setupLeaderboard.value.timeFormat) {
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

    // if (t[0] != "00") {
    //     result = t[0] + ":" + t[1] + ":" + t[2].substring(0, 2);
    // }
    // else if (t[1] != "00") {
    //     result = t[1] + ":" + t[2].substring(0, 2);
    // }
    // else {
    //     result = "00:" + t[2].substring(0, 2);
    // }

    // console.log("Resultat Final : ", result)

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
        if (overlay.includes("overlay_top")) {
            elementAth.$item.find(".score").css("background-color", "#E0FD53");
        }
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

    if (overlay == "overlay_side" || overlay == "overlay_wpa" || overlay.includes("overlay_top")) {
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
        elementAth.$item.find(".score").text(text);
        elementAth.$item.find(".popup").text(result + ' ' + setupLeaderboard.value.unitSelect);
        elementAth.$item.find(".popup_top").text(result + ' ' + setupLeaderboard.value.unitSelect);
    }
}


function treatTextMvt(mvts) {
    if (overlay.includes("versus") && heat.typeWod != 'repmax') {
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

    if (elementAth.currentMvt.repTarget != elementAth.currentMvt.scoreAbsMvt && overlay != 'overlay_wpa') {
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
    // console.log('SCORE ABS MVT : ' + elementAth.currentMvt.scoreAbsMvt)
    elementAth.$item.find(".score").text(elementAth.currentMvt.scoreAbsMvt + ' ' + setupLeaderboard.value.unitSelect);
}

function showRepMvtInScore(elementAth) {
    elementAth.$item.find(".score").show();
    switch (setupLeaderboard.value.scoreConfig) {
        case 'abs_score':
            elementAth.$item.find(".score").text(elementAth.score_abs)

            break;
        case 'rel_score':
            elementAth.$item.find(".score").text(elementAth.score_rel)

            break;
        case 'mvt_score':
            elementAth.$item.find(".score").text(elementAth.currentMvt.scoreAbsMvt);

            break;
        case 'mvt_total_score':
            if (elementAth.currentMvt.mvtNames.toUpperCase() != "WORKOUT") {
                if (heat.typeWod == "amrap") {
                    elementAth.$item.find(".score").text((elementAth.currentMvt.totalReps != 0 ? (elementAth.score_abs) : elementAth.score_abs) + ' (-' + (elementAth.currentMvt.repTarget - elementAth.currentMvt.scoreAbsMvt) + ')');
                } else {
                    elementAth.$item.find(".score").text((elementAth.currentMvt.totalReps != 0 ? ("-" + (workouts[0].total_reps - elementAth.score_abs)) : elementAth.score_abs) + ' (-' + (elementAth.currentMvt.repTarget - elementAth.currentMvt.scoreAbsMvt) + ')');
                }
            } else {
                elementAth.$item.find(".score").text(elementAth.currentMvt.scoreAbsMvt);
            }
            break;
        case 'remain_mvt':
            if (elementAth.currentMvt.mvtNames.toUpperCase() != "WORKOUT") {
                elementAth.$item.find(".score").text(elementAth.currentMvt.repTarget != 0 ? ("-" + (elementAth.currentMvt.repTarget - elementAth.currentMvt.scoreAbsMvt)) : elementAth.currentMvt.scoreAbsMvt);
            } else {
                elementAth.$item.find(".score").text(elementAth.currentMvt.scoreAbsMvt);
            }
        default:
    }

    if (elementAth.currentMvt.mvtNames.toUpperCase() != "WORKOUT" && (setupLeaderboard.value.showMvt || overlay.includes("commentator") || overlay.includes("sk"))) {
        // console.log("SHOW MVTS IN SCORE CONFIG : ", setupLeaderboard.value.showMvt)
        showMvtInPopup(elementAth)
    } else {
        // console.log("HIDE MVTS IN SCORE CONFIG : ", setupLeaderboard.value.showMvt)
        hideMvtInPopup(elementAth)
    }

}

function showRepPerSec(elementAth) {
    if (elementAth.hasOwnProperty("timeOfRound"))
        elementAth.$item.find(".reppersec").text(elementAth.timeOfRound)
}


function hideRepMvtInScore(elementAth) {
    if (!overlay.includes("overlay_top")) {
        elementAth.$item.find(".score").hide();
    }
}

function hideColMvt(elementAth) {
    elementAth.$item.find(".popup").hide();
}

function showMvtInPopup(elementAth) {
    const reg = new RegExp("\(([^\)]+)\).", "g")
    let mvt = elementAth.currentMvt.mvtNames.replace(/(([^\)]+)\).)/g, "")
    if (overlay.includes('commentator') || overlay.includes('sk')) {
        let rep = elementAth.currentMvt.repTarget != 0 ? ((elementAth.currentMvt.scoreAbsMvt + "/" + elementAth.currentMvt.repTarget)) : elementAth.currentMvt.scoreAbsMvt
        mvt = rep + " " + mvt
    }
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


function treatDisplayMvtForOthers(elementAth, idToCompare, roundsToCompare) {
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

    console.log("TEXTE TO MVt : ", textTomvt)

    if (overlay == 'commentator' || overlay.includes('sk')) {
        let rep = elementAth.currentMvt.repTarget != 0 ? ((elementAth.currentMvt.scoreAbsMvt + "/" + elementAth.currentMvt.repTarget)) : elementAth.currentMvt.scoreAbsMvt
        textTomvt = rep + ' ' + mvt;
    }

    if (elementAth.currentMvt.id != idToCompare || elementAth.currentMvt.rounds != roundsToCompare) {
        // console.log("DISPLAY MVTS FOR OTHERS")
        if (heat.typeWod == 'amrap' && !Number.isNaN(elementAth.currentMvt.rounds)) {
            if (mvt.includes('Rd')) {
                elementAth.$item.find(".popup").text(textTomvt);
                elementAth.$item.find(".popup_top").text(textTomvt);
            } else {
                elementAth.$item.find(".rounds").text("R" + (elementAth.currentMvt.rounds));
                elementAth.$item.find(".popup").text("R" + (elementAth.currentMvt.rounds) + ' - ' + textTomvt);
                elementAth.$item.find(".popup_top").text("R" + (elementAth.currentMvt.rounds) + ' - ' + textTomvt);
            }
        } else {
            elementAth.$item.find(".popup").text(textTomvt);
            elementAth.$item.find(".popup_top").text(textTomvt);
        }
        // if (overlay != "overlay_wpa") {
        //     if (setupLeaderboard.value.scoreConfig == "mvt_score" || setupLeaderboard.value.scoreConfig == "mvt_total_score") {
        //         elementAth.$item.find(".popup").show();
        //         elementAth.$item.find(".popup_top").show();
        //     }
        // }
    }
    else {
        if (!overlay.includes("commentator") && !overlay.includes("sk")) {
            elementAth.$item.find(".popup").hide();
            elementAth.$item.find(".popup_top").hide();
        }
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
    if (overlay == 'versus_hyperfit') {
        textTomvt = elementAth.currentMvt.scoreRelMvt + ' ' + mvt;
    }

    if (overlay == 'commentator' || overlay.includes('sk')) {
        let rep = elementAth.currentMvt.repTarget != 0 ? ((elementAth.currentMvt.scoreAbsMvt + "/" + elementAth.currentMvt.repTarget)) : elementAth.currentMvt.scoreAbsMvt
        textTomvt = rep + ' ' + mvt;
    }

    if (elementAth.currentMvt.mvtNames == "" || elementAth.currentMvt.mvtNames.includes("Workout")) {
        overlay != "versus" && elementAth.$item.find(".popup").hide();
        overlay != "versus" && elementAth.$item.find(".popup_top").hide();
    }
    else {
        if (heat.typeWod == 'amrap' && !Number.isNaN(elementAth.currentMvt.rounds)) {
            if (heat.typeWod == 'amrap' && !Number.isNaN(elementAth.currentMvt.rounds)) {
                if (mvt.includes('Rd')) {
                    elementAth.$item.find(".popup").text(textTomvt);
                    elementAth.$item.find(".popup_top").text(textTomvt);
                } else {
                    elementAth.$item.find(".popup").text("R" + (elementAth.currentMvt.rounds) + ' - ' + textTomvt);
                    elementAth.$item.find(".popup_top").text("R" + (elementAth.currentMvt.rounds) + ' - ' + textTomvt);
                }
            }
        } else {
            elementAth.$item.find(".popup").text(textTomvt);
            elementAth.$item.find(".popup_top").text(textTomvt);
        }
        // if (overlay != "overlay_wpa") {
        //     elementAth.$item.find(".popup").show();
        //     elementAth.$item.find(".popup_top").show();
        // }

    }
}

function hiddenAthlete(elementAth) {
    if (setupLeaderboard.value.hiddenAthlete) {
        if (elementAth.CurrentRank > 1 && elementAth.$item.is(':visible')) {
            setTimeout(() => {
                elementAth.$item.fadeOut(1000);
            }, 5000)
        }
    } else if (!setupLeaderboard.value.hiddenAthlete && !elementAth.$item.is(':visible')) {
        setTimeout(() => {
            elementAth.$item.fadeIn(1000);
        }, 100)
    }
}

function hideRank(elementAth) {
    elementAth.$item.find(".rank").fadeOut(1000);
}

function showHiddenAthlete(elementAth) {
    setTimeout(() => {
        elementAth.$item.fadeIn(1000)
    }, 3000)
}
function treatPerfArray(elementAth) {
    if (overlay == 'commentator') {
        if (bestPerf[elementAth.lane] == undefined) {
            bestPerf[elementAth.lane] = [];
        }

        for (const [key, rounds] of Object.entries(elementAth.log_mvt[0])) {
            let html = '';

            for (const [round, time] of Object.entries(rounds)) {
                let text = `${round.replaceAll('-', '')}: ${time}<br>`;
                if (heat.typeWod == 'time') {
                    text = text.toLowerCase().replaceAll('rd 1:', '');
                }
                html += text;
            }

            // Extraire le temps absolu pour comparaison ex: "00:40.7 (00:40.7)" → 40.7s
            const firstTime = Object.values(rounds)[0]; // "00:40.7 (00:40.7)"
            const absolute = firstTime.split(" ")[1].replaceAll('(', '').replaceAll(')', '');   // "00:40.7"
            const [min, sec] = absolute.split(":");
            const totalSeconds = parseFloat(min) * 60 + parseFloat(sec);

            // Stocker le meilleur temps global par mouvement
            if (best[key] === undefined || totalSeconds < best[key]) {
                best[key] = totalSeconds;
            }

            // Stocker le temps de cet athlète pour ce mouvement
            bestPerf[elementAth.lane][key] = totalSeconds;

            // Mettre à jour le HTML
            elementAth.$item.find("#mvt_id_" + key + "_" + elementAth.lane).html(html);
        }

        // Après avoir mis à jour tous les athlètes, coloriser le meilleur
        for (const [key] of Object.entries(elementAth.log_mvt[0])) {
            // Retirer la classe de tous les athlètes pour ce mouvement
            $(".mvt_id_" + key).removeClass('bestStat');

            // Retrouver quel athlète a le meilleur temps et lui ajouter la classe
            for (const lane in bestPerf) {
                if (bestPerf[lane][key] !== undefined && bestPerf[lane][key] === best[key]) {
                    $("#mvt_id_" + key + "_" + lane).addClass('bestStat');
                }
            }
        }
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

    switch (setupLeaderboard.value.scoreConfig) {
        case 'abs_score':
            r[0] = score[0].rep
            r[1] = score[1].rep
            break;
        case 'mvt_score':
        case 'rel_score':
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
            break;
        case 'remain_score':
            r[0] = score[0].total_reps - score[0].rep
            r[1] = score[1].total_reps - score[1].rep
            break;
    }


    let m = 'TOTAL';
    if (setupLeaderboard.value.timeConfig == 'avg') {
        m = 'AVERAGE'
    }

    if (score[0].time != 0) {
        $("#ahtTop1").find('.popup_top').show()
        $("#ahtTop1").find('.popup_top').text("TIME " + m + ": " + msToTime2(score[0].time))
        $("#ahtTop1").find('.score').text(msToTime2(score[0].time))
    } else {
        $("#ahtTop1").find('.popup_top').hide()
        $("#ahtTop1").find('.popup_top').text('')
        $("#ahtTop1").find('.score').text(r[0])
    }
    if (score[1].time != 0) {
        $("#ahtTop2").find('.popup_top').show()
        $("#ahtTop2").find('.popup_top').text("TIME " + m + ": " + msToTime2(score[1].time))
        $("#ahtTop2").find('.score').text(msToTime2(score[1].time))
    } else {
        $("#ahtTop2").find('.popup_top').hide()
        $("#ahtTop2").find('.popup_top').text('')
        $("#ahtTop2").find('.score').text(r[1])
    }
}


function treatResultDisplayResultWPA(score) {

    var index = 0;
    if (score[index].time != 0) {
        $("#ahtTop1").find('.popup_top').show()
        $("#ahtTop1").find('.score').text(msToTime2(score[index].time))
        $("#ahtTop1").find('.popup_top').text(score[index].rep)
    } else {
        $("#ahtTop1").find('.popup_top').hide()
        $("#ahtTop1").find('.popup_top').text('')
        let n = score[index].rep
        if (heat.typeWod == 'repmax') {
            n = score[index].rep
        }
        $("#ahtTop1").find('.score').text(n)
    }

    index++

    if (score[index].time != 0) {
        $("#ahtTop2").find('.popup_top').show()
        $("#ahtTop2").find('.score').text(msToTime2(score[index].time))
        $("#ahtTop2").find('.popup_top').text(score[index].rep)
    } else {
        $("#ahtTop2").find('.popup_top').hide()
        $("#ahtTop2").find('.popup_top').text('')
        let n = score[index].rep
        if (heat.typeWod == 'repmax') {
            n = score[index].rep
        }
        $("#ahtTop2").find('.score').text(n)
    }
}


function hideWaitingWPA(score) {
    $("#ahtTop1").find('.popup_top').hide()
    // $("#ahtTop1").find('.score').text(score[0].rep)
    $("#ahtTop1").find('.score').text("TYR")
    $("#ahtTop2").find('.popup_top').hide()
    // $("#ahtTop2").find('.score').text(score[1].rep)
    $("#ahtTop2").find('.score').text("TYR")

}


function hideResultWPA(score) {
    $("#ahtTop1").find('.popup_top').hide()
    // $("#ahtTop1").find('.score').text(score[0].rep)
    $("#ahtTop1").find('.score').text("STBY")
    $("#ahtTop2").find('.popup_top').hide()
    // $("#ahtTop2").find('.score').text(score[1].rep)
    $("#ahtTop2").find('.score').text("STBY")
}
