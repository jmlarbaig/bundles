
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
        '<table id="table' + indexDivision + '" class="cis-table">' +
        '<thead>' +
        '<tr class="first-tr">' +
        '<th scope="col" class="col-lane s0">Lane</th>' +
        '<th scope="col" class="col-name s42">Athlete</th>' +
        '<th scope="col" class="col-rank-live s94">Rank</th>' +
        '<th scope="col" class="col-mvt-current s214">Current Movement</th>' +
        '<th scope="col" class="col-pace">Rep/Min</th>' +
        '<th scope="col" class="col-cumulative">Cumulative</th>' +
        '</tr>' +
        '<tr class="fastest-row">' +
        '<th scope="col" class="s0" style="background:#0a100a;"></th>' +
        '<th scope="col" class="s42" style="background:#0a100a;"></th>' +
        '<th scope="col" class="s94" style="background:#0a100a;"></th>' +
        '<th scope="col" class="s214" style="background:#0a100a;"></th>' +
        '<th scope="col" class="" style="background:#0a100a;"></th>' +
        '<th scope="col" id="end-fastest-row" class="" style="background:#0a100a;"></th>' +
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

// Stats Header

function createStatsHeader(iDiv) {

    let $stat_header = $('#table' + iDiv);

    if (workouts.length > 0) {
        workouts[iDiv].mvt_id.forEach((id, index) => {
            if (index == 0) {
                let $item_header = $(
                    '<th class="col-mvt stats_name" id="header_stats_' + index + '">MVT ' + (index + 1) + '<br><span style="font-size:7px;font-weight:400;ccolor: #e8e8f0;">' + (workouts[iDiv].mvt_reps[index] != 0 ? workouts[iDiv].mvt_reps[index] : '') + ' ' + workouts[iDiv].mvt_names[index] + '</span></th>'
                )
                $stat_header.find('.col-cumulative').after($item_header)

                let $item_header_fastest = $(
                    '<th id="header_fastest_' + index + '" style="background:#0a100a;padding:4px 10px;text-align:center;"><div class="fastest-empty">—</div></th>'
                );

                $stat_header.find('#end-fastest-row').after($item_header_fastest)

            } else {
                let $item_header = $(
                    '<th class="col-mvt stats_name" id="header_stats_' + index + '">MVT ' + (index + 1) + '<br><span style="font-size:7px;font-weight:400;ccolor: #e8e8f0; ">' + (workouts[iDiv].mvt_reps[index] != 0 ? workouts[iDiv].mvt_reps[index] : '') + ' ' + workouts[iDiv].mvt_names[index] + '</span></th>'
                )
                $stat_header.find('#header_stats_' + (index - 1)).after($item_header)

                let $item_header_fastest = $(
                    '<th id="header_fastest_' + index + '" style="background:#0a100a;padding:4px 10px;text-align:center;"><div class="fastest-empty">—</div></th>'
                );

                $stat_header.find('#header_fastest_' + (index - 1)).after($item_header_fastest)

            }
        })
    }
    else {
        let $item_header = $(
            '<td class="stats_name"></td>'
        )
        $stat_header.find('.col-cumulative').after($item_header)
    }
}

// CIS table style  

function createOverlayLeaderboard(data) {

    let name = treatDisplayName(data.displayName);


    let $item = $(
        '<tr class="athlete" id="aht' + data.lane + '">' +
        '<td class="lane-cell s0"> <div class="lane-inner lane">L' + data.lane + '</div></td>' +
        // '<td class="flag">' + '<div class="box_flag"> </div> ' + '</td>' +
        '<td class="s42" onclick="affichageStats()" id="showStats_' + data.lane + '"> <div class="name-cell"><div class="athlete-name-cis">' + data.displayName + '</div></div></td>' +
        '<td class="rank-cell s94"> <div class="rank-inner"><div class="rank-num rank-n-txt rank">' + parseInt(data.CurrentRank) + '</div><div class="rank-change rank-same">-</div></div></td>' +
        '<td class="s214">' +
        ' <div class="current-mvt-cell">' +
        '   <div class="current-mvt-name mvt-name"><span class="current-mvt-dot"></span></div>' +
        '   <div class="current-mvt-progress mvt-rep"></div>' +
        '   <div class="progress-bar-wrap"><div class="progress-bar-track"><div class="progress-bar-fill" style="width:100%;"></div></div><div class="progress-bar-label "></div></div>' +
        '   </div>' +
        '</td>' +
        '<td class=" pace-cell"><div class="pace-val"></div><div class="pace-label">rep/min</div></td>' +
        '<td class=" cumul-cell"> <div class="score cumul-val">' + data.score_abs + '</div><div class="cumul-label"></div></td>' +
        '</tr>'
    );


    return $item
}

// CIS table style  

function createStats(data, iDiv) {

    let $stats = $('#aht' + data.lane);

    let $stat;
    // let $substats = $('<td>-</td>');

    if (workouts.length > 0) {
        workouts[iDiv].mvt_id.forEach((id, index) => {
            if (index == 0) {
                $stat = $(
                    '<td class="mvt-cell mvt_id mvt_id_' + index + '" id="mvt_id_' + id + '_' + data.lane + '"><div class="mvt-done"><div class="mvt-cycle"></div><div class="mvt-cumul"></div></div></div></td>'
                )
                $stats.find('.cumul-cell').after($stat)
            } else {
                $stat = $(
                    '<td class="mvt-cell mvt_id mvt_id_' + index + '" id="mvt_id_' + id + '_' + data.lane + '"><div class="mvt-done"><div class="mvt-cycle"></div><div class="mvt-cumul"></div></div></div></td>'
                )
                $stats.find('#mvt_id_' + (id - 1) + '_' + data.lane).after($stat)
            }
        })
    } else {
        $stat = $('');
        $stats.find('.cumul-cell').after($stat)
    }
}
