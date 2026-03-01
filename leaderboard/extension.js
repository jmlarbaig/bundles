'use strict';

const fs = require('fs');
const url = require('url')

module.exports = function (nodecg) {

    const router = nodecg.Router();
    nodecg.mount('/leaderboard', router);
    router.post('/chrono', (req, res) => {
        showChrono.value = req.body.show
    });

    router.post('/wod', (req, res) => {
        showWodDetails.value = req.body.show
    });

    router.post('/leaderboard', (req, res) => {
        console.log(req.body)
        showLeaderboard_lead.value = req.body.show
    });

    router.post('/flag', (req, res) => {
        showFlag.value = req.body.show
    });

    router.post('/affiliate', (req, res) => {
        showAffiliate.value = req.body.show
    });

    router.post('/logo', (req, res) => {
        showLogo.value = req.body.show
    });

    router.get('/echo:id', (req, res) => {
        let lane = req.params.id;
        res.redirect(url.format({
            pathname: "/bundles/leaderboard/graphics/echo.html",
            query: {
                "lane": lane,
            }
        }));
    });

    router.get('/lane:id', (req, res) => {
        let lane = req.params.id;
        res.redirect(url.format({
            pathname: "/bundles/leaderboard/graphics/lane.html",
            query: {
                "lane": lane,
            }
        }));
    });

    const configs = JSON.parse(fs.readFileSync(__dirname + '/configs.json'));

    const configsReplicants = nodecg.Replicant('configs', { defaultValue: configs });
    configsReplicants.value = configs;

    const activeSetup = nodecg.Replicant('activeSetup', { defaultValue: '' });

    console.log('Initializing leaderboard setup extension with configs:', configs);

    configs.forEach(([filename, name, event]) => {
        const filepath = __dirname + '/' + filename;
        const replicant = nodecg.Replicant(name);

        if (fs.existsSync(filepath)) {
            try {
                replicant.value = JSON.parse(fs.readFileSync(filepath));
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log(`Creating the file: ${filename}`);
            fs.writeFileSync(filepath, JSON.stringify(replicant.value ?? {}), null, 4);
        }

        nodecg.listenFor(event, (value) => {
            if (replicant.value) {
                Object.entries(value).forEach(([sectionKey, section]) => {
                    if (!replicant.value[sectionKey]) return;
                    section.element.forEach((el, i) => {
                        replicant.value[sectionKey].element[i].value = el.value;
                    });
                });
            } else {
                replicant.value = value;
            }

            fs.writeFile(filepath, JSON.stringify(value, null, 2), 'utf8', (err) => {
                if (err) throw err;
            });
        });
    });

};
