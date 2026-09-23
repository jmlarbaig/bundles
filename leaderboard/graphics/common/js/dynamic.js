var percent = 0;

let bestPerf = []
let best = []

const statusOrder = { F: 0, T: 1, W: 2 };
const hasTime = (ath) => Number(ath.time) > 0;



const compare = (a, b) => {
    // 1. Statut : F, puis T, puis W
    if (a.status !== b.status) {
        return statusOrder[a.status] - statusOrder[b.status];
    }

    // 2. W uniquement : plus d'athlètes ayant fini = mieux classé
    if (a.status === 'W') {
        const finishDiff =
            (Number(b.numberOfAthleteFinish) || 0) - (Number(a.numberOfAthleteFinish) || 0);
        if (finishDiff !== 0) return finishDiff;
    }

    // 3. Celui qui a un temps passe avant celui qui n'en a pas
    if (hasTime(a) !== hasTime(b)) {
        return hasTime(a) ? -1 : 1;
    }

    // 4. Les deux ont un temps : le plus petit en premier
    if (hasTime(a) && Number(a.time) !== Number(b.time)) {
        return Number(a.time) - Number(b.time);
    }

    // 5. W uniquement : à égalité, le plus de reps en premier
    if (a.status === 'W') {
        return Number(b.rep) - Number(a.rep);
    }

    return 0;
};


let athletesToHide = [
    'Olivia Kerstetter',
    'Anikha Greer',
    'Emma Lawson',
    'Arielle Loewen']

let workoutIdWhenHide = 131626;
let heatIdWhenHide = 559923139;



let teamInArray = [{ "name": "PRVN", "background-color": "#000000", "background-color-overlay": "#000000d2", color: "white" },
{ "name": "OUTCAST", "background-color": "#535353", "background-color-overlay": "#535353ba", color: "white" },
{ "name": "TTT", "background-color": "#c2351f", "background-color-overlay": "#c2351fb4", color: "white" },
{ "name": "BRUTE", "background-color": "#c775ae", "background-color-overlay": "#c775aec8", color: "white" }]


// À construire une seule fois par appel de updateDynamics, avant les .forEach sur athletesDivision
const teamIndexByName = new Map(
    teamInArray.map((team, index) => [team.name, index])
);


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
                arrayWAP.push({
                    name: teamInArray[i].name,
                    backgroundColor: teamInArray[i]['background-color'], // <-- ajout
                    affiliate: teamInArray[i].name,
                    rep: 0,
                    time: 0,
                    status: 'F',
                    total_reps: workouts[0].total_reps,
                    CurrentRank: 0,
                    numberOfAthleteFinish: 0,
                    numberOfAthleteInTeam: 0,
                    athletes: []
                })
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

                console.log(elemAth)

                // WZAP logic
                if (overlay == 'overlay_wza') {

                    let teamIndex = teamIndexByName.has(elemAth[i].affiliate)
                        ? teamIndexByName.get(elemAth[i].affiliate)
                        : -1;

                    if (teamIndex !== -1) {

                        const teamWAP = arrayWAP[teamIndex];

                        teamWAP.numberOfAthleteInTeam += 1;
                        teamWAP.rep += parseInt(elemAth[i].score_abs);

                        teamWAP.athletes.push({
                            name: elemAth[i].displayName,
                            lane: elemAth[i].lane,
                            repsDone: parseInt(elemAth[i].score_abs) || 0,
                            repsTotal: parseInt(teamWAP.total_reps) || 0,
                            status: elemAth[i].status
                        });

                        if (elemAth[i].status == 'F') {
                            teamWAP.numberOfAthleteFinish += 1;
                            teamWAP.time += treatResultTimeWPA(elemAth[i]).time;
                        }

                        if (status == "T" && (elemAth[i].status == 'T' || elemAth[i].status == '0' || elemAth[i].status == 'S') && (heat.typeWod == 'time' || heat.typeWod == 'time_slowest_better')) {
                            let ti = lastTimeCap.value;
                            let timeCapInS = parseInt(ti.split(':')[0]) * 60 + parseInt(ti.split(':')[1]);
                            let missedReps = parseInt(teamWAP.total_reps) - parseInt(elemAth[i].score_abs);
                            teamWAP.time += (missedReps * 1000) + (timeCapInS * 1000);
                        }

                        averageIndex[teamIndex] += treatResultTimeWPA(elemAth[i]).index;
                    }
                }
            })

            console.log("Team : ", arrayWAP)

            if (overlay == 'overlay_wza') {

                // === Calcul du status final de chaque team ===
                arrayWAP.forEach(team => {
                    team.status = (team.numberOfAthleteFinish === team.numberOfAthleteInTeam && team.numberOfAthleteInTeam > 0)
                        ? 'F'
                        : 'W';
                });
                // ===============================================

                if (status != '0' && status != 'R') {
                    [...arrayWAP]
                        .sort(compare)
                        .forEach((item, index) => {
                            item.CurrentRank = index + 1;
                        });
                }

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
                    const isDetailedMode = elemAth.length > teamInArray.length;

                    if (isDetailedMode) {
                        treatResultDisplayResultWPA(arrayWAP);
                    }

                    arrayWAP.forEach(team => renderTeamCard(team, isDetailedMode));
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


                if (heat.heatId == heatIdWhenHide && athletesToHide.includes(elemAth.displayName) && elemAth.score_abs >= 150) {
                    elemAth.$item.hide();
                }


            })
        })
    }
    catch (e) {
        console.log(e)
    }
}
