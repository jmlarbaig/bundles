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

    const data_ath = nodecg.Replicant('assets:dataAth')

    data_ath.on('change', (newValue, oldValue) => {
        if (newValue.length > 0) {
            if (JSON.stringify(newValue) != JSON.stringify(oldValue)) {
                let ath = [];
                let liste_cc = { 'Team': [], 'Individual': [] }

                const result = excelToJson({
                    sourceFile: __dirname + '/../../../..' + newValue[0].url,
                    columnToKey: {
                        '*': '{{columnHeader}}'
                    }
                });

                if (result.hasOwnProperty('default')) {
                    Object.values(result.default).forEach((val, index) => {
                        ath[index] = Object.assign({}, athletes_infos, val);
                        if (val.Format == "Team") {
                            let team_name = val['Team Name']

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
                        else if (val.Format == "Individual") {

                            let fullName = val['First Name'] + ' ' + val['Last Name']
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