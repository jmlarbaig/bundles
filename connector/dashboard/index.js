
let heatId = "";
let athletes_final = new Array();
let sameJson;
let adr_IP_static;
let adr_IP_dynamics;
let EventPlanner = [];
let heatWUP = []
let static_
let workoutId;
let wodId;

let data = []

    // Initialisation du choix de la vue
    
    let overlay=''

    $('document').ready(()=>{
        let ch = document.location.pathname.split('/')
        overlay = ch[ch.length-1].replace('.html','')
        
        if(overlay == 'data'){
            createDataView();
        }

        if(overlay == 'kairos'){
            createKairosView();
        }
    })


    logoEvent.on('change', (newValue) => {
        if(newValue.length>0){
            $("#logo_event").css("background-image", "url(" + newValue[0].url + ")");
        }
    })


    async function Connection (){
        try{

            let data = {}
            data.user = $('#usernameCC').val().toString()
            data.passwd = $('#passwordCC').val().toString()
            data.event = $('#eventId').val().toString()
            data.addIp = $('#address_IP').val().toString()
            data.ntpAdress = $('#adresse_ntp').val().toString()

            nodecg.sendMessage('connection', data)

        }
        catch(e){
            Deconnection();
        }
    }

    function Deconnection(){
        try{

            nodecg.sendMessage('deconnection')

        }
        catch(e){
            console.log(e)
        }
    }

    function updateNtp(){

        let radio = $('input[name=NTPradio]:checked', '#ntpForm').val();

        let ipNtp;
        if(radio == 'custom'){
            ipNtp = $('#adresse_ntp').val();
        }else{
            ipNtp = 'local';
        }

        $('#updateButton').attr('disabled', true)
        $('#ntpTime').text('WAITING')
        $('#led_NTP').removeClass('led-red')
        $('#led_NTP').addClass('led-orange')
        $('#led_NTP').removeClass('led-green')

        nodecg.sendMessage('updateNTP', ipNtp);
    }

    $('document').ready(function(){
        if(Connected.value){
            $('#connection_but').prop('disabled', true)
        }else{
            $('#connection_but').prop('disabled', false)
        }
    })

    Connected.on('change',(newValue)=>{
        Object.keys(newValue).forEach((element)=>{
            let state = newValue[element]
            if(newValue[element].includes('error')){
                state = 'error'
            }
            stateConnection(state, element, newValue[element])
        })
    })

    nodecg.readReplicant('dataConfig', (value) =>{
        $('#address_IP').val(value.addIp)
        $('#adresse_ntp').val(value.ntpAdress)
        $('#usernameCC').val(value.user)
        $('#passwordCC').val(value.passwd)
        $('#eventId').val(value.event)
        $('#local').attr('checked', true);
    })



    ipAddress.on('change', (newValue, oldValue) => {
        let ipHtml = $('#ipAdresse');
        ipHtml.text(newValue)
        if(newValue != undefined && newValue.includes('10.')){
            $('#led_ipAdresse').addClass('led-green')
            $('#led_ipAdresse').removeClass('led-red')
            $('#led_ipAdresse').removeClass('led-orange')
        }else if(newValue != undefined){
            $('#led_ipAdresse').addClass('led-orange')
            $('#led_ipAdresse').removeClass('led-red')
            $('#led_ipAdresse').removeClass('led-green')
        }else{
            $('#led_ipAdresse').removeClass('led-green')
            $('#led_ipAdresse').removeClass('led-red')
            $('#led_ipAdresse').addClass('led-orange')
        }
    })
    
    nowNtp.on('change', (newValue, oldValue)=>{
        $('#updateButton').removeAttr('disabled')
        let ip = newValue.ip
        let date = newValue.date.split('T')[1]
        if(!newValue.date.includes('Timeout waiting for NTP')){
            $('#ntpTime').text(date)        
            $('#ntpIp').text(ip)
            $('#led_NTP').addClass('led-green')
            $('#led_NTP').removeClass('led-orange')
            $('#led_NTP').removeClass('led-red')
        }
        else{
            $('#ntpTime').text(date)
            $('#ntpIp').text(ip)
            $('#led_NTP').addClass('led-red')
            $('#led_NTP').removeClass('led-orange')
            $('#led_NTP').removeClass('led-green')
        }
    })
    
    Mqtt_connected.on('change', (newValue, oldValue) => {
        if(newValue.connected == true){
            $('#mqttMSG').text('Connected')
            $('#led_MQTT').addClass('led-green')
            $('#led_MQTT').removeClass('led-red')
        }
        else{
            if(newValue.error != ''){
                $('#mqttMSG').text('Reconnection ...')
            }else{
                $('#mqttMSG').text('Disconnected')
            }
            $('#led_MQTT').addClass('led-red')
            $('#led_MQTT').removeClass('led-green')
        }
    })

    statusHeat.on('change', (newValue, oldValue)=>{
        console.log(newValue)
        if(overlay == 'kairos'){
            if(JSON.stringify(newValue) != JSON.stringify(oldValue)){
                switch(newValue.status){
                    case '0':
                        $('.stateTimer').css('background-color', 'white')
                        $('.stateTimer').css('color', 'black')
                        $('#stateTimer').text('HEAT LOADED, VERIFY IF THIS THE GOOD HEAT')
                        break;
                    case 'W':
                        $('.stateTimer').css('background-color', 'green')
                        $('.stateTimer').css('color', 'white')
                        $('#stateTimer').text('HEAT LAUNCHED')
                        break;
                    case 'T':
                        $('.stateTimer').css('background-color', 'orange')
                        $('.stateTimer').css('color', 'black')
                        $('#stateTimer').text('HEAT FINISHED')
                        break;
                }
            }
        }
    })

    heatInfos.on('change', (newValue, oldValue)=>{
        if(overlay == 'kairos'){
            if(JSON.stringify(newValue) != JSON.stringify(oldValue)){
                $('#timeCapKairos').text(newValue[0].timeCap)
            }
        }
    })