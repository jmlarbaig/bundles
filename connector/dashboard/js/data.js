function createDataView(){
    eventInfos.on('change',(newValue, oldValue)=>{
        
        createTextArea(newValue, $('#eventInfos'))

    })

    heatInfos.on('change',(newValue, oldValue)=>{

        createTextArea(newValue, $('#heatInfos'))

    })

    workoutInfo.on('change',(newValue, oldValue)=>{

        createTextArea(newValue, $('#workoutInfo'))
    })

    s_athletes.on('change',(newValue, oldValue)=>{

        createTextArea(newValue, $('#s_athletes'))
    })

    statusHeat.on('change',(newValue, oldValue)=>{

        createTextArea(newValue, $('#statusHeat'))
    })


    d_athletes.on('change',(newValue, oldValue)=>{

        createTextArea(newValue, $('#d_athletes'))
    })

    Divisions.on('change',(newValue, oldValue)=>{

        createTextArea(newValue, $('#divisionCC'))
    })

    WorkoutInfos.on('change',(newValue, oldValue)=>{

        createTextArea(newValue, $('#workoutCC'))
    })

    listWarmpUp.on('change',(newValue, oldValue)=>{

        createTextArea(newValue, $('#warmupCC'))
    })

    listCis.on('change',(newValue, oldValue)=>{

        createTextArea(newValue, $('#cis'))
    })

    //

    AttributionLane.on('change',(newValue, oldValue)=>{

        createTextArea(newValue, $('#AttributionLane'))
    })

    HeatResults.on('change',(newValue, oldValue)=>{

        createTextArea(newValue, $('#HeatResults'))
    })

    OSDivisionWorkout.on('change',(newValue, oldValue)=>{

        createTextArea(newValue, $('#OSDivisionWorkout'))
    })

}

function createRow(data, $root){

    let sub_item = 'sub_' + $root[0].id

    $root.find('.'+sub_item).remove()

    console.log(data)

    Object.keys(data).forEach((element, index)=>{
        let $item;
        if(element.length == 0){
            $item = $(
                '<div class="'+ sub_item +'">' + element + ' : ' + data[element] +'</div>'
            )
        }else{
            Object.keys(data[element]).forEach((el, i)=>{
                console.log(el)
                console.log(i)
                $item = $(
                    '<div class="'+ sub_item +'">' + el + ' : ' + data[element][el] +'</div>'
                )
            })
        }
        $root.append($item)
    })
}

function createTextArea(data,  $root){
    let pretty = JSON.stringify(data, undefined, 4);
    $root.val(pretty);
}