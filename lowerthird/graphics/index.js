
    let eventLogo = []
    let infos;
    let root = document.documentElement;


    const Colors = nodecg.Replicant('Colors', 'configuration');
    const logoEvent = nodecg.Replicant('assets:logoEvent','connector')
    const eventInfos = nodecg.Replicant('eventInfos', 'connector');
    const lowerThirdData = nodecg.Replicant('lowerThirdData')
    const lowerThirdConfig = nodecg.Replicant('lowerThirdConfig');

    // Initialisation du choix de la vue
    let overlay=''

    $('document').ready(()=>{
        let ch = document.location.pathname.split('/')
        overlay = ch[ch.length-1].replace('.html','')
    })

    let $root = $('#rootlowerthird');

    logoEvent.on('change',(newValue)=>{
        if(newValue.length > 0){
            eventLogo = newValue[0].url;
            $(".logo_event").css("background-image", "url(" + eventLogo + ")")
        }
    })

    eventInfos.on('change', (newValue)=>{
        infos = newValue
    })

    lowerThirdData.on('change', (newValue, oldValue)=>{
        if(newValue != undefined){
            switch(overlay){
                case 'free':
                    newValue.type == 'free' && createFree(newValue)
                    break;
                case 'waiting':
                    newValue.type == 'waiting' && createWaiting(newValue)
                    break;
                case 'presentator':
                    newValue.type == 'presentator' && createPresentator(newValue)
                    break;
                case 'athlete':
                    newValue.type == 'athlete' && createAthlete(newValue)
                    break;
                case 'lowerthirds':
                    createLowerThird(newValue);
                    break;
                case 'workouts':
                    newValue.type == 'workout' && createWorkout(newValue);
                    break;
            }
        }
    })


    lowerThirdConfig.on('change', (newValue,oldValue)=>{
        Object.keys(newValue).forEach((color, index) => {
            if(color.includes('ft')){
                root.style.setProperty("--"+ color, newValue[color] + 'px');
            }else{
                root.style.setProperty("--"+ color, newValue[color]);
            }
        })
    })

    Colors.on('change', (newValue, oldValue) => {
        
        Object.keys(newValue).forEach((color) => {
            root.style.setProperty("--"+ color, newValue[color] );
        })
        
    })