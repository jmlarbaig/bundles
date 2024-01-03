
const manualChrono = nodecg.Replicant('manualChrono')
const adjustT = nodecg.Replicant('adjustT')

let dataToSend = {
    'timer': "00:01:00",
    'timecap':0,
    'launchedTimer' : 'false',
    'resetTimer' : 'stop'
}

function startTimer(){

    let now = Date().split(' ')[4]
    dataToSend.timer = now
    dataToSend.timecap = $('#manualTimecap').val()
    dataToSend.launchedTimer = 'start';
    manualChrono.value = dataToSend;
}

function stopTimer(){
    
    let now = Date().split(' ')[4]
    dataToSend.timer = now
    dataToSend.timecap = $('#manualTimecap').val()
    dataToSend.launchedTimer = 'stop';
    manualChrono.value = dataToSend;
}

function resetTimer(){
    let now = Date().split(' ')[4]
    dataToSend.timer = now
    dataToSend.timecap = $('#manualTimecap').val()
    dataToSend.launchedTimer = 'reset';
    dataToSend.resetTimer = true

    manualChrono.value = dataToSend

    setTimeout(()=>{
        dataToSend.resetTimer = false;
        manualChrono.value = dataToSend
    }, 1000)
}


function adjustTimer(){
    switch(event.target.id){
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