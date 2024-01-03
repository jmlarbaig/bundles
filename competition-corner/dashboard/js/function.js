
async function resetOption(){
    $("#division-select").append('<option value="null">-- Please Choose Division --</option>')

    $("#workout-select").append('<option value="null">-- Please Choose Workout --</option>')
}

async function loadOptionsWorkoutHeat(workouts){

    $("#workout_heat-select option").remove()
    $("#heat-select option").remove()

    $("#workout_heat-select").append('<option value="null">-- Please Choose Workout --</option>')
    $("#heat-select").append('<option value="null">-- Please Choose Heat --</option>')


    for(let workout of workouts){
        $("#workout_heat-select").append('<option value='+ workout.id +'>' + workout.name + '</option>');
    }
}

async function loadOptionsHeats(heats){

    $("#heat-select option").remove()

    $("#heat-select").append('<option value="null">-- Please Choose Heat --</option>')

    for(let heat of heats){
        $("#heat-select").append('<option value='+ heat.key +'>' + heat.value + '</option>');
    }
}

async function loadOptionDivisions(divisions){

    $("#division-select option").remove()
    $("#workout_division-select option").remove()

    $("#division-select").append('<option value="null">-- Please Choose Division --</option>')
    $("#workout_division-select").append('<option value="null">-- Please Choose Workout --</option>')

    for(let division of divisions){
        $("#division-select").append('<option value='+ division.id +'>' + division.title + '</option>');
    }
}

async function loadOptionsWorkoutsDivision(workouts){

    $("#workout_division-select option").remove()

    $("#workout_division-select").append('<option value="null">-- Please Choose Workout --</option>')

    for(let workout of workouts){
        $("#workout_division-select").append('<option value='+ workout.key +'>' + workout.value + '</option>');
    }
}

function createOptionsSponsors(sponsors){
    $("#sponsor-lane-select option").remove()
    $("#sponsor-heat-select option").remove()
    $("#sponsor-overall-division-select option").remove()

    $("#sponsor-lane-select").append('<option value="null">-- Please Choose Sponsor --</option>')
    $("#sponsor-heat-select").append('<option value="null">-- Please Choose Sponsor --</option>')
    $("#sponsor-overall-division-select").append('<option value="null">-- Please Choose Sponsor --</option>')

    for(let sponsor of sponsors){
        $("#sponsor-lane-select").append('<option value='+ sponsor.url +'>' + sponsor.name + '</option>');
        $("#sponsor-heat-select").append('<option value='+ sponsor.url +'>' + sponsor.name + '</option>');
        $("#sponsor-overall-division-select").append('<option value='+ sponsor.url +'>' + sponsor.name + '</option>');
    }
}

