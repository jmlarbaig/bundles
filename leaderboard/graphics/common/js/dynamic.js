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
                if (overlay == "commentator") {
                    treatPerfArray(elemAth[i])
                }

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
                        statusO(elemAth[i])
                        break;
                    case 'R':
                        statusR(elemAth[i])
                        break;
                    case 'W':
                        switch (elemAth[i].status) {
                            case '0':
                                statusW0(elemAth[i])
                                break;
                            case 'S':
                                statusWS(elemAth[i])
                                break;
                            case 'W':
                                handleFirstAthleteWithoutResult(elemAth)
                                let athleteBefore = i != 0 ? elemAth[i - 1] : null
                                statusWW(elemAth[i], athleteBefore)
                                break;
                            case 'F':
                                statusWF(elemAth[i])
                                break;
                            case 'T':
                                statusWT(elemAth[i])
                                break;
                            default:
                                break;
                        }

                        break;
                    case 'T':
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
