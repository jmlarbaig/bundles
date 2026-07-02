treatAthleteStatistic = (elemAth) => {
    let athleteCount = Object.keys(elemAth).length;
    let athleteRunning = Object.values(elemAth).filter(athlete => athlete.status === 'W').length;
    let athleteFinished = Object.values(elemAth).filter(athlete => athlete.status === 'F').length;

    $('#athletes-count').text('/' + athleteCount);
    $('#active-count').text(athleteRunning);
    $('#finished-count').text(athleteFinished);
    $('#total-reps').text(workouts[0].total_reps + " total reps");
}

function changeColor(ath, element) {
    return;
}

function refreshRank(elementAth) {
    let rank = elementAth.CurrentRank
    if (rank > 3) {
        rank = 'n'
    }

    elementAth.$item.find(".wk-rank").html('<div class="wk-rnum r' + rank + '" data-lane="' + elementAth.lane + '">' + elementAth.CurrentRank + '</div><div class="wk-dlt same">-</div>')

}


function handleFirstAthleteWithoutResult(elemAth) {
    return;
}

function refreshUpDown(elementAth) {
    if (elementAth.CurrentRank != elementAth.OldRank && elementAth.score_abs != 0) {
        if (elementAth.CurrentRank < elementAth.OldRank) {
            elementAth.$item.find('.wk-dlt').removeClass('same')
            elementAth.$item.find('.wk-dlt').addClass('up')
            elementAth.$item.find('.wk-dlt').text('▲')
        } else if (elementAth.CurrentRank > elementAth.OldRank) {
            elementAth.$item.find('.wk-dlt').removeClass('same')
            elementAth.$item.find('.wk-dlt').addClass('down')
            elementAth.$item.find('.wk-dlt').text('▼')
        }

        elementAth.$item.find('.wk-dlt').show()
        setTimeout(() => {
            elementAth.$item.find('.wk-dlt').removeClass('up down')
            elementAth.$item.find('.wk-dlt').addClass('same')
            elementAth.$item.find('.wk-dlt').text('-')
        }, 1500)
    } else {
        elementAth.$item.find('.wk-dlt').removeClass('up down')
        elementAth.$item.find('.wk-dlt').addClass('same')
        elementAth.$item.find('.wk-dlt').text('-')
    }
}


function refreshCummulative(elementAth, state) {
    let rank = elementAth.CurrentRank
    let style = 'var(--ok)';
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
        case "0":
            state = "NOT STARTED"
            score = 0
            style = 'var(--not-started)';
            break;
        case "S":
            state = "STANDBY"
            score = elementAth.score_abs
            style = 'var(--standby)';
            break;
        case "F":
            state = "FINISHED"
            score = treatTimeResult(elementAth.result)
            style = 'color:"#a0b0c0"';
            break;
        case "T":
            state = "TIMECAP"
            score = elementAth.result
            style = 'color:"#a0b0c0"';
            break;
        case "W":
            state = "REPS"
            style = 'var(--ok)';
            break;
        default:
            state = "REPS"
            style = 'var(--ok)';
    }
    let $item = '<div class="wk-cv rank-' + rank + '-txt" style="' + style + '" data-lane="' + elementAth.lane + '">' + score + '</div><div class="wk-cl">' + state + '</div>';

    elementAth.$item.find(".wk-cum").html($item)
}


function treatBigScreenMvt(elementAth) {
    return;
}



function treatTextMvt(mvts) {
    mvts = mvts.replace(/\(.*?\)/g, '');
    if (overlay.includes("versus") && heat.typeWod != 'repmax') {
        if (mvts != "") {
            $('.box_mvt').slideDown(1000)
            $('.box_mvt').find('.mvt').html(mvts)
        } else {
            $('.box_mvt').hide()
        }
    } else {
        $('.mvt').html(mvts)
        $('.mvt').html(mvts)
    }
}




function refreshRepPerSec(elementAth) {
    if (elementAth.hasOwnProperty("timeOfRound"))
        elementAth.$item.find(".wk-pv").text(elementAth.timeOfRound)
}

function refreshCurrentMvtInStandby(elementAth) {

    let $item = '<div class="wk-moff">STANDBY</div>'
    elementAth.$item.find(".wk-mvt").html($item);
    elementAth.$item.find(".wk-mvt").show();

}


function refreshCurrentMvtInProgress(elementAth) {
    let mvtName = elementAth.currentMvt.mvtNames.replace(/(([^\)]+)\).)/g, "")
    let rep = 0;
    let pourcent = 0;

    rep = elementAth.currentMvt.repTarget != 0 ? ((elementAth.currentMvt.scoreAbsMvt + "/" + elementAth.currentMvt.repTarget)) : elementAth.currentMvt.scoreAbsMvt
    mvt = rep + " " + mvtName
    pourcent = elementAth.currentMvt.scoreAbsMvt / elementAth.currentMvt.repTarget * 100

    let $item = '<div class="wk-mname"><span class="wk-mdot"></span>' + mvtName + '</div>' +
        '<div class="wk-prog" data-lane="' + elementAth.lane + '">' + rep + '</div>' +
        '<div class="wk-barw"><div class="wk-track"><div class="wk-fill active" data-lane="' + elementAth.lane + '" style="width: ' + pourcent + '%;"></div></div><div class="wk-pct active" data-lane="' + elementAth.lane + '">' + pourcent + '%</div></div>';

    elementAth.$item.find(".wk-mvt").show();
    elementAth.$item.find(".wk-mvt").html($item);

}

function refreshCurrentMvtFinish(elementAth) {

    let score = '';
    let state = elementAth.status == "F" ? "FINISHED" : elementAth.status == "T" ? "TIMECAP" : ""
    let $item = '';
    switch (elementAth.status) {
        case "F":
            score = treatTimeResult(elementAth.result)
            $item = '<div class="wk-mfin">⚑ FINISHED &nbsp;' + score + '</div>' +
                '<div class="wk-barw"><div class="wk-track"><div class="wk-fill fin"></div></div><div class="wk-pct fin">100%</div></div>';
            break;
        case "T":
            score = elementAth.result.toUpperCase().replaceAll('CAP ', '')
            $item = '<div class="wk-mfin">⚑ TIMECAP &nbsp;' + score + '</div>';
            break;
        default:
            score = elementAth.result.toUpperCase().replaceAll('CAP ', '')
            $item = ('<div class="wk-mfin">⚑ TIMECAP &nbsp;' + score + '</div>')
    }
    elementAth.$item.find(".wk-mvt").html($item)

}


function refreshRepMax(elementAth) {
    let score = 0;

    if (elementAth.currentMvt.repTarget != 0) {
        score = 'ATTEMPTS ' + elementAth.currentMvt.repTarget + ' ' + setupFlat.unitSelect;
    }

    elementAth.$item.find(".mvt-name").show();
    elementAth.$item.find(".mvt-name").text(score);
    elementAth.$item.find(".mvt-rep").hide();
    elementAth.$item.find('.progress-bar-fill').hide();
}

function resetHeaderPerfArray() {
    bestPerf = [];
    best = [];
    return;
}

function resetPerfArray(elementAth) {
    bestPerf[elementAth.lane] = [];
    return;
}

function resetPace(elementAth) {
    elementAth.$item.find(".wk-pv").text("");
}

function treatPerfArray(elementAth) {
    return;
}

function changeLaneToRank(elementAth) {
    elementAth.OldRank = elementAth.CurrentRank
    elementAth.$item.find(".wk-rnum").text(elementAth.CurrentRank);
}

function changeRankToLane(elementAth) {
    elementAth.$item.find(".wk-rnum").text(elementAth.lane);
}
