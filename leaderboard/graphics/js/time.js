var startTimeNTP;
var timerLaunch;
var typeWod_G = undefined

function timeToDateTime(time) {
    var times = time.split(':');
    if (times.length == 3){
        var hours = times[0];
        var minutes = times[1];
        var secmili = times[2].split('.');
        var seconds = secmili[0];
        var mili = secmili[1];

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();

        // Pas de milliseconds dans le constructeur Date
        return new Date(year, month, day, hours, minutes, seconds);
    }
}

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (secs<10) { secs = '0' + secs}
    if (mins<10) { mins = '0' + mins}
    return mins + ':' + secs ;
}


function updateTime(){
    document.getElementById("division").innerHTML = heat_Name;

    startTimeNTP = dataTime.NtpTimeStart;

    // let now = new Date();
    let startTime = timeToDateTime(startTimeNTP);
    let endTime = timeToDateTime(startTimeNTP).setMinutes(startTime.getMinutes() + timecapNTP);

    // var timespan = countdown(startTime, endTime);
    // console.log("Time = ",timeNTP.value)
    // console.log("nowNtp = ", nowNtp.value)

    let timeDiffStart = timeNTP.value - startTime;
    let timeDiffTimeCap = timeNTP.value - endTime;

    let timeDiffEnd = endTime - timeNTP.value;

    // console.log("startTime =", startTime)
    // console.log("timeDiffStart =", timeDiffStart)
    // console.log("timeDiffEnd =", timeDiffEnd)
    // console.log("timeDiffTimeCap =", timeDiffTimeCap)
    // console.log("endTime =", endTime)
    // console.log("chrono =", chrono)

    $("#chronoLocation").css("background-color", chrono_color)
    $("#chronoLocation").css("color", tx_chrono_color)
    if (timeDiffTimeCap < 0 && timeDiffStart > 0 && dataTime.status != 0){
        if (typeWod_G == "amrap" || Ft_Ap.value == true){
            chrono = msToTime(timeDiffEnd);
        }
        else{
            chrono = msToTime(timeDiffStart);
        }
    } else if (timeDiffTimeCap < 0 && timeDiffStart < 0){
        chrono = msToTime(timeDiffStart).substring(4);
        $("#chronoLocation").css("background-color", "rgba(255,50,80,1)")
        $("#chronoLocation").css("color", "rgb(0,0,0")
    } else {
        if (timecapNTP != ''){
            chrono = timecapNTP + ":00";
        }
        else{
            chrono = "00:00"
        }
    }

    document.getElementById("chrono").innerHTML = chrono;

}

function resetHeat(){

    // document.getElementById("heatName").innerHTML = data.heatName;
    // document.getElementById("timecap").innerHTML = "TIMECAP : " + timecapNTP + " '"

    try{

        data = staticData;
        var $list = $("#heatDetails");
        $list.find(".heat").remove();

        typeWod_G = data.heatInfo[0].type;

        heatDetails;
        if (data.heatInfo[0].type == "time"){
            var typeWod = "";
            var repTarget = data.WorkoutInfo[0].total_reps + " reps" ;
        }
        else if (data.heatInfo[0].type == "amrap"){
            var typeWod = "BEAT"
            // var repTarget = data.WorkoutInfo[0].total_reps + " reps" ;
        }
    
        var $item = $(
            '<div class="heat row d-xl-flex align-items-xl-center" style="padding: 5px 2px 5px 2px;">' +
                '<div class="col" style="padding-bottom: 5px;padding-top: 5px;">' +
                    '<div class="m-auto text-nowrap text-truncate" style="padding-bottom:5px;"> ' + data.workoutName + ' </div>' +
                    '<div id="division" class="m-auto text-nowrap text-truncate"></div>' +    
                '</div>' +
                // ' <div class="target col" style="color: white; border-radius: 2px; border-left:1px solid;">' +
                //     '<h3 class="text-center m-auto" style="font-size: 10px;">' + typeWod+ '</h3>' +
                //     '<h3 class="text-center m-auto" id="repTobeat">'+ repTarget +'</h3>' +
                // ' </div>' +
                // ' <div id="sponsor" class="sponsor col" style="">' +

                ' </div>' +
            '</div>'
        );

        heatDetails.$item = $item;
        $list.append($item);

    }
    catch(e){
        console.log(e)
    }
}

function showTime(){
    try{
        var $list = $("#chronoLocation");
        $list.find(".time").remove();

        var $item = $(
            '<div class="time">' +
                '<img class="logoSK img-fluid" src="./img/PRESTA/SK-logo.png"/>' +
                '<div id="chrono" class="chrono" class="text-center m-auto"></div>' +
                '<h3 id="timecap" class="text-center m-auto"> TIMECAP : '+ timecapNTP +"'</h3>" +
            '</div>'
        );

        $list.append($item);
        if (timerLaunch == undefined){
            clearInterval(timerLaunch)
            timerLaunch = setInterval(updateTime, 100);
        }
        else {
            timerLaunch = setInterval(updateTime, 100);
        }

    }
    catch(e){
        console.log(e)
    }
}


function resetWod(){

    // document.getElementById("heatName").innerHTML = data.heatName;
    // document.getElementById("timecap").innerHTML = "TIMECAP : " + timecapNTP + " '"

    try{

        data = staticData;
        divisionsNames = [];
        workoutNames = [];

        for(let athletes of data.athletes){
            if( !divisionsNames.includes(athletes.division) ){
                divisionsNames.push(athletes.division)
            }
        }

        console.log(divisionsNames)

        for(let y=0; y<divisionsNames.length; y++){
            for (let wod of data.WorkoutInfo){
                if(divisionsNames[y] == wod.division){
                    console.log(wod)
                    workoutNames[y] = wod
                }
            }
        }


        var $list = $("#wodDetails");
        $list.find(".wod").remove();

        for (let wod of workoutNames){
            var $item = $(
                '<div class="wod">' +
                    '<div class="col" style="">' +
                        '<div class="wodDiv">' + wod.division +' </div>' +    
                        '<div class="wodDescription"> ' + wod.description + ' </div>' +
                    '</div>' +
                '</div>'
            );
     
            $list.append($item);
        }

    }
    catch(e){
        console.log(e)
    }
}