function createHeaderHeatStyle(element) {
    let $item = $(
        '<div class="heat_content">' +
        '<div class="details">' +
        '<div class="detail workout" > ' + element.externalName + ' //</div>' +
        '<div id="mvt" class="mvt text-nowrap text-truncate"></div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    return $item
}


// Header Versus WPA
function headerSideWPA(divisions, indexDivision) {
    //! Ajouter la séparation ici
    var $headerSide = $(
        '<div id="leaderboard' + indexDivision + '" class="leaderboard">' +
        '<div class="header">' +
        '<div class="text-nowrap text-truncate text-left division">' + divisions[indexDivision] + '</div>' +
        // '<div class="repTar text-nowrap text-truncate repTarget' + [indexDivision] + '">' + reps + '</div>' +
        '</div>' +
        '<div id="athletes" class="athletes">' +
        '</div>' +
        '</div>'
    );
    return $headerSide
}

function createHeaderVersusTopWPA() {
    let $headerTop = $(
        '<div id="topLeaderboard' + '" class="topLeaderboard">' +
        '</div>'
    );
    return $headerTop
}

function createHeaderLeaderboard(divisions, indexDivision) {
    let $headerTop = $(
        '<div id="leaderboard' + indexDivision + '" class="leaderboard">' +
        '<div class="header">' +
        // '<div class="text-nowrap text-truncate text-left division">' + divisions[indexDivision] + '</div>' +
        '<div class="text-nowrap text-truncate text-left division"></div>' +
        '</div>' +
        '<div id="athletes" class="athletes">' +
        '</div>' +
        '</div>'
    );


    return $headerTop
}

function createTopLeaderboardWPA() {
    let $item = $(
        '<div class="athleteTop" id="ahtTop1">' +
        '<div class="athTop_detail">' +
        '<div class="athTop">' +
        '<div class="name"></div>' +
        '<div class="score"></div>' +
        '</div>' +
        // '<div class="popup_top initial_rank_versus">' + '</div>' +
        '</div>' +
        '</div>' +
        '<div class="athleteTop" id="ahtTop2">' +
        '<div class="athTop_detail">' +
        '<div class="athTop">' +
        '<div class="name"></div>' +
        '<div class="score"></div>' +
        '</div>' +
        // '<div class="popup_top initial_rank_versus">' + '</div>' +
        '</div>' +
        '</div>'
    );
    $item.find(".popup_top").hide();

    return $item
}


function leaderboardVersusTopWPA(data) {
    let name = '   ';
    if (!data.displayName.toLowerCase().includes('world') && !data.displayName.toLowerCase().includes('north')) {
        name = treatDisplayName(data.displayName);
    } else {
        // name = data.displayName.replaceAll('team', '').replaceAll('Team', '').replaceAll('TEAM', '')
    }

    // let pathTobgimg = "./../img/"
    // let backgroundImage = "";
    // if (data.affiliate != undefined) {
    //     if (data.affiliate.toLowerCase().includes('world')) {
    //         pathTobgimg = "./../assets/wza/cadre_world.png"
    //     } else if (data.affiliate.toLowerCase().includes('north')) {
    //         pathTobgimg = "./../assets/wza/cadre_north_america.png"
    //     }
    //     backgroundImage = 'url(' + pathTobgimg + ')'
    // }


    let $item = $(
        '<div class="athleteTop" id="ahtTop' + data.lane + '">' +
        '<div class="athTop_detail">' +
        '<div class="athTop">' +
        // '<div class="name">' + name + '</div>' +
        name +
        // '<div class="name"></div>' +
        '<div class="score">0</div>' +
        '</div>' +
        // '<div class="popup_top initial_rank_versus">' + '</div>' +
        '</div>' +
        '</div>'
    );
    // $item.find('.athTop').css('background-image', backgroundImage)
    $item.find(".popup_top").hide();

    return $item
}

function createOverlayLeaderboard(data) {

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/" + data.countryCode.toLowerCase() + '.svg') : (logoEvent.value[0].url);

    let pathTobgimg = "./../img/"
    let backgroundImage = "";
    if (data.affiliate != undefined) {
        if (data.affiliate.toLowerCase().includes('world')) {
            pathTobgimg = "./../assets/wza/cadre_world.png"
        } else if (data.affiliate.toLowerCase().includes('north')) {
            pathTobgimg = "./../assets/wza/cadre_north_america.png"
        }
        backgroundImage = 'url(' + pathTobgimg + ')'
    }


    let $item = $(
        '<div class="athlete" id="aht' + data.lane + '">' +
        '<div class="popup text-nowrap text-truncate">' + '</div>' +
        '<div class="ath">' +
        '<div class="rank text-nowrap text-truncate"> ' + '</div>' +
        // '<div class="lane text-nowrap text-truncate"># ' + data.lane + '</div>' +
        '<div class="flag">' + '<div class="box_flag" ></div> ' + '</div>' +
        // '<div class="text-nowrap text-truncate text-left name">' + name + '</div>' +
        name +
        '<div class="score text-nowrap text-center text-truncate"></div>' +
        '<div class="text-nowrap text-truncate rounds">' + '</div>' +
        '</div>' +
        '</div>'
    );

    $item.find('.ath').css('background-image', backgroundImage)

    $item.find(".box_flag").css('background-image', 'url(' + flag + ')')
    $item.find(".rounds").hide();
    // $item.find(".score").hide();
    $item.find(".popup").hide();
    heat.typeWod != 'repmax' ? $item.find(".rank").show() : $item.find(".rank").hide();
    !setupFlat.flag ? $item.find(".flag").hide() : "";
    !setupFlat.lane ? $item.find(".lane").hide() : "";
    !setupFlat.lane ? $item.find(".rank").text(data.lane) : "";
    // $item.hide();

    return $item
}