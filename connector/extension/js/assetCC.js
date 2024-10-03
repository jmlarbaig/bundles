const excelToJson = require('convert-excel-to-json');

const athletes_infos = {
    "First Name": "",
    "Last Name": "",
    "Gender": "",
    "Affiliate": "",
    "Division": "",
    "Team Name": "",
    "Captain": "",
    "Format": "",
    "Clean&Jerk": "",
    "Snatch": "",
    "Deadlift": "",
    "Back Squat": "",
    "Crossfit Total": "",
    "Max Pullup": "",
    "Fight Gone Bad": "",
    "Fran": "",
    "Helen": "",
    "Grace": "",
    "Filthy 50": "",
    "Sprint 400m": "",
    "2K Row": "",
    "Run 5K": "",
    "Participant ID": ""
}

module.exports = (nodecg) => {

    // const data_ath = nodecg.Replicant('assets:dataAth')

    const crossfitAthlete = nodecg.Replicant('crossfitAthlete')

    crossfitAthlete.on('change', (newValue, oldValue) => {
        if (newValue.length > 0) {
            if (JSON.stringify(newValue) != JSON.stringify(oldValue)) {
                let ath = [];
                let liste_cc = { 'Team': [], 'Individual': [] }
                const result = newValue

                // const result = excelToJson({
                //     sourceFile: __dirname + '/../../../..' + newValue[0].url,
                //     columnToKey: {
                //         '*': '{{columnHeader}}'
                //     }
                // });

                console.log(result)

                // if (result.hasOwnProperty('default')) {
                if (result != {}) {
                    // Object.values(result.default).forEach((val, index) => {
                    Object.values(result).forEach((val, index) => {
                        // console.log(val.divisionFormat)
                        ath[index] = Object.assign({}, athletes_infos, val);
                        if (val.divisionFormat == "team") {
                            let team_name = val.teamName

                            if (team_name.includes('"')) {
                                while (team_name.includes('"', -2)) {
                                    team_name = team_name.replace('"', '')
                                }
                            }

                            if (!liste_cc['Team'].hasOwnProperty(team_name)) {
                                liste_cc['Team'][team_name] = []
                            }

                            liste_cc['Team'][team_name].push(val)
                        }
                        else if (val.divisionFormat == "individual") {

                            let fullName = val.fullName
                            liste_cc['Individual'][fullName] = []
                            liste_cc['Individual'][fullName].push(val)
                        }
                    })

                    nodecg.sendMessage('liste_ath_cc_update', liste_cc)
                }

            }
        }
    })
}