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

var currentMvt = undefined;

function ascendingRank(a, b) { return Number(a.CurrentRank) - Number(b.CurrentRank) }
function descendingRank(a, b) { return Number(a.CurrentRank) + Number(b.CurrentRank) }
function ascendingLane(a, b) { return Number(a.lane) - Number(b.lane) }
function descendingLane(a, b) { return Number(a.lane) + Number(b.lane) }

function reposition() {
    var height = $("#athletes .athlete").height();
    var y = height;
    for(var i = 0; i < athletes.length; i++) {
        athletes[i].$item.css("top", y + "px");
        y += height;			
    }
}  

function fetchNewData(data,lane){
    for(var x in data){
        if((data[x].lane == lane) == true) {
            return data[x];
        }
    }
    return null;
}        

function updateDynamics(newScoring, status){
    try{
        
        for (let i = 0; i < newScoring.length; i++) {
            var athlete = athletes[i];
            athletes[i] = Object.assign( {}, athletes[i],fetchNewData(newScoring, athletes[i].lane));
            athletes[i].$item.find(".rank").text(athletes[i].CurrentRank);

            var percent = (athletes[i].score_abs / totalRep)*80
                if(document.getElementById(athletes[i].lane) != null ){
                    document.getElementById(athletes[i].lane).style.transform="translateX("+ percent +"%)";
                }

            if(athletes[i].result == "" ){
                athletes[i].$item.find(".score").text(athletes[i].score_rel);
                athletes[i].$item.find(".mvt").text(athletes[i].currentMouvement[0].mouvementName);
                athletes[i].$item.find(".score").css("width", "200px")
                athletes[i].$item.find(".score").css("max-width", "200px")
                if (athletes[i].CurrentRank == 1){
                    athletes[i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + first_rank__color + ")")
                    athletes[i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + first_rank__color + ")")
                    athletes[i].$item.find(".circle").css("fill", first_rank__color)
                    athletes[i].$item.find(".score").text(athletes[i].score_abs);
                }
                else if (athletes[i].CurrentRank == 2){
                    athletes[i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + second_rank__color + ")")
                    athletes[i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + second_rank__color + ")")
                    athletes[i].$item.find(".circle").css("fill", second_rank__color)
                }
                else if (athletes[i].CurrentRank == 3){
                    athletes[i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + third_rank__color + ")")
                    athletes[i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + third_rank__color + ")")
                    athletes[i].$item.find(".circle").css("fill", third_rank__color)
                }
                else {
                    athletes[i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + second_color + ")")
                    athletes[i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + second_color + ")")
                    athletes[i].$item.find(".circle").css("fill", second_color)
                }
            }
            else{
                athletes[i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + finish__color + ")")
                athletes[i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + finish__color + ")")
                athletes[i].$item.find(".circle").css("fill",finish__color)
                athletes[i].$item.find(".score").css("color", "white")
                athletes[i].$item.find(".score").css("width", "200px")
                athletes[i].$item.find(".score").css("max-width", "200px")
                var result = athletes[i].result;
                athletes[i].$item.find(".score").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -9, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
            }
        }

        console.log(athletes)

        if(status != "0"){
        }
        else{
            clearInterval(affiliateTimer)
        }
    }
    catch(e){
        console.log(e)
    }
}    

function resetProgress(data){
    try{
        var $list = $("#athletes");
        $list.find(".athlete").remove();
        athletes = [];

        for(let i = 0;i < data.athletes.length;i++){
            athletes[i] = athletes_init;
            athletes[i] = Object.assign({}, athletes[i], data.athletes[i])
            if (athletes[i].countryCode =="" || athletes[i].countryCode==null){athletes[i].countryCode = "FR"}
        }
        
        for(var i = 0; i < athletes.length; i++) {
            var $item = $(
                '<tr class="athlete">' + 
                    '<td class="lane text-center">'+ athletes[i].lane + '</td>' + 
                    '<td class="flag">' + '<img src="https://flagcdn.com/'+ athletes[i].countryCode.toLowerCase().substring(0,2) + '.svg" width="30"></img> ' + '</td>' +
                    '<td class="text-nowrap text-truncate text-left name">' + athletes[i].displayName + '</td>' + 
                    '<td class="text-nowrap text-truncate text-left affiliate">' + athletes[i].affiliate + '</td>' +
                    '<td class="rank">' + athletes[i].CurrentRank  + '</th>' + 
                    '<td class="circle_progress">' +
                        '<svg>' +
                            '<circle cx="10" cy="50%" r="10px" fill="#aeaeae" class="circle" id="' + athletes[i].lane+'"/>' +
                        '</svg>' +
                    '</td>' +
                    '<td class="mvt text-nowrap text-truncate">' + athletes[i].currentMouvement[0].mouvementName  + '</th>' + 
                    '<td class="score">' + athletes[i].score_abs + '</td>' +
                '</tr>'
            );
    
            athletes[i].$item = $item;
            $list.append($item);
            athletes[i].$item.find(".popup").hide();
        }
        athletes.sort(ascendingLane);
        reposition();
    }
    catch(e){
        console.log(e)
    }
}


