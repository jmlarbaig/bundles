
const s_athletes = nodecg.Replicant('s_athletes', 'connector');
const ladderAssets = nodecg.Replicant('assets:ladder')
const Att_poids = nodecg.Replicant('Att_poids');

var participantEvent = {}
var participantsCurrentHeats = {}
var currentHeat = {}
var Att_poids_sub = []
var lowerThird = []
var tableWeight = [];
var score = [];

s_athletes.on('change', (newValue, oldValue) => {
    actualiserTeam(newValue);
}); 

function actualiserTeam(athletes){
    var select = document.getElementById('Team');
    select.innerHTML = "";
    athletes.forEach((element, index) => {
        score[element.lane-1] = 0
        var opt = document.createElement('option')
        opt.value = element.lane
        opt.innerHTML = element.displayName.toUpperCase()
        select.appendChild(opt)
    })
}

ladderAssets.on('change', (newValue, oldValue) => {
    if (newValue.length > 0){
        if (newValue != oldValue){
            $.getJSON( newValue[0].url, function( data ) {
                // console.log("Data = ",data)
                var $list = $('.tableWeights');
                data.ladder.forEach((element)=>{
                    tableWeight.push(element.score)
                    var $item = $(
                        '<div class="rowWeight" id="'+element.id+'">' +
                            '<button class="col" id="'+ element.id +'" onclick="weightMinus()">-</button>'+
                            '<div class="col text-center" id="'+element.id+'">'+ element.weight +' kg</div>' +
                           ' <button class="col" id="'+ element.id +'" onclick="weightPlus()">+</button>' +
                        '</div>'
                    )
                    $list.append($item)
                })
              });
        }
    }
})

function actualiserScore(){
    var e = document.getElementById("Team");
    var lane = e.value -1;
    $('#score').text(Att_poids.value[lane] + ' KG')
    
}

Att_poids.on('change', (newValue, oldValue)=>{
    var e = document.getElementById("Team");
    var lane = e.value - 1;
    $('#score').text(newValue[lane] + ' KG')
    score = Att_poids.value
})

function weightMinus(){
    var id = event.target.id
    var e = document.getElementById("Team");
    var lane = e.value -1;
    if(score[lane] > 0){
        score[lane] = score[lane] - parseInt(tableWeight[id])
    }
    if(score[lane] <= 0){
        score[lane] = 0
    }
    $('#'+id).css('backgroundColor', '#FF0000');
    $('#score').css('backgroundColor', '#FF0000');
    setTimeout(()=>{
        $('#'+id).css('backgroundColor', 'white');
        $('#score').css('backgroundColor', 'white');
    },200)
    $('#score').text(score[lane] + ' KG')
    Att_poids.value = score;

}

function weightPlus(){
    console.log(score)
    var id = event.target.id
    var e = document.getElementById("Team");
    var lane = e.value -1;
    score[lane] = parseInt(tableWeight[id]) + score[lane]
    
    $('#'+id).css('backgroundColor', 'green');
    $('#score').css('backgroundColor', 'green');
    setTimeout(()=>{
        $('#'+id).css('backgroundColor', 'white');
        $('#score').css('backgroundColor', 'white');
    },200)
    $('#score').text(score[lane] + ' KG')
    Att_poids.value = score;
}


function resetScore(){
    console.log('test')
    score[document.getElementById("Team").value-1] = 0
    console.log(score)
    Att_poids.value = score;
    $('#score').text(score[lane])
}