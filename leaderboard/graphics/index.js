

// Initialisation du choix de la vue
let overlay = ''
overlay = document.location.pathname.split('/').slice(-1)[0].split('.')[0]


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
let height_top = 200;
let root = document.documentElement;
let Clrs = {}
let chrono;

configBefore = {};

let timerAutomatic1 = null;
let timerAutomatic2 = null;
let timerAutomatic3 = null;
let timerAutomatic4 = null;


let showDrapeau;
let varPresented;


const backgroundAthlete = nodecg.Replicant('assets:backgroundAthlete', 'leaderboard')
const backgroundOverlay = nodecg.Replicant('assets:backgroundOverlay', 'leaderboard')

const timerNTP = nodecg.Replicant('timerNTP', 'connector');

const Fonts = nodecg.Replicant('assets:font', 'configuration');

const configsReplicants = nodecg.Replicant('configs', 'configuration');
const setupConfigsReplicants = nodecg.Replicant('configs', 'leaderboard');

let Setup = null;
let setupFlat = {};

function flattenSetup(configData) {
    const flat = {};
    if (!configData) return flat;
    Object.values(configData).forEach(section => {
        if (!section.element) return;
        section.element.forEach(el => {
            flat[el.name] = el.value;
        });
    });
    return flat;
}

function handleSetupChange(newValue, oldValue) {
    if (!configBefore.hasOwnProperty('leaderboards')) {
        configBefore = newValue;
    }
    Object.keys(newValue).forEach((params, index) => {
        let authorize = newValue[params]
        if (overlay == 'leaderboard' || overlay == 'progression' || overlay == 'commentator' || overlay == 'sk' || overlay == 'head_judge' || overlay == 'lane') {
            if (params != 'flag' && params != 'lane') {
                authorize = true
            }
        }
        switch (authorize) {
            case true:
                $('.' + params).fadeIn(1000)
                break;
            case false:
                $('.' + params).fadeOut(1000)
                break;
        }
    })

    if (newValue.nameSelect != '' && s_athletes != undefined) {

        console.log(s_athletes.value)
        refreshDisplayName(s_athletes.value)
    }

    if (newValue.logoEventSelect != '') {
        $(".logo").css("background-image", "url(" + newValue.logoEventSelect + ")");
        if (!$(".logo").is(':visible')) {
            $(".logo").fadeIn()
        }
    }
    else {
        $(".logo").fadeOut()
    }

    if (newValue.mainSponsorSelect != '') {
        $(".mainSponsor").css("background-image", "url(" + newValue.mainSponsorSelect + ")");
        if (!$(".mainSponsor").is(':visible')) {
            $(".mainSponsor").fadeIn()
        }
    }
    else {
        $(".mainSponsor").fadeOut()
    }

    if (newValue.overlayBackgroundSelect != '') {
        $(".backgroundOverlay").css("background-image", "url(" + newValue.overlayBackgroundSelect + ")");
        if (!$(".backgroundOverlay").is(':visible')) {
            $(".backgroundOverlay").fadeIn()
        }
    }
    else {
        $(".backgroundOverlay").fadeOut()
    }

    if (newValue.backgroundTimerSelect != '') {
        console.log("backgroundTimerSelect ", newValue.backgroundTimerSelect)
        $(".backgroundTimer").css("background-image", "url(" + newValue.backgroundTimerSelect + ")");
        if (!$(".backgroundTimer").is(':visible')) {
            $(".backgroundTimer").fadeIn()
        }
    }
    else {
        $(".backgroundTimer").fadeOut()
    }

    if (!newValue.manualChrono) {
        if (statusHeat && statusHeat.value != undefined && statusHeat.value.PosixTimeStart !== undefined) {
            ntpStartTime = statusHeat.value.PosixTimeStart
            startTime = parseInt(ntpStartTime);
            launchTimer()
        }
    } else {
        if (timerLaunch != null) {
            clearInterval(timerLaunch)
            timerLaunch = null;
            resetTimer();
        }
    }

    if (overlay == 'overlay_side' || overlay == 'overlay_top') {
        if (newValue.lowerthird) {
            $(function () {
                if ($("#frame").find('#lower').length > 0) {
                    $("#frame").find('#lower').show()
                    $("#lower").contents().find('body').css('background', 'transparent')
                } else {
                    let $item = $('<iframe id="lower" src="../../lowerthird/graphics/lowerthirds.html" frameBorder="0"></iframe>')
                    $item.hide()
                    $("#frame").append($item)
                    $item.contents().find('body').css('background', 'transparent')
                    $item.show()
                }
            });
        } else {
            $("#frame").find('#lower').hide()
        }
        if (newValue.attributionLane) {
            $(function () {
                if ($("#frame").find('#attributionLane').length > 0) {
                    $("#frame").find('#attributionLane').slideDown()
                } else {
                    let $item = $('<iframe id="attributionLane" class="foreground" src="../../competition-corner/graphics/attribution-lane.html" frameBorder="0"></iframe>')
                    $item.hide()
                    $("#frame").append($item)
                    setTimeout(() => {
                        $item.slideDown()
                    }, 1000)
                }
            });
        } else {
            $("#frame").find('#attributionLane').slideUp()
        }
        if (newValue.heatResults) {
            $(function () {
                if ($("#frame").find('#heatResults').length > 0) {
                    $("#frame").find('#heatResults').slideDown()
                } else {
                    let $item = $('<iframe id="heatResults" class="foreground" src="../../competition-corner/graphics/heat-result.html" frameBorder="0"></iframe>')
                    $item.hide()
                    $("#frame").append($item)
                    setTimeout(() => {
                        $item.slideDown()
                    }, 1000)
                }
            });
        } else {
            $("#frame").find('#heatResults').slideUp()
        }
        if (newValue.overallStandingDivwod) {
            $(function () {
                if ($("#frame").find('#overallStandingDivwod').length > 0) {
                    $("#frame").find('#overallStandingDivwod').slideDown()
                } else {
                    let $item = $('<iframe id="overallStandingDivwod" class="foreground" src="../../competition-corner/graphics/overall-standing.html" frameBorder="0"></iframe>')
                    $item.hide()
                    $("#frame").append($item)
                    setTimeout(() => {
                        $item.slideDown()
                    }, 1000)
                }
            });
        } else {
            $("#frame").find('#overallStandingDivwod').slideUp()
        }
    }
}

let Colors = null;

NodeCG.waitForReplicants(configsReplicants, setupConfigsReplicants).then(() => {
    console.log('Configs Replicants are ready, finding the right config for overlay:', overlay);
    console.log('Available configs:', configsReplicants.value);

    const colorEntry = configsReplicants.value.find(([, , , , overlayName]) => { console.log(overlayName); return overlayName === overlay; });

    if (!colorEntry) {
        console.warn(`No color config found for overlay: ${overlay}`);
    } else {
        const [filename, replicantName] = colorEntry;
        Colors = nodecg.Replicant(replicantName, 'configuration');

        console.log(`Listening for color changes on replicant: ${replicantName}`);

        Colors.on('change', (newValue, oldValue) => {
            if (!newValue) return;
            Object.keys(newValue).forEach((color) => {
                let _color = newValue[color];
                if (overlay == 'commentator' && color == 'bg__color') _color = 'black';
                if (color == "text_presented_by") { $("#prt").text(_color); }
                if (color == "text_day") { $("#day").text(_color); }
                if (color == "text_floor") { $("#floor").text(_color); }
                Clrs[color] = _color;
            });
            applyConfig(newValue);
        });
    }

    console.log('Setup configs available:', setupConfigsReplicants.value);
    const setupEntry = setupConfigsReplicants.value.find(([, , , , overlayName]) => overlayName === overlay);

    if (!setupEntry) {
        console.warn(`No setup config found for overlay: ${overlay}`);
        return;
    }

    const [setupFilename, setupReplicantName] = setupEntry;
    Setup = nodecg.Replicant(setupReplicantName, 'leaderboard');

    console.log(`Listening for setup changes on replicant: ${setupReplicantName}`);

    // Attendre que Setup soit prêt et initialiser setupFlat AVANT que les autres handlers ne se déclenchent
    NodeCG.waitForReplicants(Setup).then(() => {
        setupFlat = flattenSetup(Setup.value);
        console.log('✅ setupFlat initialized and ready:', setupFlat);

        Setup.on('change', (newValue, oldValue) => {
            if (!newValue) return;
            setupFlat = flattenSetup(newValue);
            console.log('Setup flattened:', setupFlat);
            handleSetupChange(setupFlat, oldValue ? flattenSetup(oldValue) : {});
        });

        // Maintenant que setupFlat est prêt, créer les replicants qui en dépendent
        console.log('📦 Creating replicants that depend on setupFlat...');
        heatInfos = nodecg.Replicant('heatInfos', 'connector');
        eventInfos = nodecg.Replicant('eventInfos', 'connector');
        workoutInfo = nodecg.Replicant('workoutInfo', 'connector');
        s_athletes = nodecg.Replicant('s_athletes', 'connector');
        statusHeat = nodecg.Replicant('status', 'connector');
        d_athletes = nodecg.Replicant('d_athletes', 'connector');
        manualChrono = nodecg.Replicant('manualChrono');
        console.log('✅ All dependent replicants created');

        // Enregistrer les handlers maintenant que les replicants sont créés
        registerDependentHandlers();
    });
});

function registerDependentHandlers() {
    console.log('📝 Registering handlers for dependent replicants...');

    eventInfos.on('change', (newValue, oldValue) => {
        if (newValue != undefined && JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
            if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
                resetHeat(newValue);
                if (overlay == 'overlay_wpa') {
                    resetLeaderboard(s_athletes.value)
                }
                console.log('eventInfos change', newValue)
                if (newValue.heatId != heat.heatId) {
                    if ($('#box_svg').is(':visible')) {
                        $('#box_svg').slideUp(1000)
                    }
                    newHeat = true;
                    best = []
                    bestPerf = []
                } else {
                    newHeat = false
                }
            }
        }
    });

    heatInfos.on('change', (newValue, oldValue) => {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
            console.log('heatInfos change', newValue)
            heat = typeWorkout(newValue)
            sonLaunch = false;
            sonFinishLaunch = false;
            launchTimer()
            showTime(heat.timecap)
            if (overlay == 'sk' || overlay == 'head_judge') {
                $('#timeCapKairos').text(newValue[0].timeCap)
                heatSize = newValue[0].heatsSize
            }
            timerToReset = setTimeout(() => {
                resetLeaderboard(s_athletes.value)
            }, 2000)
        }
    });

    workoutInfo.on('change', (newValue, oldValue) => {
        if (newValue != oldValue) {
            workouts = treatWorkouts(newValue);
            workouts = newValue
            if (overlay.includes('overlay_top')) {
                $('#mvt').text('')
                $('.mvt').text('')
            }
        }
    });

    s_athletes.on('change', (newValue, oldValue) => {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
            clearInterval(timerToReset);
            timerToReset = null;
            if (timerAutomatic1 != null) {
                clearInterval(timerAutomatic1)
                timerAutomatic1 = null;
            }

            if (timerAutomatic2 != null) {
                clearInterval(timerAutomatic2)
                timerAutomatic2 = null;
            }

            if (timerAutomatic3 != null) {
                clearInterval(timerAutomatic3)
                timerAutomatic3 = null;
            }

            if (setupFlat && setupFlat.automaticSchedule) {
                let config = setupFlat;
                configBefore = config;

                config.box_chrono = false;
                config.box_heat = false;
                config.leaderboards = false;
                config.box_bandeau = false;
                setupFlat = config;

                setTimeout(() => {
                    let config = setupFlat;
                    config.attributionLane = true;
                    setupFlat = config;

                    setTimeout(() => {
                        let config = configBefore;
                        config.attributionLane = false;
                        setupFlat = config;
                        setTimeout(() => {
                            resetLeaderboard(newValue);
                        }, 2000)
                    }, 10000)
                }, 2000)
            } else {
                console.log('RESET resetLeaderboard')
                resetLeaderboard(newValue);
            }
        }
    });

    statusHeat.on('change', (newValue, oldValue) => {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
            var timer2 = setInterval(() => {
                console.log('statusHeat change', newValue)
                if (tc != undefined && tc.length > 0) {
                    clearInterval(timer2)
                    timer2 = null;
                    $(".chrono").find('#cap').text("CAP " + tc[1] + "'" + (tc[0] != "00" ? tc[0] : ''));
                    if (newValue.PosixTimeStart !== ntpStartTime) {
                        newHeat = false
                        ntpStartTime = newValue.PosixTimeStart
                        startTime = parseInt(ntpStartTime);
                        launchTimer();
                    }
                    statusWorkout = newValue.status
                    if (overlay == 'sk' || overlay == 'head_judge') {
                        switch (newValue.status) {
                            case '0':
                                $('.stateTimer').css('background-color', 'white')
                                $('.stateTimer').css('color', 'black')
                                $('#stateTimer').text('HEAT LOADED, VERIFY IF THIS THE GOOD HEAT')
                                break;
                            case 'R':
                                $('.stateTimer').css('background-color', 'orange')
                                $('.stateTimer').css('color', 'white')
                                $('#stateTimer').text('STANDBY')
                                break;
                            case 'W':
                                $('.stateTimer').css('background-color', 'green')
                                $('.stateTimer').css('color', 'white')
                                $('#stateTimer').text('HEAT LAUNCHED')
                                break;
                            case 'T':
                                $('.stateTimer').css('background-color', 'orange')
                                $('.stateTimer').css('color', 'black')
                                $('#stateTimer').text('HEAT FINISHED')
                                break;
                        }
                    }
                }
            }, 1000)
        }
    });

    manualChrono.on('change', (newValue, oldValue) => {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
            if (setupFlat && setupFlat.manualChrono) {
                $(".chrono").find('#cap').text('CAP ' + newValue.timecap + "'");
                switch (newValue.launchedTimer) {
                    case 'start':
                        newHeat = false
                        ntpStartTime = newValue.timer
                        startTime = parseInt(ntpStartTime);
                        if (timerLaunch != null) {
                            clearInterval(timerLaunch)
                            timerLaunch = null;
                        }
                        timerLaunch = setInterval(updateTime, 100);
                        break;
                    case 'stop':
                        if (timerLaunch != null) {
                            clearInterval(timerLaunch)
                            timerLaunch = null;
                        }
                        break;
                    case 'reset':
                        endTime = timeToDateTime(ntpStartTime).setMinutes(startTime.getMinutes() + parseInt(newValue.timecap));
                        resetTimer()
                        break;
                }
            }
        }
    });

    d_athletes.on('change', (newValue, oldValue) => {
        if (overlay != 'head_judge' && overlay != 'timer') {
            if (newValue != undefined) {
                updateDynamics(newValue, statusWorkout);
            }
        }
    });

    console.log('✅ All handlers registered');
}

const adjustT = nodecg.Replicant('adjustT')

const logoEvent = nodecg.Replicant('assets:logoEvent', 'connector')
const mainSponsors = nodecg.Replicant('assets:mainSponsor', 'connector')

const timeNTP = nodecg.Replicant('timeNTP', 'connector')
const nowNtp = nodecg.Replicant('nowNtp', 'connector')

const listCis = nodecg.Replicant('CIS', 'connector')

const chronoState = nodecg.Replicant('ChronoState')

const bottomSponsors = nodecg.Replicant('assets:bottomSponsors', 'connector')

const TopScore = nodecg.Replicant('TopScore', 'connector')
const listWarmpUp = nodecg.Replicant('listWarmpUp', 'connector');

// Déclaration des replicants qui seront créés après setupFlat
let heatInfos;
let eventInfos;
let workoutInfo;
let s_athletes;
let statusHeat;
let d_athletes;
let manualChrono;

// Value from MQTT Kairos
// const divisionMQTT = nodecg.Replicant('divisionMQTT')
const workoutsMQTT = nodecg.Replicant('workoutsMQTT', 'connector')
const heatMQTT = nodecg.Replicant('heatMQTT', 'connector')


// Hyperfit Data
const hyperfitPoints = nodecg.Replicant('hyperfitPoints')

let laneEcho = 0


// if is android
let isAndroid = false;

$('document').ready(() => {
    if (overlay == 'sk' || overlay == 'head_judge') {
        setInterval(() => {
            const date = new Date();
            const hour = date.getHours();
            const min = date.getMinutes();
            const sec = date.getSeconds();
            $('.hours').text(hour + ':' + min + ':' + sec);
        }, 1000)
        createKairosView();
    } else if (overlay.includes('echo') || overlay.includes('lane')) {
        laneEcho = parseInt(window.location.search.replace('?lane=', ''))
    }
    var userAgent = navigator.userAgent.toLowerCase();
    var Android = userAgent.indexOf("android") > -1;

    // widthWindow = window.outerWidth;
    // heightWindowd = window.outerHeight;


    let widthWindow = window.innerWidth;
    let heightWindowd = window.innerHeight;

    if (Android) {
        isAndroid = true;

    }
    document.querySelector(':root').style.setProperty('--zoom', (widthWindow / 1920) * 100 + '%');

})

function generateCSS(configData) {
    let css = '';
    Object.entries(configData).forEach(([className, section]) => {
        if (!section.element) return;
        css += `.${className} {\n`;
        section.element.forEach(el => {
            if (el.css) {
                css += `    ${el.css}: var(--${el.name});\n`;
            }
        });
        css += `}\n\n`;
    });
    return css;
}

function applyConfig(configData) {
    // Injecte les variables CSS dans :root
    Object.entries(configData).forEach(([className, section]) => {
        if (!section.element) return;
        section.element.forEach(el => {
            root.style.setProperty(`--${el.name}`, el.value);
        });
    });

    // Injecte les règles CSS dans le <head>
    let styleTag = document.getElementById('generated-config-css');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'generated-config-css';
        document.head.appendChild(styleTag);
    }
    styleTag.textContent = generateCSS(configData);
}

let newHeat = false;

// Variables globales pour les handlers
let tc
let heat = {}
let heatSize = 0;
let timerToReset = null;
let workouts = {}
let statusWorkout = '0'
let ntpStartTime;
let startTime = 0;
let endTime;
let timerLaunch = null;

function launchTimer() {
    var launchInter = setInterval(() => {
        if (heat != {}) {
            if (startTime != 0 && heat.timecap != undefined && heat.timecap != '00:00') {
                var timecapIn = ((parseInt(tc.length ? parseInt(tc[1]) : 0) * 60) + parseInt(tc.length ? parseInt(tc[2]) : 0)) * 1000;
                endTime = parseInt(startTime) + parseInt(timecapIn)
                console.log('endTime', endTime, 'startTime', startTime, 'timecapIn', timecapIn)
                if (timerLaunch != null) {
                    clearInterval(timerLaunch)
                    timerLaunch = null;
                }
                timerLaunch = setInterval(updateTime, 100);

                clearInterval(launchInter);
                launchInter = null;
            } else {
                if (timerLaunch != null) {
                    clearInterval(timerLaunch)
                    timerLaunch = null;
                    $(".chrono").find('#time').text('00:00');
                }
            }
        }
    }, 1000);
}

// Handlers pour statusHeat, manualChrono et d_athletes sont maintenant dans registerDependentHandlers()

let listOverall = []

listWarmpUp.on('change', (newValue, oldValue) => {
    if (newValue != undefined && JSON.stringify(newValue) != JSON.stringify(oldValue) && overlay == 'commentator') {
        let participantsHeat = newValue.warmUp[0].wod.participants
        let stations = newValue.warmUp[0].heat.stations
        for (let station of stations) {
            let data = participantsHeat.find(element => element.id === station.participantId)
            listOverall[station.station] = {}
            listOverall[station.station].oR = data.rank
            listOverall[station.station].oP = data.points

            $('#oP_' + station.station).text(data.points)
            $('#oR_' + station.station).text(data.rank)
        }
        // console.log('warmup : ', newValue)
    }
})


TopScore.on('change', (newValue, oldValue) => {
    if (newValue != undefined && newValue.length > 0) {
        let index = 0;
        if (newValue[0] != null) {
            if (!newValue[0].hasOwnProperty('error')) {
                for (let teams of newValue[0]) {
                    console.log("best score : ", teams.scores[0].score)
                    $('.repTar').text(teams.scores[0].score)
                    index++
                }
            }
        }
    }
})


// Catégorie Assets

logoEvent.on('change', (newValue, oldValue) => {
    try {
        if (newValue.length > 0) {
            $("#logo").css("background-image", "url(" + newValue[0].url + ")");
            if (setupFlat && setupFlat.logo != true) {
                $("#box_logo").hide();
            }
        }
    }
    catch (e) {
        console.log(e)
    }
});

backgroundOverlay.on('change', (newValue) => {
    // if (newValue.length > 0) {
    //     console.log(newValue)
    //     $(".backgroundOverlay").css("background-image", "url(" + newValue[0].url + ")");
    //     $(".backgroundOverlay").show()
    // }
    // else {
    //     $(".backgroundOverlay").hide()
    // }
})

// mainSponsors.on('change', (newValue) => {
//     if (newValue.length > 0) {
//         console.log(newValue[0].url)

//         $(".mainSponsor").css("background-image", "url(" + newValue[0].url + ")");
//         $(".mainSponsor").toggle("slide")
//     }
//     else {
//         $(".mainSponsor").toggle("slide")
//     }
// })


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

let eventName

// Configuration et setup - now handled by handleSetupChange in the new system

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

// Colors.on('change', (newValue, oldValue) => {

//     let tabColor = newValue

//     Object.keys(newValue).forEach((color, index) => {

//         let _color = tabColor[color]

//         if (color == 'font-select') {

//         }

//         if (overlay == 'commentator' && color == 'bg__color') {
//             _color = 'black'
//         }

//         if (color == "text_floor") {
//             $("#floor").text(_color);
//             varPresented = _color;
//         }

//         if (color == "text_day") {
//             $("#day").text(_color);
//             varPresented = _color;
//         }

//         if (color == "text_presented_by") {
//             $("#prt").text(_color);
//             varPresented = _color;
//         }


//         root.style.setProperty("--" + color, _color);
//         Clrs[color] = _color
//     })

// })

function createKairosView() {
    workoutsMQTT.on('change', (newValue, oldValue) => {
        console.log('workoutsMQTT ', newValue)
        if (JSON.stringify(newValue) != JSON.stringify(oldValue)) {
            _workoutsFromMQTT = newValue
            createOptionWorkout(newValue)
        }
    })

    $("#workoutsMqtt").on('change', function () {
        console.log(this.value)
        let workout = _workoutsFromMQTT.find(x => x.id === parseInt(this.value))
        createOptionHeat(workout)
    })
}


function createOptionWorkout(data) {
    $("#workoutsMqtt option").remove()

    $("#workoutsMqtt").append('<option value=0>-- Please Choose Workout --</option>')

    for (let workout of data) {
        $("#workoutsMqtt").append('<option value=' + workout.id + '>' + workout.name + ' (' + workout.format.substring(0, 1).toUpperCase() + ')</option>');
    }
}

function createOptionHeat(workout) {
    console.log(workout)
    $("#heatsMqtt option").remove()

    $("#heatsMqtt").append('<option value=0>-- Please Choose Heat --</option>')

    for (let i = 0; i < workout.heatId.length; i++) {
        $("#heatsMqtt").append('<option value=' + workout.heatId[i] + '>' + workout.heatName[i] + '</option>');
    }
}

function changeHeat() {
    let data = {
        'workoutId': 0,
        'heatId': 0
    }

    data.workoutId = $('#workoutsMqtt').val()
    data.heatId = $('#heatsMqtt').val()


    resetChrono()
    nodecg.sendMessageToBundle('change_heat', 'connector', data)

    $('#changeHeat').css('background-color', 'green')
    $('#changeHeat').css('color', 'white')
    setTimeout(() => {
        $('#changeHeat').css('background-color', 'white')
        $('#changeHeat').css('color', 'black')
    }, 3000)

}


function startChrono() {
    let data = {
        'minutes': 0,
        'secondes': 0,
        'type': 'time',
        'count': 5
    }

    data.type = heatInfos.value[0].type
    data.count = $('#countTimer').val()

    let timeCap = heatInfos.value[0].timeCap

    data.minutes = parseInt(timeCap.split(':')[1])
    data.secondes = parseInt(timeCap.split(':')[2])
    sonLaunch = false;
    sonFinishLaunch = false;

    console.log(data)

    nodecg.sendMessageToBundle('start_chrono', 'connector', data)


    $('#startChrono').css('background-color', 'green')
    $('#startChrono').css('color', 'white')
    setTimeout(() => {
        $('#startChrono').css('background-color', 'white')
        $('#startChrono').css('color', 'black')
    }, 3000)

}

function resetChrono() {
    nodecg.sendMessage('reset_timer')
    nodecg.sendMessageToBundle('reset_chrono_heat', 'connector')
}

function reloadWorkout() {
    nodecg.sendMessageToBundle('reloadWorkout', 'connector')
}



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

nodecg.listenFor('reset_timer', () => {
    if (timerLaunch != null) {
        clearInterval(timerLaunch)
        timerLaunch = null;
    }
    resetTimer()
})

// Fonction pour ajouter des transitions fluides lors des changements de classement
function addRankChangeEffects() {
    // Stocker les positions précédentes
    let previousPositions = {};

    // Fonction pour vérifier et appliquer les changements de classement
    function checkForRankChanges() {
        const athletes = document.querySelectorAll('.leaderboard .athlete');

        athletes.forEach((athlete, index) => {
            const athleteName = athlete.querySelector('.name').textContent;
            const currentRank = index + 1;

            // Si l'athlète était dans un classement précédent
            if (previousPositions[athleteName] !== undefined) {
                const previousRank = previousPositions[athleteName];

                // Si le classement a changé
                if (previousRank !== currentRank) {
                    // Ajouter une classe appropriée
                    if (previousRank > currentRank) {
                        // L'athlète a gagné des places
                        athlete.classList.add('rank-improved');
                        setTimeout(() => athlete.classList.remove('rank-improved'), 2000);
                    } else {
                        // L'athlète a perdu des places
                        athlete.classList.add('rank-decreased');
                        setTimeout(() => athlete.classList.remove('rank-decreased'), 2000);
                    }
                }
            }

            // Mettre à jour la position pour la prochaine vérification
            previousPositions[athleteName] = currentRank;
        });
    }

    // Vérifier les changements toutes les 3 secondes
    setInterval(checkForRankChanges, 3000);
}

// Fonction pour détecter les nouveaux athlètes ajoutés au classement
function detectNewAthletes() {
    const knownAthletes = new Set();

    // Vérifier si de nouveaux athlètes ont été ajoutés
    function checkForNewAthletes() {
        const athletes = document.querySelectorAll('.leaderboard .athlete');

        athletes.forEach((athlete) => {
            const athleteName = athlete.querySelector('.name').textContent;

            if (!knownAthletes.has(athleteName)) {
                // Nouvel athlète détecté
                knownAthletes.add(athleteName);
                athlete.classList.add('new-athlete');
                setTimeout(() => athlete.classList.remove('new-athlete'), 3000);
            }
        });
    }

    // Vérifier les nouveaux athlètes toutes les 3 secondes
    setInterval(checkForNewAthletes, 3000);
}

// // Mise à jour de l'initialisation
// document.addEventListener('DOMContentLoaded', () => {
//     highlightFirstPlace();
//     addAnimationEffects();
//     addRankChangeEffects();
//     detectNewAthletes();

//     // Exécuter highlightFirstPlace périodiquement
//     setInterval(highlightFirstPlace, 2000);
// });

chronoState.on('change', (newValue) => {
    console.log('change chrono state to ', newValue)
    if (newValue != null) {
        newValue == true ? $('#box_chrono').show(1000) : $('#box_chrono').hide(1000)
        if (newValue == true) {
            $('#time').show(1000)
            $('#time').text('00:00')
        } else {
            $('#time').show(1000)
            $('#time').text('')
        }
        newValue == true ? $('#cap').show(1000) : $('#cap').hide(1000)
    }

})


hyperfitPoints.on('change', (newValue, oldValue) => {
    if (JSON.stringify(newValue) != JSON.stringify(oldValue)) {
        console.log('hyperfitPoints change', newValue)
        updateHyperfitPoints(newValue)
    }
})

function updateHyperfitPoints(data) {
    console.log('updateHyperfitPoints', data)
    $('.hyperfitPoints').find('#leftPoints').text(data.leftPoints)
    $('.hyperfitPoints').find('#rightPoints').text(data.rightPoints)
}