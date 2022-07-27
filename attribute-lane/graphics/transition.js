

const statics = nodecg.Replicant('statics', 'connector');
const athletesHeat = nodecg.Replicant('athletesHeat', 'leaderboard')
const LogoImg = nodecg.Replicant('LogoImg', 'connector')
const sponsors = nodecg.Replicant('assets:sponsors', 'connector')
const sponsorLower = nodecg.Replicant('assets:sponsorLower', 'versus') 

    LogoImg.on('change', (newValue) => {
        console.log(newValue)
        $('.headerLogo-img').css("background-image", "url("+newValue+")")
    })

    athletesHeat.on('change', (newValue, oldValue) => {
        console.log(newValue)
        if (newValue != oldValue && newValue != undefined){
            resetAttrLane(newValue)
        }
    })
    
