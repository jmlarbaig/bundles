
function createBlockLane(nbLane) {
    let lane = newDiv('lane my-1');
    let laneNumber = newDiv('lane__left--number');
    let name = newDiv('lane__body--name')
    let aff = newButton('button-lane', nbLane)

    lane.appendChild(laneNumber)
    lane.appendChild(name)
    lane.appendChild(aff)

    return lane;
}

function newDiv(className="", idName="") {
    let div = document.createElement('div');
    if  (className != "") {
        div.className=className;
    }
    if  (idName != "") {
        div.id = idName;
    }
    return div;
}

function newButton(className="", idName="") {
    let button = document.createElement('button');
    if  (className != "") {
        button.className=className;
    }
    if  (idName != "") {
        button.id = idName;
        button.onclick = affichageLane;
    }
    return button;
}

function truncate(str, maxlength) {
    return (str.length > maxlength) ?
        str.slice(0, maxlength - 1) + '…' : str;
    }