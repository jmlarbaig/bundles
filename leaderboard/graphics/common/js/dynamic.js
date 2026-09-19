var percent = 0;

let bestPerf = []
let best = []

let teamInArray = [{ "name": "PRVN", "background-color": "#000000", "background-color-overlay": "#000000d2", color: "white" },
{ "name": "OUTCAST", "background-color": "#535353", "background-color-overlay": "#535353ba", color: "white" },
{ "name": "TTT", "background-color": "#c2351f", "background-color-overlay": "#c2351fb4", color: "white" },
{ "name": "BRUTE", "background-color": "#c775ae", "background-color-overlay": "#c775aec8", color: "white" }]



let arrayWAP = []
let averageIndex = []

function updateDynamics(newScoring, status) {
    try {
        // Premier traitement pour l'affichage

        arrayWAP = []
        averageIndex = [];
        Object.values(athletesDivision).forEach((elemAth, key) => {

            cr = 0;
            height_tot = 0;


            for (let i = 0; i < teamInArray.length; i++) {
                arrayWAP.push({ rep: 0, time: 0, status: 'F', total_reps: workouts[0].total_reps })
                averageIndex.push(0)
            }

            // on fait 2 each => 1 pour mettre à jour les datas, l'autre pour l'affichage des données.  

            // ON traite les datas quelque soit le status


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
                if (overlay == 'overlay_wza') {

                    let teamIndex = teamInArray.findIndex(team => team.name === elemAth[i].affiliate);
                    if (teamIndex !== -1) {
                        // arrayWAP[teamIndex].rep += parseInt(elemAth[i].score_abs)
                        // arrayWAP[teamIndex].time += treatResultTimeWPA(elemAth[i]).time
                        if (arrayWAP[teamIndex].status == 'F') {
                            // arrayWAP[teamIndex].status = elemAth[i].status == 'F' ? 'F' : 'W'
                            if (elemAth[i].status == 'F') {
                                arrayWAP[teamIndex].time += treatResultTimeWPA(elemAth[i]).time
                            } else {
                                arrayWAP[teamIndex].rep += parseInt(elemAth[i].score_abs)
                            }

                            // console.log("teamIndex = ", teamIndex, " arrayWAP[teamIndex] = ", arrayWAP[teamIndex], " elemAth[i] = ", elemAth[i])

                            if (status == "T" && (elemAth[i].status == 'T' || elemAth[i].status == '0' || elemAth[i].status == 'S') && (heat.typeWod == 'time' || heat.typeWod == 'time_slowest_better')) {
                                let ti = lastTimeCap.value;
                                let timeCapInS = parseInt(ti.split(':')[0]) * 60 + parseInt(ti.split(':')[1])
                                // console.log("timeCapInS: ", timeCapInS * 1000)
                                let miseReps = parseInt(arrayWAP[teamIndex].total_reps) - parseInt(elemAth[i].score_abs)
                                // console.log("Mise reps: ", miseReps)
                                let timeAdded = (miseReps * 1000) + (timeCapInS * 1000)
                                arrayWAP[teamIndex].time += timeAdded;
                            }

                        }
                        // console.log('teamIndex', teamIndex, 'arrayWAP[teamIndex]', arrayWAP[teamIndex], 'elemAth[i]', elemAth[i])
                        averageIndex[teamIndex] += treatResultTimeWPA(elemAth[i]).index
                    }
                }
            })

            if (overlay == 'overlay_wza') {
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

                // console.log("overlay = ", overlay, " athletesDivision.length = ", elemAth.length, " teamInArray.length = ", teamInArray.length)
                if (overlay == "overlay_wza" && elemAth.length > teamInArray.length) {
                    // console.log("overlay_wza treatResultDisplayResultWPA")
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
