const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const clockElement = document.getElementById('clock');
const root = document.documentElement;

// Settings Panel
const settingsPanel = document.getElementById('settings-panel');
const settingsToggleButton = document.getElementById('settings-toggle-button');
const settingsCloseButton = document.getElementById('settings-close-button');

// Setting Controls
const themeSelect = document.getElementById('theme-select');

const PRESETS = {
    alien: {
        font: "'Nova Square', sans-serif",
        textColor: '#7fff00',
        glowColor: '#abff4f',
        fontSize: 13,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    earth: {
        font: "'Caveat', cursive",
        textColor: '#8B4513',
        glowColor: '#228B22',
        fontSize: 16,
        is12Hour: true,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    jungle: {
        font: "'Gochi Hand', cursive",
        textColor: '#006400',
        glowColor: '#ADFF2F',
        fontSize: 15,
        is12Hour: true,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    lava: {
        font: "'Anton', sans-serif",
        textColor: '#FF4500',
        glowColor: '#FF0000',
        fontSize: 13,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    quantum: {
        font: "'Orbitron', sans-serif",
        textColor: '#8A2BE2',
        glowColor: '#4B0082',
        fontSize: 12,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    techno: {
        font: "'Bebas Neue', sans-serif",
        textColor: '#FF00FF',
        glowColor: '#00FFFF',
        fontSize: 14,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    underwater: {
        font: "'Roboto Mono', monospace",
        textColor: '#00BFFF',
        glowColor: '#1E90FF',
        fontSize: 12,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    wildwest: {
        font: "'Press Start 2P', cursive",
        textColor: '#D2691E',
        glowColor: '#A0522D',
        fontSize: 10,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    xray: {
        font: "'Space Mono', monospace",
        textColor: '#FFFFFF',
        glowColor: '#C0C0C0',
        fontSize: 12,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    youthful: {
        font: "'Patrick Hand', cursive",
        textColor: '#FFD700',
        glowColor: '#FF69B4',
        fontSize: 15,
        is12Hour: true,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    zebra: {
        font: "'Zilla Slab Highlight', cursive",
        textColor: '#FFFFFF',
        glowColor: '#000000',
        fontSize: 13,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    cyberpunk: {
        font: "'Audiowide', cursive",
        textColor: '#00ffff',
        glowColor: '#ff00ff',
        fontSize: 12,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    retro: {
        font: "'Emilys Candy', cursive",
        textColor: '#ff9900',
        glowColor: '#ffff00',
        fontSize: 10,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    matrix: {
        font: "'Share Tech Mono', monospace",
        textColor: '#00ff00',
        glowColor: '#008000',
        fontSize: 12,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    minimalist: {
        font: "'Cutive Mono', monospace",
        textColor: '#ffffff',
        glowColor: '#000000',
        fontSize: 12,
        is12Hour: true,
        showSeconds: false,
        showDate: false,
        showDayOfWeek: false,
    },
    neon: {
        font: "'Bungee', cursive",
        textColor: '#ff00ff',
        glowColor: '#00ffff',
        fontSize: 14,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    vintage: {
        font: "'Uncial Antiqua', cursive",
        textColor: '#a0522d',
        glowColor: '#f5deb3',
        fontSize: 15,
        is12Hour: true,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    pastel: {
        font: "'Annie Use Your Telescope', cursive",
        textColor: '#ffb6c1',
        glowColor: '#add8e6',
        fontSize: 15,
        is12Hour: true,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    kawaii: {
        font: "'Amatic SC', cursive",
        textColor: '#ff69b4',
        glowColor: '#87cefa',
        fontSize: 18,
        is12Hour: true,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    handwritten: {
        font: "'Indie Flower', cursive",
        textColor: '#6a5acd',
        glowColor: '#ffe4e1',
        fontSize: 14,
        is12Hour: true,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    fire: {
        font: "'Black Ops One', cursive",
        textColor: '#ff4500',
        glowColor: '#ffd700',
        fontSize: 13,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    ice: {
        font: "'Iceland', cursive",
        textColor: '#b0e0e6',
        glowColor: '#ffffff',
        fontSize: 14,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    forest: {
        font: "'Mountains of Christmas', cursive",
        textColor: '#228b22',
        glowColor: '#9acd32',
        fontSize: 16,
        is12Hour: true,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    ocean: {
        font: "'Kelly Slab', sans-serif",
        textColor: '#00bfff',
        glowColor: '#00ffff',
        fontSize: 12,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    sunshine: {
        font: "'Sunshiney', cursive",
        textColor: '#ffd700',
        glowColor: '#ff4500',
        fontSize: 15,
        is12Hour: true,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    galaxy: {
        font: "'Codystar', cursive",
        textColor: '#dda0dd',
        glowColor: '#4b0082',
        fontSize: 12,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    hacker: {
        font: "'VT323', monospace",
        textColor: '#00ff00',
        glowColor: '#008000',
        fontSize: 14,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    bubblegum: {
        font: "'Flavors', cursive",
        textColor: '#ff69b4',
        glowColor: '#1e90ff',
        fontSize: 13,
        is12Hour: true,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    grayscale: {
        font: "'Cousine', monospace",
        textColor: '#c0c0c0',
        glowColor: '#808080',
        fontSize: 12,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    steampunk: {
        font: "'Wallpoet', cursive",
        textColor: '#daa520',
        glowColor: '#8b4513',
        fontSize: 12,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    },
    dreamy: {
        font: "'Satisfy', cursive",
        textColor: '#e6e6fa',
        glowColor: '#dda0dd',
        fontSize: 16,
        is12Hour: true,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
    }
};

let settings = {};

function formatTime(date) {
    let h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    let ampm = '';

    if (settings.is12Hour) {
        ampm = h >= 12 ? ' PM' : ' AM';
        h = h % 12 || 12; // Convert 0 to 12
    }

    h = h.toString().padStart(2, '0');

    let timeString = `${h}:${m}`;
    if (settings.showSeconds) {
        timeString += `:${s}`;
    }
    timeString += ampm;

    return timeString;
}

function formatDate(date) {
    if (!settings.showDate) {
        return '';
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()];

    let dateString = `${year}-${month}-${day}`;
    if (settings.showDayOfWeek) {
        dateString += ` ${dayOfWeek}`;
    }
    return dateString;
}

function updateClock() {
    const now = new Date();
    timeElement.textContent = formatTime(now);
    dateElement.textContent = formatDate(now);
}

function applySettings() {
    // Font
    clockElement.style.fontFamily = settings.font;

    // Colors
    root.style.setProperty('--text-color', settings.textColor);
    root.style.setProperty('--glow-color', settings.glowColor);

    // Font Size
    const fontSize = settings.fontSize + 'vw';
    timeElement.style.fontSize = fontSize;
    dateElement.style.fontSize = (settings.fontSize / 3) + 'vw';

    // Background
    document.body.style.background = settings.transparentBg ? 'transparent' : 'radial-gradient(ellipse at center, #444 0%, #222 100%)';

    updateClock(); // Apply time/date format changes immediately
}

function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const regex = /([^&=]+)=([^&]*)/g;
    let m;
    while ((m = regex.exec(queryString))) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
}

function loadSettings() {
    // Default settings
    const defaultSettings = {
        font: "'Orbitron', sans-serif",
        textColor: '#eeeeee',
        glowColor: '#00ffff',
        fontSize: 12,
        is12Hour: false,
        showSeconds: true,
        showDate: true,
        showDayOfWeek: true,
        transparentBg: true,
    };

    settings = { ...defaultSettings };

    const urlParams = getQueryParams();
    const themeFromUrl = urlParams.theme;

    if (themeFromUrl && PRESETS[themeFromUrl]) {
        applyTheme(themeFromUrl);
        themeSelect.value = themeFromUrl;
    } else {
        const firstTheme = Object.keys(PRESETS)[0];
        applyTheme(firstTheme);
        themeSelect.value = firstTheme;
    }
}

function toggleSettingsPanel() {
    settingsPanel.classList.toggle('open');
}

function applyTheme(themeName) {
    const theme = PRESETS[themeName];
    if (!theme) return;

    settings = { ...settings, ...theme };

    applySettings();
}

// Event Listeners
settingsToggleButton.addEventListener('click', toggleSettingsPanel);
settingsCloseButton.addEventListener('click', toggleSettingsPanel);

themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
    themeSelect.value = e.target.value;
});

// Populate theme selector
const themeNamesForSelect = Object.keys(PRESETS);
themeNamesForSelect.forEach(themeName => {
    const option = document.createElement('option');
    option.value = themeName;
    option.textContent = themeName.charAt(0).toUpperCase() + themeName.slice(1);
    themeSelect.appendChild(option);
});

const keyThemeMap = {};
const themeNames = Object.keys(PRESETS);
themeNames.forEach(themeName => {
    const firstLetter = themeName.charAt(0);
    if (!keyThemeMap[firstLetter]) {
        keyThemeMap[firstLetter] = themeName;
    }
});

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (keyThemeMap[key]) {
        const newTheme = keyThemeMap[key];
        applyTheme(newTheme);
        themeSelect.value = newTheme;
    }
});

loadSettings();
setInterval(updateClock, 1000);

// Initial update
updateClock();

// Hide settings panel and button if in OBS
if (navigator.userAgent.includes("OBS")) {
    settingsPanel.style.display = 'none';
    settingsToggleButton.style.display = 'none';
}

// Add a class to body when settings panel is open to disable clock interaction
settingsPanel.addEventListener('transitionend', () => {
    if (settingsPanel.classList.contains('open')) {
        document.body.classList.add('settings-open');
    } else {
        document.body.classList.remove('settings-open');
    }
});