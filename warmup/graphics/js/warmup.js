function updateTimer(){
    var today = new Date();

    let hour = today.getHours()
    let min =  today.getMinutes()
    let sec = today.getSeconds()

    if(hour < 9){
        hour = "0"+hour
    }
    if(min < 9){
        min = "0"+min
    }
    if(sec < 9){
        sec = "0"+sec
    }

    let ti = hour + ":" + min + ":" + sec;

    $("#time").text(ti)

    return ti;
}

function resetHeader(eventName){

    var $tab = $("#header1")
    $tab.find(".header_").remove();

    let today = updateTimer()

    var $item = $(
        '<div class="header_">' +
            '<div class="col">'+
                '<div id="logo"></div>' +
            '</div>' +
            '<div class="col titleEvent">'+
                '<h1>' +
                    eventName +
                '</h1>' +
            '</div>' +
            '<div class="col hTime">'+
                '<h2 id="time">' + today + '</h2>' +
            '</div>' +
        '</div>'
    )
    $tab.append($item);

    $tab.find('#logo').css('background-image','url('+eventLogo +')')


    setInterval(updateTimer, 1000)

}

function resetWarmup(data){
    var $tab = $("#warmUp_body")
    $tab.find(".global").remove();

    console.log("d = ", data)

    let i =0;
    for(let d of data){

        over = (overlay == 'next-warmup' ? overlay.toUpperCase().split('-') : overlay.toUpperCase())

        console.log(d.heat.current.includes(over) )

        if( over.includes(d.heat.current) ){

        var $item = $(
            '<div class="col global">'+ 
                '<h1 class="first">'+
                    (d.heat.current || '-') +
                '</h1>' +
                '<h2 class="WodName">'+
                    (d.wod.name || '-') + ' - ' + (d.heat.title || '-') +
                '</h2>' +
                '<div class="hHours">' +
                    '<h3 class="hours">'+
                        "START AT : " + (d.heat.time || '-') + 
                    '</h3>' +
                '</div>' +
                '<div class="division">'+
                '</div>' +
                '<div class="table">'+
                '</div>' +
                '<table id="tab_participants'+ i +'" class="tab_participants">' +
                    '<thead>' + 
                        '<tr>' +
                            // '<th>' + "Av" + '</th>' +
                            '<th>' + "Lane" + '</th>' +
                            '<th>' + "Division" + '</th>' +
                            '<th>' + "" + '</th>' +
                            '<th>' + "Name" + '</th>' +
                            '<th>' + "Affiliation" + '</th>' +
                            '<th>' + "Rank" + '</th>' +
                            '<th>' + "Point" + '</th>' +
                            
                    '<tbody id="athletes" class="athletes">' +
                    '</tbody>' + 
                '</table>' +
            '</div>' 
        )


        $tab.append($item);

        var $list = $("#tab_participants"+ i +" #athletes");
        $list.find(".athlete").remove();

        if(d.heat.stations != undefined){
            for(let station of d.heat.stations){
                let a = d.wod.participants.find( element => element.id === station.participantId)
                console.log("Station : ",station)
    
                console.log("a = ",a)
    
                if (a.countryCode=="" || a.countryCode==null){a.countryCode = null}
                else{
                    for(let f=0; f < FLAG.length; f++){
                        if (a.countryCode == FLAG[f]["3L"]){
                            a.countryCode = FLAG[f]["2L"];
                            break;
                        }
                    }
                }
    
                let aff = '-'
    
                if(station.affiliate != '' && station.affiliate != null){
                    aff=station.affiliate
                }
    
                let logo = eventLogo;
                if(a.countryCode != null){
                    logo ='https://flagcdn.com/'+ a.countryCode.toLowerCase() + '.svg'
                }
    
                var $itemtab = $(
                    '<tr class="athlete">' + 
                        // '<td class="flag">' + '<img src='+ station.avatarPath +' width="100"></img> ' + '</td>' +
                        '<td class="station">' + station.station  + '</th>' +
                        '<td class="text-nowrap text-truncate division">' + a.division  + '</th>' +
                        '<td class="flag">' + '<img src="'+ logo +'" width="20"></img> ' + '</td>' +
                        '<td class="text-nowrap text-truncate text-left name">' + a.displayName + '</td>' + 
                        '<td class="text-nowrap text-truncate text-left name">' + aff + '</td>' + 
                        '<td class="rank">' + a.rank  + '°</th>' +
                        '<td class="score">' + a.points + ' PTS</td>' +
                    '</tr>'
                );
                
                $list.append($itemtab);
            }
    
        }
        
        i++

    }}

}