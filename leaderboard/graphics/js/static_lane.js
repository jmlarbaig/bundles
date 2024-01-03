
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


var athletesDivision = {}


var height_tot = 0


function resetLeaderboard(newData){
    try{
        
        var data = {athletes:""}
        data.athletes = newData
        // console.log("Static Data = ", staticData)
        // ! On prend le tableau
        
        var $tab = $(".leaderboards")
        $tab.find(".athlete").remove();

        //! on traite le wod en cours 

        athletesDivision = []

        element = data.athletes.find((element)=> element.lane == laneEcho)
        let _athletes = new Array();
        athletesDivision[0] = Object.assign({}, _athletes[0], element)

        let $item;
        switch(overlay){
            case 'lane':
                $item = (laneOverlay(athletesDivision[0]))
                break;
            case 'echo':
                $item = (echoOverlay(athletesDivision[0]))
                break;
        }
        
        athletesDivision[0].$item = $item
        $tab.append($item)

    }
    catch(e){
        console.log(e)
    }
}


