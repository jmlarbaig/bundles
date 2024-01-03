
function addItem(data){

    let number = parseInt(document.querySelectorAll('.presentator').length) - 1;

    console.log(number)

    let box = $('#presentators');

    let name = ''
    let fct = '';
    let qrcode = '';
    let sponsor = '';

    if( data != undefined){
        name = data.name
        fct = data.function
        qrcode = data.qrcode
        sponsor = data.sponsor
    }
    
    let $item = $(
        '<tr id="presentator_'+ number  + '" class="presentator">' + 
            '<td> <input type="text" class="name" id="name'+ number +'" value="'+ name +'" /> </td>' +
            '<td> <input type="text" class="function" id="function'+ number +'" value="'+ fct +'"  /> </td>' + 
            '<td> <input type="text" class="qrcode" id="qrcode'+ number +'" value="'+ qrcode +'"  /> </td>' +
            '<td> <select class="sponsor" id="sponsor'+ number +'" value="'+ sponsor +'" > </select> </td>' +
            '<td> <div class="input-checkbox">' +
                '<input type="checkbox" id="aff_' + number + '" onclick="affichageLowerthird()"/>' + 
                '<span class="toogle"></span>' +
            '</div> </td>' +
            '<td> <button id="remove_'+ number +'" class="" onclick="removeItem()"> - </button> </td>' +
        '</tr>'
    )

    box.append($item)
    if(sponsorLower.value != undefined){
        addSponsorOption(sponsorLower.value, number )
    }
}

function removeItem(){
    let id = parseInt(event.target.id.replace('remove_', ''))

    $('#presentator_'+id).remove();
    affichageLowerthird()
}

function saveParameters(){
    let id = event.target.id

    switch(id){
        case 'saveFree' : 
            let dataFree = {}
            dataFree.checked = $("#freeCheckbox").is(':checked');
            dataFree.header = $("#header").val();
            dataFree.subheader = $("#subheader").val();
            dataFree.text = myContent.getContent();
            dataFree.position = $("#position").val();
            dataFree.sponsor = $("#sponsor").val();

            LowerThirdFree.value = dataFree
            break;
        case 'savePresentator':
            let $items = $('.presentator');
            let data = []

            for( let i=0; i < $items.length - 1 ; i++){
                data[i] = Object.assign({}, _configPresentator);
                data[i].name = $items.find('#name'+i).val()
                data[i].function = $items.find('#function'+i).val()
                data[i].qrcode = $items.find('#qrcode'+i).val()
                data[i].sponsor = $items.find('#sponsor'+i).val()
                data[i].position = $items.find('#position').val()
            }

            LowerThirdPres.value = data
            break;
        case 'saveWaiting':
            let dataWaiting = {}

            dataWaiting.checked = $("#waitingCheckbox").is(':checked');
            dataWaiting.localisation = $("#localisation").val();
            dataWaiting.nextEvent = $("#nextEvent").val();
            dataWaiting.qrcode = $("#qrcode").val();
            dataWaiting.sponsor = $("#sponsor").val();
            dataWaiting.position = $("#position").val();

            LowerThirdWaiting.value = dataWaiting;
            break;
    }
}

function resetParameters(){

    let id = event.target.id

    switch(id){
        case 'resetFree' : 
            $('#freeDiv').find('#header').val('');
            $('#freeDiv').find('#subheader').val('');
            myContent.setContent('');
            break;
        case 'resetPresentator':
            $('#presentators').find('.presentator').remove();
            break;
        case 'resetWaiting':
            $('#waitingDiv').find('#localisation').val('');
            $('#waitingDiv').find('#nextEvent').val('');
            $('#waitingDiv').find('#qrcode').val('');
            break;
    }
}

function rpl (complete, replace){
    return parseInt(complete.replace(replace, ''))
}

function createOptionWorkout(data){

    $("#workout-select option").remove()

    $("#workout-select").append('<option value=0>-- Please Choose Workout --</option>')
    
    let wod = []

    for(let workout of data){
        $("#workout-select").append('<option value='+ workout.id +'>' + workout.name + '</option>');
        wod[workout.id] = {}
        wod[workout.id].title = workout.name
        wod[workout.id].description = workout.description

        if(lowerThirdWodConfig.value != undefined && lowerThirdWodConfig.value[workout.id] == null){
            lowerThirdWodConfig.value[workout.id] = wod[workout.id]
        }
    }

    if(lowerThirdWodConfig.value == undefined){
        lowerThirdWodConfig.value = wod
    }

}