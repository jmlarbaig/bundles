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

var affiliateTimer = undefined
var repTobeat = 0;
var typeWod_G = undefined

var athletes_divison = {}

var currentMvt = undefined;
 

function updateDynamics(athlete){
    try{
        // ! On prend le tableau
        
        var $list = $("#ergdetails")
        $list.find(".erg").remove();

        // ! On crée un tableau par division

        console.log(athlete)

        var $item = $(
            '<div class="erg">' + 
                '<div class="distance">' + athlete.currentMouvement[0].distance  + ' m</th>' + 
                '<div class="distperm">'+ athlete.currentMouvement[0].power + ' / 500m</td>' + 
                '<div class="cal_sm">'+ athlete.currentMouvement[0].cal_h + " cal " + athlete.currentMouvement[0].s_m  + ' s/m</td>' + 
                '<div class="cal_hr">' + athlete.currentMouvement[0].cal_h  + ' cal/hr</td>' + 
            '</div>'
        );
        $list.append($item);

    }
    catch(e){
        console.log(e)
    }
}    


