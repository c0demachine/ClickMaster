// ─── STATE ───────────────────────────────────────────────────────
let state = {
    points: 0,
    totalClicks: 0,
    clickPower: 1,
    cps: 0,
    manualUpgrades: {},
    autoUpgrades: {},
    prestigeCount: 0,
    prestigeMultiplier: 1.0,
    achievementMultiplier: 1.0,
    achievements: {},
    lastTimestamp: Date.now(),
    skin: 'default',
    showClicker: true
};

var MANUAL_UPGRADES = window.MANUAL_UPGRADES || [];
var AUTO_UPGRADES = window.AUTO_UPGRADES || [];
var ACHIEVEMENTS = window.ACHIEVEMENTS || [];

// Speed click tracker
let recentClicks = [];

// ─── INIT STATE ───────────────────────────────────────────────────
function ensureStateDefaults() {
    if (!window.MANUAL_UPGRADES || !window.AUTO_UPGRADES || !window.ACHIEVEMENTS) {
        console.warn("Upgrades or Achievements not found on window. Retrying...");
    }
    const manual = window.MANUAL_UPGRADES || [];
    const auto = window.AUTO_UPGRADES || [];
    const ach = window.ACHIEVEMENTS || [];

    manual.forEach(u => { if (state.manualUpgrades[u.id] === undefined) state.manualUpgrades[u.id] = 0; });
    auto.forEach(u => { if (state.autoUpgrades[u.id] === undefined) state.autoUpgrades[u.id] = 0; });
    ach.forEach(a => { if (state.achievements[a.id] === undefined) state.achievements[a.id] = false; });
}
ensureStateDefaults();

// ─── MULTIPLIER ───────────────────────────────────────────────────
function getTotalMultiplier() {
    return state.prestigeMultiplier * state.achievementMultiplier;
}

// ─── COST SCALING ─────────────────────────────────────────────────
function getManualCost(upg) { return Math.floor(upg.baseCost * Math.pow(1.5, state.manualUpgrades[upg.id])); }
function getAutoCost(upg) { return Math.floor(upg.baseCost * Math.pow(1.5, state.autoUpgrades[upg.id])); }

function recalcTotals() {
    state.clickPower = 1;
    const manual = window.MANUAL_UPGRADES || [];
    manual.forEach(u => { 
        const owned = state.manualUpgrades[u.id] || 0;
        state.clickPower += u.clickBonus * owned; 
    });
    state.cps = 0;
    const auto = window.AUTO_UPGRADES || [];
    auto.forEach(u => { 
        const owned = state.autoUpgrades[u.id] || 0;
        state.cps += u.cpsBonus * owned; 
    });
}

// ─── SOUND ENGINE (Web Audio API — no files needed) ───────────────
let audioCtx = null;
let soundMuted = localStorage.getItem('cm_muted') === 'true';

function getAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

function playTone(freq, duration, type = 'sine', volume = 0.3, startDelay = 0) {
    if (soundMuted) return;
    try {
        const ctx = getAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);
        gain.gain.setValueAtTime(volume, ctx.currentTime + startDelay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startDelay + duration);
        osc.start(ctx.currentTime + startDelay);
        osc.stop(ctx.currentTime + startDelay + duration + 0.05);
    } catch (e) { }
}

function playClickSound() { playTone(440, 0.08, 'sine', 0.15); }
function playPurchaseSound() { playTone(523, 0.06, 'sine', 0.4); playTone(784, 0.1, 'sine', 0.4, 0.07); }
function playAchievementSound() { playTone(523, 0.12, 'triangle', 0.5); playTone(659, 0.12, 'triangle', 0.5, 0.13); playTone(784, 0.2, 'triangle', 0.5, 0.26); }
function playPrestigeSound() {
    try {
        const ctx = getAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.6, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.75);
    } catch (e) { }
    playTone(1046, 0.3, 'sine', 0.5, 0.7);
}

function toggleSound() {
    soundMuted = !soundMuted;
    localStorage.setItem('cm_muted', soundMuted);
    document.getElementById('soundBtn').textContent = soundMuted ? '🔇' : '🔊';
    if (!soundMuted) playPurchaseSound();
}

// ─── PIXEL LOGO ───────────────────────────────────────────────────
function drawDefaultLogo() {
    const c = document.getElementById('defaultLogo');
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const S = 120, G = 8, cell = S / G;
    const grid = [
        [0, 0, 2, 2, 2, 2, 0, 0], [0, 2, 1, 1, 1, 1, 2, 0], [2, 1, 3, 1, 1, 3, 1, 2], [2, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 3, 3, 1, 1, 2], [2, 1, 3, 1, 1, 3, 1, 2], [0, 2, 1, 1, 1, 1, 2, 0], [0, 0, 2, 2, 2, 2, 0, 0],
    ];
    const colors = ['#1a1a2e', '#00ff88', '#0a3020', '#ffd700', '#ff6b35'];
    grid.forEach((row, r) => row.forEach((v, c2) => {
        ctx.fillStyle = colors[v]; ctx.fillRect(c2 * cell, r * cell, cell, cell);
    }));
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(0, 0, S, 4); ctx.fillRect(0, S - 4, S, 4);
    ctx.fillRect(0, 0, 4, S); ctx.fillRect(S - 4, 0, 4, S);
}

function handleLogoUpload(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        document.getElementById('clickBtn').innerHTML = `<img src="${ev.target.result}" alt="logo">`;
        state.customLogo = ev.target.result;
    };
    reader.readAsDataURL(file);
}

function toggleSkin() {
    state.skin = state.skin === 'default' ? 'cookie' : 'default';
    applySkin();
    autoSave();
    showNotif(`SKIN CHANGED TO ${state.skin.toUpperCase()}`);
}

function applySkin() {
    const body = document.body;
    const btn = document.getElementById('clickBtn');
    const skinDesc = document.getElementById('skinDesc');

    if (state.skin === 'cookie') {
        body.classList.add('skin-cookie');
        if (!state.customLogo) {
            btn.innerHTML = `<img src="assets/cookie_logo.png" alt="cookie">`;
        }
        if (skinDesc) skinDesc.textContent = "Current: COOKIE (Click to switch)";
    } else {
        body.classList.remove('skin-cookie');
        if (!state.customLogo) {
            btn.innerHTML = '<canvas id="defaultLogo" width="120" height="120"></canvas>';
            drawDefaultLogo();
        }
        if (skinDesc) skinDesc.textContent = "Current: DEFAULT (Click to switch)";
    }
    applyClickerVisibility();
}

function toggleClickerVisibility() {
    state.showClicker = !state.showClicker;
    applyClickerVisibility();
    autoSave();
}

function applyClickerVisibility() {
    const area = document.querySelector('.clicker-area');
    if (!area) return;
    area.classList.toggle('hidden-clicker', !state.showClicker);
    const btn = document.getElementById('hideClickerBtn');
    if (btn) {
        btn.innerHTML = state.showClicker ? '👁 HIDE CLICKER' : '👁 SHOW CLICKER';
        btn.querySelector('.modal-desc').textContent = state.showClicker ? 'Hide the clicker to save space.' : 'Bring back the clicker.';
    }
}

// ─── CLICK HANDLER ────────────────────────────────────────────────
function handleClick(e) {
    const earned = state.clickPower * getTotalMultiplier();
    state.points += earned;
    state.totalClicks++;

    // Speed click tracking
    const now = Date.now();
    recentClicks = recentClicks.filter(t => now - t < 3000);
    recentClicks.push(now);
    if (recentClicks.length >= 10) state._speedAchieved = true;

    playClickSound();

    const btn = document.getElementById('clickBtn');
    btn.classList.remove('clicked'); void btn.offsetWidth; btn.classList.add('clicked');

    const wrap = btn.parentElement;
    const wRect = wrap.getBoundingClientRect();
    const ox = e.clientX - wRect.left;
    const oy = e.clientY - wRect.top;

    const floater = document.createElement('div');
    floater.className = 'float-num';
    floater.textContent = '+' + fmt(earned);
    floater.style.left = (ox - 10) + 'px';
    floater.style.top = (oy - 10) + 'px';
    wrap.appendChild(floater);
    floater.addEventListener('animationend', () => floater.remove());

    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = ox + 'px'; ripple.style.top = oy + 'px';
    wrap.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());

    updateUI();
}

// ─── CPS LOOP ─────────────────────────────────────────────────────
let cpsAccum = 0, lastTick = Date.now();
setInterval(() => {
    const now = Date.now();
    const dt = (now - lastTick) / 1000;
    lastTick = now;
    if (state.cps > 0) {
        state.points += state.cps * dt * getTotalMultiplier();
        cpsAccum += state.cps * dt;

        const btn = document.getElementById('clickBtn');

        // High CPS handling (e.g. > 10 CPS): 
        // Use a continuous subtle glow instead of discrete pulses.
        if (state.cps >= 10) {
            btn.classList.add('working');
            btn.classList.remove('auto-ping');
        } else {
            btn.classList.remove('working');
            // Low CPS handling: ping discrete times for each "click"
            if (cpsAccum >= 1) {
                cpsAccum = 0;
                if (!btn.classList.contains('auto-ping')) {
                    btn.classList.add('auto-ping');
                    btn.addEventListener('animationend', () => {
                        btn.classList.remove('auto-ping');
                    }, { once: true });
                }
            }
        }
    } else {
        const btn = document.getElementById('clickBtn');
        if (btn) btn.classList.remove('working', 'auto-ping');
    }
    updateUI();
}, 50);

// ─── ACHIEVEMENT CHECK (runs every second) ────────────────────────
setInterval(() => {
    let newUnlock = false;
    ACHIEVEMENTS.forEach(a => {
        if (!state.achievements[a.id] && a.condition(state)) {
            state.achievements[a.id] = true;
            state.achievementMultiplier *= a.multiplier;
            showNotif(`🏆 UNLOCKED: ${a.name} (+${((a.multiplier - 1) * 100).toFixed(0)}% FOREVER!)`, 'gold');
            playAchievementSound();
            newUnlock = true;
        }
    });
    if (newUnlock) renderAchievements();
}, 1000);

// ─── FORMAT ───────────────────────────────────────────────────────
function fmt(n) {
    if (n >= 1e15) return (n / 1e15).toFixed(1) + 'Qa';
    if (n >= 1e12) return (n / 1e12).toFixed(1) + 'T';
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return Math.floor(n).toString();
}

// ─── UI UPDATE ────────────────────────────────────────────────────
function updateUI() {
    const mult = getTotalMultiplier();
    document.getElementById('pointsDisplay').textContent = fmt(Math.floor(state.points));
    document.getElementById('cpsDisplay').textContent =
        `+${fmt(state.cps * mult)} CPS  |  +${fmt(state.clickPower * mult)} /CLICK`;

    const pd = document.getElementById('prestigeDisplay');
    const md = document.getElementById('multiplierDisplay');
    if (state.prestigeCount > 0) {
        pd.style.display = 'block';
        pd.textContent = `✨ PRESTIGE ${state.prestigeCount}`;
        md.style.display = 'block';
        md.textContent = `MULTIPLIER: ${mult.toFixed(2)}x`;
    }

    // Update prestige button in settings
    const pb = document.getElementById('prestigeBtn');
    if (pb) {
        if (state.points >= 1e6) {
            pb.disabled = false;
            pb.querySelector('.modal-desc').textContent = 'Reset for permanent +25% multiplier. Ready!';
        } else {
            pb.disabled = true;
            pb.querySelector('.modal-desc').textContent = `Need ${fmt(1e6)} points. You have ${fmt(state.points)}.`;
        }
    }

    document.querySelectorAll('.upgrade-card[data-id]').forEach(card => {
        const id = card.dataset.id, tab = card.dataset.tab;
        if (tab === 'achievement') return;
        const upg = tab === 'manual' ? MANUAL_UPGRADES.find(u => u.id === id) : AUTO_UPGRADES.find(u => u.id === id);
        if (!upg) return;
        const owned = tab === 'manual' ? state.manualUpgrades[id] : state.autoUpgrades[id];
        const cost = tab === 'manual' ? getManualCost(upg) : getAutoCost(upg);
        const canAfford = state.points >= cost;
        card.classList.toggle('affordable', canAfford);
        card.classList.toggle('locked', !canAfford && owned === 0 && state.points < cost * 0.3);
        card.querySelector('.upgrade-cost').textContent = fmt(cost) + ' pts';
        card.querySelector('.upgrade-cost').className = 'upgrade-cost' + (canAfford ? '' : ' cant-afford');
        card.querySelector('.upgrade-owned').textContent = 'OWNED: ' + owned;
    });
}

// ─── RENDER UPGRADES ──────────────────────────────────────────────
function renderUpgrades() {
    const manual = window.MANUAL_UPGRADES || [];
    const auto = window.AUTO_UPGRADES || [];

    renderUpgradeTab('manualGrid', manual, 'manual',
        ['TIER 1 — MUNDANE', 'TIER 2 — REINFORCED', 'TIER 3 — SCIENCE', 'TIER 4 — COSMIC', 'TIER 5 — ADVANCED', 'TIER 6 — MYTHICAL', 'TIER 7 — DIVINE', 'TIER 8 — OMNIPOTENT', 'TIER 9 — TRANSCENDENT', 'TIER 10 — ABSOLUTE'], 11);
    renderUpgradeTab('autoGrid', auto, 'auto',
        ['TIER 1 — BEGINNER', 'TIER 2 — SCRIPTS', 'TIER 3 — INDUSTRIAL', 'TIER 4 — ADVANCED', 'TIER 5 — SCI-FI', 'TIER 6 — COSMIC', 'TIER 7 — DIVINE', 'TIER 8 — ASTRAL', 'TIER 9 — TRANSCENDENT', 'TIER 10 — ABSOLUTE'], 11);
}

function renderUpgradeTab(gridId, list, tab, sectionNames, perSection) {
    if (!list || !Array.isArray(list)) {
        return;
    }
    const grid = document.getElementById(gridId);
    if (!grid) {
        return;
    }
    grid.innerHTML = '';
    list.forEach((upg, i) => {
        if (i % perSection === 0 && sectionNames[i / perSection]) {
            const hdr = document.createElement('div');
            hdr.className = 'upgrade-section-header';
            hdr.textContent = '▸ ' + sectionNames[i / perSection];
            grid.appendChild(hdr);
        }
        const owned = tab === 'manual' ? state.manualUpgrades[upg.id] : state.autoUpgrades[upg.id];
        const cost = tab === 'manual' ? getManualCost(upg) : getAutoCost(upg);
        const bonusLabel = tab === 'manual' ? `+${upg.clickBonus}/click each` : `+${upg.cpsBonus} CPS each`;
        const div = document.createElement('div');
        div.className = 'upgrade-card'; div.dataset.id = upg.id; div.dataset.tab = tab;
        div.innerHTML = ` <div class="upgrade-icon">${upg.icon}</div> <div class="upgrade-info"> <div class="upgrade-name">${upg.name}</div> <div class="upgrade-desc">${upg.desc} <span style="color:var(--accent2)">(${bonusLabel})</span></div> <div class="upgrade-owned">OWNED: ${owned}</div> </div> <div class="upgrade-cost cant-afford">${fmt(cost)} pts</div>`;
        div.onclick = () => buyUpgrade(upg, tab);
        grid.appendChild(div);
    });
}

function buyUpgrade(upg, tab) {
    const cost = tab === 'manual' ? getManualCost(upg) : getAutoCost(upg);
    if (state.points < cost) return;
    state.points -= cost;
    if (tab === 'manual') state.manualUpgrades[upg.id]++;
    else state.autoUpgrades[upg.id]++;
    recalcTotals(); renderUpgrades(); updateUI();
    playPurchaseSound();
    showNotif('PURCHASED: ' + upg.name);
}

// ─── RENDER ACHIEVEMENTS ──────────────────────────────────────────
function renderAchievements() {
    const grid = document.getElementById('achievementsGrid'); grid.innerHTML = '';
    const summary = document.getElementById('achievementsSummary');
    const unlocked = ACHIEVEMENTS.filter(a => state.achievements[a.id]).length;
    summary.textContent = `${unlocked} / ${ACHIEVEMENTS.length} UNLOCKED  |  TOTAL BONUS: ${getTotalMultiplier().toFixed(2)}x`;

    ACHIEVEMENTS.forEach(a => {
        const isUnlocked = state.achievements[a.id];
        const div = document.createElement('div');
        div.className = 'upgrade-card' + (isUnlocked ? ' unlocked-achievement' : ' locked');
        div.dataset.id = a.id; div.dataset.tab = 'achievement';
        div.innerHTML = `<div class="upgrade-icon">${isUnlocked ? a.icon : '❓'}</div> <div class="upgrade-info"> <div class="upgrade-name" style="color:${isUnlocked ? 'var(--gold)' : 'var(--dim)'}">${isUnlocked ? a.name : '???'}</div> <div class="upgrade-desc">${isUnlocked ? a.desc : 'Keep playing to unlock...'}</div> <div class="upgrade-owned" style="color:${isUnlocked ? 'var(--gold)' : 'var(--dim)'}"> ${isUnlocked ? `✓ UNLOCKED — +${((a.multiplier - 1) * 100).toFixed(0)}% PERMANENT` : `REWARD: +${((a.multiplier - 1) * 100).toFixed(0)}% multiplier`} </div> </div> <div style="font-size:8px;color:${isUnlocked ? 'var(--gold)' : 'var(--dim)'}"> ${isUnlocked ? '🏆' : '🔒'} </div>`;
        grid.appendChild(div);
    });
}

// ─── TABS ─────────────────────────────────────────────────────────
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.dataset.tab === tabName));
    if (tabName === 'achievements') renderAchievements();
    if (tabName === 'leaderboard') renderLeaderboard();
}

// ─── LEADERBOARD ──────────────────────────────────────────────────
function getLeaderboard() {
    try { return JSON.parse(localStorage.getItem('cm_leaderboard') || '[]'); } catch { return []; }
}
function saveLeaderboard(lb) {
    localStorage.setItem('cm_leaderboard', JSON.stringify(lb));
}

function submitScore() {
    const name = prompt('Enter your name:');
    if (!name || !name.trim()) return;
    const lb = getLeaderboard();
    lb.push({
        name: name.trim().toUpperCase().slice(0, 16),
        points: Math.floor(state.points),
        prestige: state.prestigeCount,
        achievements: ACHIEVEMENTS.filter(a => state.achievements[a.id]).length,
        date: new Date().toLocaleDateString(),
    });
    lb.sort((a, b) => b.points - a.points);
    saveLeaderboard(lb.slice(0, 50));
    renderLeaderboard();
    showNotif('SCORE SUBMITTED!');
}

function copyShareCode() {
    const entry = {
        name: prompt('Your name for the share code:') || 'PLAYER',
        points: Math.floor(state.points),
        prestige: state.prestigeCount,
        achievements: ACHIEVEMENTS.filter(a => state.achievements[a.id]).length,
        date: new Date().toLocaleDateString(),
    };
    const code = btoa(JSON.stringify(entry));
    navigator.clipboard.writeText(code).then(() => showNotif('SHARE CODE COPIED!')).catch(() => {
        prompt('Copy this share code:', code);
    });
}

function importScore() {
    const code = prompt('Paste share code here:');
    if (!code) return;
    try {
        const entry = JSON.parse(atob(code.trim()));
        if (!entry.name || entry.points === undefined) throw new Error();
        const lb = getLeaderboard();
        lb.push(entry);
        lb.sort((a, b) => b.points - a.points);
        saveLeaderboard(lb.slice(0, 50));
        renderLeaderboard();
        showNotif('SCORE IMPORTED: ' + entry.name);
    } catch { showNotif('INVALID SHARE CODE'); }
}

function clearLeaderboard() {
    if (!confirm('Clear all leaderboard scores?')) return;
    localStorage.removeItem('cm_leaderboard');
    renderLeaderboard();
    showNotif('LEADERBOARD CLEARED');
}

function renderLeaderboard() {
    const list = document.getElementById('leaderboardList'); list.innerHTML = '';
    const lb = getLeaderboard();
    if (!lb.length) {
        list.innerHTML = '<div style="font-size:8px;color:var(--dim);padding:20px;text-align:center">NO SCORES YET.<br><br>SUBMIT YOUR SCORE!</div>';
        return;
    }
    const medals = ['🥇', '🥈', '🥉'];
    lb.forEach((entry, i) => {
        const div = document.createElement('div');
        div.className = `lb-entry${i < 3 ? ' rank-' + (i + 1) : ''}`;
        div.innerHTML = ` <div class="lb-rank">${medals[i] || '#' + (i + 1)}</div> <div class="lb-name"> ${entry.name} <div class="lb-meta">✨${entry.prestige || 0} prestige  |  🏆${entry.achievements || 0} badges  |  ${entry.date || ''}</div> </div> <div class="lb-score">${fmt(entry.points)}</div>`;
        list.appendChild(div);
    });
}

// ─── PRESTIGE ─────────────────────────────────────────────────────
function confirmPrestige() {
    if (state.points < 1e6) return;
    closeSettings();
    document.getElementById('prestigeModal').classList.add('open');
}
function closePrestige() { document.getElementById('prestigeModal').classList.remove('open'); }

function doPrestige() {
    closePrestige();
    state.prestigeCount++;
    state.prestigeMultiplier = 1 + (0.25 * state.prestigeCount);
    // Reset everything except achievements and prestige stats
    state.points = 0; state.totalClicks = 0;
    MANUAL_UPGRADES.forEach(u => { state.manualUpgrades[u.id] = 0; });
    AUTO_UPGRADES.forEach(u => { state.autoUpgrades[u.id] = 0; });
    recalcTotals();
    state.customLogo = null;
    applySkin();
    renderUpgrades();
    renderAchievements();
    updateUI();
    playPrestigeSound();
    showNotif(`✨ PRESTIGE ${state.prestigeCount}! NOW ${state.prestigeMultiplier.toFixed(2)}x MULTIPLIER!`, 'prestige');
}

// ─── SETTINGS ─────────────────────────────────────────────────────
function openSettings() { document.getElementById('settingsModal').classList.add('open'); }
function closeSettings() { document.getElementById('settingsModal').classList.remove('open'); }
function closeConfirm() { document.getElementById('confirmModal').classList.remove('open'); document.getElementById('settingsModal').classList.add('open'); }
function confirmRestart() { closeSettings(); document.getElementById('confirmModal').classList.add('open'); }

function doRestart() {
    document.getElementById('confirmModal').classList.remove('open');
    state.points = 0; state.totalClicks = 0; state.clickPower = 1; state.cps = 0;
    state.prestigeCount = 0; state.prestigeMultiplier = 1; state.achievementMultiplier = 1;
    MANUAL_UPGRADES.forEach(u => { state.manualUpgrades[u.id] = 0; });
    AUTO_UPGRADES.forEach(u => { state.autoUpgrades[u.id] = 0; });
    ACHIEVEMENTS.forEach(a => { state.achievements[a.id] = false; });
    state.skin = 'default';
    state.customLogo = null;
    applySkin();
    renderUpgrades(); renderAchievements(); updateUI();
    showNotif('GAME RESET. START OVER.');
}

function saveAndRestart() {
    const saveData = JSON.stringify({ ...state, savedAt: new Date().toISOString(), version: 3 }, null, 2);
    const blob = new Blob([saveData], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'clickmaster_save.json'; a.click();
    closeSettings();
    setTimeout(() => { doRestart(); showNotif('SAVED & RESET.'); }, 300);
}

function loadSave() { document.getElementById('saveUpload').click(); }

function handleSaveLoad(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        try {
            const loaded = JSON.parse(ev.target.result);
            state.points = loaded.points || 0;
            state.totalClicks = loaded.totalClicks || 0;
            state.prestigeCount = loaded.prestigeCount || 0;
            state.prestigeMultiplier = loaded.prestigeMultiplier || 1;
            state.achievementMultiplier = loaded.achievementMultiplier || 1;
            MANUAL_UPGRADES.forEach(u => { state.manualUpgrades[u.id] = loaded.manualUpgrades?.[u.id] || 0; });
            AUTO_UPGRADES.forEach(u => { state.autoUpgrades[u.id] = loaded.autoUpgrades?.[u.id] || 0; });
            ACHIEVEMENTS.forEach(a => { state.achievements[a.id] = loaded.achievements?.[a.id] || false; });
            state.skin = loaded.skin || 'default';
            state.customLogo = loaded.customLogo || null;
            recalcTotals(); applySkin(); renderUpgrades(); renderAchievements(); updateUI();
            closeSettings();
            showNotif('SAVE LOADED!');
        } catch { showNotif('ERROR: INVALID SAVE FILE'); }
    };
    reader.readAsText(file); e.target.value = '';
}

// ─── OFFLINE & AUTO-SAVE ──────────────────────────────────────────
function autoSave() {
    state.lastTimestamp = Date.now();
    const saveString = JSON.stringify(state);
    
    // Safety check: verify the string is valid JSON before overwriting the main save
    try {
        JSON.parse(saveString);
        // If we got here, the save data is valid.
        localStorage.setItem('cm_local_save', saveString);
    } catch (e) {
        console.error('Critical: Failed to generate valid save string. Auto-save aborted.', e);
    }
}

function setHardSave() {
    state.lastTimestamp = Date.now();
    localStorage.setItem('cm_hard_save', JSON.stringify(state));
    showNotif('HARD SAVE POINT CREATED!', 'gold');
    playPurchaseSound();
}

function loadHardSave() {
    const raw = localStorage.getItem('cm_hard_save');
    if (!raw) {
        showNotif('NO HARD SAVE FOUND!');
        return;
    }
    if (!confirm('Are you sure? This will overwrite your current progress with your hard save point.')) return;
    
    try {
        const loaded = JSON.parse(raw);
        Object.assign(state, loaded);
        ensureStateDefaults();
        recalcTotals();
        applySkin();
        renderUpgrades();
        renderAchievements();
        updateUI();
        closeSettings();
        showNotif('HARD SAVE RESTORED!', 'gold');
    } catch (e) {
        showNotif('ERROR LOADING HARD SAVE');
    }
}

function autoLoad() {
    const raw = localStorage.getItem('cm_local_save');
    if (!raw) return false;
    try {
        const loaded = JSON.parse(raw);
        // Update state with loaded data
        Object.assign(state, loaded);
        ensureStateDefaults();

        // Calculate AFK earnings
        const now = Date.now();
        const elapsedSeconds = (now - (loaded.lastTimestamp || now)) / 1000;
        recalcTotals(); // Ensure CPS is accurate for calculation
        const mult = getTotalMultiplier();
        const earnings = Math.floor(elapsedSeconds * state.cps * mult);

        if (earnings > 0) {
            state.points += earnings;
            setTimeout(() => {
                showNotif(`WELCOME BACK! +${fmt(earnings)} POINTS EARNED WHILE AWAY!`, 'gold');
            }, 1000);
        }
        return true;
    } catch (e) {
        console.error('Failed to load local save', e);
        return false;
    }
}

// Auto-save every 1s and on close
setInterval(autoSave, 1000);
window.addEventListener('beforeunload', autoSave);

// ─── NOTIFICATION ─────────────────────────────────────────────────
function showNotif(msg, type = '') {
    const n = document.createElement('div');
    n.className = 'notif' + (type ? ' ' + type : '');
    n.textContent = '▶ ' + msg;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 2600);
}

// ─── GITHUB UPDATE POLLING ────────────────────────────────────────
const GITHUB_USER = 'C0demachine'; // Change this to your username
const GITHUB_REPO = 'clickmaster'; // Change this to your repo
const GITHUB_FILE = 'index.html';
const GITHUB_API = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/commits?path=${GITHUB_FILE}&per_page=1`;
let updateAvailable = false;
let knownSHA = localStorage.getItem('cm_last_seen_sha');

async function checkForUpdate() {
    try {
        const res = await fetch(GITHUB_API, { cache: 'no-store', headers: { 'Accept': 'application/vnd.github.v3+json' } });
        if (!res.ok) return;
        const commits = await res.json();
        if (!commits.length) return;
        const latestSHA = commits[0].sha;

        if (!knownSHA) {
            // First time ever checking, or cleared storage. Assume current is latest.
            knownSHA = latestSHA;
            localStorage.setItem('cm_last_seen_sha', latestSHA);
            return;
        }

        const btn = document.getElementById('updateBtn');
        if (latestSHA !== knownSHA) {
            updateAvailable = true;
            btn.textContent = '▲ UPDATE READY';
            btn.classList.add('has-update');
            btn.title = "New version available on GitHub!";
            showNotif('NEW VERSION DETECTED! TAP UPDATE READY TO REFRESH.', 'gold');
        } else {
            btn.textContent = '● UP TO DATE';
            btn.classList.remove('has-update');
            btn.title = "You are running the latest version.";
        }
    } catch (e) {
        console.warn("Update check failed (offline or rate limited)");
    }
}

async function applyUpdate() {
    if (!updateAvailable) {
        showNotif("CHECKING FOR UPDATES...");
        await checkForUpdate();
        if (!updateAvailable) showNotif("YOU ARE UP TO DATE!");
        return;
    }
    // Update the known SHA before reloading so it doesn't prompt again
    // In a real app, the new code would have the new SHA, but for this simulation,
    // we sync the local "tracker" to the remote "latest".
    const res = await fetch(GITHUB_API);
    const commits = await res.json();
    if (commits.length) {
        localStorage.setItem('cm_last_seen_sha', commits[0].sha);
    }
    showNotif('APPLYING UPDATES...');
    setTimeout(() => location.reload(true), 800);
}

setInterval(checkForUpdate, 30000);
checkForUpdate();

// ─── INIT ─────────────────────────────────────────────────────────
function initGame() {
    const loaded = autoLoad();
    document.getElementById('soundBtn').textContent = soundMuted ? '🔇' : '🔊';
    
    // Always call ensureStateDefaults to handle new upgrades or missing data in loaded save
    ensureStateDefaults();
    
    applySkin();
    recalcTotals();
    renderUpgrades();
    renderAchievements();
    updateUI();
    switchTab('manual');
}

initGame();
