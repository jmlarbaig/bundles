
const manualChrono = nodecg.Replicant('manualChrono')
const adjustT = nodecg.Replicant('adjustT')

let dataToSend = {
    'timer': "00:01:00",
    'stateTimer': 'timing',
}
let now;

function startTimer() {
    if (now == undefined) {
        now = Date.now();
    }
    dataToSend.timer = now
    dataToSend.stateTimer = 'start';
    manualChrono.value = dataToSend;
}

function stopTimer() {

    dataToSend.timer = now
    dataToSend.stateTimer = 'stop';
    manualChrono.value = dataToSend;
}

function resetTimer() {
    let now = Date.now();
    dataToSend.timer = now
    dataToSend.stateTimer = 'reset';
    manualChrono.value = dataToSend
}


function adjustTimer() {
    switch (event.target.id) {
        case 'plus1':
            adjustT.value += 1000
            break;
        case 'plus2':
            adjustT.value += 2000
            break;
        case 'plus5':
            adjustT.value += 5000
            break;
        case 'minus1':
            adjustT.value -= 1000
            break;
        case 'minus2':
            adjustT.value -= 2000
            break;
        case 'minus5':
            adjustT.value -= 5000
            break;
        default:
            break;
    }
}