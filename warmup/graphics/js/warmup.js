function updateTimer(){
    var today = new Date();
    $("#time").text(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds())
}

function resetHeader(data){
    console.log(data)

    var $tab = $("#header1")
    $tab.find(".header_").remove();

    console.log(data)

    var today = new Date();
    today = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

    var $item = $(
        '<div class="header_">' +
            '<div class="col">'+
                '<img id="logo" src="' + data.logoUrl + '" />' +
            '</div>' +
            '<div class="col titleEvent">'+
                '<h1>' +
                    data.eventName +
                '</h1>' +
            '</div>' +
            '<div class="col">'+
                '<h2 id="time">' + today + '</h2>' +
            '</div>' +
        '</div>'
    )
    $tab.append($item);


    setInterval(updateTimer, 1000)

}

function resetWarmup(data){
    var $tab = $("#warmUp_body")
    $tab.find(".global").remove();

    console.log("d = ", data)

    let i =0;
    for(let d of data){

        // for(let div of d.heat.divisions){
        //     var $item_div= $(
        //         '<h2>'+
        //             div +
        //         '</h2>'
        //     )
        // }

        var $item = $(
            '<div class="col global">'+ 
                '<h1 class="first">'+
                    d.heat.current +
                '</h1>' +
                '<h2 class="WodName">'+
                    d.wod.name + 
                '</h2>' +
                // '<h2  class="format_location">'+
                //     d.wod.format + " - " + d.wod.location +
                // '</h2>' +
                '<h3 class="hours">'+
                    "START AT : " + d.heat.time + 
                '</h3>' +
                '<h2 class="title">'+
                    d.heat.title +
                '</h2>' +
                '<div class="division">'+
                '</div>' +
                '<div class="table">'+
                '</div>' +
                '<table id="tab_participants'+ i +'" class="tab_participants">' +
                    '<thead>' + 
                        '<tr>' +
                            // '<th>' + "Av" + '</th>' +
                            '<th>' + "Stations" + '</th>' +
                            '<th>' + "Division" + '</th>' +
                            '<th>' + "Country" + '</th>' +
                            '<th>' + "Name" + '</th>' +
                            '<th>' + "Affiliate" + '</th>' +
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

        
        for(let station of d.heat.stations){
            let a = d.wod.participants.find( element => element.id === station.participantId)
            console.log("Station : ",station)

            console.log("a = ",a)

            if (a.countryCode=="" || a.countryCode==null){a.countryCode = "null"}
            else{
                for(let f=0; f < FLAG.length; f++){
                    if (a.countryCode == FLAG[f]["3L"]){
                        a.countryCode = FLAG[f]["2L"];
                        break;
                    }
                }
            }

            var $itemtab = $(
                '<tr class="athlete">' + 
                    // '<td class="flag">' + '<img src='+ station.avatarPath +' width="100"></img> ' + '</td>' +
                    '<td class="station">' + station.station  + '</th>' +
                    '<td class="division">' + a.division  + '</th>' +
                    '<td class="flag">' + '<img src="https://flagcdn.com/'+ a.countryCode.toLowerCase() + '.svg" width="30"></img> ' + '</td>' +
                    '<td class="text-nowrap text-truncate text-left name">' + a.displayName + '</td>' + 
                    '<td class="text-nowrap text-truncate text-left name">' + station.affiliate + '</td>' + 
                    '<td class="rank">' + a.rank  + '</th>' +
                    '<td class="score">' + a.points + '</td>' +
                '</tr>'
            );
            
            $list.append($itemtab);
        }

        i++

    }

}