
const AssetsColors = nodecg.Replicant('assets:config');
const Colors = nodecg.Replicant('Colors');
const Fonts = nodecg.Replicant('assets:font');

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


Fonts.on('change', (newValue, oldValue) => {
    if (newValue != oldValue) {

        let listOfSelect = ['font', 'fontWorkout', 'fontAthlete', 'fontChrono', 'fontPresented', 'othersFontWorkout', 'firstFontWorkout', 'fontPresented']

        for (let i = 0; i > listOfSelect.length; i++) {
            element = listOfSelect[i];
            console.log("#" + element + "-select")
            $("#" + element + "-select").remove()
            $("#" + element + "-select").append('<option value="Adarsh">Adarsh</option>')
            $("#" + element + "-select").append('<option value="Antonio">Antonio</option>')
            $("#" + element + "-select").append('<option value="Bebas">Bebas</option>')
            $("#" + element + "-select").append('<option value="Circo">Circo</option>')
            $("#" + element + "-select").append('<option value="Coamei">Coamei</option>')
            $("#" + element + "-select").append('<option value="Hoop">Hoop</option>')
            $("#" + element + "-select").append('<option value="Montserrat">Montserrat</option>')
            $("#" + element + "-select").append('<option value="Oswald">Oswald</option>')
            $("#" + element + "-select").append('<option value="Power">Power</option>')
            $("#" + element + "-select").append('<option value="Roboto">Roboto</option>')
            $("#" + element + "-select").append('<option value="Strasua">Strasua</option>')
            $("#" + element + "-select").append('<option value="Typographica">Typographica</option>')

        }


        let personalFontTab = newValue;
        Object.keys(personalFontTab).forEach((font) => {
            $("#font-select").append('<option value="' + personalFontTab[font].name + '">' + personalFontTab[font].name + '</option>')
            $("#fontWorkout-select").append('<option value="' + personalFontTab[font].name + '">' + personalFontTab[font].name + '</option>')
            $("#fontAthlete-select").append('<option value="' + personalFontTab[font].name + '">' + personalFontTab[font].name + '</option>')
            $("#fontChrono-select").append('<option value="' + personalFontTab[font].name + '">' + personalFontTab[font].name + '</option>')
            $("#firstFontWorkout-select").append('<option value="' + personalFontTab[font].name + '">' + personalFontTab[font].name + '</option>')
            $("#othersFontWorkout-select").append('<option value="' + personalFontTab[font].name + '">' + personalFontTab[font].name + '</option>')
            $("#fontPresented-select").append('<option value="' + personalFontTab[font].name + '">' + personalFontTab[font].name + '</option>')

        })
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
