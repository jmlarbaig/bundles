var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


function updateTimer(){
    var today = new Date();
    $("#time").text(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds())
}

function resetHeader(data){

    var $tab = $("#header1")
    $tab.find(".header_").remove();

    // console.log(data)

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
                '<h1>' +
                    "PLANNING" +
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


function createPlanning(workoutTab){
    try{

        let $nav = $("#nav-tab") 
        $nav.find(".day").remove();
    
        let $navContent = $("#nav-tabContent") 
        $nav.find(".itemContent").remove();
    
        const d = new Date();
    
        let i=0
        for(let day of workoutTab){
            // var cpr = day.text.split(' ')
            // var dayDate = days[ d.getDay() ];
            // var month = months[ d.getMonth() ];
            // var dayNb = months[ d.getDate() ];
    
            var $item = $(
                '<button class="day nav-link" id="nav-schedule-tab" data-bs-toggle="tab" data-bs-target="#tab'+i+'"  type="button" role="tab" aria-controls="tab'+i+'" aria-selected="false">' + day.text + ' </button>'
            )
            $nav.append($item)
    
            var $itemContent = $(
                '<div class="itemContent tab-pane fade" id="tab'+i+'"  role="tabpanel" aria-labelledby="tab'+i+'-tab">' + 
                    '<div class="accordion accordion-flush" id="accordion'+i+'"/>' +
                '</div>'
            )
    
            $navContent.append($itemContent)
            var $wodContent = $('#accordion'+i) 
            $wodContent.find(".accordion-item").remove()
            
            let y =0
            for (let wod of day.wods){
                if (wod.id != workoutId.value){
                    var $itemWod = (
                        '<div class="accordion-item">' + 
                            '<h2 class="accordion-header" id="heading'+i+'y'+y+'">' +
                                '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+i+'y'+y+'" aria-expanded="false" aria-controls="collapse'+i+'y'+y+'">' +
                                    wod.name + " - " + wod.start + " - Floor " + wod.location + " - " + wod.format +
                                '</button>' +
                            '</h2>' +
                            '<div id="collapse'+i+'y'+y+'" class="accordion-collapse collapse" aria-labelledby="heading'+i+'y'+y+'" data-bs-parent="#accordion'+i+'">' +
                                '<div class="heat" id="heat'+i+'y'+y+'">' +
                                '</div>' +
                            '</div>' +
                        '</div>' 
                    )
                }
                else{
                    var $itemWod = (
                        '<div class="accordion-item">' + 
                            '<h2 class="accordion-header" id="heading'+i+'y'+y+'">' +
                                '<button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+i+'y'+y+'" aria-expanded="true" aria-controls="collapse'+i+'y'+y+'">' +
                                    wod.name + " - " + wod.start + " - Floor " + wod.location + " - " + wod.format +
                                '</button>' +
                            '</h2>' +
                            '<div id="collapse'+i+'y'+y+'" class="accordion-collapse collapse" aria-labelledby="heading'+i+'y'+y+'" data-bs-parent="#accordion'+i+'">' +
                                '<div class="heat" id="heat'+i+'y'+y+'">' +
                                '</div>' +
                            '</div>' +
                        '</div>' 
                    )
                }
    
    
                $wodContent.append($itemWod)
    
                var $heatBody = $("#heat"+i+'y'+y)
                let h = 0;
                for(let heat of wod.heats){

                    var $itemHeats = (
                        '<div class="heatName">' + 
                            heat.title + " - " + heat.time +
                        '</div>' + 
                        '<table id="heattab" class="heattab">' +
                            '<thead> ' +
                                    '<tr>' +
                                        '<th>#</th>' +
                                        '<th>RANK</th>' +
                                        '<th>POINTS</th>' +
                                        '<th>FLAG</th>' +
                                        '<th>AVATAR</th>' +
                                        '<th>WEIGHT</th>' +
                                        '<th>HEIGHT</th>' +
                                        '<th>NAME</th>' +
                                        '<th>DIV</th>' +
                                    '</tr>' +
                                '</thead>' +
                            '<tbody id="heatContent'+i+'y'+y+'h'+h+'" class="athletes">' +
                            '</tbody>' + 
                        '</table>' 
                    )
                    $heatBody.append($itemHeats)
    
                    var $heatStation = $("#heatContent"+i+'y'+y+'h'+h)
                    for(let station of heat.stations){
                        
                        let a = wod.participants.find( element => element.id === station.participantId)
            
                        if (a.countryCode=="" || a.countryCode==null){a.countryCode = "null"}
                        else{
                            for(let f=0; f < FLAG.length; f++){
                                if (a.countryCode == FLAG[f]["3L"]){
                                    a.countryCode = FLAG[f]["2L"];
                                    break;
                                }
                            }
                        }


                        var $itemStation = $(
                            '<tr class="athlete">' + 
                                '<td class="lane">'+ station.station + '</td>' + 
                                '<td class="rank">'+ a.rank + '</td>' + 
                                '<td class="points">'+ a.points + '</td>' + 
                                '<td class="flag">' + '<img src="https://flagcdn.com/'+ a.countryCode.toLowerCase() + '.svg" width="30"></img> ' + '</td>' +
                                '<td class="avatar">' + '<img src="'+station.avatarPath+'" width="30"></img> ' + '</td>' +
                                '<td class="height">'+ a.height + '</td>' + 
                                '<td class="weight">'+ a.weight + '</td>' + 
                                '<td class="text-nowrap text-truncate text-left name">' + station.participantName + '</td>' + 
                                '<td class="text-nowrap text-truncate text-left affiliate">' + station.division + '</td>' +
                            '</tr>'
                        )
                        $heatStation.append($itemStation)
                    }
    
                    h++
                }
    
    
                y++
    
            }
            i++
        }

    }
    catch(e){
        console.log(e)
    }

}
