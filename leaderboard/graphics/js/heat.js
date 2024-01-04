function resetHeat(data) {

    try {
        var $list = $("#heat");
        $list.find(".heat_name").remove();
        $list.find(".heat_content").remove();

        let $item;

        switch (overlay) {
            case 'overlay_top':
                $item = styleHeat_top(data)
                break;
            case 'overlay_side':
                $item = styleHeat_side(data)
                break;
            case 'overlay_side_v1':
                $item = styleHeat_side(data)
                break;
            case 'leaderboard':
                $item = styleHeat_TV(data)
                break;
            case 'progression':
                $item = styleHeat_TV(data)
                break;
            case 'commentator':
                $item = styleHeat_TV(data)
                break;
            case 'sk':
                $item = styleHeat_TV(data)
                break;
            case 'head_judge':
                $item = styleHeat_TV(data)
                break;
            case 'versus':
                $item = styleHeat_Versus(data)
                break;
        }

        if (overlay.includes('overlay')) {
            setupLeaderboard.value.heat != true ? $("#box_heat").hide() : "";
        }

        $list.append($item);

        if (mainSponsors.value.length > 0) {
            $(".mainSponsor").hide()
            $(".mainSponsor").css("background-image", "url(" + mainSponsors.value[0].url + ")");
            if (!$('.mainSponsor').is(':visible')) {
                $(".mainSponsor").fadeIn(1000)
            }
        }
        else {
            $(".mainSponsor").slideUp(1000)
        }


    }
    catch (e) {
        console.log(e)
    }
}



function styleHeat_top(element) {
    let $item = $(
        '<div class="heat_content">' +
        '<div class="details">' +
        '<div id="workout" class="detail" > ' + element.externalName + ' - </div>' +
        '<div id="division" class="detail"> ' + element.heatName + ' </div>' +
        '<div id="mvt" class="text-nowrap text-truncate"></div>' +
        '</div>' +
        '<div class="box_mainSponsor">' +
        '<div class="presented" id="prt">' + varPresented + '</div>' +
        '<div class="mainSponsor">' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    return $item
}

function styleHeat_side(element) {
    let $item = $(
        '<div class="heat_name">' +
        '<div class="heatlow">' +
        '<div id="workout" class="m-auto text-nowrap text-truncate" > ' + element.externalName + ' </div>' +
        '<div id="division" class="m-auto text-nowrap text-truncate"> ' + element.heatName + '</div>' +
        '</div>' +
        '</div>'
    );
    return $item
}

function styleHeat_TV(element) {
    let $item = $(
        '<div class="heat_content">' +
        '<div class="details">' +
        '<div id="workout" class="detail" > ' + element.externalName + ' </div>' +
        '<div id="division" class="detail"> ' + element.heatName + ' </div>' +
        '</div>' +
        '<div class="box_FVSK">' +
        '<div class="presented"><span>LIVE STATS AND VISUALS POWERED BY</span></br></div>' +
        '<div class="FV col">' + '</div>' +
        '<div class="SK col">' + '</div>' +
        '</div>' +
        '</div>'
    );
    return $item
}


function styleHeat_Versus(element) {
    let $item = $(
        '<div class="heat_content">' +
        '<div class="details">' +
        '<div id="workout" class="detail" > ' + element.externalName + ' </div>' +
        '<div id="division" class="detail"> ' + element.heatName + ' </div>' +
        '</div>' +
        // '<div class="box_FVSK">' +
        //     '<div class="presented"><span>POWERED BY</span></br></div>'+
        //     '<div class="FV col">' + '</div>'+
        //     '<div class="SK col">' + '</div>'+
        // '</div>'+
        '</div>'
    );
    return $item
}