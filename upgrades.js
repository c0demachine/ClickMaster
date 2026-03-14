// ─── UPGRADES CONFIGURATION ─────────────────────────────────────────

// ─── MANUAL UPGRADES (110 total, sorted by baseCost) ────────────────────────
// Gap-fills added throughout early/mid ranges, continues scaling at high end.
const MANUAL_UPGRADES = [

    // ── Tier 1: Starter (1–18) — Dense early ladder ──
    { id: 'm_thicker',     name: 'THICKER FINGER',      icon: '👆',  desc: 'Press harder.',               baseCost: 15,       clickBonus: 1     },
    { id: 'm_glove',       name: 'CLICK GLOVE',         icon: '🧤',  desc: 'Extra grip.',                 baseCost: 40,       clickBonus: 1     },
    { id: 'm_nail',        name: 'LONG NAIL',           icon: '💅',  desc: 'Precision nail.',             baseCost: 100,      clickBonus: 2     },
    { id: 'm_ring',        name: 'POWER RING',          icon: '💍',  desc: 'Enchanted ring.',             baseCost: 175,      clickBonus: 2     },  // GAP FILL
    { id: 'm_knuckle',     name: 'IRON KNUCKLE',        icon: '✊',  desc: 'Reinforced knuckle.',         baseCost: 250,      clickBonus: 2     },
    { id: 'm_tape',        name: 'CLICK TAPE',          icon: '🩹',  desc: 'Taped for extra force.',      baseCost: 375,      clickBonus: 3     },  // GAP FILL
    { id: 'm_pen',         name: 'STYLUS PEN',          icon: '🖊️',  desc: 'Capacitive tip.',             baseCost: 500,      clickBonus: 3     },
    { id: 'm_stamp',       name: 'RUBBER STAMP',        icon: '📮',  desc: 'Satisfying thunk.',           baseCost: 700,      clickBonus: 4     },  // GAP FILL
    { id: 'm_hammer',      name: 'CLICK HAMMER',        icon: '🔨',  desc: 'Hammer the button.',          baseCost: 1000,     clickBonus: 4     },
    { id: 'm_chisel',      name: 'STONE CHISEL',        icon: '🪨',  desc: 'Carved in stone.',            baseCost: 1400,     clickBonus: 5     },  // GAP FILL
    { id: 'm_drill',       name: 'POWER DRILL',         icon: '🔩',  desc: 'Drill click.',                baseCost: 2000,     clickBonus: 5     },
    { id: 'm_axe',         name: 'CLICK AXE',           icon: '🪓',  desc: 'Chopping power.',             baseCost: 2800,     clickBonus: 6     },  // GAP FILL
    { id: 'm_sword',       name: 'CLICK SWORD',         icon: '⚔️',  desc: 'Slice through.',              baseCost: 4000,     clickBonus: 6     },
    { id: 'm_spear',       name: 'CLICK SPEAR',         icon: '🗡️',  desc: 'Piercing click.',             baseCost: 5500,     clickBonus: 7     },  // GAP FILL
    { id: 'm_bolt',        name: 'LIGHTNING BOLT',      icon: '⚡',  desc: 'Electric click.',             baseCost: 8000,     clickBonus: 8     },
    { id: 'm_cannon',      name: 'CLICK CANNON',        icon: '💣',  desc: 'Explosive tap.',              baseCost: 11000,    clickBonus: 9     },  // GAP FILL
    { id: 'm_fist',        name: 'MEGA FIST',           icon: '🤜',  desc: 'Unstoppable.',                baseCost: 15000,    clickBonus: 10    },
    { id: 'm_claw',        name: 'STEEL CLAW',          icon: '🦾',  desc: 'Mechanical claw grip.',       baseCost: 22000,    clickBonus: 11    },  // GAP FILL

    // ── Tier 2: Mid-Range (19–40) — Gap-filled 30K→1M ──
    { id: 'm_laser',       name: 'LASER POINTER',       icon: '🔴',  desc: 'Precise laser.',              baseCost: 30000,    clickBonus: 12    },
    { id: 'm_shock',       name: 'SHOCK GAUNTLET',      icon: '🧤',  desc: 'Electrified glove.',          baseCost: 45000,    clickBonus: 13    },  // GAP FILL
    { id: 'm_atom',        name: 'ATOM SMASHER',        icon: '⚛️',  desc: 'Sub-atomic clicking.',        baseCost: 60000,    clickBonus: 15    },
    { id: 'm_crystal2',    name: 'CRYSTAL KNUCKLE',     icon: '💠',  desc: 'Crystal-charged strike.',     baseCost: 85000,    clickBonus: 16    },  // GAP FILL
    { id: 'm_magnet',      name: 'CLICK MAGNET',        icon: '🧲',  desc: 'Attracts power.',             baseCost: 120000,   clickBonus: 18    },
    { id: 'm_wrench',      name: 'POWER WRENCH',        icon: '🔧',  desc: 'Torque-boosted tap.',         baseCost: 170000,   clickBonus: 20    },  // GAP FILL
    { id: 'm_plasma',      name: 'PLASMA FIST',         icon: '🌀',  desc: 'Plasma infused.',             baseCost: 250000,   clickBonus: 22    },
    { id: 'm_blade',       name: 'ENERGY BLADE',        icon: '🔪',  desc: 'Cuts through resistance.',    baseCost: 350000,   clickBonus: 26    },  // GAP FILL
    { id: 'm_quantum',     name: 'QUANTUM CLICKER',     icon: '🔬',  desc: 'Superposition.',              baseCost: 500000,   clickBonus: 30    },
    { id: 'm_proto',       name: 'PROTOTYPE HAND',      icon: '🦿',  desc: 'Early-stage mech hand.',      baseCost: 700000,   clickBonus: 35    },  // GAP FILL
    { id: 'm_comet',       name: 'COMET STRIKE',        icon: '☄️',  desc: 'Comet energy.',               baseCost: 1e6,      clickBonus: 40    },
    { id: 'm_flare',       name: 'SOLAR FLARE TAP',     icon: '🌞',  desc: 'Scorching hot click.',        baseCost: 1.5e6,    clickBonus: 47    },  // GAP FILL
    { id: 'm_nova',        name: 'SUPERNOVA PUNCH',     icon: '💥',  desc: 'Star-level force.',           baseCost: 2e6,      clickBonus: 55    },
    { id: 'm_orbit',       name: 'ORBITAL STRIKE',      icon: '🛰️',  desc: 'Strike from orbit.',          baseCost: 3.5e6,    clickBonus: 65    },  // GAP FILL
    { id: 'm_black',       name: 'BLACK HOLE TAP',      icon: '🕳️',  desc: 'Gravitational click.',        baseCost: 5e6,      clickBonus: 75    },
    { id: 'm_wormhole',    name: 'WORMHOLE PUNCH',      icon: '🌀',  desc: 'Punch through space.',        baseCost: 7.5e6,    clickBonus: 87    },  // GAP FILL
    { id: 'm_galaxy',      name: 'GALAXY CRUSHER',      icon: '🌌',  desc: 'Galaxy-scale power.',         baseCost: 10e6,     clickBonus: 100   },
    { id: 'm_nebula2',     name: 'NEBULA KNUCKLE',      icon: '🌠',  desc: 'Cloud of stellar gas.',       baseCost: 17e6,     clickBonus: 125   },  // GAP FILL
    { id: 'm_god',         name: 'CLICK DEITY',         icon: '👁️',  desc: 'Transcend reality.',          baseCost: 25e6,     clickBonus: 150   },
    { id: 'm_exile',       name: 'EXILED PUNCH',        icon: '🌑',  desc: 'Banished from existence.',    baseCost: 37e6,     clickBonus: 175   },  // GAP FILL
    { id: 'm_infinity',    name: 'INFINITY CLICK',      icon: '♾️',  desc: 'Click without limit.',        baseCost: 50e6,     clickBonus: 200   },
    { id: 'm_darkrift',    name: 'DARK RIFT TAP',       icon: '🌚',  desc: 'Rift of dark matter.',        baseCost: 75e6,     clickBonus: 250   },  // GAP FILL

    // ── Tier 3: Advanced (41–70) — 100M → 100T ──
    { id: 'm_void',        name: 'VOID STRIKE',         icon: '🌑',  desc: 'Erase existence.',            baseCost: 100e6,    clickBonus: 300   },
    { id: 'm_time',        name: 'TIME CLICKER',        icon: '⏳',  desc: 'Click through time.',         baseCost: 250e6,    clickBonus: 500   },
    { id: 'm_omega',       name: 'OMEGA FINGER',        icon: '🔱',  desc: 'The final upgrade.',          baseCost: 500e6,    clickBonus: 750   },
    { id: 'm_big',         name: 'THE BIG CLICK',       icon: '💠',  desc: 'Click that ends all.',        baseCost: 1e9,      clickBonus: 1000  },
    { id: 'm_rift',        name: 'RIFT PUNCH',          icon: '🌀',  desc: 'Tears the fabric.',           baseCost: 2e9,      clickBonus: 1400  },
    { id: 'm_nebula',      name: 'NEBULA SMASH',        icon: '🌠',  desc: 'Born from stardust.',         baseCost: 5e9,      clickBonus: 2000  },
    { id: 'm_pulsar',      name: 'PULSAR STRIKE',       icon: '💫',  desc: 'Rhythmic neutron force.',     baseCost: 10e9,     clickBonus: 3000  },
    { id: 'm_dark',        name: 'DARK ENERGY TAP',     icon: '🌚',  desc: 'Harness dark energy.',        baseCost: 25e9,     clickBonus: 4500  },
    { id: 'm_singularity', name: 'SINGULARITY FINGER',  icon: '⚫',  desc: 'Point of infinite density.',  baseCost: 50e9,     clickBonus: 6500  },
    { id: 'm_tachyon',     name: 'TACHYON JAB',         icon: '🏹',  desc: 'Faster than light.',          baseCost: 100e9,    clickBonus: 9000  },
    { id: 'm_antimatter',  name: 'ANTIMATTER PUNCH',    icon: '💢',  desc: 'Annihilate on contact.',      baseCost: 250e9,    clickBonus: 13000 },
    { id: 'm_quasar',      name: 'QUASAR CLICKER',      icon: '🔭',  desc: 'Cosmic jet stream.',          baseCost: 500e9,    clickBonus: 18000 },
    { id: 'm_entropy',     name: 'ENTROPY FIST',        icon: '🌪️',  desc: 'Disorder is power.',          baseCost: 1e12,     clickBonus: 25000 },
    { id: 'm_titan',       name: 'TITAN STRIKE',        icon: '🗿',  desc: 'Ancient titan force.',        baseCost: 2.5e12,   clickBonus: 35000 },
    { id: 'm_celestial',   name: 'CELESTIAL SMASH',     icon: '✨',  desc: 'Heaven-sent impact.',         baseCost: 5e12,     clickBonus: 50000 },
    { id: 'm_phantom',     name: 'PHANTOM CLICK',       icon: '👻',  desc: 'Unseen but felt.',            baseCost: 10e12,    clickBonus: 70000 },
    { id: 'm_rune',        name: 'RUNE FINGER',         icon: '🔯',  desc: 'Ancient magic click.',        baseCost: 25e12,    clickBonus: 100000},
    { id: 'm_colossus',    name: 'COLOSSUS FIST',       icon: '🌋',  desc: 'Earthquake-level hit.',       baseCost: 50e12,    clickBonus: 140000},
    { id: 'm_sovereign',   name: 'SOVEREIGN TAP',       icon: '👑',  desc: 'Rule with your finger.',      baseCost: 100e12,   clickBonus: 200000},
    { id: 'm_crystal',     name: 'CRYSTAL CLICK',       icon: '💎',  desc: 'Diamond-hard precision.',     baseCost: 250e12,   clickBonus: 280000},
    { id: 'm_arcane',      name: 'ARCANE KNUCKLE',      icon: '🔮',  desc: 'Mystic energy surge.',        baseCost: 500e12,   clickBonus: 380000},
    { id: 'm_cosmos',      name: 'COSMOS CRUSHER',      icon: '🌍',  desc: 'Crush the universe.',         baseCost: 1e15,     clickBonus: 500000},
    { id: 'm_primordial',  name: 'PRIMORDIAL TAP',      icon: '🌊',  desc: 'From the first moment.',      baseCost: 2e15,     clickBonus: 700000},
    { id: 'm_eternity',    name: 'ETERNITY CLICK',      icon: '♾️',  desc: 'Click forever.',              baseCost: 5e15,     clickBonus: 1e6   },
    { id: 'm_paradox',     name: 'PARADOX FIST',        icon: '🧿',  desc: 'Breaks its own rules.',       baseCost: 10e15,    clickBonus: 1.4e6 },
    { id: 'm_archangel',   name: 'ARCHANGEL STRIKE',    icon: '😇',  desc: 'Divine retribution.',         baseCost: 25e15,    clickBonus: 2e6   },
    { id: 'm_judgement',   name: 'JUDGEMENT TAP',       icon: '⚖️',  desc: 'Final verdict click.',        baseCost: 50e15,    clickBonus: 2.8e6 },
    { id: 'm_starfall',    name: 'STARFALL STRIKE',     icon: '🌟',  desc: 'Stars rain down.',            baseCost: 100e15,   clickBonus: 4e6   },
    { id: 'm_supermass',   name: 'SUPERMASSIVE HIT',    icon: '🪐',  desc: 'Planet-sized click.',         baseCost: 250e15,   clickBonus: 6e6   },
    { id: 'm_eclipse',     name: 'ECLIPSE SMASH',       icon: '🌒',  desc: 'Darkness amplifies.',         baseCost: 500e15,   clickBonus: 8e6   },

    // ── Tier 4: Elite (71–95) — 1E18 → 10E27 ──
    { id: 'm_tempest',     name: 'TEMPEST FINGER',      icon: '⛈️',  desc: 'Storm-charged click.',        baseCost: 1e18,     clickBonus: 12e6  },
    { id: 'm_solstice',    name: 'SOLSTICE PUNCH',      icon: '☀️',  desc: 'Solar peak power.',           baseCost: 2e18,     clickBonus: 17e6  },
    { id: 'm_abyssal',     name: 'ABYSSAL TAP',         icon: '🌑',  desc: 'From the deep abyss.',        baseCost: 5e18,     clickBonus: 25e6  },
    { id: 'm_nova2',       name: 'HYPERNOVA PUNCH',     icon: '💥',  desc: 'Beyond supernova.',           baseCost: 10e18,    clickBonus: 35e6  },
    { id: 'm_shard',       name: 'REALITY SHARD',       icon: '🔷',  desc: 'Fragment of existence.',      baseCost: 25e18,    clickBonus: 50e6  },
    { id: 'm_wyrmfist',    name: 'WYRM FIST',           icon: '🐉',  desc: 'Dragon power unleashed.',     baseCost: 50e18,    clickBonus: 70e6  },
    { id: 'm_voidstep',    name: 'VOID STEP CLICK',     icon: '👣',  desc: 'Step between realities.',     baseCost: 100e18,   clickBonus: 100e6 },
    { id: 'm_genesis',     name: 'GENESIS STRIKE',      icon: '🌱',  desc: 'The first true hit.',         baseCost: 250e18,   clickBonus: 140e6 },
    { id: 'm_moonfall',    name: 'MOONFALL SMASH',      icon: '🌕',  desc: 'Moon-weight impact.',         baseCost: 500e18,   clickBonus: 200e6 },
    { id: 'm_seraph',      name: 'SERAPH TOUCH',        icon: '🪽',  desc: 'Angel wings amplify.',        baseCost: 1e21,     clickBonus: 280e6 },
    { id: 'm_maelstrom',   name: 'MAELSTROM FIST',      icon: '🌪️',  desc: 'Chaotic swirling power.',     baseCost: 2e21,     clickBonus: 400e6 },
    { id: 'm_inferno',     name: 'INFERNO CLICK',       icon: '🔥',  desc: 'Hell-forged fingertip.',      baseCost: 5e21,     clickBonus: 600e6 },
    { id: 'm_glacier',     name: 'GLACIER PUNCH',       icon: '🧊',  desc: 'Ice-cold precision.',         baseCost: 10e21,    clickBonus: 900e6 },
    { id: 'm_thunderlord', name: 'THUNDER LORD TAP',    icon: '🌩️',  desc: 'Command the storm.',          baseCost: 25e21,    clickBonus: 1.3e9 },
    { id: 'm_solaris',     name: 'SOLARIS STRIKE',      icon: '🌞',  desc: 'Solar flare power.',          baseCost: 50e21,    clickBonus: 1.9e9 },
    { id: 'm_lunar',       name: 'LUNAR IMPACT',        icon: '🌛',  desc: 'Moonlit devastation.',        baseCost: 100e21,   clickBonus: 2.8e9 },
    { id: 'm_terraforce',  name: 'TERRA FORCE CLICK',   icon: '🌍',  desc: 'Earth-shattering tap.',       baseCost: 250e21,   clickBonus: 4e9   },
    { id: 'm_spectral',    name: 'SPECTRAL FINGER',     icon: '👻',  desc: 'Ghost of all clicks.',        baseCost: 500e21,   clickBonus: 6e9   },
    { id: 'm_chronicle',   name: 'CHRONICLE SMASH',     icon: '📜',  desc: 'Written in legend.',          baseCost: 1e24,     clickBonus: 9e9   },
    { id: 'm_titanblow',   name: 'TITAN BLOW',          icon: '💪',  desc: 'Old gods might.',             baseCost: 2e24,     clickBonus: 13e9  },
    { id: 'm_dawnstrike',  name: 'DAWN STRIKE',         icon: '🌅',  desc: 'First light, last click.',    baseCost: 5e24,     clickBonus: 20e9  },
    { id: 'm_oblivion',    name: 'OBLIVION TAP',        icon: '🌌',  desc: 'Forgotten by the void.',      baseCost: 10e24,    clickBonus: 30e9  },
    { id: 'm_zenith',      name: 'ZENITH CLICK',        icon: '🏔️',  desc: 'Peak of all power.',          baseCost: 25e24,    clickBonus: 45e9  },
    { id: 'm_aeon',        name: 'AEON FIST',           icon: '⌛',  desc: 'An age in one strike.',       baseCost: 50e24,    clickBonus: 65e9  },
    { id: 'm_mythic',      name: 'MYTHIC PUNCH',        icon: '🐉',  desc: 'From the age of myths.',      baseCost: 100e24,   clickBonus: 95e9  },

    // ── Tier 5: Transcendent (96–110) — 250E24 and beyond ──
    { id: 'm_ultraforce',  name: 'ULTRA FORCE TAP',     icon: '🔆',  desc: 'Blinding power surge.',       baseCost: 250e24,   clickBonus: 140e9 },
    { id: 'm_stormfist',   name: 'STORM FIST',          icon: '⛈️',  desc: 'Lightning in your hand.',     baseCost: 500e24,   clickBonus: 200e9 },
    { id: 'm_cosmicdoom',  name: 'COSMIC DOOM CLICK',   icon: '☄️',  desc: 'Universe-ending tap.',        baseCost: 1e27,     clickBonus: 300e9 },
    { id: 'm_omnifist',    name: 'OMNI FIST',           icon: '👊',  desc: 'All power. One fist.',        baseCost: 2e27,     clickBonus: 450e9 },
    { id: 'm_divinehand',  name: 'DIVINE HAND',         icon: '🖐️',  desc: 'Gods own fingertip.',         baseCost: 5e27,     clickBonus: 650e9 },
    { id: 'm_worldender',  name: 'WORLD ENDER TAP',     icon: '💀',  desc: 'The last click ever.',        baseCost: 10e27,    clickBonus: 1e12  },
    { id: 'm_infinityv2',  name: 'INFINITY BEYOND',     icon: '✴️',  desc: 'Past infinity itself.',       baseCost: 25e27,    clickBonus: 1.5e12},
    { id: 'm_creation',    name: 'CREATION FIST',       icon: '🌈',  desc: 'Build worlds with one tap.',  baseCost: 50e27,    clickBonus: 2.2e12},
    { id: 'm_astral',      name: 'ASTRAL PALM',         icon: '🔮',  desc: 'Out-of-body devastation.',    baseCost: 100e27,   clickBonus: 3.2e12},
    { id: 'm_nullclick',   name: 'NULL CLICK',          icon: '⬛',  desc: 'Deletes the target.',         baseCost: 250e27,   clickBonus: 4.8e12},
    { id: 'm_apex',        name: 'APEX STRIKER',        icon: '🦅',  desc: 'Apex predator precision.',    baseCost: 500e27,   clickBonus: 7e12  },
    { id: 'm_godhand',     name: 'GOD HAND',            icon: '🫲',  desc: 'Touched by the divine.',      baseCost: 1e30,     clickBonus: 10e12 },
    { id: 'm_ultraomega',  name: 'ULTRA OMEGA FINGER',  icon: '🔱',  desc: 'The absolute pinnacle.',      baseCost: 2.5e30,   clickBonus: 15e12 },
    { id: 'm_perpetual',   name: 'PERPETUAL CLICK',     icon: '♾️',  desc: 'Never stops clicking.',       baseCost: 5e30,     clickBonus: 22e12 },
    { id: 'm_theonlyone',  name: 'THE ONLY CLICK',      icon: '🌟',  desc: 'One click. Everything.',      baseCost: 10e30,    clickBonus: 32e12 },
];

// ─── AUTO UPGRADES (110 total, sorted by baseCost) ────────────────────────────
// Gap-fills added throughout early/mid ranges, continues scaling at high end.
const AUTO_UPGRADES = [

    // ── Tier 1: Starter (1–18) — Dense early ladder ──
    { id: 'a_cursor',      name: 'AUTO CURSOR',         icon: '🖱️',  desc: 'A cursor clicks for you.',    baseCost: 15,       cpsBonus: 1      },
    { id: 'a_ant',         name: 'CLICK ANT',           icon: '🐜',  desc: 'Tiny but tireless.',           baseCost: 50,       cpsBonus: 1      },
    { id: 'a_bug',         name: 'CLICK BUG',           icon: '🐛',  desc: 'Six-legged clicker.',          baseCost: 80,       cpsBonus: 1      },  // GAP FILL
    { id: 'a_mouse',       name: 'CLICK MOUSE',         icon: '🐭',  desc: 'Rodent precision.',            baseCost: 120,      cpsBonus: 2      },
    { id: 'a_hamster',     name: 'CLICK HAMSTER',       icon: '🐹',  desc: 'Hamster wheel power.',         baseCost: 200,      cpsBonus: 2      },  // GAP FILL
    { id: 'a_bot',         name: 'CLICK BOT',           icon: '🤖',  desc: 'Mediocre robot.',              baseCost: 300,      cpsBonus: 2      },
    { id: 'a_toy',         name: 'WIND-UP TOY',         icon: '🎁',  desc: 'Wind it up, walk away.',       baseCost: 450,      cpsBonus: 3      },  // GAP FILL
    { id: 'a_drone',       name: 'CLICK DRONE',         icon: '🚁',  desc: 'Aerial clicker.',              baseCost: 700,      cpsBonus: 3      },
    { id: 'a_timer',       name: 'AUTO TIMER',          icon: '⏱️',  desc: 'Timed interval clicks.',       baseCost: 1000,     cpsBonus: 3      },  // GAP FILL
    { id: 'a_script',      name: 'CLICK SCRIPT',        icon: '📜',  desc: 'Shoddy automation.',           baseCost: 1500,     cpsBonus: 4      },
    { id: 'a_spring',      name: 'SPRING CLICKER',      icon: '🌀',  desc: 'Mechanical spring tap.',       baseCost: 2000,     cpsBonus: 4      },  // GAP FILL
    { id: 'a_macro',       name: 'CLICK MACRO',         icon: '⌨️',  desc: 'Keyboard macro.',              baseCost: 3000,     cpsBonus: 5      },
    { id: 'a_piston',      name: 'CLICK PISTON',        icon: '🔧',  desc: 'Mechanical piston action.',    baseCost: 4500,     cpsBonus: 5      },  // GAP FILL
    { id: 'a_virus',       name: 'CLICK VIRUS',         icon: '🦠',  desc: 'Spreads clicks.',              baseCost: 6000,     cpsBonus: 6      },
    { id: 'a_worm',        name: 'CLICK WORM',          icon: '🐛',  desc: 'Burrows through systems.',     baseCost: 8500,     cpsBonus: 7      },  // GAP FILL
    { id: 'a_ai',          name: 'CLICK AI',            icon: '🧠',  desc: 'Neural net clicking.',         baseCost: 12000,    cpsBonus: 8      },
    { id: 'a_turret',      name: 'AUTO TURRET',         icon: '🎯',  desc: 'Locked on. Always clicking.',  baseCost: 18000,    cpsBonus: 9      },  // GAP FILL
    { id: 'a_server',      name: 'CLICK SERVER',        icon: '🖥️',  desc: 'Dedicated server.',            baseCost: 25000,    cpsBonus: 10     },

    // ── Tier 2: Mid-Range (19–42) — Gap-filled 35K → 1.5M ──
    { id: 'a_cluster',     name: 'SERVER CLUSTER',      icon: '🗄️',  desc: 'Rack of clicking servers.',    baseCost: 35000,    cpsBonus: 12     },  // GAP FILL
    { id: 'a_factory',     name: 'CLICK FACTORY',       icon: '🏭',  desc: 'Mass production.',             baseCost: 50000,    cpsBonus: 15     },
    { id: 'a_plant',       name: 'CLICK PLANT',         icon: '🌿',  desc: 'Organic automation.',          baseCost: 70000,    cpsBonus: 17     },  // GAP FILL
    { id: 'a_mine',        name: 'CLICK MINE',          icon: '⛏️',  desc: 'Mines for clicks.',            baseCost: 100000,   cpsBonus: 20     },
    { id: 'a_pipeline',    name: 'CLICK PIPELINE',      icon: '🪠',  desc: 'Streams clicks non-stop.',     baseCost: 145000,   cpsBonus: 22     },  // GAP FILL
    { id: 'a_reactor',     name: 'CLICK REACTOR',       icon: '☢️',  desc: 'Nuclear-powered.',             baseCost: 200000,   cpsBonus: 25     },
    { id: 'a_generator',   name: 'CLICK GENERATOR',     icon: '⚡',  desc: 'Generates endless clicks.',    baseCost: 280000,   cpsBonus: 29     },  // GAP FILL
    { id: 'a_grid',        name: 'POWER GRID',          icon: '🔌',  desc: 'Citywide click grid.',         baseCost: 400000,   cpsBonus: 35     },
    { id: 'a_hub',         name: 'CLICK HUB',           icon: '🌐',  desc: 'Central click distribution.', baseCost: 575000,   cpsBonus: 42     },  // GAP FILL
    { id: 'a_satellite',   name: 'CLICK SATELLITE',     icon: '🛰️',  desc: 'Orbital click array.',         baseCost: 800000,   cpsBonus: 50     },
    { id: 'a_beacon',      name: 'CLICK BEACON',        icon: '📡',  desc: 'Broadcasts clicks.',           baseCost: 1.1e6,    cpsBonus: 57     },  // GAP FILL
    { id: 'a_portal',      name: 'CLICK PORTAL',        icon: '🌀',  desc: 'Portal dimension clicks.',     baseCost: 1.5e6,    cpsBonus: 65     },
    { id: 'a_relay',       name: 'CLICK RELAY',         icon: '📶',  desc: 'Clicks bounce endlessly.',     baseCost: 2.2e6,    cpsBonus: 72     },  // GAP FILL
    { id: 'a_nano',        name: 'NANOBOT SWARM',       icon: '🔬',  desc: 'Microscopic clickers.',        baseCost: 3e6,      cpsBonus: 80     },
    { id: 'a_microgrid',   name: 'MICRO CLICK GRID',    icon: '🧫',  desc: 'Tiny grid, big output.',       baseCost: 4.2e6,    cpsBonus: 89     },  // GAP FILL
    { id: 'a_warp',        name: 'WARP ENGINE',         icon: '🚀',  desc: 'FTL click delivery.',          baseCost: 6e6,      cpsBonus: 100    },
    { id: 'a_conduit',     name: 'CLICK CONDUIT',       icon: '🔋',  desc: 'Channels all click energy.',   baseCost: 9e6,      cpsBonus: 114    },  // GAP FILL
    { id: 'a_hive',        name: 'CLICK HIVEMIND',      icon: '🐝',  desc: 'Collective clicking.',         baseCost: 12e6,     cpsBonus: 130    },
    { id: 'a_nexus',       name: 'CLICK NEXUS',         icon: '💠',  desc: 'All clicks converge here.',    baseCost: 18e6,     cpsBonus: 144    },  // GAP FILL
    { id: 'a_matrix',      name: 'CLICK MATRIX',        icon: '💾',  desc: 'Simulated click farm.',        baseCost: 25e6,     cpsBonus: 160    },
    { id: 'a_core',        name: 'CLICK CORE',          icon: '🌐',  desc: 'The center of all clicking.',  baseCost: 37e6,     cpsBonus: 179    },  // GAP FILL
    { id: 'a_star',        name: 'CLICK STAR',          icon: '⭐',  desc: 'Stellar click energy.',        baseCost: 50e6,     cpsBonus: 200    },
    { id: 'a_corona',      name: 'CLICK CORONA',        icon: '🌟',  desc: 'Star corona radiates clicks.', baseCost: 75e6,     cpsBonus: 224    },  // GAP FILL

    // ── Tier 3: Advanced (43–75) — 100M → 500T ──
    { id: 'a_pulsar',      name: 'PULSAR ARRAY',        icon: '💫',  desc: 'Rhythmic neutron star.',       baseCost: 100e6,    cpsBonus: 250    },
    { id: 'a_rift',        name: 'CLICK RIFT',          icon: '🌌',  desc: 'Tears spacetime.',             baseCost: 200e6,    cpsBonus: 320    },
    { id: 'a_universe',    name: 'UNIVERSE ENGINE',     icon: '🌍',  desc: 'Whole universe clicks.',       baseCost: 400e6,    cpsBonus: 400    },
    { id: 'a_god',         name: 'CLICK PANTHEON',      icon: '👁️',  desc: 'Gods click for you.',          baseCost: 1e9,      cpsBonus: 500    },
    { id: 'a_dream',       name: 'DREAM CLICKER',       icon: '💤',  desc: 'Clicks while you sleep.',      baseCost: 2e9,      cpsBonus: 650    },
    { id: 'a_omega',       name: 'OMEGA ARRAY',         icon: '🔱',  desc: 'Final click system.',          baseCost: 5e9,      cpsBonus: 800    },
    { id: 'a_quantum',     name: 'QUANTUM FARM',        icon: '⚛️',  desc: 'Clicks in parallel universes.',baseCost: 10e9,     cpsBonus: 1000   },
    { id: 'a_nebula',      name: 'NEBULA ARRAY',        icon: '🌠',  desc: 'Stars fuel the clicks.',       baseCost: 25e9,     cpsBonus: 1400   },
    { id: 'a_titan',       name: 'TITAN GRID',          icon: '🗿',  desc: 'Ancient automated force.',     baseCost: 50e9,     cpsBonus: 2000   },
    { id: 'a_collapse',    name: 'STAR COLLAPSE',       icon: '🌋',  desc: 'Gravity does the work.',       baseCost: 100e9,    cpsBonus: 2800   },
    { id: 'a_hyperai',     name: 'HYPER AI',            icon: '🧬',  desc: 'DNA-level intelligence.',      baseCost: 250e9,    cpsBonus: 4000   },
    { id: 'a_dyson',       name: 'DYSON SPHERE',        icon: '🔆',  desc: 'Whole star, all clicks.',      baseCost: 500e9,    cpsBonus: 5500   },
    { id: 'a_dark',        name: 'DARK MATTER FARM',    icon: '🌚',  desc: 'Invisible but clicking.',      baseCost: 1e12,     cpsBonus: 7500   },
    { id: 'a_tachyon',     name: 'TACHYON NETWORK',     icon: '🏹',  desc: 'Faster-than-light autoclicks.',baseCost: 2.5e12,   cpsBonus: 10000  },
    { id: 'a_colossus',    name: 'AUTO COLOSSUS',       icon: '🌍',  desc: 'Planet-sized click engine.',   baseCost: 5e12,     cpsBonus: 14000  },
    { id: 'a_phantom',     name: 'PHANTOM NETWORK',     icon: '👻',  desc: 'Ghost bots. Everywhere.',      baseCost: 10e12,    cpsBonus: 20000  },
    { id: 'a_voidfarm',    name: 'VOID FARM',           icon: '🕳️',  desc: 'Harvest nothing. Get clicks.', baseCost: 25e12,    cpsBonus: 28000  },
    { id: 'a_celestial',   name: 'CELESTIAL ENGINE',    icon: '✨',  desc: 'Powered by heavenly light.',   baseCost: 50e12,    cpsBonus: 40000  },
    { id: 'a_chrono',      name: 'CHRONO CLICKER',      icon: '⏳',  desc: 'Clicks past and future.',      baseCost: 100e12,   cpsBonus: 55000  },
    { id: 'a_rift2',       name: 'RIFT MULTIPLIER',     icon: '🌀',  desc: 'Each rift spawns more clicks.',baseCost: 250e12,   cpsBonus: 80000  },
    { id: 'a_arcane',      name: 'ARCANE AUTOFARM',     icon: '🔮',  desc: 'Magic does the clicking.',     baseCost: 500e12,   cpsBonus: 110000 },
    { id: 'a_eternity',    name: 'ETERNITY LOOP',       icon: '♾️',  desc: 'Infinite time, infinite clicks.',baseCost: 1e15,   cpsBonus: 150000 },
    { id: 'a_paradox',     name: 'PARADOX FARM',        icon: '🧿',  desc: 'Exists and doesnt exist.',     baseCost: 2e15,     cpsBonus: 220000 },
    { id: 'a_genesis',     name: 'GENESIS ENGINE',      icon: '🌱',  desc: 'Click from the very beginning.',baseCost: 5e15,   cpsBonus: 320000 },
    { id: 'a_sovereign',   name: 'SOVEREIGN AI',        icon: '👑',  desc: 'AI that rules all clicking.',  baseCost: 10e15,    cpsBonus: 450000 },
    { id: 'a_entropy',     name: 'ENTROPY HARVESTER',   icon: '🌪️',  desc: 'Feeds on universal chaos.',    baseCost: 25e15,    cpsBonus: 650000 },
    { id: 'a_crystal',     name: 'CRYSTAL MATRIX',      icon: '💎',  desc: 'Crystallized click energy.',   baseCost: 50e15,    cpsBonus: 900000 },
    { id: 'a_cosmos',      name: 'COSMOS ARRAY',        icon: '🌌',  desc: 'The whole cosmos clicks.',     baseCost: 100e15,   cpsBonus: 1.3e6  },
    { id: 'a_primordial',  name: 'PRIMORDIAL ENGINE',   icon: '🌊',  desc: 'Before time, clicks existed.', baseCost: 250e15,   cpsBonus: 1.9e6  },
    { id: 'a_seraph',      name: 'SERAPH ARRAY',        icon: '🪽',  desc: 'Angelic automation.',          baseCost: 500e15,   cpsBonus: 2.7e6  },
    { id: 'a_wyrm',        name: 'WYRM NETWORK',        icon: '🐉',  desc: 'Dragon-powered click farm.',   baseCost: 1e18,     cpsBonus: 4e6    },
    { id: 'a_tempest',     name: 'TEMPEST ARRAY',       icon: '⛈️',  desc: 'Storm of automated clicks.',   baseCost: 2e18,     cpsBonus: 6e6    },

    // ── Tier 4: Elite (76–100) — 5E18 → 50E24 ──
    { id: 'a_solstice',    name: 'SOLSTICE FARM',       icon: '☀️',  desc: 'Solar peak automation.',       baseCost: 5e18,     cpsBonus: 9e6    },
    { id: 'a_abyssal',     name: 'ABYSSAL NETWORK',     icon: '🌑',  desc: 'From the deepest dark.',       baseCost: 10e18,    cpsBonus: 13e6   },
    { id: 'a_nova2',       name: 'HYPERNOVA ARRAY',     icon: '💥',  desc: 'Exploding with automation.',   baseCost: 25e18,    cpsBonus: 20e6   },
    { id: 'a_moonbase',    name: 'MOON BASE ARRAY',     icon: '🌕',  desc: 'Clicking from the moon.',      baseCost: 50e18,    cpsBonus: 30e6   },
    { id: 'a_wyrmhive',    name: 'WYRMHIVE CLUSTER',    icon: '🐲',  desc: 'Swarm of dragon bots.',        baseCost: 100e18,   cpsBonus: 45e6   },
    { id: 'a_maelstrom',   name: 'MAELSTROM FARM',      icon: '🌪️',  desc: 'Chaotic auto-click vortex.',   baseCost: 250e18,   cpsBonus: 65e6   },
    { id: 'a_inferno',     name: 'INFERNO FARM',        icon: '🔥',  desc: 'Hell-fueled click engine.',    baseCost: 500e18,   cpsBonus: 95e6   },
    { id: 'a_glacier',     name: 'GLACIER ARRAY',       icon: '🧊',  desc: 'Cold, calculated, relentless.',baseCost: 1e21,     cpsBonus: 140e6  },
    { id: 'a_thundernet',  name: 'THUNDER NETWORK',     icon: '🌩️',  desc: 'Electric auto-click grid.',    baseCost: 2e21,     cpsBonus: 200e6  },
    { id: 'a_solaris',     name: 'SOLARIS ARRAY',       icon: '🌞',  desc: 'Solar-powered auto-farm.',     baseCost: 5e21,     cpsBonus: 300e6  },
    { id: 'a_lunar',       name: 'LUNAR AUTO-FARM',     icon: '🌛',  desc: 'Moon-driven click engine.',    baseCost: 10e21,    cpsBonus: 440e6  },
    { id: 'a_terra',       name: 'TERRA AUTO-FARM',     icon: '🌍',  desc: 'Earth-core click energy.',     baseCost: 25e21,    cpsBonus: 650e6  },
    { id: 'a_spectral',    name: 'SPECTRAL ARRAY',      icon: '👻',  desc: 'Ghost click harvest.',         baseCost: 50e21,    cpsBonus: 950e6  },
    { id: 'a_chronicle',   name: 'CHRONICLE ENGINE',    icon: '📜',  desc: 'Clicks across all history.',   baseCost: 100e21,   cpsBonus: 1.4e9  },
    { id: 'a_titangrid',   name: 'TITAN ARRAY',         icon: '💪',  desc: 'Old-god powered clicks.',      baseCost: 250e21,   cpsBonus: 2e9    },
    { id: 'a_dawn',        name: 'DAWN ENGINE',         icon: '🌅',  desc: 'Clicks at the start of time.', baseCost: 500e21,   cpsBonus: 3e9    },
    { id: 'a_oblivion',    name: 'OBLIVION ARRAY',      icon: '🌌',  desc: 'Clicks from the forgotten.',   baseCost: 1e24,     cpsBonus: 4.5e9  },
    { id: 'a_zenith',      name: 'ZENITH FARM',         icon: '🏔️',  desc: 'Peak auto-click performance.', baseCost: 2e24,     cpsBonus: 6.5e9  },
    { id: 'a_aeon',        name: 'AEON ARRAY',          icon: '⌛',  desc: 'An age of clicking.',          baseCost: 5e24,     cpsBonus: 9.5e9  },
    { id: 'a_mythic',      name: 'MYTHIC CLUSTER',      icon: '🐉',  desc: 'Legendary automation.',        baseCost: 10e24,    cpsBonus: 14e9   },
    { id: 'a_ultranet',    name: 'ULTRA NETWORK',       icon: '🔆',  desc: 'Blinding click throughput.',   baseCost: 25e24,    cpsBonus: 20e9   },
    { id: 'a_stormfarm',   name: 'STORM FARM',          icon: '⛈️',  desc: 'Lightning-speed clicks.',      baseCost: 50e24,    cpsBonus: 30e9   },

    // ── Tier 5: Transcendent (101–110) — 100E24 and beyond ──
    { id: 'a_cosmicdoom',  name: 'COSMIC DOOM ARRAY',   icon: '☄️',  desc: 'Universe-ending click rate.',  baseCost: 100e24,   cpsBonus: 44e9   },
    { id: 'a_omni',        name: 'OMNI ARRAY',          icon: '👊',  desc: 'All things. All clicking.',    baseCost: 250e24,   cpsBonus: 65e9   },
    { id: 'a_divine',      name: 'DIVINE ENGINE',       icon: '🖐️',  desc: 'God-tier automation.',         baseCost: 500e24,   cpsBonus: 95e9   },
    { id: 'a_worldend',    name: 'WORLD ENDER ARRAY',   icon: '💀',  desc: 'The last click machine.',      baseCost: 1e27,     cpsBonus: 140e9  },
    { id: 'a_infinityv2',  name: 'INFINITY BEYOND',     icon: '✴️',  desc: 'Clicks past infinity.',        baseCost: 2e27,     cpsBonus: 210e9  },
    { id: 'a_creation',    name: 'CREATION ENGINE',     icon: '🌈',  desc: 'Built to create clicks forever.',baseCost: 5e27,   cpsBonus: 310e9  },
    { id: 'a_astral',      name: 'ASTRAL ARRAY',        icon: '🔮',  desc: 'Clicks on the astral plane.',  baseCost: 10e27,    cpsBonus: 450e9  },
    { id: 'a_null',        name: 'NULL ARRAY',          icon: '⬛',  desc: 'Clicks from absolute nothing.',baseCost: 25e27,    cpsBonus: 650e9  },
    { id: 'a_apex',        name: 'APEX AUTO-FARM',      icon: '🦅',  desc: 'Top of the food chain.',       baseCost: 50e27,    cpsBonus: 950e9  },
    { id: 'a_godhand',     name: 'GOD HAND ARRAY',      icon: '🫲',  desc: 'Divine hands never stop.',     baseCost: 100e27,   cpsBonus: 1.4e12 },
];

function totalOwned(s) {
    let t = 0;
    MANUAL_UPGRADES.forEach(u => { t += s.manualUpgrades[u.id] || 0; });
    AUTO_UPGRADES.forEach(u => { t += s.autoUpgrades[u.id] || 0; });
    return t;
}

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────
const ACHIEVEMENTS = [

    // ══════════════════════════════════════════════
    // 🖱️  CLICK COUNT ACHIEVEMENTS (52 total)
    // ══════════════════════════════════════════════
    { id: 'ac_first',    name: 'FIRST CLICK',         icon: '🖱️', desc: 'Click once.',                     condition: s => s.totalClicks >= 1,       multiplier: 1.05 },
    { id: 'ac_10',       name: 'WARMING UP',           icon: '🤏', desc: '10 total clicks.',                condition: s => s.totalClicks >= 10,      multiplier: 1.02 },
    { id: 'ac_50',       name: 'CLICK APPRENTICE',     icon: '👆', desc: '50 total clicks.',                condition: s => s.totalClicks >= 50,      multiplier: 1.05 },
    { id: 'ac_100',      name: 'CENTURY CLICKER',      icon: '💯', desc: '100 total clicks.',               condition: s => s.totalClicks >= 100,     multiplier: 1.05 },
    { id: 'ac_250',      name: 'QUARTER THOU',         icon: '🏅', desc: '250 total clicks.',               condition: s => s.totalClicks >= 250,     multiplier: 1.05 },
    { id: 'ac_500',      name: 'CLICK JOURNEYMAN',     icon: '✊', desc: '500 total clicks.',               condition: s => s.totalClicks >= 500,     multiplier: 1.1  },
    { id: 'ac_1k',       name: 'ONE THOUSAND',         icon: '🔥', desc: '1,000 total clicks.',             condition: s => s.totalClicks >= 1000,    multiplier: 1.08 },
    { id: 'ac_2k5',      name: 'CLICKER IN TRAINING',  icon: '🏋️', desc: '2,500 total clicks.',             condition: s => s.totalClicks >= 2500,    multiplier: 1.08 },
    { id: 'ac_5k',       name: 'CLICK MASTER',         icon: '💥', desc: '5,000 total clicks.',             condition: s => s.totalClicks >= 5000,    multiplier: 1.1  },
    { id: 'ac_10k',      name: 'CLICK VETERAN',        icon: '🎖️', desc: '10,000 total clicks.',            condition: s => s.totalClicks >= 10000,   multiplier: 1.1  },
    { id: 'ac_25k',      name: 'CLICK WARRIOR',        icon: '⚔️', desc: '25,000 total clicks.',            condition: s => s.totalClicks >= 25000,   multiplier: 1.12 },
    { id: 'ac_50k',      name: 'CLICK LEGEND',         icon: '⚡', desc: '50,000 total clicks.',            condition: s => s.totalClicks >= 50000,   multiplier: 1.15 },
    { id: 'ac_75k',      name: 'THREE QUARTER MILL',   icon: '🌠', desc: '75,000 total clicks.',            condition: s => s.totalClicks >= 75000,   multiplier: 1.15 },
    { id: 'ac_100k',     name: 'SIX-FIGURE CLICKER',   icon: '💪', desc: '100,000 total clicks.',           condition: s => s.totalClicks >= 100000,  multiplier: 1.15 },
    { id: 'ac_150k',     name: 'RELENTLESS',           icon: '😤', desc: '150,000 total clicks.',           condition: s => s.totalClicks >= 150000,  multiplier: 1.15 },
    { id: 'ac_250k',     name: 'QUARTER MILLION',      icon: '🏆', desc: '250,000 total clicks.',           condition: s => s.totalClicks >= 250000,  multiplier: 1.17 },
    { id: 'ac_500k',     name: 'CLICK DEITY',          icon: '👁️', desc: '500,000 total clicks.',           condition: s => s.totalClicks >= 500000,  multiplier: 1.2  },
    { id: 'ac_750k',     name: 'CLICK SOVEREIGN',      icon: '👑', desc: '750,000 total clicks.',           condition: s => s.totalClicks >= 750000,  multiplier: 1.2  },
    { id: 'ac_1m',       name: 'CLICK MILLIONAIRE',    icon: '💰', desc: '1,000,000 total clicks.',         condition: s => s.totalClicks >= 1e6,     multiplier: 1.22 },
    { id: 'ac_2m',       name: 'DOUBLE MILLION',       icon: '💸', desc: '2,000,000 total clicks.',         condition: s => s.totalClicks >= 2e6,     multiplier: 1.22 },
    { id: 'ac_5m',       name: 'CLICK OVERLORD',       icon: '🦾', desc: '5,000,000 total clicks.',         condition: s => s.totalClicks >= 5e6,     multiplier: 1.25 },
    { id: 'ac_10m',      name: 'TEN MILLION TAPS',     icon: '🌋', desc: '10,000,000 total clicks.',        condition: s => s.totalClicks >= 10e6,    multiplier: 1.25 },
    { id: 'ac_25m',      name: 'CLICK TITAN',          icon: '🗿', desc: '25,000,000 total clicks.',        condition: s => s.totalClicks >= 25e6,    multiplier: 1.27 },
    { id: 'ac_50m',      name: 'FIFTY MILLION FURY',   icon: '🌊', desc: '50,000,000 total clicks.',        condition: s => s.totalClicks >= 50e6,    multiplier: 1.27 },
    { id: 'ac_100m',     name: 'CLICK COLOSSUS',       icon: '🌍', desc: '100,000,000 total clicks.',       condition: s => s.totalClicks >= 100e6,   multiplier: 1.3  },
    { id: 'ac_250m',     name: 'CLICK DIVINITY',       icon: '✨', desc: '250,000,000 total clicks.',       condition: s => s.totalClicks >= 250e6,   multiplier: 1.3  },
    { id: 'ac_500m',     name: 'CLICK DEMIGOD',        icon: '🌀', desc: '500,000,000 total clicks.',       condition: s => s.totalClicks >= 500e6,   multiplier: 1.32 },
    { id: 'ac_1b',       name: 'BILLION TAPPER',       icon: '💎', desc: '1,000,000,000 total clicks.',     condition: s => s.totalClicks >= 1e9,     multiplier: 1.35 },
    { id: 'ac_2b',       name: 'CLICK CELESTIAL',      icon: '🌟', desc: '2,000,000,000 total clicks.',     condition: s => s.totalClicks >= 2e9,     multiplier: 1.35 },
    { id: 'ac_5b',       name: 'CLICK ARCHANGEL',      icon: '😇', desc: '5,000,000,000 total clicks.',     condition: s => s.totalClicks >= 5e9,     multiplier: 1.37 },
    { id: 'ac_10b',      name: 'TEN BILLION FINGERS',  icon: '☁️', desc: '10,000,000,000 total clicks.',    condition: s => s.totalClicks >= 10e9,    multiplier: 1.37 },
    { id: 'ac_25b',      name: 'COSMIC CLICKER',       icon: '🌌', desc: '25,000,000,000 total clicks.',    condition: s => s.totalClicks >= 25e9,    multiplier: 1.4  },
    { id: 'ac_50b',      name: 'NEBULA TAPPER',        icon: '🔭', desc: '50,000,000,000 total clicks.',    condition: s => s.totalClicks >= 50e9,    multiplier: 1.4  },
    { id: 'ac_100b',     name: 'GALACTIC CLICKER',     icon: '🪐', desc: '100,000,000,000 total clicks.',   condition: s => s.totalClicks >= 100e9,   multiplier: 1.42 },
    { id: 'ac_250b',     name: 'STAR DESTROYER',       icon: '💫', desc: '250,000,000,000 total clicks.',   condition: s => s.totalClicks >= 250e9,   multiplier: 1.42 },
    { id: 'ac_500b',     name: 'QUASAR CLICKER',       icon: '🌠', desc: '500,000,000,000 total clicks.',   condition: s => s.totalClicks >= 500e9,   multiplier: 1.45 },
    { id: 'ac_1t',       name: 'TRILLION TAPPER',      icon: '🌑', desc: '1,000,000,000,000 total clicks.', condition: s => s.totalClicks >= 1e12,    multiplier: 1.5  },
    { id: 'ac_2t',       name: 'CLICK PHANTOM',        icon: '👻', desc: '2,000,000,000,000 total clicks.', condition: s => s.totalClicks >= 2e12,    multiplier: 1.5  },
    { id: 'ac_5t',       name: 'VOID TAPPER',          icon: '🕳️', desc: '5,000,000,000,000 total clicks.', condition: s => s.totalClicks >= 5e12,    multiplier: 1.52 },
    { id: 'ac_10t',      name: 'CLICK SPECTRE',        icon: '🌫️', desc: '10T total clicks.',               condition: s => s.totalClicks >= 10e12,   multiplier: 1.52 },
    { id: 'ac_25t',      name: 'INTERDIMENSIONAL',     icon: '🔮', desc: '25T total clicks.',               condition: s => s.totalClicks >= 25e12,   multiplier: 1.55 },
    { id: 'ac_50t',      name: 'REALITY SHATTER',      icon: '🌪️', desc: '50T total clicks.',               condition: s => s.totalClicks >= 50e12,   multiplier: 1.55 },
    { id: 'ac_100t',     name: 'CLICK SINGULARITY',    icon: '⚫', desc: '100T total clicks.',              condition: s => s.totalClicks >= 100e12,  multiplier: 1.57 },
    { id: 'ac_250t',     name: 'CLICK ETERNITY',       icon: '♾️', desc: '250T total clicks.',              condition: s => s.totalClicks >= 250e12,  multiplier: 1.57 },
    { id: 'ac_500t',     name: 'OMEGA CLICKER',        icon: '🔱', desc: '500T total clicks.',              condition: s => s.totalClicks >= 500e12,  multiplier: 1.6  },
    { id: 'ac_1q',       name: 'CLICK PRIMORDIAL',     icon: '🌀', desc: '1 quadrillion clicks.',           condition: s => s.totalClicks >= 1e15,    multiplier: 1.65 },
    { id: 'ac_2q',       name: 'BEYOND REASON',        icon: '🧿', desc: '2 quadrillion clicks.',           condition: s => s.totalClicks >= 2e15,    multiplier: 1.65 },
    { id: 'ac_5q',       name: 'CLICK PARADOX',        icon: '🌊', desc: '5 quadrillion clicks.',           condition: s => s.totalClicks >= 5e15,    multiplier: 1.67 },
    { id: 'ac_10q',      name: 'TRANSCENDENCE',        icon: '🕊️', desc: '10 quadrillion clicks.',          condition: s => s.totalClicks >= 10e15,   multiplier: 1.67 },
    { id: 'ac_50q',      name: 'THE INFINITE FINGER',  icon: '☝️', desc: '50 quadrillion clicks.',          condition: s => s.totalClicks >= 50e15,   multiplier: 1.7  },
    { id: 'ac_100q',     name: 'CLICK ABSOLUTE',       icon: '🔯', desc: '100 quadrillion clicks.',         condition: s => s.totalClicks >= 100e15,  multiplier: 1.75 },

    // ══════════════════════════════════════════════
    // 💰  POINTS EARNED ACHIEVEMENTS
    // ══════════════════════════════════════════════
    { id: 'ac_p100',  name: 'POCKET CHANGE',      icon: '🌱', desc: 'Earn 100 points.',               condition: s => s.points >= 100,   multiplier: 1.05 },
    { id: 'ac_p10k',  name: 'GETTING RICH',       icon: '💰', desc: 'Earn 10,000 points.',            condition: s => s.points >= 10000, multiplier: 1.1  },
    { id: 'ac_p1m',   name: 'CLICK MILLIONAIRE',  icon: '🏦', desc: 'Earn 1,000,000 points.',         condition: s => s.points >= 1e6,   multiplier: 1.15 },
    { id: 'ac_p1b',   name: 'CLICK BILLIONAIRE',  icon: '💎', desc: 'Earn 1,000,000,000 points.',     condition: s => s.points >= 1e9,   multiplier: 1.2  },
    { id: 'ac_p1t',   name: 'CLICK TRILLIONAIRE', icon: '🌌', desc: 'Earn 1,000,000,000,000 points.', condition: s => s.points >= 1e12,  multiplier: 1.25 },

    // ══════════════════════════════════════════════
    // 🛒  UPGRADE PURCHASE ACHIEVEMENTS (50 total)
    // ══════════════════════════════════════════════
    { id: 'ac_buy1',    name: 'FIRST PURCHASE',      icon: '🛒', desc: 'Buy any upgrade.',             condition: s => totalOwned(s) >= 1,    multiplier: 1.05 },
    { id: 'ac_buy5',    name: 'FIVE AND COUNTING',   icon: '🖐️', desc: 'Own 5 upgrades total.',        condition: s => totalOwned(s) >= 5,    multiplier: 1.05 },
    { id: 'ac_buy10',   name: 'SHOP ADDICT',         icon: '🏪', desc: 'Own 10 upgrades total.',       condition: s => totalOwned(s) >= 10,   multiplier: 1.1  },
    { id: 'ac_buy15',   name: 'BULK BUYER',          icon: '🛍️', desc: 'Own 15 upgrades total.',       condition: s => totalOwned(s) >= 15,   multiplier: 1.1  },
    { id: 'ac_buy20',   name: 'UPGRADE HOARDER',     icon: '📦', desc: 'Own 20 upgrades total.',       condition: s => totalOwned(s) >= 20,   multiplier: 1.1  },
    { id: 'ac_buy25',   name: 'QUARTER CENTURY',     icon: '🎖️', desc: 'Own 25 upgrades total.',       condition: s => totalOwned(s) >= 25,   multiplier: 1.12 },
    { id: 'ac_buy30',   name: 'UPGRADE ENTHUSIAST',  icon: '🔧', desc: 'Own 30 upgrades total.',       condition: s => totalOwned(s) >= 30,   multiplier: 1.12 },
    { id: 'ac_buy35',   name: 'UPGRADE FIEND',       icon: '😈', desc: 'Own 35 upgrades total.',       condition: s => totalOwned(s) >= 35,   multiplier: 1.12 },
    { id: 'ac_buy40',   name: 'SHOP UNTIL U DROP',   icon: '🏬', desc: 'Own 40 upgrades total.',       condition: s => totalOwned(s) >= 40,   multiplier: 1.12 },
    { id: 'ac_buy45',   name: 'UPGRADE ADDICT',      icon: '💊', desc: 'Own 45 upgrades total.',       condition: s => totalOwned(s) >= 45,   multiplier: 1.13 },
    { id: 'ac_buy50',   name: 'UPGRADE FACTORY',     icon: '🏭', desc: 'Own 50 upgrades total.',       condition: s => totalOwned(s) >= 50,   multiplier: 1.15 },
    { id: 'ac_buy60',   name: 'UPGRADE BARON',       icon: '🎩', desc: 'Own 60 upgrades total.',       condition: s => totalOwned(s) >= 60,   multiplier: 1.15 },
    { id: 'ac_buy70',   name: 'UPGRADE COMMANDER',   icon: '🎗️', desc: 'Own 70 upgrades total.',       condition: s => totalOwned(s) >= 70,   multiplier: 1.15 },
    { id: 'ac_buy80',   name: 'UPGRADE WARLORD',     icon: '⚔️', desc: 'Own 80 upgrades total.',       condition: s => totalOwned(s) >= 80,   multiplier: 1.15 },
    { id: 'ac_buy90',   name: 'UPGRADE EMPEROR',     icon: '🏛️', desc: 'Own 90 upgrades total.',       condition: s => totalOwned(s) >= 90,   multiplier: 1.17 },
    { id: 'ac_buy100',  name: 'UPGRADE ROYALTY',     icon: '👑', desc: 'Own 100 upgrades total.',      condition: s => totalOwned(s) >= 100,  multiplier: 1.2  },
    { id: 'ac_buy120',  name: 'UPGRADE TITAN',       icon: '🗿', desc: 'Own 120 upgrades total.',      condition: s => totalOwned(s) >= 120,  multiplier: 1.2  },
    { id: 'ac_buy150',  name: 'UPGRADE COLOSSUS',    icon: '🌋', desc: 'Own 150 upgrades total.',      condition: s => totalOwned(s) >= 150,  multiplier: 1.2  },
    { id: 'ac_buy175',  name: 'UPGRADE OVERLORD',    icon: '🦾', desc: 'Own 175 upgrades total.',      condition: s => totalOwned(s) >= 175,  multiplier: 1.22 },
    { id: 'ac_buy200',  name: 'DOUBLE CENTURY',      icon: '🎯', desc: 'Own 200 upgrades total.',      condition: s => totalOwned(s) >= 200,  multiplier: 1.22 },
    { id: 'ac_buy250',  name: 'UPGRADE LEGEND',      icon: '📖', desc: 'Own 250 upgrades total.',      condition: s => totalOwned(s) >= 250,  multiplier: 1.25 },
    { id: 'ac_buy300',  name: 'UPGRADE DEITY',       icon: '🌩️', desc: 'Own 300 upgrades total.',      condition: s => totalOwned(s) >= 300,  multiplier: 1.25 },
    { id: 'ac_buy350',  name: 'UPGRADE SOVEREIGN',   icon: '🛡️', desc: 'Own 350 upgrades total.',      condition: s => totalOwned(s) >= 350,  multiplier: 1.27 },
    { id: 'ac_buy400',  name: 'UPGRADE IMMORTAL',    icon: '⚗️', desc: 'Own 400 upgrades total.',      condition: s => totalOwned(s) >= 400,  multiplier: 1.27 },
    { id: 'ac_buy450',  name: 'UPGRADE ASCENDANT',   icon: '🌤️', desc: 'Own 450 upgrades total.',      condition: s => totalOwned(s) >= 450,  multiplier: 1.27 },
    { id: 'ac_buy500',  name: 'FIVE HUNDRED STRONG', icon: '💪', desc: 'Own 500 upgrades total.',      condition: s => totalOwned(s) >= 500,  multiplier: 1.3  },
    { id: 'ac_buy600',  name: 'UPGRADE CELESTIAL',   icon: '🌙', desc: 'Own 600 upgrades total.',      condition: s => totalOwned(s) >= 600,  multiplier: 1.3  },
    { id: 'ac_buy700',  name: 'UPGRADE NEBULA',      icon: '🌠', desc: 'Own 700 upgrades total.',      condition: s => totalOwned(s) >= 700,  multiplier: 1.3  },
    { id: 'ac_buy800',  name: 'UPGRADE GALAXY',      icon: '🌌', desc: 'Own 800 upgrades total.',      condition: s => totalOwned(s) >= 800,  multiplier: 1.32 },
    { id: 'ac_buy900',  name: 'UPGRADE UNIVERSE',    icon: '🌍', desc: 'Own 900 upgrades total.',      condition: s => totalOwned(s) >= 900,  multiplier: 1.32 },
    { id: 'ac_buy1000', name: 'ONE THOUSAND OWNED',  icon: '🏅', desc: 'Own 1,000 upgrades total.',    condition: s => totalOwned(s) >= 1000, multiplier: 1.35 },
    { id: 'ac_buy1250', name: 'UPGRADE PANTHEON',    icon: '⛩️', desc: 'Own 1,250 upgrades total.',    condition: s => totalOwned(s) >= 1250, multiplier: 1.35 },
    { id: 'ac_buy1500', name: 'UPGRADE SINGULARITY', icon: '🔯', desc: 'Own 1,500 upgrades total.',    condition: s => totalOwned(s) >= 1500, multiplier: 1.37 },
    { id: 'ac_buy2000', name: 'TWO THOUSAND OWNED',  icon: '🌀', desc: 'Own 2,000 upgrades total.',    condition: s => totalOwned(s) >= 2000, multiplier: 1.4  },
    { id: 'ac_buy2500', name: 'UPGRADE INFINITY',    icon: '♾️', desc: 'Own 2,500 upgrades total.',    condition: s => totalOwned(s) >= 2500, multiplier: 1.4  },
    { id: 'ac_buy3000', name: 'UPGRADE OMEGA',       icon: '🔱', desc: 'Own 3,000 upgrades total.',    condition: s => totalOwned(s) >= 3000, multiplier: 1.45 },
    { id: 'ac_buy4000', name: 'UPGRADE VOID',        icon: '🕳️', desc: 'Own 4,000 upgrades total.',    condition: s => totalOwned(s) >= 4000, multiplier: 1.45 },
    { id: 'ac_buy5000', name: 'UPGRADE GOD',         icon: '👁️', desc: 'Own 5,000 upgrades total.',    condition: s => totalOwned(s) >= 5000, multiplier: 1.5  },

    // ══════════════════════════════════════════════
    // ⚙️  CPS (AUTO) ACHIEVEMENTS (50 total)
    // ══════════════════════════════════════════════
    { id: 'ac_cps1',     name: 'FIRST BOT',           icon: '🤖', desc: 'Reach 1 CPS.',               condition: s => s.cps >= 1,       multiplier: 1.05 },
    { id: 'ac_cps5',     name: 'GETTING AUTOMATED',   icon: '⚙️', desc: 'Reach 5 CPS.',               condition: s => s.cps >= 5,       multiplier: 1.05 },
    { id: 'ac_cps10',    name: 'AUTO STARTER',        icon: '🔌', desc: 'Reach 10 CPS.',              condition: s => s.cps >= 10,      multiplier: 1.07 },
    { id: 'ac_cps25',    name: 'QUARTER MACHINE',     icon: '🔩', desc: 'Reach 25 CPS.',              condition: s => s.cps >= 25,      multiplier: 1.07 },
    { id: 'ac_cps50',    name: 'HALF CENTURY CPS',    icon: '📡', desc: 'Reach 50 CPS.',              condition: s => s.cps >= 50,      multiplier: 1.08 },
    { id: 'ac_cps100',   name: 'CLICK MACHINE',       icon: '⚙️', desc: 'Reach 100 CPS.',             condition: s => s.cps >= 100,     multiplier: 1.1  },
    { id: 'ac_cps250',   name: 'AUTO BEAST',          icon: '🦾', desc: 'Reach 250 CPS.',             condition: s => s.cps >= 250,     multiplier: 1.1  },
    { id: 'ac_cps500',   name: 'HALF THOUSAND CPS',   icon: '🏎️', desc: 'Reach 500 CPS.',             condition: s => s.cps >= 500,     multiplier: 1.1  },
    { id: 'ac_cps1k',    name: 'KILO CLICKER',        icon: '📶', desc: 'Reach 1,000 CPS.',           condition: s => s.cps >= 1000,    multiplier: 1.12 },
    { id: 'ac_cps2k5',   name: 'AUTO WARRIOR',        icon: '⚔️', desc: 'Reach 2,500 CPS.',           condition: s => s.cps >= 2500,    multiplier: 1.12 },
    { id: 'ac_cps5k',    name: 'FIVE THOUSAND AUTO',  icon: '🔋', desc: 'Reach 5,000 CPS.',           condition: s => s.cps >= 5000,    multiplier: 1.12 },
    { id: 'ac_cps10k',   name: 'CLICK ROCKET',        icon: '🚀', desc: 'Reach 10,000 CPS.',          condition: s => s.cps >= 10000,   multiplier: 1.15 },
    { id: 'ac_cps25k',   name: 'AUTO TITAN',          icon: '🗿', desc: 'Reach 25,000 CPS.',          condition: s => s.cps >= 25000,   multiplier: 1.15 },
    { id: 'ac_cps50k',   name: 'FIFTY KILO AUTO',     icon: '🌋', desc: 'Reach 50,000 CPS.',          condition: s => s.cps >= 50000,   multiplier: 1.15 },
    { id: 'ac_cps100k',  name: 'HUNDRED K AUTO',      icon: '⚡', desc: 'Reach 100,000 CPS.',         condition: s => s.cps >= 100000,  multiplier: 1.17 },
    { id: 'ac_cps250k',  name: 'AUTO OVERLORD',       icon: '🦅', desc: 'Reach 250,000 CPS.',         condition: s => s.cps >= 250000,  multiplier: 1.17 },
    { id: 'ac_cps500k',  name: 'AUTO JUGGERNAUT',     icon: '🚂', desc: 'Reach 500,000 CPS.',         condition: s => s.cps >= 500000,  multiplier: 1.17 },
    { id: 'ac_cps1m',    name: 'CLICK SUPERNOVA',     icon: '🌟', desc: 'Reach 1,000,000 CPS.',       condition: s => s.cps >= 1e6,     multiplier: 1.2  },
    { id: 'ac_cps2m',    name: 'AUTO DEITY',          icon: '👁️', desc: 'Reach 2,000,000 CPS.',       condition: s => s.cps >= 2e6,     multiplier: 1.2  },
    { id: 'ac_cps5m',    name: 'FIVE MEGA AUTO',      icon: '🌊', desc: 'Reach 5,000,000 CPS.',       condition: s => s.cps >= 5e6,     multiplier: 1.2  },
    { id: 'ac_cps10m',   name: 'AUTO COLOSSUS',       icon: '🌍', desc: 'Reach 10,000,000 CPS.',      condition: s => s.cps >= 10e6,    multiplier: 1.22 },
    { id: 'ac_cps25m',   name: 'AUTO SOVEREIGN',      icon: '👑', desc: 'Reach 25,000,000 CPS.',      condition: s => s.cps >= 25e6,    multiplier: 1.22 },
    { id: 'ac_cps50m',   name: 'AUTO CELESTIAL',      icon: '🌙', desc: 'Reach 50,000,000 CPS.',      condition: s => s.cps >= 50e6,    multiplier: 1.22 },
    { id: 'ac_cps100m',  name: 'HUNDRED MEGA AUTO',   icon: '💫', desc: 'Reach 100,000,000 CPS.',     condition: s => s.cps >= 100e6,   multiplier: 1.25 },
    { id: 'ac_cps250m',  name: 'AUTO GALAXY',         icon: '🌌', desc: 'Reach 250,000,000 CPS.',     condition: s => s.cps >= 250e6,   multiplier: 1.25 },
    { id: 'ac_cps500m',  name: 'AUTO UNIVERSE',       icon: '🌠', desc: 'Reach 500,000,000 CPS.',     condition: s => s.cps >= 500e6,   multiplier: 1.25 },
    { id: 'ac_cps1b',    name: 'BILLION CPS',         icon: '💎', desc: 'Reach 1,000,000,000 CPS.',   condition: s => s.cps >= 1e9,     multiplier: 1.3  },
    { id: 'ac_cps2b',    name: 'AUTO PHANTOM',        icon: '👻', desc: 'Reach 2,000,000,000 CPS.',   condition: s => s.cps >= 2e9,     multiplier: 1.3  },
    { id: 'ac_cps5b',    name: 'FIVE GIGA AUTO',      icon: '🌀', desc: 'Reach 5,000,000,000 CPS.',   condition: s => s.cps >= 5e9,     multiplier: 1.3  },
    { id: 'ac_cps10b',   name: 'AUTO VOID',           icon: '🕳️', desc: 'Reach 10,000,000,000 CPS.',  condition: s => s.cps >= 10e9,    multiplier: 1.32 },
    { id: 'ac_cps25b',   name: 'AUTO SINGULARITY',    icon: '⚫', desc: 'Reach 25,000,000,000 CPS.',  condition: s => s.cps >= 25e9,    multiplier: 1.32 },
    { id: 'ac_cps50b',   name: 'FIFTY BILLION AUTO',  icon: '🔮', desc: 'Reach 50,000,000,000 CPS.',  condition: s => s.cps >= 50e9,    multiplier: 1.32 },
    { id: 'ac_cps100b',  name: 'HUNDRED BILLION CPS', icon: '🌪️', desc: 'Reach 100B CPS.',            condition: s => s.cps >= 100e9,   multiplier: 1.35 },
    { id: 'ac_cps250b',  name: 'AUTO ETERNITY',       icon: '♾️', desc: 'Reach 250B CPS.',            condition: s => s.cps >= 250e9,   multiplier: 1.35 },
    { id: 'ac_cps500b',  name: 'AUTO OMEGA',          icon: '🔱', desc: 'Reach 500B CPS.',            condition: s => s.cps >= 500e9,   multiplier: 1.35 },
    { id: 'ac_cps1t',    name: 'TERA CLICKER',        icon: '🌑', desc: 'Reach 1 trillion CPS.',      condition: s => s.cps >= 1e12,    multiplier: 1.4  },
    { id: 'ac_cps2t',    name: 'AUTO PARADOX',        icon: '🧿', desc: 'Reach 2 trillion CPS.',      condition: s => s.cps >= 2e12,    multiplier: 1.4  },
    { id: 'ac_cps5t',    name: 'FIVE TERA AUTO',      icon: '🌊', desc: 'Reach 5 trillion CPS.',      condition: s => s.cps >= 5e12,    multiplier: 1.4  },
    { id: 'ac_cps10t',   name: 'TEN TERA AUTO',       icon: '☁️', desc: 'Reach 10 trillion CPS.',     condition: s => s.cps >= 10e12,   multiplier: 1.42 },
    { id: 'ac_cps25t',   name: 'AUTO TRANSCENDENT',   icon: '🕊️', desc: 'Reach 25 trillion CPS.',     condition: s => s.cps >= 25e12,   multiplier: 1.42 },
    { id: 'ac_cps50t',   name: 'AUTO PRIMORDIAL',     icon: '🌋', desc: 'Reach 50 trillion CPS.',     condition: s => s.cps >= 50e12,   multiplier: 1.45 },
    { id: 'ac_cps100t',  name: 'PETA CLICKER',        icon: '🔭', desc: 'Reach 100 trillion CPS.',    condition: s => s.cps >= 100e12,  multiplier: 1.45 },
    { id: 'ac_cps500t',  name: 'AUTO ABSOLUTE',       icon: '🌌', desc: 'Reach 500 trillion CPS.',    condition: s => s.cps >= 500e12,  multiplier: 1.47 },
    { id: 'ac_cps1q',    name: 'QUADRILLION AUTO',    icon: '🔯', desc: 'Reach 1 quadrillion CPS.',   condition: s => s.cps >= 1e15,    multiplier: 1.5  },
    { id: 'ac_cps5q',    name: 'AUTO INFINITY',       icon: '♾️', desc: 'Reach 5 quadrillion CPS.',   condition: s => s.cps >= 5e15,    multiplier: 1.52 },
    { id: 'ac_cps10q',   name: 'AUTO BEYOND',         icon: '👁️', desc: 'Reach 10 quadrillion CPS.',  condition: s => s.cps >= 10e15,   multiplier: 1.55 },
    { id: 'ac_cps50q',   name: 'AUTO PANTHEON',       icon: '⛩️', desc: 'Reach 50 quadrillion CPS.',  condition: s => s.cps >= 50e15,   multiplier: 1.57 },
    { id: 'ac_cps100q',  name: 'AUTO OMEGA SUPREME',  icon: '🔱', desc: 'Reach 100 quadrillion CPS.', condition: s => s.cps >= 100e15,  multiplier: 1.6  },
    { id: 'ac_cps1qn',   name: 'THE CLICK MACHINE GOD',icon:'👁️‍🗨️',desc:'Reach 1 quintillion CPS.',   condition: s => s.cps >= 1e18,    multiplier: 1.75 },

    // ══════════════════════════════════════════════
    // 🔄  PRESTIGE ACHIEVEMENTS
    // ══════════════════════════════════════════════
    { id: 'ac_pr1',  name: 'FIRST PRESTIGE',  icon: '🔄', desc: 'Prestige once.',      condition: s => s.prestigeCount >= 1,  multiplier: 1.1 },
    { id: 'ac_pr5',  name: 'PRESTIGE MASTER', icon: '♾️', desc: 'Prestige 5 times.',   condition: s => s.prestigeCount >= 5,  multiplier: 1.2 },
    { id: 'ac_pr10', name: 'PRESTIGE LEGEND', icon: '🌀', desc: 'Prestige 10 times.',  condition: s => s.prestigeCount >= 10, multiplier: 1.3 },

    // ══════════════════════════════════════════════
    // ⚡  SPECIAL ACHIEVEMENTS
    // ══════════════════════════════════════════════
    { id: 'ac_speed', name: 'SPEED CLICKER', icon: '⚡', desc: 'Click 10 times in 3 seconds.', condition: s => s._speedAchieved === true, multiplier: 1.1 },
];
