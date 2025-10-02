// Contrôles de perspective
let perspectiveControls = {
    fov: 70,
    distance: 7.5,
    height: 5,
    rotationX: 0,
    rotationY: 0,
    positionX: -0.1,  // Nouveau
    positionZ: 0      // Nouveau
};

const perspectiveControlsReplicant = nodecg.Replicant('perspectiveControlsReplicant', {
    fov: 70,
    distance: 7.5,
    height: 5,
    rotationX: 0,
    rotationY: 0,
    positionX: -0.1,  // Nouveau
    positionZ: 0      // Nouveau
})

if (perspectiveControlsReplicant.value == null) {
    perspectiveControlsReplicant.value = perspectiveControls
}


function initPerspectiveControls() {
    const fovSlider = document.getElementById('fov');
    const distanceSlider = document.getElementById('distance');
    const heightSlider = document.getElementById('height');
    const rotationXSlider = document.getElementById('rotation-x');
    const rotationYSlider = document.getElementById('rotation-y');
    const positionXSlider = document.getElementById('position-x');
    const positionZSlider = document.getElementById('position-z');
    const resetButton = document.getElementById('reset-camera');

    if (!fovSlider || !distanceSlider || !heightSlider || !rotationXSlider || !rotationYSlider || !positionXSlider || !positionZSlider) return;

    // Event listeners pour les sliders
    fovSlider.addEventListener('input', (e) => {
        perspectiveControlsReplicant.value.fov = parseFloat(e.target.value);
        document.getElementById('fov-value').textContent = e.target.value + '°';
        console.log(perspectiveControlsReplicant)
    });

    distanceSlider.addEventListener('input', (e) => {
        perspectiveControlsReplicant.value.distance = parseFloat(e.target.value);

        document.getElementById('distance-value').textContent = e.target.value;
    });

    heightSlider.addEventListener('input', (e) => {
        perspectiveControlsReplicant.value.height = parseFloat(e.target.value);

        document.getElementById('height-value').textContent = e.target.value;
    });

    rotationXSlider.addEventListener('input', (e) => {
        perspectiveControlsReplicant.value.rotationX = parseFloat(e.target.value);

        document.getElementById('rotation-x-value').textContent = e.target.value + '°';
    });

    rotationYSlider.addEventListener('input', (e) => {
        perspectiveControlsReplicant.value.rotationY = parseFloat(e.target.value);

        document.getElementById('rotation-y-value').textContent = e.target.value + '°';
    });

    positionXSlider.addEventListener('input', (e) => {
        perspectiveControlsReplicant.value.positionX = parseFloat(e.target.value);

        document.getElementById('position-x-value').textContent = e.target.value;
    });

    positionZSlider.addEventListener('input', (e) => {
        perspectiveControlsReplicant.value.positionZ = parseFloat(e.target.value);

        document.getElementById('position-z-value').textContent = e.target.value;
    });

    resetButton.addEventListener('click', () => {
        perspectiveControlsReplicant.value = {
            fov: 70,
            distance: 7.5,
            height: 5,
            rotationX: 0,
            rotationY: 0,
            positionX: -0.1,
            positionZ: 0
        };
        fovSlider.value = 70;
        distanceSlider.value = 7.5;
        heightSlider.value = 5;
        rotationXSlider.value = 0;
        rotationYSlider.value = 0;
        positionXSlider.value = -0.1;
        positionZSlider.value = 0;

    });
}



// Initialiser les contrôles après le chargement
window.addEventListener('load', () => {
    setTimeout(initPerspectiveControls, 1000);
});