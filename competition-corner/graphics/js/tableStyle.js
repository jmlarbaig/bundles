
function loadTableLane(element) {
  let $table = $('#participantsTbl tbody')
  $table.find(".stations").remove();

  $('#participantsTbl').removeClass('table-animation')

  console.table(element)

  for (let i = initialCount; i < element.length; i++) {
    let lane = '-';
    let name = '-';
    let affiliate = '-';
    let country = null;

    if (element[i] != undefined) {
      lane = element[i].lane || '-'
      if (element[i].countryShortCode != '' && element[i].countryShortCode != null) {
        country = 'https://flagcdn.com/' + element[i].countryShortCode.toLowerCase() + '.svg'
      }
      name = element[i].competitor || '-'
      affiliate = element[i].affiliate || '-'
    }

    let $item = $(
      '<tr class="stations" id="ath' + i + '">' +
      '<td class="lane">' + lane + '</td>' +
      '<td class="flag">' + (country != null ? ('<img src="' + country + '" width="30"></img> ') : '-') + '</td>' +
      '<td class="text-nowrap text-truncate text-left name">' + name + '</td>' +
      '<td class="text-nowrap text-truncate text-left affiliation">' + affiliate + '</td>' +
      '</tr>'
    );

    !_config["affiliation-lane"] && $item.find('.affiliation').hide()
    !_config["country-lane"] && $item.find('.flag').hide()

    $table.append($item);
  }

  setTimeout(() => {
    $('#participantsTbl').addClass('table-animation')

  }, 500)
}



function loadTableResult(element) {
  let $table = $('#participantsTbl tbody')

  $('#participantsTbl').removeClass('table-animation')

  $table.find(".stations").remove();

  for (let i = initialCount; i < initialCount + 10; i++) {

    let rank = '-';
    let name = '-';
    let affiliate = '-';
    let result = '-';
    let country = null;

    if (element[i] != undefined) {
      rank = element[i].rank || '-'
      if (element[i].countryShortCode != '' && element[i].countryShortCode != null) {
        country = 'https://flagcdn.com/' + element[i].countryShortCode.toLowerCase() + '.svg'
      }
      name = element[i].competitor || '-'
      affiliate = element[i].affiliate || '-'
      result = element[i].result || '-'
    }

    let $item = $(
      '<tr class="stations" id="ath' + i + '">' +
      '<td class="rank">' + rank + '</td>' +
      '<td class="flag">' + (country != null ? ('<img src="' + country + '" width="30"></img> ') : '-') + '</td>' +
      '<td class="text-nowrap text-truncate text-left name">' + name + '</td>' +
      '<td class="text-nowrap text-truncate text-left affiliation">' + affiliate + '</td>' +
      '<td class="text-nowrap text-truncate text-left point">' + result + '</td>' +
      '</tr>'
    );

    !_config["affiliation-heat"] && $item.find('.affiliation').hide()
    !_config["country-heat"] && $item.find('.flag').hide()

    $table.append($item);
  }

  setTimeout(() => {
    $('#participantsTbl').addClass('table-animation')

  }, 500)


}


function loadTableDivisionResults(element) {
  $table = $('#participantsTbl tbody')


  $('#participantsTbl').removeClass('table-animation')
  $table.find(".stations").remove();


  for (let i = initialCount; i < initialCount + 10; i++) {

    let rank = '-';
    let displayRank = '-';
    let name = '-';
    let affiliate = '-';
    let points = '-';
    let country = null;

    if (element[i] != undefined) {
      displayRank = element[i].displayRank || '-'
      rank = element[i].rank || '-'
      if (element[i].countryShortCode != '' && element[i].countryShortCode != null) {
        country = 'https://flagcdn.com/' + element[i].countryShortCode.toLowerCase() + '.svg'
      }
      name = element[i].competitor || '-'
      element[i].affiliate == (null || ' ') ? affiliate = '-' : affiliate = element[i].affiliate
      points = element[i].result || '-'
    }

    let $item = $(
      '<tr class="stations" id="ath' + rank + '">' +
      '<td class="lane">' + displayRank + '</td>' +
      '<td class="flag">' + (country != null ? ('<img src="' + country + '" width="30"></img> ') : '-') + '</td>' +
      '<td class="text-nowrap text-truncate text-left name">' + name + '</td>' +
      '<td class="text-nowrap text-truncate text-left affiliation">' + affiliate + '</td>' +
      '<td class="text-nowrap text-truncate text-left point">' + points + '</td>' +
      '</tr>'
    );

    !_config["affiliation-overall-division"] && $item.find('.affiliation').hide()
    !_config["country-overall-division"] && $item.find('.flag').hide()
    $table.append($item);
  }

  setTimeout(() => {
    $('#participantsTbl').addClass('table-animation')

  }, 500)
}
