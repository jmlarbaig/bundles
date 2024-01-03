'use strict';

const fs = require('fs');
const url = require('url')

const setupFile = __dirname + '/setupFile.json'


module.exports = function (nodecg) {

    const router = nodecg.Router();
    router.post('/chrono', (req, res) => {
        showChrono.value = req.body.show
    });

    router.post('/wod', (req, res) => {
        showWodDetails.value = req.body.show
    });

    router.post('/leaderboard', (req, res) => {
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
            pathname:"/bundles/leaderboard/graphics/echo.html",
            query: {
               "lane": lane,
             }
          }));
    });

    router.get('/lane:id', (req, res) => {
        let lane = req.params.id;
        res.redirect(url.format({
            pathname:"/bundles/leaderboard/graphics/lane.html",
            query: {
               "lane": lane,
             }
          }));
    });

    nodecg.mount('/leaderboard', router);


    const setupLeaderboard = nodecg.Replicant('setupLeaderboard')

    if (fs.existsSync(setupFile)) {   
        try {
            setupLeaderboard.value = JSON.parse(fs.readFileSync(setupFile))
          } 
        catch (err) {
            console.error(err)
          }
	}else{
        console.log("Creating the file")
        fs.writeFileSync(setupFile, "{}");
    }

    nodecg.listenFor('setupFile', (value, ack) =>{
        let data = JSON.stringify(value);
        fs.writeFile(setupFile, data, 'utf8',function(err) {
            if (err) throw err;
            console.log('complete');
            })
            setupLeaderboard.value = value
    })

};
