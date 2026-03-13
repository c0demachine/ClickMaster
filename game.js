// ═══════════════════════════════════════════════════════════════
//  CLICKMASTER — game.js  (with achievements, prestige, leaderboard, sound)
// ═══════════════════════════════════════════════════════════════

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
};

// ─── MANUAL UPGRADES ─────────────────────────────────────────────
const MANUAL_UPGRADES = [
    { id: 'm_thicker', name: 'THICKER FINGER', icon: '👆', desc: 'Press harder.', baseCost: 15, clickBonus: 1 },
    { id: 'm_glove', name: 'CLICK GLOVE', icon: '🧤', desc: 'Extra grip.', baseCost: 40, clickBonus: 1 },
    { id: 'm_nail', name: 'LONG NAIL', icon: '💅', desc: 'Precision nail.', baseCost: 100, clickBonus: 2 },
    { id: 'm_knuckle', name: 'IRON KNUCKLE', icon: '✊', desc: 'Reinforced knuckle.', baseCost: 250, clickBonus: 2 },
    { id: 'm_pen', name: 'STYLUS PEN', icon: '🖊️', desc: 'Capacitive tip.', baseCost: 500, clickBonus: 3 },
    { id: 'm_hammer', name: 'CLICK HAMMER', icon: '🔨', desc: 'Hammer the button.', baseCost: 1000, clickBonus: 4 },
    { id: 'm_drill', name: 'POWER DRILL', icon: '🔩', desc: 'Drill click.', baseCost: 2000, clickBonus: 5 },
    { id: 'm_sword', name: 'CLICK SWORD', icon: '⚔️', desc: 'Slice through.', baseCost: 4000, clickBonus: 6 },
    { id: 'm_bolt', name: 'LIGHTNING BOLT', icon: '⚡', desc: 'Electric click.', baseCost: 8000, clickBonus: 8 },
    { id: 'm_fist', name: 'MEGA FIST', icon: '🤜', desc: 'Unstoppable.', baseCost: 15000, clickBonus: 10 },
    { id: 'm_laser', name: 'LASER POINTER', icon: '🔴', desc: 'Precise laser.', baseCost: 30000, clickBonus: 12 },
    { id: 'm_atom', name: 'ATOM SMASHER', icon: '⚛️', desc: 'Sub-atomic clicking.', baseCost: 60000, clickBonus: 15 },
    { id: 'm_magnet', name: 'CLICK MAGNET', icon: '🧲', desc: 'Attracts power.', baseCost: 120000, clickBonus: 18 },
    { id: 'm_plasma', name: 'PLASMA FIST', icon: '🌀', desc: 'Plasma infused.', baseCost: 250000, clickBonus: 22 },
    { id: 'm_quantum', name: 'QUANTUM CLICKER', icon: '🔬', desc: 'Superposition.', baseCost: 500000, clickBonus: 30 },
    { id: 'm_comet', name: 'COMET STRIKE', icon: '☄️', desc: 'Comet energy.', baseCost: 1e6, clickBonus: 40 },
    { id: 'm_nova', name: 'SUPERNOVA PUNCH', icon: '💥', desc: 'Star-level force.', baseCost: 2e6, clickBonus: 55 },
    { id: 'm_black', name: 'BLACK HOLE TAP', icon: '🕳️', desc: 'Gravitational click.', baseCost: 5e6, clickBonus: 75 },
    { id: 'm_galaxy', name: 'GALAXY CRUSHER', icon: '🌌', desc: 'Galaxy-scale power.', baseCost: 10e6, clickBonus: 100 },
    { id: 'm_god', name: 'CLICK DEITY', icon: '👁️', desc: 'Transcend reality.', baseCost: 25e6, clickBonus: 150 },
    { id: 'm_infinity', name: 'INFINITY CLICK', icon: '♾️', desc: 'Click without limit.', baseCost: 50e6, clickBonus: 200 },
    { id: 'm_void', name: 'VOID STRIKE', icon: '🌑', desc: 'Erase existence.', baseCost: 100e6, clickBonus: 300 },
    { id: 'm_time', name: 'TIME CLICKER', icon: '⏳', desc: 'Click through time.', baseCost: 250e6, clickBonus: 500 },
    { id: 'm_omega', name: 'OMEGA FINGER', icon: '🔱', desc: 'The final upgrade.', baseCost: 500e6, clickBonus: 750 },
    { id: 'm_big', name: 'THE BIG CLICK', icon: '💠', desc: 'Click that ends all.', baseCost: 1e9, clickBonus: 1000 },
];

// ─── AUTO UPGRADES ────────────────────────────────────────────────
const AUTO_UPGRADES = [
    { id: 'a_cursor', name: 'AUTO CURSOR', icon: '🖱️', desc: 'A cursor clicks for you.', baseCost: 15, cpsBonus: 1 },
    { id: 'a_ant', name: 'CLICK ANT', icon: '🐜', desc: 'Tiny but tireless.', baseCost: 50, cpsBonus: 1 },
    { id: 'a_mouse', name: 'CLICK MOUSE', icon: '🐭', desc: 'Rodent precision.', baseCost: 120, cpsBonus: 2 },
    { id: 'a_bot', name: 'CLICK BOT', icon: '🤖', desc: 'Mediocre robot.', baseCost: 300, cpsBonus: 2 },
    { id: 'a_drone', name: 'CLICK DRONE', icon: '🚁', desc: 'Aerial clicker.', baseCost: 700, cpsBonus: 3 },
    { id: 'a_script', name: 'CLICK SCRIPT', icon: '📜', desc: 'Shoddy automation.', baseCost: 1500, cpsBonus: 4 },
    { id: 'a_macro', name: 'CLICK MACRO', icon: '⌨️', desc: 'Keyboard macro.', baseCost: 3000, cpsBonus: 5 },
    { id: 'a_virus', name: 'CLICK VIRUS', icon: '🦠', desc: 'Spreads clicks.', baseCost: 6000, cpsBonus: 6 },
    { id: 'a_ai', name: 'CLICK AI', icon: '🧠', desc: 'Neural net clicking.', baseCost: 12000, cpsBonus: 8 },
    { id: 'a_server', name: 'CLICK SERVER', icon: '🖥️', desc: 'Dedicated server.', baseCost: 25000, cpsBonus: 10 },
    { id: 'a_factory', name: 'CLICK FACTORY', icon: '🏭', desc: 'Mass production.', baseCost: 50000, cpsBonus: 15 },
    { id: 'a_mine', name: 'CLICK MINE', icon: '⛏️', desc: 'Mines for clicks.', baseCost: 100000, cpsBonus: 20 },
    { id: 'a_reactor', name: 'CLICK REACTOR', icon: '☢️', desc: 'Nuclear-powered.', baseCost: 200000, cpsBonus: 25 },
    { id: 'a_grid', name: 'POWER GRID', icon: '⚡', desc: 'Citywide click grid.', baseCost: 400000, cpsBonus: 35 },
    { id: 'a_satellite', name: 'CLICK SATELLITE', icon: '🛰️', desc: 'Orbital click array.', baseCost: 800000, cpsBonus: 50 },
    { id: 'a_portal', name: 'CLICK PORTAL', icon: '🌀', desc: 'Portal dimension clicks.', baseCost: 1.5e6, cpsBonus: 65 },
    { id: 'a_nano', name: 'NANOBOT SWARM', icon: '🔬', desc: 'Microscopic clickers.', baseCost: 3e6, cpsBonus: 80 },
    { id: 'a_warp', name: 'WARP ENGINE', icon: '🚀', desc: 'FTL click delivery.', baseCost: 6e6, cpsBonus: 100 },
    { id: 'a_hive', name: 'CLICK HIVEMIND', icon: '🐝', desc: 'Collective clicking.', baseCost: 12e6, cpsBonus: 130 },
    { id: 'a_matrix', name: 'CLICK MATRIX', icon: '💾', desc: 'Simulated click farm.', baseCost: 25e6, cpsBonus: 160 },
    { id: 'a_star', name: 'CLICK STAR', icon: '⭐', desc: 'Stellar click energy.', baseCost: 50e6, cpsBonus: 200 },
    { id: 'a_pulsar', name: 'PULSAR ARRAY', icon: '💫', desc: 'Rhythmic neutron star.', baseCost: 100e6, cpsBonus: 250 },
    { id: 'a_rift', name: 'CLICK RIFT', icon: '🌌', desc: 'Tears spacetime.', baseCost: 200e6, cpsBonus: 320 },
    { id: 'a_universe', name: 'UNIVERSE ENGINE', icon: '🌍', desc: 'Whole universe clicks.', baseCost: 400e6, cpsBonus: 400 },
    { id: 'a_god', name: 'CLICK PANTHEON', icon: '👁️', desc: 'Gods click for you.', baseCost: 1e9, cpsBonus: 500 },
    { id: 'a_dream', name: 'DREAM CLICKER', icon: '💤', desc: 'Clicks while you sleep.', baseCost: 2e9, cpsBonus: 650 },
    { id: 'a_omega', name: 'OMEGA ARRAY', icon: '🔱', desc: 'Final click system.', baseCost: 5e9, cpsBonus: 800 },
];

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────
// Each unlocked achievement permanently multiplies ALL earnings.
// achievementMultiplier = product of all unlocked multipliers.
// Achievement multipliers SURVIVE prestige resets.
const ACHIEVEMENTS = [
    // Click milestones
    { id: 'ac_first', name: 'FIRST CLICK', icon: '🖱️', desc: 'Click once.', condition: s => s.totalClicks >= 1, multiplier: 1.05 },
    { id: 'ac_50', name: 'CLICK APPRENTICE', icon: '👆', desc: '50 total clicks.', condition: s => s.totalClicks >= 50, multiplier: 1.05 },
    { id: 'ac_500', name: 'CLICK JOURNEYMAN', icon: '✊', desc: '500 total clicks.', condition: s => s.totalClicks >= 500, multiplier: 1.1 },
    { id: 'ac_5k', name: 'CLICK MASTER', icon: '💥', desc: '5,000 total clicks.', condition: s => s.totalClicks >= 5000, multiplier: 1.1 },
    { id: 'ac_50k', name: 'CLICK LEGEND', icon: '⚡', desc: '50,000 total clicks.', condition: s => s.totalClicks >= 50000, multiplier: 1.15 },
    { id: 'ac_500k', name: 'CLICK DEITY', icon: '👁️', desc: '500,000 total clicks.', condition: s => s.totalClicks >= 500000, multiplier: 1.2 },
    // Points milestones
    { id: 'ac_p100', name: 'POCKET CHANGE', icon: '🌱', desc: 'Earn 100 points.', condition: s => s.points >= 100, multiplier: 1.05 },
    { id: 'ac_p10k', name: 'GETTING RICH', icon: '💰', desc: 'Earn 10,000 points.', condition: s => s.points >= 10000, multiplier: 1.1 },
    { id: 'ac_p1m', name: 'CLICK MILLIONAIRE', icon: '🏦', desc: 'Earn 1,000,000 points.', condition: s => s.points >= 1e6, multiplier: 1.15 },
    { id: 'ac_p1b', name: 'CLICK BILLIONAIRE', icon: '💎', desc: 'Earn 1,000,000,000 points.', condition: s => s.points >= 1e9, multiplier: 1.2 },
    { id: 'ac_p1t', name: 'CLICK TRILLIONAIRE', icon: '🌌', desc: 'Earn 1,000,000,000,000 points.', condition: s => s.points >= 1e12, multiplier: 1.25 },
    // Upgrade milestones
    { id: 'ac_buy1', name: 'FIRST PURCHASE', icon: '🛒', desc: 'Buy any upgrade.', condition: s => totalOwned(s) >= 1, multiplier: 1.05 },
    { id: 'ac_buy10', name: 'SHOP ADDICT', icon: '🏪', desc: 'Own 10 upgrades total.', condition: s => totalOwned(s) >= 10, multiplier: 1.1 },
    { id: 'ac_buy50', name: 'UPGRADE FACTORY', icon: '🏭', desc: 'Own 50 upgrades total.', condition: s => totalOwned(s) >= 50, multiplier: 1.15 },
    { id: 'ac_buy100', name: 'UPGRADE ROYALTY', icon: '👑', desc: 'Own 100 upgrades total.', condition: s => totalOwned(s) >= 100, multiplier: 1.2 },
    // CPS milestones
    { id: 'ac_cps1', name: 'FIRST BOT', icon: '🤖', desc: 'Reach 1 CPS.', condition: s => s.cps >= 1, multiplier: 1.05 },
    { id: 'ac_cps100', name: 'CLICK MACHINE', icon: '⚙️', desc: 'Reach 100 CPS.', condition: s => s.cps >= 100, multiplier: 1.1 },
    { id: 'ac_cps10k', name: 'CLICK ROCKET', icon: '🚀', desc: 'Reach 10,000 CPS.', condition: s => s.cps >= 10000, multiplier: 1.15 },
    { id: 'ac_cps1m', name: 'CLICK SUPERNOVA', icon: '🌟', desc: 'Reach 1,000,000 CPS.', condition: s => s.cps >= 1000000, multiplier: 1.2 },
    // Prestige milestones
    { id: 'ac_pr1', name: 'FIRST PRESTIGE', icon: '🔄', desc: 'Prestige once.', condition: s => s.prestigeCount >= 1, multiplier: 1.1 },
    { id: 'ac_pr5', name: 'PRESTIGE MASTER', icon: '♾️', desc: 'Prestige 5 times.', condition: s => s.prestigeCount >= 5, multiplier: 1.2 },
    { id: 'ac_pr10', name: 'PRESTIGE LEGEND', icon: '🌀', desc: 'Prestige 10 times.', condition: s => s.prestigeCount >= 10, multiplier: 1.3 },
    // Speed milestone
    { id: 'ac_speed', name: 'SPEED CLICKER', icon: '⚡', desc: 'Click 10 times in 3 seconds.', condition: s => s._speedAchieved === true, multiplier: 1.1 },
];

function totalOwned(s) {
    let t = 0;
    MANUAL_UPGRADES.forEach(u => { t += s.manualUpgrades[u.id] || 0; });
    AUTO_UPGRADES.forEach(u => { t += s.autoUpgrades[u.id] || 0; });
    return t;
}

// Speed click tracker
let recentClicks = [];

// ─── INIT STATE ───────────────────────────────────────────────────
MANUAL_UPGRADES.forEach(u => { state.manualUpgrades[u.id] = 0; });
AUTO_UPGRADES.forEach(u => { state.autoUpgrades[u.id] = 0; });
ACHIEVEMENTS.forEach(a => { state.achievements[a.id] = false; });

// ─── MULTIPLIER ───────────────────────────────────────────────────
function getTotalMultiplier() {
    return state.prestigeMultiplier * state.achievementMultiplier;
}

// ─── COST SCALING ─────────────────────────────────────────────────
function getManualCost(upg) { return Math.floor(upg.baseCost * Math.pow(1.5, state.manualUpgrades[upg.id])); }
function getAutoCost(upg) { return Math.floor(upg.baseCost * Math.pow(1.5, state.autoUpgrades[upg.id])); }

// ─── RECALC ───────────────────────────────────────────────────────
function recalcTotals() {
    state.clickPower = 1;
    MANUAL_UPGRADES.forEach(u => { state.clickPower += u.clickBonus * state.manualUpgrades[u.id]; });
    state.cps = 0;
    AUTO_UPGRADES.forEach(u => { state.cps += u.cpsBonus * state.autoUpgrades[u.id]; });
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
    reader.onload = ev => { document.getElementById('clickBtn').innerHTML = `<img src="${ev.target.result}" alt="logo">`; };
    reader.readAsDataURL(file);
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
        if (cpsAccum >= 1) {
            cpsAccum = 0;
            const btn = document.getElementById('clickBtn');
            btn.classList.remove('auto-ping'); void btn.offsetWidth; btn.classList.add('auto-ping');
        }
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
    renderUpgradeTab('manualGrid', MANUAL_UPGRADES, 'manual',
        ['TIER 1 — STARTER', 'TIER 2 — TOOLS', 'TIER 3 — SCIENCE', 'TIER 4 — COSMIC', 'TIER 5 — LEGENDARY'], 5);
    renderUpgradeTab('autoGrid', AUTO_UPGRADES, 'auto',
        ['TIER 1 — BEGINNER', 'TIER 2 — SCRIPTS', 'TIER 3 — INDUSTRIAL', 'TIER 4 — SCI-FI', 'TIER 5 — COSMIC', 'TIER 6 — TRANSCENDENT'], 5);
}

function renderUpgradeTab(gridId, list, tab, sectionNames, perSection) {
    const grid = document.getElementById(gridId); grid.innerHTML = '';
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
    const btn = document.getElementById('clickBtn');
    btn.innerHTML = '<canvas id="defaultLogo" width="120" height="120"></canvas>';
    drawDefaultLogo();
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
    const btn = document.getElementById('clickBtn');
    btn.innerHTML = '<canvas id="defaultLogo" width="120" height="120"></canvas>';
    drawDefaultLogo(); renderUpgrades(); renderAchievements(); updateUI();
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
            recalcTotals(); renderUpgrades(); renderAchievements(); updateUI();
            closeSettings();
            showNotif('SAVE LOADED!');
        } catch { showNotif('ERROR: INVALID SAVE FILE'); }
    };
    reader.readAsText(file); e.target.value = '';
}

// ─── OFFLINE & AUTO-SAVE ──────────────────────────────────────────
function autoSave() {
    state.lastTimestamp = Date.now();
    localStorage.setItem('cm_local_save', JSON.stringify(state));
}

function autoLoad() {
    const raw = localStorage.getItem('cm_local_save');
    if (!raw) return false;
    try {
        const loaded = JSON.parse(raw);
        // Update state with loaded data
        Object.assign(state, loaded);

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

// Auto-save every 30s and on close
setInterval(autoSave, 30000);
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
    drawDefaultLogo();

    if (!loaded) {
        // Fresh start defaults if no save exists
        MANUAL_UPGRADES.forEach(u => { if (state.manualUpgrades[u.id] === undefined) state.manualUpgrades[u.id] = 0; });
        AUTO_UPGRADES.forEach(u => { if (state.autoUpgrades[u.id] === undefined) state.autoUpgrades[u.id] = 0; });
        ACHIEVEMENTS.forEach(a => { if (state.achievements[a.id] === undefined) state.achievements[a.id] = false; });
    }

    recalcTotals();
    renderUpgrades();
    renderAchievements();
    updateUI();
    switchTab('manual');
}

initGame();
