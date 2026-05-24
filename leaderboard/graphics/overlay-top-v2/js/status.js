function statusO(ath) {
    console.log("Workout 0")
    refreshCurrentMvtInStandby(ath)
}

function statusR(ath) {
    console.log("Workout in Standby")
    refreshCurrentMvtInStandby(ath)
}

function statusW0(ath) {
    console.log("Athlete not logged in / Workout in progress")
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

function handleFirstAthleteWithoutResult(elemAth) {
    const athlete = elemAth
        .filter(a => a.result === "")
        .sort((a, b) => a.CurrentRank - b.CurrentRank)[0];

    if (!athlete) {
        treatTextMvt("");
    } else {
        treatTextMvt(
            athlete.currentMvt.arrayMvt
                .toString()
                .replaceAll(',', '-')
                .replaceAll('_', ' ')
                .replace('-', '')
        );
    }

}

function statusWW(ath, athBefore, alreadyPassed, index) {

    console.log("Athlete in Mvt / Workout in Standby")

    refreshRank(ath)
    refreshUpDown(ath)

    // if (ath.result == "" && !alreadyPassed) {
    //     treatTextMvt(ath.currentMvt.arrayMvt.toString().replaceAll(',', '-').replaceAll('_', ' ').replace('-', ''));
    //     alreadyPassed = true;
    // }

    switch (heat.typeWod) {
        case 'repmax':
            refreshRepMax(ath)
            break;
        default:
            // Case for amrap and for time
            refreshCurrentMvtInProgress(ath)
            break;
    }

    refreshCummulative(ath)

    // return alreadyPassed;
}

function statusWF(ath) {
    console.log("Athlete Finish / Workout in progress")
    // Fait pour faire disparaitre les athletes après le premier pour diffuser les suivants
    hiddenAthlete(ath)
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

