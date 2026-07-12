
const dataMinos = nodecg.Replicant('dataMinos', 'connector')

let tableOfMinos = []
let minosOnFloor = 0;
let athleteWithMinos = 0

dataMinos.on('change', (newValue, oldValue) => {
    console.log("newValue : ", newValue)
    Object.values(newValue).forEach((minos) => {
        console.log("minos : ", minos)
        console.log("minos == undefined : ", minos == undefined)
        console.log("minos == {} : ", minos == {})
        if (Object.keys(minos).length === 0) return;
        let $itemSignal = buildSignal(minos.connectivity, minos.signal)
        let $itemBattery = buildBattery(minos.battery)
        let $itemIcon = buildIcon(minos.type)
        let $itemRep = buildRep(minos.type, minos.lane, minos.rep)
        let $itemState = buildStateLane(true, false)
        if (minos != null) {
            if ($('#judge-' + minos.ip).length == 0) {
                let $item = $(
                    '<div class="row child athlete" id="judge-' + minos.ip + '">' +
                    '<div class="lane dev">' + $itemIcon + '</div>' +
                    '<div class="batt">' + $itemBattery + '</div>' +
                    '<div class="sig">' + $itemSignal + '</div>' +
                    '<div class="ip">' + minos.ip + '</div>' +
                    '<div class="cspan"><span class="crole" style="color:var(--ok)">' + $itemIcon + '</span><span class="code"></span>' + $itemRep + '</div>' +
                    '<div class="ping"><button onclick="deleteMinos()" id="delete_' + minos.ip + '">PING</button></div>' +
                    '<div class="reject"><button onclick="showModal()" id="lane_reject_' + minos.lane + '_' + minos.ip + '">REJECT LANE &times;</button></div>' +
                    '</div>'
                );
                $('#ath' + minos.lane).find('.kids').append($item)
                $('#ath' + minos.lane).find('.parent').removeClass('off')
                $('#ath' + minos.lane).find('.vbadge').replaceWith($itemState)
                athleteWithMinos++;
            } else {
                $('#judge-' + minos.ip).find('.lane').html($itemIcon)
                $('#judge-' + minos.ip).find('.batt').html($itemBattery)
                $('#judge-' + minos.ip).find('.sig').html($itemSignal)
                $('#judge-' + minos.ip).find('.cspan').html('<span class="crole" style="color:var(--ok)">' + $itemIcon + '</span><span class="code"></span>' + $itemRep)
            }

            if (tableOfMinos[minos.ip] != null) {
                clearTimeout(tableOfMinos[minos.ip])
                tableOfMinos[minos.ip] = null
            }


            tableOfMinos[minos.ip] = setTimeout(() => {
                $itemState = buildStateLane(false, false)

                athleteWithMinos--;
                $('#judge-' + minos.ip).remove()
                $('#ath' + minos.lane).find('.parent').addClass('off')
                $('#ath' + minos.lane).find('.vbadge').replaceWith($itemState)
                $('#active-count').text(`${$('.child').length}`)
            }, 6000)



            $('#active-count').text(`${athleteWithMinos}`)
        }
    })
    // }
})

function buildStateLane(isOnline, areIssue) {
    let $item = '<span class="vbadge vb-off">OFFLINE</span>'
    if (isOnline) {
        $item = '<span class="vbadge vb-live">LIVE</span>'
    }
    if (areIssue) {
        $item = '<span class="vbadge vb-warn">ISSUE</span>'
    }
    return $item;
}

function buildBattery(battery) {
    let $item = ''
    if (battery > 199) {
        $item = '<svg class="bicon-v" viewBox="0 0 14 22" fill="none" aria-hidden="true"><rect x="4.6" y="0.4" width="4.8" height="1.7" rx="0.7" fill="var(--ok)"></rect><rect x="2" y="2.6" width="10" height="18.4" rx="2" fill="none" stroke="var(--ok)" stroke-width="1.5"></rect><rect x="4" y="16.2" width="6" height="3.1" rx="0.9" fill="var(--ok)"></rect><rect x="4" y="12.2" width="6" height="3.1" rx="0.9" fill="var(--ok)"></rect><rect x="4" y="8.2" width="6" height="3.1" rx="0.9" fill="var(--ok)"></rect><rect x="4" y="4.2" width="6" height="3.1" rx="0.9" fill="var(--ok)"></rect></svg>'
    } else if (battery >= 60 && battery < 125) {
        $item = '<svg class="bicon-v" viewBox="0 0 14 22" fill="none" aria-hidden="true"><rect x="4.6" y="0.4" width="4.8" height="1.7" rx="0.7" fill="var(--ok)"></rect><rect x="2" y="2.6" width="10" height="18.4" rx="2" fill="none" stroke="var(--ok)" stroke-width="1.5"></rect><rect x="4" y="16.2" width="6" height="3.1" rx="0.9" fill="var(--ok)"></rect><rect x="4" y="12.2" width="6" height="3.1" rx="0.9" fill="var(--ok)"></rect><rect x="4" y="8.2" width="6" height="3.1" rx="0.9" fill="var(--ok)"></rect><rect x="4" y="4.2" width="6" height="3.1" rx="0.9" fill="var(--ok)"></rect></svg>'
    } else if (battery >= 30 && battery < 59) {
        $item = '<svg class="bicon-v" viewBox="0 0 14 22" fill="none" aria-hidden="true"><rect x="4.6" y="0.4" width="4.8" height="1.7" rx="0.7" fill="var(--orange)"></rect><rect x="2" y="2.6" width="10" height="18.4" rx="2" fill="none" stroke="var(--orange)" stroke-width="1.5"></rect><rect x="4" y="16.2" width="6" height="3.1" rx="0.9" fill="var(--orange)"></rect><rect x="4" y="12.2" width="6" height="3.1" rx="0.9" fill="var(--orange)"></rect><rect x="4" y="8.2" width="6" height="3.1" rx="0.9" fill="var(--orange)"></rect><rect x="4" y="4.2" width="6" height="3.1" rx="0.9" fill="rgba(255,255,255,.10)"></rect></svg>'
    } else {
        $item = '<svg class="bicon-v" viewBox="0 0 14 22" fill="none" aria-hidden="true"><rect x="4.6" y="0.4" width="4.8" height="1.7" rx="0.7" fill="var(--bad)"></rect><rect x="2" y="2.6" width="10" height="18.4" rx="2" fill="none" stroke="var(--bad)" stroke-width="1.5"></rect><rect x="4" y="16.2" width="6" height="3.1" rx="0.9" fill="var(--bad)"></rect><rect x="4" y="12.2" width="6" height="3.1" rx="0.9" fill="rgba(255,255,255,.10)"></rect><rect x="4" y="8.2" width="6" height="3.1" rx="0.9" fill="rgba(255,255,255,.10)"></rect><rect x="4" y="4.2" width="6" height="3.1" rx="0.9" fill="rgba(255,255,255,.10)"></rect></svg>'
    }


    return '<div class="batt" title="Battery ' + battery + '%">' + $item + '<span class="bslot"></span><span class="pct">' + battery + '%</span></div>'
}

function buildSignal(connectivity, signal) {
    let $item = ''
    console.log(signal)
    let signalText = parseInt(signal.replace('dbm', ''))
    console.log(signalText)

    if (connectivity == 'mobile') {
        if (signalText >= -50) {
            $item = '<svg class="sigico" viewBox="0 0 23 18"><rect x="1" y="11" width="3.6" height="6" rx="1" fill="var(--ok)"></rect><rect x="6.4" y="8" width="3.6" height="9" rx="1" fill="var(--ok)"></rect><rect x="11.8" y="5" width="3.6" height="12" rx="1" fill="var(--ok)"></rect><rect x="17.200000000000003" y="2" width="3.6" height="15" rx="1" fill="var(--ok)"></rect></svg>' +
                '<div class="sig"><div class="val"><span>' + signalText + '<small>dBm</small></span><span class="tier" style="color:var(--good)">Excellent</span></div>'
        } else if (signalText >= -70 && signalText < -50) {
            $item = '<svg class="sigico" viewBox="0 0 23 18"><rect x="1" y="11" width="3.6" height="6" rx="1" fill="var(--good)"></rect><rect x="6.4" y="8" width="3.6" height="9" rx="1" fill="var(--good)"></rect><rect x="11.8" y="5" width="3.6" height="12" rx="1" fill="var(--good)"></rect><rect x="17.200000000000003" y="2" width="3.6" height="15" rx="1" fill="rgba(255,255,255,.16)"></rect></svg>' +
                '<div class="sig"><div class="val"><span>' + signalText + '<small>dBm</small></span><span class="tier" style="color:var(--good)">Good</span></div>'
        } else if (signalText >= -80 && signalText < -70) {
            $item =
                '<svg class="sigico" viewBox="0 0 23 18"><rect x="1" y="11" width="3.6" height="6" rx="1" fill="var(--warn)"></rect><rect x="6.4" y="8" width="3.6" height="9" rx="1" fill="var(--warn)"></rect><rect x="11.8" y="5" width="3.6" height="12" rx="1" fill="rgba(255,255,255,.16)"></rect><rect x="17.200000000000003" y="2" width="3.6" height="15" rx="1" fill="rgba(255,255,255,.16)"></rect></svg>' +
                '<div class="sig"><div class="val"><span>' + signalText + '<small>dBm</small></span><span class="tier" style="color:var(--warn)">Fair</span></div>'
        } else {
            $item =
                '< svg class="sigico" viewBox = "0 0 23 18" ><rect x="1" y="11" width="3.6" height="6" rx="1" fill="var(--bad)"></rect><rect x="6.4" y="8" width="3.6" height="9" rx="1" fill="rgba(255,255,255,.16)"></rect><rect x="11.8" y="5" width="3.6" height="12" rx="1" fill="rgba(255,255,255,.16)"></rect><rect x="17.200000000000003" y="2" width="3.6" height="15" rx="1" fill="rgba(255,255,255,.16)"></rect></svg > ' +
                '<div class="val"><span>' + signalText + '<small>dBm</small></span><span class="tier" style="color:var(--bad)">Poor</span></div>'
        }
    }
    else if (connectivity == 'wifi') {
        if (signalText >= -50 && signalText < 0) {
            $item =
                '<svg class="sigico" viewBox="0 0 24 22" fill="none" stroke-linecap="round" stroke-width="2.4"><path d="M3 8a14 14 0 0 1 18 0" stroke="var(--ok)"></path><path d="M6.3 11.8a9.2 9.2 0 0 1 11.4 0" stroke="var(--ok)"></path><path d="M9.4 15.4a4.6 4.6 0 0 1 5.2 0" stroke="var(--ok)"></path><circle cx="12" cy="18.8" r="1.5" fill="var(--ok)" stroke="none"></circle></svg>' +
                '<div class="val"><span>' + signalText + '<small>dBm</small></span><span class="tier" style="color:var(--ok)">Excellent</span></div>'
        } else if (signalText >= -70 && signalText < -50) {
            $item =
                '<svg class="sigico" viewBox="0 0 24 22" fill="none" stroke-linecap="round" stroke-width="2.4"><path d="M3 8a14 14 0 0 1 18 0" stroke="var(--good)"></path><path d="M6.3 11.8a9.2 9.2 0 0 1 11.4 0" stroke="var(--good)"></path><path d="M9.4 15.4a4.6 4.6 0 0 1 5.2 0" stroke="var(--good)"></path><circle cx="12" cy="18.8" r="1.5" fill="var(--good)" stroke="none"></circle></svg>' +
                '<div class="val"><span>' + signalText + '<small>dBm</small></span><span class="tier" style="color:var(--good)">Good</span></div>'
        } else if (signalText >= -80 && signalText < -70) {
            $item =
                '<svg class="sigico" viewBox="0 0 24 22" fill="none" stroke-linecap="round" stroke-width="2.4"><path d="M3 8a14 14 0 0 1 18 0" stroke="var(--warn)"></path><path d="M6.3 11.8a9.2 9.2 0 0 1 11.4 0" stroke="var(--warn)"></path><path d="M9.4 15.4a4.6 4.6 0 0 1 5.2 0" stroke="var(--warn)"></path><circle cx="12" cy="18.8" r="1.5" fill="var(--warn)" stroke="none"></circle></svg>' +
                '<div class="val"><span>' + signalText + '<small>dBm</small></span><span class="tier" style="color:var(--warn)">Fair</span></div>'

        } else {
            $item =
                '<svg class="sigico" viewBox="0 0 24 22" fill="none" stroke-linecap="round" stroke-width="2.4"><path d="M3 8a14 14 0 0 1 18 0" stroke="var(--bad)"></path><path d="M6.3 11.8a9.2 9.2 0 0 1 11.4 0" stroke="var(--bad)"></path><path d="M9.4 15.4a4.6 4.6 0 0 1 5.2 0" stroke="var(--bad)"></path><circle cx="12" cy="18.8" r="1.5" fill="var(--bad)" stroke="none"></circle></svg>' +
                '<div class="val"><span>' + signalText + '<small>dBm</small></span><span class="tier" style="color:var(--bad)">Poor</span></div>'

        }
    } else if (connectivity == 'ethernet') {
        $item =
            '<svg class="sigico" viewBox="0 0 24 20" fill="none" stroke="var(--ok)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><rect x="4" y="6" width="16" height="11" rx="1.5"></rect><path d="M9 6V3h6v3"></path><line x1="8" y1="10" x2="8" y2="13"></line><line x1="12" y1="10" x2="12" y2="13"></line><line x1="16" y1="10" x2="16" y2="13"></line></svg>' +
            '<div class="val"><span class="dbm" style="color:var(--ok)">LAN</span><span class="tier" style="color:var(--ok)">Wired</span></div>'
    }
    return $item
}

function buildRep(type, lane, rep) {
    let $item = ''
    let typeDevice = returnType(type)
    $item = '<span class="code">LANE' + lane + '-' + typeDevice + '</span><div class="repcell flash"><span class="rdot"></span><span class="arrow">▲</span><span class="rep" data-lane="' + lane + '">' + rep + '</span></div>'
    return $item
}

function buildIcon(type) {
    let $item = ''
    switch (type) {
        case 1:
            $item = '<span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill="currentColor" stroke="none"></circle></svg ></span>'
            break;
        case 4:
            $item = '<span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill="currentColor" stroke="none"></circle></svg ></span>'
            break;
        case 8:
            $item = '<span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill="currentColor" stroke="none"></circle></svg ></span>'
            break;
        case 16:
            $item = '<span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill="currentColor" stroke="none"></circle></svg ></span>'
            break;
        case 32:
            $item = '<span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill="currentColor" stroke="none"></circle></svg ></span>'
            break;
    }
    return '<span class="dline"></span>' + $item + ' <span class="dicon" style = "color:var(--ok)" ></span > <span class="dot" style="background:var(--ok);margin-left:2px;"></span>'
}

function buildIconParent(ip, type) {
    let $item = ''
    switch (type) {
        case 1:
            $item = '<span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill="currentColor" stroke="none"></circle></svg ></span>'
            break;
        case 4:
            $item = '<span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill="currentColor" stroke="none"></circle></svg ></span>'
            break;
        case 8:
            $item = '<span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill="currentColor" stroke="none"></circle></svg ></span>'
            break;
        case 16:
            $item = '<span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill    ="currentColor" stroke="none"></circle></svg ></span>'
            break;
        case 32:
            $item = '<span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill    ="currentColor" stroke="none"></circle></svg ></span>'
            break;
    }
    return $item
}


function openLane(lane) {
    $('#ath' + lane).find('.chev').css('visibility', 'visible')
    $('#ath' + lane).find('.kids').slideDown()
    $('#ath' + lane).addClass('open')
}

function closeLane(lane) {
    $('#ath' + lane).find('.chev').css('visibility', 'hidden')
    $('#ath' + lane).find('.kids').slideUp()
    $('#ath' + lane).removeClass('open')
}

function toggleLane(lane) {
    if ($('#ath' + lane).hasClass('open')) {
        closeLane(lane)
    } else {
        openLane(lane)
    }
}

function toggleAllLanes() {
    $('.athlete.grp').each(function () {
        let lane = $(this).attr('id').replace('ath', '')
        if ($(this).hasClass('open')) {
            closeLane(lane)
        } else {
            openLane(lane)
        }
    })
}


function requestPing() {
    let lane = event.target.id.replace('request_', '')
    console.log(lane)
    nodecg.sendMessageToBundle('request_minos', 'connector', lane)
}

function requestReject(infos) {
    nodecg.sendMessageToBundle('reject_minos', 'connector', infos)
    let ip = infos.split("_")
    $('#judge-' + ip[1]).remove()
}

function deleteMinos() {
    let ip = parseInt(event.target.id.replace('delete_', ''))
    console.log(ip)
    $('#judge-' + ip).remove()
}

function treatType(bytes) {
    let $item = ''
    switch (bytes) {
        case 1:
            $item = '<span class="crole" style="color:var(--ok)"><span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round">< rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill="currentColor" stroke="none"></circle></svg></span>Rep Counter</span>'
            break;
        case 4:
            $item = '<span class="crole" style="color:var(--ok)"><span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill="currentColor" stroke="none"></circle></svg></span>SKI</span>'
            break;
        case 8:
            $item = '<span class="crole" style="color:var(--ok)"><span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill="currentColor" stroke="none"></circle></svg></span>BIKE</span>'
            break;
        case 16:
            $item = '<span class="crole" style="color:var(--finish)"><span class="ricon" style="width:15px"><svg viewBox="0 0 22 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="M6.5 9.5 A4.5 4.5 0 0 1 15.5 9.5" ></path><path d="M4 13 L18 13 L20 17.5 L2 17.5 Z"></path><line x1="11" y1="3.2" x2="11" y2="5"></line></svg></span>Buzzer</span> '
            break;
        case 32:
            $item = '<span class="crole" style="color:var(--ok)"><span class="ricon" style="width:15px"><svg viewBox="0 0 16 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="1.5" width="10" height="19" rx="2.2" ></rect ><line x1="6.6" y1="4.4" x2="9.4" y2="4.4"></line><circle cx="8" cy="17.4" r="0.9" fill="currentColor" stroke="none"></circle></svg></span>AB</span>'
            break;
    }

    return $item
}

function returnType(type) {
    switch (type) {
        case 1:
            return 'CNT'
        case 4:
            return 'SKI'
        case 8:
            return 'BIKE'
        case 16:
            return 'BZZ'
        case 32:
            return 'AB'
    }
}