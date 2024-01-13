
const UrlChange = nodecg.Replicant('UrlChange');
const UrlChange_internal = nodecg.Replicant('UrlChange_internal')


const setupLeaderboard = nodecg.Replicant('setupLeaderboard')

const logoEvent = nodecg.Replicant('assets:logoEvent');

const ipAddress = nodecg.Replicant('ipAddress', 'connector')

const athletesHeat = nodecg.Replicant('athletesHeat')


const mainSponsors = nodecg.Replicant('assets:mainSponsor', 'connector')


var participantEvent = {}
var participantsCurrentHeats = {}
var currentHeat = {}

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
                $(e).val(value[e]);
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
            $("#" + e).val(newValue[e]);
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
