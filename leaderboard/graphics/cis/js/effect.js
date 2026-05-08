treatAthleteStatistic = (elemAth) => {
    let athleteCount = Object.keys(elemAth).length;
    let athleteRunning = Object.values(elemAth).filter(athlete => athlete.status === 'W').length;
    let athleteFinished = Object.values(elemAth).filter(athlete => athlete.status === 'F').length;

    $('#athletes-count').text(athleteCount);
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

    elementAth.$item.find(".rank-inner").html('<div class="rank-num rank-' + rank + '-txt rank">' + elementAth.CurrentRank + '</div><div class="rank-change rank-same">-</div></div ></td >')

}

function refreshUpDown(elementAth) {
    if (elementAth.CurrentRank != elementAth.OldRank && elementAth.score_abs != 0) {
        if (elementAth.CurrentRank < elementAth.OldRank) {
            elementAth.$item.find('.rank-change').removeClass('rank-same')
            elementAth.$item.find('.rank-change').addClass('rank-up')
            elementAth.$item.find('.rank-change').text('▲')
        } else if (elementAth.CurrentRank > elementAth.OldRank) {
            elementAth.$item.find('.rank-change').removeClass('rank-same')
            elementAth.$item.find('.rank-change').addClass('rank-down')
            elementAth.$item.find('.rank-change').text('▼')
        }

        elementAth.$item.find('.rank-change').show()
        setTimeout(() => {
            elementAth.$item.find('.rank-change').removeClass('rank-up rank-down')
            elementAth.$item.find('.rank-change').addClass('rank-same')
            elementAth.$item.find('.rank-change').text('-')
        }, 1500)
    } else {
        elementAth.$item.find('.rank-change').removeClass('rank-up rank-down')
        elementAth.$item.find('.rank-change').addClass('rank-same')
        elementAth.$item.find('.rank-change').text('-')
    }
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
        case "0":
            state = "NOT STARTED"
            break;
        case "S":
            state = "STANDBY"
            break;
        case "F":
            state = "FINISHED"
            score = treatTimeResult(elementAth.result)
            break;
        case "T":
            state = "TIMECAP"
            score = elementAth.result
            break;
        case "W":
            state = "RUNNING"
            break;
        default:
            state = ""
    }
    let $item = '<div class="score cumul-val rank-' + rank + '-txt">' + score + '</div><div class="cumul-label">' + state + '</div>';

    elementAth.$item.find(".cumul-cell").html($item)
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
        elementAth.$item.find(".pace-val").text(elementAth.timeOfRound)
}

function refreshCurrentMvtInStandby(elementAth) {

    elementAth.$item.find(".mvt-name").show();
    elementAth.$item.find(".mvt-name").text('STANDBY');

    elementAth.$item.find(".mvt-rep").hide();

    elementAth.$item.find('.progress-bar-fill').hide()

}


function refreshCurrentMvtInProgress(elementAth) {
    let mvtName = elementAth.currentMvt.mvtNames.replace(/(([^\)]+)\).)/g, "")
    let rep = 0;
    let pourcent = 0;

    rep = elementAth.currentMvt.repTarget != 0 ? ((elementAth.currentMvt.scoreAbsMvt + "/" + elementAth.currentMvt.repTarget)) : elementAth.currentMvt.scoreAbsMvt
    mvt = rep + " " + mvtName
    pourcent = elementAth.currentMvt.scoreAbsMvt / elementAth.currentMvt.repTarget * 100

    elementAth.$item.find(".mvt-name").show();
    elementAth.$item.find(".mvt-name").text(mvtName);

    elementAth.$item.find(".mvt-rep").show();
    elementAth.$item.find('.mvt-rep').text(rep + " reps")

    elementAth.$item.find('.progress-bar-fill').show()
    elementAth.$item.find('.progress-bar-fill').addClass('bar-active')
    elementAth.$item.find('.progress-bar-fill').css('width', pourcent + '%')


    // 
    let $item = '<div class="mvt-active"><div class="mvt-active-dot"></div><div class="mvt-active-val">' + rep + ' reps</div></div>'

    elementAth.$item.find('#mvt_id_' + elementAth.currentMvt.id + '_' + elementAth.lane).html($item)
    elementAth.$item.find('#mvt_id_' + elementAth.currentMvt.id + '_' + elementAth.lane).addClass('active-col')

    // 
    if (elementAth.CurrentRank == 1) {
        $('body').find("#header_stats_" + elementAth.currentMvt.id).addClass('active-col-header')
        $('body').find("#header_stats_" + (elementAth.currentMvt.id - 1)).removeClass('active-col-header')
    } else {
        $('body').find("#header_stats_" + elementAth.currentMvt.id).removeClass('active-col-header')
    }


}

function refreshCurrentMvtFinish(elementAth) {

    let score = '';
    let state = elementAth.status == "F" ? "FINISHED" : elementAth.status == "T" ? "TIMECAP" : ""
    let $item = '';
    switch (elementAth.status) {
        case "F":
            score = treatTimeResult(elementAth.result)
            $item = ('<div class="current-mvt-fin">⚑ FINISHED &nbsp;' + score + '</div>' +
                '<div class="progress-bar-wrap"><div class="progress-bar-track"><div class="progress-bar-fill bar-fin" style="width:100%;"></div></div><div class="progress-bar-label label-fin">100%</div></div>')
            break;
        case "T":
            score = elementAth.result.toUpperCase().replaceAll('CAP ', '')
            $item = ('<div class="current-mvt-fin">⚑ TIMECAP &nbsp;' + score + '</div>')
            break;
        default:
            score = elementAth.result.toUpperCase().replaceAll('CAP ', '')
            $item = ('<div class="current-mvt-fin">⚑ TIMECAP &nbsp;' + score + '</div>')
    }
    elementAth.$item.find(".current-mvt-cell").html($item)

}


function refreshRepMax(elementAth) {
    let score = 0;

    if (elementAth.currentMvt.repTarget != 0) {
        score = 'ATTEMPTS ' + elementAth.currentMvt.repTarget + ' ' + setupFlat.unitSelect;
    }

    // switch (setupFlat.scoreConfig) {
    //     case 'abs_score':
    //         score = elementAth.score_abs;
    //         break;
    //     case 'rel_score':
    //         score = elementAth.score_rel;
    //         break;
    //     default:
    //         score = elementAth.score_abs;
    //         break;
    // }

    elementAth.$item.find(".mvt-name").show();
    elementAth.$item.find(".mvt-name").text(score);
    elementAth.$item.find(".mvt-rep").hide();
    elementAth.$item.find('.progress-bar-fill').hide();
}



function treatPerfArray(elementAth) {
    if (bestPerf[elementAth.lane] == undefined) {
        bestPerf[elementAth.lane] = [];
    }

    for (const [key, rounds] of Object.entries(elementAth.log_mvt[0])) {
        let html = '';

        for (const [round, time] of Object.entries(rounds)) {
            let text = `<div class="mvt-cycle">${round.replaceAll('-', '')} : ${time.split(' ')[0].replaceAll('(', '').replaceAll(')', '')}</div><div class="mvt-cumul">${time.split(' ')[1] !== undefined ? time.split(' ')[1] : ''}</div></div>`;
            if (heat.typeWod == 'time') {
                text = text.toLowerCase().replaceAll('rd 1:', '');
            }
            html += text;
        }
        if (heat.typeWod != 'repmax') {

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
        }

        // Mettre à jour le HTML tableau pour cet athlète et ce mouvement
        elementAth.$item.find("#mvt_id_" + key + "_" + elementAth.lane).html(html);

    }

    // Après avoir mis à jour tous les athlètes, coloriser le meilleur
    for (const [key] of Object.entries(elementAth.log_mvt[0])) {
        // Retirer la classe de tous les athlètes pour ce mouvement
        $(".mvt_id_" + key).removeClass('fastest');

        // Retrouver quel athlète a le meilleur temps et lui ajouter la classe
        for (const lane in bestPerf) {
            if (bestPerf[lane][key] !== undefined && bestPerf[lane][key] === best[key]) {
                $("#mvt_id_" + key + "_" + lane).addClass('fastest');
                // Mettre à jour le header HTML tableau pour ce mouvement
                let displayBest = formatTime(best[key]);
                $('body').find("#header_fastest_" + key).html('<div class="fastest-cell">' + displayBest + ' <span class="fastest-badge">L' + lane + '</span></div>');
            }
        }
    }

}

function changeLaneToRank(elementAth) {
    elementAth.OldRank = elementAth.CurrentRank
    elementAth.$item.find(".rank").text(elementAth.CurrentRank);
}

function changeRankToLane(elementAth) {
    elementAth.$item.find(".rank").text(elementAth.lane);
}
