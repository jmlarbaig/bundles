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
var rd = []

var athletes = {}

var currentMvt = undefined;
var LastlengthStats = [];

function ascendingRank(a, b) { return Number(a.CurrentRank) - Number(b.CurrentRank) }
function descendingRank(a, b) { return Number(a.CurrentRank) + Number(b.CurrentRank) }
function ascendingLane(a, b) { return Number(a.lane) - Number(b.lane) }
function descendingLane(a, b) { return Number(a.lane) + Number(b.lane) }

function reposition(WhichLeadeboard, athletes) {
    var height = $(WhichLeadeboard + " #athletes .athlete").height();
    var y = height ;
    Object.keys(athletes).forEach(key => {
        if(athletes[key].$item.find(WhichLeadeboard) != undefined){   
            athletes[key].$item.css("top", y + "px");
            y += height;			
        }
    })
}  

function fetchNewData(data,lane){
    for(var x in data){
        if((data[x].lane == lane) == true) {
            return data[x];
        }
    }
    return null;
}


function updateDynamics(newScoring, status, leftLane, rigthLane){
    try{

        console.log("Show manual ",showManuel.value)
        if (!showManuel.value){
            
            for (let i = 0; i < newScoring.length; i++) {
                var athlete = athletes[i];
                athletes[i] = Object.assign( {}, athletes[i],fetchNewData(newScoring, athletes[i].lane));
                // athletes[i].$item.find(".rank").text(athletes[i].CurrentRank);

                // console.log(LastlengthStats[i] )
                // console.log("dataRow[i] = ", dataRow.value[i])

                
                if(athletes[i].currentMouvement[0].mouvementName != athletes[i].$item.find(".newMvt").text() && status == "W" ){
                    currentMvt = athletes[i].currentMouvement[0].mouvementName;
                    athletes[i].$item.find(".newMvt").text(athletes[i].currentMouvement[0].mouvementName);
                    athletes[i].$item.find(".newMvt").fadeIn(1000);
                    athletes[i].$item.find(".newMvt").css("background", main_color)
                    athletes[i].$item.find(".newMvt").css("color", tx_main_color)
                    setTimeout(function(){
                        athletes[i].$item.find(".newMvt").fadeOut(1000);
                    }, 3000);
                }


                if(Object.keys(athletes[i].log_mvt[0]).length != LastlengthStats[i] && status == "W" ){

                    LastlengthStats[i] = Object.keys(athletes[i].log_mvt[0]).length

                    currentMvt = Object.keys(athletes[i].log_mvt[0])[LastlengthStats[i]-1];
                    var mvt = currentMvt.split(" ")
                    currentStats = Object.values(athletes[i].log_mvt[0])[LastlengthStats[i]-1]
                    
                    // Changer entre la configu current Round and MVT
                    
                    rd[i] = "R"+athletes[i].currentRound;
                    // rd[i] = mvt[3]

                    mvt[2] == undefined ? "" : mvt[2]

                    athletes[i].$item.find(".lastStats").text("TIME OF " + mvt[2]  + " " + mvt[5] + " : " + currentStats);

                    athletes[i].$item.find(".lastStats").fadeIn(1000);
                    // setTimeout(function(){
                    //     athletes[i].$item.find(".lastStats").fadeOut(1000);
                    // }, 10000);
                    
                }

                console.log("Data row = ",dataRow.value)

                if(dataRow.value[i] != undefined && status == "W"){
                    console.log("i = ", i)
                    console.log("dataRow[i] = ", dataRow.value[i])
                    console.log("Satus Mvt = ",athletes[i].currentMouvement[0])
                    if(athletes[i].currentMouvement[0].mouvementName.includes("Row")){
                        athletes[i].$item.find(".rowStats").text(parseInt(dataRow.value[i].calories).toString() + " CAL" + " - " + parseInt(dataRow.value[i].calH).toString() + " CAL/H");
                        athletes[i].$item.find(".rowStats").fadeIn(1000);    
                        $("#sponsorImg").attr('src', "img/wodproof.png");
                    }
                    else{
                        athletes[i].$item.find(".rowStats").fadeOut(1000); 
                        // $("#sponsorImg").attr('src', sponsorLower.value[0].url);
                    }
                }

                if(athletes[i].result == "" ){
                    if (rd[i] != undefined){
                        athletes[i].$item.find(".score").text( rd[i] + " - " + athletes[i].score_abs + " REPS" );
                        // athletes[i].$item.find(".score").text( athletes[i].score_abs + " REPS" );
                    }
                    else{
                        athletes[i].$item.find(".score").text( athletes[i].score_abs + " REPS" );
                    }
                    if (athletes[i].CurrentRank == 1){
                        athletes[i].$item.find(".score").css("background", first_rank__color )
                        athletes[i].$item.find(".score").css("color", tx_first_rank__color)
                    }
                    else if (athletes[i].CurrentRank == 2){
                        athletes[i].$item.find(".score").css("background", second_rank__color )
                        athletes[i].$item.find(".score").css("color", tx_second_rank__color)
                    }
                    else if (athletes[i].CurrentRank == 3){
                        athletes[i].$item.find(".score").css("background", third_rank__color )
                        athletes[i].$item.find(".score").css("color", tx_third_rank__color)
                    }
                    else {
                        athletes[i].$item.find(".score").css("background", second_color )
                        athletes[i].$item.find(".score").css("color", tx_second_color)
                    }
                }
                else{
                    // athletes[i].$item.find(".rank").css("background", finish__color )
                    // athletes[i].$item.find(".score").css("background", main_color )
                    // athletes[i].$item.find(".score").css("color", "white")
                    var result = athletes[i].result;
                    if (athletes[i].status == "F"){
                        console.log(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result : "")
                        athletes[i].$item.find(".athlete").css("background", finish__color )
                        athletes[i].$item.find(".athlete").css("color", tx_finish__color )
                        // athletes[i].$item.find(".score").css("width", "100px")
                        athletes[i].$item.find(".score").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
                    }
                    else if (athletes[i].status == "T"){
                        athletes[i].$item.find(".score").text(result.toString());                        
                        athletes[i].$item.find(".score").css("background", second_color )
                        athletes[i].$item.find(".score").css("color", tx_second_color)
                        // athletes[i].$item.find(".score").css("width", "100px")
                    }
                    setTimeout(function(){
                        athletes[i].$item.find(".lastStats").fadeOut(1000);
                    }, 10000);
                }

            }

            console.log(athletes)

            if(status != "0" || athletes[1].CurrentRank == null){
                console.log(athletes)
            }
            else{
                clearInterval(affiliateTimer)
            }
        }
        else {
            console.log("Show value true")
            for (let i = 0; i < newScoring.length; i++) {                
                athletes[i].$item.find(".rank").text("");
                athletes[i].$item.find(".nameP").fadeIn();
                athletes[i].$item.find(".Poid").fadeIn();
                athletes[i].$item.find(".lastStats").fadeOut();
                athletes[i].$item.find(".newMvt").fadeOut();
            }
            AttPoids (Att_poids.value);
        }
    }
    catch(e){
        console.log(e)
    }
}    

function resetLeaderboard(laneLeft, LaneRigth){
    try{
        LastlengthStats = [];

        var data = staticData;
        console.log("Static Data = ", staticData)
        // ! On prend le tableau
        
        var $tab = $("#overlay")
        $tab.find(".leaderboard").remove();

        //! on traite le wod en cours 

        typeWod_G = data.heatInfo[0].type;

        // ! On récupère toutes les divisions présentes dans la heat en cours

        var divisionsNames = []
        var repTarget = [];


        for(let athletes of data.athletes){
            if( !divisionsNames.includes(athletes.division) ){
                divisionsNames.push(athletes.division)
            }
        }
        
        //! on retient le rep targets

        for(let y=0; y < divisionsNames.length; y++){
            for(let wod of data.WorkoutInfo){
                if(divisionsNames[y] == wod.division){
                    repTarget[y] = wod.total_reps
                    // totalRep[y] = wod.total_reps;
                }
            }
        }


        if (data.heatInfo[0].type == "time"){
            var typeWod = "";
            for(let i=0; i< data.WorkoutInfo[0]; i++){
                repTarget[i] = data.WorkoutInfo[i].total_reps;
            }
        }
        else if (data.heatInfo[0].type == "amrap"){
            var typeWod = "BEAT"
            var repTarget = "MAX REPS" ;
        }

        //! Initialisation des athletes dans un seul format avec un triage par division

        athletes = new Array();
        for(let i = 0;i < data.athletes.length;i++){
            athletes[i] = athletes_init;
            athletes[i] = Object.assign({}, athletes[i], data.athletes[i])
            if (athletes[i].countryCode == "" || athletes[i].countryCode==null){athletes[i].countryCode = "FR"}
            else{
                for(let f=0; f < FLAG.length; f++){
                    if (athletes[i].countryCode == FLAG[f]["3L"]){
                        athletes[i].countryCode = FLAG[f]["2L"];
                        break;
                    }
                }
            }
        }

        // ! On crée un tableau par division

        var $elm = $("#overlay");
        $elm.find(".laneLeft").remove();
        $elm.find(".laneRight").remove();
        $elm.find(".chrono").remove();

        var $tabItem = $(
            '<div class="laneLeft col" id="laneLeft">'+'</div>' +
            '<div class="chrono col" id="chrono"></div>' +
            '<div class="laneRight col" id="laneRight">'+'</div>' 
        );

        $elm.append($tabItem);

        var $list = $(".chrono");
        $list.find(".time").remove();

        var $itemChrono = $(
            '<div class="time">' +
                '<img class="logoSK img-fluid" src="./img/PRESTA/SK-logo.png"/>' +
                '<div id="chronoText" class="text-nowrap text-truncate chronoText text-center"> TIME</div>' +
                '<div id="timecap" class="timecap text-center m-auto "> TIMECAP : '+ timecapNTP +"'</div>" +
            '</div>'
        );

        $list.append($itemChrono);


        Object.keys(athletes).forEach(key => {
            var $item = $(
                '<tr class="athlete row">' + 
                    // '<td class="rank">' + athletes[key].CurrentRank  + '</td>' + 
                    // '<td class="lane"># '+ athletes[key].lane + '</td>' + 
                    // '<td class="flag">' + '<img src="https://flagcdn.com/'+ athletes[key].countryCode.toLowerCase() + '.svg" width="30"></img> ' + '</td>' +
                    '<td class="text-nowrap text-truncate text-left name">' + athletes[key].displayName + '</td>' + 
                    '<td class="score text-nowrap text-truncate">' + athletes[key].score_abs + '</td>' +
                    '<td class="text-nowrap text-truncate popup">' + '</td>' +
                '</tr>' +
                '<tr class="popupStats row">' +
                    '<td class="lastStats"></td>' +
                '</tr>' +
                '<tr class="popup row">' +
                    '<td class="newMvt"></td>' +
                '</tr>' + 
                '<tr class="popup row">' +
                    '<td class="rowStats"></td>' +
                '</tr>' + 
                '<tr class="popupPoids row">' +
                    '<td class="nameP Name1"></td>' +
                    '<td class="Poid Poids1 " text="0"></td>' +
                    // '<td class="nameP Name2"></td>' +
                    // '<td class="Poid Poids2" text="0"></td>' +
                    // '<td class="nameP Name3 " ></td>' +
                    // '<td class="Poid Poids3" text="0"></td>' +
                '</tr>'
            );
            athletes[key].$item = $item;
            athletes[key].$item.find(".lastStats").hide();
            athletes[key].$item.find(".rowStats").hide();
            athletes[key].$item.find(".newMvt").hide();
            athletes[key].$item.find(".nameP").hide();
            athletes[key].$item.find(".Poid").hide();
        })

        var $elm1 = $(".laneLeft");
        $elm1.find(".athlete").remove();
        var $itemLeft = athletes[laneLeft].$item;
        $elm1.append($itemLeft);

        var $elm2 = $(".laneRight");
        $elm2.find(".laneRight").remove();
        var $itemRigth = athletes[LaneRigth].$item
        $elm2.append($itemRigth);

    }
    catch(e){
        console.log(e)
    }
}
