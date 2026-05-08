function statusO(ath) {
    refreshCurrentMvtInStandby(ath)
}

function statusR(ath) {
    refreshCurrentMvtInStandby(ath)
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

function statusWW(ath, athBefore, alreadyPassed, index) {

    refreshRank(ath)
    refreshUpDown(ath)

    if (ath.result == "" && !alreadyPassed) {
        treatTextMvt(ath.currentMvt.arrayMvt.toString().replaceAll(',', '-').replaceAll('_', ' ').replace('-', ''));
        if (ath.CurrentRank == 1) {
            alreadyPassed = true;
        }
    }

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

    return alreadyPassed;
}

function statusWF(ath) {

    refreshRank(ath);
    refreshCummulative(ath);
    refreshCurrentMvtFinish(ath)
}

function statusWT(ath) {
    refreshRank(ath);
    refreshCummulative(ath);
    refreshCurrentMvtFinish(ath)
}

function statusT(ath) {
    refreshRank(ath);
    refreshCummulative(ath);
    refreshCurrentMvtFinish(ath)
}

