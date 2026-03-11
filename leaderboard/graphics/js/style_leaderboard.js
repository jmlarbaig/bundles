
// Header Side

function headerSideV1(divisions, indexDivision, repTarget) {
    //! Ajouter la séparation ici
    const reps = treatReptarget(repTarget[indexDivision])
    // var reps = 0;

    var $headerSide = $(
        '<div id="leaderboard' + indexDivision + '" class="leaderboard">' +
        '<div class="header">' +
        '<div class="text-nowrap text-truncate text-left division">' + divisions[indexDivision] + '</div>' +
        // '<div class="repTar text-nowrap text-truncate repTarget' + [indexDivision] + '">' + reps + '</div>' +
        // ' <div id="mvt" class="text-nowrap text-truncate text-left"></div>' +
        '</div>' +
        '<div id="athletes" class="athletes">' +
        '</div>' +
        '</div>'
    );
    return $headerSide
}


function overlaySideV1(data) {

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/" + data.countryCode.toLowerCase() + '.svg') : (logoEvent.value[0].url);

    let backgroundImage = "";
    if (backgroundAthlete.value != undefined) {
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


// Header Side

function headerSide(divisions, indexDivision, repTarget) {
    //! Ajouter la séparation ici
    // var reps = 0;

    var $headerSide = $(
        '<div id="leaderboard' + indexDivision + '" class="leaderboard">' +
        '<div class="header">' +
        '<div class="text-nowrap text-truncate text-left division">' + divisions[indexDivision] + '</div>' +
        // '<div class="repTar text-nowrap text-truncate repTarget' + [indexDivision] + '">' + reps + '</div>' +
        // ' <div id="mvt" class="text-nowrap text-truncate text-left"></div>' +
        '</div>' +
        '<div id="athletes" class="athletes">' +
        '</div>' +
        '</div>'
    );
    return $headerSide
}


function overlaySide(data) {

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/" + data.countryCode.toLowerCase() + '.svg') : (logoEvent.value[0].url);

    let backgroundImage = "";
    if (backgroundAthlete.value != undefined) {
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


//  Leaderboard TV

function headerTV(divisions, indexDivision, repTarget) {
    //! Ajouter la séparation ici
    const reps = treatReptarget(repTarget[indexDivision])
    // var reps = 0;

    var $headerTop = $(
        '<div id="leaderboard' + indexDivision + '" class="leaderboard">' +
        '<div class="header">' +
        '<div class="text-nowrap text-truncate text-left division">' + divisions[indexDivision] + '</div>' +
        '<div id="mvt" class="text-nowrap text-truncate text-left"></div>' +
        '<div class="repTar text-nowrap text-truncate repTarget' + [indexDivision] + '">' + reps + '</div>' +
        '</div>' +
        '<div id="athletes" class="athletes">' +
        '</div>' +
        '</div>'
    );
    return $headerTop
}


function leaderboardTV(data) {

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/" + data.countryCode.toLowerCase() + '.svg') : (logoEvent.value[0].url);

    let $item = $(
        '<div class="athlete" id="aht' + data.lane + '">' +
        // '<div class="popup text-nowrap text-truncate">' + '</div>' +
        '<div class="ath">' +
        '<div class="rank text-nowrap text-truncate"> ' + '</div>' +
        '<div class="lane text-nowrap text-truncate"># ' + data.lane + '</div>' +
        '<div class="flag">' + '<div class="box_flag" ></div> ' + '</div>' +
        // '<div class="text-nowrap text-truncate text-left name">' + name + '</div>' +
        name +
        // '<div class="text-nowrap text-truncate text-left affiliate">' + data.affiliate + '</div>' +
        '<div class="score text-nowrap text-center text-truncate"></div>' +
        '<div class="popup text-nowrap text-center text-truncate">HHH</div>' +
        '<div class="text-nowrap text-truncate rounds">' + '</div>' +
        '</div>' +
        '</div>'
    );

    $item.find(".box_flag").css('background-image', 'url(' + flag + ')')
    $item.find(".rounds").hide();
    $item.find(".score").hide();
    $item.find(".popup").hide();
    !setupFlat.flag ? $item.find(".flag").hide() : "";
    !setupFlat.lane ? $item.find(".lane").hide() : "";
    !setupFlat.lane ? $item.find(".rank").text(data.lane) : "";
    !setupFlat.affiliate ? $item.find(".affiliate").hide() : "";
    // $item.hide();

    return $item
}




function progressView(data) {

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/" + data.countryCode.toLowerCase() + '.svg') : (logoEvent.value[0].url);


    let $item = $(
        '<div class="athlete" id="aht' + data.lane + '">' +
        // '<div class="popup text-nowrap text-truncate">' + '</div>' +
        '<div class="ath">' +
        '<div class="lane text-nowrap text-truncate"># ' + data.lane + '</div>' +
        '<div class="flag">' + '<div class="box_flag" ></div> ' + '</div>' +
        // '<div class="text-nowrap text-truncate text-left name">' + name + '</div>' +
        name +
        '<div class="text-nowrap text-truncate text-left affiliate">' + data.affiliate + '</div>' +
        '<div class="rank text-nowrap text-truncate"> ' + data.rank + '</div>' +
        '<div class="circle_progress">' +
        '<svg>' +
        '<circle cx="0" cy="50%" r="20px" fill="#aeaeae" class="circle" id="circle' + data.lane + '"/>' +
        '</svg>' +
        '</div>' +
        '<div class="score text-nowrap text-center text-truncate"></div>' +
        '<div class="popup text-nowrap text-center text-truncate"></div>' +
        '<div class="text-nowrap text-truncate rounds">' + '</div>' +
        '</div>' +
        '</div>'
    );

    $item.find(".box_flag").css('background-image', 'url(' + flag + ')')
    $item.find(".rounds").hide();
    $item.find(".score").hide();
    $item.find(".popup").hide();
    !setupFlat.flag ? $item.find(".flag").hide() : "";
    !setupFlat.lane ? $item.find(".lane").hide() : "";
    !setupFlat.lane ? $item.find(".rank").text(data.lane) : "";
    !setupFlat.affiliate ? $item.find(".affiliate").hide() : "";

    // $item.hide();

    return $item
}

function headerCommentator(divisions, indexDivision, repTarget) {
    //! Ajouter la séparation ici
    const reps = treatReptarget(repTarget[indexDivision])
    // var reps = 0;

    var $headerTop = $(
        '<div id="leaderboard' + indexDivision + '" class="leaderboard">' +
        '<div class="header">' +
        '<div class="text-nowrap text-truncate text-left division">' + divisions[indexDivision] + '</div>' +
        '<div id="mvt" class="text-nowrap text-truncate text-left"></div>' +
        '<div class="repTar text-nowrap text-truncate repTarget' + [indexDivision] + '">' + reps + '</div>' +
        '</div>' +
        '<table id="table' + indexDivision + '" class="stripe row-border order-column" style="width:100%">' +
        '<thead>' +
        '<tr>' +
        '<th scope="col" class="truncate lane box">#</th>' +
        '<th scope="col" class="truncate flag box">-</th>' +
        '<th scope="col" class="truncate box text-nowrap text-truncate text-left name">NAME</th>' +
        // '<th scope="col" class="truncate box Opoint">O. Points</th>' +
        // '<th scope="col" class="truncate box Orank">O. Rank</th>' +
        '<th scope="col" class="truncate box reppersec">Rep/Min</th>' +
        '<th scope="col" class="truncate box rank">Rank</th>' +
        '<th scope="col" class="truncate box rounds text-nowrap text-truncate">Rounds</th>' +
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

function createStatsHeader(iDiv) {

    let $stat_header = $('#table' + iDiv);

    if (workouts.length > 0) {
        workouts[iDiv].mvt_id.forEach((id, index) => {
            if (index == 0) {
                let $item_header = $(
                    '<td class="stats_name text-nowrap text-truncate" id="header_stats_' + index + '">' + (workouts[iDiv].mvt_reps[index] != 0 ? workouts[iDiv].mvt_reps[index] : '') + ' ' + workouts[iDiv].mvt_names[index] + ' </td>'
                    // '<div class="mvt_id'+id+' "></div>'
                )
                $stat_header.find('.rank').after($item_header)
            } else {
                let $item_header = $(
                    '<td class="stats_name text-nowrap text-truncate" id="header_stats_' + index + '">' + (workouts[iDiv].mvt_reps[index] != 0 ? workouts[iDiv].mvt_reps[index] : '') + ' ' + workouts[iDiv].mvt_names[index] + ' </td>'
                    // '<div class="mvt_id'+id+' "></div>'
                )
                $stat_header.find('#header_stats_' + (index - 1)).after($item_header)
            }
        })
    }
    else {
        let $item_header = $(
            '<td class="stats_name text-nowrap text-truncate"></td>'
        )
        $stat_header.find('.rank').after($item_header)
    }
}

function commentator(data) {

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/" + data.countryCode.toLowerCase() + '.svg') : (logoEvent.value[0].url);
    let affiliate_team = data.affiliate != undefined ? data.affiliate : '-'

    let O_points = data.overallPoints
    let O_rank = data.rank

    if (listOverall[data.lane] != undefined) {
        O_points = listOverall[data.lane].oP
        O_rank = listOverall[data.lane].oR
    }

    let $item = $(
        '<tr class="athlete" id="aht' + data.lane + '">' +
        '<td class="truncate lane">' + data.lane + '</td>' +
        '<td class="flag">' + '<div class="box_flag"> </div> ' + '</td>' +
        '<td class="truncate name" onclick="affichageStats()" id="showStats_' + data.lane + '">' + data.displayName + '</td>' +
        // data.displayName +
        // '<td class="truncate Opoint" id="oP_' + data.lane + '">' + O_points + '</td>' +
        // '<td class="truncate Orank" id="oR_' + data.lane + '">' + O_rank + '</td>' +
        '<td class="truncate reppersec"></td>' +
        '<td class="truncate rank">' + parseInt(data.CurrentRank) + '</td>' +
        '<td class="truncate rounds text-nowrap text-truncate"></td>' +
        '<td class="truncate score align-items-xl-center">' + data.score_abs + '</td>' +
        '<td class="truncate popup text-nowrap text-truncate"></td>' +
        '</tr>'
    );

    $item.find(".box_flag").css('background-image', 'url(' + flag + ')')
    $item.find(".rounds").hide();
    // $item.hide();

    return $item
}

function createStats(data, iDiv) {

    let $stats = $('#aht' + data.lane);

    let $stat;
    // let $substats = $('<td>-</td>');

    if (workouts.length > 0) {
        workouts[iDiv].mvt_id.forEach((id, index) => {
            if (index == 0) {
                $stat = $(
                    '<td class="mvt_id mvt_id_' + index + '" id="mvt_id_' + id + '_' + data.lane + '">-</td>'
                )
                $stats.find('.rank').after($stat)
            } else {
                $stat = $(
                    '<td class="mvt_id mvt_id_' + index + '" id="mvt_id_' + id + '_' + data.lane + '">-</td>'
                )
                $stats.find('#mvt_id_' + (id - 1) + '_' + data.lane).after($stat)
            }
        })
    } else {
        $stat = $('');
        $stats.find('.rank').after($stat)
    }


}

function headerScoringKairos(divisions, indexDivision, repTarget) {
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


function scoringKairos(data) {

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


// Lane 


function laneOverlay(data) {
    let name = treatDisplayName(data.displayName);

    console.log(data.countryCode)
    let flag = (logoEvent.value[0].url);
    console.log(!Object.is(data.countryCode, null))
    if (!Object.is(data.countryCode, null)) {
        flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/" + data.countryCode.toLowerCase() + '.svg') : (logoEvent.value[0].url)
    }


    var $item = $(
        '<div class="athlete" id="aht' + data.lane + '">' +
        // '<div class="name">' + name + '</div>' +
        name +
        '<div class="rank initial_rank_top"></div>' +
        '<div class="popup_box">' +
        '<div class="score initial_rank_top"></div>' +
        '<div class="popup initial_rank_top">' + '</div>' +
        '</div>' +
        '</div>'
    );

    $item.find(".box_flag").css('background-image', 'url(' + flag + ')')
    $item.find(".popup").hide();
    !setupFlat.flag && $item.find(".flag").hide()
    !setupFlat.lane && $item.find(".lane").hide()
    // $item.hide();

    return $item
}




// HEADER VERSUS

function headerVersus(indexDivision) {
    let $headerTop = $(
        '<div id="leaderboard' + indexDivision + '" class="leaderboard">' +
        '</div>' +
        '<div class= "box_mvt" >' +
        '<div id="mvt" class="text-nowrap text-truncate"></div>' +
        '</div >'
    );


    return $headerTop
}

function leaderboardVersus(data) {
    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/" + data.countryCode.toLowerCase() + '.svg') : (logoEvent.value[0].url);


    let $item = $(
        '<div class="athlete" id="aht' + data.lane + '">' +
        '<div class="triangle"> </div>' +
        '<div class="ath_detail">' +
        '<div class="ath">' +
        '<div class="rank initial_rank_versus">' + data.lane + '</div>' +
        // '<div class="name">' + name + '</div>' +
        name +
        '<div class="score"></div>' +
        '</div>' +
        '<div class="popup initial_rank_versus">' + '</div>' +
        '</div>' +
        '</div>'
    );
    $item.find(".box_flag").css('background-image', 'url(' + flag + ')')
    $item.find(".popup").hide();
    !setupFlat.flag && $item.find(".flag").hide()
    !setupFlat.lane && $item.find(".lane").hide()

    return $item
}


// HEADER VERSUS HYPERFIT

function headerVersusHyperfit(indexDivision) {
    let $headerTop = $(
        '<div id="leaderboard' + indexDivision + '" class="leaderboard">' +
        '</div>'
    );


    return $headerTop
}

function leaderboardVersusHyperfit(data) {
    let name = treatDisplayName(data.displayName);
    let $item = $(
        '<div class="athlete" id="aht' + data.lane + '">' +
        // '<div class="name">' + name + '</div>' +
        name +
        '<div class="score"></div>' +
        '<div class="popup">' + '</div>' +
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



function headerVersusTopWPA() {
    let $headerTop = $(
        '<div id="topLeaderboard' + '" class="topLeaderboard">' +
        '</div>'
    );
    return $headerTop
}


function headerVersusWPA(divisions, indexDivision) {
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

function leaderboardVersusTopSTWPA() {


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
    }


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
    $item.find(".popup_top").hide();

    return $item
}

function leaderboardVersusSideWPA(data) {

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/" + data.countryCode.toLowerCase() + '.svg') : (logoEvent.value[0].url);

    console.log(" Leaderboard Versus Display", data)
    let pathTobgimg = "./../img/"
    let backgroundImage = "";
    if (data.affiliate != undefined) {
        if (data.affiliate.toLowerCase().includes('world')) {
            pathTobgimg = "./../graphics/img/cadre_world.png"
        } else if (data.affiliate.toLowerCase().includes('north')) {
            pathTobgimg = "./../graphics/img/cadre_north_america.png"
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
    $item.find(".score").hide();
    $item.find(".popup").hide();
    heat.typeWod != 'repmax' ? $item.find(".rank").show() : $item.find(".rank").hide();
    !setupFlat.flag ? $item.find(".flag").hide() : "";
    !setupFlat.lane ? $item.find(".lane").hide() : "";
    !setupFlat.lane ? $item.find(".rank").text(data.lane) : "";
    // $item.hide();

    return $item
}