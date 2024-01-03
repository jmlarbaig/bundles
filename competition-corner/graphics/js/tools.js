async function resetAttrLane(dataCC){
  
    $('.headerLogo-text').text(dataCC.eventName)
    $('#heatName').text(dataCC.heatName)
    $('#workoutName').text(dataCC.workoutName)

    if(dataCC.backgroundImage != null){
      $('.headerLogo').removeClass('header-without-background')
      $('.headerLogo').css('background-image','url('+ dataCC.backgroundImage +')')
    }else{
      $('.headerLogo').addClass('header-without-background')
      $('.headerLogo').css('background-image','none')
    }
  
    athletes = dataCC.participants
    maximumAthlete = athletes.length;
  
    loadTableLane(athletes)
  
  }

  async function resetHeatResults(dataCC){
  
    $('.headerLogo-text').text(dataCC.eventName)
    $('#heatName').text(dataCC.heatName)
    $('#workoutName').text(dataCC.workoutName)

    console.log(dataCC)

    if(dataCC.backgroundImage != null){
      $('.headerLogo').removeClass('header-without-background')
      $('.headerLogo').css('background-image','url('+ dataCC.backgroundImage +')')
    }else{
      $('.headerLogo').addClass('header-without-background')
      $('.headerLogo').css('background-image','none')
    }
  
    athletes = dataCC.participants
    maximumAthlete = athletes.length;
  
    loadTableResult(athletes)
  
  }
  

  async function resetWorkoutDivision(dataCC){
  
    $('.headerLogo-text').text(dataCC.eventName)
    $('#heatName').text(dataCC.divisionName)
    $('#workoutName').text(dataCC.workoutName)


    if(dataCC.backgroundImage != null){
      $('.headerLogo').removeClass('header-without-background')
      $('.headerLogo').css('background-image','url('+ dataCC.backgroundImage +')')
    }else{
      $('.headerLogo').addClass('header-without-background')
      $('.headerLogo').css('background-image','none')
    }
    
    athletes = dataCC.athletesResults
    maximumAthlete = athletes.length;
  
    loadTableDivisionResults(athletes)
  
  }
  
  
  
  function changeLane(arrow){
    // arrow = event.target.id
    switch(arrow){
      case 'minus':
        if( initialCount > 0){
          initialCount -= 10
        }
        break;
      case 'plus':
        console.log(maximumAthlete)
        console.log((initialCount+10) <maximumAthlete)
        if((initialCount+10) <maximumAthlete){
          initialCount += 10;
        }
        console.log(initialCount)
        break;
    }

    switch(overlay){
        case 'attribution-lane':
            loadTableLane(athletes);
            break;
        case 'heat-result':
            loadTableResult(athletes)
            break;
        case 'overall-division-workout':
            loadTableDivisionResults(athletes);
            break;
    }
    
  }