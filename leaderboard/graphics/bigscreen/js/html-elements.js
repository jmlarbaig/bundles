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
        '<div class="titleCell titleAthlete">Athlete</div>' +
        '<div class="titleCell titleReps">Reps</div>' +
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
        // '<div class="popup text-nowrap text-truncate">' + '</div>' +
        '<div class="laneCell lane text-nowrap text-truncate">L' + data.lane + '</div>' +
        name +
        '<div class="scoreCell score text-nowrap text-center text-truncate"></div>' +
        '<div class="rankCell rank text-nowrap text-truncate"> ' + data.rank + '</div>' +
        '</div>'
    );

    // $item.hide();

    return $item
}