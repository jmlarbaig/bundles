
// Header Top
function headerTop(indexDivision) {
    var $headerTop = $(
        '<div id="leaderboard' + indexDivision + '" class="leaderboard">' +
        '<div id="athletes" class="athletes">' +
        '</div>' +
        '</div>'
    );

    return $headerTop
}

function bandeau(indexDivision) {
    var $beandeauBottom = $(
        '<div id="bandeau' + indexDivision + '" class="bandeau">' +
        '</div>'
    );

    return $beandeauBottom
}

function overlayTop(data) {

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/" + data.countryCode.toLowerCase() + '.svg') : (logoEvent.value[0].url);

    var $item = $(
        '<div class="athlete" id="aht' + data.lane + '">' +
        '<div class="ath initial_rank_top_ath">' +
        '<div class="rank initial_rank_top">' + data.lane + '</div>' +
        '<div class="flag">' + '<div class="box_flag" ></div> ' + '</div>' +
        '<div class="ath_sub initial_rank_top">' +
        name +
        '<div class="lane">#' + data.lane + '</div>' +
        '</div>' +
        '<div class="score initial_rank_top">O</div>' +
        '</div>' +
        '<div class="popup initial_rank_top">' + '</div>' +
        '</div>'
    );

    console.log("setupFlat", setupFlat)
    $item.find(".box_flag").css('background-image', 'url(' + flag + ')')
    $item.find(".popup").hide();
    !setupFlat.flag && $item.find(".flag").hide()
    !setupFlat.lane && $item.find(".lane").hide()
    // $item.hide();

    return $item
}
