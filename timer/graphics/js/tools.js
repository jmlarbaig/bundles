
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


function typeWorkout(data){

    //! on traite le wod en cours 
    let typeWod = data[0].type;
    let formatWod = data[0].format
    let timecap = data[0].timeCap
    let heatId =  data[0].heatId;

    tc = timecap.split(':');

    if (tc[0] != "00"){
        timecap = tc[0] + ":" + tc[1] + ":" + tc[2];
    }
    else if(tc[1] != "00" ){
        timecap = tc[1] + ":" + tc[2];
    }
    else{
        timecap = "00:"+ tc[2];
    }
    if(ntpStartTime != undefined){
        // endTime = timeToDateTime(ntpStartTime).setMinutes(startTime.getMinutes() + parseInt(tc[1] || 0));
        var timecapIn = ((parseInt( tc.length ? parseInt(tc[1]) : 0)* 60) + parseInt( tc.length ? parseInt(tc[2]) : 0)) * 1000;
        endTime = parseInt(ntpStartTime) + parseInt(timecapIn)
    }

    return ({typeWod, formatWod, timecap, heatId})
}
