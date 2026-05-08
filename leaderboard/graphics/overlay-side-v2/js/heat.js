
function styleHeat_side(element) {
    let $item = $(
        '<div id="workout" class="m-auto text-nowrap text-truncate workout" > ' + element.externalName + ' </div>' +
        '<div id="heat" class="m-auto text-nowrap text-truncate heat"> ' + element.heatName + '</div>' +
        '<div id="mvt" class="mvt text-nowrap text-truncate"></div>'
    );
    return $item
}
