let _workoutsFromMQTT;

function createKairosView(){
    workoutsMQTT.on('change',(newValue, oldValue)=>{
        if(JSON.stringify(newValue) != JSON.stringify(oldValue)){
            console.log(newValue)
            _workoutsFromMQTT = newValue
            if(newValue.length > 0){
                createOptionWorkout(newValue)
            }
        }
    })

    $("#workoutsMqtt").on('change',  function(){
            console.log(this.value)
        let workout = _workoutsFromMQTT.find(x => x.id === parseInt(this.value))
        createOptionHeat(workout)
    })
}


function createOptionWorkout(data){
    $("#workoutsMqtt option").remove()

    $("#workoutsMqtt").append('<option value=0>-- Please Choose Workout --</option>')

    for(let workout of data){
        $("#workoutsMqtt").append('<option value='+ workout.id +'>' + workout.name + '</option>');
    }
}

function createOptionHeat(workout){
    console.log(workout)
    $("#heatsMqtt option").remove()

    $("#heatsMqtt").append('<option value=0>-- Please Choose Heat --</option>')

    for(let i= 0; i< workout.heatId.length ; i++){
        $("#heatsMqtt").append('<option value='+ workout.heatId[i] +'>' + workout.heatName[i] + '</option>');
    }
}

function changeHeat(){
    let data = {
        'workoutId': 0,
        'heatId' : 0
    }

    console.log($('#workoutsMqtt').val())


    data.workoutId = $('#workoutsMqtt').val()
    data.heatId = $('#heatsMqtt').val()
    resetChrono()

    nodecg.sendMessage('change_heat', data)

}


function startChrono(){
    let data = {
        'minutes': 0,
        'secondes' : 0,
        'type':'time',
        'count':5
    }

    data.type = heatInfos.value[0].type
    data.count = $('#countTimer').val()

    let timeCap = heatInfos.value[0].timeCap

    data.minutes = parseInt(timeCap.split(':')[1]) 
    data.secondes = parseInt(timeCap.split(':')[2]) 

    nodecg.sendMessage('start_chrono', data)

}

function resetChrono(){
    nodecg.sendMessageToBundle('reset_timer', 'leaderboard')
    nodecg.sendMessage('reset_chrono_heat')
}

function reloadWorkout(){
    nodecg.sendMessage('reloadWorkout')
}

function reloadWorkoutHermes(){
    nodecg.sendMessage('reloadWorkoutFromHermes')
}