
const DatesEvent = nodecg.Replicant('DatesEvent', 'connector');
const WodTab = nodecg.Replicant('WodTab', 'connector');
const statics = nodecg.Replicant('statics', 'connector');
const workoutId = nodecg.Replicant('workoutId');


const BgColor = nodecg.Replicant('BgColor','configuration')
const MainColor = nodecg.Replicant('MainColor','configuration')
const SecondColor = nodecg.Replicant('SecondColor','configuration')

const FinishRankColor = nodecg.Replicant('FinishRankColor','configuration')
const FirstRankColor = nodecg.Replicant('FirstRankColor','configuration')
const SecondRankColor = nodecg.Replicant('SecondRankColor','configuration')
const ThirdRankColor = nodecg.Replicant('ThirdRankColor','configuration')

var workoutTab = []
var dateTab = []
var EventPlanner = [];
var static_


    statics.on('change', (newValue)=>{
        workoutId.value = newValue.workoutId
        resetHeader(newValue)
    })

    WodTab.on('change', (newValue, oldValue) => {
        console.log(newValue)
        if (newValue != oldValue){
            createPlanning(newValue)
        }
    }); 


    BgColor.on('change', (newValue) => {
        $("body").css('background-color', newValue)
    })


    MainColor.on('change', (newValue) => {
        root.style.setProperty("--main-color",newValue );
    })

    SecondColor.on('change', (newValue) => {
        root.style.setProperty("--second-color",newValue );
    })

    FinishRankColor.on('change', (newValue) => {
        root.style.setProperty("--finish-color",newValue );
    })

    FirstRankColor.on('change', (newValue) => {
        root.style.setProperty("--firstRank-color",newValue );
    })    
    
    SecondRankColor.on('change', (newValue) => {
        root.style.setProperty("--secondRank-color",newValue );
    })

    ThirdRankColor.on('change', (newValue) => {
        root.style.setProperty("--thirdRank-color",newValue );
    })
