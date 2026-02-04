const son_standby = new Audio("./assets/sounds/beep_standby.mp3");
let sonLaunch = false;
let audioReady = false;

function updateTime() {


    let Ft_Ap = setupLeaderboard.value.fortimeAmrap;

    let timer = Date.now() + (timeNTP.value || 0)

    if (newHeat) {
        timer = endTime
        sonLaunch = false;
        console.log("reset sonLaunch")
    }

    let timeDiffStart = timer - startTime;
    let timeDiffTimeCap = timer - endTime;
    let timeDiffEnd = endTime - timer;


    $(".box_chrono").css("color", 'white')

    if (timeDiffTimeCap < 0 && (timeDiffStart) > 0) {
        $('#cap').fadeIn(1000)
        if (!sonLaunch && audioReady && timeDiffStart <= 1000) {
            console.log('sound launch')
            son_standby.play();
            sonLaunch = true;
        }
        if (heat.typeWod == "amrap" || Ft_Ap) {
            chrono = msToTime(timeDiffEnd)
        }
        else {
            chrono = msToTime(timeDiffStart);
        }
    } else if (timeDiffStart < 0 && timeDiffStart > - (60 * 60 * 1000)) {
        $('#cap').fadeOut(1000)
        $(".box_chrono").css("color", "rgba(255,50,80,1)")
        let ch = msToTime(timeDiffStart - 1000).split(':');
        let min = parseInt(ch[0].replace('0-', ''));
        let sec = parseInt(ch[1].replace('0-', ''));
        let minS = min
        let secS = sec

        if (min < 10) {
            minS = '0' + min;
        }

        if (sec < 10) {
            secS = '0' + sec;
        }

        chrono = '-' + minS + ':' + secS;
    } else {
        $('#cap').fadeOut(1000)
        if (heat.timecap != '') {
            chrono = heat.timecap
        }
        else {
            chrono = "00:00"
        }
    }
    if (timeDiffTimeCap > -30000 && timeDiffTimeCap < 0 && timeDiffStart > 0) {
        $(".box_chrono").css("color", "rgba(255,50,80,1)")
        if (heat.typeWod == "amrap" || Ft_Ap) {
            chrono = msToTime(timeDiffEnd)
        }
        else {
            chrono = msToTime(timeDiffStart);
        }
    }

    console.log(chrono)
    $("#time").text(chrono);

}


function showTime(Cap) {
    try {
        let $list = $("#chrono");
        $list.find("#time").remove();
        $list.find("#cap").remove();

        let $item = $(
            '<div id="time"> </div>' +
            '<div id="cap">CAP ' + Cap + '</div>'
        );

        $list.append($item);
        $("#cap").hide();

    }
    catch (e) {
        console.log(e)
    }
}

function autoriserAudio() {
    if (audioReady) return;

    son_standby.play().then(() => {
        son_standby.pause();
        son_standby.currentTime = 0;
        audioReady = true;
        console.log("Audio autorisé ✅");
    });
}

document.addEventListener("click", autoriserAudio, { once: true });
document.addEventListener("keydown", autoriserAudio, { once: true });
document.addEventListener("touchstart", autoriserAudio, { once: true });