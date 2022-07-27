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
 

function updateDynamics(athletes){
    try{
        // ! On prend le tableau
        
        var $list1 = $("#ergdetails1")
        $list1.find(".erg").remove();


        var $list2 = $("#ergdetails2")
        $list2.find(".erg").remove();

        // ! On crée un tableau par division

        var laneLeft = 0;

        console.log(dataRow[laneLeft])
        if (dataRow[laneLeft] != undefined){
            var $item1 = $(
                '<div class="erg">' + 
                    '<div class="distance">' + parseInt(dataRow.value[laneLeft].distance).toString()  + ' m</th>' + 
                    '<div class="distperm">'+ parseInt(dataRow.value[laneLeft].stroke.substring(0,4)).toString()  + ' / 500m</td>' + 
                    '<div class="cal_sm">'+ parseInt(dataRow.value[laneLeft].calories).toString()  + " cal " + parseInt(dataRow.value[laneLeft].spm).toString()  + ' s/m</td>' + 
                    '<div class="cal_hr">' + parseInt(dataRow.value[laneLeft].calH).toString()  + ' cal/hr</td>' + 
                '</div>'
            );
        }
        else{
            var $item1 = $(
                '<div class="erg">' + 
                    '<div class="distance"> 0 m</th>' + 
                    '<div class="distperm"> 0 / 500m</td>' + 
                    '<div class="cal_sm"> 0 cal - 0 s/m</td>' + 
                    '<div class="cal_hr"> 0 cal/hr</td>' + 
                '</div>'
            );
        }
        $list1.append($item1);


        var laneRigth = 1;

        console.log(dataRow[laneRigth])
        if (dataRow[laneRigth] != undefined){
            var $item2 = $(
                '<div class="erg">' + 
                    '<div class="distance">' + parseInt(dataRow.value[laneRigth].distance).toString()  + ' m</th>' + 
                    '<div class="distperm">'+ parseInt(dataRow.value[laneRigth].stroke.substring(0,4)).toString()  + ' / 500m</td>' + 
                    '<div class="cal_sm">'+ parseInt(dataRow.value[laneRigth].calories).toString()  + " cal " + parseInt(dataRow.value[laneLeft].spm).toString()  + ' s/m</td>' + 
                    '<div class="cal_hr">' + parseInt(dataRow.value[laneRigth].calH).toString()  + ' cal/hr</td>' + 
                '</div>'
            );
        }
        else{
            var $item2 = $(
                '<div class="erg">' + 
                    '<div class="distance"> 0 m</th>' + 
                    '<div class="distperm"> 0 / 500m</td>' + 
                    '<div class="cal_sm"> 0 cal - 0 s/m</td>' + 
                    '<div class="cal_hr"> 0 cal/hr</td>' + 
                '</div>'
            );
        }
        $list2.append($item2);


    }
    catch(e){
        console.log(e)
    }
}    
