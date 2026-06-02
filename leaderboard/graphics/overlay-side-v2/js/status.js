function statusO(ath) {
    console.log("Workout 0")
    console.log("Ath :", ath)
    refreshCurrentMvtInStandby(ath)
}

function statusR(ath) {
    console.log("Workout in Standby")
    refreshCurrentMvtInStandby(ath)
}

function statusW0(ath) {
    // console.log("Athlete not logged in / Workout in progress")
}

function statusWS(ath) {
    console.log("Workout in Standby")
    refreshCurrentMvtInStandby(ath)
}



function statusWW(ath, athleteBefore) {

    console.log("Athlete in Mvt / Workout in Standby")

    refreshRank(ath)
    refreshUpDown(ath)


    switch (heat.typeWod) {
        case 'repmax':
            refreshRepMax(ath)
            break;
        default:
            // Case for amrap and for time
            refreshCurrentMvtInProgress(ath)
            refreshMvt(ath, athleteBefore)
            break;
    }

    refreshCummulative(ath)

}

function statusWF(ath) {
    console.log("Athlete Finish / Workout in progress")
    // Fait pour faire disparaitre les athletes après le premier pour diffuser les suivants
    refreshRank(ath);
    refreshCummulative(ath);
    refreshCurrentMvtFinish(ath)
}

function statusWT(ath) {
    console.log("Athlete TIME CAP / Workout in progress")
    refreshRank(ath);
    refreshCummulative(ath);
    refreshCurrentMvtFinish(ath)
}

function statusT(ath) {
    console.log("Workout finish")
    // Classement mise à jour
    refreshRank(ath);

    refreshCummulative(ath);
    refreshCurrentMvtFinish(ath)
}

