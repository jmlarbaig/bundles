



var athletesDivision = {}


var height_tot = 0


function resetLeaderboard(newData) {
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
            setupLeaderboard.value.leaderboards != true ? $(".leaderboards").hide() : ""
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


        for (let athletes of data.athletes) {
            if (!divisionsNames.includes(athletes.division)) {
                divisionsNames.push(athletes.division)
            }
        }

        //! on retient le rep targets

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
            switch (overlay) {
                case 'overlay_side':
                    $tabItem = headerSide(divisionsNames, indexDivision, repTarget)
                    break;
                case 'overlay_side_v1':
                    $tabItem = headerSide(divisionsNames, indexDivision, repTarget)
                    break;
                case 'overlay_top':
                    $tabItem = headerTop(indexDivision)
                    break;
                case 'leaderboard':
                    $tabItem = headerTV(divisionsNames, indexDivision, repTarget)
                    break;
                case 'progression':
                    $tabItem = headerTV(divisionsNames, indexDivision, repTarget)
                    break;
                case 'commentator':
                    $tabItem = headerCommentator(divisionsNames, indexDivision, repTarget)
                    break;
                case 'sk':
                    $tabItem = headerScoringKairos(divisionsNames, indexDivision, repTarget)
                    break;
                case 'head_judge':
                    $tabItem = headerScoringKairos(divisionsNames, indexDivision, repTarget)
                    break;
                case 'versus':
                    $tabItem = headerVersus(indexDivision)
                    break;
                case 'overlay_wpa':
                    $tabItemBox = headerVersusTopWPA();
                    if (athletesDivision[0].length > 2) {
                        $tabItem = headerVersusWPA(divisionsNames, indexDivision)
                    }
                    break;
            }

            if (overlay == "versus" || overlay == "overlay_wpa") {
                indexDivision == 0 && $tabBox.append($tabItemBox);
                if (athletesDivision[0].length > 2) {
                    $tab.append($tabItem);
                } else {
                    indexDivision == 0 && $tab.append($tabItem);
                }
            } else {
                $tabItem.hide()

                $tab.append($tabItem);
                setTimeout(() => {
                    $tabItem.show(1000)
                })
            }

            if (overlay == 'commentator') {
                createStatsHeader(indexDivision);
            }

            let $listBox;
            let $list;
            if (overlay == "versus") {
                $list = $("#leaderboard" + indexDivision);
            } else if (overlay == "overlay_wpa") {
                $listBox = $("#topLeaderboard")
                $list = $("#leaderboard" + indexDivision + " #athletes");
                $listBox.find(".athleteTop").remove();
            } else {
                $list = $("#leaderboard" + indexDivision + " #athletes");
            }
            $list.find(".athlete").remove();

            let height_tot = 0;


            Object.values(elementDiv).forEach((elementAth, indexAthletes) => {

                let $itemBox;
                let $item;
                switch (overlay) {
                    case 'overlay_side':
                        $item = overlaySide(elementAth)
                        break;
                    case 'overlay_side_v1':
                        $item = overlaySide(elementAth)
                        break;
                    case 'overlay_top':
                        $item = overlayTop(elementAth)
                        break;
                    case 'leaderboard':
                        $item = leaderboardTV(elementAth)
                        break;
                    case 'progression':
                        $item = progressView(elementAth)
                        break;
                    case 'commentator':
                        $item = commentator(elementAth)
                        break;
                    case 'sk':
                        $item = scoringKairos(elementAth)
                        break;
                    case 'head_judge':
                        $item = scoringKairos(elementAth)
                        break;
                    case 'versus':
                        $item = leaderboardVersus(elementAth)
                        break;
                    case 'overlay_wpa':
                        console.log(athletesDivision[0].length > 2)
                        if (athletesDivision[0].length > 2) {
                            $itemBox = leaderboardVersusTopSTWPA();
                            $item = leaderboardVersusSideWPA(elementAth)
                        } else {
                            $item = leaderboardVersusTopWPA(elementAth)
                        }
                        break;
                }

                elementAth.$item = $item;
                elementAth.$item.hide()

                listOfAth.push("<span>#" + elementAth.lane + " - " + elementAth.displayName + "</span>")

                if (overlay == "versus") {
                    if (indexAthletes == 0 || indexAthletes == 1) {
                        $list.append($item);
                    }
                } else if (overlay == "overlay_wpa") {
                    if (athletesDivision[0].length > 2) {
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

                if (overlay == 'versus') {
                    elementAth.$item.slideDown(1000)
                } else {
                    if (overlay != 'overlay_side' && overlay != 'overlay_side_v1' && overlay != 'overlay_wpa') {
                        elementAth.$item.fadeIn(1000)
                    }
                }

                $('.leaderboards').find('.box_mvt').hide()

                setTimeout(() => {

                    if (overlay === 'overlay_top') { height_tot = height_top } else { (height_tot += elementAth.$item.height() + 10) }

                    if (overlay != 'commentator' && overlay != 'sk') {
                        $("#leaderboard" + indexDivision + " #athletes").height(height_tot)
                        $("#leaderboard" + indexDivision).height(height_tot + $("#leaderboard" + indexDivision + " .header").height())
                    }

                    statusHeat.status == '0' && athletesDivision[indexDivision].sort(ascendingLane);
                    if (overlay != "versus") {
                        reposition("#leaderboard" + indexDivision, athletesDivision[indexDivision]);
                    }


                }, 1000)


                if (overlay.search("overlay") >= 0) {

                    setTimeout(() => {

                        $('.leaderboard').slideDown(1000)

                        if (setupLeaderboard.value.automaticSchedule) {

                            let config = setupLeaderboard.value;

                            config.box_chrono = true;
                            config.box_heat = true;
                            setupLeaderboard.value = config;

                        } else {
                            let config = setupLeaderboard.value;

                            if (!config.box_chrono || !config.box_heat) {
                                setupLeaderboard.value = config;
                            }

                            $('.box_chrono').slideDown(1000)
                            $('.box_heat').slideDown(1000)
                        }


                        $('#box_svg').slideDown(1000)
                        setTimeout(() => {
                            if (overlay == 'overlay_side' || overlay == 'overlay_side_v1' || overlay == 'overlay_wpa') {
                                elementAth.$item.toggle("slide")
                            }

                        }, 1000)
                    }, 2000)

                } else {

                    $('.leaderboard').slideDown(1000)
                }
            })

            if (overlay == 'commentator') {
                setTimeout(() => {

                    $.fn.dataTable.ext.errMode = 'none';

                    $("#leaderboard" + indexDivision + " #table" + indexDivision).DataTable({
                        scrollY: "auto",
                        scrollX: true,
                        scrollCollapse: true,
                        paging: false,
                        fixedColumns: {
                            left: 3,
                            right: 2
                        }
                    });

                }, 100)
            }


            $('.box_bandeau').hide()
            $('.box_bandeau').find('.bandeau').remove()
            $('.box_bandeau').append(bandeau(indexDivision))
            $('#bandeau' + indexDivision).html(listOfAth.toString().replaceAll(',', ' • ').replaceAll('_', ' ').toUpperCase())

            setupLeaderboard.value.bandeau ? $('.box_bandeau').slideDown() : $('.box_bandeau').hide()


        })
    }
    catch (e) {
        console.log(e)
    }
}


function drawLine(svg) {
    var g = svg.group({ stroke: 'white', strokeWidth: 2 });
    svg.line(g, 80, 10, 80, 100);
    svg.line(g, 80, 150, 80, 850);
    // svg.line(g, 80, 950, 80, 1070);
}

