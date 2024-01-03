

function updateFront(data) {
    let $tab = $("#cis")
    $tab.find(".cueCardParents").remove();

    Object.values(data).forEach((val, index) => {
        if (val != null) {
            let O_points = val.points
            let O_rank = val.rank

            let $item = $(
                '<div class="cueCardParents" id="card_' + val.lane + '" >' +
                '<div class="box_lane_name">' +
                '<h3 class="lane name">#' + val.lane + '</h3>' +
                '<h3 class="lane">' + val.participantName + '</h3>' +
                '</div>' +
                '<div><hr>  ' +
                '<span class=" name" id="overallRank_' + val.lane + '">Overall Rank : ' + O_rank + ' th </span> <br> ' +
                '<span class=" name" id="overallPoints_' + val.lane + '"> Overall Points : ' + O_points + '</span>' +
                '</div>' +
                '<div><hr> ' +
                '<h4> Lowerthird selection </h4>' +
                '</div>' +
                '<div id="divSubType' + val.lane + '"> ' +
                '<label for="position">Choose your lowerthirds</label>' +
                '<select id="subtype' + val.lane + '" class="subtype">' +
                '<option value="">-- Please choose option --</option>' +
                '<option value="affiliation">Affiliation</option>' +
                '<option value="overall">X overall standing after X events</option>' +
                '<option value="free">Manual Entry</option>' +
                '</select>' +
                '</div>' +
                '<div>' +
                '<input type="text" id="textLower_' + val.lane + '" class="textLower"/>' +
                '</div>' +
                '<div class="input-checkbox">' +
                '<input type="checkbox" id="ath_' + val.lane + '" onclick="askAffichage()"/>' +
                '<span class="toogle"></span>' +
                '</div>' +
                '<hr><h4>Workout results</h4>' +
                '<div class="cards-list workout_list" id="workouts_' + val.lane + '"/>' +
                '<hr><h4>Athletes list</h4>' +
                '<div class="cards-list" id="cards_' + val.lane + '"/>' +
                '</div>'
            );
            $tab.append($item);

            if (val.type == "team") {
                $item.find('#subtype' + val.lane).append('<option value="athletes">Athlete(s)</option>')
            }

            if (val.type == "individual" && val.benchmarks != undefined) {
                $item.find('#subtype' + val.lane).append('<option value="benchmark">Benchmark</option>')
            }

            if (val.workoutRank != undefined) {
                $item.find('#subtype' + val.lane).append('<option value="wods">Wod results</option>')
                updateFrontWorkout(val.workoutRank, val.lane)
            }

            let $tab_elm = $("#cards_" + val.lane)

            val.ath.forEach((ath, key) => {

                let age = ath.age != undefined ? ath.age : '-'
                let height = ath.height != undefined ? ath.height : '-'
                let weight = ath.weight != undefined ? ath.weight : '-'
                let avatarPath = ath.avatarPath != undefined ? ath.avatarPath : ''

                let $item_ath = $(
                    '<div class="card-item" id="lane_' + val.lane + '_aht_' + key + '">' +
                    '<div class="card">' +
                    '<div class="card-item">' +
                    '<div class="card__athlete__avatar" style="background-image:url(' + avatarPath + ')">' +
                    // '<i class="material-icons"></i>' +
                    '</div>' +
                    '<div class="card__athlete__name">' +
                    '<h3>' + ath.fullName + '</h3>' +
                    '<div>' + ath.crossfitAffiliateName + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="card__info">' +
                    '<div class="card__info__age" id="age">' + age +
                    '</div>' +
                    '<div class="card__info__height" id="height">' + height +
                    '</div>' +
                    '<div class="card__info__weight" id="weight">' + weight +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );

                $tab_elm.append($item_ath)

            })


            $('#subtype' + val.lane).on('change', function () {
                let lane = parseInt(this.id.replace('subtype', ''))
                let option = $(this).val()
                removeWorkoutsOptions(lane)
                $('#textLower_' + lane).show()
                $('#textLower_' + lane).val('')
                switch (option) {
                    case 'athletes':
                        $('#textLower_' + lane).hide()
                        break;
                    case 'overall':
                        createOverall(data[lane], lane)
                        break;
                    case 'affiliation':
                        createAffiliation(data[lane], lane)
                        break;
                    case 'wods':
                        createWorkoutsOptions(data[lane], lane)
                        break;
                    case 'free':
                        $('#textLower_' + lane).val('')
                        break;
                    case 'benchmark':
                        createBenchmarkOptions(data[lane], lane)
                        break;
                }
            })

            $('#card_' + val.lane).on('change', function () {
                askAffichage()
            })


            $('#textLower_' + val.lane).on('input', function () {
                askAffichage()
            })

        }
    })
}

function createOverall(data, lane) {

    let text = 'NO OVERALL'
    console.log(data)

    if (data != undefined) {
        let WorkoutNumber = 0
        if (data.workoutRank != null && data.workoutRank != undefined) {
            WorkoutNumber = data.workoutRank.length
        }
        text = data.rank + 'th Overall after ' + WorkoutNumber + ' event';
    }

    $('#textLower_' + lane).val(text)
}

function createAffiliation(data, lane) {

    let text = 'INDEPENDANT'

    if (data != undefined) {
        text = 'FROM ' + data.affiliate
    }

    $('#textLower_' + lane).val(text)
}

function createWorkoutsOptions(data, lane) {

    let $select = $('<select id="subwod' + lane + '" class="subwod"><option value="0">-- Please choose workout</option></select>')
    $('#divSubType' + lane).after($select)

    if (data != undefined) {
        if (data.workoutRank != null && data.workoutRank != undefined) {
            data.workoutRank.forEach((wod, index) => {
                $select.append('<option value="wod_' + index + '">' + wod.name.toUpperCase() + '</option>')
            })
        }
    }

    $('#subwod' + lane).on('change', function () {
        let text = 'WORKOUT RESULT'
        let lane = parseInt(this.id.replace('subwod', ''))
        let option = parseInt($(this).val().replace('wod_', ''))

        let dataWorkout = data.workoutRank[option]

        text = dataWorkout.rank + '° RANK AT ' + dataWorkout.name + ' (' + dataWorkout.result + ') '

        $('#textLower_' + lane).val(text)
    })
}

function removeWorkoutsOptions(lane) {
    $('#card_' + lane).find('.subwod').remove()
    $('#card_' + lane).find('.benchmark').remove()
}

function createBenchmarkOptions(data, lane) {

    let $select = $('<select id="benchmark' + lane + '" class="benchmark"><option value="0">-- Please choose benchmark</option></select>')
    $('#divSubType' + lane).after($select)

    if (data != undefined) {
        if (data.benchmarks != null && data.benchmarks != undefined) {
            Object.keys(data.benchmarks).forEach((bench, index) => {
                $select.append('<option value="' + bench + '">' + bench.toUpperCase() + ':' + data.benchmarks[bench] + '</option>')
            })
        }
    }

    $('#benchmark' + lane).on('change', function () {
        let text = 'BENCHMARK DATA'
        let lane = parseInt(this.id.replace('benchmark', ''))
        let option = $(this).val()

        let firstText = option.toUpperCase()
        let secondText = data.benchmarks[option] | 0;

        switch (option) {
            case 'backsquat':
                firstText = 'BACK SQUAT'
                secondText = secondText + 'KG'
                break;
            case 'cleanJerk':
                firstText = 'CLEAN & JERK'
                secondText = secondText + 'KG'
                break;
            case 'crossfitTotal':
                firstText = 'CROSSFIT TOTAL'
                secondText = secondText + 'KG'
                break;
            case 'deadlift':
                secondText = secondText + 'KG'
                break;
            case 'snatch':
                secondText = secondText + 'KG'
                break;
            case 'fightgonebad':
                firstText = 'FIGTH GONE BAD'
                break;
            case 'run5k':
                firstText = 'RUN 5K'
                break;
            case 'sprint400m':
                firstText = 'SPRINT 400M'
                break;
            case 'twoKRow':
                firstText = '2K ROW'
                break;
        }

        text = firstText + ' : ' + secondText

        $('#textLower_' + lane).val(text)
    })
}

function updateFrontWorkout(workouts, lane) {

    var $tab_workouts = $("#workouts_" + lane)
    $tab_workouts.find(".wodRank").remove()

    workouts.forEach(wod => {
        var $item_wod = $(
            '<div class="card__wod wodRank">' +
            '<div class="text-nowrap text-truncate text-left card_info_workoutName">' +
            wod.name +
            '</div>' +
            '<div class="card_info_workoutRank">' +
            'N° ' + wod.rank +
            '</div>' +
            '<div class="card_info_workoutResult">' +
            wod.result +
            '</div>' +
            '</div>'
        );
        $tab_workouts.append($item_wod)
    })
}
