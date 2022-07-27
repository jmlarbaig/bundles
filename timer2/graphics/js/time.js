var startTimeNTP;
var timerLaunch;
var totalRep;

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
    // document.getElementById("division").innerHTML = dataTime.athletes[0].division + " - " + heat_Name;

    startTimeNTP = dataTime.NtpTimeStart;

    let now = new Date();
    // console.log("now =", now)
    let startTime = timeToDateTime(startTimeNTP);
    let endTime = timeToDateTime(startTimeNTP).setMinutes(startTime.getMinutes() + timecapNTP);

    let timeDiffStart = now.getTime() - startTime;
    let timeDiffTimeCap = now - endTime;

    if (timeDiffTimeCap < 0 && dataTime.status != 0){
        chrono = msToTime(timeDiffStart);

    } else {
        if (timecapNTP != ''){
            chrono = timecapNTP + ":00";
        }
        else{
            chrono = "00:00"
        }
    }

    document.getElementById("chrono").innerHTML = chrono;
    document.getElementById("chrono2").innerHTML = chrono;

}

function resetHeat(data){

    try{
        var $list = $("#headerSection #first");
        $list.find(".heat").remove();
    
        var $item = $(
            '<div class="heat row d-xl-flex align-items-xl-center">' +

            '</div>' 
        );

        // heatDetails.$item = $item;
        $list.append($item);

    }
    catch(e){
        console.log(e)
    }
}

function showTime(){
    try{
        var $list = $(".heat");
        $list.find(".time").remove();

        var $item = $(
            '<div class="time col">' +
                '<img class="logoSK img-fluid" src="./img/PRESTA/SK-logo.png"/>' +
                '<h3 id="chrono" class="text-center m-auto chrono"></h3>' +
                '<h3 id="timecap" class="text-center m-auto"> TIMECAP : '+ timecapNTP +"'</h3>" +
            '</div>' + 
            '<div class="time col">' +
                '<img class="logoFV img-fluid" src="./img/PRESTA/FV-logo.png"/>' +
                '<h3 id="chrono2" class="text-center m-auto chrono"></h3>' +
                '<h3 id="timecap" class="text-center m-auto"> TIMECAP : '+ timecapNTP +"'</h3>" +
            '</div>' 
        );

        $list.append($item);
        if (timerLaunch == undefined){
            clearInterval(timerLaunch)
            timerLaunch = setInterval(updateTime, 500);
        }
        else {
            timerLaunch = setInterval(updateTime, 500);
        }

    }
    catch(e){
        console.log(e)
    }
}