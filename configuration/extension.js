'use strict';

const fs = require('fs');

module.exports = function (nodecg) {
    const configs = JSON.parse(fs.readFileSync(__dirname + '/configs.json'));

    const configsReplicants = nodecg.Replicant('configs', { defaultValue: configs });
    configsReplicants.value = configs;

    console.log('Initializing configuration extension with configs:', configs);

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
            // Merge uniquement les values dans le replicant existant
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

            // Sauvegarde uniquement les values à plat
            fs.writeFile(filepath, JSON.stringify(value, null, 2), 'utf8', (err) => {
                if (err) throw err;
            });
        });
    });
};