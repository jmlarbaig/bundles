function createHeaderHeatStyle(element) {
    let $item = $(
        '<div class="heat_content">' +
        '<div id="workout"  > ' + element.externalName + ' </div>' +
        '<div id="division" > ' + element.heatName + ' </div>' +
        '</div>'
    );
    return $item
}




//  Leaderboard TV

function createHeaderLeaderboard(divisions, indexDivision, repTarget) {
    //! Ajouter la séparation ici
    const reps = treatReptarget(repTarget[indexDivision])
    // var reps = 0;

    var $headerTop = $(
        '<div id="leaderboard' + indexDivision + '" class="leaderboard">' +
        '<div class="headerCells">' +
        // '<div class="text-nowrap text-truncate text-left division">' + divisions[indexDivision] + '</div>' +
        '<div class="titleCell titleLane">Lane</div>' +
        '<div class="titleCell titleName">Athlete</div>' +
        '<div class="titleCell titleScore"></div>' +
        '<div class="titleCell titleRank">Rank</div>' +
        '</div>' +
        '<div id="athletes" class="athletes">' +
        '</div>' +
        '</div>'
    );
    return $headerTop
}



function createOverlayLeaderboard(data) {

    let name = treatDisplayName(data.displayName);


    let $item = $(
        '<div class="athlete" id="aht' + data.lane + '">' +
        '<div class=athleteDetails>' +
        '<div class=athleteGroup>' +
        '<div class="athleteRow"></div>' +
        '<div class="laneCell laneItem lane ">L' + data.lane + '</div>' +
        name +
        '<div class="scoreCell score scoreItem"></div>' +
        '</div></div>' +
        '<div class="rankDetails">' +
        '<div class="upOrdownItem"></div>' +
        '<div class="rankCell rank rankItem"> ' + data.rank + '</div>' +
        '</div>' +
        '</div>'

    );

    // $item.hide();

    return $item
}