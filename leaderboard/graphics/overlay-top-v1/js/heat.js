function styleHeat_top(element) {
    let $item = $(
        '<div class="heat_content">' +
        '<div class="details fade-right">' +
        '<div class="detail workout" > ' + element.externalName + ' //</div>' +
        // '<div id="heat" class="detail"> // ' + element.heatName + ' // </div>' +
        // '<div id="division" class="detail"> RX\'D </div>' +
        '<div id="mvt" class="mvt text-nowrap text-truncate"></div>' +
        '</div>' +
        // '<div class="box_mainSponsor">' +
        // // '<div class="presented" id="prt">' + varPresented + '</div>' +
        // '<div class="mainSponsor">' +
        // '</div>' +
        '</div>' +
        '</div>'
    );
    return $item
}
