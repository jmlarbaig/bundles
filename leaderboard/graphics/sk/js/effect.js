treatAthleteStatistic = (elemAth) => {
    return;
}


function treatPerfArray(elementAth) {
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
    mvts = mvts.replace(/\(.*?\)/g, '');
    if (heat.typeWod != 'repmax') {
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
    return;
}

function refreshCurrentMvtInStandby(elementAth) {
    return;
}


function refreshCurrentMvtInProgress(elementAth) {
    let mvtName = elementAth.currentMvt.mvtNames.replace(/(([^\)]+)\).)/g, "")
    let rep = 0;
    let pourcent = 0;

    rep = elementAth.currentMvt.repTarget != 0 ? ((elementAth.currentMvt.scoreAbsMvt + "/" + elementAth.currentMvt.repTarget)) : elementAth.currentMvt.scoreAbsMvt
    mvt = rep + " " + mvtName

    if (setupFlat.showMvt) {
        showMvtInPopup(elementAth, mvt)
    } else {
        hideMvtInPopup(elementAth)
    }
}

function showMvtInPopup(elementAth, mvt) {
    if (elementAth.currentMvt.mvtNames.toUpperCase() != "WORKOUT") {
        elementAth.$item.find(".popup").html(mvt);
        elementAth.$item.find(".popup").show();
    } else {
        hideMvtInPopup(elementAth)
    }
}

function hideMvtInPopup(elementAth) {
    elementAth.$item.find(".popup").text('');
    elementAth.$item.find(".popup").fadeOut(1000);
}

function refreshCurrentMvtFinish(elementAth) {

    let score = '';
    let $item = '';
    switch (elementAth.status) {
        case "F":
            score = treatTimeResult(elementAth.result)
            elementAth.$item.find(".popup").text(score)
            elementAth.$item.find(".popup").show()
            break;
        case "T":
        default:
            elementAth.$item.find(".popup").hide()
    }



}


function refreshRepMax(elementAth) {
    let score = 0;

    if (elementAth.currentMvt.repTarget != 0) {
        score = 'ATTEMPTS ' + elementAth.currentMvt.repTarget + ' ' + setupFlat.unitSelect;
    }


    if (setupFlat.showMvt) {
        if (elementAth.currentMvt.repTarget != elementAth.currentMvt.scoreAbsMvt) {
            if (elementAth.currentMvt.repTarget != 0) {
                elementAth.$item.find(".popup").text(score);
                elementAth.$item.find(".popup").show();
            } else {
                elementAth.$item.find(".popup").text('');
                elementAth.$item.find(".popup").hide();
            }
        } else {
            elementAth.$item.find(".popup").text('');
            elementAth.$item.find(".popup").hide();
        }
    } else {
        elementAth.$item.find(".popup").hide();
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

    if (elementAth.currentMvt.mvtNames.toUpperCase() != "WORKOUT" && (setupFlat.showMvt)) {
        showMvtInPopup(elementAth)
    } else {
        hideMvtInPopup(elementAth)
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


    if (overlay == 'commentator' || overlay.includes('sk')) {
        let rep = elementAth.currentMvt.repTarget != 0 ? ((elementAth.currentMvt.scoreAbsMvt + "/" + elementAth.currentMvt.repTarget)) : elementAth.currentMvt.scoreAbsMvt
        textTomvt = rep + ' ' + mvt;
    }

    if (elementAth.currentMvt.id != idToCompare || elementAth.currentMvt.rounds != roundsToCompare) {
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

    }
}
