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

function ascendingRank(a, b) { return Number(a.CurrentRank) - Number(b.CurrentRank) }
function descendingRank(a, b) { return Number(a.CurrentRank) + Number(b.CurrentRank) }
function ascendingLane(a, b) { return Number(a.lane) - Number(b.lane) }
function descendingLane(a, b) { return Number(a.lane) + Number(b.lane) }


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

        console.log("New Scoring",newScoring)

        Object.keys(athletes_divison).forEach(key => {
            // console.log(athletes_divison[key])
            
            Object.keys(athletes_divison[key]).forEach(i => {

                athletes_divison[key][i] = Object.assign( {}, athletes_divison[key][i],fetchNewData(newScoring, athletes_divison[key][i].lane));
                athletes_divison[key][i].$item.find(".rank").text(athletes_divison[key][i].CurrentRank);
                

                console.log(totalRep[key])
                var percent = (athletes_divison[key][i].score_abs / totalRep[key])*80
                if(document.getElementById(athletes_divison[key][i].lane) != null ){
                    document.getElementById(athletes_divison[key][i].lane).style.transform="translateX("+ percent +"%)";
                }

                if(athletes_divison[key][i].currentMouvement[0].mouvementName != athletes_divison[key][i].$item.find(".mvt").text() && status == "W" ){
                    currentMvt = athletes_divison[key][i].currentMouvement[0].mouvementName;
                    athletes_divison[key][i].$item.find(".mvt").text(athletes_divison[key][i].currentMouvement[0].mouvementName);
                }

                if(athletes_divison[key][i].result == "" ){
                    athletes_divison[key][i].$item.find(".score").text(athletes_divison[key][i].score_rel);
                    athletes_divison[key][i].$item.find(".score").css("width", "200px")
                    athletes_divison[key][i].$item.find(".score").css("max-width", "200px")
                    if (athletes_divison[key][i].CurrentRank == 1){
                        athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + first_rank__color + ")")
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + first_rank__color + ")")
                        athletes_divison[key][i].$item.find(".score").text(athletes_divison[key][i].score_abs);
                        athletes_divison[key][i].$item.find(".circle").css("fill", first_rank__color)
                    }
                    else if (athletes_divison[key][i].CurrentRank == 2){
                        athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + second_rank__color + ")")
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + second_rank__color + ")")
                        athletes_divison[key][i].$item.find(".circle").css("fill", second_rank__color)
                    }
                    else if (athletes_divison[key][i].CurrentRank == 3){
                        athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + third_rank__color + ")")
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + third_rank__color + ")")
                        athletes_divison[key][i].$item.find(".circle").css("fill", third_rank__color)
                    }
                    else {
                        athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + second_color + ")")
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + second_color + ")")
                        athletes_divison[key][i].$item.find(".circle").css("fill", second_color)
                    }
                }
                else{
                    athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + finish__color + ")")
                    athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + finish__color + ")")
                    athletes_divison[key][i].$item.find(".circle").css("fill",finish__color)
                    athletes_divison[key][i].$item.find(".score").css("color", "white")
                    athletes_divison[key][i].$item.find(".score").css("width", "200px")
                    athletes_divison[key][i].$item.find(".score").css("max-width", "200px")
                    var result = athletes_divison[key][i].result;
                    athletes_divison[key][i].$item.find(".score").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -9, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
                }

            })

            console.log(athletes_divison[key])

            if(status != "0"){
            }
            else{
                clearInterval(affiliateTimer)
            }

        })
    }
    catch(e){
        console.log(e)
    }
}    

function resetProgress(data){
    try{

        console.log(data)

        //! on traite le wod en cours 

        typeWod_G = data.heatInfo[0].type;

        // ! On récupère toutes les divisions présentes dans la heat en cours

        var divisionsNames = []
        var repTarget = [];

        let ii = 0;
        console.log(divisionsNames)
        for(let y=0; y < data.athletes.length -1; y++){
            divisionsNames[ii] = data.athletes[y].division
            if( data.athletes[y].division != data.athletes[y+1].division ){
                ii++;
                divisionsNames[ii] = data.athletes[y].division
            }
        }

        //! on retient le rep targets

        for(let y=0; y < divisionsNames.length; y++){
            for(let i=0; i < data.WorkoutInfo.length; i++){
                if(divisionsNames[y] == data.WorkoutInfo[i].division){
                    repTarget[y] = data.WorkoutInfo[i].total_reps
                    totalRep[y] = data.WorkoutInfo[i].total_reps;
                }
            }
        }

        //! On retient tous les mouvements pour chaque division
        var WodInfos = data.WorkoutInfo
        var mvtNames_final = []

        for(let y=0; y < divisionsNames.length; y++){
            for(let ii = 0; ii < WodInfos.length ; ii ++){
                var mvtNames = []
                if (WodInfos[ii].division == divisionsNames[y]){
                    for (let i = 0; i < WodInfos[ii].mvt_names.length; i++) {
                        if( WodInfos[ii].mvt_names[i].charAt(0) <='9' && WodInfos[ii].mvt_names[i].charAt(0) >='0') {
                            mvtNames[i] = WodInfos[ii].mvt_names[i]; 
                        }
                        else {
                            mvtNames[i] = WodInfos[ii].mvt_reps[i] + " " + WodInfos[ii].mvt_names[i]; 
                        }
                        // console.log(mvtNames[i])
                        // console.log(mvtNames[i].includes("Sprint"))
                        if( mvtNames[i].includes("Sprint")){
                            mvtNames[i] = mvtNames[i].substring(1)
                        }
                    }
                    for (let i = 0; i < WodInfos[ii].mvt_names.length; i++) {
                        mvtNames = mvtNames.toString().toUpperCase().replace(',',' - ')
                    }
                    mvtNames_final[y]=mvtNames
                }
            }
        }

        console.log(divisionsNames)
        console.log(repTarget)


        // if (data.heatInfo[0].type == "time"){
        //     var typeWod = "";
        //     for(i=0; i< data.WorkoutInfo[0]; i++){
        //         repTarget[i] = data.WorkoutInfo[i].total_reps + " reps" ;
        //         totalRep[i] = data.WorkoutInfo[i].total_reps;
        //     }
        // }
        // else if (data.heatInfo[0].type == "amrap"){
        //     var typeWod = "BEAT"
        //     var repTarget = data.WorkoutInfo[0].total_reps + " reps" ;
        //     totalRep[i] = data.WorkoutInfo[i].total_reps;
        // }


        console.log(divisionsNames)

        //! Initialisation des athletes dans un seul format avec un triage par division

        for (var y = 0; y < divisionsNames.length; y++){
            athletes = new Array();
            for(let i = 0;i < data.athletes.length;i++){
                if(data.athletes[i].division == divisionsNames[y]){
                    athletes[i] = athletes_init;
                    athletes[i] = Object.assign({}, athletes[i], data.athletes[i])
                    if (athletes[i].countryCode=="" || athletes[i].countryCode==null){athletes[i].countryCode = "FR"}
                }
            }
            athletes_divison[y] = athletes
        }
        console.log(athletes_divison)

        // ! On crée un tableau par division

        // ! On prend le tableau

        var $tab = $("#tableHeader")
        console.log($tab)
        $tab.find(".global").remove();

        // var heatDetails;
        // for (var y = 0; y < Object.keys(athletes_divison).length; y++){
        Object.keys(athletes_divison).forEach(key => {
            //! Ajouter la séparation ici
            var $tabItem = $(
                '<div class="global">' +
                    '<div class="wodrow row text-center d-xl-flex align-items-xl-center">'+ 
                        '<div class="col-2">'+
                            divisionsNames[key] + " divsion" +
                        '</div>' +
                        '<div class="col">'+
                            mvtNames_final[key] + 
                        '</div>' +
                        '<div class="col-2" style="background-color:rgba(0,0,0,1); width: 200px; margin-right:30px; padding-top:10px; padding-bottom:10px; border-radius:10px 10px 10px 10px">'+
                            repTarget[key] + " reps" + 
                        '</div>' +
                    '</div>' +
                    '<table id="leaderboard'+ key +'" class="leaderboard">' +
                        // '<thead> ' +
                        //         '<tr>' +
                        //             '<th>#</th>' +
                        //             '<th>CTY</th>' +
                        //             '<th>NAME</th>' +
                        //             '<th>AFFILIATION</th>' +
                        //             '<th>RANK</th>' +
                        //             '<th>PROGRESS</th>' +
                        //             '<th>ACTUAL MVT</th>' +
                        //             '<th>SCORING</th>' +
                        //         '</tr>' +
                        //     '</thead>' +
                        '<tbody id="athletes" class="athletes">' +
                        '</tbody>' + 
                    '</table>' +
                '</div>' 
            );

            // heatDetails.$tabItem = $tabItem;
            $tab.append($tabItem);

            var $list = $("#leaderboard"+ key +" #athletes");
            console.log($("#leaderboard"+ key +" #athletes"))
            $list.find(".athlete").remove();

            athletes_divison[key].sort(descendingLane);

            // for(var i = 0; i < athletes_divison[key].length; i++) {
            Object.keys(athletes_divison[key]).forEach(i => {
                console.log(athletes_divison[key][i])
                var $item = $(
                    '<tr class="athlete">' + 
                        '<td class="lane">'+ athletes_divison[key][i].lane + '</td>' + 
                        '<td class="flag">' + '<img src="https://flagcdn.com/'+ athletes_divison[key][i].countryCode.toLowerCase().substring(0,2) + '.svg" width="30"></img> ' + '</td>' +
                        '<td class="text-nowrap text-truncate text-left name">' + athletes_divison[key][i].displayName + '</td>' + 
                        '<td class="text-nowrap text-truncate text-left affiliate">' + athletes_divison[key][i].affiliate + '</td>' +
                        '<td class="rank">' + athletes_divison[key][i].CurrentRank  + '</th>' + 
                        '<td class="circle_progress">' +
                            '<svg>' +
                                '<circle cx="10" cy="50%" r="13px" fill="#aeaeae" class="circle" id="' + athletes_divison[key][i].lane+'"/>' +
                            '</svg>' +
                        '</td>' +
                        '<td class="mvt text-nowrap text-truncate">' + athletes_divison[key][i].currentMouvement[0].mouvementName  + '</th>' + 
                        '<td class="score align-items-xl-center">' + athletes_divison[key][i].score_abs + '</td>' +
                    '</tr>'
                );
                athletes_divison[key][i].$item = $item;
                $list.append($item);
                console.log($list)
            })
                athletes_divison[key].sort(ascendingLane);

        })
    }
    catch(e){
        console.log(e)
    }
}


