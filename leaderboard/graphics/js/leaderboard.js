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

function updateDynamics(newScoring, status){
    try{

        console.log("New Scoring",newScoring)

        Object.keys(athletes_divison).forEach(key => {
            // console.log(athletes_divison[key])
            
            Object.keys(athletes_divison[key]).forEach(i => {
                console.log("Athlete = ", athletes_divison[key][i])
                console.log("i =", i)

                athletes_divison[key][i] = Object.assign( {}, athletes_divison[key][i],fetchNewData(newScoring, athletes_divison[key][i].lane));
                athletes_divison[key][i].$item.find(".rank").text(athletes_divison[key][i].CurrentRank);
                

                // if(athletes_divison[key][i].currentMouvement[0].mouvementName != athletes_divison[key][i].$item.find(".popup").text() && status == "W" ){
                if( status == "W" ){
                    let Mvt_name
                    if (athletes_divison[key][i].currentMouvement[0].mouvementName.includes("_")){
                        Mvt_name = athletes_divison[key][i].currentMouvement[0].mouvementName.replaceAll("_", " ")
                    }
                    else{
                        Mvt_name = athletes_divison[key][i].currentMouvement[0].mouvementName
                    }

                    if (athletes_divison[key][i].currentMouvement[0].mouvementName.includes("Sprint")){
                        athletes_divison[key][i].$item.find(".popup").text(Mvt_name);
                        athletes_divison[key][i].$item.find(".popup").fadeIn();
                    }
                    else{
                        if (i!=0){
                            if (athletes_divison[key][i].currentMouvement[0].mouvementName != athletes_divison[key][i-1].currentMouvement[0].mouvementName && athletes_divison[key][i].currentMouvement[0].mouvementName != athletes_divison[key][i].$item.find(".popup").text()){
                                // currentMvt = athletes_divison[key][i].currentMouvement[0].mouvementName;
                                athletes_divison[key][i].$item.find(".popup").text("/"+athletes_divison[key][i].currentMouvement[0].repTarget + " " + Mvt_name);
                                athletes_divison[key][i].$item.find(".popup").fadeIn();
                            }
                            else{
                                athletes_divison[key][i].$item.find(".popup").fadeOut();
                            }
                        }
                        else {
                            if(athletes_divison[key][i].currentMouvement[0].mouvementName == "" || athletes_divison[key][i].currentMouvement[0].mouvementName.includes("Workout")){
                                athletes_divison[key][i].$item.find(".popup").fadeOut();
                            }
                            else{
                                athletes_divison[key][i].$item.find(".popup").text("/"+athletes_divison[key][i].currentMouvement[0].repTarget + " " + athletes_divison[key][i].currentMouvement[0].mouvementName);
                                athletes_divison[key][i].$item.find(".popup").fadeIn();
                            }
    
                        }
                    }

                    // currentMvt = athletes_divison[key][i].currentMouvement[0].mouvementName;
                    // athletes_divison[key][i].$item.find(".popup").text(athletes_divison[key][i].currentMouvement[0].mouvementName);
                    // athletes_divison[key][i].$item.find(".popup").fadeIn(1000);
                    // athletes_divison[key][i].$item.find(".score").css("background", second_color)
                    // setTimeout(function(){
                    //     athletes_divison[key][i].$item.find(".popup").fadeOut(1000);
                    // }, 3000);
                }



                if(athletes_divison[key][i].result == "" ){
                    athletes_divison[key][i].$item.find(".score").css("width", "50px")
                    athletes_divison[key][i].$item.find(".score").text(athletes_divison[key][i].score_rel);
                    if (athletes_divison[key][i].CurrentRank == 1){
                        // athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right, rgba(0,0,0,0), " + first_rank__color + ")")
                        athletes_divison[key][i].$item.find(".rank").css("background", first_rank__color )
                        athletes_divison[key][i].$item.find(".rank").css("color", tx_first_rank__color )

                        athletes_divison[key][i].$item.find(".score").css("color", tx_first_rank__color )
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + first_rank__color + ")")
                        athletes_divison[key][i].$item.find(".score").text(athletes_divison[key][i].score_abs);
                    }
                    else if (athletes_divison[key][i].CurrentRank == 2){
                        // athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right, rgba(0,0,0,0)," + second_rank__color + ")")
                        athletes_divison[key][i].$item.find(".rank").css("background", second_rank__color )
                        athletes_divison[key][i].$item.find(".rank").css("color", tx_second_rank__color )
                        athletes_divison[key][i].$item.find(".score").css("color", tx_second_rank__color )
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + second_rank__color + ")")
                    }
                    else if (athletes_divison[key][i].CurrentRank == 3){
                        // athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right, rgba(0,0,0,0)," + third_rank__color + ")")
                        athletes_divison[key][i].$item.find(".rank").css("background", third_rank__color )
                        athletes_divison[key][i].$item.find(".rank").css("color", tx_third_rank__color )
                        athletes_divison[key][i].$item.find(".score").css("color", tx_third_rank__color )
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + third_rank__color + ")")
                    }
                    else {
                        athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right, rgba(0,0,0,0)," + second_color + ")")
                        athletes_divison[key][i].$item.find(".rank").css("background", second_color )
                        athletes_divison[key][i].$item.find(".rank").css("color", tx_second_color )
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + second_color + ")")
                        athletes_divison[key][i].$item.find(".score").css("color", tx_second_color )
                    }
                }
                else{
                    // athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right, rgba(0,0,0,0)," + finish__color + ")")
                    athletes_divison[key][i].$item.find(".rank").css("background", finish__color )
                    athletes_divison[key][i].$item.find(".rank").css("color", tx_finish__color )
                    athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + finish__color + ")")
                    athletes_divison[key][i].$item.find(".score").css("color", tx_finish__color)
                    var result = athletes_divison[key][i].result;
                    if (athletes_divison[key][i].status == "F"){

                        //!! Ajouter le winner de la heat
                        // if(athletes_divison[key][i].CurrentRank == 1 && heatId){
                        //     affichageWinnerHeat(athletes_divison[key][i]);
                        //     setTimeout(function(){

                        //     }, 3000);
                        // }
                        console.log(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result : "")
                        athletes_divison[key][i].$item.find(".score").css("width", "100px")
                        athletes_divison[key][i].$item.find(".score").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
                    }
                    else if (athletes_divison[key][i].status == "T"){
                        athletes_divison[key][i].$item.find(".score").text(result.toString());
                        athletes_divison[key][i].$item.find(".score").css("width", "100px")
                    }
                    athletes_divison[key][i].$item.find(".popup").fadeOut();
                }

            })

            // console.log(athletes_divison[key])

            if(status != "0" || athletes_divison[key][1].CurrentRank != null){
                // console.log(athletes_divison[key])
                athletes_divison[key].sort(ascendingRank);
                if( typeWod_G == "amrap"){
                    console.log("AMRAP")
                    // if(athletes_divison[key][0].score_abs)
                    // document.getElementById('repTobeat').innerHTML =athletes_divison[key][0].score_abs + " reps";
                }
                else{

                }
            }
            else{
                athletes_divison[key].sort(ascendingLane);
                clearInterval(affiliateTimer)
            }
            var height_tot = ( Object.keys(athletes_divison[key]).length * $(".athlete").height()) + $("#leaderboard"+ key +" th").height() + 10;
            $("#leaderboard"+ key).css("height", height_tot)
            // reposition("#leaderboard"+ key, athletes_divison[key]);
            reposition("#leaderboard"+ key, athletes_divison[key]);

        })
    }
    catch(e){
        console.log(e)
    }
}    

function resetLeaderboard(){
    try{
        
        data = staticData;
        console.log("Static Data = ", staticData)
        // ! On prend le tableau
        
        var $tab = $("#tableur")
        $tab.find(".leaderboard").remove();

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
        
        //! on retient le rep targets

        for(let y=0; y < divisionsNames.length; y++){
            for(let wod of data.WorkoutInfo){
                if(divisionsNames[y] == wod.division){
                    repTarget[y] = wod.total_reps
                    // totalRep[y] = wod.total_reps;
                }
            }
        }
        console.log(divisionsNames)
        console.log(repTarget)


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


        console.log(divisionsNames)

        //! Initialisation des athletes dans un seul format avec un triage par division

        for (var y = 0; y < divisionsNames.length; y++){
            athletes = new Array();
            for(let i = 0;i < data.athletes.length;i++){
                if(data.athletes[i].division == divisionsNames[y]){
                    athletes[i] = athletes_init;
                    athletes[i] = Object.assign({}, athletes[i], data.athletes[i])
                    if (athletes[i].countryCode=="" || athletes[i].countryCode==null){athletes[i].countryCode = "FR"}
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
            // console.log(athletes_divison)
        }


        // ! On crée un tableau par division

        heatDetails;
        // for (var y = 0; y < Object.keys(athletes_divison).length; y++){
        Object.keys(athletes_divison).forEach(key => {
            //! Ajouter la séparation ici
            if(typeWod_G == "amrap"){
                var textRep = "AMRAP"
                if(repTarget[key] == undefined){
                    var textRep = "MAX REPS";
                }
            }
            else {
                if(repTarget[key] == undefined){
                    var textRep = "";
                }
                else{
                    var textRep = repTarget[key] + " REPS";
                }
            }
            var $tabItem = $(
                '<table id="leaderboard'+ key +'" class="leaderboard">' +
                    '<thead>'+
                        '<tr>'+
                            '<th class="rank">'+'</th>' +
                            '<th class="text-nowrap text-truncate text-left">' + divisionsNames[key] + '</th>' +
                            '<th class="repTarget">' + textRep + '</th>' +
                        '</tr>'+
                    '</thead>'+
                    '<tbody id="athletes" class="athletes">' +
                    '</tbody>' + 
                '</table>' 
            );

            heatDetails.$tabItem = $tabItem;
            $tab.append($tabItem);

            var $list = $("#leaderboard"+ key +" #athletes");
            $list.find(".athlete").remove();

            athletes_divison[key].sort(descendingLane);

            // for(var i = 0; i < athletes_divison[key].length; i++) {
            Object.keys(athletes_divison[key]).forEach(key2 => {
                
                var $item = $( 
                    '<tr class="athlete" id="aht'+athletes_divison[key][key2].lane+'">' + 
                        '<td class="rank"></td>' + 
                        '<td class="lane"># '+ athletes_divison[key][key2].lane + '</td>' + 
                        '<td class="flag">' + '<img src="https://flagcdn.com/'+ athletes_divison[key][key2].countryCode.toLowerCase() + '.svg" width="30"></img> ' + '</td>' +
                        '<td class="text-nowrap text-truncate text-left name">' + athletes_divison[key][key2].displayName + '</td>' + 
                        '<td class="score"></td>' +
                        '<td class="text-nowrap text-truncate popup">' + '</td>' +
                    '</tr>'
                );
                athletes_divison[key][key2].$item = $item;
                athletes_divison[key][key2].$item.find(".popup").hide();
                !showFlag.value ? athletes_divison[key][key2].$item.find(".flag").hide() : "" ;
                $list.append($item);

                animateCSS('#aht'+athletes_divison[key][key2].lane, 'fadeInLeft')
            })
                athletes_divison[key].sort(ascendingLane);

                var height_tot = ( Object.keys(athletes_divison[key]).length * $(".athlete").height()) + $("#leaderboard"+ key +" th").height() + 10;
                $("#leaderboard"+ key).css("height", height_tot)
                reposition("#leaderboard"+ key, athletes_divison[key]);

        })
    }
    catch(e){
        console.log(e)
    }
}


const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

function affichageWinnerHeat(data){
    var $winner =  $('#winner');
    $winner.find(".winDetails").remove();

    // laneInfos.value = currentHeat.participants.find(elt => elt.id == 
    //     participantsCurrentHeats.stations.find(element => element.station == event.target.id).participantId);

    var winner = staticData.athletes.find(element => element.lane == data.lane)

    if (winner.countryCode=="" || winner.countryCode==null){winner.countryCode = "FRA"}
    else{
        country = FLAG.find(element => element["3L"] == winner.countryCode)
    }

    console.log("Winner = ", winner)

    var $item = $(
        '<div class="container winnerThird" style=" font-family: montserrat;">'+
        '<div class="row lowerWinner">'+
            '<div class="col-auto text-center d-flex flex-column align-items" style="background-color: #ffffff;padding: 2px 2px;margin-left: 5px;margin-bottom: 5px;margin-right: 5px;margin-top: 5px;"><em class="text-center" style="font-size: 20px; padding-right:5px;">'+winner.rank+'° </em>'+
            '</div>'+
            '<div class="col" style="">'+
                '<div class="row justify-content-between">'+
                    '<div class="col-auto d-lg-flex align-items-lg-center" style="padding: 0px; margin-left:5px;"><strong style="font-size: 30px;color:white;"># '+ winner.station+'</strong></div>'+
                    '<div class="col-auto d-lg-flex align-items-lg-center" style="padding: 0px; margin-left:5px;"><img class="d-lg-flex" src="https://flagcdn.com/'+ country["2L"].toLowerCase() + '.svg" style="width: 30px;margin: -3px 5px;"></div>'+
                    '<div class="col text-left d-xl-flex align-items-xl-center text-nowrap text-truncate text-break" style="padding: 0px 5px;">' +
                        '<h1 class="text-left d-xl-flex justify-content-xl-start" style="color: rgb(255,255,255);font-size: 24px;margin: 0px;">'+winner.displayName+'</h1>' +
                   ' </div>' +
                    '<div class="col-auto" style="margin-right: 10px;">' +
                        '<div class="row">' +
                            '<div class="col d-xl-flex justify-content-xl-end" style="padding: 0px 5px;margin-top: 5px;"><em style="color: rgb(255,255,255);font-size: 8px;">FROM</em></div>' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="col text-nowrap text-truncate text-break text-right" style="padding: 0px;"><strong style="color: rgb(255,255,255);font-size: 12px;padding: 0px 5px;">'+ winner.aff +'</strong></div>' +
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>' +
        '</div>'+
    '</div>'
    )
}