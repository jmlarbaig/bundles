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
var rep_rounds = []

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

        // console.log("New Scoring",newScoring)

        Object.keys(athletes_divison).forEach(key => {
            // console.log(athletes_divison[key])
            
            Object.keys(athletes_divison[key]).forEach(i => {

                athletes_divison[key][i] = Object.assign( {}, athletes_divison[key][i],fetchNewData(newScoring, athletes_divison[key][i].lane));
                athletes_divison[key][i].$item.find(".rank").text(athletes_divison[key][i].CurrentRank);
                
                var crtRound = athletes_divison[key][i].currentRound;

                console.log(crtRound)

                console.log("rep_round = ", rep_rounds)

                console.log(athletes_divison[key][i].score_abs - (rep_rounds[key] * crtRound))
                
                // console.log(totalRep[key])
                if (typeWod_G == "amrap"){
                    var percent = (athletes_divison[key][i].score_abs / (rep_rounds[key] * crtRound))*95
                }  
                else if (typeWod_G == "time"){
                    var percent = (athletes_divison[key][i].score_abs / totalRep[key])*95
                    console.log(percent)
                }
                
                if(document.getElementById(athletes_divison[key][i].lane) != null ){
                    document.getElementById(athletes_divison[key][i].lane).style.transform="translateX("+ percent +"%)";
                }

                if(athletes_divison[key][i].currentMouvement[0].mouvementName != athletes_divison[key][i].$item.find(".mvt").text() ){
                    currentMvt = athletes_divison[key][i].currentMouvement[0].mouvementName;
                    athletes_divison[key][i].$item.find(".mvt").text(athletes_divison[key][i].currentMouvement[0].mouvementName);
                }

                if(athletes_divison[key][i].result == "" ){
                    athletes_divison[key][i].$item.find(".score").text(athletes_divison[key][i].score_rel);
                    athletes_divison[key][i].$item.find(".score").css("width", "200px")
                    athletes_divison[key][i].$item.find(".score").css("max-width", "200px")
                    if (athletes_divison[key][i].CurrentRank == 1){
                        rep_rounds[0] = athletes_divison[key][i].score_abs
                        athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + first_rank__color + ")")
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + first_rank__color + ")")
                        if (typeWod_G == "amrap"){
                            // athletes_divison[key][i].$item.find(".score").text(crtRound == 0 ? athletes_divison[key][i].score_abs : crtRound + " t + " + (athletes_divison[key][i].score_abs - (rep_rounds[key] * crtRound)));
                            athletes_divison[key][i].$item.find(".score").text(athletes_divison[key][i].score_abs);
                        }
                        else {
                            athletes_divison[key][i].$item.find(".score").text(athletes_divison[key][i].score_abs);  
                        }
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
                    if (athletes_divison[key][i].status == "F"){
                        console.log(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result : "")
                        athletes_divison[key][i].$item.find(".score").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
                    }
                    else if (athletes_divison[key][i].status == "T"){
                        athletes_divison[key][i].$item.find(".score").text(result.toString());
                    }
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

        // console.log(data)

        //! on traite le wod en cours 

        typeWod_G = data.heatInfo[0].type;
        athletes_divison = []

        // ! On récupère toutes les divisions présentes dans la heat en cours

        var divisionsNames = []
        var repTarget = [];

        for(let athletes of data.athletes){
            if( !divisionsNames.includes(athletes.division) ){
                divisionsNames.push(athletes.division)
            }
        }

        console.log("Division Names",divisionsNames)

        //! on retient le rep targets

        for(let y=0; y < divisionsNames.length; y++){
            for(let wod of data.WorkoutInfo){
                if(divisionsNames[y] == wod.division){
                    console.log("wod.rep_per_rounds = ", wod)
                    repTarget[y] = wod.total_reps
                    totalRep[y] = wod.total_reps;
                    if (typeWod_G =="amrap"){
                        rep_rounds[y] = wod.rep_per_rounds;
                    }
                    else {
                        if (wod.total_reps == undefined){
                            rep_rounds[y] = "Max de rep";
                        }
                        else{
                            rep_rounds[y] = wod.total_reps;
                        }
                    }
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

        // console.log(divisionsNames)
        // console.log(repTarget)


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
                    if (athletes[i].countryCode=="" || athletes[i].countryCode==null){
                        athletes[i].countryCode = "FR"
                    }
                    else{
                        for(let f=0; f < FLAG.length; f++){
                            if (athletes[i].countryCode == FLAG[f]["3L"]){
                                athletes[i].countryCode = FLAG[f]["2L"];
                                break;
                            }
                        }
                    }
                }
            }
            athletes_divison[y] = athletes
        }

        // ! On crée un tableau par division

        // ! On prend le tableau

        var $tab = $("#tableHeader")
        $tab.find(".global").remove();

        // var heatDetails;
        // for (var y = 0; y < Object.keys(athletes_divison).length; y++){
        Object.keys(athletes_divison).forEach(key => {
            //! Ajouter la séparation ici
            if(typeWod_G == "amrap"){
                var textRep = "AMRAP"
            }
            else {
                if(repTarget[key] == undefined){
                    var textRep = "MAX REPS";
                }
                else{
                    var textRep = repTarget[key] + " REPS";
                }
            }
            if(mvtNames_final[key] == undefined){
                var textMvt = "";
            }
            else{
                var textMvt = mvtNames_final[key];
            }
            var $tabItem = $(
                '<div class="global">' +
                    '<div class="wodrow row text-center d-xl-flex align-items-xl-center">'+ 
                        '<div class="col-2">'+
                            divisionsNames[key] + " division" +
                        '</div>' +
                        '<div class="col">'+
                            textMvt+ 
                        '</div>' +
                        '<div class="col-2" style="background-color:rgba(0,0,0,1); width: 200px; margin-right:30px; padding-top:10px; padding-bottom:10px; border-radius:10px 10px 10px 10px">'+
                            textRep+ 
                        '</div>' +
                    '</div>' +
                    '<table id="leaderboard'+ key +'" class="leaderboard">' +
                        '<thead> ' +
                                '<tr>' +
                                    '<th>#</th>' +
                                    '<th>CTY</th>' +
                                    '<th>NAME</th>' +
                                    '<th>AFFILIATION</th>' +
                                    '<th>O. POINTS</th>' +
                                    '<th>O. RANK</th>' +
                                    '<th>WOD RANK</th>' +
                                    '<th>PROGRESS</th>' +
                                    '<th>ACTUAL MVT</th>' +
                                    '<th>SCORING</th>' +
                                '</tr>' +
                            '</thead>' +
                        '<tbody id="athletes" class="athletes">' +
                        '</tbody>' + 
                    '</table>' +
                '</div>' 
            );

            // heatDetails.$tabItem = $tabItem;
            $tab.append($tabItem);

            var $list = $("#leaderboard"+ key +" #athletes");
            $list.find(".athlete").remove();

            athletes_divison[key].sort(descendingLane);

            // for(var i = 0; i < athletes_divison[key].length; i++) {
            Object.keys(athletes_divison[key]).forEach(i => {
                console.log(athletes_divison[key])
                var $item = $(
                    '<tr class="athlete">' + 
                        '<td class="lane">'+ athletes_divison[key][i].lane + '</td>' + 
                        '<td class="flag">' + '<img src="https://flagcdn.com/'+ athletes_divison[key][i].countryCode.toLowerCase() + '.svg" width="30"></img> ' + '</td>' +
                        '<td class="text-nowrap text-truncate text-left name">' + athletes_divison[key][i].displayName + '</td>' + 
                        '<td class="text-nowrap text-truncate text-left affiliate">' + athletes_divison[key][i].affiliate + '</td>' +
                        '<td class="Orank">' + athletes_divison[key][i].overallPoints + '</td>' + 
                        '<td class="Orank">' + athletes_divison[key][i].rank + '</td>' +
                        '<td class="rank">' + athletes_divison[key][i].CurrentRank  + '</th>' + 
                        '<td class="circle_progress">' +
                            '<svg>' +
                                '<circle cx="10" cy="50%" r="5px" fill="#aeaeae" class="circle" id="' + athletes_divison[key][i].lane+'"/>' +
                            '</svg>' +
                        '</td>' +
                        '<td class="mvt text-nowrap text-truncate">' + athletes_divison[key][i].currentMouvement[0].mouvementName  + '</th>' + 
                        '<td class="score align-items-xl-center">' + athletes_divison[key][i].score_abs + '</td>' +
                    '</tr>'
                );
                athletes_divison[key][i].$item = $item;
                $list.append($item);
            })
                athletes_divison[key].sort(ascendingLane);

        })
    }
    catch(e){
        console.log(e)
    }
}


