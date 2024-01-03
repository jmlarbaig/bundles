
    const _configPresentator = {
        'type':'presentator',
        'name':'',
        'function':'',
        'qrcode':'',
        'sponsor':'',
        'position':'bottom_left'
    }

    const _configWaiting = {
        'type':'waiting',
        'name':'',
        'function':'',
        'qrcode':'',
        'sponsor':'',
        'position':'bottom_left'
    }

    const _configFree = {
        'type':'free',
        'header':'',
        'subheader':'',
        'colorHeader':'',
        'colorSubHeader':'',
        'text':'',
        'position':'bottom_left',
        'sponsor':''
    }

    const _configWorkout = {
        'type':'workout',
        'header':'',
        'subheader':'',
        'colorHeader':'',
        'colorSubHeader':'',
        'text':'',
        'position':'bottom_left',
        'sponsor':''
    }

    const sponsorLower = nodecg.Replicant('assets:sponsorsLowerThirds')
    const codePromo = nodecg.Replicant('assets:codePromo', 'connector')

    const LowerThirdPres = nodecg.Replicant('LowerThirdPres')
    const LowerThirdWaiting = nodecg.Replicant('LowerThirdWaiting')
    const LowerThirdFree = nodecg.Replicant('LowerThirdFree')
    const lowerThirdData = nodecg.Replicant('lowerThirdData');
    const lowerThirdConfig = nodecg.Replicant('lowerThirdConfig');
    const lowerThirdWodConfig = nodecg.Replicant('lowerThirdWodConfig', { defaultValue: []});
    
    const WorkoutInfos = nodecg.Replicant('WorkoutInfos', 'connector');
    // Initialisation du choix de la vue
    
    let overlay=''
    
    $('document').ready(()=>{
        let ch = document.location.pathname.split('/')
        overlay = ch[ch.length-1].replace('.html','')

        switch(overlay){
            case 'workoutLowerthird':
                document.getElementById('workoutDiv').addEventListener("input", affichageWorkoutLowerthird, false);
                break;
            case 'freeLowerthird':
                document.getElementById('freeDiv').addEventListener("input", affichageFreeLowerthird, false);
                break;
            case 'presentatorLowerthird':
                document.getElementById('presentatorsDiv').addEventListener("input", affichageLowerthird, false);
                break;
            case 'waitingLowerthird':
                document.getElementById('waitingDiv').addEventListener("input", affichageWaitingLowerthird, false);
                break;
        }

        $("#workout-select").change(function(){
            selectedWorkout = $(this).children("option:selected").val();
            // console.log(selectedWorkout)
            // console.log(lowerThirdWodConfig.value[selectedWorkout])
            if(lowerThirdWodConfig.value[selectedWorkout] != null){
                $('#header').val(lowerThirdWodConfig.value[selectedWorkout].title)
                myContentWorkout.setContent(lowerThirdWodConfig.value[selectedWorkout].description);
            }else{
                for (let workout of WorkoutInfos.value){
                    if(workout.id == selectedWorkout){
                        $('#header').val(workout.name)
                        myContentWorkout.setContent(workout.description);
                        break;
                    }
                }
            }
        });

        if(overlay == 'configuration'){
            console.log($("input"))
            $("input").change(saveConfig)
        }


        nodecg.readReplicant('LowerThirdFree', (value)=>{
            console.log(value)
            console.log(overlay)
            if(overlay == 'freeLowerthird'){
                $("#header").val(value.header);
                $("#subheader").val(value.subheader);
                myContent.setContent(value.text);
                $("#position").val(value.position);
                $("#sponsor").val(value.sponsor);
            }
        })
    
        nodecg.readReplicant('LowerThirdPres', (value)=>{
            if(overlay == 'presentatorLowerthird'){
                value.forEach((element, i) => {
                    addItem(element)
                })
            }
        })
    
        nodecg.readReplicant('LowerThirdWaiting', (value)=>{
            if(overlay == 'waitingLowerthird'){
                $("#localisation").val(value.localisation);
                $("#nextEvent").val(value.nextEvent);
                $("#qrcode").val(value.qrcode);
                $("#position").val(value.position);
                $("#sponsor").val(value.sponsor);
            }
        })
    })

    const listWarmpUp = nodecg.Replicant('listWarmpUp', 'connector');

    let listOverall = []

    listWarmpUp.on('change', (newValue, oldValue)=>{
        if(overlay=='athlete'){
            if(newValue != undefined && JSON.stringify(newValue) != JSON.stringify(oldValue)){
                console.log('List WarmUp',newValue)
                let participantsHeat = newValue.warmUp[0].wod.participants
                let stations = newValue.warmUp[0].heat.stations
                for(let station of stations){
                    let data = participantsHeat.find( element => element.id === station.participantId)
                }
            }
        }
    })

    WorkoutInfos.on('change', (newValue, oldValue)=>{
        if(newValue != undefined && JSON.stringify(newValue) != JSON.stringify(oldValue)){
            createOptionWorkout(newValue)
        }
    })


    var lowerThird = []

    sponsorLower.on('change', (newValue)=> {
        updateSponsorOption(newValue)
    })


    function affichageLowerthird(){

        let id = 0;
        _subId = event.target.id

        if(_subId.includes('name')){
            id = rpl(_subId, 'name')
        }else if(_subId.includes('function')){
            id = rpl(_subId, 'function') 
        }else if(_subId.includes('qrcode')){
            id = rpl(_subId, 'qrcode')
        }else if(_subId.includes('sponsor')){
            id = rpl(_subId, 'sponsor')
        }else if(_subId.includes('aff_')){
            id = rpl(_subId, 'aff_');
            $('#aff_'+id).attr("disabled", true);
            setTimeout(()=>{
                $('#aff_'+id).removeAttr("disabled");
            }, 1000)
        }


        let dataToSend = Object.assign({}, _configPresentator)

        dataToSend.checked = $("#aff_"+id).is(':checked');
        dataToSend.id = id;
        dataToSend.name = $("#name"+id).val();
        dataToSend.function = $("#function"+id).val();
        dataToSend.sponsor = $("#sponsor"+id).val();
        dataToSend.qrcode = $("#qrcode"+id).val();
        dataToSend.position = $("#position").val();

        lowerThirdData.value = dataToSend
    }


    
    function affichageWaitingLowerthird(){
        
        if(event.target.id.includes('waitingCehckbox')){
            $('#waitingCehckbox').attr("disabled", true);
            setTimeout(()=>{
                $('#waitingCehckbox').removeAttr("disabled");
            }, 1000)
        }

        let dataToSend = Object.assign({}, _configWaiting)

        dataToSend.checked = $("#waitingCheckbox").is(':checked');
        dataToSend.localisation = $("#localisation").val();
        dataToSend.nextEvent = $("#nextEvent").val();
        dataToSend.qrcode = $("#qrcode").val();
        dataToSend.sponsor = $("#sponsor").val();
        dataToSend.position = $("#position").val();

        lowerThirdData.value = dataToSend
    }

    function affichageFreeLowerthird(){

        console.log('free')
        if(event.target.id.includes('freeCheckbox')){
            $('#freeCheckbox').attr("disabled", true);
            setTimeout(()=>{
                $('#freeCheckbox').removeAttr("disabled");
            }, 1000)
        }

        let dataToSend = Object.assign({}, _configFree)

        dataToSend.checked = $("#freeCheckbox").is(':checked');
        dataToSend.header = $("#header").val();
        dataToSend.subheader = $("#subheader").val();
        dataToSend.text = myContent.getContent();
        dataToSend.position = $("#position").val();
        dataToSend.sponsor = $("#sponsor").val();

        lowerThirdData.value = dataToSend
    }

    function affichageWorkoutLowerthird(){

        if(event.target.id.includes('workoutCheckbox')){
            $('#workoutCheckbox').attr("disabled", true);
            setTimeout(()=>{
                $('#workoutCheckbox').removeAttr("disabled");
            }, 1000)
        }

        let dataToSend = Object.assign({}, _configWorkout)

        dataToSend.checked = $("#workoutCheckbox").is(':checked');
        dataToSend.header = $("#header").val();
        dataToSend.subheader = $("#subheader").val();
        dataToSend.text = myContentWorkout.getContent();
        dataToSend.position = $("#position").val();
        dataToSend.sponsor = $("#sponsor").val();

        lowerThirdData.value = dataToSend


    }


    tinymce.init({
        selector: 'textarea',  // change this value according to your HTML
        menubar: false,
        plugins: "link image code",
        toolbar: 'undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code',
        init_instance_callback: function (editor) {
            editor.on('input', function (e) {
                switch(editor.id){
                    case 'textFree':
                        affichageFreeLowerthird();
                        break;
                    case 'textWorkout':
                        affichageWorkoutLowerthird();
                        break;
                }
            });
            editor.on('Change', function (e) {
                switch(editor.id){
                    case 'textFree':
                        affichageFreeLowerthird();
                        break;
                    case 'textWorkout':
                        affichageWorkoutLowerthird();
                        break;
                }
            });
        }
    });


    var myContent;
    var myContentWorkout;

    tinymce.on('AddEditor', function(e) {
        console.log('Added editor with id: ' + e.editor.id);
        myContent = tinymce.get("textFree");
        myContentWorkout = tinymce.get("textWorkout");
    });

    let config = {}

    nodecg.readReplicant('lowerThirdConfig',(value)=>{
        console.log(value)
        if(overlay == 'configuration'){
            Object.keys(value).forEach((element, index)=>{
                config[element] = value[element]
                console.log(value[element])
                $('#'+element).val(value[element])
            })
        }
    })

    // function saveConfig(){
    //     config[$(this).attr("id")] = $(this).val()
    //     lowerThirdConfig.value = config;
    // }

    function saveConfig(){

        let data ={};
        const elmColors = document.querySelectorAll('input[type=color]');
        elmColors.forEach( el => {
            data[el.id] = el.value
        });
    
        const elmNumber = document.querySelectorAll('input[type=number]');
        elmNumber.forEach( el => {
            data[el.id] = (el.value || 0)
        });
    
        // const elmCheck = document.querySelectorAll('input[type=checkbox]');
        // elmCheck.forEach( el => {
        //     data[el.id] = el.checked
        // });
    
        // const elmSelect = document.querySelectorAll('select');
        // elmSelect.forEach( el => {
        //     data[el.id] = el.value
        // });
        
        console.log(data)
        lowerThirdConfig.value = data;

        nodecg.sendMessage('configOverwrite', data);
    }

    function saveWorkoutConfig(){

        let id = $('#workout-select').children("option:selected").val();

        if(lowerThirdWodConfig.value[id] != null){
            lowerThirdWodConfig.value[id].title = $("#header").val();
            lowerThirdWodConfig.value[id].description = myContentWorkout.getContent();
        }
    }

    function resetWorkoutConfig(){

        let selectedWorkout = $('#workout-select').children("option:selected").val();

        for (let workout of WorkoutInfos.value){
            if(workout.id == selectedWorkout){
                $('#header').val(workout.name)
                myContentWorkout.setContent(workout.description);
                break;
            }
        }
    }
    