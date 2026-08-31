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
            break;
    }

    // showRepMvtInScore(ath)
    refreshCummulative(ath)

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
    console.log("Workout finish")
    // Classement mise à jour
    refreshRank(ath);

    refreshCummulativeFinish(ath);
    // refreshCurrentMvtFinish(ath)
}

