
function stateConnection(state,element, error){
    switch(state){
        case 'connected':
            $('#State_'+element).text("CONNECTED")
            $('#led_'+element).removeClass('led-orange led-red')
            $('#led_'+element).addClass('led-green')
            $('#connection_but').prop('disabled', true)
            break;
        case 'connecting':
            $('#State_'+element).text("CONNECTING")
            $('#led_'+element).removeClass('led-green led-red')
            $('#led_'+element).addClass('led-orange')
            break;
        case 'deconnected' :
            $('#State_'+element).text("DECONNECTED")
            $('#led_'+element).removeClass('led-green led-orange')
            $('#led_'+element).addClass('led-red')
            $('#connection_but').prop('disabled', false)
            break;
        case 'deconnecting' :
            $('#State_'+element).text("DECONNECTING")
            $('#led_'+element).removeClass('led-green led-red')
            $('#led_'+element).addClass('led-orange')
            break;
        case 'error':
            $('#State_'+element).text(error)
            $('#led_'+element).removeClass('led-green led-orange')
            $('#led_'+element).addClass('led-red')
            $('#connection_but').prop('disabled', false)
            break;
    }
}


const athletes_init = {
    "lane": 0,
    "displayName": "",
    "rank": 0,
    "overallPoints": 0,
    "age": 0,
    "heigth": 0,
    "weight": 0,
    "affiliate": "",
    "division": "",
    "status":"",
    "CurrentRank": 0,
    "score_abs": 0,
    "score_rel": 0,
    "currentRound": 0,
    "tieBreak": "",
    "result": "",
    "currentMouvement": [
        {
            "mouvementName": "0",
            "nextMouvement": "",
            "repTarget": 0,
            "rep/min": 0,
            "power": 0,
            "cal_h": 0,
            "s/m": 0
        }
    ],
    "Log_mvt_time": [
        {
        }
    ],
    "Log_serie_time": [
        {
        }
    ],
    "Log_round_time": [
        {}
    ],
    "countryCode": "",
    "benchmark": [
      {
        "ForTime": {
          "fran": "",
          "helen": "",
          "grace": "",
          "filthy": "",
          "sprint400m": "",
          "run5k": "",
          "twoKRow": "",
          "fightgonebad": "",
          "cleanJerk": "",
          "deadlift": "",
          "crossfitTotal": 0,
          "snatch": "",
          "backSquat": ""
        }
      }
    ]
}
