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


function createPlanning(data){
    try{

        const {dates, locations, workouts } = data

        let $nav = $("#nav-tab") 
        $nav.find(".day").remove();
    
        let $navContent = $("#nav-tabContent") 
        $nav.find(".itemContent").remove();

    
        let i=0
        for(let day of dates){
    
            let $item = $(
                '<button class="day nav-link" id="nav-schedule-tab" data-bs-toggle="tab" data-bs-target="#tab'+i+'"  type="button" role="tab" aria-controls="tab'+i+'" aria-selected="false">' + day.text + ' </button>'
            )
            $nav.append($item)
    
            let $itemContent = $(
                '<div class="itemContent tab-pane fade" id="tab'+i+'"  role="tabpanel" aria-labelledby="tab'+i+'-tab">' + 
                    '<div class="accordion accordion-flush" id="accordion'+i+'"/>' +
                '</div>'
            )
    
            $navContent.append($itemContent)
            let $wodContent = $('#accordion'+i) 
            $wodContent.find(".accordion-item").remove()
            
            let y =0
            for (let wod of workouts){
                if(wod.date == day.value){
                    let $itemWod = $();
                    if (wod.id != workoutId){
                        $itemWod = (
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
                        $itemWod = (
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
        
                    let $heatBody = $("#heat"+i+'y'+y)
                    let h = 0;

                    console.log(wod)
                    for(let heat of wod.heats){

                        let $itemHeats = (
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
                                            '<th>NAME</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                '<tbody id="heatContent'+i+'y'+y+'h'+h+'" class="athletes">' +
                                '</tbody>' + 
                            '</table>' 
                        )
                        $heatBody.append($itemHeats)
        
                        let $heatStation = $("#heatContent"+i+'y'+y+'h'+h)
                        for(let station of heat.stations){
                            
                            if(wod.participants != undefined){
                                let a = wod.participants.find( element => element.id === station.participantId)
                
                                if (a.countryCode=="" || a.countryCode==null){a.countryCode = "null"}
                                else{
                                    for(let fl of FLAG){
                                        if (a.countryCode == fl["3L"]){
                                            a.countryCode = fl["2L"];
                                            break;
                                        }
                                    }
                                }
    
    
                                let $itemStation = $(
                                    '<tr class="athlete">' + 
                                        '<td class="lane">'+ station.station + '</td>' + 
                                        '<td class="rank">'+ a.rank + '</td>' + 
                                        '<td class="points">'+ a.points + '</td>' + 
                                        // '<td class="flag">' + '<img src="https://flagcdn.com/'+ a.countryCode.toLowerCase() + '.svg" width="30"></img> ' + '</td>' +
                                        '<td class="text-nowrap text-truncate text-left name">' + station.participantName + '</td>' + 
                                    '</tr>'
                                )
                                $heatStation.append($itemStation)
                            }
                        }
        
                        h++
                    }
        
                    y++
                }
            }
            i++
        }

    }
    catch(e){
        console.log(e)
    }

}
