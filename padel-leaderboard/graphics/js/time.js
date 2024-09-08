


function updateTime(value) {
    chrono = (chrono + value + 1000) - value;
    $("#chrono").text(msToTime(chrono))
}

function resetTimer() {
    chrono = 0;
    $("#chrono").text("00:00")
}

