// Get the modal
let modal = document.getElementById("myModal-Confirm");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let choiceUser = "";
let laneModal = "";
let ipModal = "";

// When the user clicks on the button, open the modal
function showModal() {
    modal.style.display = "block";
    choiceUser = event.target.id;
    if (event.target.id.includes("reject")) {
        console.log(choiceUser)
        $('#textConfirmation').html('Are you sur to REJECT LANE .. IP .. ?')
    } else {
        switch (event.target.id) {
            case "reloadWorkouts":
                $('#textConfirmation').html('Are you sur to RELOAD WORKOUTS ?')
                break;
            case "changeHeat":
                $('#textConfirmation').html('Are you sur to CHANGE HEAT ?')
                break;
            case "resetChrono":
                $('#textConfirmation').html('Are you sur to RESET CHRONO ?')
                break;
        }
    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    choiceUser = '';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        choiceUser = '';
    }
}

function closeModal() {
    modal.style.display = "none";
    choiceUser = '';
}

function confirmChoice() {
    modal.style.display = "none";

    if (choiceUser.includes("reject")) {
        console.log(choiceUser)
        let infos = choiceUser.replace("lane_reject_", "");
        console.log(infos)
        requestReject(infos)
    } else {
        switch (choiceUser) {
            case "reloadWorkouts":
                reloadWorkout();
                break;
            case "changeHeat":
                changeHeat()
                break;
            case "resetChrono":
                resetChrono();
                break;
        }
    }
}