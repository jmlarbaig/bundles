function createHeaderHeatStyle(element) {
    let $item = $(
        '<div class="heat_content">' +
        '<div class="details">' +
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
    let $item = $('<div id="athletesTopLeaderboard' + '" class="athletesTopLeaderboard">' + '</div>');
    teamInArray.forEach((teamName) => {
        const $athlete = $(
            `<div class="athleteTop" id="ahtTop${teamName.name}">` +
            '<div class="athTopBorder">' +
            '<div class="athTop" style="background-color: ' + teamName["background-color"] + '; color: ' + teamName.color + ';">' +
            '<div class="nameTop">' + teamName.name + '</div>' +
            '<div class="scoreTop"></div>' +
            '</div>' +
            '</div>' +
            '<div class="popupTop"></div>' +
            '<div class="team-progress" > ' +
            '<div class="progress-segments"></div>' +
            '<div class="progress-label"></div>' +
            '</div>' +
            '</div>'
        );
        $item.append($athlete);
    });


    return $item;
}


function leaderboardVersusTopWPA(data) {
    let name = '   ';
    if (!teamInArray.includes(data.displayName)) {
        name = treatDisplayName(data.displayName);
    }

    if (!teamInArray.some(team => team.name === data.affiliate)) {
        name = treatDisplayName(data.affiliate);
    }

    let backgroundColor = "";
    let colorName = "";
    if (teamInArray.some(team => team.name === data.affiliate)) {
        let team = teamInArray.find(team => team.name === data.affiliate);
        backgroundColor = team["background-color"];
        colorName = team.color;
    }

    let $itemBox = $(
        '<div class="athleteTop" id="ahtTop' + data.displayName.toUpperCase() + '">' +
        '<div class="athTopBorder">' +
        '<div class="athTop" style="background-color: ' + backgroundColor + '; color: ' + colorName + ';">' +
        '<div class="nameTop">' + name + '</div>' +
        '<div class="scoreTop">-</div>' +
        '</div>' +
        '</div>' +
        '<div class="popupTop"></div>' +
        '<div class="team-progress" > ' +
        '<div class="progress-segments"></div>' +
        '<div class="progress-label"></div>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    $itemBox.find(".name").addClass("nameTop");
    $itemBox.find(".name").removeClass("name");

    return $itemBox
}


function createOverlayLeaderboard(data) {

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/" + data.countryCode.toLowerCase() + '.svg') : (logoEvent.value[0].url);

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

    let backgroundColor = "";
    let colorName = "";
    if (teamInArray.some(team => team.name === data.affiliate)) {
        let team = teamInArray.find(team => team.name === data.affiliate);
        backgroundColor = team["background-color-overlay"];
        colorName = team.color;
    }

    let $item = $(
        '<div class="athlete" style="background-color: ' + backgroundColor + '; id="aht' + data.lane + '">' +
        '<div class="popup text-nowrap text-truncate">' + '</div>' +
        '<div class="ath">' +
        '<div class="rank text-nowrap text-truncate"> ' + data.lane + '</div>' +
        name +
        '<div class="score text-nowrap text-center text-truncate"></div>' +
        '<div class="text-nowrap text-truncate rounds">' + '</div>' +
        '</div>' +
        '</div>'
    );

    // $item.find('.ath').css('background-image', backgroundImage)
    // $item.find('.ath').css('background-color', backgroundColor);

    if (colorName != "") {

        $item.find(".ath .name").css('color', colorName);
    }

    $item.find(".box_flag").css('background-image', 'url(' + flag + ')')
    $item.find(".rounds").hide();
    // $item.find(".score").hide();
    $item.find(".popup").hide();
    heat.typeWod != 'repmax' ? $item.find(".rank").show() : $item.find(".rank").hide();
    !setupFlat.flag ? $item.find(".flag").hide() : "";
    // !setupFlat.lane ? $item.find(".lane").hide() : "";
    !setupFlat.lane ? $item.find(".rank").text(data.lane) : "";
    // $item.hide();

    return $item
}