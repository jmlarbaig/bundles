var percent = 0;

let bestPerf = []
let best = []

function updateDynamics(newScoring, status) {
    try {

        console.log("updateDynamics", status)

        let arrayWAP = []
        Object.values(athletesDivision).forEach((elemAth, key) => {

            cr = 0;
            height_tot = 0;
            let index = 0;
            // let scoreForWPA = {
            //     rep: 0,
            //     time: 0,
            // };

            console.log(workouts)

            arrayWAP[0] = { rep: 0, time: 0, status: 'F', total_reps: workouts[0].total_reps }
            arrayWAP[1] = { rep: 0, time: 0, status: 'F', total_reps: workouts[0].total_reps }


            // console.log(arrayWAP)


            // on fait 2 each => 1 pour mettre à jour les datas, l'autre pour l'affichage des données.  

            // ON traite les datas quelque soit le status

            let averageIndex = [0, 0];

            Object.keys(elemAth).forEach(i => {


                //On met en mémoire l'ancien rank
                elemAth[i].OldRank = elemAth[i].CurrentRank

                // On met en mémoire dans la variable elemAth les nouvelles valeurs
                elemAth[i] = Object.assign({}, elemAth[i], fetchNewData(newScoring, elemAth[i].lane));

                // On sécurise le current rank à 0 si null
                if (elemAth[i].CurrentRank == null) {
                    elemAth[i].CurrentRank = 0;
                }

                // On traite les mouvements
                elemAth[i].currentMvt = TreatMvt(elemAth[i]);


                //On traite le tableau des scores
                treatPerfArray(elemAth[i])

                // if (elemAth.length > 2) {
                // console.log("Score WPA", arrayWAP)
                if (elemAth[i].affiliate.toLowerCase().includes("north")) {
                    // console.log("WORLD : elementAth[i]", elemAth[i])
                    // on mémorise le score pour les WPA
                    // console.log("NORTH : elementAth[i]", elemAth[i].score_abs)
                    arrayWAP[0].rep += parseInt(elemAth[i].score_abs)
                    arrayWAP[0].time += treatResultTimeWPA(elemAth[i]).time
                    if (arrayWAP[0].status == 'F') {
                        arrayWAP[0].status = elemAth[i].status == 'F' ? 'F' : 'W'
                    }
                    averageIndex[0] += treatResultTimeWPA(elemAth[i]).index
                } else if (elemAth[i].affiliate.toLowerCase().includes("world")) {
                    // console.log("NORTH : elementAth[i]", elemAth[i])
                    // on mémorise le score pour les WPA
                    // console.log("WORLD : elementAth[i]", elemAth[i].score_abs)
                    arrayWAP[1].rep += parseInt(elemAth[i].score_abs)
                    arrayWAP[1].time += treatResultTimeWPA(elemAth[i]).time
                    averageIndex[1] += treatResultTimeWPA(elemAth[i]).index
                    if (arrayWAP[1].status == 'F') {
                        arrayWAP[1].status = elemAth[i].status == 'F' ? 'F' : 'T'
                    }
                }
                // }


            })
            if (setupFlat.timeConfig == 'avg' && arrayWAP[0].time != 0) {
                arrayWAP[0].time = Math.round(arrayWAP[0].time / averageIndex[0]);
            }
            if (setupFlat.timeConfig == 'avg' && arrayWAP[1].time != 0) {
                arrayWAP[1].time = Math.round(arrayWAP[1].time / averageIndex[1]);
            }

            // arrayWAP[key] = scoreForWPA

        })



        // console.log(arrayWAP)

        Object.values(athletesDivision).forEach((elemAth, key) => {


            let alreadyPassed = false


            // on trie les athlètes en fonction du status
            switch (status) {
                case 'W':
                    setupFlat.rankingConfig == 'rank' ? elemAth.sort(ascendingRank) : elemAth.sort(ascendingLane)
                    break;
                case 'T':
                    elemAth.sort(ascendingRank);
                    break;
                case '0':
                case 'R':
                default:
                    elemAth.sort(ascendingLane);
                    break;
            }

            // console.table("elemAth = ", elemAth, "for div key : ", key)

            // On Traite l'affichage

            Object.keys(elemAth).forEach(i => {
                switch (status) {
                    case '0':
                        // initialRankChange(elemAth[i], ".popup")
                        if (overlay != 'versus_hyperfit') {
                            showRepMvtInScore(elemAth[i])
                            treatTextMvt("");
                            if (!overlay.includes("commentator") && overlay != "sk") {
                                hideMvtInPopup(elemAth[i])
                                hideRepMvtInScore(elemAth[i])
                                initialRankChange(elemAth[i], ".ath")
                                initialRankChange(elemAth[i], ".rank")
                                initialRankChange(elemAth[i], ".score")
                            }
                        }

                        hideWaitingWPA(arrayWAP)
                        break;
                    case 'R':
                        if (overlay != 'versus_hyperfit') {
                            showRepMvtInScore(elemAth[i])
                            if (!overlay.includes("commentator") && overlay != "sk") {
                                hideMvtInPopup(elemAth[i])
                                hideRepMvtInScore(elemAth[i])
                                initialRankChange(elemAth[i], ".ath")
                                initialRankChange(elemAth[i], ".rank")
                                initialRankChange(elemAth[i], ".score")
                            }
                        }
                        hideResultWPA(arrayWAP)
                        break;
                    case 'W':

                        // En fonction des status de l'athlète :
                        // console.log(elemAth[i])
                        switch (elemAth[i].status) {
                            case '0':

                                if (overlay != 'commentator' && overlay != 'versus_hyperfit' && overlay != 'sk') {
                                    elemAth[i].$item.find(".lane").hide()
                                }
                                if (overlay != 'versus_hyperfit') {
                                    showRepMvtInScore(elemAth[i])
                                    if (!overlay.includes("commentator") && overlay != "sk") {
                                        // noJudge(elemAth[i])
                                        hideMvtInPopup(elemAth[i])
                                        hideRepMvtInScore(elemAth[i])
                                        changeRankToLane(elemAth[i])
                                    }
                                }
                                switch (heat.typeWod) {
                                    case 'repmax':
                                        showRepMax(elemAth[i])
                                        break;
                                    default:
                                        // showRepMvtInScore(elemAth[i])
                                        if (setupFlat.scoreConfig == 'mvt_score') {
                                            if (i != 0) {
                                                // treatDisplayMvtForOthers(elemAth[i], elemAth[i - 1].currentMvt.id)
                                            } else {
                                                // treatDisplayMvtFirst(elemAth[i])
                                            }
                                        }
                                        break;
                                }
                                break;
                            case 'S':
                                if (overlay != 'versus_hyperfit' && overlay != 'commentator' && overlay != 'sk') {
                                    showRepMvtInScore(elemAth[i])
                                    hideMvtInPopup(elemAth[i])
                                    hideRepMvtInScore(elemAth[i])
                                    changeRankToLane(elemAth[i])
                                }
                                break;
                            case 'W':
                                if (overlay != 'commentator' && overlay != 'sk') {
                                    setupFlat.lane ? elemAth[i].$item.find(".lane").show() : elemAth[i].$item.find(".lane").hide()
                                }
                                if (overlay != 'versus_hyperfit' && overlay != 'commentator' && overlay != 'sk') {
                                    withJudge(elemAth[i])
                                }

                                if (overlay != 'versus_hyperfit') {
                                    changeRank(elemAth[i]);
                                }

                                // }


                                !elemAth[i].$item.find(".score").is(':visible') && elemAth[i].$item.find(".score").show();

                                // console.log(elemAth[i].currentMvt)
                                // ON CHECK SI ON EST AU SPRINT
                                // if (elemAth[i].currentMvt.mvtNames.toUpperCase().includes("SPRINT") || elemAth[i].currentMvt.mvtNames.toUpperCase().includes("FINISH")) {
                                if (false) {
                                    showSprint(elemAth[i])
                                } else {


                                    if (elemAth[i].result == "" && !alreadyPassed) {
                                        treatTextMvt(elemAth[i].currentMvt.arrayMvt.toString().replaceAll(',', '-').replaceAll('_', ' ').replace('-', ''));
                                        if (elemAth[i].CurrentRank == 1) {
                                            alreadyPassed = true;
                                        }
                                    }

                                    switch (heat.typeWod) {
                                        case 'repmax':
                                            showRepMax(elemAth[i])
                                            overlay == 'overlay_wpa' && hideRank(elemAth[i])
                                            overlay == 'commentator' && hideRank(elemAth[i])
                                            overlay == 'sk' && hideRank(elemAth[i])
                                            break;
                                        default:
                                            showRepMvtInScore(elemAth[i])
                                            showRepPerSec(elemAth[i])
                                            // if (setupFlat.scoreConfig == 'mvt_score') {
                                            if (overlay == 'versus_hyperfit') {
                                                treatDisplayMvtFirst(elemAth[i])
                                            } else {
                                                if (i != 0) {
                                                    treatDisplayMvtForOthers(elemAth[i], elemAth[i - 1].currentMvt.id, elemAth[i - 1].currentMvt.rounds)
                                                } else {
                                                    treatDisplayMvtFirst(elemAth[i])
                                                }
                                            }
                                            // }
                                            break;
                                    }
                                    if (overlay != 'overlay_wpa') {
                                        changeFunction(overlay, elemAth[i])
                                    }
                                    if (setupFlat.scoreConfig == 'rel_score' || setupFlat.scoreConfig == 'abs_score') {
                                        if (overlay != 'progression' && overlay != 'commentator' && overlay != 'leaderboard' && overlay != 'sk') {
                                            hideColMvt(elemAth[i])
                                        }
                                    }
                                }

                                // if (overlay == "overlay_wpa" && elemAth.length > 2) {
                                // $('.rank').hide()
                                // console.log(arrayWAP)
                                // treatResultDisplayRepWPA(arrayWAP)
                                // }

                                break;
                            case 'F':
                                if (overlay != 'commentator' && overlay != 'sk') {
                                    setupFlat.lane ? elemAth[i].$item.find(".lane").show() : elemAth[i].$item.find(".lane").hide()
                                }
                                if (!alreadyPassed) {
                                    // treatTextMvt('FINISH')
                                }
                                if (overlay != 'overlay_wpa') {
                                    changeRank(elemAth[i]);
                                    changeColorFinish(elemAth[i], ".ath")
                                    changeColorFinishAth(elemAth[i], ".ath")
                                    changeColorFinish(elemAth[i], ".rank")
                                }
                                !elemAth[i].$item.find(".score").is(':visible') && elemAth[i].$item.find(".score").show();
                                treatFinishStatus(elemAth[i]);
                                overlay.includes('overlay_top') && hiddenAthlete(elemAth[i])

                                if (overlay == "overlay_wpa") {
                                    treatResultDisplayRepWPA(arrayWAP)
                                }

                                break;
                            case 'T':
                                if (overlay != 'commentator') {
                                    setupFlat.lane ? elemAth[i].$item.find(".lane").show() : elemAth[i].$item.find(".lane").hide()
                                }
                                console.log("pop T")
                                if (overlay != 'overlay_wpa') {
                                    changeRank(elemAth[i]);
                                    changeColorFinish(elemAth[i], ".ath")
                                    changeColorFinishAth(elemAth[i], ".ath")
                                    changeColorFinish(elemAth[i], ".rank")
                                }
                                treatTimeCapStatus(elemAth[i]);
                                if (overlay == "overlay_wpa") {
                                    treatResultDisplayRepWPA(arrayWAP)
                                }

                                break;
                            default:
                                break;
                        }

                        break;
                    case 'T':
                        if (overlay == "overlay_wpa") {
                            // $('.rank').hide()
                            treatResultDisplayResultWPA(arrayWAP)
                        }
                        changeLaneToRank(elemAth[i])
                        changeColorFinish(elemAth[i], ".ath")
                        changeColorFinishAth(elemAth[i], ".ath")
                        changeColorFinish(elemAth[i], ".rank")
                        if (elemAth[i].status == "F") {
                            treatFinishStatus(elemAth[i])
                        } else {
                            treatTimeCapStatus(elemAth[i])
                        }
                        treatLeaderboardAuto()
                        if (overlay.includes('overlay_top')) {
                            // $('#mvt').text('')
                            $('.mvt').text('')
                        }
                        break;
                    default:
                        break;
                }
                if (overlay.includes('overlay_top')) {
                    height_tot = height_top
                } else {
                    // if (setupFlat != undefined && setupFlat != {} && ((setupFlat.numberAthletes - 1) == i || (elemAth.length - 1) == i)) {
                    //     (height_tot += elemAth[i].$item.height() + 10 + parseInt(elemAth[i].$item.css('margin-top')))
                    // }
                }


                if (overlay == "overlay_wpa") {
                    if (elemAth.length <= 2) {
                        // width = elemAth[i].$item.find('.score').width() + Math.round(parseInt(elemAth[i].$item.find('.score').css('padding').split(' ')[1].replace('px', '')) * 2) - 2
                        // elemAth[i].$item.find('.popup_top').width(width)
                    }
                }
            })


            if (!overlay.includes("versus") || overlay != 'overlay_wpa') {
                // if (elemAth.length > 2) {
                reposition("#leaderboard" + key, elemAth);
                // }
            }

            if (overlay !== 'commentator' && overlay != 'sk') {
                // $("#leaderboard" + key + " #athletes").height(height_tot)
                // $("#leaderboard" + key).height(height_tot + $("#leaderboard" + key + " .header").height() + 15)
            }

        })
    }
    catch (e) {
        console.log(e)
    }
}


function changeFunction(overlay, elementAth) {
    switch (overlay) {
        case 'progression':
        case 'commentator':
        case 'leaderboard':
            treatBigScreenMvt(elementAth);
            changeColor(elementAth, ".popup")
            changeColor(elementAth, ".rank")
            changeColor(elementAth, ".score")
            changeColor(elementAth, ".circle")
            break;
        case 'overlay_top':
            changeColor(elementAth, ".rank")
            changeColor(elementAth, ".ath_sub")
            changeColor(elementAth, ".popup")
            // changeColor(elementAth, ".score")
            break;
        case 'overlay_side':
            changeColor(elementAth, ".rank")
            changeColor(elementAth, ".popup")
            changeColorAth(elementAth, ".ath")
            // changeColor(elementAth, ".score")
            break;
        case 'versus':
            changeColor(elementAth, ".popup")
            changeColor(elementAth, ".score")
            break;
        case 'versus_hyperfit':
            break;
        case 'overlay_top_v2':
            changeColorAth(elementAth, ".ath")
            break;
        default:
            changeColor(elementAth, ".popup")
            changeColor(elementAth, ".rank")
            changeColor(elementAth, ".score")
            break;

    }
}