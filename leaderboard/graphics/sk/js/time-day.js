// Affiche l'heure du jour (HH:MM:SS) dans l'élément ayant l'id `timeOfDay`
(function () {
    'use strict';

    function pad(n) {
        return n < 10 ? '0' + n : n;
    }

    function getTimeString(date) {
        return pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
    }

    function updateTime() {
        var el = document.getElementById('timeOfDay');
        if (!el) return; // si l'élément n'existe pas, on arrête l'update pour cette itération
        el.textContent = getTimeString(new Date());
    }

    // Démarrer maintenant et mettre à jour chaque seconde
    if (typeof window !== 'undefined') {
        updateTime();
        setInterval(updateTime, 1000);
    }
})();
