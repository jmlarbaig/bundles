
const planningEvent = nodecg.Replicant('planningEvent', 'connector')
const eventInfos = nodecg.Replicant('eventInfos', 'connector');

let workoutId= null

    eventInfos.on('change', (newValue, oldValue)=>{
        if(newValue != undefined){
            resetHeader(newValue)
            workoutId = newValue.workoutId
        }
    })

    planningEvent.on('change', (newValue, oldValue)=>{
        createPlanning(newValue)
    })