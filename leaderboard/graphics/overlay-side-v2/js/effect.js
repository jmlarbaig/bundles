
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
        if (setupFlat != undefined && setupFlat.triangleShow) {
            if (elementAth.CurrentRank != elementAth.OldRank && elementAth.score_abs != 0) {
                if (elementAth.CurrentRank < elementAth.OldRank) {
                    elementAth.$item.find('.triangle').addClass('up_rank')
                    elementAth.$item.find('.triangle').addClass('triangle-up')


                    elementAth.$item.find('.rank-change').removeClass('rank-same')
                    elementAth.$item.find('.rank-change').addClass('rank-up')


                } else if (elementAth.CurrentRank > elementAth.OldRank) {
                    elementAth.$item.find('.triangle').addClass('triangle-down')
                    elementAth.$item.find('.triangle').addClass('down_rank')


                    elementAth.$item.find('.rank-change').addClass('rank-down')
                    elementAth.$item.find('.rank-change').removeClass('rank-up')

                }
                elementAth.$item.find('.triangle').show()
                setTimeout(() => {

                    elementAth.$item.find('.rank-change').removeClass('rank-up rank-down')
                    elementAth.$item.find('.rank-change').addClass('rank-same')

                    elementAth.$item.find('.triangle').removeClass('triangle-down triangle-up')
                    elementAth.$item.find('.triangle').hide()

                }, 1500)
            }
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


    if (overlay == "overlay_side" || overlay == "overlay_wpa") {

        elementAth.$item.find(".score").show()
        elementAth.$item.find(".score").text(result);
        elementAth.$item.find(".popup").hide();
        elementAth.$item.find(".popup_top").text(result);
        elementAth.$item.find(".popup_top").hide();

    } else if (overlay == 'commentator') {
        elementAth.$item.find(".cumul-val").text(result);
        elementAth.$item.find(".cumul-label").text("FINISHED");
        // Current Movement
        elementAth.$item.find(".current-mvt-name").html("⚑ Finished &nbsp;" + result);
        elementAth.$item.find('.current-mvt-progress').hide();
        elementAth.$item.find('.progress-bar-fill').addClass('bar-fin');
        elementAth.$item.find('.progress-bar-label').text('100%').addClass('label-fin');



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
            elementAth.$item.find(".score").text(text + ' ' + setupFlat.unitSelect);
        } else {
            elementAth.$item.find(".score").text(text);
        }

    } else if (overlay == 'commentator') {
        //TODO

    } else {
        elementAth.$item.find(".popup").show();
        elementAth.$item.find(".popup_top").show();
        elementAth.$item.find(".score").text(text);
        elementAth.$item.find(".popup").text(result + ' ' + setupFlat.unitSelect);
        elementAth.$item.find(".popup_top").text(result + ' ' + setupFlat.unitSelect);
    }
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


function showSprint(elementAth) {
    // elementAth.$item.find(".popup").text("FINISH");
    // elementAth.$item.find(".popup").show();
    elementAth.$item.find(".score").text("LAST SPRINT");
}

function showRepMax(elementAth) {
    if (setupFlat.showMvt) {
        if (elementAth.currentMvt.repTarget != elementAth.currentMvt.scoreAbsMvt && overlay != 'overlay_wpa') {
            if (elementAth.currentMvt.repTarget != 0) {
                elementAth.$item.find(".popup").html('ATTEMPTS &#10140; ' + elementAth.currentMvt.repTarget + ' ' + setupFlat.unitSelect);
                overlay == 'versus' ? elementAth.$item.find(".popup").slideDown(1000) : elementAth.$item.find(".popup").show();
                elementAth.$item.find(".popup_top").html('ATTEMPTS &#10140; ' + elementAth.currentMvt.repTarget + ' ' + setupFlat.unitSelect);
                overlay == 'versus' ? elementAth.$item.find(".popup_top").slideDown(1000) : elementAth.$item.find(".popup_top").fadeIn(1000);
            }
        } else {
            elementAth.$item.find(".popup").html('');
            overlay == 'versus' ? elementAth.$item.find(".popup").slideUp(1000) : elementAth.$item.find(".popup").fadeOut(1000);
            elementAth.$item.find(".popup_top").html('');
            overlay == 'versus' ? elementAth.$item.find(".popup_top").slideUp(1000) : elementAth.$item.find(".popup_top").fadeOut(1000);
        }
    } else {
        elementAth.$item.find(".popup").hide();
        elementAth.$item.find(".popup_top").hide();
    }
    switch (setupFlat.scoreConfig) {
        case 'abs_score':
            elementAth.$item.find(".score").text(elementAth.score_abs);
            break;
        case 'rel_score':
            elementAth.$item.find(".score").text(elementAth.score_rel)
            break;
        default:
            elementAth.$item.find(".score").text(elementAth.score_abs);
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

    if (elementAth.currentMvt.mvtNames.toUpperCase() != "WORKOUT" && (setupFlat.showMvt || overlay.includes("commentator") || overlay.includes("sk"))) {
        showMvtInPopup(elementAth)
    } else {
        hideMvtInPopup(elementAth)
    }

}

function showRepPerSec(elementAth) {
    if (elementAth.hasOwnProperty("timeOfRound"))
        elementAth.$item.find(".pace-val").text(elementAth.timeOfRound)
}


function hideRepMvtInScore(elementAth) {
    if (!overlay.includes("overlay_top")) {
        // elementAth.$item.find(".score").hide();
    }
}

function hideColMvt(elementAth) {
    elementAth.$item.find(".popup").hide();
}

function showMvtInPopup(elementAth) {
    let mvtName = elementAth.currentMvt.mvtNames.replace(/(([^\)]+)\).)/g, "")
    let rep = 0;
    let pourcent = 0;
    if (overlay.includes('commentator') || overlay.includes('sk')) {
        rep = elementAth.currentMvt.repTarget != 0 ? ((elementAth.currentMvt.scoreAbsMvt + "/" + elementAth.currentMvt.repTarget)) : elementAth.currentMvt.scoreAbsMvt
        mvt = rep + " " + mvtName
        pourcent = elementAth.currentMvt.scoreAbsMvt / elementAth.currentMvt.repTarget * 100
    }

    if (overlay == 'commentator') {
        elementAth.$item.find(".mvt-name").show();
        elementAth.$item.find(".mvt-name").text(mvtName);
        elementAth.$item.find(".mvt-rep").show();
        elementAth.$item.find('.mvt-rep').text(rep + " reps")
        elementAth.$item.find('.progress-bar-fill').addClass('bar-active')
        elementAth.$item.find('.progress-bar-fill').width(pourcent)
    } else {
        elementAth.$item.find(".popup").show();
        elementAth.$item.find(".popup").text(mvtName);
        elementAth.$item.find(".popup_top").show();
        elementAth.$item.find(".popup_top").text(mvtName);
    }
}

function hideMvtInPopup(elementAth) {
    if (overlay == 'commentator') {
        elementAth.$item.find(".mvt-name").hide();
        elementAth.$item.find(".mvt-rep").hide();
    } else {
        elementAth.$item.find(".popup").hide();
        elementAth.$item.find(".popup").text();
        elementAth.$item.find(".popup_top").hide();
        elementAth.$item.find(".popup_top").text();
    }
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
                if (setupFlat.automaticSchedule) {
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
        // if (overlay != "overlay_wpa") {
        //     elementAth.$item.find(".popup").show();
        //     elementAth.$item.find(".popup_top").show();
        // }

    }
}

function hiddenAthlete(elementAth) {
    if (setupFlat.hiddenAthlete) {
        if (elementAth.CurrentRank > 1 && elementAth.$item.is(':visible')) {
            setTimeout(() => {
                elementAth.$item.fadeOut(1000);
            }, 5000)
        }
    } else if (!setupFlat.hiddenAthlete && !elementAth.$item.is(':visible')) {
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
                let text = `<div class="mvt-cycle">${round.replaceAll('-', '')} : ${time.split(' ')[0]}</div><div class="mvt-cumul">${time.split(' ')[1]}</div></div>`;
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

            // Mettre à jour le HTML
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
    // elementAth.$item.find(".rank").text(elementAth.lane);
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

    switch (setupFlat.scoreConfig) {
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
    if (setupFlat.timeConfig == 'avg') {
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
