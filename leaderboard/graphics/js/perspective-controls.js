

const perspectiveControlsReplicant = nodecg.Replicant('perspectiveControlsReplicant')



perspectiveControlsReplicant.on('change', (newValue) => {
    updateCamera(newValue)
})

function updateCamera(perspectiveControls) {
    if (!camera) return;

    // Mettre à jour le FOV
    camera.fov = perspectiveControls.fov;
    camera.updateProjectionMatrix();

    // Position de base de la caméra
    const x = perspectiveControls.positionX;
    const z = perspectiveControls.distance + perspectiveControls.positionZ;

    camera.position.set(x, perspectiveControls.height, z);

    // Si pas de rotation, utiliser lookAt normal
    if (perspectiveControls.rotationX === 0 && perspectiveControls.rotationY === 0) {
        camera.lookAt(0, 0, -4);
    } else {
        // Calculer la direction de regard avec les rotations
        const rotX = perspectiveControls.rotationX * Math.PI / 180;
        const rotY = perspectiveControls.rotationY * Math.PI / 180;

        // Point de base vers lequel regarder
        const targetX = 0;
        const targetY = 0;
        const targetZ = -4;

        // Calculer le vecteur de direction depuis la caméra vers la cible
        const dirX = targetX - camera.position.x;
        const dirY = targetY - camera.position.y;
        const dirZ = targetZ - camera.position.z;

        // Normaliser le vecteur
        const length = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
        const normDirX = dirX / length;
        const normDirY = dirY / length;
        const normDirZ = dirZ / length;

        // Appliquer les rotations au vecteur de direction
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);

        // Rotation Y (autour de l'axe Y)
        const rotatedDirX = normDirX * cosY - normDirZ * sinY;
        const rotatedDirZ = normDirX * sinY + normDirZ * cosY;

        // Rotation X (autour de l'axe X)
        const finalDirY = normDirY * cosX - rotatedDirZ * sinX;
        const finalDirZ = normDirY * sinX + rotatedDirZ * cosX;

        // Nouveau point de regard
        const newTargetX = camera.position.x + rotatedDirX;
        const newTargetY = camera.position.y + finalDirY;
        const newTargetZ = camera.position.z + finalDirZ;

        camera.lookAt(newTargetX, newTargetY, newTargetZ);
    }
}

// Initialiser les contrôles après le chargement
window.addEventListener('load', () => {
    setTimeout(initPerspectiveControls, 1000);
});