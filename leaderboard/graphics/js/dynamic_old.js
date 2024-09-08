var percent = 0;

let bestPerf = []
let best = []

function updateDynamics(newScoring, status) {
    try {

        Object.values(athletesDivision).forEach((elemAth, key) => {

            console.log("athletesDivision := ", athletesDivision)

            Mvt_name = []
            height_tot = 0;
            let index = 0;
            let scoreForWPA = 0;

            if (newScoring[1].CurrentRank != null) {
                console.log("elemAth = ", elemAth, "for div key : ", key)
                Object.keys(elemAth).forEach(i => {

                    console.log("i := ", i)

                    if (overlay == 'overlay_side' || overlay == 'overlay_side_v1') {

                        // Fetch new data and store in newRank
                        let newRank = fetchNewData(newScoring, elemAth[i].lane).CurrentRank;

                        // Control if athlete / team have new rank
                        if (elemAth[i].CurrentRank != newRank && elemAth[i].score_abs != 0) {
                            if (elemAth[i].CurrentRank > newRank) {
                                elemAth[i].$item.find('.rank').addClass('up_rank')
                            } else if (elemAth[i].CurrentRank < newRank) {
                                elemAth[i].$item.find('.rank').addClass('down_rank')
                            }
                            setTimeout(() => {
                                elemAth[i].$item.find('.rank').removeClass('up_rank down_rank')

                            }, 1500)
                        }
                    }

                    // On met en mémoire dans la variable elemAth les nouvelles valeurs
                    elemAth[i] = Object.assign({}, elemAth[i], fetchNewData(newScoring, elemAth[i].lane));
                    elemAth[i].$item.find(".rank").text(elemAth[i].CurrentRank);


                    if (status == "W" || status == "R") {

                        // on affiche le score de l'athlete si invisible
                        !elemAth[i].$item.find(".score").is(':visible') && elemAth[i].$item.find(".score").show();

                        if (elemAth[i].status == "W" || elemAth[i].status == "0" || elemAth[i].status == "S") {

                            // on mémorise le score pour les WPA
                            scoreForWPA += parseInt(elemAth[i].score_abs)

                            // On regarde si le workout est ok
                            let go = auth[elemAth[i].division] || (heat.typeWod == 'repmax')

                            if (workouts.length > 0 && go && elemAth[i].result == "") {

                                switch (heat.typeWod) {
                                    case 'amrap':
                                        Mvt_name[elemAth[i].lane] = mvtIndexAmrap(elemAth[i].score_abs, elemAth[i].division, elemAth[i].log_round_time[0].length + 1)
                                        break;
                                    case 'repmax':
                                        Mvt_name[elemAth[i].lane] = mvtIndexRepMax(elemAth[i].score_abs, elemAth[i].loadAttempted)
                                        break;
                                    case 'time':
                                        Mvt_name[elemAth[i].lane] = mvtIndexForTime(elemAth[i].score_abs, elemAth[i].division)
                                        break;
                                }

                                // Mvt_name[elemAth[i].lane] = heat.typeWod != "amrap" ? mvtIndexForTime(elemAth[i].score_abs, elemAth[i].division) : mvtIndexAmrap(elemAth[i].score_abs, elemAth[i].division, elemAth[i].log_round_time[0].length + 1)

                                // if (Mvt_name[elemAth[i].lane] != undefined && Mvt_name[elemAth[i].lane].mvtNames.includes("_")) {
                                //     Mvt_name[elemAth[i].lane].mvtNames = Mvt_name[elemAth[i].lane].mvtNames.replaceAll("_", " ")
                                // }

                                if (Mvt_name[elemAth[i].lane] != undefined && Mvt_name[elemAth[i].lane].mvtNames != undefined && Mvt_name[elemAth[i].lane].mvtNames.includes("Sprint")) {
                                    elemAth[i].$item.find(".popup").text("SPRINT");
                                    elemAth[i].$item.find(".popup").show();
                                    elemAth[i].$item.find(".score").text(chrono);
                                }
                                else {
                                    if (overlay == 'progression' || overlay == 'commentator' || overlay == 'leaderboard') {
                                        if (heat.typeWod == 'amrap' && !Number.isNaN(Mvt_name[elemAth[i].lane].rounds)) {
                                            console.log(Mvt_name[elemAth[i].lane].scoreRelMvt)
                                            percent = (Mvt_name[elemAth[i].lane].scoreRelMvt / Mvt_name[elemAth[i].lane].totalReps) * 95
                                            console.log(percent)
                                            elemAth[i].$item.find(".rounds").text("R" + (Mvt_name[elemAth[i].lane].rounds));
                                            elemAth[i].$item.find(".popup").text("R" + (Mvt_name[elemAth[i].lane].rounds) + ' - ' + Mvt_name[elemAth[i].lane].mvtNames);
                                        } else {
                                            percent = (elemAth[i].score_abs / Mvt_name[elemAth[i].lane].totalReps) * 95
                                            elemAth[i].$item.find(".popup").text(Mvt_name[elemAth[i].lane].mvtNames);
                                        }
                                        elemAth[i].$item.find(".popup").show();
                                        $('#circle' + elemAth[i].lane).css("transform", "translateX(" + percent + "%)");
                                    } else {
                                        if (heat.typeWod != 'repmax') {
                                            console.log("Mvt_name : ", Mvt_name)
                                            if (i != 0) {
                                                // Si l'athlète présent avant toi est à un mouvement différent de toi, on affiche le mouvement)
                                                if (Mvt_name[elemAth[i].lane].id != Mvt_name[elemAth[i - 1].lane].id && overlay != 'overlay_wpa') {
                                                    if (heat.typeWod == 'amrap' && !Number.isNaN(Mvt_name[elemAth[i].lane].rounds)) {
                                                        elemAth[i].$item.find(".rounds").text("R" + (Mvt_name[elemAth[i].lane].rounds));
                                                        elemAth[i].$item.find(".popup").text("R" + (Mvt_name[elemAth[i].lane].rounds) + ' - ' + Mvt_name[elemAth[i].lane].mvtNames);
                                                    } else {
                                                        elemAth[i].$item.find(".popup").text(Mvt_name[elemAth[i].lane].mvtNames);
                                                    }
                                                    elemAth[i].$item.find(".popup").show();
                                                }
                                                else {
                                                    overlay != "versus" && elemAth[i].$item.find(".popup").hide();
                                                }
                                            }
                                            else {
                                                if (Mvt_name[elemAth[i].lane].mvtNames == "" || Mvt_name[elemAth[i].lane].mvtNames.includes("Workout")) {
                                                    overlay != "versus" && elemAth[i].$item.find(".popup").hide();
                                                }
                                                else {
                                                    if (heat.typeWod == 'amrap' && !Number.isNaN(Mvt_name[elemAth[i].lane].rounds)) {
                                                        elemAth[i].$item.find(".popup").text("R" + (Mvt_name[elemAth[i].lane].rounds) + ' - ' + Mvt_name[elemAth[i].lane].mvtNames);
                                                    } else {
                                                        elemAth[i].$item.find(".popup").text(Mvt_name[elemAth[i].lane].mvtNames);
                                                    }
                                                    elemAth[i].$item.find(".popup").show();
                                                }
                                            }
                                        }

                                    }


                                    if (overlay == "versus" && heat.typeWod != 'repmax') {
                                        elemAth[i].$item.find(".popup").show();
                                        elemAth[i].$item.find(".popup").text(Mvt_name[elemAth[i].lane].mvtNames);
                                    }

                                    if (heat.typeWod == 'repmax') {
                                        if (Mvt_name[elemAth[i].lane].repTarget != Mvt_name[elemAth[i].lane].scoreAbsMvt) {
                                            elemAth[i].$item.find(".popup").html('TRY &#10140; ' + Mvt_name[elemAth[i].lane].repTarget);
                                            overlay == 'versus' ? elemAth[i].$item.find(".popup").slideDown(1000) : elemAth[i].$item.find(".popup").fadeIn(1000);
                                        } else {
                                            elemAth[i].$item.find(".popup").html('');
                                            overlay == 'versus' ? elemAth[i].$item.find(".popup").slideUp(1000) : elemAth[i].$item.find(".popup").fadeOut(1000);
                                        }
                                        elemAth[i].$item.find(".score").text(Mvt_name[elemAth[i].lane].scoreAbsMvt + ' KG');
                                    } else {
                                        elemAth[i].$item.find(".score").text(Mvt_name[elemAth[i].lane].scoreAbsMvt + "/" + Mvt_name[elemAth[i].lane].repTarget);
                                    }

                                }

                                console.log(elemAth[index].lane)


                                let mvts = Mvt_name[elemAth[index].lane].arrayMvt.toString().replaceAll(',', ' - ').replaceAll('_', ' ')

                                if (overlay == "versus" && heat.typeWod != 'repmax') {
                                    if (mvts != "") {
                                        $('.box_mvt').slideDown(1000)
                                        $('.box_mvt').find('#mvt').html(mvts)
                                    } else {
                                        $('.box_mvt').hide()
                                    }
                                } else {
                                    $('#mvt').html(mvts)
                                    $('.mvt').html(mvts)
                                }

                                if (overlay == 'commentator' || overlay == 'progression' || overlay == 'leaderboard') {
                                    elemAth[i].$item.find(".popup").show();
                                } else {
                                    // setupLeaderboard.value.scoreConfig && elemAth[i].$item.find(".popup").hide();
                                }

                                setupLeaderboard.value.scoreConfig && elemAth[i].$item.find(".score").text(elemAth[i].score_abs)

                            }
                            else {
                                elemAth[i].$item.find(".score").text(elemAth[i].score_abs)
                            }
                        } else if (elemAth[i].status == "F") {
                            index += 1;
                            let result = elemAth[i].result;
                            elemAth[i].$item.find(".popup").show();
                            elemAth[i].$item.find(".score").text('FIN')
                            elemAth[i].$item.find(".popup").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length - 8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length - 7, result.length) : result = result.toString().slice(result.length - 6, result.length));
                            if (overlay == 'progression') {
                                $('#circle' + elemAth[i].lane).css("transform", "translateX(95%)");
                            }
                        } else if (elemAth[i].status == "T") {
                            let result = elemAth[i].result;
                            elemAth[i].$item.find(".score").text('FIN');
                            elemAth[i].$item.find(".popup").text(result);
                            elemAth[i].$item.find(".popup").show();
                        }
                    } else if (status == "T") {
                        let result = elemAth[i].result;
                        elemAth[i].$item.find(".popup").show();
                        elemAth[i].$item.find(".score").text('FIN')
                        if (elemAth[i].status == "F") {
                            elemAth[i].$item.find(".popup").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length - 8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length - 7, result.length) : result = result.toString().slice(result.length - 6, result.length));
                            if (overlay == 'progression') {
                                $('#circle' + elemAth[i].lane).css("transform", "translateX(95%)");
                            }
                        } else if (elemAth[i].status == "T") {
                            elemAth[i].$item.find(".popup").text(result);
                        } else {
                            elemAth[i].$item.find(".popup").text('CAP ' + elemAth[i].score_abs);
                        }
                        if ($('.leaderboard').is(':visible')) {
                            if (overlay.search("overlay") >= 0 || overlay == 'versus') {

                                timerAutomatic1 = setTimeout(() => {
                                    // $('#box_svg').slideUp(1000)
                                    // $('.leaderboard').slideUp(1000)
                                    // $('.box_chrono').slideUp(1000)
                                    // $('.box_heat').slideUp(1000)
                                    // $(".mainSponsor").slideUp(1000)
                                    if (overlay == 'versus') {

                                        $('.box_mvt').slideUp(1000)
                                    }
                                    if (setupLeaderboard.value.automaticSchedule) {
                                        launchAutomaticSchedule()
                                    }
                                }, 5000)
                            }
                        }
                    }

                    if (elemAth[i].result == "" && status != "T") {
                        if (overlay != 'overlay_top') {
                            if (overlay == "versus") {
                                if (elemAth[i].CurrentRank == 1) {
                                    // elemAth[i].$item.find(".rank").addClass('first_rank')
                                    // elemAth[i].$item.find(".rank").removeClass('initial_rank_versus second_rank third_rank other_rank')
                                    elemAth[i].$item.find(".popup").addClass('first_rank')
                                    elemAth[i].$item.find(".popup").removeClass('initial_rank_versus second_rank third_rank other_rank')
                                    elemAth[i].$item.find(".score").addClass('first_rank')
                                    elemAth[i].$item.find(".score").removeClass('initial_rank_versus second_rank third_rank other_rank')
                                }
                                else {
                                    // elemAth[i].$item.find(".rank").addClass('initial_rank_versus')
                                    // elemAth[i].$item.find(".rank").removeClass('first_rank second_rank third_rank other_rank')
                                    elemAth[i].$item.find(".popup").addClass('initial_rank_versus')
                                    elemAth[i].$item.find(".popup").removeClass('first_rank second_rank third_rank other_rank')
                                    elemAth[i].$item.find(".score").addClass('initial_rank_versus')
                                    elemAth[i].$item.find(".score").removeClass('first_rank second_rank third_rank other_rank')
                                }
                            } else {
                                if (elemAth[i].CurrentRank == 1) {
                                    // elemAth[i].$item.find(".rank").toggleClass('rank first_rank', true)
                                    // elemAth[i].$item.find(".rank").toggleClass('second_rank third_rank other_rank', false)
                                    elemAth[i].$item.find(".score").toggleClass('score first_rank', true)
                                    elemAth[i].$item.find(".score").toggleClass('second_rank third_rank other_rank', false)
                                    elemAth[i].$item.find(".circle").toggleClass('circle first_rank', true)
                                    elemAth[i].$item.find(".circle").toggleClass('second_rank third_rank other_rank', false)

                                }
                                else if (elemAth[i].CurrentRank == 2) {
                                    // elemAth[i].$item.find(".rank").toggleClass('rank second_rank', true)
                                    // elemAth[i].$item.find(".rank").toggleClass('first_rank third_rank other_rank', false)
                                    elemAth[i].$item.find(".score").toggleClass('score second_rank', true)
                                    elemAth[i].$item.find(".score").toggleClass('first_rank third_rank other_rank', false)
                                    elemAth[i].$item.find(".circle").toggleClass('circle second_rank', true)
                                    elemAth[i].$item.find(".circle").toggleClass('first_rank third_rank other_rank', false)
                                }
                                else if (elemAth[i].CurrentRank == 3) {
                                    // elemAth[i].$item.find(".rank").toggleClass('rank third_rank', true)
                                    // elemAth[i].$item.find(".rank").toggleClass('second_rank first_rank other_rank', false)
                                    elemAth[i].$item.find(".score").toggleClass('score third_rank', true)
                                    elemAth[i].$item.find(".score").toggleClass('second_rank first_rank other_rank', false)
                                    elemAth[i].$item.find(".circle").toggleClass('circle third_rank', true)
                                    elemAth[i].$item.find(".circle").toggleClass('second_rank first_rank other_rank', false)
                                }
                                else {
                                    // elemAth[i].$item.find(".rank").toggleClass('rank other_rank', true)
                                    // elemAth[i].$item.find(".rank").toggleClass('second_rank third_rank first_rank', false)
                                    elemAth[i].$item.find(".score").toggleClass('score other_rank', true)
                                    elemAth[i].$item.find(".score").toggleClass('second_rank third_rank first_rank', false)
                                    elemAth[i].$item.find(".circle").toggleClass('circle other_rank', true)
                                    elemAth[i].$item.find(".circle").toggleClass('second_rank third_rank first_rank', false)
                                }

                            }
                        } else {
                            if (elemAth[i].CurrentRank == 1) {
                                elemAth[i].$item.find(".rank").addClass('first_rank')
                                elemAth[i].$item.find(".rank").removeClass('initial_rank_top second_rank third_rank other_rank')
                                elemAth[i].$item.find(".ath_sub").addClass('first_rank')
                                elemAth[i].$item.find(".ath_sub").removeClass('initial_rank_top second_rank third_rank other_rank')
                                elemAth[i].$item.find(".popup").addClass('first_rank')
                                elemAth[i].$item.find(".popup").removeClass('initial_rank_top second_rank third_rank other_rank')
                                elemAth[i].$item.find(".score").addClass('first_rank')
                                elemAth[i].$item.find(".score").removeClass('initial_rank_top second_rank third_rank other_rank')
                                elemAth[i].$item.find(".circle").addClass('first_rank')
                                elemAth[i].$item.find(".circle").removeClass('initial_rank_top second_rank third_rank other_rank')
                            }
                            else {
                                elemAth[i].$item.find(".rank").addClass('initial_rank_top')
                                elemAth[i].$item.find(".rank").removeClass('first_rank second_rank third_rank other_rank')
                                elemAth[i].$item.find(".ath_sub").addClass('initial_rank_top')
                                elemAth[i].$item.find(".ath_sub").removeClass('first_rank second_rank third_rank other_rank')
                                elemAth[i].$item.find(".popup").addClass('initial_rank_top')
                                elemAth[i].$item.find(".popup").removeClass('first_rank second_rank third_rank other_rank')
                                elemAth[i].$item.find(".score").addClass('initial_rank_top')
                                elemAth[i].$item.find(".score").removeClass('first_rank second_rank third_rank other_rank')
                                elemAth[i].$item.find(".circle").addClass('initial_rank_top')
                                elemAth[i].$item.find(".circle").removeClass('first_rank second_rank third_rank other_rank')
                            }
                        }
                    }
                    else {
                        if (overlay == 'overlay_top') {
                            elemAth[i].$item.find(".rank").toggleClass('rank finish_rank', true)
                            elemAth[i].$item.find(".rank").toggleClass('initial_rank_top', false)
                            elemAth[i].$item.find(".score").toggleClass('score finish_rank', true)
                            elemAth[i].$item.find(".score").toggleClass('initial_rank_top', false)
                            elemAth[i].$item.find(".ath_sub").toggleClass('name finish_rank', true)
                            elemAth[i].$item.find(".ath_sub").toggleClass('initial_rank_top', false)
                            elemAth[i].$item.find(".popup").toggleClass('popup finish_rank', true)
                            elemAth[i].$item.find(".popup").toggleClass('initial_rank_top', false)
                        } else {
                            elemAth[i].$item.find(".rank").toggleClass('rank finish_rank', true)
                            elemAth[i].$item.find(".rank").toggleClass('second_rank third_rank first_rank other_rank', false)
                            elemAth[i].$item.find(".score").toggleClass('score finish_rank', true)
                            elemAth[i].$item.find(".score").toggleClass('second_rank third_rank first_rank other_rank', false)
                            elemAth[i].$item.find(".circle").toggleClass('circle finish_rank', true)
                            elemAth[i].$item.find(".circle").toggleClass('second_rank third_rank first_rank other_rank', false)
                        }
                    }

                    if (overlay == 'overlay_top') {
                        if (elemAth[i].result != "" && status != "T" && elemAth[i].status == 'F') {
                            if (elemAth[i].CurrentRank > 1 && elemAth[i].$item.is(':visible')) {
                                setTimeout(() => {
                                    elemAth[i].$item.fadeOut(1000);
                                }, 5000)
                            }
                        } else if (status == 'T' && elemAth[i].$item.is(':hidden')) {
                            setTimeout(() => {
                                elemAth[i].$item.fadeIn(1000)
                            }, 3000)
                        }

                        if (status == 'T') {
                            $('#mvt').text('FINISH')
                            $('.mvt').text('FINISH')
                        }
                    }

                    if (overlay == 'commentator') {
                        if (bestPerf[elemAth[i].lane] == undefined) {
                            bestPerf[elemAth[i].lane] = []
                        }
                        Object.values(elemAth[i].log_mvt[0]).forEach((time, index) => {

                            if (time != '00:00.0') {
                                if (elemAth[i].$item.find("#mvt_id_" + index + "_" + elemAth[i].lane).text() == '-') {

                                    let secondes = time.split(':').map(Number)
                                    let min = secondes[0] * 60;
                                    let total = secondes[1] + min

                                    if (total > 3) {
                                        elemAth[i].$item.find("#mvt_id_" + index + "_" + elemAth[i].lane).text(time)
                                        bestPerf[elemAth[i].lane][index] = total

                                        if (best[index] == undefined) {
                                            best[index] = total
                                        }

                                        if (bestPerf[elemAth[i].lane][index] <= best[index]) {
                                            best[index] = bestPerf[elemAth[i].lane][index]

                                            $('#leaderboard' + key).find('.mvt_id_' + index).removeClass('bestStat');
                                            elemAth[i].$item.find("#mvt_id_" + index + "_" + elemAth[i].lane).addClass('bestStat');
                                        }

                                    }
                                }
                            }
                        })
                    }

                    if (overlay === 'overlay_top') { height_tot = height_top } else { (height_tot += elemAth[i].$item.height() + 10) }

                })

                overlay != "overlay_wpa" && elemAth.sort(ascendingRank);
                if (overlay != "versus") {
                    reposition("#leaderboard" + key, elemAth);
                }

                if (overlay == "overlay_wpa") {
                    $('.rank').hide()
                    key == 0 && $("#ath_left").find('.score').text(scoreForWPA)
                    key == 1 && $("#ath_right").find('.score').text(scoreForWPA)
                }

                if (overlay !== 'commentator') {
                    $("#leaderboard" + key + " #athletes").height(height_tot)
                    console.log($("#leaderboard" + key + " .header").height())
                    $("#leaderboard" + key).height(height_tot + $("#leaderboard" + key + " .header").height() + 15)
                }
            }
            else {
                Object.keys(elemAth).forEach(i => {
                    elemAth[i] = Object.assign({}, elemAth[i], fetchNewData(newScoring, elemAth[i].lane));
                    console.log("elementAth :", elemAth[i])
                })
                elemAth.sort(ascendingLane);
                reposition("#leaderboard" + key, elemAth);
            }

        })
    }
    catch (e) {
        console.log(e)
    }
}    
