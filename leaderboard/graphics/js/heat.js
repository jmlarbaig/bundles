function resetHeat(data) {

    try {
        var $list = $("#heat");
        $list.find("#division").remove();
        $list.find("#workout").remove();
        $list.find(".heat_content").remove();

        let $item;

        switch (overlay) {
            case 'overlay_top':
            case 'overlay_top_v2':
                $item = styleHeat_top(data)
                break;
            case 'overlay_wpa':
                // $item = styleHeat_wpa(data)
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
            case 'versus_hyperfit':
                $item = styleHeat_VersusHyperfit(data)
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
        '<div class="details fade-right">' +
        '<div id="workout" class="detail" > ' + element.externalName + ' </div>' +
        '<div id="heat" class="detail"> // ' + element.heatName + ' // </div>' +
        '<div id="division" class="detail"> RX\'D </div>' +
        '<div id="mvt" class="text-nowrap text-truncate"></div>' +
        '</div>' +
        '<div class="box_mainSponsor">' +
        // '<div class="presented" id="prt">' + varPresented + '</div>' +
        '<div class="mainSponsor">' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    return $item
}

function styleHeat_wpa(element) {
    let $item = $(
        '<div class="heat_content">' +
        '<div class="details">' +
        // '<div id="workout" class="detail" > ' + element.externalName + ' - </div>' +
        '<div class="detail" id="eventName" > TYR WZA SOCAL ' + Colors.value.text_day + '</div>' +
        '<div class="detail" > | </div>' +
        '<div class="detail" id="floor" > ' + Colors.value.text_floor + ' </div>' +
        // '<div id="division" class="detail"> ' + element.heatName + ' </div>' +
        // '<div id="mvt" class="text-nowrap text-truncate"></div>' +
        '</div>' +
        '</div>'
    );
    return $item
}

function styleHeat_side(element) {
    let $item = $(
        '<div id="workout" class="m-auto text-nowrap text-truncate" > ' + element.externalName + ' </div>' +
        '<div id="division" class="m-auto text-nowrap text-truncate"> ' + element.heatName + '</div>'

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

function styleHeat_VersusHyperfit(element) {
    let $item = $(
        '<div class="heat_content">' +
        '<div class="details">' +
        '<div id="workout" class="detail" > ' + element.externalName + ' </div>' +
        '<div id="division" class="detail"> ' + element.heatName + ' </div>' +
        '</div>' +
        '</div>'
    );
    return $item
}