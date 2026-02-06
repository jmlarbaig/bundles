const son_standby = new Audio("./assets/sounds/beep_standby.mp3");
let sonLaunch = false;
let audioReady = false;
let sonFinishLaunch = false;
let onChronoBefore = false;


function updateTime() {

    console.log('updateTime called');

    let Ft_Ap = setupLeaderboard.value.fortimeAmrap;

    console.log('ntp = ', timerNTP.value);

    let timer = parseInt(timerNTP.value) + (adjustT.value || 0)

    if (newHeat) {
        console.log('newHeat is true, setting timer to startTime');
        timer = endTime
        adjustT.value = 0
        sonLaunch = false;
        sonFinishLaunch = false;
        console.log("reset sonLaunch")
    }

    console.log('timer', timer, 'adjustT', adjustT.value, 'endTime', endTime, 'startTime', startTime);

    let timeDiffStart = timer - startTime;
    let timeDiffTimeCap = timer - endTime;
    let timeDiffEnd = endTime - timer;

    console.log('timeDiffStart', timeDiffStart, 'timeDiffTimeCap', timeDiffTimeCap, 'timeDiffEnd', timeDiffEnd);


    if (overlay == 'overlay_side' || overlay == 'overlay_side_v1' || overlay == 'overlay_wpa') {
        $(".chrono").css("color", "rgb(255,255,255")
    } else if (overlay == "timer") {
        $(".box_chrono").css("color", Clrs.colorFontTimer)
        $(".chrono").css("color", Clrs.colorFontTimer)
    } else {
        $(".box_chrono").css("color", Clrs.tx_chrono_color)
        $(".chrono").css("color", Clrs.tx_chrono_color)
    }

    if (timeDiffTimeCap < 0 && timeDiffStart >= 0) {
        onChronoBefore = true;
        if (overlay != 'lane' && overlay != 'timer') {
            $('#cap').fadeIn(1000)
        }
        if (!sonLaunch && audioReady && timeDiffStart <= 1000) {
            console.log('sound launch')
            son_standby.play();
            sonLaunch = true;
            sonFinishLaunch = false;
        }
        if (heat.typeWod == "amrap" || Ft_Ap) {
            chrono = msToTime(timeDiffEnd)
        }
        else {
            chrono = msToTime(timeDiffStart);
        }
    } else if (timeDiffStart < 0 && timeDiffStart > -(60 * 60 * 1000)) {
        onChronoBefore = true;
        if (overlay != 'lane' && overlay != 'timer') {
            $('#cap').fadeOut(1000)
        }
        if (overlay == 'overlay_side' || overlay == 'overlay_side_v1' || overlay == 'overlay_wpa') {
            $(".chrono").css("color", "rgb(255,50,80")
        } else if (overlay == 'timer') {
            $(".box_chrono").css("color", Clrs.colorFontCountdownTimer)
            $(".chrono").css("color", Clrs.colorFontCountdownTimer)
        } else {
            $(".chrono").css("color", "rgb(255,255,255")
        }
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

        chrono = '' + minS + ':' + secS;
    } else {
        if (overlay != 'lane' && overlay != 'timer') {
            $('#cap').fadeOut(1000)
        }
        if (audioReady && !sonFinishLaunch && onChronoBefore) {
            console.log('sound launch')
            son_standby.play();
            sonLaunch = false;
            sonFinishLaunch = true;
        }
        if (heat.timecap != '') {
            chrono = heat.timecap
        }
        else {
            chrono = "00:00"
        }

    }
    // if (timeDiffTimeCap > -30000 && timeDiffTimeCap < 0 && timeDiffStart > 0) {
    //     if (overlay == 'overlay_side' || overlay == 'overlay_side_v1' || overlay == 'overlay_wpa') {
    //         $(".chrono").css("color", "rgb(255,50,80")
    //     } else {
    //         // $(".box_chrono").css("background-color", "rgba(255,50,80,1)")
    //         $(".box_chrono").css("color", "rgb(255,255,255")
    //         // $(".chrono").css("background-color", "rgba(255,50,80,1)")
    //         $(".chrono").css("color", "rgb(255,255,255")
    //     }
    //     if (heat.typeWod == "amrap" || Ft_Ap) {
    //         chrono = msToTime(timeDiffEnd)
    //     }
    //     else {
    //         chrono = msToTime(timeDiffStart);
    //     }
    // }
    if (!chrono.includes('undefined')) {
        document.getElementById("time").innerHTML = chrono;
    }

}

function resetTimer() {
    $(".box_chrono").css("background-color", Clrs.chrono_color)
    $(".box_chrono").css("color", Clrs.tx_chrono_color)
    $(".chrono").css("background-color", Clrs.chrono_color)
    $(".chrono").css("color", Clrs.tx_chrono_color)
    document.getElementById("time").innerHTML = "00:00";
    sonLaunch = false;
    console.log("reset sonLaunch")
}


function showTime(Cap) {
    try {
        let $list = $(".chrono");
        $list.find("#time").remove();
        $list.find("#cap").remove();

        let $item = $(
            '<div id="time"> </div>' +
            '<div id="cap">Timecap ' + Cap + '</div>'
        );

        !setupLeaderboard.value.chrono && $("#box_chrono").hide();
        $list.append($item);
        $(".chrono").find('#cap').hide();
        if (overlay == 'timer') {
            $(".chrono").find('#cap').remove();
        }

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