
// initialization
let athlete;
let athletes;
let timerId;
let timecapNTP = [];
let startTimeNTP;
let heatId;
let heat_Name;
let heatName;
let resetVar = false;
let athletes_final = new Array();
let timerInterval = null;
let dataTime;
let athletesDivison;
let Mvt_name = []
let height_top = 100;
let root = document.documentElement;
let Clrs = {}
let chrono = 0;


const setupLeaderboard = nodecg.Replicant('setupLeaderboard');

const Fonts = nodecg.Replicant('assets:font', 'configuration');
const Colors = nodecg.Replicant('Colors', 'configuration');

const logoEvent = nodecg.Replicant('assets:logoEvent', 'connector')
const mainSponsors = nodecg.Replicant('assets:mainSponsor', 'connector')
const bottomSponsors = nodecg.Replicant('assets:bottomSponsors', 'connector')

const adjustT = nodecg.Replicant('adjustT')
const manualChrono = nodecg.Replicant('manualChrono')

const padelPlayers = nodecg.Replicant('padelPlayers')


// Initialisation du choix de la vue

let overlay = ''

let widthWindow = 1920;
let heightWindowd = 1080;


$('document').ready(() => {

    widthWindow = window.innerWidth;
    heightWindowd = window.innerHeight;

    document.querySelector(':root').style.setProperty('--zoom', (widthWindow / 1920) * 100 + '%');

})


padelPlayers.on('change', (newValue, oldValue) => {
    try {
        if (newValue != oldValue) {
            console.log(newValue)
            modelScoring = newValue;
            Object.keys(newValue).forEach(key => {
                $('#' + key).html(newValue[key]);
            });
        }
    }
    catch (e) {
        console.log(e)
    }
})

// Catégorie Assets

logoEvent.on('change', (newValue, oldValue) => {
    try {
        if (newValue.length > 0) {
            console.log(newValue)
            $("#logo").css("background-image", "url(" + newValue[0].url + ")");
            setupLeaderboard.value.logo != true ? $("#box_logo").hide() : ""
        }
    }
    catch (e) {
        console.log(e)
    }
});


bottomSponsors.on('change', (newValue) => {

    var $list = $("#sponsorLogo");
    $list.find(".sponsorImg").remove();

    if (newValue.length > 0) {
        $("#sponsorLogo").css('background-color', "rgba(0,0,0,0)")
        newValue.forEach(element => {
            var $item = $('<img class="sponsorImg" id="sponsorImg" src="' + element.url + '"></img>')
            $list.append($item);
        });
    }
    else {
        $("#sponsorLogo").css('background-color', "rgba(0,0,0,0)")
    }
})
// Congifuration et setup
setupLeaderboard.on('change', (newValue, oldValue) => {

    Object.keys(newValue).forEach((params, index) => {

        switch (newValue[params]) {
            case true:
                $('.' + params).fadeIn(1000)
                break;
            case false:
                $('.' + params).fadeOut(1000)
                break;
        }
    })

    if (newValue.mainSponsorSelect != '') {

        $(".mainSponsor").css("background-image", "url(" + newValue.mainSponsorSelect + ")");

        if (!$(".mainSponsor").is(':visible')) {
            $(".mainSponsor").fadeIn()
        }
    }
    else {
        $(".mainSponsor").fadeOut()
    }

    widthWindow = window.innerWidth;
    heightWindowd = window.innerHeight;
})

// TIMER 

let timerLaunch;

manualChrono.on('change', (newValue, oldValue) => {
    switch (newValue.stateTimer) {
        case 'start':
            timerLaunch = setInterval(updateTime, 1000, newValue.timer);
            break;
        case 'stop':
            clearInterval(timerLaunch)
            timerLaunch = null;
            break;
        case 'reset':
            clearInterval(timerLaunch)
            timerLaunch = null;
            resetTimer();
            break;
    }

})


// ASSETS ET CONFIGURATION

function loadFont(name, url) {
    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode('@font-face{font-family: ' + name + '; src: url(' + url + ');}'));
    document.body.appendChild(newStyle)
}

Fonts.on('change', (newValue, oldValue) => {
    if (newValue != oldValue) {
        let tabFont = newValue
        Object.keys(tabFont).forEach((font) => {
            loadFont(tabFont[font].name, tabFont[font].url)
        })
    }
})

Colors.on('change', (newValue, oldValue) => {

    let tabColor = newValue

    Object.keys(newValue).forEach((color, index) => {

        let _color = tabColor[color]

        if (color == 'font-select') {

        }

        if (overlay == 'commentator' && color == 'bg__color') {
            _color = 'black'
        }

        if (color == "text_presented_by") {
            $("#prt").text(_color);
            varPresented = _color;
        }
        console.log(Clrs)

        root.style.setProperty("--" + color, _color);
        Clrs[color] = _color
    })

})



const videoInfos = nodecg.Replicant('videoInfos', 'video')
const videoShow = nodecg.Replicant('videoShow', 'video')

let videocontainer = document.getElementById('video');
let videosource = document.getElementById('sourceVid');

videoShow.on('change', (newValue) => {
    console.group();
    console.log("Video")
    console.log(videoInfos.value);
    console.log(videoShow.value);
    console.groupEnd();
    switch (newValue) {
        case true:

            videosource.setAttribute('src', videoInfos.value);
            videocontainer.load();
            videocontainer.play();

            $('#video').fadeIn(1000)
            break;
        case false:
            $('#video').fadeOut(1000)
            break;
    }
})
