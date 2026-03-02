// ════════════════════════════════════════
// STATE
// ════════════════════════════════════════
let configData = {};
let activeSection = null;
let changedCount = 0;

// ════════════════════════════════════════
// NODECG REPLICANTS
// ════════════════════════════════════════
const configsReplicants = nodecg.Replicant('configs');
const activeSetup = nodecg.Replicant('activeSetup');

const backgroundOverlay = nodecg.Replicant('assets:backgroundOverlay', 'leaderboard');
const backgroundTimer = nodecg.Replicant('assets:backgroundTimer', 'leaderboard');
const mainSponsors = nodecg.Replicant('assets:mainSponsor', 'connector');

let setupReplicants = {};
let assetReplicants = {};

function setupDashboard(configEntry) {
    const [filename, name, event, assetName] = configEntry;

    if (!setupReplicants[name]) {
        setupReplicants[name] = nodecg.Replicant(name);
    }

    if (assetName && !assetReplicants[assetName]) {
        const AssetReplicant = nodecg.Replicant(`assets:${assetName}`);
        assetReplicants[assetName] = AssetReplicant;

        AssetReplicant.on('change', (newValue, oldValue) => {
            if (activeSetup.value !== name) return;
            if (newValue.length > 0 && newValue != oldValue) {
                $.getJSON(newValue[0].url, function (data) {
                    console.log("Asset data loaded:", data);
                    nodecg.sendMessage(event, data);
                });
            }
        });
    }

    const replicant = setupReplicants[name];
    const replicantHandler = (value) => {
        if (activeSetup.value !== name) return;
        if (!value) return;

        Object.entries(value).forEach(([sectionKey, section]) => {
            if (!section.element) return;
            section.element.forEach((el) => {
                const elem = document.getElementById(el.name);
                if (!elem) return;

                if (el.type === 'boolean') {
                    elem.checked = !!el.value;
                    const valSpan = document.getElementById(`toggle-val-${el.name}`);
                    if (valSpan) valSpan.textContent = el.value ? 'ON' : 'OFF';
                } else if (el.type === 'select') {
                    elem.value = el.value;
                } else if (el.type === 'number') {
                    elem.value = parseFloat(el.value) || 0;
                } else {
                    elem.value = el.value || '';
                }
            });
        });
    };

    if (!replicant._setupHandlerAttached) {
        replicant.on('change', replicantHandler);
        replicant._setupHandlerAttached = true;
    }

    activeSetup._currentEvent = event;
    activeSetup._currentName = name;
}

activeSetup.on('change', (newValue) => {
    if (!newValue || !configsReplicants.value) return;
    const entry = configsReplicants.value.find(([, name]) => name === newValue);
    if (!entry) return;

    $("#dashboard-select").val(newValue);
    setupDashboard(entry);
    loadConfig(entry[1]);
});

configsReplicants.on('change', (newValue) => {
    const select = $("#dashboard-select");
    const current = select.val();
    select.empty().append('<option value="">— select —</option>');
    newValue.forEach(([filename, name]) => {
        select.append(`<option value="${name}">${name}</option>`);
    });
    if (current) select.val(current);
    if (activeSetup.value) select.val(activeSetup.value);
});

// ════════════════════════════════════════
// LOAD CONFIG JSON
// ════════════════════════════════════════
function loadConfig(name) {
    const replicant = nodecg.Replicant(name);

    NodeCG.waitForReplicants(replicant).then(() => {
        if (!replicant.value) return;
        configData = replicant.value;
        buildNav();
        const firstKey = Object.keys(configData)[0];
        if (firstKey) showSection(firstKey);
        populateAssetSelects();
    });
}

// ════════════════════════════════════════
// NAV
// ════════════════════════════════════════
function buildNav() {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';

    const label = document.createElement('div');
    label.className = 'sidebar-group-label';
    label.textContent = 'Parameters';
    sidebar.appendChild(label);

    Object.entries(configData).forEach(([key, section]) => {
        const item = document.createElement('div');
        item.className = 'nav-item';
        item.dataset.key = key;
        item.innerHTML = `
            <span class="nav-icon">${section.icon || '◆'}</span>
            <span class="nav-title">${section.title}</span>
            <span class="nav-badge">${section.element.length}</span>
        `;
        item.addEventListener('click', () => showSection(key));
        sidebar.appendChild(item);
    });
}

// ════════════════════════════════════════
// SHOW SECTION
// ════════════════════════════════════════
function showSection(key) {
    activeSection = key;
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.toggle('active', el.dataset.key === key);
    });

    const section = configData[key];
    const main = document.getElementById('main');
    main.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'section active';
    wrapper.innerHTML = `
        <div class="section-header">
            <span class="section-icon">${section.icon || '◆'}</span>
            <h2 class="section-title">${section.title}</h2>
            <span class="section-meta">${section.element.length} fields</span>
        </div>
        <div class="fields-grid" id="fields-grid"></div>
    `;
    main.appendChild(wrapper);

    const grid = document.getElementById('fields-grid');
    section.element.forEach((el, index) => {
        grid.appendChild(buildCard(key, el, index));
    });

    document.getElementById('bar-section').textContent = section.title.toUpperCase();
    populateAssetSelects();
}

// ════════════════════════════════════════
// BUILD FIELD CARD
// ════════════════════════════════════════
function buildCard(sectionKey, el, index) {
    const card = document.createElement('div');
    card.className = 'field-card';
    card.innerHTML = `
        <div class="field-label">
            <span class="field-title">${el.title}</span>
            <span class="field-id">${el.name}</span>
        </div>
    `;
    card.appendChild(buildInput(sectionKey, el, index));
    return card;
}

function buildInput(sectionKey, el, index) {
    const wrap = document.createElement('div');

    switch (el.type) {
        case 'boolean': {
            wrap.className = 'toggle-row';
            const label = document.createElement('label');
            label.className = 'toggle';
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.id = el.name;
            cb.checked = !!el.value;
            const track = document.createElement('span');
            track.className = 'toggle-track';
            label.appendChild(cb);
            label.appendChild(track);
            const valSpan = document.createElement('span');
            valSpan.className = 'toggle-val';
            valSpan.id = `toggle-val-${el.name}`;
            valSpan.textContent = el.value ? 'ON' : 'OFF';
            cb.addEventListener('change', e => {
                valSpan.textContent = e.target.checked ? 'ON' : 'OFF';
                updateVal(sectionKey, index, e.target.checked);
            });
            wrap.appendChild(label);
            wrap.appendChild(valSpan);
            break;
        }

        case 'select': {
            const sel = document.createElement('select');
            sel.className = 'field-select';
            sel.id = el.name;
            (el.options || []).forEach(opt => {
                const o = document.createElement('option');
                o.value = opt;
                o.textContent = opt;
                o.selected = opt === el.value;
                sel.appendChild(o);
            });
            sel.addEventListener('change', e => updateVal(sectionKey, index, e.target.value));
            wrap.appendChild(sel);
            break;
        }

        case 'number': {
            wrap.className = 'input-row';
            const inp = document.createElement('input');
            inp.type = 'number';
            inp.id = el.name;
            inp.value = parseFloat(el.value) || 0;
            inp.addEventListener('input', e => {
                updateVal(sectionKey, index, parseFloat(e.target.value) || 0);
            });
            wrap.appendChild(inp);
            break;
        }

        default: {
            const inp = document.createElement('input');
            inp.type = 'text';
            inp.id = el.name;
            inp.value = el.value || '';
            inp.addEventListener('input', e => updateVal(sectionKey, index, e.target.value));
            wrap.appendChild(inp);
        }
    }
    return wrap;
}

// ════════════════════════════════════════
// UPDATE VALUE
// ════════════════════════════════════════
function updateVal(sectionKey, index, value) {
    configData[sectionKey].element[index].value = value;
    changedCount++;
    document.getElementById('bar-changes').textContent = `${changedCount} change${changedCount > 1 ? 's' : ''}`;
}

// ════════════════════════════════════════
// ACTUALISER (APPLY)
// ════════════════════════════════════════
function Actualiser() {
    const event = activeSetup._currentEvent;
    if (event) {
        nodecg.sendMessage(event, configData);
        changedCount = 0;
        document.getElementById('bar-changes').textContent = '0 changes';
        showToast('APPLIED ✓');
    } else {
        showToast('NO SETUP SELECTED');
    }
}

// ════════════════════════════════════════
// EXPORT
// ════════════════════════════════════════
function exportConfig() {
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeSetup._currentName || 'setup'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('EXPORTED ✓');
}

// ════════════════════════════════════════
// RESET
// ════════════════════════════════════════
function resetConfig() {
    changedCount = 0;
    document.getElementById('bar-changes').textContent = '0 changes';
    if (activeSetup._currentName) {
        loadConfig(activeSetup._currentName);
    }
    showToast('RESET');
}

// ════════════════════════════════════════
// POPULATE ASSET SELECTS
// ════════════════════════════════════════
function populateAssetSelects() {
    const currentSetup = activeSetup.value ? setupReplicants[activeSetup.value] : null;
    const setupData = currentSetup?.value || {};

    if (backgroundOverlay.value && backgroundOverlay.value.length > 0) {
        const sel = document.getElementById('overlayBackgroundSelect');
        if (sel) {
            let savedVal = sel.value;
            Object.values(setupData).forEach(section => {
                if (section.element) {
                    const elem = section.element.find(e => e.name === 'overlayBackgroundSelect');
                    if (elem) savedVal = elem.value;
                }
            });

            sel.innerHTML = '<option value="">Please, choose overlay</option>';
            backgroundOverlay.value.forEach(e => {
                const opt = document.createElement('option');
                opt.value = e.url;
                opt.textContent = e.name;
                sel.appendChild(opt);
            });
            if (savedVal) sel.value = savedVal;
        }
    }

    if (backgroundTimer.value && backgroundTimer.value.length > 0) {
        const sel = document.getElementById('backgroundTimerSelect');
        if (sel) {
            let savedVal = sel.value;
            Object.values(setupData).forEach(section => {
                if (section.element) {
                    const elem = section.element.find(e => e.name === 'backgroundTimerSelect');
                    if (elem) savedVal = elem.value;
                }
            });

            sel.innerHTML = '<option value="">Please, choose background</option>';
            backgroundTimer.value.forEach(e => {
                const opt = document.createElement('option');
                opt.value = e.url;
                opt.textContent = e.name;
                sel.appendChild(opt);
            });
            if (savedVal) sel.value = savedVal;
        }
    }

    if (mainSponsors.value && mainSponsors.value.length > 0) {
        const sel = document.getElementById('mainSponsorSelect');
        if (sel) {
            let savedVal = sel.value;
            Object.values(setupData).forEach(section => {
                if (section.element) {
                    const elem = section.element.find(e => e.name === 'mainSponsorSelect');
                    if (elem) savedVal = elem.value;
                }
            });

            sel.innerHTML = '<option value="">Please, choose sponsor</option>';
            mainSponsors.value.forEach(e => {
                const opt = document.createElement('option');
                opt.value = e.url;
                opt.textContent = e.name;
                sel.appendChild(opt);
            });
            if (savedVal) sel.value = savedVal;
        }
    }
}

backgroundOverlay.on('change', () => populateAssetSelects());
backgroundTimer.on('change', () => populateAssetSelects());
mainSponsors.on('change', () => populateAssetSelects());

// ════════════════════════════════════════
// TOAST
// ════════════════════════════════════════
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

// ════════════════════════════════════════
// INIT
// ════════════════════════════════════════
NodeCG.waitForReplicants(configsReplicants, activeSetup).then(() => {
    $('#dashboard-select').on('change', function () {
        activeSetup.value = $(this).val();
    });

    if (activeSetup.value) {
        const entry = configsReplicants.value.find(([, name]) => name === activeSetup.value);
        console.log("Initial setup:", activeSetup.value, entry);
        if (entry) {
            setupDashboard(entry);
            loadConfig(entry[1]);
        }
    }
});
