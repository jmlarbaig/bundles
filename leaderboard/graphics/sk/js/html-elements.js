
// Header Styler

function createHeaderHeatStyle(element) {
    let $item = $(
        '<div class="cis-info-header-left">' +
        '<div class="cis-event-name" > ' + element.externalName + ' - <span id="cis-division"></span></div>' +
        '<div class="cis-heat-info"> ' + element.heatName + ' &nbsp;·&nbsp; <span id="total-reps"></span> &nbsp;·&nbsp; <span class="cis-name-stage">Platform Stage</span></div>' +
        '</div>'
    );
    return $item
}


// Header Table

function createHeaderLeaderboard(divisions, indexDivision, repTarget) {
    //! Ajouter la séparation ici
    const reps = treatReptarget(repTarget[indexDivision])

    console.log("divisions[indexDivision] : ", divisions[indexDivision])
    $('body').find('#cis-division').text(divisions[indexDivision])
    // var reps = 0;

    var $headerTop = $(
        '<div id="leaderboard' + indexDivision + '" class="leaderboard">' +
        '<div class="headerLeaderboard">' + '<div class="division">' + divisions[indexDivision] + '</div>' + '</div>' +
        '<div class="ghead">' +
        '<span>Lane</span>' +
        '<span>Battery</span>' +
        '<span>Signal</span>' +
        '<span>Devices</span>' +
        '<span>Athletes</span>' +
        '<span style="text-align:center;color:#f0c040">Rank</span>' +
        '<span>Current Movement</span>' +
        '<span class="text-align:center">Rep/Min</span>' +
        '<span class="text-align:center">Cumulative</span>' +
        '</div>' +
        '<div id="athletes" class="athletes"></div>' +
        '</div>'

    );

    $headerTop.find('.rounds').hide()
    return $headerTop
}

// CIS table style  

function createOverlayLeaderboard(data) {

    let name = treatDisplayName(data.displayName);


    let $item = $(
        '<div class="athlete grp is-crit" id="ath' + data.lane + '">' +
        '<div class="row parent off"  onclick="toggleLane(' + data.lane + ')">' +
        '<div class="lane"><span class="chev" style="visibility:hidden">▶</span><div class="no">' + data.lane + '</div><span class="vbadge vb-off">OFFLINE</span></div>' +
        '<div class="batt"> <span class="na">-</span> </div>' +
        '<div class="sig"> <span class="na">-</span> </div>' +
        '<div class="ip">' + '<div class="devstrip">' + '<span class="dchip missing" title="Rep Counter - MISSING"> </span>' + '<span class="dchip missing" title="Buzzer - MISSING"> </span>' + '</div>' + '</div>' +
        '<div class="wk-athlete"><span class="aname">' + name + '</span></div>' +
        '<div class="wk-rank"><div class="wk-rnum rn" data-lane>' + data.lane + '</div></div>' +
        '<div class="wk-mvt"><div class="wk-moff">' + "No live data" + '</div></div>' +
        '<div class="wk-pace"><div class="wk-pv">-</div><div class="wk-pl">rep/min</div></div>' +
        '<div class="wk-cum"><div class="wk-cv">-</div><div class="wk-cl">Offline</div></div>' +
        '</div>' +
        '<div class="kids"></div>' +
        '</div>'
    );


    return $item
}

