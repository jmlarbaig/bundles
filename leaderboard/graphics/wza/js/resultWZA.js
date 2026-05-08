function treatResultWZA(athletesDivision) {
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
            // }


        })
        if (setupFlat.timeConfig == 'avg' && arrayWAP[0].time != 0) {
            arrayWAP[0].time = Math.round(arrayWAP[0].time / averageIndex[0]);
        }
        if (setupFlat.timeConfig == 'avg' && arrayWAP[1].time != 0) {
            arrayWAP[1].time = Math.round(arrayWAP[1].time / averageIndex[1]);
        }


    })
    return arrayWAP;
}
