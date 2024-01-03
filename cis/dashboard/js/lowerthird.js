const _configAthletes = {
    'type':'athlete',
    'subtype':'',
    'lane':0,
    'data': {},
    'text': '',
    'position':'bottom_center'
}


async function askAffichage() {

    // let id = parseInt( event.target.id.replace('ath_', ''))

    // $('#ath_'+id).attr("disabled", true);
    // setTimeout(()=>{
    //     $('#ath_'+id).removeAttr("disabled");
    // }, 1000)

    let id = 0;
    _subId = event.target.id

    console.log(_subId)

    if(_subId.includes('ath_')){
        id = rpl(_subId, 'ath_')
        $('#aff_'+id).attr("disabled", true);
        setTimeout(()=>{
            $('#aff_'+id).removeAttr("disabled");
        }, 1000)
    }else if(_subId.includes('textLower')){
        id = rpl(_subId, 'textLower_') 
    }else if(_subId.includes('subtype')){
        id = rpl(_subId, 'subtype')
    }else if(_subId.includes('subwod')){
        id = rpl(_subId, 'subwod')
    }

    let dataToSend = Object.assign({}, _configAthletes)

    dataToSend.checked = $('#ath_'+id).is(':checked');
    dataToSend.subtype = $('#subtype'+id).val();
    dataToSend.lane = id;
    dataToSend.displayName = listeCurrentHeat[id].participantName;
    dataToSend.data = listeCurrentHeat[id];
    dataToSend.text = $('#textLower_' + id).val();

    lowerThirdData.value = dataToSend;
}

function rpl (complete, replace){
    return parseInt(complete.replace(replace, ''))
}



async function affichageEvent(){

    let ch = [] 
    ch = event.target.id.split('_')
        
    let $tab_ath = $("#lane_"+ch[1]+'_ath_'+ch[3])
    $tab_ath.find('#lastEvents_'+ ch[1]+'_ath_'+ch[3]).hide()
}