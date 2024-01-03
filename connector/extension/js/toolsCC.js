
module.exports = (nodecg, Connected) => {

    let athletesCurrentHeat = null;
    let athletesDataCC = null;
    let static = {};
    let idEvent = 0;

    // const listeAthlete = nodecg.Replicant('listeAthlete', { defaultValue: {'Team':[], 'Individual':[]}, persistent: false })
    const listCis = nodecg.Replicant('CIS', { defaultValue: {}, persistent: true })
    const planningEvent = nodecg.Replicant('planningEvent')

    require('./assetCC')(nodecg)
    const cc = require('./services/cc_api')()
    const warmup = require('./warmup')(nodecg, cc)

    // Data from Competition Corner
    const affiliateStats = nodecg.Replicant('affiliateStats')

    const Divisions = nodecg.Replicant('Divisions')
    const WorkoutsDivision = nodecg.Replicant('WorkoutsDivision')
    const Heats = nodecg.Replicant('HeatsWorkout')

    const AttributionLane = nodecg.Replicant('AttributionLane');
    const HeatResults = nodecg.Replicant('HeatResults')
    const OSDivisionWorkout = nodecg.Replicant('OSDivisionWorkout')

    const eventId = nodecg.Replicant('eventId', { defaultValue: 0, persistent: false })
    const TopScore = nodecg.Replicant('TopScore')
    const WorkoutInfos = nodecg.Replicant('WorkoutInfos');
    const token = nodecg.Replicant('TOKEN', { defaultValue: null, persistent: false });

    function connectionCC(user, passwd, event) {
        cc.logCC(user, passwd).then((_token_) => {
            token.value = _token_
            cc.dashboardEventCC(event).then((res) => {
                const { id, name, affiliates, divisions } = res
                affiliateStats.value = affiliates
                Divisions.value = divisions
                eventId.value = id
                idEvent = id
                console.log(idEvent)
                Connected.value.cc = 'connected'
            })
            cc.loadWorkouts(event).then(data => {
                WorkoutInfos.value = data
            })
            cc.loadWorkoutsPlanning(event).then((data) => {
                for (let wod of data.workouts) {
                    cc.loadHeats(wod.id).then((data) => {
                        wod.heats = data
                    }).then(() => {
                        cc.loadParticpant(event, wod.id)
                            .then((data) => {
                                wod.participants = data
                            }).then(() => {
                                planningEvent.value = data
                            })
                    })
                }
            })
        }).catch(e => {
            Connected.value.cc = 'error : ' + e
        })
    }

    nodecg.listenFor('static_update', value => {
        console.log('static_update')
        static = value
        athletesCurrentHeat = value.athletes

        if (token.value != null) {
            if (value.workoutId != 0 && value.athletes.length > 0) {
                updateScoreToBeat(value.workoutId, value.athletes)
                cc.loadAttributionLane(idEvent, value.workoutId, value.heatId, 0, 10).then((lane) => {
                    AttributionLane.value = lane
                })
            }
            if (value.athletes.length > 0 && athletesDataCC != null) {
                updateCIS(athletesDataCC, value.athletes)
            }
            if (value != undefined) {
                warmup.updateWorkout(value)
            }
        }
    })

    nodecg.listenFor('attribution_lane', (value, ack) => {
        if (token.value != null) {
            let lower = value - 10;
            let higher = value
            cc.loadAttributionLane(idEvent, static.workoutId, static.heatId, lower, higher).then((lane) => {
                AttributionLane.value = lane
                if (ack && !ack.handled) {
                    ack(null, lane.totalRecordsCount);
                }
            })
        }
    })

    nodecg.listenFor('workout_division', value => {
        if (token.value != null) {
            cc.loadWorkoutsByDivision(idEvent, value).then((workouts) => {
                WorkoutsDivision.value = workouts
            })
        }
    })

    nodecg.listenFor('overall_standing_workout_division', (value, ack) => {
        if (token.value != null) {
            let lower = value.num_osdivwod - 10;
            let higher = value.num_osdivwod
            cc.loadDivisionWorkoutResults(idEvent, value.selectedDivision, value.workoutDivisionSelected, lower, higher).then((results) => {
                OSDivisionWorkout.value = results
                if (ack && !ack.handled) {
                    ack(null, results.totalRecordsCount);
                }
            })
        }
    })

    nodecg.listenFor('workout_heat', value => {
        if (token.value != null) {
            cc.loadHeatsByWorkout(idEvent, value).then((heats) => {
                Heats.value = heats
            })
        }
    })

    nodecg.listenFor('heat_result', (value, ack) => {
        if (token.value != null) {
            let lower = value.num_heats - 10;
            let higher = value.num_heats
            cc.loadHeatResults(idEvent, value.workoutHeatSelected, value.heatSelected, lower, higher).then((results) => {
                HeatResults.value = results
                if (ack && !ack.handled) {
                    ack(null, results.totalRecordsCount);
                }
            })
        }
    })


    nodecg.listenFor('update_CC_ask', (value) => {
        cc.logCC(value.user, value.passwd).then((_token_) => {
            Connected.value.cc = 'connected'
            token.value = _token_
            cc.dashboardEventCC(idEvent).then((res) => {
                const { affiliates, divisions } = res
                affiliateStats.value = affiliates
                Divisions.value = divisions
            })
            cc.loadWorkouts(idEvent).then(data => {
                WorkoutInfos.value = data
            })
            cc.loadWorkoutsPlanning(idEvent).then((data) => {
                for (let wod of data.workouts) {
                    cc.loadHeats(wod.id).then((data) => {
                        wod.heats = data
                    }).then(() => {
                        cc.loadParticpant(idEvent, wod.id).then((data) => {
                            wod.participants = data
                        }).then(() => {
                            planningEvent.value = data
                        })
                    })
                }
            })
            if (static.workoutId != 0 && static.athletes.length > 0) {
                updateScoreToBeat(static.workoutId, static.athletes)
            }
            if (static.athletes.length > 0 && athletesDataCC != null) {
                updateCIS(athletesDataCC, static.athletes)
            }
            if (static != undefined) {
                warmup.updateWorkout(static)
            }
        }).catch(e => {
            Connected.value.cc = 'error : ' + e
        })
    })

    nodecg.listenFor('liste_ath_cc_update', value => {
        athletesDataCC = value
    })

    nodecg.listenFor('update_CIS', value => {
        console.log('updateCIS')
        if (token.value != null) {
            updateCIS(athletesDataCC, value)
        }
    })

    async function updateScoreToBeat(workoutId, athletes) {
        let divisionName = [];
        let divisionId = [];
        athletes.forEach(function (athlete) {
            if (!divisionName.includes(athlete.division)) {
                divisionName.push(athlete.division)
            }
        });

        for (let division of divisionName) {
            let div = Divisions.value.find(element => element.title === division)
            divisionId.push(div)
        }
        let result = []
        for (let element of divisionId) {
            if (element != undefined) {
                cc.getHeatsTopScore(workoutId, element.id).then((res) => {
                    result.push(res)
                    TopScore.value = result
                })
            }
        }
    }

    async function updateCIS(liste_cc, warmUp) {
        let listeCurrentHeat = []
        let listeCurrentHeat_ath = []
        let listParticipants = warmUp.wod.participants
        let athletesOfCurrentHeat = warmUp.heat.stations
        athletesOfCurrentHeat.forEach(athlete => {
            let partName = athlete.participantName;

            if (partName[partName.length - 1] == ' ') {
                partName = partName.substring(0, partName.length - 1)
            }
            if (athlete != undefined) {

                listeCurrentHeat[athlete.station] = {}

                listeCurrentHeat[athlete.station] = Object.assign({}, athlete)
                listeCurrentHeat[athlete.station].lane = listeCurrentHeat[athlete.station].station
                let moreDatas = listParticipants.find(x => x.id === athlete.participantId)

                listeCurrentHeat[athlete.station].points = moreDatas.points
                listeCurrentHeat[athlete.station].rank = moreDatas.rank
                listeCurrentHeat[athlete.station].height = moreDatas.height
                listeCurrentHeat[athlete.station].weight = moreDatas.weight
                listeCurrentHeat[athlete.station].countryCode = moreDatas.countryCode
                listeCurrentHeat[athlete.station].benchmarks = Object.assign({}, moreDatas.benchmarks)
                listeCurrentHeat[athlete.station].age = moreDatas.age

                listeCurrentHeat[athlete.station].ath = []

                if (liste_cc.Team.hasOwnProperty(partName)) {
                    listeCurrentHeat[athlete.station].ath = liste_cc.Team[partName]
                    listeCurrentHeat[athlete.station].type = 'team'
                }
                if (liste_cc.Individual.hasOwnProperty(partName)) {
                    listeCurrentHeat[athlete.station].ath = liste_cc.Individual[partName]
                    listeCurrentHeat[athlete.station].type = 'individual'
                }

                cc.loadParticpantId(idEvent, parseInt(athlete.participantId)).then((result) => {

                    listeCurrentHeat[athlete.station].qualifierRank = result.qualifierRank
                    listeCurrentHeat[athlete.station].workoutRank = [{}]
                    listeCurrentHeat[athlete.station].workoutRank = result.workoutRanks
                    listeCurrentHeat[athlete.station].affiliate = result.affiliate

                    if (listeCurrentHeat[athlete.station].type == 'individual') {
                        listeCurrentHeat[athlete.station].ath[0] = {
                            'First Name': result.firstName,
                            'Last Name': result.lastName
                        }
                    }

                    listeCurrentHeat_ath[athlete.station] = { 'ath_infos': [] }


                    if (listeCurrentHeat[athlete.station].ath.length > 0) {
                        listeCurrentHeat[athlete.station].ath.forEach((ath, index) => {
                            let alias = (ath['First Name'].toLowerCase() + ' ' + ath['Last Name'].toLowerCase()).replaceAll(' ', '-')

                            let ath_infos = {}

                            cc.loadAthlete(alias).then((result) => {
                                if (result.error == 'Athlete not found') {
                                    ath_infos.fullName = ath['First Name'] + ' ' + ath['Last Name'];
                                    ath_infos.crossfitAffiliateName = ath['Affiliate'];
                                    listeCurrentHeat_ath[athlete.station].ath_infos[index] = { ...ath_infos }
                                } else {
                                    listeCurrentHeat_ath[athlete.station].ath_infos[index] = { ...result }
                                    listeCurrentHeat_ath[athlete.station].ath_infos[index].fullName = ath['First Name'] + ' ' + ath['Last Name'];
                                }
                                listeCurrentHeat[athlete.station].ath = listeCurrentHeat_ath[athlete.station].ath_infos;
                                // console.log(listeCurrentHeat)
                                listCis.value = listeCurrentHeat;
                            })
                        })
                    } else {
                        listCis.value = listeCurrentHeat;
                    }
                })
            }
        })
    }

    return { connectionCC }


}
