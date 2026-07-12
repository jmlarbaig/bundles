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

function refreshCummulativeFinish(elementAth) {
    elementAth.$item.find(".score").text('FIN')
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
    elementAth.$item.find(".popup").text('');
    elementAth.$item.find(".popup").hide();
}



function refreshCurrentMvtInProgress(elementAth) {
    let mvtName = elementAth.currentMvt.mvtNames.replace(/(([^\)]+)\).)/g, "")
    let rep = 0;
    let pourcent = 0;

    rep = elementAth.currentMvt.repTarget != 0 ? ((elementAth.currentMvt.scoreAbsMvt + "/" + elementAth.currentMvt.repTarget)) : elementAth.currentMvt.scoreAbsMvt
    mvt = rep + " " + mvtName

    elementAth.$item.find(".popup").text(mvt);

}

function refreshCurrentMvtFinish(elementAth) {

    let score = '';
    let $item = '';
    switch (elementAth.status) {
        case "F":
            score = treatTimeResult(elementAth.result)
        case "T":            // On est en timecap donc format => CAP 10.9
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

    switch (rank) {
        case 1:
            ath.$item.find(element).addClass('first_rank_ath_top')
            ath.$item.find(element).removeClass('initial_rank_top_ath second_rank_ath_top third_rank_ath_top other_rank_ath_top', false)
            break;
        default:
            ath.$item.find(element).addClass('initial_rank_top_ath')
            ath.$item.find(element).removeClass('first_rank_ath_top second_rank_ath_top third_rank_ath_top other_rank_ath_top', false)
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
    if (elementAth.CurrentRank > 1 && elementAth.$item.is(':visible')) {
        setTimeout(() => {
            elementAth.$item.fadeOut(1000);
        }, 5000)
    }
}