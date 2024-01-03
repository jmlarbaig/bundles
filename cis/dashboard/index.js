
const listCis = nodecg.Replicant('CIS', 'connector')

const lowerThirdData = nodecg.Replicant('lowerThirdData', 'lowerthird')


let listeCurrentHeat;

listCis.on('change', (newValue, oldValue) => {
    console.log(newValue)
    if (JSON.stringify(newValue) != JSON.stringify(oldValue)) {
        listeCurrentHeat = newValue
        updateFront(newValue)
    }
})


const TopScore = nodecg.Replicant('TopScore', 'connector')

TopScore.on('change', (newValue, oldValue) => {
    if (newValue != undefined && newValue.length > 0) {
        let index = 0;
        if (!newValue[0].hasOwnProperty('error')) {
            for (let teams of newValue[0]) {
                // console.log("top index =", teams)
                let $list = $(".repTarget_Team");
                $list.remove('span')
                teams.scores.forEach((team, index) => {
                    let $item = $(
                        '<span class="row">' + team.rank + '-' + team.name + ' -> ' + team.score + '</span> '
                    )
                    $('.repTarget' + index).text("-> " + teams.scores[0].score)
                    $list.append($item)
                })
                index++
            }
        }
    }
})

// const listWarmpUp = nodecg.Replicant('listWarmpUp', 'connector');

// let listOverall = []

// listWarmpUp.on('change', (newValue, oldValue)=>{
//     if(newValue != undefined && JSON.stringify(newValue) != JSON.stringify(oldValue)){
//         let participantsHeat = newValue.warmUp[0].wod.participants
//         let stations = newValue.warmUp[0].heat.stations
//         for(let station of stations){
//             let data = participantsHeat.find( element => element.id === station.participantId)
//             listOverall[station.station] = {}
//             listOverall[station.station].oR = data.rank
//             listOverall[station.station].oP = data.points

//             $('#overallPoints_'+station.station).text( 'Overall Points : ' + data.points)
//             $('#overallRank_'+station.station).text('Overall Rank : ' + data.rank)
//         }
//     }
// })