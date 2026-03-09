
const UrlChange = nodecg.Replicant('UrlChange');
const UrlChange_internal = nodecg.Replicant('UrlChange_internal')


const backgroundOverlay = nodecg.Replicant('assets:backgroundOverlay', 'leaderboard')

const backgroundTimer = nodecg.Replicant('assets:backgroundTimer', 'leaderboard')

const mainSponsors = nodecg.Replicant('assets:mainSponsor', 'connector')

const logoEvent = nodecg.Replicant('assets:logoEvent', 'connector');

const setupLeaderboard = nodecg.Replicant('setupLeaderboard')

const ipAddress = nodecg.Replicant('ipAddress', 'connector')

const athletesHeat = nodecg.Replicant('athletesHeat')

const s_athletes = nodecg.Replicant('s_athletes', 'connector');






const hyperfitPoints = nodecg.Replicant('hyperfitPoints')

var participantEvent = {}
var participantsCurrentHeats = {}
var currentHeat = {}

const hyperfitPts = {
    leftPoints: 0,
    rightPoints: 0
};

const eventInfos = nodecg.Replicant('eventInfos', 'connector');

eventInfos.on('change', (value) => {
    if (value != undefined) {
        let $event = $("#box_event");
        $event.find('#event').remove();

        let $heat = $("#box_header_heat");
        $heat.find('#heat').remove();

        let $workout = $("#box_workout");
        $workout.find('#workout').remove();

        let $itemEvent = $(
            '<div id="event" class="infos">' +
            '<div class="name">' + value.eventName.toUpperCase() + '</div>' +
            '<div class="id">(Id : ' + value.eventId + ')</div>' +
            '<div class="location">' + value.location.toUpperCase() + '</div>' +
            '</div>'
        )

        let $itemHeat = $(
            '<div id="heat" class="infos">' +
            '<div class="name">' + value.heatName.toUpperCase() + '</div>' +
            '<div class="id">(Id : ' + value.heatId + ')</div>' +
            '<div class="time">' + value.heatTime + '</div>' +
            '</div>'
        )

        let $itemWorkout = $(
            '<div id="workout" class="infos">' +
            '<div class="name">' + value.workoutName.toUpperCase() + '</div>' +
            '<div class="id">(Id : ' + value.workoutId + ')</div>' +
            '<div class="type">' + value.wodType.toUpperCase() + '</div>' +
            '</div>'
        )

        $event.append($itemEvent)
        $heat.append($itemHeat)
        $workout.append($itemWorkout)
    }
})


function actualiser() {

    var elements = document.querySelectorAll('input[type=checkbox]');

    var data = {};
    elements.forEach(el => {
        data[el.id] = el.checked
    });

    elements = document.querySelectorAll('select');

    elements.forEach(el => {
        data[el.id] = el.value
    });

    console.log(data)

    nodecg.sendMessage('setupFile', data);
}

nodecg.readReplicant('setupLeaderboard', (value) => {
    try {
        Object.keys(value).forEach((e, i) => {
            if (document.getElementById(e).type != 'select-one') {
                document.getElementById(e).checked = value[e];
            } else {
                $(e).val(value[e]).trigger('change');
            }
        })
    } catch (err) {
        console.log(err)
    }
})

setupLeaderboard.on('change', (newValue, oldValue) => {
    Object.keys(newValue).forEach((e, i) => {
        if (document.getElementById(e).type != 'select-one') {
            document.getElementById(e).checked = newValue[e];
        } else {
            $("#" + e).val(newValue[e]).trigger('change');
        }
    })
})

$('document').ready(() => {
    document.getElementById('attributionLane').addEventListener("input", uncheckedParameters, false);
    document.getElementById('heatResults').addEventListener("input", uncheckedParameters, false);
    document.getElementById('overallStandingDivwod').addEventListener("input", uncheckedParameters, false);
})

function uncheckedParameters() {
    if ($(this).is(':checked')) {
        for (let item of $('#checkboxLeaderboard').find('input[type=checkbox]')) {
            $(item).prop('checked', false);
        }
    }
}


logoEvent.on('change', (newValue, oldValue) => {
    console.log(newValue)
    $("#logoEventSelect option").remove()

    if (newValue.length > 0) {

        $('#logoEventSelect').append($('<option>', {
            value: '',
            text: 'Please, choose sponsor'
        }));
        newValue.forEach((e, i) => {

            $('#logoEventSelect').append($('<option>', {
                value: e.url,
                text: e.name
            }));
        })
    } else {

        $('#logoEventSelect').append($('<option>', {
            value: '',
            text: 'No sponsor'
        }));
    }
})

mainSponsors.on('change', (newValue, oldValue) => {
    console.log(newValue)
    $("#mainSponsorSelect option").remove()

    if (newValue.length > 0) {

        $('#mainSponsorSelect').append($('<option>', {
            value: '',
            text: 'Please, choose sponsor'
        }));
        newValue.forEach((e, i) => {

            $('#mainSponsorSelect').append($('<option>', {
                value: e.url,
                text: e.name
            }));
        })
    } else {

        $('#mainSponsorSelect').append($('<option>', {
            value: '',
            text: 'No sponsor'
        }));
    }
})


backgroundOverlay.on('change', (newValue, oldValue) => {
    console.log(newValue)
    $("#overlayBackgroundSelect option").remove()

    if (newValue.length > 0) {

        $('#overlayBackgroundSelect').append($('<option>', {
            value: '',
            text: 'Please, choose overlay'
        }));
        newValue.forEach((e, i) => {

            $('#overlayBackgroundSelect').append($('<option>', {
                value: e.url,
                text: e.name
            }));
        })
    } else {

        $('#overlayBackgroundSelect').append($('<option>', {
            value: '',
            text: 'No overlay'
        }));
    }
})


backgroundTimer.on('change', (newValue, oldValue) => {
    console.log(newValue)
    $("#backgroundTimerSelect option").remove()

    if (newValue.length > 0) {

        $('#backgroundTimerSelect').append($('<option>', {
            value: '',
            text: 'Please, choose background'
        }));
        newValue.forEach((e, i) => {

            $('#backgroundTimerSelect').append($('<option>', {
                value: e.url,
                text: e.name
            }));
        })
    } else {

        $('#backgroundTimerSelect').append($('<option>', {
            value: '',
            text: 'No background'
        }));
    }
})

s_athletes.on('change', (newValue, oldValue) => {
    $('#nameAthleteRight').innerHTML = ''
    $('#nameAthleteLeft').innerHTML = ''
    if (newValue != undefined) {
        if (newValue[hyperfitPts.leftPoints] != undefined) {
            $('#nameAthleteLeft').text(newValue[0].displayName.toUpperCase())
        }
        if (newValue[hyperfitPts.rightPoints] != undefined) {
            $('#nameAthleteRight').text(newValue[1].displayName.toUpperCase())
        }
    }

})


hyperfitPoints.on('change', (newValue, oldValue) => {
    console.log(newValue)
    hyperfitPts.leftPoints = newValue.leftPoints
    hyperfitPts.rightPoints = newValue.rightPoints
    $('#leftPoints').val(hyperfitPts.leftPoints)
    $('#rightPoints').val(hyperfitPts.rightPoints)
})

function plusPoint(side) {
    console.log(side)
    console.log(hyperfitPts)
    if (side === 'right') {
        hyperfitPts.rightPoints += 1
        $('#rightPoints').val(hyperfitPts.rightPoints)
        hyperfitPoints.value = hyperfitPts
        return
    } else if (side === 'left') {
        hyperfitPts.leftPoints += 1
        $('#leftPoints').val(hyperfitPts.leftPoints)
        hyperfitPoints.value = hyperfitPts
    }
}

function moinsPoint(side) {
    if (side === 'right') {
        if (hyperfitPts.rightPoints > 0) {
            hyperfitPts.rightPoints -= 1
            $('#rightPoints').val(hyperfitPts.rightPoints)
            hyperfitPoints.value = hyperfitPts
        }
        return
    } else if (side === 'left') {
        if (hyperfitPts.leftPoints > 0) {
            hyperfitPts.leftPoints -= 1
            $('#leftPoints').val(hyperfitPts.leftPoints)
            hyperfitPoints.value = hyperfitPts
        }
    }
}

function resetPoints() {
    hyperfitPts.leftPoints = 0
    hyperfitPts.rightPoints = 0
    $('#leftPoints').val(hyperfitPts.leftPoints)
    $('#rightPoints').val(hyperfitPts.rightPoints)
    hyperfitPoints.value = hyperfitPts
}
