
const DatesEvent = nodecg.Replicant('DatesEvent', 'connector');
const WodTab = nodecg.Replicant('WodTab', 'connector');
const WarmUpTab = nodecg.Replicant('WarmUpTab', 'connector');
const statics = nodecg.Replicant('statics', 'connector');
const LogoImg = nodecg.Replicant('LogoImg', 'leaderboard')

    statics.on('change', (newValue)=>{
        resetHeader(newValue)
    })

    WarmUpTab.on('change', (newValue, oldValue) => {
        console.log("WarmUp : ", newValue)
        resetWarmup(newValue)
    }); 