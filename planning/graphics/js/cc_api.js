async function loadWorkoutsPlanning(eventId) {
    let response = await fetch("https://competitioncorner.net/api2/v1/schedule/events/" + eventId + "/workouts");
    let json = await response.json();
    return json;
}

async function loadHeats(workoutId) {
    let response = await fetch('https://competitioncorner.net/api2/v1/schedule/workout/' + workoutId);
    let json = response.json();
    return json;
}

async function loadHeats2(eventId, workoutId) {
    let response = await fetch('./heats2?eventId=' + eventId + '&workoutId=' + workoutId);
    let json = response.json();
    return json;
}

async function heatDetails(eventId, heatId) {
    let response = await fetch("https://competitioncorner.net/api2/v1/schedule/workout/"+ eventId + "/heat/" + heatId + "/details");
    let json = await response.json();
    return json;
}

async function getHeatInfo(eventId, heatId) {
    let response = await fetch("https://competitioncorner.net/api2/v1/schedule/workout/"+ eventId + "/heat/" + heatId);
    let json = await response.json();
    return json;
}

async function loadParticpant(eventId, workoutID) {
    let response = await fetch("https://competitioncorner.net/api2/v1/events/"+ eventId + "/workouts/"+ workoutID +"/eligible-participants");
    let json = await response.json();
    return json;
}