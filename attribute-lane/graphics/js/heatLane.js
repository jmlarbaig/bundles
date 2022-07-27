function resetAttrLane(data){

    $('.headerLogo-text').text(statics.value.eventName)
    $('#heatName').text(data.title)
    $('#workoutName').text(data.title)

    $table = $('#participantsTbl tbody')
    $table.find(".stations").remove();

    data.stations.forEach(element => {
        console.log(element)

        var aff = element.affiliate == null ? "-" : element.affiliate

        var $item = $(
            '<tr class="stations" id="ath'+ element.station +'">' + 
                '<td class="lane"># '+ element.station + '</td>' + 
                // '<td class="flag">' + '<img src="https://flagcdn.com/'+ athletes_divison[key][key2].countryCode.toLowerCase() + '.svg" width="30"></img> ' + '</td>' +
                '<td class="text-nowrap text-truncate text-left name">' + element.participantName + '</td>' + 
                '<td class="text-nowrap text-truncate text-left affiliation">' + aff + '</td>' +
            '</tr>'
        );
        // athletes_divison[key][key2].$item = $item;
        // athletes_divison[key][key2].$item.find(".popup").hide();
        // $item.hide()
        $table.append($item);
        animateCSS('#ath'+ element.station, 'fadeInLeft')
    });

}


const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });