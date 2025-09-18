var percent = 0;

let bestPerf = []
let best = []

function updateDynamics(newScoring, status) {
    try {

        // console.log("updateDynamics", status)

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

                // if (elemAth.length > 2) {
                console.log("Score WPA", arrayWAP)
                if (elemAth[i].affiliate.toLowerCase().includes("north")) {
                    // console.log("WORLD : elementAth[i]", elemAth[i])
                    // on mémorise le score pour les WPA
                    console.log("NORTH : elementAth[i]", elemAth[i].score_abs)
                    arrayWAP[0].rep += parseInt(elemAth[i].score_abs)
                    arrayWAP[0].time += treatResultTimeWPA(elemAth[i]).time
                    if (arrayWAP[0].status == 'F') {
                        arrayWAP[0].status = elemAth[i].status == 'F' ? 'F' : 'W'
                    }
                    averageIndex[0] += treatResultTimeWPA(elemAth[i]).index
                } else if (elemAth[i].affiliate.toLowerCase().includes("world")) {
                    // console.log("NORTH : elementAth[i]", elemAth[i])
                    // on mémorise le score pour les WPA
                    console.log("WORLD : elementAth[i]", elemAth[i].score_abs)
                    arrayWAP[1].rep += parseInt(elemAth[i].score_abs)
                    arrayWAP[1].time += treatResultTimeWPA(elemAth[i]).time
                    averageIndex[1] += treatResultTimeWPA(elemAth[i]).index
                    if (arrayWAP[1].status == 'F') {
                        arrayWAP[1].status = elemAth[i].status == 'F' ? 'F' : 'T'
                    }
                }
                // }

                //On traite le tableau des scores
                treatPerfArray(elemAth[i])

            })
            if (setupLeaderboard.value.timeConfig == 'avg' && arrayWAP[0].time != 0) {
                arrayWAP[0].time = Math.round(arrayWAP[0].time / averageIndex[0]);
            }
            if (setupLeaderboard.value.timeConfig == 'avg' && arrayWAP[1].time != 0) {
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
                    setupLeaderboard.value.rankingConfig == 'rank' ? elemAth.sort(ascendingRank) : elemAth.sort(ascendingLane)
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
                        hideMvtInPopup(elemAth[i])
                        hideRepMvtInScore(elemAth[i])
                        initialRankChange(elemAth[i], ".ath")
                        initialRankChange(elemAth[i], ".rank")
                        initialRankChange(elemAth[i], ".score")

                        hideWaitingWPA(arrayWAP)
                        break;
                    case 'R':
                        hideMvtInPopup(elemAth[i])
                        hideRepMvtInScore(elemAth[i])
                        initialRankChange(elemAth[i], ".ath")
                        initialRankChange(elemAth[i], ".rank")
                        initialRankChange(elemAth[i], ".score")
                        hideResultWPA(arrayWAP)
                        break;
                    case 'W':

                        // En fonction des status de l'athlète :
                        // console.log(elemAth[i])
                        switch (elemAth[i].status) {
                            case '0':
                                elemAth[i].$item.find(".lane").hide()
                                noJudge(elemAth[i])
                                hideMvtInPopup(elemAth[i])
                                hideRepMvtInScore(elemAth[i])
                                changeRankToLane(elemAth[i])
                                switch (heat.typeWod) {
                                    case 'repmax':
                                        showRepMax(elemAth[i])
                                        break;
                                    default:
                                        // showRepMvtInScore(elemAth[i])
                                        if (setupLeaderboard.value.scoreConfig == 'mvt_score') {
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
                                hideMvtInPopup(elemAth[i])
                                hideRepMvtInScore(elemAth[i])
                                changeRankToLane(elemAth[i])
                                break;
                            case 'W':
                                setupLeaderboard.value.lane ? elemAth[i].$item.find(".lane").show() : elemAth[i].$item.find(".lane").hide()
                                withJudge(elemAth[i])
                                // console.log("Athlete with statut W :", elemAth[i])
                                // if (overlay != 'overlay_wpa') {
                                changeRank(elemAth[i]);
                                // }


                                !elemAth[i].$item.find(".score").is(':visible') && elemAth[i].$item.find(".score").show();

                                // console.log(elemAth[i].currentMvt)
                                // ON CHECK SI ON EST AU SPRINT
                                if (elemAth[i].currentMvt.mvtNames.toUpperCase().includes("SPRINT") || elemAth[i].currentMvt.mvtNames.toUpperCase().includes("FINISH")) {
                                    showSprint(elemAth[i])
                                } else {


                                    if (elemAth[i].result == "" && !alreadyPassed) {
                                        alreadyPassed = true;
                                        treatTextMvt(elemAth[i].currentMvt.arrayMvt.toString().replaceAll(',', ' - ').replaceAll('_', ' '))
                                    }

                                    switch (heat.typeWod) {
                                        case 'repmax':
                                            showRepMax(elemAth[i])
                                            overlay == 'overlay_wpa' && hideRank(elemAth[i])
                                            break;
                                        default:
                                            showRepMvtInScore(elemAth[i])
                                            // if (setupLeaderboard.value.scoreConfig == 'mvt_score') {
                                            if (i != 0) {
                                                treatDisplayMvtForOthers(elemAth[i], elemAth[i - 1].currentMvt.id)
                                            } else {
                                                treatDisplayMvtFirst(elemAth[i])
                                            }
                                            // }
                                            break;
                                    }
                                    if (overlay != 'overlay_wpa') {
                                        changeFunction(overlay, elemAth[i])
                                    }
                                    if (setupLeaderboard.value.scoreConfig == 'rel_score' || setupLeaderboard.value.scoreConfig == 'abs_score') {
                                        if (overlay == 'progression' || overlay == 'commentator' || overlay == 'leaderboard') {
                                            hideColMvt(elemAth[i])
                                        }
                                    }
                                }

                                // if (overlay == "overlay_wpa" && elemAth.length > 2) {
                                // $('.rank').hide()
                                // console.log(arrayWAP)
                                treatResultDisplayRepWPA(arrayWAP)
                                // }

                                break;
                            case 'F':
                                setupLeaderboard.value.lane ? elemAth[i].$item.find(".lane").show() : elemAth[i].$item.find(".lane").hide()
                                if (!alreadyPassed) {
                                    treatTextMvt('FINISH')
                                }
                                if (overlay != 'overlay_wpa') {
                                    changeRank(elemAth[i]);
                                    changeColorFinish(elemAth[i], ".ath")
                                    changeColorFinishAth(elemAth[i], ".ath")
                                    changeColorFinish(elemAth[i], ".rank")
                                }
                                treatFinishStatus(elemAth[i]);
                                overlay == 'overlay_top' && hiddenAthlete(elemAth[i])

                                if (overlay == "overlay_wpa") {
                                    treatResultDisplayRepWPA(arrayWAP)
                                }

                                break;
                            case 'T':
                                setupLeaderboard.value.lane ? elemAth[i].$item.find(".lane").show() : elemAth[i].$item.find(".lane").hide()
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
                        if (overlay == 'overlay_top') {
                            elemAth[i].$item.is(':hidden') && showHiddenAthlete(elemAth[i])
                            $('#mvt').text('FINISH')
                            $('.mvt').text('FINISH')
                        }
                        break;
                    default:
                        break;
                }
                if (overlay === 'overlay_top') {
                    height_tot = height_top
                } else {
                    (height_tot += elemAth[i].$item.height() + 10)
                }


                if (overlay == "overlay_wpa") {
                    if (elemAth.length <= 2) {
                        // width = elemAth[i].$item.find('.score').width() + Math.round(parseInt(elemAth[i].$item.find('.score').css('padding').split(' ')[1].replace('px', '')) * 2) - 2
                        // elemAth[i].$item.find('.popup_top').width(width)
                    }
                }
            })


            if (overlay != "versus" || overlay != 'overlay_wpa') {
                if (elemAth.length > 2) {
                    reposition("#leaderboard" + key, elemAth);
                }
            }

            if (overlay !== 'commentator') {
                $("#leaderboard" + key + " #athletes").height(height_tot)
                $("#leaderboard" + key).height(height_tot + $("#leaderboard" + key + " .header").height() + 15)
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
        default:
            changeColor(elementAth, ".popup")
            changeColor(elementAth, ".rank")
            changeColor(elementAth, ".score")
            break;
    }
}