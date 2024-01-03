
function resetWod(){

    // document.getElementById("heatName").innerHTML = data.heatName;
    // document.getElementById("timecap").innerHTML = "TIMECAP : " + timecapNTP + " '"

    try{

        data = staticData;
        divisionsNames = [];
        workoutNames = [];

        for(let athletes of data.athletes){
            if( !divisionsNames.includes(athletes.division) ){
                divisionsNames.push(athletes.division)
            }
        }

        console.log(divisionsNames)

        for(let y=0; y<divisionsNames.length; y++){
            for (let wod of data.WorkoutInfo){
                if(divisionsNames[y] == wod.division){
                    console.log(wod)
                    workoutNames[y] = wod
                }
            }
        }


        var $list = $("#wod");
        $list.find(".wod_box").remove();

        setupLeaderboard.value.wod != true ? $("#wod").hide() : ""

        for (let wod of workoutNames){
            var $item = $(
                '<div class="wod_box">' +
                    '<div class="col" style="">' +
                        '<div class="wodDiv">' + wod.division +' </div>' +    
                        '<div class="wodDescription"> ' + wod.description + ' </div>' +
                    '</div>' +
                '</div>'
            );
     
            $list.append($item);
        }

    }
    catch(e){
        console.log(e)
    }
}