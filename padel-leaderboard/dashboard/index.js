const setupLeaderboard = nodecg.Replicant('setupLeaderboard')
const logoEvent = nodecg.Replicant('assets:logoEvent');

const mainSponsors = nodecg.Replicant('assets:mainSponsor', 'connector')

const padelPlayers = nodecg.Replicant('padelPlayers')

let modelScoring = {
    nameA1: "",
    nameA2: "",
    nameB1: "",
    nameB2: "",
    setA1: 0,
    setA2: 0,
    setA3: 0,
    pointA: 0,
    setB1: 0,
    setB2: 0,
    setB3: 0,
    pointB: 0,
}


padelPlayers.on('change', (newValue, oldValue) => {
    if (newValue != oldValue) {
        modelScoring = newValue;
        Object.keys(newValue).forEach(key => {
            if (key.includes('name')) {
                $('#' + key).val(newValue[key]);
            } else {
                $('#' + key).html(newValue[key]);
            }
        });
    }
})


const btns = document.querySelectorAll('button')
const inputs = document.querySelectorAll('input[type=text]')

btns.forEach(btn => {

    btn.addEventListener('click', event => {
        console.log(event.target.id);
        if (event.target.id.includes('minus')) {
            const keyTarget = event.target.id.substring(5);
            let value = modelScoring[keyTarget]

            if (keyTarget.includes('point')) {
                switch (value) {
                    case 0:
                        value = 0;
                        break;
                    case 15:
                        value = 0;
                        break;
                    case 30:
                        value = 15;
                        break;
                    case 40:
                        value = 30;
                        break;
                    case 'A':
                        value = 40;
                        break;
                    default:
                        value = 0;
                        break;
                }
            } else {
                value = value - 1;
                if (value < 0) {
                    value = 0
                }
            }

            modelScoring[keyTarget] = value;
        } else if (event.target.id.includes('plus')) {
            const keyTarget = event.target.id.substring(4);
            let value = modelScoring[keyTarget]

            if (keyTarget.includes('point')) {
                switch (value) {
                    case 0:
                        value = 15;
                        break;
                    case 15:
                        value = 30;
                        break;
                    case 30:
                        value = 40;
                        break;
                    case 40:
                        if (keyTarget == 'pointA') {
                            if (modelScoring.pointB == 40) {
                                value = 'A'
                            } else {
                                value = 0;
                                modelScoring.pointA = 0;
                                modelScoring.pointB = 0;
                            }
                        }
                        if (keyTarget == 'pointB') {
                            if (modelScoring.pointA == 40) {
                                value = 'A'
                            } else {
                                value = 0;
                                modelScoring.pointA = 0;
                                modelScoring.pointB = 0;
                            }
                        }

                        break;
                    case 'A':
                        value = 0;
                        modelScoring.pointA = 0;
                        modelScoring.pointB = 0;
                        break;
                    default:
                        value = 0;
                        break;
                }
            } else {
                value = value + 1;
                if (value < 0) {
                    value = 0
                }
            }

            modelScoring[keyTarget] = value;
        }
        padelPlayers.value = modelScoring;
    });

});



inputs.forEach(input => {

    input.addEventListener('input', event => {
        console.log(modelScoring)
        modelScoring[event.target.id] = $('#' + event.target.id).val();
        padelPlayers.value = modelScoring;
    }, false);

});

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
