
const Colors = nodecg.Replicant('Colors', 'configuration');
const logoEvent = nodecg.Replicant('assets:logoEvent', 'connector')
const mainSponsors = nodecg.Replicant('assets:mainSponsor', 'connector')

const sponsors = nodecg.Replicant('assets:sponsors', 'connector')
const sponsorLower = nodecg.Replicant('assets:sponsorLower', 'versus')

const AttributionLane = nodecg.Replicant('AttributionLane', 'connector');
const HeatResults = nodecg.Replicant('HeatResults', 'connector')
const OSDivisionWorkout = nodecg.Replicant('OSDivisionWorkout', 'connector')

const sponsorForCC = nodecg.Replicant('sponsorForCC')
const configForCC = nodecg.Replicant('configForCC')

let root = document.documentElement;
let overlay = ''
let eventLogo;
let initialCount = 0;
let athletes;
let maximumAthlete = 10;

let _config = {
    'country-lane': true,
    'affiliation-lane': true,
    'country-heat': true,
    'affiliation-heat': true,
    'country-overall-division': true,
    'affiliation-overall-division': true,
}

$('document').ready(() => {
    let ch = document.location.pathname.split('/')
    overlay = ch[ch.length - 1].replace('.html', '')
    // widthWindow = window.outerWidth;
    // heightWindowd = window.outerHeight;


    widthWindow = window.innerWidth;
    heightWindowd = window.innerHeight;

    document.querySelector(':root').style.setProperty('--zoom', (widthWindow / 1920) * 100 + '%');
    console.log(widthWindow)
    console.log(heightWindowd)
})

logoEvent.on('change', (newValue) => {
    if (newValue.length > 0) {
        eventLogo = newValue[0].url;
        $('.headerLogo-img').css("background-image", "url(" + newValue[0].url + ")")
    }
})

AttributionLane.on('change', (newValue, oldValue) => {
    if (overlay == 'attribution-lane') {
        resetAttrLane(newValue)
    }
})

HeatResults.on('change', (newValue, oldValue) => {
    if (overlay == 'heat-result') {
        resetHeatResults(newValue)
    }
})

OSDivisionWorkout.on('change', (newValue, oldValue) => {
    if (overlay == 'overall-division-workout') {
        resetWorkoutDivision(newValue)
    }
})

sponsorForCC.on('change', (newValue) => {

    if (newValue != undefined) {

        if (overlay.includes(newValue.type)) {
            $('.headerLogo').find('.cc-table__header__logo--2').remove()

            let $item = $(
                '<figure class="headerLogo-img cc-table__header__logo cc-table__header__logo--2" style="background-image: url(' + newValue.url + ');">' +
                '</figure>'
            )

            $('.headerLogo').append($item)

        }

    }
})

configForCC.on('change', (newValue) => {
    console.log(newValue)
    if (newValue != undefined) {
        if (overlay.includes(newValue.type)) {
            _config['country-' + newValue.type] = newValue.country
            _config['affiliation-' + newValue.type] = newValue.affiliation
            newValue.country ? $('.flag').show() : $('.flag').hide()
            newValue.affiliation ? $('.affiliation').show() : $('.affiliation').hide()
        }
    }
})


Colors.on('change', (newValue, oldValue) => {

    let tabColor = newValue


    Object.keys(newValue).forEach((color, index) => {

        let _color = tabColor[color]


        root.style.setProperty("--" + color, _color);
    })
})