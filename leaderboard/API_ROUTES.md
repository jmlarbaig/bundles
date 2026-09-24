# API Routes - Leaderboard Bundle

Documentation des routes API POST pour contrôler les différents overlays du bundle leaderboard.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Format des routes](#format-des-routes)
- [Types d'éléments](#types-déléments)
- [Routes par overlay](#routes-par-overlay)
- [Éléments SELECT - Options disponibles](#éléments-select---options-disponibles)
- [Exemples d'utilisation](#exemples-dutilisation)

---

## Vue d'ensemble

Les routes sont générées automatiquement à partir des fichiers de configuration dans `configs/`. Chaque élément de type `boolean` ou `select` dans les fichiers de setup génère une route POST correspondante.

**Base URL:** `http://localhost:9090/leaderboard`

---

## Format des routes

### Routes spécifiques par overlay

```http
POST /leaderboard/:overlayType/:section/:element
```

### Route avec setup actif

```http
POST /leaderboard/active/:section/:element
```

Utilise automatiquement le setup défini dans le replicant `activeSetup`.

---

## Types d'éléments

### Boolean

**Format de requête:**

```json
{
  "show": true
}
```

ou

```json
{
  "show": false
}
```

**Réponse:**

```json
{
  "success": true,
  "overlay": "overlay_side_v1",
  "section": "overlay_items",
  "element": "chrono",
  "value": true
}
```

### Select

**Format de requête:**

```json
{
  "value": "option_choisie"
}
```

**Réponse:**

```json
{
  "success": true,
  "overlay": "overlay_side_v1",
  "section": "overlay_items",
  "element": "nameSelect",
  "value": "first",
  "validOptions": ["first", "last", "f.Last", "full"]
}
```

**Erreur si valeur invalide:**

```json
{
  "error": "Invalid value",
  "value": "invalid_option",
  "validOptions": ["first", "last", "f.Last", "full"]
}
```

---

## Routes par overlay

### 1. Setup (`setup`)

**Replicant:** `SetupFile`

#### overlay_items

- `POST /leaderboard/setup/overlay_items/box_logo` (boolean)
- `POST /leaderboard/setup/overlay_items/workout` (boolean)
- `POST /leaderboard/setup/overlay_items/heat` (boolean)
- `POST /leaderboard/setup/overlay_items/chrono` (boolean)
- `POST /leaderboard/setup/overlay_items/cap` (boolean)
- `POST /leaderboard/setup/overlay_items/leaderboards` (boolean)
- `POST /leaderboard/setup/overlay_items/box_bandeau` (boolean)
- `POST /leaderboard/setup/overlay_items/lowerthird` (boolean)
- `POST /leaderboard/setup/overlay_items/nameSelect` (select)
- `POST /leaderboard/setup/overlay_items/unitSelect` (select)
- `POST /leaderboard/setup/overlay_items/timeFormat` (select)
- `POST /leaderboard/setup/overlay_items/overlayBackgroundSelect` (select)
- `POST /leaderboard/setup/overlay_items/backgroundTimerSelect` (select)
- `POST /leaderboard/setup/overlay_items/logoEventSelect` (select)
- `POST /leaderboard/setup/overlay_items/mainSponsorSelect` (select)

#### leaderboard_items

- `POST /leaderboard/setup/leaderboard_items/lane` (boolean)
- `POST /leaderboard/setup/leaderboard_items/affiliate` (boolean)
- `POST /leaderboard/setup/leaderboard_items/flag` (boolean)
- `POST /leaderboard/setup/leaderboard_items/showMvt` (boolean)
- `POST /leaderboard/setup/leaderboard_items/scoreConfig` (select)
- `POST /leaderboard/setup/leaderboard_items/rankingConfig` (select)
- `POST /leaderboard/setup/leaderboard_items/hiddenAthlete` (boolean)

#### chrono_config

- `POST /leaderboard/setup/chrono_config/fortimeAmrap` (boolean)
- `POST /leaderboard/setup/chrono_config/manualChrono` (boolean)

#### wza

- `POST /leaderboard/setup/wza/timeConfig` (select)
- `POST /leaderboard/setup/wza/viewConfig` (select)

#### competition_corner

- `POST /leaderboard/setup/competition_corner/attributionLane` (boolean)
- `POST /leaderboard/setup/competition_corner/heatResults` (boolean)
- `POST /leaderboard/setup/competition_corner/overallStandingDivwod` (boolean)

#### automatic_config

- `POST /leaderboard/setup/automatic_config/automaticSchedule` (boolean)

---

### 2. Overlay Side V1 (`overlay_side_v1`)

**Replicant:** `OverlaySide1Setup`

#### overlay_items

- `POST /leaderboard/overlay_side_v1/overlay_items/box_logo` (boolean)
- `POST /leaderboard/overlay_side_v1/overlay_items/workout` (boolean)
- `POST /leaderboard/overlay_side_v1/overlay_items/heat` (boolean)
- `POST /leaderboard/overlay_side_v1/overlay_items/chrono` (boolean)
- `POST /leaderboard/overlay_side_v1/overlay_items/cap` (boolean)
- `POST /leaderboard/overlay_side_v1/overlay_items/mvt` (boolean)
- `POST /leaderboard/overlay_side_v1/overlay_items/repTar` (boolean)
- `POST /leaderboard/overlay_side_v1/overlay_items/triangleShow` (boolean)
- `POST /leaderboard/overlay_side_v1/overlay_items/leaderboards` (boolean)
- `POST /leaderboard/overlay_side_v1/overlay_items/box_bandeau` (boolean)
- `POST /leaderboard/overlay_side_v1/overlay_items/nameSelect` (select)
- `POST /leaderboard/overlay_side_v1/overlay_items/unitSelect` (select)
- `POST /leaderboard/overlay_side_v1/overlay_items/timeFormat` (select)
- `POST /leaderboard/overlay_side_v1/overlay_items/overlayBackgroundSelect` (select)
- `POST /leaderboard/overlay_side_v1/overlay_items/logoEventSelect` (select)
- `POST /leaderboard/overlay_side_v1/overlay_items/mainSponsorSelect` (select)

#### leaderboard_items

- `POST /leaderboard/overlay_side_v1/leaderboard_items/lane` (boolean)
- `POST /leaderboard/overlay_side_v1/leaderboard_items/affiliate` (boolean)
- `POST /leaderboard/overlay_side_v1/leaderboard_items/flag` (boolean)
- `POST /leaderboard/overlay_side_v1/leaderboard_items/showMvt` (boolean)
- `POST /leaderboard/overlay_side_v1/leaderboard_items/scoreConfig` (select)
- `POST /leaderboard/overlay_side_v1/leaderboard_items/rankingConfig` (select)
- `POST /leaderboard/overlay_side_v1/leaderboard_items/hiddenAthlete` (boolean)

#### chrono_config

- `POST /leaderboard/overlay_side_v1/chrono_config/fortimeAmrap` (boolean)
- `POST /leaderboard/overlay_side_v1/chrono_config/manualChrono` (boolean)

#### competition_corner

- `POST /leaderboard/overlay_side_v1/competition_corner/attributionLane` (boolean)
- `POST /leaderboard/overlay_side_v1/competition_corner/heatResults` (boolean)
- `POST /leaderboard/overlay_side_v1/competition_corner/overallStandingDivwod` (boolean)

#### automatic_config

- `POST /leaderboard/overlay_side_v1/automatic_config/automaticSchedule` (boolean)

---

### 3. Overlay Side (`overlay_side`)

**Replicant:** `OverlaySide2Setup`

Mêmes routes que `overlay_side_v1`, remplacer `overlay_side_v1` par `overlay_side`.

---

### 4. Overlay Top (`overlay_top`)

**Replicant:** `OverlayTop1Setup`

Mêmes routes que `overlay_side_v1`, remplacer `overlay_side_v1` par `overlay_top`.

---

### 5. Overlay Top V2 (`overlay_top_v2`)

**Replicant:** `OverlayTop2Setup`

Mêmes routes que `overlay_side_v1`, remplacer `overlay_side_v1` par `overlay_top_v2`.

---

### 6. Commentator (`commentator`)

**Replicant:** `CommentatorSetup`

Mêmes routes que `overlay_side_v1`, remplacer `overlay_side_v1` par `commentator`.

---

### 7. SK (`sk`)

**Replicant:** `SkSetup`

Mêmes routes que `overlay_side_v1`, remplacer `overlay_side_v1` par `sk`.

---

### 8. BigScreen / Leaderboard / Progression (`bigscreen`, `leaderboard`, `progression`)

**Replicant:** `BigScreenSetup`

#### overlay_items
- `POST /leaderboard/bigscreen/overlay_items/box_logo` (boolean)
- `POST /leaderboard/bigscreen/overlay_items/workout` (boolean)
- `POST /leaderboard/bigscreen/overlay_items/heat` (boolean)
- `POST /leaderboard/bigscreen/overlay_items/chrono` (boolean)
- `POST /leaderboard/bigscreen/overlay_items/cap` (boolean)
- `POST /leaderboard/bigscreen/overlay_items/leaderboards` (boolean)
- `POST /leaderboard/bigscreen/overlay_items/box_bandeau` (boolean)
- `POST /leaderboard/bigscreen/overlay_items/nameSelect` (select)
- `POST /leaderboard/bigscreen/overlay_items/unitSelect` (select)
- `POST /leaderboard/bigscreen/overlay_items/timeFormat` (select)
- `POST /leaderboard/bigscreen/overlay_items/overlayBackgroundSelect` (select)
- `POST /leaderboard/bigscreen/overlay_items/logoEventSelect` (select)
- `POST /leaderboard/bigscreen/overlay_items/mainSponsorSelect` (select)

#### leaderboard_items
- `POST /leaderboard/bigscreen/leaderboard_items/lane` (boolean)
- `POST /leaderboard/bigscreen/leaderboard_items/affiliate` (boolean)
- `POST /leaderboard/bigscreen/leaderboard_items/flag` (boolean)
- `POST /leaderboard/bigscreen/leaderboard_items/showMvt` (boolean)
- `POST /leaderboard/bigscreen/leaderboard_items/scoreConfig` (select)
- `POST /leaderboard/bigscreen/leaderboard_items/rankingConfig` (select)
- `POST /leaderboard/bigscreen/leaderboard_items/hiddenAthlete` (boolean)

#### chrono_config
- `POST /leaderboard/bigscreen/chrono_config/fortimeAmrap` (boolean)
- `POST /leaderboard/bigscreen/chrono_config/manualChrono` (boolean)

#### competition_corner
- `POST /leaderboard/bigscreen/competition_corner/attributionLane` (boolean)
- `POST /leaderboard/bigscreen/competition_corner/heatResults` (boolean)
- `POST /leaderboard/bigscreen/competition_corner/overallStandingDivwod` (boolean)

#### automatic_config
- `POST /leaderboard/bigscreen/automatic_config/automaticSchedule` (boolean)

**Note:** Les routes pour `leaderboard` et `progression` sont identiques, remplacer `bigscreen` par `leaderboard` ou `progression`.

---

### 9. Timer (`timer`)

**Replicant:** `TimerSetup`

#### overlay_items
- `POST /leaderboard/timer/overlay_items/box_logo` (boolean)
- `POST /leaderboard/timer/overlay_items/workout` (boolean)
- `POST /leaderboard/timer/overlay_items/heat` (boolean)
- `POST /leaderboard/timer/overlay_items/chrono` (boolean)
- `POST /leaderboard/timer/overlay_items/cap` (boolean)
- `POST /leaderboard/timer/overlay_items/box_bandeau` (boolean)
- `POST /leaderboard/timer/overlay_items/backgroundTimerSelect` (select)
- `POST /leaderboard/timer/overlay_items/mainSponsorSelect` (select)

#### chrono_config
- `POST /leaderboard/timer/chrono_config/fortimeAmrap` (boolean)
- `POST /leaderboard/timer/chrono_config/manualChrono` (boolean)

---

### 10. Hyperfit (`hyperfit`)

**Replicant:** `HyperfitSetup`

Mêmes routes que `overlay_side_v1`, remplacer `overlay_side_v1` par `hyperfit`.

---

### 11. Overlay WZA (`overlay_wza`)

**Replicant:** `WzaSetup`

Mêmes routes que `setup`.

---

## Éléments SELECT - Options disponibles

### nameSelect (Style de nom)

```json
{
  "value": "first"    // Prénom uniquement
}
{
  "value": "last"     // Nom uniquement
}
{
  "value": "f.Last"   // Initiale prénom + Nom
}
{
  "value": "full"     // Prénom + Nom complet
}
```

### unitSelect (Unité)

```json
{
  "value": ""         // Aucune unité
}
{
  "value": "Reps"     // Répétitions
}
{
  "value": "KG"       // Kilogrammes
}
{
  "value": "LBS"      // Livres
}
```

### timeFormat (Format de temps)

```json
{
  "value": ""                  // Aucun format
}
{
  "value": "hh-mm-ss-msms"    // Heures:Minutes:Secondes:Centièmes
}
{
  "value": "hh-mm-ss-ms"      // Heures:Minutes:Secondes:Dixièmes
}
{
  "value": "hh-mm-ss"         // Heures:Minutes:Secondes
}
{
  "value": "mm-ss-msms"       // Minutes:Secondes:Centièmes
}
{
  "value": "mm-ss-ms"         // Minutes:Secondes:Dixièmes
}
{
  "value": "mm-ss"            // Minutes:Secondes
}
{
  "value": "ss-msms"          // Secondes:Centièmes
}
{
  "value": "ss-ms"            // Secondes:Dixièmes
}
```

### scoreConfig (Configuration du score)

```json
{
  "value": "abs_score"        // Score absolu
}
{
  "value": "rel_score"        // Score relatif
}
{
  "value": "remain_mvt"       // Mouvements restants
}
{
  "value": "mvt_score"        // Score par mouvement
}
{
  "value": "mvt_total_score"  // Score total des mouvements
}
```

### rankingConfig (Configuration du classement)

```json
{
  "value": "rank"     // Classement par rang
}
{
  "value": "lane"     // Classement par lane
}
```

### timeConfig (WZA - Configuration temps)

```json
{
  "value": "avg"      // Moyenne
}
{
  "value": "acc"      // Accumulé
}
```

### viewConfig (WZA - Vue)

```json
{
  "value": "team"     // Vue équipe
}
{
  "value": "indiv"    // Vue individuelle
}
```

### overlayBackgroundSelect, backgroundTimerSelect, logoEventSelect, mainSponsorSelect

Ces éléments ont des options dynamiques (liste vide par défaut). Les options sont remplies à partir des fichiers disponibles dans le système.

---

## Exemples d'utilisation

### Exemple 1: Afficher le chrono sur overlay_side_v1

```bash
curl -X POST http://localhost:9090/leaderboard/overlay_side_v1/overlay_items/chrono \
  -H "Content-Type: application/json" \
  -d '{"show": true}'
```

### Exemple 2: Changer le format de nom sur setup

```bash
curl -X POST http://localhost:9090/leaderboard/setup/overlay_items/nameSelect \
  -H "Content-Type: application/json" \
  -d '{"value": "f.Last"}'
```

### Exemple 3: Configurer le scoring sur bigscreen

```bash
curl -X POST http://localhost:9090/leaderboard/bigscreen/leaderboard_items/scoreConfig \
  -H "Content-Type: application/json" \
  -d '{"value": "rel_score"}'
```

### Exemple 4: Utiliser le setup actif

```bash
curl -X POST http://localhost:9090/leaderboard/active/overlay_items/chrono \
  -H "Content-Type: application/json" \
  -d '{"show": true}'
```

### Exemple 5: JavaScript/Fetch

```javascript
// Afficher le logo
fetch('http://localhost:9090/leaderboard/overlay_side_v1/overlay_items/box_logo', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ show: true })
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));

// Changer le format de temps
fetch('http://localhost:9090/leaderboard/overlay_side_v1/overlay_items/timeFormat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ value: 'mm-ss-msms' })
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
```

---

## Notes importantes

1. **Validation automatique**: Les valeurs des éléments SELECT sont automatiquement validées contre les options disponibles
2. **Persistance**: Toutes les modifications sont sauvegardées dans les fichiers JSON correspondants
3. **Replicants**: Les changements sont immédiatement reflétés dans les replicants NodeCG
4. **Logs**: Au démarrage de NodeCG, toutes les routes créées sont loggées dans la console
5. **Erreurs**: En cas d'erreur, une réponse JSON avec le champ `error` est retournée

---

## Gestion des erreurs

### Replicant non trouvé

```json
{
  "error": "Replicant not found",
  "replicantName": "SetupFile"
}
```

### Section non trouvée

```json
{
  "error": "Section not found",
  "sectionKey": "overlay_items"
}
```

### Élément non trouvé

```json
{
  "error": "Element not found",
  "elementName": "chrono"
}
```

### Valeur invalide (SELECT)

```json
{
  "error": "Invalid value",
  "value": "invalid_option",
  "validOptions": ["first", "last", "f.Last", "full"]
}
```

### Erreur de sauvegarde

```json
{
  "error": "Failed to save"
}
```

---

**Dernière mise à jour:** 2026-09-24
