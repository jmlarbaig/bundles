
const dataMinos = nodecg.Replicant('dataMinos', 'connector')

let tableOfMinos = []
let minosOnFloor = 0;

dataMinos.on('change', (newValue, oldValue) => {
    // if(JSON.stringify(newValue) != JSON.stringify(oldValue)){
    Object.values(newValue).forEach((minos) => {
        if (minos != null) {
            console.log(minos)
            if ($('#aht' + minos.ip).length == 0) {
                // console.log(minos.ip)
                let $item = $(
                    '<tr class="athlete counter zero" id="aht' + minos.ip + '">' +
                    '<td class="lane"></td>' +
                    '<td class="state"></td>' +
                    '<td class="popup text-nowrap text-truncate"></td>' +
                    '<td class="timeAth"></td>' +
                    '<td class="repAth"></td>' +
                    '<td class="score align-items-xl-center"></td>' +
                    '<td class="flag" onclick="deleteMinos()"></td>' +
                    '<td class="text-nowrap text-truncate text-left name"><button onclick="deleteMinos()" id="delete_' + minos.ip + '">PING</button><button onclick="showModal()" id="lane_reject_' + minos.lane + '_' + minos.ip + '">&times;</button></td>' +
                    '</tr>'
                );
                $('#lane' + minos.lane).after($item)
            }
            $('#aht' + minos.ip).find('.lane').text(treatType(minos.type))
            $('#aht' + minos.ip).find('.score').text(minos.ip)
            $('#aht' + minos.ip).find('.popup').text(minos.battery + ' %')
            $('#aht' + minos.ip).find('.state').text(minos.status)
            // $('#aht'+minos.ip).find('.timeAth').text(msToTimeSK(minos.time))
            $('#aht' + minos.ip).find('.timeAth').text(minos.signal)
            console.log(minos.rep)
            $('#aht' + minos.ip).find('.repAth').text(minos.rep)
            BatteryLevel(minos.ip, minos.battery)
            if (tableOfMinos[minos.ip] != null) {
                clearTimeout(tableOfMinos[minos.ip])
                tableOfMinos[minos.ip] = null
            }
            $('#heatSize').text(`${$('.counter').length} Counter/${heatSize} Athletes`)
            tableOfMinos[minos.ip] = setTimeout(() => {
                $('#aht' + minos.ip).remove()
                $('#heatSize').text(`${$('.counter').length} Counter/${heatSize} Athletes`)
            }, 5000)
        }
    })
    // }
})

function BatteryLevel(ip, battery) {
    if (battery > 199) {
        $('#aht' + ip).addClass('deuxcent')
        $('#aht' + ip).removeClass('cent soixantequinze cinquante vingtcinq zero')
    } else if (battery >= 75 && battery < 125) {

        $('#aht' + ip).addClass('cent')
        $('#aht' + ip).removeClass('deuxcent soixantequinze cinquante vingtcinq zero')
    } else if (battery >= 50 && battery < 74) {

        $('#aht' + ip).addClass('soixantequinze')
        $('#aht' + ip).removeClass('deuxcent cent cinquante vingtcinq zero')
    } else if (battery >= 25 && battery < 49) {

        $('#aht' + ip).addClass('cinquante')
        $('#aht' + ip).removeClass('deuxcent soixantequinze cent vingtcinq zero')
    } else if (battery >= 25 && battery < 49) {

        $('#aht' + ip).addClass('vingtcinq')
        $('#aht' + ip).removeClass('deuxcent soixantequinze cinquante cent zero')
    } else {

        $('#aht' + ip).addClass('zero')
        $('#aht' + ip).removeClass('deuxcent soixantequinze cinquante cent vingtcinq')
    }

}

function requestPing() {
    let lane = event.target.id.replace('request_', '')
    console.log(lane)
    nodecg.sendMessageToBundle('request_minos', 'connector', lane)
}

function requestReject(infos) {
    nodecg.sendMessageToBundle('reject_minos', 'connector', infos)
    let ip = infos.split("_")
    $('#aht' + ip[1]).remove()
}

function deleteMinos() {
    let ip = parseInt(event.target.id.replace('delete_', ''))
    console.log(ip)
    $('#aht' + ip).remove()
}

function treatType(bytes) {
    switch (bytes) {
        case 1:
            return 'COUNTER'
        case 4:
            return 'SKI'
        case 8:
            return 'BIKE'
        case 16:
            return 'BUZZER'
        case 32:
            return 'AB'
    }
}