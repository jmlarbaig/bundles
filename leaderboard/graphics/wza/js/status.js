function statusO(ath) {
    console.log("Workout 0")
    refreshCurrentMvtInStandby(ath)
}

function statusR(ath) {
    console.log("Workout in Standby")
    refreshCurrentMvtInStandby(ath)
}

function statusW0(ath) {
    // console.log("Athlete not logged in / Workout in progress")
    // switch (heat.typeWod) {
    //     case 'repmax':
    //         refreshRepMax(ath)
    //         break;
    //     default:
    //         refreshCurrentMvtInProgress(ath)
    //         break;
    // }
}

function statusWS(ath) {
    console.log("Workout in Standby")
    refreshCurrentMvtInStandby(ath)
}



function statusWW(ath) {
    console.log("Workout in progress")

    refreshRank(ath)
    refreshUpDown(ath)
    // console.log("heat.typeWod = ", heat.typeWod)
    switch (heat.typeWod) {
        case 'repmax':
            // console.log("Refresh Rep Max")
            refreshRepMax(ath)
            refreshCummulative(ath)
            break;
        case 'time_slowest_better':
            // console.log("Refresh Time Slowest Better")
            refreshTimeSlowestBetter(ath)
            break;
        default:
            // Case for amrap and for time
            // console.log("Refresh Current Mvt In Progress")
            // refreshCurrentMvtInProgress(ath)
            refreshCummulative(ath)
            break;
    }

}

function statusWF(ath) {
    console.log("Athlete Finish / Workout in progress")
    // Fait pour faire disparaitre les athletes après le premier pour diffuser les suivants
    refreshRank(ath);
    refreshCummulativeFinish(ath);
    // refreshCurrentMvtFinish(ath)
}

function statusWT(ath) {
    console.log("Athlete TIME CAP / Workout in progress")
    refreshRank(ath);
    refreshCummulativeFinish(ath);
    // refreshCurrentMvtFinish(ath)
}

function statusT(ath) {
    // console.log("Workout finish")
    // Classement mise à jour
    refreshRank(ath);

    refreshCummulativeFinish(ath);
    // refreshCurrentMvtFinish(ath)
}

