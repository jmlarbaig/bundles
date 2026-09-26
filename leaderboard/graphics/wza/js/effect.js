treatAthleteStatistic = (elemAth) => {
    return;
}


function treatPerfArray(elementAth) {
    return;
}


function handleFirstAthleteWithoutResult(elemAth) {
    const athlete = elemAth
        .filter(a => a.result === "")
        .sort((a, b) => a.CurrentRank - b.CurrentRank)[0];


    if (!athlete) {
        treatTextMvt("");
    } else {
        if (athlete.currentMvt.arrayMvt.toString() == "" || athlete.currentMvt.arrayMvt.toString().includes("Object")) {
            treatTextMvt("");
        } else {
            treatTextMvt(
                athlete.currentMvt.arrayMvt
                    .toString()
                    .replaceAll(',', '-')
                    .replaceAll('_', ' ')
                    .replace('-', '')
            );
        }
    }
}



function refreshRank(elementAth) {
    let rank = elementAth.CurrentRank
    if (rank > 3) {
        rank = 'n'
    }

    // Ajouter la gestion des couleurs à cet endroit
    // changeColorAth(elementAth, ".athleteTop")

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
            // console.log("refreshCummulative elementAth.result = ", elementAth.result)
            score = treatTimeResult(elementAth.result)
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

    if (elementAth.$item.find(".score").length > 0) {
        elementAth.$item.find(".score").text(score)
    } else {
        elementAth.$item.find(".scoreTop").text(score)
        changeColorAthTop(elementAth, elementAth.$item.find(".athTopBorder"))
    }
}


function refreshCummulativeFinish(elementAth) {
    let score = '';
    switch (elementAth.status) {
        case "F":
            score = treatTimeResult(elementAth.result)
            break;
        case "T":            // On est en timecap donc format => CAP 10.9
            score = treatCapResult(elementAth.result)
            break;
        default:
            score = elementAth.score_abs
            break;
    }
    if (elementAth.$item.find(".scoreTop").length > 0) {
        elementAth.$item.find(".scoreTop").text(score)
        changeColorAthTop(elementAth, elementAth.$item.find('.athTopBorder'))
    } else {
        elementAth.$item.find(".score").text(score)
    }
}



function treatBigScreenMvt(elementAth) {
    return;
}



function treatTextMvt(mvts) {
    mvts = mvts.replace(/\(.*?\)/g, '');
    if (heat.typeWod != 'repmax') {
        console.log("Workout in Standby")
        if (mvts != "") {
            $('.heat_content').slideDown(1000)
            $('.heat_content').find('.mvt').html(mvts)
        } else {
            $('.box_mvt').hide()
        }
    } else {
        $('.heat_content').find('.mvt').html(mvts)
        $('.heat_content').find('.mvt').html(mvts)
    }
}




function refreshRepPerSec(elementAth) {
    return;
}

function refreshCurrentMvtInStandby(elementAth) {
    hideCurrentMvt(elementAth)
    return;
}

function hideCurrentMvt(elementAth) {
    // console.log("item", elementAth.$item)
    // elementAth.$item.find(".popup").text('');
    // elementAth.$item.find(".popup").hide();
}



function refreshCurrentMvtInProgress(elementAth) {
    let mvtName = elementAth.currentMvt.mvtNames.replace(/(([^\)]+)\).)/g, "")
    let rep = 0;
    let pourcent = 0;

    rep = elementAth.currentMvt.repTarget != 0 ? ((elementAth.currentMvt.scoreAbsMvt + "/" + elementAth.currentMvt.repTarget)) : elementAth.currentMvt.scoreAbsMvt
    mvt = rep + " " + mvtName

    elementAth.$item.find(".popup").text(mvt);

}

function refreshTimeSlowestBetter(ath) {
    let score = treatRepToSeconds(ath.score_abs);
    if (ath.$item.find('.score').$length > 0) {
        // console.log("Refresh Time Slowest Better score ")
        ath.$item.find('.score').text(score)
    } else {
        // console.log("Refresh Time Slowest Better scoreTop ")
        ath.$item.find('.scoreTop').text(score)
    }
}

function refreshCurrentMvtFinish(elementAth) {
    // console.log("refreshCurrentMvtFinish elementAth.currentMvt = ", elementAth.currentMvt)

    let score = '';
    let $item = '';
    switch (elementAth.status) {
        case "F":
            score = treatTimeResult(elementAth.result)
        case "T":            // On est en timecap donc format => CAP 10.9
            // console.log("Result : ", elementAth.result, "Score : ", elementAth.score_abs)
            score = treatCapResult(elementAth.result)
            break;
        default:
            break;
    }
    elementAth.$item.find(".popup").text(score)
    elementAth.$item.find(".popup").show();


}


function refreshRepMax(elementAth) {
    let score = 0;

    if (elementAth.currentMvt.repTarget != 0) {
        score = 'ATTEMPTS ' + elementAth.currentMvt.repTarget + ' ' + setupFlat.unitSelect;
    }


    if (elementAth.currentMvt.repTarget != elementAth.currentMvt.scoreAbsMvt) {
        if (elementAth.currentMvt.repTarget != 0) {
            elementAth.$item.find(".popup").text(score);
            elementAth.$item.find(".popup").show();
        } else {
            elementAth.$item.find(".popup").text('');
        }
    } else {
        elementAth.$item.find(".popup").text('');
    }

}


function changeColorFinishAth(ath, element) {
    if (ath.CurrentRank == 1) {
        ath.$item.find(element).addClass('finish_first_rank_ath_top')
        ath.$item.find(element).removeClass('initial_rank_top_ath finish_rank_ath_top second_rank_ath_top third_rank_ath_top other_rank_ath_top', false)
    } else {
        ath.$item.find(element).addClass('finish_rank_ath_top')
        ath.$item.find(element).removeClass('initial_rank_ath finish_first_rank_ath_top first_rank_ath_top second_rank_ath_top third_rank_ath_top other_rank_ath_top', false)
    }
}

function changeColorAth(ath, element) {

    let rank = ath.CurrentRank
    rank != 1 ? rank = 4 : rank

    // switch (rank) {
    //     case 1:
    //         ath.$item.find(element).addClass('first-rank')
    //         break;
    //     default:
    //         ath.$item.find(element).removeClass('first-rank', false)
    //         break;
    // }
}

function changeColorAthTop(ath, element) {

    let rank = ath.CurrentRank
    if (heat.typeWod == "time_slowest_better") {
        rank != 4 ? rank = 4 : 1
    } else {
        rank != 1 ? rank = 4 : rank
    }

    // console.log("Rank :", rank)

    switch (rank) {
        case 1:
            // console.log("Add class")
            element.addClass('first-rank')
            break;
        default:
            // console.log("Remove class")
            element.removeClass('first-rank', false)
            break;
    }
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
    elementAth.$item.find(".score").show();
    switch (setupFlat.scoreConfig) {
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

}



// Affiche le mouvement uniquement pour le premier athlète dans ce mouvement
// Cache le popup pour les autres athlètes dans le même mouvement
function displayMvtForAthlete(elementAth, isFirstInMvt = true) {
    // Si mouvement vide ou "Workout", cacher le popup
    if (elementAth.currentMvt.mvtNames == "" || elementAth.currentMvt.mvtNames.includes("Workout")) {
        elementAth.$item.find(".popup").hide();
        return;
    }

    // Si ce n'est pas le premier athlète dans ce mouvement, cacher le popup
    if (!isFirstInMvt) {
        elementAth.$item.find(".popup").hide();
        return;
    }

    // Préparation du texte du mouvement
    let repTarget = elementAth.currentMvt.repTarget == 0 ? "MAX" : elementAth.currentMvt.repTarget;
    let mvt = elementAth.currentMvt.mvtNames.replace(/(([^\)]+)\).)/g, "");
    let textTomvt = repTarget + ' ' + mvt;

    // Affichage pour AMRAP avec rounds
    if (heat.typeWod == 'amrap' && !Number.isNaN(elementAth.currentMvt.rounds)) {
        if (mvt.includes('Rd')) {
            elementAth.$item.find(".popup").text(textTomvt);
        } else {
            elementAth.$item.find(".rounds").text("R" + elementAth.currentMvt.rounds);
            elementAth.$item.find(".popup").text("R" + elementAth.currentMvt.rounds + ' - ' + textTomvt);
        }
    } else {
        // Affichage standard
        elementAth.$item.find(".popup").text(textTomvt);
    }

    // Afficher le popup
    elementAth.$item.find(".popup").show();
}

function refreshMvt(elementAth, idToCompare, roundsToCompare) {
    const isFirstInMvt = (elementAth.currentMvt.id != idToCompare || elementAth.currentMvt.rounds != roundsToCompare);
    displayMvtForAthlete(elementAth, isFirstInMvt);
}




function hiddenAthlete(elementAth) {

}

function getTeamSelector(index) {
    const team = teamInArray[index];
    if (!team) {
        console.warn(`getTeamSelector: pas d'équipe pour l'index ${index}`);
        return null;
    }
    return `#ahtTop${team.name}`;
}


function treatResultTimeWPA(elementAth) {
    let time = 0;
    let index = 0;
    if (elementAth.result != "" && elementAth.result.includes(':')) {
        time = timeToTimestamp(elementAth.result);
        index++;
    }
    return { time, index };
}

function computeRepScores(score, scoreConfig) {
    const [a, b] = score;

    switch (scoreConfig) {
        case 'abs_score':
            return [a.rep, b.rep];

        case 'mvt_score':
        case 'rel_score': {
            const diff = a.rep - b.rep;
            if (diff > 0) return [diff, 0];
            if (diff < 0) return [0, -diff];
            return [a.rep, b.rep];
        }

        case 'remain_score':
            return [a.total_reps - a.rep, b.total_reps - b.rep];

        default:
            console.warn(`computeRepScores: scoreConfig inconnu "${scoreConfig}"`);
            return [0, 0];
    }
}

function treatResultDisplayRepWPA(score) {
    // console.log("treatResultDisplayRepWPA score ")
    const r = computeRepScores(score, setupFlat.scoreConfig);
    const modeLabel = setupFlat.timeConfig === 'avg' ? 'AVERAGE' : 'TOTAL';

    score.forEach((scoreEntry, i) => {
        console.log("ScoreEntry : ", score);
        const selector = getTeamSelector(i);
        if (!selector) return;

        const $el = $(selector);
        const $popup = $el.find('.popup_top');
        const $score = $el.find('.scoreTop');

        if (scoreEntry.time != 0) {
            const timeStr = msToTime(scoreEntry.time);
            $popup.show().text(`TIME ${modeLabel}: ${timeStr}`);
            $score.text(timeStr);
        } else {
            $popup.hide().text('');
            $score.text(r[i]);
        }

        if (status != '0' || status != "R") {

            changeColorAthTop(scoreEntry, $el.find('athTopBorder'))
        }

    });
}

function treatResultDisplayResultWPA(score) {
    // console.log("treatResultDisplayResultWPA score = ", score)
    score.forEach((scoreEntry, i) => {
        const selector = getTeamSelector(i);
        if (!selector) return;

        // console.log("selector = ", selector)

        const $el = $(selector);
        const $popup = $el.find('.popupTop');
        const $score = $el.find('.scoreTop');
        const $border = $el.find('.athTopBorder');

        const reps = scoreEntry.rep

        // console.log("scoreEntry = ", scoreEntry)
        // console.log("scoreEntry.time = ", msToTime(scoreEntry.time))

        if (scoreEntry.time != 0 && scoreEntry.numberOfAthleteFinish == scoreEntry.numberOfAthleteInTeam) {
            $popup.show().text(scoreEntry.rep);
            $score.text(msToTime(scoreEntry.time));
        } else {
            let n = scoreEntry.rep != 0 ? scoreEntry.rep : '-'
            $score.text(n);
        }

        if (scoreEntry.status == "W") {
            let repRemaining = 0
            if (heat.typeWod == "time") {
                repRemaining = ((scoreEntry.numberOfAthleteInTeam - scoreEntry.numberOfAthleteFinish) * scoreEntry.total_reps) - reps
            }
            else {
                repRemaining = reps;
            }

            $popup.show().text('Remaining: ' + repRemaining)
            $popup.hide().text('')
        } else {
            $popup.hide().text('')
        }



        if (status != '0' || status != "R") {
            changeColorAthTop(scoreEntry, $border)
        }

    });
}

function hideWaitingWPA(score) {
    teamInArray.forEach((team, i) => {
        const selector = getTeamSelector(i);
        if (!selector) return;

        const $el = $(selector);
        $el.find('.popup_top').hide();
        $el.find('.scoreTop').text("TYR");
    });
}

function hideResultWPA(score) {
    teamInArray.forEach((team, i) => {
        const selector = getTeamSelector(i);
        if (!selector) return;

        const $el = $(selector);
        $el.find('.popup_top').hide();
        $el.find('.scoreTop').text("STBY");
    });
}


function buildProgressBar(containerId, numSegments) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // reset

    for (let i = 0; i < numSegments; i++) {
        const segment = document.createElement('div');
        segment.className = 'segment';
        segment.dataset.athlete = i + 1;

        const fill = document.createElement('div');
        fill.className = 'segment-fill';
        fill.style.width = '0%';

        segment.appendChild(fill);
        container.appendChild(segment);
    }
}

function updateSegment(containerId, athleteIndex, repsDone, repsTotal) {
    const percent = Math.min((repsDone / repsTotal) * 100, 100);
    const fills = document.querySelectorAll(`#${containerId} .segment-fill`);
    fills[athleteIndex].style.width = percent + '%';
}

function updateLabel(labelId, finished, total) {
    document.getElementById(labelId).textContent = `${finished} OF ${total} FINISHED`;
}


function renderTeamProgress(team) {
    const $container = $('#ahtTop' + team.name);
    if ($container.length === 0) return; // le bloc DOM n'existe pas pour cette team

    const $segmentsContainer = $container.find('.progress-segments');
    const $label = $container.find('.progress-label');

    team.athletes.forEach(ath => {
        const segId = 'segment-' + team.name + '-' + ath.lane;
        let $segment = $('#' + segId);

        if ($segment.length === 0) {
            $segment = $('<div class="segment"></div>').attr('id', segId);
            $segment.append('<div class="segment-fill"></div>');
            $segmentsContainer.append($segment);
        }

        const percent = ath.repsTotal > 0
            ? Math.min((ath.repsDone / ath.repsTotal) * 100, 100)
            : 0;

        $segment.find('.segment-fill').css('width', percent + '%');
    });

    // Retire les segments des athlètes qui ne sont plus dans team.athletes
    const currentIds = team.athletes.map(a => 'segment-' + team.name + '-' + a.lane);
    $segmentsContainer.children('.segment').each(function () {
        if (!currentIds.includes(this.id)) {
            $(this).remove();
        }
    });

    // Refresh du label
    const finishedCount = team.athletes.filter(a => a.status === 'F').length;
    $label.text(finishedCount + ' OF ' + team.athletes.length + ' FINISHED');
}

function renderAthleteSegments(teamWAP, $segmentsContainer, $label) {
    const color = teamWAP.backgroundColor || '#ffffff';

    // Tri stable par lane pour garantir un ordre d'affichage constant
    const sortedAthletes = [...teamWAP.athletes].sort((a, b) => a.lane - b.lane);

    sortedAthletes.forEach(ath => {
        const $segment = $('<div class="segment"></div>');
        const percent = ath.repsTotal > 0
            ? Math.min((ath.repsDone / ath.repsTotal) * 100, 100)
            : 0;

        const $fill = $('<div class="segment-fill"></div>')
            .css('width', percent + '%')
            .css('background-color', color);

        $segment.append($fill);
        $segmentsContainer.append($segment);
    });

    const finishedCount = teamWAP.athletes.filter(a => a.status === 'F').length;
    // $label.append('<span>' + finishedCount + ' OF ' + teamWAP.athletes.length + ' FINISHED</span>');
}


function buildMovementProgressBar(teamWAP) {
    // Plus de division dans arrayWAP → on prend le wod par défaut
    const wod = workouts[0];
    if (!wod || !wod.mvt_names) return null;

    const movements = wod.mvt_names.map((name, i) => ({
        name: name,
        reps: wod.mvt_reps[i]
    }));

    const repsDone = teamWAP.rep || 0; // <-- rep, pas score_abs

    let cumulative = 0;
    let currentMvtIndex = 0;
    let currentMvtProgress = 0;
    let found = false;

    for (let i = 0; i < movements.length; i++) {
        const target = movements[i].reps;
        if (repsDone >= cumulative + target) {
            cumulative += target;
        } else {
            currentMvtIndex = i;
            currentMvtProgress = repsDone - cumulative;
            found = true;
            break;
        }
    }

    if (!found) {
        currentMvtIndex = movements.length - 1;
        currentMvtProgress = movements[currentMvtIndex].reps;
    }

    return {
        movements,
        currentMvtIndex,
        currentMvtProgress,
        totalReps: wod.total_reps,
        repsToGo: Math.max(wod.total_reps - repsDone, 0),
        currentMvtName: movements[currentMvtIndex].name
    };
}

function renderMovementSegments(teamWAP, $segmentsContainer, $label) {
    const wod = workouts[0];
    if (!wod || !wod.mvt_names) return;

    const data = buildMovementProgressBar(teamWAP);
    if (!data) return;

    const color = teamWAP.backgroundColor || '#ffffff';

    // Largeur réelle du container en px
    const widthSegmentContainer = $segmentsContainer.width();

    // Nombre de gaps entre segments (CSS gap: 2px sur .progress-segments)
    const gapSize = parseFloat($segmentsContainer.css('gap')) || 0;
    const totalGapWidth = gapSize * (data.movements.length - 1);
    const availableWidth = widthSegmentContainer - totalGapWidth;

    let lastFillPercent = 0;

    data.movements.forEach((mvt, index) => {
        // Largeur en px proportionnelle aux reps du mouvement
        const segmentWidthPx = (mvt.reps / data.totalReps) * availableWidth;

        const $segment = $('<div class="segment"></div>')
            .css('flex', '0 0 auto')
            .css('width', segmentWidthPx + 'px');

        let fillPercent = 0;
        if (index < data.currentMvtIndex) {
            fillPercent = 100;
        } else if (index === data.currentMvtIndex) {
            fillPercent = mvt.reps > 0
                ? Math.min((data.currentMvtProgress / mvt.reps) * 100, 100)
                : 0;
        }
        lastFillPercent = fillPercent;

        const $fill = $('<div class="segment-fill"></div>')
            .css('width', fillPercent + '%')
            .css('background-color', color);

        $segment.append($fill);
        $segmentsContainer.append($segment);
    });

    $label.empty();
    if (lastFillPercent == 100) {
        // workout terminé, on peut choisir de ne rien afficher ou un message dédié
    } else {
        $label.append('<span>ON ' + data.currentMvtName.toUpperCase() + '</span>');
        $label.append('<span>' + data.repsToGo + ' TO GO</span>');
    }
}

function renderTeamMovementProgress(teamWAP) {
    const teamName = teamWAP.affiliate;
    const $container = $('#ahtTop' + teamName);
    if ($container.length === 0) return;

    const color = teamWAP.backgroundColor || '#ffffff';

    const $segmentsContainer = $container.find('.progress-segments');
    const $label = $container.find('.progress-label');

    const data = buildMovementProgressBar(teamWAP);
    if (!data) return;

    $segmentsContainer.empty();

    data.movements.forEach((mvt, index) => {
        const widthPercent = (mvt.reps / data.totalReps) * 100;
        const $segment = $('<div class="segment"></div>').css('flex', '0 0 ' + widthPercent + '%');

        let fillPercent = 0;
        if (index < data.currentMvtIndex) {
            fillPercent = 100;
        } else if (index === data.currentMvtIndex) {
            fillPercent = mvt.reps > 0
                ? Math.min((data.currentMvtProgress / mvt.reps) * 100, 100)
                : 0;
        }

        const $fill = $('<div class="segment-fill"></div>')
            .css('width', fillPercent + '%')
            .css('background-color', color);

        $segment.append($fill);
        $segmentsContainer.append($segment);
    });

    $label.empty();
    $label.append('<span>ON ' + data.currentMvtName.toUpperCase() + '</span>');
    $label.append('<span>' + data.repsToGo + ' TO GO</span>');
}

function renderTeamCard(teamWAP, isDetailedMode) {
    const teamName = teamWAP.affiliate;
    const $container = $('#ahtTop' + teamName);
    if ($container.length === 0) return;

    const $segmentsContainer = $container.find('.progress-segments');
    const $label = $container.find('.progress-label');

    $segmentsContainer.empty();
    $label.empty();

    if (isDetailedMode) {
        renderAthleteSegments(teamWAP, $segmentsContainer, $label);
    } else {
        renderMovementSegments(teamWAP, $segmentsContainer, $label);
    }
}