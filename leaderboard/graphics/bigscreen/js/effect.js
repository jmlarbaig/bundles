treatAthleteStatistic = (elemAth) => {
    return;
}


function treatPerfArray(elementAth) {
    return;
}



function resetHeaderPerfArray() {
    return;
}

function resetPerfArray(elementAth) {
    return;
}

function resetPace(elementAth) {
    return;
}


function refreshRank(elementAth) {
    let rank = elementAth.CurrentRank
    if (rank > 3) {
        rank = 'n'
    }

    // Ajouter la gestion des couleurs à cet endroit
    changeColorAth(elementAth, ".ath")

    elementAth.$item.find(".rank").text(elementAth.CurrentRank)
}

function refreshUpDown(elementAth) {
    return;
}


function refreshCummulative(elementAth, state) {
    let rank = elementAth.CurrentRank
    if (rank > 3) {
        rank = 'n'
    }

    let score = 0;


    switch (setupFlat.scoreConfig) {
        case 'abs_score':
            score = elementAth.score_abs

            break;
        case 'rel_score':
            score = elementAth.score_rel

            break;
        case 'mvt_score':
            score = elementAth.currentMvt.scoreAbsMvt;

            break;
        case 'mvt_total_score':
            if (elementAth.currentMvt.mvtNames.toUpperCase() != "WORKOUT") {
                if (heat.typeWod == "amrap") {
                    score = (elementAth.currentMvt.totalReps != 0 ? (elementAth.score_abs) : elementAth.score_abs) + ' (-' + (elementAth.currentMvt.repTarget - elementAth.currentMvt.scoreAbsMvt) + ')';
                } else {
                    score = (elementAth.currentMvt.totalReps != 0 ? ("-" + (workouts[0].total_reps - elementAth.score_abs)) : elementAth.score_abs) + ' (-' + (elementAth.currentMvt.repTarget - elementAth.currentMvt.scoreAbsMvt) + ')';
                }
            } else {
                score = elementAth.currentMvt.scoreAbsMvt;
            }
            break;
        case 'remain_mvt':
            if (elementAth.currentMvt.mvtNames.toUpperCase() != "WORKOUT") {
                score = elementAth.currentMvt.repTarget != 0 ? ("-" + (elementAth.currentMvt.repTarget - elementAth.currentMvt.scoreAbsMvt)) : elementAth.currentMvt.scoreAbsMvt;
            } else {
                score = elementAth.currentMvt.scoreAbsMvt;
            }
        default:
    }

    switch (elementAth.status) {
        case "F":
            score = 'FIN'
            break;
        case "T":
            // On est en timecap donc format => CAP 10.9
            // On supprime le CAP 
            score = elementAth.result.toUpperCase().replaceAll('CAP ', '')

            // En fonction du type de wod, on supprime la décimale
            switch (heat.typeWod) {
                case 'repmax':
                    break;
                default:
                    // Case for amrap and for time
                    score = score.split('.')[0]
                    break;
            }
            break;
        case "W":
        case "0":
        case "S":
        default:
            state = ""
    }

    elementAth.$item.find(".score").text(score)
}


function treatBigScreenMvt(elementAth) {
    return;
}



function treatTextMvt(mvts) {
    return;
}




function refreshRepPerSec(elementAth) {
    return;
}

function refreshCurrentMvtInStandby(elementAth) {
    hideCurrentMvt(elementAth)
    return;
}

function hideCurrentMvt(elementAth) {
    elementAth.$item.find(".popup").text('');
    elementAth.$item.find(".popup").hide();
}



function refreshCurrentMvtInProgress(elementAth) {
    return;
}

function refreshCurrentMvtFinish(elementAth) {
    return;

}


function refreshRepMax(elementAth) {
    return;
}


function changeColorFinishAth(ath, element) {
    return;
}

function changeColorAth(ath, element) {
    return;
}




function treatFinishStatus(elementAth) {
    let result = elementAth.result;
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
}




function showRepMvtInScore(elementAth) {
    return;
}



function treatDisplayMvtForOthers(elementAth, idToCompare, roundsToCompare) {
    return;
}

function treatDisplayMvtFirst(elementAth) {
    return;
}
