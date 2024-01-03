var percent = 0;

let bestPerf = []
let best = []

function updateDynamics(newScoring, status){
    try{
        newData = newScoring.find(element => element.lane == laneEcho)
        elemAth = Object.assign( {}, athletesDivision[0],newData);

        elemAth.$item.find(".rank").text(elemAth.CurrentRank);
        
        if( status == "W" || status == "R"){

            !elemAth.$item.find(".score").is(':visible') && elemAth.$item.find(".score").show();

            if( elemAth.status == "W" ){

                if(workouts.length > 0 && auth[elemAth.division] && elemAth.result == ""){
                        
                    Mvt_name[elemAth.lane] = heat.typeWod != "amrap" ? mvtIndexForTime(elemAth.score_abs, elemAth.division) : mvtIndexAmrap(elemAth.score_abs, elemAth.division, elemAth.log_round_time[0].length +1)

                    if ( Mvt_name[elemAth.lane] != undefined && Mvt_name[elemAth.lane].mvtNames.includes("_")){
                        Mvt_name[elemAth.lane].mvtNames = Mvt_name[elemAth.lane].mvtNames.replaceAll("_", " ")
                    }

                    if ( Mvt_name[elemAth.lane] != undefined && Mvt_name[elemAth.lane].mvtNames.includes("Sprint")){
                        elemAth.$item.find(".popup").text("SPRINT");
                        elemAth.$item.find(".popup").show();
                        elemAth.$item.find(".score").text(chrono);
                    }
                    else{

                        if (heat.typeWod == 'amrap' && !Number.isNaN(Mvt_name[elemAth.lane].rounds)){
                            elemAth.$item.find(".popup").text( "R"+(Mvt_name[elemAth.lane].rounds) + ' - ' + Mvt_name[elemAth.lane].mvtNames);
                        }else{
                            elemAth.$item.find(".popup").text(Mvt_name[elemAth.lane].mvtNames);
                        }
                        elemAth.$item.find(".popup").show();

                        elemAth.$item.find(".score").text(Mvt_name[elemAth.lane].scoreAbsMvt + "/" + Mvt_name[elemAth.lane].repTarget);
                    }

                    setupLeaderboard.value.scoreConfig && elemAth.$item.find(".score").text(elemAth.score_abs) 
                }
                else{
                    elemAth.$item.find(".score").text(elemAth.score_abs)
                }
            } else if (elemAth.status == "F" ){
                index += 1;
                let result = elemAth.result;
                elemAth.$item.find(".popup").show();
                elemAth.$item.find(".score").text('FIN')
                elemAth.$item.find(".popup").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));

            }
        } else if(status == "T"){
            let result = elemAth.result;
            elemAth.$item.find(".popup").show();
            elemAth.$item.find(".score").text('FIN')
            if (elemAth.status == "F" ){
                elemAth.$item.find(".popup").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
                if(overlay== 'progression'){
                    $('#circle'+elemAth.lane).css("transform","translateX(95%)");
                }
            }else if(elemAth.status == "T"){
                elemAth.$item.find(".popup").text(result);
            }else {
                elemAth.$item.find(".popup").text('CAP '+ elemAth.score_abs);
            }
        }

        if(elemAth.result == "" && status != "T"){
            if(overlay != 'overlay_top'){
                if (elemAth.CurrentRank == 1){
                    elemAth.$item.find(".rank").toggleClass('rank first_rank', true)
                    elemAth.$item.find(".rank").toggleClass('second_rank third_rank other_rank', false)
                    elemAth.$item.find(".score").toggleClass('score first_rank', true)
                    elemAth.$item.find(".score").toggleClass('second_rank third_rank other_rank', false)
                    elemAth.$item.find(".circle").toggleClass('circle first_rank', true)
                    elemAth.$item.find(".circle").toggleClass('second_rank third_rank other_rank', false)

                }
                else if (elemAth.CurrentRank == 2){
                    elemAth.$item.find(".rank").toggleClass('rank second_rank', true)
                    elemAth.$item.find(".rank").toggleClass('first_rank third_rank other_rank', false)
                    elemAth.$item.find(".score").toggleClass('score second_rank', true)
                    elemAth.$item.find(".score").toggleClass('first_rank third_rank other_rank', false)
                    elemAth.$item.find(".circle").toggleClass('circle second_rank', true)
                    elemAth.$item.find(".circle").toggleClass('first_rank third_rank other_rank', false)
                }
                else if (elemAth.CurrentRank == 3){
                    elemAth.$item.find(".rank").toggleClass('rank third_rank', true)
                    elemAth.$item.find(".rank").toggleClass('second_rank first_rank other_rank', false)
                    elemAth.$item.find(".score").toggleClass('score third_rank', true)
                    elemAth.$item.find(".score").toggleClass('second_rank first_rank other_rank', false)
                    elemAth.$item.find(".circle").toggleClass('circle third_rank', true)
                    elemAth.$item.find(".circle").toggleClass('second_rank first_rank other_rank', false)
                }
                else {                           
                    elemAth.$item.find(".rank").toggleClass('rank other_rank', true)
                    elemAth.$item.find(".rank").toggleClass('second_rank third_rank first_rank', false)
                    elemAth.$item.find(".score").toggleClass('score other_rank', true)
                    elemAth.$item.find(".score").toggleClass('second_rank third_rank first_rank', false)
                    elemAth.$item.find(".circle").toggleClass('circle other_rank', true)
                    elemAth.$item.find(".circle").toggleClass('second_rank third_rank first_rank', false)
                }
            }else{
                if (elemAth.CurrentRank == 1){
                    elemAth.$item.find(".rank").addClass('first_rank')
                    elemAth.$item.find(".rank").removeClass('initial_rank_top second_rank third_rank other_rank')
                    elemAth.$item.find(".popup").addClass('first_rank')
                    elemAth.$item.find(".popup").removeClass('initial_rank_top second_rank third_rank other_rank')
                    elemAth.$item.find(".score").addClass('first_rank')
                    elemAth.$item.find(".score").removeClass('initial_rank_top second_rank third_rank other_rank')
                    elemAth.$item.find(".circle").addClass('first_rank')
                    elemAth.$item.find(".circle").removeClass('initial_rank_top second_rank third_rank other_rank')
                }
                else {                           
                    elemAth.$item.find(".rank").addClass('initial_rank_top')
                    elemAth.$item.find(".rank").removeClass('first_rank second_rank third_rank other_rank')
                    elemAth.$item.find(".popup").addClass('initial_rank_top')
                    elemAth.$item.find(".popup").removeClass('first_rank second_rank third_rank other_rank')
                    elemAth.$item.find(".score").addClass('initial_rank_top')
                    elemAth.$item.find(".score").removeClass('first_rank second_rank third_rank other_rank')
                    elemAth.$item.find(".circle").addClass('initial_rank_top')
                    elemAth.$item.find(".circle").removeClass('first_rank second_rank third_rank other_rank')
                }
            }
        }
        else{
            elemAth.$item.find(".rank").toggleClass('rank finish_rank',true)
            elemAth.$item.find(".rank").toggleClass('second_rank third_rank first_rank other_rank', false)
            elemAth.$item.find(".score").toggleClass('score finish_rank', true)
            elemAth.$item.find(".score").toggleClass('second_rank third_rank first_rank other_rank', false)
            elemAth.$item.find(".circle").toggleClass('circle finish_rank', true)
            elemAth.$item.find(".circle").toggleClass('second_rank third_rank first_rank other_rank', false)
            
        }

    }
    catch(e){
        console.log(e)
    }
}    
