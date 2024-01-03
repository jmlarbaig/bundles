const listClass = [
    'top_left',
    'top_center',
    'top_right',
    'bottom_left',
    'bottom_center',
    'bottom_right',
]

function createLowerThird(data){
    switch(data.type){
        case 'presentator':
            createPresentator(data)
            break;
        case 'athlete':
            createAthleteLowerthird(data)
            break;
        case 'waiting':
            createWaiting(data)
            break;
        case 'free':
            createFree(data)
            break;
        case 'qrcode':
            createQrcode(data)
            break;
        case 'workout':
            createWorkout(data)
            break;
    }
}


function generateQrCode(link, $item, width, height){

    new QRCode($item[0].id, {
        text: link,
        width: width || 50,
        height: height ||  50,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}


function changeClass(selector, myClass){
    console.log(selector)
    console.log(myClass)
    for(let _class of listClass){
        if(_class != myClass){
            $(selector).removeClass(_class)
        }else{
            $(selector).addClass(myClass)
        }
    }
}
