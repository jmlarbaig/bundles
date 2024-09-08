var percent = 0;

let bestPerf = []
let best = []

function updateDynamics(newScoring, status) {
    try {

        let arrayWAP = []
        Object.values(athletesDivision).forEach((elemAth, key) => {

            cr = 0;
            height_tot = 0;
            let index = 0;
            let scoreForWPA = {
                rep: 0,
                time: 0,
            };


            // on fait 2 each => 1 pour mettre à jour les datas, l'autre pour l'affichage des données.  

            // ON traite les datas quelque soit le status

            let averageIndex = 0;

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

                if (elemAth.length > 2) {
                    // on mémorise le score pour les WPA
                    scoreForWPA.rep += parseInt(elemAth[i].score_abs)
                    scoreForWPA.time += treatResultTimeWPA(elemAth[i]).time
                    averageIndex += treatResultTimeWPA(elemAth[i]).index
                }

                //On traite le tableau des scores
                treatPerfArray(elemAth[i])

            })
            if (setupLeaderboard.value.timeConfig == 'avg' && scoreForWPA.time != 0) {
                scoreForWPA.time = Math.round(scoreForWPA.time / averageIndex);
            }

            arrayWAP[key] = scoreForWPA

        })



        // console.log(arrayWAP)



        Object.values(athletesDivision).forEach((elemAth, key) => {


            let alreadyPassed = false


            // on trie les athlètes en fonction du status
            switch (status) {
                case 'W':
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
                        hideWaitingWPA(arrayWAP)
                        break;
                    case 'R':
                        hideResultWPA(arrayWAP)
                        break;
                    case 'W':

                        // En fonction des status de l'athlète :
                        switch (elemAth[i].status) {
                            case '0':
                                break;
                            case 'S':
                                break;
                            case 'W':

                                changeRank(elemAth[i]);
                                !elemAth[i].$item.find(".score").is(':visible') && elemAth[i].$item.find(".score").show();

                                console.log(elemAth[i].currentMvt)
                                // ON CHECK SI ON EST AU SPRINT
                                if (elemAth[i].currentMvt.mvtNames.toUpperCase().includes("SPRINT")) {
                                    showSprint(elemAth[i])
                                } else {


                                    if (elemAth[i].result == "" && !alreadyPassed) {
                                        alreadyPassed = true;
                                        treatTextMvt(elemAth[i].currentMvt.arrayMvt.toString().replaceAll(',', ' - ').replaceAll('_', ' '))
                                    }

                                    switch (heat.typeWod) {
                                        case 'repmax':
                                            showRepMax(elemAth[i])
                                            break;
                                        default:
                                            showRepMvtInScore(elemAth[i])
                                            if (setupLeaderboard.value.scoreConfig == 'mvt_score') {
                                                if (i != 0) {
                                                    treatDisplayMvtForOthers(elemAth[i], elemAth[i - 1].currentMvt.id)
                                                } else {
                                                    treatDisplayMvtFirst(elemAth[i])
                                                }
                                            }
                                            break;
                                    }

                                    switch (overlay) {
                                        case 'progression':
                                        case 'commentator':
                                        case 'leaderboard':
                                            treatBigScreenMvt(elemAth[i]);
                                            changeColor(elemAth[i], ".popup")
                                            changeColor(elemAth[i], ".rank")
                                            changeColor(elemAth[i], ".score")
                                            changeColor(elemAth[i], ".circle")
                                            break;
                                        case 'overlay_top':
                                            changeColor(elemAth[i], ".rank")
                                            changeColor(elemAth[i], ".ath_sub")
                                            changeColor(elemAth[i], ".popup")
                                            changeColor(elemAth[i], ".score")
                                            break;
                                        case 'overlay_side':
                                            changeColor(elemAth[i], ".rank")
                                            changeColor(elemAth[i], ".popup")
                                            changeColor(elemAth[i], ".score")
                                            break;
                                        case 'versus':
                                            changeColor(elemAth[i], ".popup")
                                            changeColor(elemAth[i], ".score")
                                            break;
                                        default:
                                            changeColor(elemAth[i], ".popup")
                                            changeColor(elemAth[i], ".rank")
                                            changeColor(elemAth[i], ".score")
                                            break;
                                    }
                                }

                                if (overlay == "overlay_wpa" && elemAth.length > 2) {
                                    $('.rank').hide()
                                    treatResultDisplayRepWPA(arrayWAP)
                                }

                                break;
                            case 'F':
                                if (!alreadyPassed) {
                                    treatTextMvt('FINISH')
                                }
                                changeRank(elemAth[i]);
                                treatFinishStatus(elemAth[i]);
                                overlay == 'overlay_top' && hiddenAthlete(elemAth[i])

                                if (overlay == "overlay_wpa" && elemAth.length > 2) {
                                    $('.rank').hide()
                                    treatResultDisplayRepWPA(arrayWAP)
                                }

                                break;
                            case 'T':
                                changeRank(elemAth[i]);
                                treatTimeCapStatus(elemAth[i]);

                                if (overlay == "overlay_wpa" && elemAth.length > 2) {
                                    $('.rank').hide()
                                    treatResultDisplayRepWPA(arrayWAP)
                                }

                                break;
                            default:
                                break;
                        }

                        break;
                    case 'T':
                        if (overlay == "overlay_wpa" && elemAth.length > 2) {
                            $('.rank').hide()
                            treatResultDisplayResultWPA(arrayWAP)
                        }
                        changeLaneToRank(elemAth[i])
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
