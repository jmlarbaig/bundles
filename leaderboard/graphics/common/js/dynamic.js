var percent = 0;

let bestPerf = []
let best = []

let teamInArray = [{ "name": "PRVN", "background-color": "black", color: "white" },
{ "name": "OUTCAST", "background-color": "#535353", color: "white" },
{ "name": "TTT", "background-color": "#cf5341", color: "white" },
{ "name": "BRUTE", "background-color": "#c775af", color: "white" }]



let arrayWAP = []

function updateDynamics(newScoring, status) {
    try {
        // Premier traitement pour l'affichage

        arrayWAP = []
        Object.values(athletesDivision).forEach((elemAth, key) => {

            cr = 0;
            height_tot = 0;


            for (let i = 0; i < teamInArray.length; i++) {
                arrayWAP.push({ rep: 0, time: 0, status: 'F', total_reps: workouts[0].total_reps })
            }

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
                    if (teamInArray.includes(elemAth[i].affiliate)) {
                        let teamIndex = teamInArray.indexOf(elemAth[i].affiliate);
                        arrayWAP[teamIndex].rep += parseInt(elemAth[i].score_abs)
                        arrayWAP[teamIndex].time += treatResultTimeWPA(elemAth[i]).time
                        if (arrayWAP[teamIndex].status == 'F') {
                            arrayWAP[teamIndex].status = elemAth[i].status == 'F' ? 'F' : 'W'
                        }
                        averageIndex[teamIndex] += treatResultTimeWPA(elemAth[i]).index
                    }
                }
            })

            if (overlay === 'overlay_wza') {
                if (setupFlat.timeConfig == 'avg') {
                    for (let i = 0; i < arrayWAP.length; i++) {
                        if (arrayWAP[i].time != 0) {
                            arrayWAP[i].time = Math.round(arrayWAP[i].time / averageIndex[i]);
                        }
                    }
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

                if (overlay == "overlay_wza") {
                    treatResultDisplayResultWPA(arrayWAP)
                }

                // Traitement de la position des athletes sur le leaderboard
                if (overlay != "versus") {
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
