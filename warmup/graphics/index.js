
    let root = document.documentElement;
    
    const Colors = nodecg.Replicant('Colors', 'configuration');
    const mainSponsors = nodecg.Replicant('assets:mainSponsor','connector')

    // Destructuration du fichier static
    const listWarmpUp = nodecg.Replicant('listWarmpUp', 'connector');
    const logoEvent = nodecg.Replicant('assets:logoEvent','connector')


    let overlay=''
    
    $('document').ready(()=>{
        let ch = document.location.pathname.split('/')
        overlay = ch[ch.length-1].replace('.html','')
    })

    let eventLogo;

    logoEvent.on('change', (newValue, oldValue) => {
        try{
            if(newValue.length > 0){
                eventLogo = newValue[0].url
                $("#logo").css("background-image", "url(" + newValue[0].url + ")");
            }
        }
        catch(e){
            console.log(e)
        }
    }); 

    listWarmpUp.on('change', (newValue)=>{
        console.log(newValue)
        resetHeader(newValue.eventName)
        resetWarmup(newValue.warmUp)
    })

    Colors.on('change', (newValue, oldValue) => {

        Object.keys(newValue).forEach((color, index) => {
            root.style.setProperty("--"+ color, newValue[color] );
        })
        
    })

