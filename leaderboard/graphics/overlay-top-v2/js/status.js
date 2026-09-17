function statusO(ath) {
    console.log("Workout stopped")
    refreshCurrentMvtInStandby(ath)
}

function statusR(ath) {
    console.log("Workout in Standby")
    refreshCurrentMvtInStandby(ath)
}

function statusW0(ath) {
    console.log("Workout started")
}

function statusWS(ath) {
    console.log("Workout in Standby")
    refreshCurrentMvtInStandby(ath)
}



function statusWW(ath) {

    console.log("Athlete in Mvt / Workout in Standby")

    refreshRank(ath)
    refreshUpDown(ath)


    switch (heat.typeWod) {
        case 'repmax':
            refreshRepMax(ath)
            refreshCummulative(ath)
            break;
        case 'time_slowest_better':
            console.log('Ath : ', ath)
            refreshTimeSlowestBetter(ath)
            break;
        default:
            // Case for amrap and for time
            refreshCurrentMvtInProgress(ath)
            refreshCummulative(ath)
            break;
    }
}

function statusWF(ath) {
    console.log("Athlete Finish / Workout in progress")
    // Fait pour faire disparaitre les athletes après le premier pour diffuser les suivants
    hiddenAthlete(ath)
    refreshRank(ath);
    refreshCummulativeFinish(ath);
    refreshCurrentMvtFinish(ath)
}

function statusWT(ath) {
    console.log("Athlete TIME CAP / Workout in progress")
    refreshRank(ath);
    refreshCummulativeFinish(ath);
    refreshCurrentMvtFinish(ath)
}

function statusT(ath) {
    console.log("Workout finish")
    // Classement mise à jour
    refreshRank(ath);
    refreshCummulativeFinish(ath);
    refreshCurrentMvtFinish(ath)
}

