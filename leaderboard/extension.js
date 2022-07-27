'use strict';

const fs = require('fs');
const path = require('path');

const NTP = require('ntp-time').Client;
const client = new NTP('0.fr.pool.ntp.org', '221', { timeout: 5000 });

module.exports = function (nodecg) {
	
    const colorConfig = nodecg.Replicant('colorConfig')
    const currentPath = process.cwd() + "/bundles/leaderboard/";
	const pkgPath = path.join(currentPath,"colorDefaut.json");

    const BgColor = nodecg.Replicant('BgColor')
    const MainColor = nodecg.Replicant('MainColor')
    const SecondColor = nodecg.Replicant('SecondColor')
    
    const FinishRankColor = nodecg.Replicant('FinishRankColor')
    const FirstRankColor = nodecg.Replicant('FirstRankColor')
    const SecondRankColor = nodecg.Replicant('SecondRankColor')
    const ThirdRankColor = nodecg.Replicant('ThirdRankColor')
    
    const TransparenceLogo = nodecg.Replicant('TransparenceLogo')

    if (fs.existsSync(pkgPath)) {   
        try {
            const data_ = JSON.parse(fs.readFileSync(pkgPath))
            BgColor.value = data_.BgColor
            MainColor.value = data_.MainColor
            SecondColor.value = data_.SecondColor
            FinishRankColor.value = data_.FinishRankColor
            FirstRankColor.value = data_.FirstRankColor
            SecondRankColor.value = data_.SecondRankColor
            ThirdRankColor.value = data_.ThirdRankColor
            TransparenceLogo.value = data_.TransparenceLogo
          } 
        catch (err) {
            console.error(err)
          }
	}

    nodecg.listenFor('colorOverwrite', (value, ack) =>{
        let data = JSON.stringify(value);
        fs.writeFileSync(pkgPath, data)
        colorConfig.value = value
    })

    // client
    //     .syncTime()
    //     .then(time => console.log(time)) // time is the whole NTP packet
    //     .catch(console.log);

	nodecg.log.info(`Bundle "${__filename}" is initialized.`);
};
