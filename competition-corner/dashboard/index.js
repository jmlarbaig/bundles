

    const sponsors = nodecg.Replicant('assets:sponsorCC')
    const eventInfos = nodecg.Replicant('eventInfos', 'connector')
    const Divisions = nodecg.Replicant('Divisions', 'connector')
    const Workouts = nodecg.Replicant('WorkoutInfos', 'connector')
    const WorkoutsDivision = nodecg.Replicant('WorkoutsDivision', 'connector')
    const Heats = nodecg.Replicant('HeatsWorkout', 'connector')
    const configForCC = nodecg.Replicant('configForCC')

    
    let selectedDivision;
    let workoutHeatSelected;
    let workoutDivisionSelected;
    let heatSelected;

    let num_lane = 10
    let num_heats = 10
    let num_osdivwod = 10

    let limit_lane = 10000
    let limit_heat = 10000
    let limit_osdivwod = 10000


    function changeLane(){
        let type = event.target.id
        let which = event.target.name

        switch(which){
            case 'lane':
                switch(type){
                    case 'plus':
                        num_lane += 10;
                        if((num_lane-10) >= limit_lane){
                            num_lane -= 10;
                        }

                    break;
                    case 'minus':
                        num_lane -= 10;
                        if(num_lane <= 0){
                            num_lane = 10
                        }
                    break;
                }
                nodecg.sendMessageToBundle('attribution_lane', 'connector', num_lane).then((response)=>{
                    limit_lane = response
                })
            break;
            case 'heats':
                switch(type){
                    case 'plus':
                        num_heats += 10;
                        if((num_heats-10) >= limit_heat){
                            num_heats -= 10;
                        }
                    break;
                    case 'minus':
                        num_heats -= 10;
                        if(num_heats <= 0){
                            num_heats = 10
                        }
                    break;
                }
                nodecg.sendMessageToBundle('heat_result', 'connector', {workoutHeatSelected, heatSelected, num_heats}).then((response)=>{
                    limit_heat = response
                })
            break;
            case 'osDivWod':
                switch(type){
                    case 'plus':
                        num_osdivwod += 10;
                        if((num_osdivwod-10) >= limit_osdivwod){
                            num_osdivwod -= 10;
                        }
                    break;
                    case 'minus':
                        num_osdivwod -= 10;
                        if(num_osdivwod <= 0){
                            num_osdivwod = 10
                        }
                    break;
                }
                console.log(num_osdivwod)
                nodecg.sendMessageToBundle('overall_standing_workout_division', 'connector', {selectedDivision, workoutDivisionSelected, num_osdivwod})
                .then((response)=>{
                    limit_osdivwod = response
                })
            break;
        }
    }

    sponsors.on('change', (newValue)=>{
        if(newValue.length > 0){
            createOptionsSponsors(newValue)
        }
    })

    eventInfos.on('change', (newValue, oldValue) => {
        
    })

    Divisions.on('change', (newValue)=> {
        if(newValue != undefined && newValue.length > 0){
            loadOptionDivisions(newValue);
        }
    })

    WorkoutsDivision.on('change', (newValue, oldValue)=>{
        if(newValue != undefined && newValue.length > 0){
            loadOptionsWorkoutsDivision(newValue)
        }
    })

    Workouts.on('change', (newValue, oldValue)=>{
        if(newValue != undefined && newValue.length > 0){
            loadOptionsWorkoutHeat(newValue)
        }
    })

    Heats.on('change', (newValue)=> {
        if(newValue != undefined && newValue.length > 0){
            loadOptionsHeats(newValue);
        }
    })

    const sponsorForCC = nodecg.Replicant('sponsorForCC')

    let _configSponsor = {
       'type':'',
       'url':''
    }   

    let _configForCC = {
        'type':'',
        'country':true,
        'affiliation':true
    }
    
    $(document).ready(function(){
        $("#division-select").change(function(){
            selectedDivision = $(this).children("option:selected").val();
            nodecg.sendMessageToBundle('workout_division', 'connector', selectedDivision);
        });

        $("#workout_division-select").change(function(){
            workoutDivisionSelected = $(this).children("option:selected").val();
            num_osdivwod = 10;
            nodecg.sendMessageToBundle('overall_standing_workout_division', 'connector', {selectedDivision, workoutDivisionSelected, num_osdivwod})
        });


        $("#workout_heat-select").change(function(){
            workoutHeatSelected = $(this).children("option:selected").val();
            nodecg.sendMessageToBundle('workout_heat', 'connector', workoutHeatSelected)
        });

        $("#heat-select").change(function(){
            heatSelected = $(this).children("option:selected").val();
            num_heats = 10
            nodecg.sendMessageToBundle('heat_result', 'connector', {workoutHeatSelected, heatSelected, num_heats})
        });

        $("[name='sponsor']").change(function(){

            let id = $(this)[0].id.replace('sponsor-','').replace('-select','')

            let dataToSend = Object.assign({}, _configSponsor)

            dataToSend.type = id
            dataToSend.url = $(this).children("option:selected").val();
        
            sponsorForCC.value = dataToSend
        });

        $("[type=checkbox").change(()=>{

            let name = event.target.name;

            console.log(name, $('#country-'+name).is(":checked") , $('#affiliation-'+name).is(":checked") )

            let dataToSend = Object.assign({}, _configForCC)

            dataToSend.type = name
            dataToSend.country = $('#country-'+name).is(":checked")
            dataToSend.affiliation =  $('#affiliation-'+name).is(":checked") 

            configForCC.value = dataToSend
        })
    });

