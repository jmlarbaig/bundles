
module.exports = (nodecg, cc) => {

	const listWarmpUp = nodecg.Replicant('listWarmpUp');

	let WorkoutTab = [];

	async function updateWorkout(data) {

		// console.log(data)
		WorkoutTab = [];

		cc.loadWorkoutsPlanning(data.eventId).then((response) => {

			// console.log("Workout ID ", data.workoutId)

			WorkoutTab = response.workouts;

			for (let i = 0; i < WorkoutTab.length; i++) {


				// console.log('WorkoutTab[i].id:  ', WorkoutTab[i].id)

				if (WorkoutTab[i].id == data.workoutId) {

					// console.log('update Heats')

					updateHeats(WorkoutTab[i], data.eventId).then((tab) => {

						// console.log("Tab : ", tab)
						// console.log(data.eventName)

						if (WorkoutTab[i + 1] != undefined) {
							i++;
							updateHeats(WorkoutTab[i], data.eventId).then(() => {
								// console.log('5')
								updateWarmUp(data.eventName, data.workoutId, data.heatId)
							})
						} else {
							// console.log('4')
							updateWarmUp(data.eventName, data.workoutId, data.heatId)
						}
					})
				}

			}
		})

	}

	async function updateHeats(tab, eventId) {
		return cc.loadHeats(tab.id).then((value) => {
			tab.heats = value;
			return cc.loadParticpant(eventId, tab.id).then((value) => {
				tab.participants = value;
				return tab
			})
		})
	}

	function updateWarmUp(eventName, workoutId, heatId) {

		// console.log('eventName', eventName)
		// console.log('workoutId', workoutId)
		// console.log('heatId', heatId)

		try {

			let heatWUP = []
			var current = { "wod": "", "heat": "" }
			var next = { "wod": "", "heat": "" }
			var warm = { "wod": "", "heat": "" }

			if (WorkoutTab != undefined) {
				for (let i = 0; i < WorkoutTab.length; i++) {

					// console.log('WorkoutTab[i].id = ', WorkoutTab[i].id)
					if (WorkoutTab[i].id == workoutId) {
						// console.log('WorkoutTab[i].heats : ', WorkoutTab[i].heats)
						for (let y = 0; y < WorkoutTab[i].heats.length; y++) {
							if (WorkoutTab[i].heats[y].id == heatId) {
								current.wod = (WorkoutTab[i])
								current.heat = (WorkoutTab[i].heats[y])
								if (WorkoutTab[i].heats[y + 1] == undefined) {
									if (WorkoutTab[i + 1] != undefined) {
										if (WorkoutTab[i + 1].heats[0] != undefined) {
											next.heat = (WorkoutTab[i + 1].heats[0])
											next.wod = (WorkoutTab[i + 1])
											if (WorkoutTab[i + 1].heats[1] != undefined) {
												warm.heat = (WorkoutTab[i + 1].heats[1])
												warm.wod = (WorkoutTab[i + 1])
											}
										}
									} else {
										next.heat = {}
										next.wod = {}
										warm.heat = {}
										warm.wod = {}
									}
								}
								else {
									next.heat = (WorkoutTab[i].heats[y + 1])
									next.wod = (WorkoutTab[i])

									if (WorkoutTab[i].heats[y + 2] == undefined) {

										if (WorkoutTab[i + 1] != undefined) {
											if (WorkoutTab[i + 1].heats[0] != undefined) {
												// warm.heat = (WorkoutTab[i+1].heats[0])
												warm.heat = (WorkoutTab[i + 1].heats[0])
												warm.wod = (WorkoutTab[i + 1])
											}
										} else {
											warm.heat = {}
											warm.wod = {}
										}
									}
									else {
										warm.heat = (WorkoutTab[i].heats[y + 2])
										warm.wod = (WorkoutTab[i])
									}
								}
							}
						}
					}
				}

				current.heat.current = "CURRENT"
				next.heat.current = "NEXT"
				warm.heat.current = "WARMUP"

				heatWUP.push(current)
				heatWUP.push(next)
				heatWUP.push(warm)

				let object = {
					'eventName': eventName,
					'warmUp': heatWUP
				}

				listWarmpUp.value = object

				// console.log("WarmUp : ", object)

				nodecg.sendMessage('update_CIS', object.warmUp[0])
			}
		}
		catch (e) {
			console.log(e)
		}
	}

	return { updateWorkout }

}