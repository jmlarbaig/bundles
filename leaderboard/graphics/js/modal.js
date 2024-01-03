
function affichageStats() {

    let _lane = parseInt(event.target.id.replace('showStats_', ''))
    $('#myModal').find('#card').remove()

    let $modal = $()

    if (listCis.value.length > 0 && listCis.value[_lane] != undefined) {

        if (listCis.value[_lane].type == 'individual') {
            $modal = createIndiv(listCis.value[_lane])
        } else {
            $modal = createTeam(listCis.value[_lane])
        }

    } else {

        $modal = $(
            '<div id="card" class="modal-content">' +
            '<span class="close">&times;</span>' +
            '<p>There is no athlete(s) / Team data.</p>' +
            '</div>'
        )
    }
    $('#myModal').append($modal)
    $('#myModal').slideDown(1000)

    document.getElementsByClassName('close')[0].addEventListener('click', () => {
        $('#myModal').slideUp(1000)
    })

}


function createTeam(data) {
    console.log(data)
    const { ath, workoutRank, participantName, division, lane, points, rank, type, countryCode, instagram, qualifierRank } = data

    let $modal = $(
        '<div id="card" class="modal-content">' +
        '<span class="close">&times;</span>' +
        '<div class="box_infos">' +
        '<div class="infos">' +
        '<h2>' + participantName + '</h2>' +
        '<h4>Division : ' + division + '</h4>' +
        '<h4>Overall Ranking : ' + rank + '° / ' + points + 'PTS</h4>' +
        '</div>' +
        '<table id="workouts" class="workouts">' +
        '<tbody>' +
        '<tr>' +
        '<th> Name Workout</th>' +
        '<th> Rank </th>' +
        '<th> Result </th>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div id="athletes" class="athletes"></div>' +
        '</div>'
    )

    Object.values(workoutRank).forEach((wod, index) => {
        let $wod = $(
            '<tr class="wod">' +
            '<td>' + wod.name + '</td>' +
            '<td>' + wod.rank + '</td>' +
            '<td>' + wod.result + '</td>' +
            '</tr>'
        )

        $modal.find('#workouts tbody').append($wod)
    })

    Object.values(ath).forEach((athlete, index) => {

        const { age, height, weight, benchmarks, avatarPath, crossfitAffiliateName, facebook, fullName, gender, accountId, sponsors, latestEvents, selfDescription } = athlete

        let $athlete = $(
            '<div class="athlete" id="' + accountId + '">' +
            '<div class="first">' +
            '<div class="avatar"></div>' +
            '<div class="details">' +
            '<h3>' + fullName + '</h3>' +
            '<h4>' + (crossfitAffiliateName || '-') + '</h4>' +
            '<h4>' + (age || '-') + ' years - ' + (height || '-') + 'cm - ' + (weight || '-') + 'kg</h4>' +
            '</div>' +
            '</div>' +
            '<div class="second">' +
            '<table id="events_' + accountId + '" class="events">' +
            '<thead>' +
            '<tr>' +
            '<th> Event</th>' +
            '<th> Rank </th>' +
            '<th> Division </th>' +
            '</tr>' +
            '</thead>' +
            '<tbody></tbody>' +
            '</table>' +
            '<div id="benchmarks_' + accountId + '" class="benchmarks"></div>' +
            '<div id="sponsors_' + accountId + '" class="sponsors"></div>' +
            '</div>' +
            '</div>'
        )

        $modal.find('#athletes').append($athlete)
        $athlete.find('.avatar').css('background-image', 'url(' + avatarPath + ')')

        if (latestEvents != undefined && latestEvents.length > 0) {
            latestEvents.forEach((event, index) => {
                let $event = $(
                    '<tr class="events">' +
                    '<td>' + event.eventName + '</td>' +
                    '<td>' + event.rank + '</td>' +
                    '<td>' + event.division + '</td>' +
                    '</tr>'
                )
                $modal.find('#events_' + accountId).append($event)
            })
        }

        if (benchmarks != undefined) {
            Object.keys(benchmarks).forEach((benchmark, index) => {
                let $benchmark = $(
                    '<div class="benchmark">' +
                    '<div>' + benchmark.toUpperCase() + '</div>' +
                    '<div>' + (benchmarks[benchmark] || '-') + '</div>' +
                    '</div>'
                )
                $modal.find('#benchmarks_' + accountId).append($benchmark)
            })
        }

        if (sponsors != undefined && sponsors.length > 0) {
            Object.values(sponsors).forEach((sponsor, index) => {
                let $sponsors = $(
                    '<div class="sponsors">' +
                    '</div>'
                )
                $modal.find('#sponsors_' + accountId).append($sponsors)
            })
        }
    })

    return $modal
}

function createIndiv(data) {
    console.log(data)
    const { ath, workoutRank, benchmarks, division, lane, points, rank, type, countryCode, instagram, avatarPath, affiliate, height, weight, qualifierRank } = data
    const { age, crossfitAffiliateName, facebook, fullName, gender, accountId, sponsors, latestEvents, selfDescription } = ath[0]

    let $modal = $(
        '<div id="card" class="modal-content">' +
        '<span class="close">&times;</span>' +
        '<div class="box_infos" id="' + accountId + '">' +
        '<div class="avatar"></div>' +
        '<div class="infos">' +
        '<h2>' + fullName + '</h2>' +
        '<h4>Affiliate : ' + (affiliate || crossfitAffiliateName || '-') + '</h4>' +
        '<h4>' + (age || '-') + ' years - ' + (height || '-') + ' cm - ' + (weight || '-') + ' kg</h4>' +
        '<h4>Division : ' + division + '</h4>' +
        '<h4>Overall Ranking : ' + rank + '° / ' + points + 'PTS</h4>' +
        '</div>' +
        '<div class="sup">' +
        '<table id="workouts" class="workouts">' +
        '<thead>' +
        '<tr>' +
        '<th> Name Workout</th>' +
        '<th> Rank </th>' +
        '<th> Result </th>' +
        '</tr>' +
        '</thead>' +
        '<tbody></tbody>' +
        '</table>' +
        '<table id="events_' + accountId + '" class="events">' +
        '<thead>' +
        '<tr>' +
        '<th> Event</th>' +
        '<th> Rank </th>' +
        '<th> Division </th>' +
        '</tr>' +
        '</thead>' +
        '<tbody></tbody>' +
        '</table>' +
        '<table id="benchmarks_' + accountId + '" class="benchmarks">' +
        '<tbody>' +
        '</tbody>' +
        '</table>' +
        '<div id="sponsors_' + accountId + '" class="sponsors"></div>' +
        '</div>' +
        '</div>' +
        '</div>'
    )

    $modal.find('.avatar').css('background-image', 'url(' + avatarPath + ')')

    if (workoutRank != undefined && workoutRank.length > 0) {
        Object.values(workoutRank).forEach((wod, index) => {
            let $wod = $(
                '<tr class="wod">' +
                '<td>' + wod.name + '</td>' +
                '<td>' + wod.rank + '</td>' +
                '<td>' + wod.result + '</td>' +
                '</tr>'
            )

            $modal.find('#workouts tbody').append($wod)
        })
    }

    if (latestEvents != undefined && latestEvents.length > 0) {
        latestEvents.forEach((event, index) => {
            let $event = $(
                '<tr class="events">' +
                '<td>' + event.eventName + '</td>' +
                '<td>' + event.rank + '</td>' +
                '<td>' + event.division + '</td>' +
                '</tr>'
            )
            $modal.find('#events_' + accountId).append($event)
        })
    }

    if (benchmarks != undefined) {
        Object.keys(benchmarks).forEach((benchmark, index) => {
            let $benchmark = $(
                '<div class="benchmark">' +
                '<h4>' + benchmark.toUpperCase() + '</h4>' +
                '<h5>' + (benchmarks[benchmark] || '-') + '</h5>' +
                '</div>'
            )
            $modal.find('#benchmarks_' + accountId).append($benchmark)
        })
    }

    if (sponsors != undefined && sponsors.length > 0) {
        Object.values(sponsors).forEach((sponsor, index) => {
            let $sponsors = $(
                '<div class="sponsors">' +
                '</div>'
            )
            $modal.find('#sponsors_' + accountId).append($sponsors)
        })
    }

    return $modal
}


