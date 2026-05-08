
function createHeaderHeatStyle(element) {
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


function createHeaderLeaderboard(divisions, indexDivision, repTarget) {
    //! Ajouter la séparation ici
    const reps = treatReptarget(repTarget[indexDivision])
    // var reps = 0;

    var $headerTop = $(
        '<div id="leaderboard' + indexDivision + '" class="leaderboard">' +
        '<div class="header">' +
        '<div class="text-nowrap text-truncate text-left division">' + divisions[indexDivision] + '</div>' +
        '<div id="mvt" class="text-nowrap text-truncate text-left"></div>' +
        '<div class="text-nowrap text-truncate" id="heatSize">0 Minos/' + (heatSize || 0) + ' Athletes</div>' +
        '</div>' +
        '<table>' +
        '<thead>' +
        '<tr>' +
        '<th fixed-side scope="col" class="lane box">LANE</th>' +
        '<th fixed-side scope="col" class="state box">STATE</th>' +
        '<th scope="col" class="box battery text-nowrap text-truncate">BATTERY</th>' +
        '<th fixed-side scope="col" class="timeAth box">SIGNAL</th>' +
        '<th fixed-side scope="col" class="repAth box">REP</th>' +
        '<th scope="col" class="box  align-items-xl-center">IP</th>' +
        '<th scope="col" class="box way align-items-xl-center">Link</th>' +
        '<th scope="col" class="flag box">FLAG</th>' +
        '<th scope="col" class="box text-nowrap text-truncate text-left name">NAME</th>' +
        '<th scope="col" class="truncate box rank">Rank</th>' +
        '<th scope="col" class="truncate box reppersec">Rep/Min</th>' +
        '<th scope="col" class="truncate box score align-items-xl-center">Scores</th>' +
        '<th scope="col" class="truncate box popup text-nowrap text-truncate">Movement</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="athletes" class="athletes">' +
        '</tbody>' +
        '</table>' +
        '</div>'

    );

    $headerTop.find('.rounds').hide()
    return $headerTop
}


function createOverlayLeaderboard(data) {

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/" + data.countryCode.toLowerCase() + '.svg') : (logoEvent.value[0].url);

    let $item = $(
        '<tr class="athlete zero" id="lane' + data.lane + '">' +
        '<td class="lane">' + data.lane + '</td>' +
        '<td class="state"></td>' +
        '<td class="battery align-items-xl-center"></td>' +
        '<td class="signal text-nowrap text-truncate"></td>' +
        // '<td class="timeAth"></td>' +
        '<td class="repAth"></td>' +
        '<td class="ip"></td>' +
        '<td class="way"></td>' +
        '<td class="flag">' + '<div class="box_flag"> </div> ' + '</td>' +
        '<td class="text-nowrap text-truncate text-left name" onclick="requestPing()" id="request_' + data.lane + '">' + name + '</td>' +
        '<td class="truncate rank">' + parseInt(data.CurrentRank) + '</td>' +
        '<td class="truncate reppersec"></td>' +
        '<td class="truncate score align-items-xl-center">' + data.score_abs + '</td>' +
        '<td class="truncate popup text-nowrap text-truncate"></td>' +
        '</tr>'
    );

    $item.find(".box_flag").css('background-image', 'url(' + flag + ')')
    $item.find(".rounds").hide();
    // $item.hide();

    return $item
}

