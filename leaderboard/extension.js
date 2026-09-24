'use strict';

const fs = require('fs');
const url = require('url');

module.exports = function (nodecg) {

    const router = nodecg.Router();
    nodecg.mount('/leaderboard', router);

    const configs = JSON.parse(fs.readFileSync(__dirname + '/configs.json'));

    const configsReplicants = nodecg.Replicant('configs', { defaultValue: configs });
    configsReplicants.value = configs;

    const activeSetup = nodecg.Replicant('activeSetup', { defaultValue: '' });

    console.log('Initializing leaderboard setup extension with configs:', configs);

    // Stocker les replicants de setup pour y accéder dans les routes
    const setupReplicants = {};

    // Initialiser les replicants de setup
    configs.forEach(([filename, name, event]) => {
        const filepath = __dirname + '/' + filename;
        const replicant = nodecg.Replicant(name);
        setupReplicants[name] = replicant;

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

    // CRÉATION DYNAMIQUE DES ROUTES
    function createDynamicRoutes() {
        configs.forEach(([filename, replicantName, event, setupId, overlayType]) => {
            const filepath = __dirname + '/' + filename;

            // Lire le fichier de setup pour obtenir la structure
            if (fs.existsSync(filepath)) {
                try {
                    const setupData = JSON.parse(fs.readFileSync(filepath));

                    // Parcourir chaque section du setup
                    Object.entries(setupData).forEach(([sectionKey, section]) => {
                        if (section.element && Array.isArray(section.element)) {
                            // Créer une route pour chaque élément
                            section.element.forEach((element) => {
                                // Route format: /leaderboard/:overlayType/:sectionKey/:elementName
                                const routePath = `/${overlayType}/${sectionKey}/${element.name}`;

                                if (element.type === 'boolean') {
                                    // Route pour les éléments boolean
                                    router.post(routePath, (req, res) => {
                                        const replicant = setupReplicants[replicantName];

                                        if (!replicant || !replicant.value) {
                                            return res.status(404).json({
                                                error: 'Replicant not found',
                                                replicantName
                                            });
                                        }

                                        // Trouver l'élément dans le replicant
                                        const sectionData = replicant.value[sectionKey];
                                        if (!sectionData || !sectionData.element) {
                                            return res.status(404).json({
                                                error: 'Section not found',
                                                sectionKey
                                            });
                                        }

                                        const elementIndex = sectionData.element.findIndex(
                                            el => el.name === element.name
                                        );

                                        if (elementIndex === -1) {
                                            return res.status(404).json({
                                                error: 'Element not found',
                                                elementName: element.name
                                            });
                                        }

                                        // Mettre à jour la valeur
                                        replicant.value[sectionKey].element[elementIndex].value = req.body.show;

                                        // Sauvegarder dans le fichier
                                        fs.writeFile(filepath, JSON.stringify(replicant.value, null, 2), 'utf8', (err) => {
                                            if (err) {
                                                console.error('Error saving file:', err);
                                                return res.status(500).json({ error: 'Failed to save' });
                                            }

                                            res.json({
                                                success: true,
                                                overlay: overlayType,
                                                section: sectionKey,
                                                element: element.name,
                                                value: req.body.show
                                            });
                                        });
                                    });

                                    console.log(`Created route: POST /leaderboard${routePath} (boolean)`);

                                } else if (element.type === 'select') {
                                    // Route pour les éléments select
                                    router.post(routePath, (req, res) => {
                                        const replicant = setupReplicants[replicantName];

                                        if (!replicant || !replicant.value) {
                                            return res.status(404).json({
                                                error: 'Replicant not found',
                                                replicantName
                                            });
                                        }

                                        // Trouver l'élément dans le replicant
                                        const sectionData = replicant.value[sectionKey];
                                        if (!sectionData || !sectionData.element) {
                                            return res.status(404).json({
                                                error: 'Section not found',
                                                sectionKey
                                            });
                                        }

                                        const elementIndex = sectionData.element.findIndex(
                                            el => el.name === element.name
                                        );

                                        if (elementIndex === -1) {
                                            return res.status(404).json({
                                                error: 'Element not found',
                                                elementName: element.name
                                            });
                                        }

                                        const newValue = req.body.value;

                                        // Valider que la valeur est dans les options disponibles
                                        const validOptions = replicant.value[sectionKey].element[elementIndex].options;
                                        if (validOptions && validOptions.length > 0 && !validOptions.includes(newValue)) {
                                            return res.status(400).json({
                                                error: 'Invalid value',
                                                value: newValue,
                                                validOptions: validOptions
                                            });
                                        }

                                        // Mettre à jour la valeur
                                        replicant.value[sectionKey].element[elementIndex].value = newValue;

                                        // Sauvegarder dans le fichier
                                        fs.writeFile(filepath, JSON.stringify(replicant.value, null, 2), 'utf8', (err) => {
                                            if (err) {
                                                console.error('Error saving file:', err);
                                                return res.status(500).json({ error: 'Failed to save' });
                                            }

                                            res.json({
                                                success: true,
                                                overlay: overlayType,
                                                section: sectionKey,
                                                element: element.name,
                                                value: newValue,
                                                validOptions: validOptions
                                            });
                                        });
                                    });

                                    console.log(`Created route: POST /leaderboard${routePath} (select, options: ${element.options.join(', ')})`);
                                }
                            });
                        }
                    });
                } catch (err) {
                    console.error(`Error creating routes for ${filename}:`, err);
                }
            }
        });
    }

    // Créer les routes dynamiques
    createDynamicRoutes();

    // Route générique utilisant le setup actif
    router.post('/active/:sectionKey/:elementName', (req, res) => {
        const currentSetupName = activeSetup.value;

        if (!currentSetupName) {
            return res.status(400).json({ error: 'No active setup' });
        }

        const replicant = setupReplicants[currentSetupName];

        if (!replicant || !replicant.value) {
            return res.status(404).json({
                error: 'Active replicant not found',
                activeSetup: currentSetupName
            });
        }

        const sectionKey = req.params.sectionKey;
        const elementName = req.params.elementName;

        const sectionData = replicant.value[sectionKey];
        if (!sectionData || !sectionData.element) {
            return res.status(404).json({
                error: 'Section not found',
                sectionKey
            });
        }

        const elementIndex = sectionData.element.findIndex(
            el => el.name === elementName
        );

        if (elementIndex === -1) {
            return res.status(404).json({
                error: 'Element not found',
                elementName
            });
        }

        // Mettre à jour la valeur
        replicant.value[sectionKey].element[elementIndex].value = req.body.show;

        // Trouver le filepath correspondant
        const configEntry = configs.find(([, name]) => name === currentSetupName);
        if (!configEntry) {
            return res.status(500).json({ error: 'Config not found for active setup' });
        }

        const filepath = __dirname + '/' + configEntry[0];

        // Sauvegarder dans le fichier
        fs.writeFile(filepath, JSON.stringify(replicant.value, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error saving file:', err);
                return res.status(500).json({ error: 'Failed to save' });
            }

            res.json({
                success: true,
                activeSetup: currentSetupName,
                section: sectionKey,
                element: elementName,
                value: req.body.show
            });
        });
    });

    // Routes GET existantes (echo et lane)
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

};
