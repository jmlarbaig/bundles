
const AssetsColors = nodecg.Replicant('assets:config');
const Colors = nodecg.Replicant('Colors');

var participantEvent = {}
var participantsCurrentHeats = {}
var currentHeat = {}

function Actualiser() {

    let data = {};

    const elmColors = document.querySelectorAll('input[type=color]');
    elmColors.forEach(el => {
        data[el.id] = el.value
    });

    const elmNumber = document.querySelectorAll('input[type=number]');
    elmNumber.forEach(el => {
        data[el.id] = (el.value || 0) + "px"
    });

    const elmInput = document.querySelectorAll('input[type=text]');
    elmInput.forEach(el => {
        data[el.id] = (el.value || 0);
    });

    const elmCheck = document.querySelectorAll('input[type=checkbox]');
    elmCheck.forEach(el => {
        data[el.id] = el.checked
    });

    const elmSelect = document.querySelectorAll('select');
    elmSelect.forEach(el => {
        data[el.id] = el.value
    });

    if (data.bg_trans == true) {
        data.bg__color = "rgba(0,0,0,0)";
    }

    Colors.value = data;
    nodecg.sendMessage('colorOverwrite', data);
}

AssetsColors.on('change', (newValue, oldValue) => {
    if (newValue.length > 0) {
        if (newValue != oldValue) {
            $.getJSON(newValue[0].url, function (data) {
                console.log(data)
                nodecg.sendMessage('colorOverwrite', data);
            });
        }
        console.log(newValue);
        // nodecg.sendMessage('colorOverwrite', data);
    }
})

Colors.on('change', (value) => {

    console.log("Colors changed at ", Date.now())

    Object.keys(value).forEach((element, index) => {
        if (typeof value[element] === 'boolean') {
            $("#" + element).prop("checked", value[element]);
        } else if (value[element].includes('px')) {
            console.log('px')
            $("#" + element).val(value[element].replace('px', ''))
        } else {
            $("#" + element).val(value[element]);
        }
    })
})
