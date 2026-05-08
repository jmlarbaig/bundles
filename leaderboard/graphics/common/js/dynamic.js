var percent = 0;

let bestPerf = []
let best = []

function updateDynamics(newScoring, status) {
    try {
        // Premier traitement pour l'affichage

        let arrayWAP = []
        Object.values(athletesDivision).forEach((elemAth, key) => {

            cr = 0;
            height_tot = 0;


            arrayWAP[0] = { rep: 0, time: 0, status: 'F', total_reps: workouts[0].total_reps }
            arrayWAP[1] = { rep: 0, time: 0, status: 'F', total_reps: workouts[0].total_reps }

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

                // WZAP logic
                if (overlay === 'overlay_wza') {
                    if (elemAth[i].affiliate.toLowerCase().includes("north")) {
                        arrayWAP[0].rep += parseInt(elemAth[i].score_abs)
                        arrayWAP[0].time += treatResultTimeWPA(elemAth[i]).time
                        if (arrayWAP[0].status == 'F') {
                            arrayWAP[0].status = elemAth[i].status == 'F' ? 'F' : 'W'
                        }
                        averageIndex[0] += treatResultTimeWPA(elemAth[i]).index
                    } else if (elemAth[i].affiliate.toLowerCase().includes("world")) {
                        arrayWAP[1].rep += parseInt(elemAth[i].score_abs)
                        arrayWAP[1].time += treatResultTimeWPA(elemAth[i]).time
                        averageIndex[1] += treatResultTimeWPA(elemAth[i]).index
                        if (arrayWAP[1].status == 'F') {
                            arrayWAP[1].status = elemAth[i].status == 'F' ? 'F' : 'T'
                        }
                    }
                }
            })

            if (overlay === 'overlay_wza') {
                if (setupFlat.timeConfig == 'avg' && arrayWAP[0].time != 0) {
                    arrayWAP[0].time = Math.round(arrayWAP[0].time / averageIndex[0]);
                }
                if (setupFlat.timeConfig == 'avg' && arrayWAP[1].time != 0) {
                    arrayWAP[1].time = Math.round(arrayWAP[1].time / averageIndex[1]);
                }
            }
        })

        // Deuxieme traitement pour l'affichage

        Object.values(athletesDivision).forEach((elemAth, key) => {


            treatAthleteStatistic(elemAth)

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

            // On Traite l'affichage
            Object.keys(elemAth).forEach(i => {
                switch (status) {
                    case '0':
                        // if (overlay != 'versus_hyperfit') {
                        //     showRepMvtInScore(elemAth[i])
                        //     treatTextMvt("");
                        //     if (!overlay.includes("commentator") && overlay != "sk") {
                        //         hideMvtInPopup(elemAth[i])
                        //         hideRepMvtInScore(elemAth[i])
                        //         initialRankChange(elemAth[i], ".ath")
                        //         initialRankChange(elemAth[i], ".rank")
                        //         initialRankChange(elemAth[i], ".score")
                        //     }
                        // }
                        statusO(elemAth[i])

                        break;
                    case 'R':
                        // if (overlay != 'versus_hyperfit') {
                        //     showRepMvtInScore(elemAth[i])
                        //     if (!overlay.includes("commentator") && overlay != "sk") {
                        //         hideMvtInPopup(elemAth[i])
                        //         hideRepMvtInScore(elemAth[i])
                        //         initialRankChange(elemAth[i], ".ath")
                        //         initialRankChange(elemAth[i], ".rank")
                        //         initialRankChange(elemAth[i], ".score")
                        //     }
                        // }

                        statusR(elemAth[i])
                        break;
                    case 'W':

                        switch (elemAth[i].status) {
                            case '0':

                                // if (overlay != 'commentator' && overlay != 'versus_hyperfit' && overlay != 'sk') {
                                //     elemAth[i].$item.find(".lane").hide()
                                // }
                                // if (overlay != 'versus_hyperfit') {
                                //     showRepMvtInScore(elemAth[i])
                                //     if (!overlay.includes("commentator") && overlay != "sk") {
                                //         // noJudge(elemAth[i])
                                //         hideMvtInPopup(elemAth[i])
                                //         hideRepMvtInScore(elemAth[i])
                                //         changeRankToLane(elemAth[i])
                                //     }
                                // }
                                // switch (heat.typeWod) {
                                //     case 'repmax':
                                //         showRepMax(elemAth[i])
                                //         break;
                                //     default:
                                //         // showRepMvtInScore(elemAth[i])
                                //         if (setupFlat.scoreConfig == 'mvt_score') {
                                //             if (i != 0) {
                                //                 // treatDisplayMvtForOthers(elemAth[i], elemAth[i - 1].currentMvt.id)
                                //             } else {
                                //                 // treatDisplayMvtFirst(elemAth[i])
                                //             }
                                //         }
                                //         break;
                                // }


                                statusW0(elemAth[i])


                                break;
                            case 'S':
                                // if (overlay != 'versus_hyperfit' && overlay != 'commentator' && overlay != 'sk') {
                                //     showRepMvtInScore(elemAth[i])
                                //     hideMvtInPopup(elemAth[i])
                                //     hideRepMvtInScore(elemAth[i])
                                //     changeRankToLane(elemAth[i])
                                // }

                                statusWS(elemAth[i])


                                break;
                            case 'W':
                                // if (overlay != 'commentator' && overlay != 'sk') {
                                //     setupFlat.lane ? elemAth[i].$item.find(".lane").show() : elemAth[i].$item.find(".lane").hide()
                                // }
                                // if (overlay != 'versus_hyperfit' && overlay != 'commentator' && overlay != 'sk') {
                                //     withJudge(elemAth[i])
                                // }

                                // if (overlay != 'versus_hyperfit') {
                                //     changeRank(elemAth[i]);
                                // }




                                // !elemAth[i].$item.find(".score").is(':visible') && elemAth[i].$item.find(".score").show();

                                // // console.log(elemAth[i].currentMvt)
                                // // ON CHECK SI ON EST AU SPRINT

                                // if (elemAth[i].result == "" && !alreadyPassed) {
                                //     treatTextMvt(elemAth[i].currentMvt.arrayMvt.toString().replaceAll(',', '-').replaceAll('_', ' ').replace('-', ''));
                                //     if (elemAth[i].CurrentRank == 1) {
                                //         alreadyPassed = true;
                                //     }
                                // }

                                // switch (heat.typeWod) {
                                //     case 'repmax':
                                //         showRepMax(elemAth[i])
                                //         break;
                                //     default:
                                //         showRepMvtInScore(elemAth[i])
                                //         showRepPerSec(elemAth[i])
                                //         if (overlay == 'versus_hyperfit') {
                                //             treatDisplayMvtFirst(elemAth[i])
                                //         } else {
                                //             if (i != 0) {
                                //                 treatDisplayMvtForOthers(elemAth[i], elemAth[i - 1].currentMvt.id, elemAth[i - 1].currentMvt.rounds)
                                //             } else {
                                //                 treatDisplayMvtFirst(elemAth[i])
                                //             }
                                //         }
                                //         // }
                                //         break;
                                // }
                                // changeFunction(overlay, elemAth[i])
                                // hideColMvt(elemAth[i]);


                                let athleteBefore = i != 0 ? elemAth[i - 1] : null
                                alreadyPassed = statusWW(elemAth[i], athleteBefore, alreadyPassed)

                                break;
                            case 'F':
                                // if (overlay != 'commentator' && overlay != 'sk') {
                                //     setupFlat.lane ? elemAth[i].$item.find(".lane").show() : elemAth[i].$item.find(".lane").hide()
                                // }

                                // if (!alreadyPassed) {
                                //     // treatTextMvt('FINISH')
                                // }
                                // if (overlay != 'overlay_wpa') {
                                //     changeRank(elemAth[i]);
                                //     changeColorFinish(elemAth[i], ".ath")
                                //     changeColorFinishAth(elemAth[i], ".ath")
                                //     changeColorFinish(elemAth[i], ".rank")
                                // }
                                // !elemAth[i].$item.find(".score").is(':visible') && elemAth[i].$item.find(".score").show();
                                // treatFinishStatus(elemAth[i]);

                                // // fait pour faire disparaitre les athletes après le premier pour diffuser les suivants
                                // overlay.includes('overlay_top') && hiddenAthlete(elemAth[i])


                                statusWF(elemAth[i])


                                break;
                            case 'T':
                                // if (overlay != 'commentator') {
                                //     setupFlat.lane ? elemAth[i].$item.find(".lane").show() : elemAth[i].$item.find(".lane").hide()
                                // }

                                // changeRank(elemAth[i]);
                                // changeColorFinish(elemAth[i], ".ath")
                                // changeColorFinishAth(elemAth[i], ".ath")
                                // changeColorFinish(elemAth[i], ".rank")
                                // treatTimeCapStatus(elemAth[i]);

                                statusWT(elemAth[i])

                                break;
                            default:
                                break;
                        }

                        break;
                    case 'T':


                        // changeLaneToRank(elemAth[i])
                        // changeColorFinish(elemAth[i], ".ath")
                        // changeColorFinishAth(elemAth[i], ".ath")
                        // changeColorFinish(elemAth[i], ".rank")

                        // if (elemAth[i].status == "F") {
                        //     treatFinishStatus(elemAth[i])
                        // } else {
                        //     treatTimeCapStatus(elemAth[i])
                        // }

                        // // SAVOIR SI ON REMET à 0 les mvt affichés en haut
                        // if (overlay.includes('overlay_top')) {
                        //     // $('#mvt').text('')
                        //     $('.mvt').text('')
                        // }

                        statusT(elemAth[i])

                        break;
                    default:
                        break;
                }

                // Traitement de la position des athletes sur le leaderboard
                if (overlay != "versus" || overlay != 'overlay_wpa') {
                    if (elemAth.length > 2) {
                        reposition("#leaderboard" + key, elemAth);
                    }
                }
                if (overlay.includes('overlay_top')) {
                    height_tot = height_top
                }
            })
        })
    }
    catch (e) {
        console.log(e)
    }
}
