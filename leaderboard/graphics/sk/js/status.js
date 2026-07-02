function statusO(ath) {
    refreshCurrentMvtInStandby(ath)
    resetPerfArray(ath)
    resetHeaderPerfArray()
    resetPace(ath)
    refreshRank(ath)
    refreshCummulative(ath)
}

function statusR(ath) {
    refreshCurrentMvtInStandby(ath)
    resetPerfArray(ath)
    resetHeaderPerfArray()
    resetPace(ath)
    refreshRank(ath)
    refreshCummulative(ath)
}

function statusW0(ath) {
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
    refreshCurrentMvtInStandby(ath)
}

function statusWW(ath) {

    refreshRank(ath)
    refreshUpDown(ath)


    switch (heat.typeWod) {
        case 'repmax':
            refreshRepMax(ath)
            break;
        default:
            // Case for amrap and for time
            refreshCurrentMvtInProgress(ath)
            refreshRepPerSec(ath)
            break;
    }

    refreshCummulative(ath)

}

function statusWF(ath) {

    refreshRepPerSec(ath)
    refreshRank(ath);
    refreshCummulative(ath);
    refreshCurrentMvtFinish(ath)
}

function statusWT(ath) {
    refreshRepPerSec(ath)
    refreshRank(ath);
    refreshCummulative(ath);
    refreshCurrentMvtFinish(ath)
}

function statusT(ath) {
    refreshRepPerSec(ath)
    refreshRank(ath);
    refreshCummulative(ath);
    refreshCurrentMvtFinish(ath)
}

