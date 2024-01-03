var WorkoutTab;


async function updateWorkout(data){

    if(workoutId != data.workoutId){
        var d = await loadWorkoutsPlanning(data.eventId);
    
        WorkoutTab = d.workouts;

        workoutId = data.workoutId;

        for(let i=0; i<WorkoutTab.length;i++){
            console.log(WorkoutTab[i])

            if(WorkoutTab[i].id == data.workoutId){
                await loadHeats(WorkoutTab[i].id).then((value) => {
                    WorkoutTab[i].heats = value;
                })
                await loadParticpant(data.eventId, WorkoutTab[i].id).then((value)=>{
                    // console.log(value)
                    WorkoutTab[i].participants = value;
                })
                if(WorkoutTab[i+1] != undefined){
                    i++
                    await loadHeats(WorkoutTab[i].id).then((value) => {
                        WorkoutTab[i].heats = value;
                        // console.log(value);
                        // expected output: "Success!"
                    })
                    await loadParticpant(data.eventId, WorkoutTab[i].id).then((value)=>{
                        // console.log(value)
                        WorkoutTab[i].participants = value;
                    })
                }
                break;
            }
    
        }

    }
    updateWarmUp(data.eventName, data.workoutId, data.heatId)
}


function updateWarmUp(eventName, workoutId, heatId){

    try{
        
        heatWUP = []
        var d = {"wod" :"", "heat":""}
        var d2 = {"wod" :"", "heat":""}
        var d3 = {"wod" :"", "heat":""}
        
        if (WorkoutTab != undefined){
            for (let i=0; i < WorkoutTab.length; i++){
                if(WorkoutTab[i].id == workoutId){
                    console.log(WorkoutTab[i].heats)
                    for(let y=0; y < WorkoutTab[i].heats.length; y++){
                        if (WorkoutTab[i].heats[y].id == heatId){
                            d.wod = (WorkoutTab[i])
                            d.heat = (WorkoutTab[i].heats[y])
                            if(WorkoutTab[i].heats[y+1] == undefined){
                                if(WorkoutTab[i+1].heats[0] != undefined){
                                    d2.heat = (WorkoutTab[i+1].heats[0])
                                    d2.wod = (WorkoutTab[i+1])
                                    if(WorkoutTab[i+1].heats[1] != undefined){
                                        d3.heat = (WorkoutTab[i+1].heats[1])
                                        d3.wod = (WorkoutTab[i+1])
                                    }
                                }
                            }
                            else {
                                d2.heat = (WorkoutTab[i].heats[y+1])
                                d2.wod = (WorkoutTab[i])

                                if(WorkoutTab[i].heats[y+2] == undefined){
                                    if(WorkoutTab[i+1].heats[0] != undefined){
                                        d3.heat = (WorkoutTab[i+1].heats[0])
                                        d3.wod = (WorkoutTab[i+1])
                                    }
                                }
                                else {
                                    d3.heat = (WorkoutTab[i].heats[y+2])
                                    d3.wod = (WorkoutTab[i])
                                }
                            }
                        }
                    }
                }
            }
            
            d.heat.current = "CURRENT"
            d2.heat.current = "NEXT"
            d3.heat.current = "WARMUP"
            
            heatWUP.push(d)
            heatWUP.push(d2)
            heatWUP.push(d3)

            let obeject = {
                'eventName' : eventName,
                'warmUp' : heatWUP
            }
            
            listWarmpUp.value = obeject
        }
    }
    catch(e){
        console.log(e)
    }
}
