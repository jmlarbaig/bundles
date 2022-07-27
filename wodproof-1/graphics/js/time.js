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

function resetHeat(data){
    try{

        var $list = $("#chronoLocation");
        $list.find(".heat").remove();

    
        var $item = $(
            '<div class="heat row d-xl-flex align-items-xl-center" style="border-radius:5px; padding: 5px 2px 5px 2px;">' +
                '<div class="col" style="color: white;padding-bottom: 5px;padding-top: 5px;">' +
                    '<h3 class="m-auto text-nowrap text-truncate" style="padding-bottom:5px;"> ' + data.eventName + ' </h3>' +
                    '<h3 id="chrono" class="m-auto text-nowrap text-truncate"></h3>' +    
                '</div>' +
            '</div>'
        )

        $list.append($item);

    }
    catch(e){
        console.log(e)
    }
}

function showTime(){
    try{

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


function updateTime(){

    startTimeNTP = dataTime.NtpTimeStart;

    let now = new Date();
    let startTime = timeToDateTime(startTimeNTP);
    let endTime = timeToDateTime(startTimeNTP).setMinutes(startTime.getMinutes() + timecapNTP);

    // var timespan = countdown(startTime, endTime);


    let timeDiffStart = now.getTime() - startTime;
    let timeDiffTimeCap = now - endTime;

    let timeDiffEnd = endTime - now.getTime();


    $("#chrono").css("background-color", main_color)
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

}