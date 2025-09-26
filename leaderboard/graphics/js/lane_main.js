// Variables globales
let scene, camera, renderer, controls;
let floor, lanes = [];
let animationTime = 0;  // Pour l'animation
let animationSpeed = 0.01;  // Vitesse de l'animation
let laneAnimations = [];  // Stocke l'état d'animation de chaque ligne
let isAnimating = true;  // État d'animation global
let nameLabels = [];     // Stocker les étiquettes de noms
let laneNumbers = [];    // Stocker les numéros de lignes
let laneImages = [];     // Stocker les images des lignes
let imageAnimations = []; // Stocke l'état d'animation des images
let laneNames = [
    "DEGIO",
    "JUDIO",
    "RATTEE",
    "KAPITA",
    "CASTAING",
    "DAVASSE",
    "LARBAIG",
    "BONNARD",
    "BONNARD",
    "UIOODD"
];

// Configuration
const FLOOR_WIDTH = 14;
const FLOOR_LENGTH = 6.5;
const LANE_WIDTH = FLOOR_WIDTH / 10;
const LANE_COLOR = 0x453390;
const TEXT_COLOR = 0xffffff;


const s_athletes = nodecg.Replicant('s_athletes', 'connector');

// Vérification de l'environnement avant initialisation
console.log("Démarrage du script principal...");
console.log("THREE disponible:", typeof THREE !== 'undefined');
console.log("OrbitControls disponible:", typeof THREE.OrbitControls !== 'undefined');

// Initialisation sécurisée
if (typeof THREE !== 'undefined') {
    init();
    animate();
} else {
    console.error("THREE n'est pas disponible. L'initialisation est impossible.");
    // document.getElementById('debug').innerText = "Erreur: THREE n'est pas disponible";
}


s_athletes.on('change', (newValue, oldValue) => {
    console.log("s_athletes a changé:", newValue);
    if (newValue && Array.isArray(newValue)) {
        offset = 0;
        for (index = 0; index < newValue.length; index++) {
            const athlete = newValue[index - offset];
            // newValue.forEach((athlete, index) => {
            if ((index + 1) == athlete.lane) {
                console.log(`Athlète trouvé pour la ligne ${index + 1}:`, athlete);
                laneNames[index] = athlete.displayName.toUpperCase().substring(0, 15); // Limiter à 10 caractères
                console.log(`Mise à jour du nom de la ligne ${index + 1}:`, laneNames[index]);
            } else {
                offset++;
                console.log(`Aucun athlète pour la ligne ${index + 1}`);
                laneNames[index] = "LANE " + (index + 1);
            }
            // updateLaneName(index, laneNames[index]);
            // }
            // );
        }
        // // Recréer les lignes pour mettre à jour les noms
        scene.remove(...lanes);
        scene.remove(...nameLabels);
        scene.remove(...laneNumbers);
        scene.remove(...laneImages);
        console.log("Recréation des lignes avec les nouveaux noms:", laneNames);
        lanes = [];
        nameLabels = [];
        laneNumbers = [];
        laneImages = [];
        laneAnimations = [];
        animationTime = 0;
        animationSpeed = 0.01;
        isAnimating = true;
        createLanes();
        animate();
    }
});


// Fonction d'initialisation
function init() {
    console.log("Fonction init() appelée");

    try {
        // Créer la scène
        scene = new THREE.Scene();
        // Ne pas définir de fond pour la scène pour permettre la transparence
        scene.background = null;
        console.log("Scène créée avec fond transparent");

        // Créer la caméra
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.set(-0.1, 5, 6);
        camera.lookAt(0, 0, -4);
        console.log("Caméra configurée à la position:", camera.position);

        // Créer le renderer avec alpha pour transparence
        renderer = new THREE.WebGLRenderer({
            alpha: true,         // Important pour la transparence
            antialias: true,
            premultipliedAlpha: false  // Important pour certains navigateurs
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Couleur noire avec alpha 0 (complètement transparent)
        document.getElementById('container').appendChild(renderer.domElement);
        console.log("Renderer créé avec transparence et ajouté au conteneur");

        // Ajouter des contrôles si disponibles
        if (typeof THREE.OrbitControls !== 'undefined') {
            console.log("Création des contrôles avec THREE.OrbitControls");
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            console.log("Contrôles créés avec succès");
        } else {
            console.error("THREE.OrbitControls n'est pas disponible");
            // document.getElementById('debug').innerText = "Erreur: THREE.OrbitControls n'est pas disponible";
        }

        // Ajoute de l'éclairage
        enhanceLighting();

        // Créer le sol
        createFloor();

        // Créer les lignes
        createLanes();

        console.log("Éclairage ajouté");

        // Redimensionner la fenêtre
        window.addEventListener('resize', onWindowResize, false);

        console.log("Initialisation terminée avec succès");
        // document.getElementById('debug').innerText = "Statut: Rendu 3D initialisé";
    } catch (e) {
        console.error("Erreur lors de l'initialisation:", e);
        // document.getElementById('debug').innerText = "Erreur d'initialisation: " + e.message;
    }
}

// Ajouter un éclairage plus sophistiqué
function enhanceLighting() {
    // Lumière ambiante plus douce
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Ajouter une lumière directionnelle principale
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(10, 10, 10);
    scene.add(mainLight);

    // Ajouter une lumière d'accentuation de couleur
    const accentLight = new THREE.DirectionalLight(0x6495ED, 0.4); // Bleu acier
    accentLight.position.set(-5, 8, -10);
    scene.add(accentLight);
}

// Créer le sol
function createFloor() {
    const geometry = new THREE.PlaneGeometry(FLOOR_WIDTH, FLOOR_LENGTH);
    const material = new THREE.MeshStandardMaterial({
        color: 0x222222,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, 0);
    scene.add(floor);
}

// Créer les lignes de compétition
function createLanes() {
    // Vider les tableaux existants
    lanes = [];
    laneAnimations = [];
    nameLabels = [];
    laneNumbers = [];
    laneImages = [];
    imageAnimations = [];

    const laneGeometry = new THREE.PlaneGeometry(LANE_WIDTH * 0.9, FLOOR_LENGTH * 0.9);

    for (let i = 0; i < 10; i++) {
        // Créer la ligne
        const laneMaterial = new THREE.MeshStandardMaterial({
            color: LANE_COLOR,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
        });

        const lane = new THREE.Mesh(laneGeometry, laneMaterial);
        lane.rotation.x = -Math.PI / 2;

        // Positionner la ligne sur le sol
        const xPosition = (-FLOOR_WIDTH / 2 + LANE_WIDTH / 2 + i * LANE_WIDTH) + -0.5;

        // Pour l'animation: position de départ (en haut) et mise à l'échelle à 0
        const startZ = 3; // Même position Z que les noms
        lane.position.set(xPosition, 0.5, startZ);
        lane.scale.set(1, 0.01, 1); // Hauteur presque à zéro pour commencer

        // Stockage des données d'animation
        laneAnimations.push({
            progress: 0,          // Progression de l'animation (0 à 1)
            delay: i * 0.2,       // Délai pour effet cascade
            duration: 1.5,        // Durée de l'animation
            originalLength: FLOOR_LENGTH * 0.9,  // Longueur finale
            startZ: startZ        // Position de départ
        });

        scene.add(lane);
        lanes.push(lane);
    }
}

// Ajouter un nom à une ligne
function addNameToLane(index, xPosition) {
    // Si ce nom est déjà affiché, ne pas le recréer
    if (nameLabels[index]) return;

    // Utiliser un canvas pour créer une texture avec le texte
    const canvas = document.createElement('canvas');
    canvas.width = 300; // Résolution beaucoup plus élevée pour le texte
    canvas.height = 54;

    const context = canvas.getContext('2d');
    // Fond légèrement coloré pour mieux voir le texte
    context.fillStyle = 'rgb(35, 35, 39)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Texte beaucoup plus grand et très visible
    context.font = 'bold 20px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(laneNames[index], canvas.width / 2, canvas.height / 2);

    // Ajouter une bordure au texte pour plus de visibilité
    // context.lineWidth = 4;
    // context.strokeStyle = 'black';
    // context.strokeText(laneNames[index], canvas.width / 2, canvas.height / 2);

    // Créer une texture à partir du canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    // Important: empêcher l'étirement de la texture
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);

    // Créer un matériau avec la texture
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide // Visible des deux côtés
    });

    // Créer un plan pour afficher le nom directement sur la ligne
    const nameGeometry = new THREE.PlaneGeometry(FLOOR_LENGTH * 0.9, LANE_WIDTH * 0.9);
    const nameMesh = new THREE.Mesh(nameGeometry, material);

    // Positionner le nom sur la ligne, orienté dans le sens de la longueur
    nameMesh.rotation.x = -Math.PI / 2; // À plat comme la ligne
    nameMesh.rotation.z = Math.PI / 2; // Rotation pour orienter le texte dans le sens de la longueur

    // Centrer le nom sur la ligne et le soulever légèrement pour éviter le z-fighting
    nameMesh.position.set(xPosition, 0.515, 0);

    scene.add(nameMesh);
    nameLabels[index] = nameMesh; // Stocker par index pour faciliter les mises à jour
    enhanceNameTexture(index, laneNames[index]);
}

// Ajouter un numéro à une ligne
function addNumberToLane(index, xPosition) {
    // Si ce numéro est déjà affiché, ne pas le recréer
    if (laneNumbers[index]) return;

    // Utiliser un canvas pour créer une texture avec le texte
    const canvas = document.createElement('canvas');
    canvas.width = 128; // Taille du canvas pour le numéro
    canvas.height = 128;

    const context = canvas.getContext('2d');
    // // Fond rond pour le numéro
    // context.fillStyle = 'rgba(49, 49, 122, 0.9)';
    // context.beginPath();
    // context.arc(canvas.width / 4, canvas.height / 4, canvas.width / 4 - 5, 0, Math.PI * 2);
    // context.fill();

    // Bordure blanche pour mieux voir le cercle
    context.strokeStyle = 'white';
    context.lineWidth = 3;
    context.stroke();

    // Numéro en grand et bien visible
    context.font = 'bold 30px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText("#" + (index + 1), canvas.width / 2, canvas.height / 2);

    // Créer une texture à partir du canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    // Créer un matériau avec la texture
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide // Visible des deux côtés
    });

    // Créer un plan carré pour afficher le numéro
    const numberGeometry = new THREE.PlaneGeometry(1, 1); // Taille fixe pour le numéro
    const numberMesh = new THREE.Mesh(numberGeometry, material);

    // Positionner le numéro à l'extrémité de la ligne
    numberMesh.rotation.x = -Math.PI / 2; // À plat comme la ligne

    // Positionner le numéro à la fin de la ligne (partie la plus éloignée de la caméra)
    const zPosition = FLOOR_LENGTH / 2 - 1; // Près de l'extrémité arrière
    numberMesh.position.set(xPosition, 0.52, zPosition);

    scene.add(numberMesh);
    laneNumbers[index] = numberMesh; // Stocker par index pour faciliter les mises à jour
}

// Ajouter une image à la fin d'une ligne
function addImageToLane(index, xPosition) {
    // Charger la texture de l'image
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('../img/lane/athlete-' + (index + 1) + '.png', function (texture) {
        // Créer un matériau avec la texture
        const imageMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0, // Commencer avec une opacité de 0 pour l'animation
            side: THREE.DoubleSide
        });

        // Créer une géométrie plane pour l'image (ajuster la taille selon besoin)
        const imageWidth = 0.8 * LANE_WIDTH;
        const imageHeight = 1.2; // Hauteur de l'image (ajuster selon les proportions)
        const imageGeometry = new THREE.PlaneGeometry(imageWidth, imageHeight);

        // Créer le mesh avec la géométrie et le matériau
        const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);

        // Positionner l'image à la fin de la ligne (ajuster selon besoin)
        // FLOOR_LENGTH * 0.9 / 2 est la moitié de la longueur de la ligne
        const zPosition = lanes[index].position.z - (FLOOR_LENGTH * 0.9 / 2) - 0.05;

        // Ajuster la position Y pour que l'image soit au-dessus de la ligne
        imageMesh.position.set(xPosition, 0.6 + imageHeight / 2, zPosition);

        // Rotation pour que l'image soit face à la caméra
        imageMesh.rotation.x = 0;

        // Échelle initiale réduite pour l'animation
        imageMesh.scale.set(0.01, 0.01, 0.01);

        // Stockage des données d'animation
        imageAnimations[index] = {
            progress: 0,          // Progression de l'animation (0 à 1)
            delay: index * 0.2 + 1.0, // Délai après l'animation des lignes
            duration: 1.0,        // Durée de l'animation
            mesh: imageMesh       // Référence au mesh pour l'animation
        };

        // Ajouter l'image à la scène
        scene.add(imageMesh);

        // Stocker la référence à l'image
        laneImages[index] = imageMesh;
    });
}

// Mettre à jour le nom d'une ligne
function updateLaneName(index, newName) {
    if (index >= 0 && index < 10) {
        laneNames[index] = newName;

        // Recréer les lignes pour mettre à jour les noms
        // Note: dans une implémentation plus avancée, on mettrait à jour uniquement
        // la texture du nom spécifique sans recréer toutes les lignes
        scene.remove(...lanes);
        scene.remove(...nameLabels);
        scene.remove(...laneNumbers);
        scene.remove(...laneImages);
        lanes = [];
        nameLabels = [];
        laneNumbers = [];
        laneImages = [];
        laneAnimations = [];
        createLanes();
    }
}

// Redimensionner la fenêtre
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation
function animate() {
    requestAnimationFrame(animate);

    // Mise à jour des contrôles si disponibles
    if (controls) {
        controls.update();
    }

    console.log("Animation en cours, temps:", animationTime);

    // Incrémenter le temps d'animation
    animationTime += animationSpeed;
    const currentTime = animationTime;

    // Variable pour savoir si toutes les animations sont terminées
    let allFinished = true;

    // Animer chaque ligne
    for (let i = 0; i < lanes.length; i++) {
        const lane = lanes[i];
        const anim = laneAnimations[i];

        // Ne commence l'animation qu'après le délai spécifié
        if (currentTime > anim.delay) {
            // Calcul de la progression (0 à 1)
            anim.progress = Math.min(1, (currentTime - anim.delay) / anim.duration);

            // Application de l'effet de dessin du haut vers le bas
            lane.scale.y = anim.progress;

            // Ajuster la position Z pour que la ligne "grandisse" vers le bas
            const halfLength = (FLOOR_LENGTH * 0.9) / 2;
            lane.position.z = anim.startZ - (halfLength * anim.progress);

            // Vérifier si cette animation est terminée
            if (anim.progress < 1) {
                allFinished = false;
            } else {
                // Ajouter le nom à la ligne une fois l'animation terminée
                addNameToLane(i, (-FLOOR_WIDTH / 2 + LANE_WIDTH / 2 + i * LANE_WIDTH) + -0.5);
                addNumberToLane(i, (-FLOOR_WIDTH / 2 + LANE_WIDTH / 2 + i * LANE_WIDTH) + -0.5);
                // addImageToLane(i, (-FLOOR_WIDTH / 2 + LANE_WIDTH / 2 + i * LANE_WIDTH) + -0.5);
            }
        } else {
            allFinished = false;
        }
    }

    // Animer les images
    for (let i = 0; i < imageAnimations.length; i++) {
        const anim = imageAnimations[i];
        if (anim && anim.mesh) {
            // Ne commence l'animation qu'après le délai spécifié
            if (currentTime > anim.delay) {
                // Calcul de la progression (0 à 1)
                anim.progress = Math.min(1, (currentTime - anim.delay) / anim.duration);

                // Animation d'apparition progressive
                anim.mesh.material.opacity = anim.progress;

                // Animation d'échelle progressive
                const scale = 0.01 + anim.progress * 0.99; // De 0.01 à 1.0
                anim.mesh.scale.set(scale, scale, scale);

                // Vérifier si cette animation est terminée
                if (anim.progress < 1) {
                    allFinished = false;
                }
            } else {
                allFinished = false;
            }
        }
    }

    // Si toutes les animations sont terminées, on peut optionnellement faire quelque chose
    if (allFinished && isAnimating) {
        isAnimating = false;
        console.log("Toutes les animations sont terminées");
    }

    // Rendu de la scène
    renderer.render(scene, camera);
    // composer.render();
    enhanceDepthPerception()
    useEnhancedColorPalette()
}

// Ajouter du post-processing pour un rendu plus professionnel
function addPostProcessing() {
    const composer = new THREE.EffectComposer(renderer);
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Ajout d'un léger effet de bloom sur les lignes
    const bloomPass = new THREE.UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.5,  // intensité
        0.4,  // rayon
        0.85  // seuil
    );
    composer.addPass(bloomPass);

    // Remplacer renderer.render() par composer.render() dans la fonction animate()
}

// Améliorer le rendu des noms sur les lignes
function enhanceNameTexture(index, name) {
    const canvas = document.createElement('canvas');
    canvas.width = 800; // Haute résolution
    canvas.height = 200;

    const ctx = canvas.getContext('2d');

    // Dégradé pour le fond
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgba(25, 25, 75, 0.85)');
    gradient.addColorStop(1, 'rgba(49, 49, 122, 0.6)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Texte avec ombre et bordure
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Ombre du texte
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Texte principal
    ctx.fillStyle = 'white';
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);
}

// Améliorer la perception de profondeur
function enhanceDepthPerception() {
    // Ajouter un effet de brouillard subtil
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    // Ajouter des repères de profondeur
    // const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    // gridHelper.position.y = 0.1;
    // scene.add(gridHelper);
}

// Utiliser une palette de couleurs plus élaborée
function useEnhancedColorPalette() {
    // Définir une palette pour les lignes
    const laneColors = [
        0x3a4a9d, // Bleu roi
        0x304689, // Bleu marine
        0x2c5282, // Bleu moyen
        0x386fa4, // Bleu acier
        0x336699  // Bleu classique
    ];

    // Appliquer des variations de couleur aux lignes
    lanes.forEach((lane, index) => {
        lane.material.color.set(laneColors[index % laneColors.length]);
    });
}

// API publique pour changer les noms des lignes
window.updateLaneName = updateLaneName;