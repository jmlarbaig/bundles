// ════════════════════════════════════════
// STATE
// ════════════════════════════════════════
let configData = {};       // { sectionKey: { title, icon, element[] } }
let activeSection = null;
let changedCount = 0;

// ════════════════════════════════════════
// NODECG REPLICANTS
// ════════════════════════════════════════
const Fonts = nodecg.Replicant('assets:font');
const configsReplicants = nodecg.Replicant('configs');
const activeDashboard = nodecg.Replicant('activeDashboard');
const chronoState = nodecg.Replicant('ChronoState', 'leaderboard');

let activeListeners = [];

function setupDashboard(configEntry) {
    const [filename, name, event, assetName] = configEntry;
    const AssetReplicant = nodecg.Replicant(`assets:${assetName}`);
    const replicant = nodecg.Replicant(name);

    const assetHandler = (newValue, oldValue) => {
        if (newValue.length > 0 && newValue != oldValue) {
            $.getJSON(newValue[0].url, function (data) {
                console.log("Asset data loaded:", data);
                nodecg.sendMessage(event, data);
            });
        }
    };

    const replicantHandler = (value) => {
        if (!value) return;
        Object.keys(value).forEach((element) => {
            if (typeof value[element] === 'boolean') {
                $("#" + element).prop("checked", value[element]);
                $(`#toggle-val-${element}`).text(value[element] ? 'ON' : 'OFF');
            } else if (String(value[element]).includes('px')) {
                $("#" + element).val(parseFloat(value[element]) || 0);
            } else {
                $("#" + element).val(value[element]);
            }
        });
    };

    AssetReplicant.on('change', assetHandler);
    replicant.on('change', replicantHandler);
    activeListeners.push(
        { replicant: AssetReplicant, handler: assetHandler },
        { replicant: replicant, handler: replicantHandler }
    );
    activeDashboard._currentEvent = event;
    activeDashboard._currentName = name;
}

function teardownListeners() {
    activeListeners.forEach(({ replicant, handler }) => replicant.removeListener('change', handler));
    activeListeners = [];
}

activeDashboard.on('change', (newValue) => {
    if (!newValue || !configsReplicants.value) return;
    const entry = configsReplicants.value.find(([, name]) => name === newValue);
    if (!entry) return;

    $("#dashboard-select").val(newValue);

    teardownListeners();
    setupDashboard(entry);
    loadConfig(entry[1]); // entry[1] = name du replicant, ex: "Colors"
});

configsReplicants.on('change', (newValue) => {
    const select = $("#dashboard-select");
    const current = select.val();
    select.empty().append('<option value="">— select —</option>');
    newValue.forEach(([filename, name]) => {
        select.append(`<option value="${name}">${name}</option>`);
    });
    if (current) select.val(current);
    if (activeDashboard.value) select.val(activeDashboard.value);
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
        applyFonts(); // <- après que les selects sont dans le DOM
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
            <button class="btn-add" onclick="addParam('${key}')" title="Add parameter">+</button>
        </div>
        <div class="fields-grid" id="fields-grid"></div>
    `;
    main.appendChild(wrapper);

    const grid = document.getElementById('fields-grid');
    section.element.forEach((el, index) => {
        grid.appendChild(buildCard(key, el, index));
    });

    document.getElementById('bar-section').textContent = section.title.toUpperCase();

    applyFonts(); // <- après que les selects sont dans le DOM
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
            <button class="btn-delete" onclick="deleteParam('${sectionKey}', ${index})" title="Delete parameter">×</button>
        </div>
    `;
    card.appendChild(buildInput(sectionKey, el, index));
    return card;
}

function buildInput(sectionKey, el, index) {
    const wrap = document.createElement('div');
    const isPx = el.value && String(el.value).includes('px');

    switch (el.type) {
        case 'number': {
            wrap.className = 'input-row';
            const inp = document.createElement('input');
            inp.type = 'number';
            inp.id = el.name;
            inp.value = parseFloat(el.value) || 0;
            inp.addEventListener('input', e => {
                updateVal(sectionKey, index, e.target.value + (isPx ? 'px' : ''));
            });
            const unit = document.createElement('span');
            unit.className = 'unit-tag';
            unit.textContent = isPx ? 'px' : '';
            wrap.appendChild(inp);
            wrap.appendChild(unit);
            break;
        }
        case 'color': {
            wrap.className = 'color-row';
            wrap.style.flexWrap = 'wrap';

            const picker = document.createElement('input');
            picker.type = 'color';
            picker.id = el.name;

            // Parse la valeur initiale (hex ou rgba)
            const parsed = parseColor(el.value);
            picker.value = parsed.hex;

            const hex = document.createElement('input');
            hex.type = 'text';
            hex.className = 'color-hex';
            hex.value = el.value || '#000000';

            const transBtn = document.createElement('button');
            transBtn.textContent = '⌀';
            transBtn.title = 'Transparent';
            transBtn.className = 'btn-transparent' + (el.value === 'transparent' ? ' active' : '');

            const alphaSlider = document.createElement('input');
            alphaSlider.type = 'range';
            alphaSlider.min = 0;
            alphaSlider.max = 100;
            alphaSlider.value = parsed.alpha * 100;
            alphaSlider.className = 'alpha-slider';

            const alphaLabel = document.createElement('span');
            alphaLabel.className = 'unit-tag';
            alphaLabel.textContent = `${Math.round(parsed.alpha * 100)}%`;

            function buildValue() {
                const alpha = alphaSlider.value / 100;
                alphaLabel.textContent = `${alphaSlider.value}%`;
                if (alpha === 1) return picker.value;
                if (alpha === 0) return 'transparent';
                const r = parseInt(picker.value.slice(1, 3), 16);
                const g = parseInt(picker.value.slice(3, 5), 16);
                const b = parseInt(picker.value.slice(5, 7), 16);
                return `rgba(${r},${g},${b},${alpha})`;
            }

            picker.addEventListener('input', e => {
                transBtn.classList.remove('active');
                const val = buildValue();
                hex.value = val;
                updateVal(sectionKey, index, val);
            });

            alphaSlider.addEventListener('input', () => {
                transBtn.classList.remove('active');
                const val = buildValue();
                hex.value = val;
                updateVal(sectionKey, index, val);
            });

            hex.addEventListener('input', e => {
                const v = e.target.value;
                if (/^#[0-9a-fA-F]{6}$/.test(v)) {
                    picker.value = v;
                    alphaSlider.value = 100;
                    alphaLabel.textContent = '100%';
                    transBtn.classList.remove('active');
                    updateVal(sectionKey, index, v);
                } else if (v === 'transparent') {
                    transBtn.classList.add('active');
                    updateVal(sectionKey, index, 'transparent');
                }
            });

            transBtn.addEventListener('click', () => {
                const isTransparent = transBtn.classList.toggle('active');
                if (isTransparent) {
                    hex.value = 'transparent';
                    alphaSlider.value = 0;
                    alphaLabel.textContent = '0%';
                    updateVal(sectionKey, index, 'transparent');
                } else {
                    alphaSlider.value = 100;
                    alphaLabel.textContent = '100%';
                    hex.value = picker.value;
                    updateVal(sectionKey, index, picker.value);
                }
            });

            wrap.appendChild(picker);
            wrap.appendChild(hex);
            wrap.appendChild(transBtn);

            const alphaRow = document.createElement('div');
            alphaRow.className = 'alpha-row';
            alphaRow.appendChild(alphaSlider);
            alphaRow.appendChild(alphaLabel);
            wrap.appendChild(alphaRow);
            break;
        }
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

function parseColor(value) {
    if (!value || value === 'transparent') return { hex: '#000000', alpha: 0 };
    if (/^#[0-9a-fA-F]{6}$/.test(value)) return { hex: value, alpha: 1 };
    const rgba = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgba) {
        const hex = '#' + [rgba[1], rgba[2], rgba[3]]
            .map(n => parseInt(n).toString(16).padStart(2, '0'))
            .join('');
        return { hex, alpha: rgba[4] !== undefined ? parseFloat(rgba[4]) : 1 };
    }
    return { hex: '#000000', alpha: 1 };
}

// ════════════════════════════════════════
// UPDATE VALUE
// ════════════════════════════════════════
function updateVal(sectionKey, index, value) {
    configData[sectionKey].element[index].value = value;
    document.documentElement.style.setProperty(`--${configData[sectionKey].element[index].name}`, value);
    changedCount++;
    document.getElementById('bar-changes').textContent = `${changedCount} change${changedCount > 1 ? 's' : ''}`;
}

// ════════════════════════════════════════
// ACTUALISER (APPLY)
// ════════════════════════════════════════
function Actualiser() {
    // configData est déjà à jour via updateVal()
    // on envoie directement la structure complète
    const event = activeDashboard._currentEvent;
    if (event) {
        nodecg.sendMessage(event, configData);
        changedCount = 0;
        document.getElementById('bar-changes').textContent = '0 changes';
        showToast('APPLIED ✓');
    } else {
        showToast('NO OVERLAY SELECTED');
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
    a.download = `${activeDashboard._currentName || 'config'}.json`;
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
    loadConfig();
    showToast('RESET');
}

const defaultFonts = [
    'Adarsh', 'Antonio', 'Bebas', 'Circo', 'Coamei', 'Hoop',
    'Montserrat', 'Oswald', 'Power', 'Roboto', 'Strasua', 'Typographica'
];

function applyFonts() {
    Object.values(configData).forEach(section => {
        section.element.forEach(el => {
            if (!el.font) return;
            const sel = $(`#${el.name}`);
            if (!sel.length) return;

            // Fusionne defaultFonts + el.options sans doublons
            const allFonts = [...new Set([...defaultFonts, ...(el.options || [])])];

            sel.empty();
            allFonts.forEach(f => {
                sel.append(`<option value="${f}">${f}</option>`);
            });

            // Ajoute les fonts perso uploadées
            if (Fonts.value && Fonts.value.length) {
                Fonts.value.forEach(f => {
                    sel.append(`<option value="${f.name}">${f.name}</option>`);
                });
            }

            sel.val(el.value);
        });
    });
}

Fonts.on('change', (newValue, oldValue) => {
    if (newValue === oldValue) return;
    applyFonts();
});

// ════════════════════════════════════════
// ADD PARAMETER
// ════════════════════════════════════════
function addParam(sectionKey) {
    const modal = document.getElementById('param-modal');
    const form = document.getElementById('param-form');

    form.reset();
    modal.style.display = 'flex';

    form.onsubmit = (e) => {
        e.preventDefault();

        const name = document.getElementById('param-name').value.trim();
        const title = document.getElementById('param-title').value.trim();
        const type = document.getElementById('param-type').value;
        const cssProperty = document.getElementById('param-css').value.trim();
        const value = document.getElementById('param-value').value.trim();

        if (!name || !title) {
            showToast('Name and Title are required');
            return;
        }

        const newParam = {
            name: name,
            title: title,
            type: type,
            value: value || (type === 'boolean' ? false : type === 'number' ? '0px' : type === 'color' ? '#000000' : ''),
            css: cssProperty || (type === 'select' ? '' : getDefaultCssProperty(type))
        };

        if (type === 'select') {
            newParam.options = [];
        }

        configData[sectionKey].element.push(newParam);
        modal.style.display = 'none';
        showSection(sectionKey);
        buildNav();
        changedCount++;
        document.getElementById('bar-changes').textContent = `${changedCount} change${changedCount > 1 ? 's' : ''}`;
        showToast('Parameter added');
    };
}

function getDefaultCssProperty(type) {
    switch (type) {
        case 'color': return 'color';
        case 'number': return 'width';
        case 'text': return 'font-family';
        case 'boolean': return '';
        default: return '';
    }
}

function closeModal() {
    document.getElementById('param-modal').style.display = 'none';
}

// ════════════════════════════════════════
// DELETE PARAMETER
// ════════════════════════════════════════
function deleteParam(sectionKey, index) {
    const param = configData[sectionKey].element[index];
    if (confirm(`Delete parameter "${param.title}" (${param.name})?\n\nWarning: This may break CSS references if this variable is used in stylesheets.`)) {
        configData[sectionKey].element.splice(index, 1);
        showSection(sectionKey);
        buildNav();
        changedCount++;
        document.getElementById('bar-changes').textContent = `${changedCount} change${changedCount > 1 ? 's' : ''}`;
        showToast('Parameter deleted');
    }
}

// ════════════════════════════════════════
// CHRONO
// ════════════════════════════════════════
function ShowChrono() {
    chronoState.value = !chronoState.value;
}

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
NodeCG.waitForReplicants(configsReplicants, activeDashboard).then(() => {
    // Maintenant le select peut écrire dans le replicant
    $('#dashboard-select').on('change', function () {
        activeDashboard.value = $(this).val();
    });

    if (activeDashboard.value) {
        const entry = configsReplicants.value.find(([, name]) => name === activeDashboard.value);
        console.log("Initial dashboard:", activeDashboard.value, entry);
        if (entry) {
            setupDashboard(entry);
            loadConfig(entry[1]);
        }
    }
});