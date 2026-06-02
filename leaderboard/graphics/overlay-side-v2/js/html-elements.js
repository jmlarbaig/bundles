function createHeaderHeatStyle(element) {
    let $item = $(
        '<div id="workout" class="m-auto text-nowrap text-truncate workout" > ' + element.externalName + ' </div>' +
        '<div id="heat" class="m-auto text-nowrap text-truncate heat"> ' + element.heatName + '</div>' +
        '<div id="mvt" class="mvt text-nowrap text-truncate"></div>'
    );
    return $item
}

// Header Top
function createHeaderLeaderboard(divisionsNames, indexDivision, repTarget) {
    //! Ajouter la séparation ici
    // var reps = 0;

    var $headerSide = $(
        '<div id="leaderboard' + indexDivision + '" class="leaderboard">' +
        '<div class="header">' +
        '<div class="text-nowrap text-truncate text-left division">' + divisionsNames[indexDivision] + '</div>' +
        // '<div class="repTar text-nowrap text-truncate repTarget' + [indexDivision] + '">' + reps + '</div>' +
        // ' <div id="mvt" class="text-nowrap text-truncate text-left"></div>' +
        '</div>' +
        '<div id="athletes" class="athletes">' +
        '</div>' +
        '</div>'
    );
    return $headerSide
}

function bandeau(indexDivision) {
    var $beandeauBottom = $(
        '<div id="bandeau' + indexDivision + '" class="bandeau">' +
        '</div>'
    );

    return $beandeauBottom
}

function createOverlayLeaderboard(data) {


    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/" + data.countryCode.toLowerCase() + '.svg') : (logoEvent.value[0].url);

    let backgroundImage = "";
    console.log(backgroundImage)
    if (backgroundAthlete.value != "") {
        console.log("backgroundAthlete.value", backgroundAthlete.value)
        backgroundImage = 'url(' + backgroundAthlete.value[0].url + ')'
    }


    let $item = $(
        '<div class="athlete" id="aht' + data.lane + '">' +
        '<div class="popup text-nowrap text-truncate">' + '</div>' +
        '<div class="ath" style="background-image: ' + backgroundImage + '">' +
        '<div class="triangle"></div>' +
        '<div class="subrank"><div class="rank text-nowrap text-truncate"> ' + '</div></div>' +
        '<div class="lane text-nowrap text-truncate">L' + data.lane + '</div>' +
        '<div class="flag">' + '<div class="box_flag" ></div> ' + '</div>' +
        name +
        '<div class="score text-nowrap text-center text-truncate"></div>' +
        '<div class="text-nowrap text-truncate rounds">' + '</div>' +
        '</div>' +

        '</div>'
    );

    $item.find(".box_flag").css('background-image', 'url(' + flag + ')')
    $item.find(".rounds").hide();
    // $item.find(".score").hide();
    $item.find(".popup").hide();
    $item.find(".lane").hide();


    $item.find(".triangle").hide();

    !setupFlat.flag ? $item.find(".flag").hide() : "";
    // !setupFlat.lane ? $item.find(".lane").hide() : "";
    // !setupFlat.lane ? $item.find(".rank").text(data.lane) : "";
    $item.find(".rank").text(data.lane)
    // $item.hide();

    return $item
}

