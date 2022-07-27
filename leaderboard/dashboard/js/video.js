function resetVideo(data){
    try{        
        // ! On prend le tableau 
        
        var $lane = $("#lane__video")
        $lane.find(".lane_V").remove();

        var i=0;
        for(let video of data){
            console.log(video)
            var $item = $(
                '<div class="lane_V">' + 
                    '<div class="">' + video.name  + '</div>' + 
                    '<button class="button_lane" onclick="affichageVideo()" id='+i+'>' + "Afficher" + '</button>' +
                '</div>'
            );
            // athlete.$item = $item;
            $lane.append($item)
            i++
        }

    }
    catch(e){
        console.log(e)
    }
}

function resetVideoPub(data){
    try{        
        // ! On prend le tableau 
        
        var $lane = $("#pub__video")
        $lane.find(".pub_V").remove();

        var i=0;
        for(let video of data){
            console.log(video)
            var $item = $(
                '<div class="pub_V">' + 
                    '<div class="">' + video.name  + '</div>' + 
                    '<button class="button_lane" onclick="affichageVideoPub()" id='+i+'>' + "Afficher" + '</button>' +
                '</div>'
            );
            // athlete.$item = $item;
            $lane.append($item)
            i++
        }

    }
    catch(e){
        console.log(e)
    }
}

function affichageVideo() {
    console.log(event.target)
    console.log(videoAth.value[event.target.id].url)
    videoInfos.value = videoAth.value[event.target.id].url;
    videoShow.value = true;
    $(".button_lane").attr('disabled', true);
    setTimeout(function(){ 
        $(".button_lane").attr('disabled', false);
        videoShow.value = false; 
    }, 7000);
}

function affichageVideoPub() {
    console.log(event.target)
    console.log(pubVideo.value[event.target.id].url)
    videoInfos.value = pubVideo.value[event.target.id].url;
    videoShow.value = true;
    $(".button_lane").attr('disabled', true);
    setTimeout(function(){ 
        $(".button_lane").attr('disabled', false);
        videoShow.value = false; 
    }, 7000);
}