



var athletesDivision = {}


var height_tot = 0


function resetLeaderboard(newData) {
    console.log("Start resetLeaderboard")
    try {

        if (overlay == "overlay_wpa") {
            $("#ath_left").find('.score').text('')
            $("#ath_right").find('.score').text('')
        }

        var data = { athletes: "" }
        data.athletes = newData
        // console.log("Static Data = ", staticData)
        // ! On prend le tableau

        if (overlay.search("overlay") >= 0) {
            setupFlat.leaderboards != true ? $(".leaderboards").hide() : ""
        }

        if (overlay == "overlay_wpa") {
            $('.rank').hide()
            $("#ath_left").find('.score').text('')
            $("#ath_right").find('.score').text('')
        }


        //! on traite le wod en cours 

        athletesDivision = []

        // ! On récupère toutes les divisions présentes dans la heat en cours

        var divisionsNames = []
        var repTarget = [];

        let listOfAth = [];

        console.log("data.athletes : ", data.athletes)
        // if (overlay != 'overlay_wpa') {
        for (let athletes of data.athletes) {
            if (!divisionsNames.includes(athletes.division)) {
                divisionsNames.push(athletes.division)
            }
        }



        //! on retient le rep targets

        // if (overlay != 'overlay_wpa') {
        for (let y = 0; y < divisionsNames.length; y++) {
            for (let wod of workouts) {
                if (divisionsNames[y] == wod.division) {
                    repTarget[y] = wod.total_reps
                    workouts[y] = wod;
                }
            }
        }


        //! Initialisation des athletes dans un seul format avec un triage par division
        // ! On crée un tableau par division
        athletesDivision = treatDivisions(divisionsNames, data.athletes)

        var $tabBox = $(".box_heat")
        $tabBox.find(".topLeaderboard").remove();

        var $tab = $(".leaderboards")
        $tab.find(".leaderboard").remove();




        // ! On crée un leaderboard par division
        Object.values(athletesDivision).forEach((elementDiv, indexDivision) => {


            listOfAth.push("<span>#" + divisionsNames[indexDivision] + "</span>")

            let $tabItemBox;
            let $tabItem;
            $tabItem = createHeaderLeaderboard(divisionsNames, indexDivision, repTarget);

            // à rajouter avec un return 
            // $tabItemBox = headerVersusTopWPA();


            if (overlay == "versus" || overlay == "overlay_wpa") {
                console.log("$tabItemBox : ", $tabItemBox)
                indexDivision == 0 && $tabBox.append($tabItemBox);
                if (athletesDivision[0].length > 2) {
                    $tab.append($tabItem);
                } else {
                    indexDivision == 0 && $tab.append($tabItem);
                }
            } else {
                $tabItem.hide()

                $tab.append($tabItem);
                if (overlay.includes("versus")) {

                    $tabItem.show()
                } else {

                    setTimeout(() => {
                        $tabItem.show(1000)
                    })
                }
            }

            if (overlay == 'commentator') {
                createStatsHeader(indexDivision);
            }

            let $listBox;
            let $list;
            if (overlay.includes("versus")) {
                $list = $("#leaderboard" + indexDivision);
            } else if (overlay == "overlay_wpa") {
                $listBox = $("#topLeaderboard")
                $list = $("#leaderboard" + indexDivision + " #athletes");
                if (athletesDivision[0].length > 2) {
                    $listBox.find(".athleteTop").remove();
                } else {
                    indexDivision == 0 && $listBox.find(".athleteTop").remove();
                }
            } else {
                $list = $("#leaderboard" + indexDivision + " #athletes");
            }
            $list.find(".athlete").remove();

            let height_tot = 0;


            Object.values(elementDiv).forEach((elementAth, indexAthletes) => {

                // Pour le bandeau du bas
                listOfAth.push("<span>#" + elementAth.lane + " - " + elementAth.displayName + "</span>")

                let $itemBox;
                let $item;

                $item = createOverlayLeaderboard(elementAth)

                // A rajouter avec return
                // $itemBox = leaderboardVersusTopSTWPA();


                elementAth.$item = $item;
                if (overlay != "overlay_wpa" && elementDiv.length <= 2) {
                    elementAth.$item.hide()
                }


                if (overlay.includes("versus")) {
                    if (indexAthletes == 0 || indexAthletes == 1) {
                        $list.append($item);
                    }
                } else if (overlay == "overlay_wpa") {
                    if (elementDiv.length > 2) {
                        indexAthletes == 0 && $listBox.append($itemBox);
                        $list.append($item);
                    } else {
                        $listBox.append($item);
                    }
                } else {

                    $list.append($item);

                    if (overlay == 'commentator') {
                        createStats(elementAth, indexDivision);
                    }
                }

                $('.leaderboards').find('.box_mvt').hide()

                setTimeout(() => {

                    if (overlay.includes('overlay_top')) { height_tot = height_top } else { (height_tot += elementAth.$item.height() + 10) }

                    if (overlay != 'commentator' && overlay != 'sk') {
                        $("#leaderboard" + indexDivision + " #athletes").height(height_tot)
                        $("#leaderboard" + indexDivision).height(height_tot + $("#leaderboard" + indexDivision + " .header").height())
                    }

                    statusHeat.status == '0' && athletesDivision[indexDivision].sort(ascendingLane);
                    if (!overlay.includes("versus")) {
                        reposition("#leaderboard" + indexDivision, athletesDivision[indexDivision]);
                    }


                }, 1000)


            })


            $('.box_bandeau').hide()
            $('.box_bandeau').find('.bandeau').remove()
            $('.box_bandeau').append(bandeau(indexDivision))
            $('#bandeau' + indexDivision).html(listOfAth.toString().replaceAll(',', ' • ').replaceAll('_', ' ').toUpperCase())

            setupFlat.bandeau ? $('.box_bandeau').slideDown() : $('.box_bandeau').hide()


        })
    }
    catch (e) {
        console.log(e)
    }
}



function resetHeat(data) {

    try {

        let $item;

        $item = createHeaderHeatStyle(data);

        if (overlay.includes('overlay')) {
            console.log("setupFlat.heat", setupFlat.heat)
            setupFlat.heat != true ? $(".box_heat").hide() : $(".box_heat").show();
        }

        if (overlay === 'commentator') {
            var $list = $(".cis-info-header-left");
            $list.empty();
            $list.append($item);
        } else {
            var $list = $(".box_heat");
            $list.empty();
            $list.append($item);
        }
    }
    catch (e) {
        console.log(e)
    }
}
