
const pubVideo = nodecg.Replicant('assets:videoPub');
const videoAth = nodecg.Replicant('assets:videoCall');

const videoInfos = nodecg.Replicant('videoInfos')
const videoShow = nodecg.Replicant('videoShow')

videoAth.on('change', (newValue) => {
    resetVideo(newValue)
})

// pubVideo.on('change', (newValue)=> {
//     resetVideoPub(newValue);
// })

function resetVideo(data) {
    try {
        // ! On prend le tableau 

        var $lane = $("#videos")
        $lane.find(".video").remove();

        var i = 0;
        for (let video of data) {
            var $item = $(
                '<div class="video box">' +
                '<label >' + video.name + '</label>' +
                '<button onclick="affichageVideo()" id=' + i + '>' + "Afficher" + '</button>' +
                '</div>'
            );
            $lane.append($item)
            i++
        }

    }
    catch (e) {
        console.log(e)
    }
}

function affichageVideo() {
    videoInfos.value = videoAth.value[event.target.id].url;
    videoShow.value = true;
    $(".button_lane").attr('disabled', true);
    setTimeout(function () {
        $(".button_lane").attr('disabled', false);
        videoShow.value = false;
    }, 4000);
}

// function resetVideoPub(data){
//     try{        
//         // ! On prend le tableau 

//         var $lane = $("#pub__video")
//         $lane.find(".pub_V").remove();

//         var i=0;
//         for(let video of data){
//             // console.log(video)
//             var $item = $(
//                 '<div class="pub_V">' + 
//                     '<div class="">' + video.name  + '</div>' + 
//                     '<button class="button_lane" onclick="affichageVideoPub()" id='+i+'>' + "Afficher" + '</button>' +
//                 '</div>'
//             );
//             // athlete.$item = $item;
//             $lane.append($item)
//             i++
//         }

//     }
//     catch(e){
//         console.log(e)
//     }
// }

function affichageVideoPub() {
    // console.log(event.target)
    // console.log(pubVideo.value[event.target.id].url)
    videoInfos.value = pubVideo.value[event.target.id].url;
    videoShow.value = true;
    $(".button_lane").attr('disabled', true);
    setTimeout(function () {
        $(".button_lane").attr('disabled', false);
        videoShow.value = false;
    }, 4000);
}