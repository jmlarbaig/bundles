
function styleHeat_Versus(element) {
    let $item = $(
        '<div class="heat_content">' +
        '<div class="details">' +
        '<div id="workout" class="detail" > ' + element.externalName + ' </div>' +
        '<div id="division" class="detail"> ' + element.heatName + ' </div>' +
        '</div>' +
        // '<div class="box_FVSK">' +
        //     '<div class="presented"><span>POWERED BY</span></br></div>'+
        //     '<div class="FV col">' + '</div>'+
        //     '<div class="SK col">' + '</div>'+
        // '</div>'+
        '</div>'
    );
    return $item
}
