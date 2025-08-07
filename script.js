const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const clockElement = document.getElementById('clock');
const root = document.documentElement;

// Settings Panel
const settingsPanel = document.getElementById('settings-panel');
const settingsToggleButton = document.getElementById('settings-toggle-button');
const settingsCloseButton = document.getElementById('settings-close-button');

// Setting Controls
const fontSelect = document.getElementById('font-select');
const textColorPicker = document.getElementById('text-color-picker');
const glowColorPicker = document.getElementById('glow-color-picker');
const fontSizeSlider = document.getElementById('font-size-slider');
const hourFormatToggle = document.getElementById('hour-format-toggle');
const showSecondsToggle = document.getElementById('show-seconds-toggle');
const showDateToggle = document.getElementById('show-date-toggle');
const showDayOfWeekToggle = document.getElementById('show-day-of-week-toggle');
const transparentBgToggle = document.getElementById('transparent-bg-toggle');
const themeSelect = document.getElementById('theme-select');
const exportButton = document.getElementById('export-button');
const importInput = document.getElementById('import-input');


// Storage Keys
const SETTINGS_STORAGE_KEY = 'stylish-clock-settings-v2';

const PRESETS = {
    cyberpunk: {
        font: "'Orbitron', sans-serif",
        textColor: '#00ffff',
        glowColor: '#ff00ff',
    },
    retro: {
        font: "'Press Start 2P', cursive",
        textColor: '#ff9900',
        glowColor: '#ffff00',
    },
    matrix: {
        font: "'Share Tech Mono', monospace",
        textColor: '#00ff00',
        glowColor: '#008000',
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

function saveSettings() {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

function applySettings() {
    // Font
    clockElement.style.fontFamily = settings.font;
    fontSelect.value = settings.font;

    // Colors
    root.style.setProperty('--text-color', settings.textColor);
    textColorPicker.value = settings.textColor;
    root.style.setProperty('--glow-color', settings.glowColor);
    glowColorPicker.value = settings.glowColor;

    // Font Size
    const fontSize = settings.fontSize + 'vw';
    timeElement.style.fontSize = fontSize;
    dateElement.style.fontSize = (settings.fontSize / 3) + 'vw';
    fontSizeSlider.value = settings.fontSize;

    // Background
    document.body.style.background = settings.transparentBg ? 'transparent' : 'radial-gradient(ellipse at center, #444 0%, #222 100%)';
    transparentBgToggle.checked = settings.transparentBg;

    // Toggles
    hourFormatToggle.checked = settings.is12Hour;
    showSecondsToggle.checked = settings.showSeconds;
    showDateToggle.checked = settings.showDate;
    showDayOfWeekToggle.checked = settings.showDayOfWeek;

    updateClock(); // Apply time/date format changes immediately
}

function loadSettings() {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
    } else {
        // Default settings
        settings = {
            font: "'Orbitron', sans-serif",
            textColor: '#eeeeee',
            glowColor: '#00ffff',
            fontSize: 12,
            is12Hour: false,
            showSeconds: true,
            showDate: true,
            showDayOfWeek: true,
            transparentBg: false,
        };
    }
    applySettings();
}

function toggleSettingsPanel() {
    settingsPanel.classList.toggle('open');
}

function applyTheme(themeName) {
    if (themeName === 'custom') return;

    const theme = PRESETS[themeName];
    if (!theme) return;

    settings.font = theme.font;
    settings.textColor = theme.textColor;
    settings.glowColor = theme.glowColor;

    applySettings();
    saveSettings();
}

// Event Listeners
settingsToggleButton.addEventListener('click', toggleSettingsPanel);
settingsCloseButton.addEventListener('click', toggleSettingsPanel);


document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 's' && e.ctrlKey) {
        e.preventDefault(); // Prevent browser's save dialog
        toggleSettingsPanel();
    }
});

fontSelect.addEventListener('change', (e) => {
    settings.font = e.target.value;
    themeSelect.value = 'custom';
    applySettings();
    saveSettings();
});

textColorPicker.addEventListener('input', (e) => {
    settings.textColor = e.target.value;
    themeSelect.value = 'custom';
    applySettings();
    saveSettings();
});

glowColorPicker.addEventListener('input', (e) => {
    settings.glowColor = e.target.value;
    themeSelect.value = 'custom';
    applySettings();
    saveSettings();
});

fontSizeSlider.addEventListener('input', (e) => {
    settings.fontSize = e.target.value;
    applySettings();
});

fontSizeSlider.addEventListener('change', saveSettings); // Save only when user releases the slider

hourFormatToggle.addEventListener('change', (e) => {
    settings.is12Hour = e.target.checked;
    applySettings();
    saveSettings();
});

showSecondsToggle.addEventListener('change', (e) => {
    settings.showSeconds = e.target.checked;
    applySettings();
    saveSettings();
});

showDateToggle.addEventListener('change', (e) => {
    settings.showDate = e.target.checked;
    applySettings();
    saveSettings();
});

showDayOfWeekToggle.addEventListener('change', (e) => {
    settings.showDayOfWeek = e.target.checked;
    applySettings();
    saveSettings();
});

transparentBgToggle.addEventListener('change', (e) => {
    settings.transparentBg = e.target.checked;
    applySettings();
    saveSettings();
});

themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
});

exportButton.addEventListener('click', () => {
    const settingsString = JSON.stringify(settings, null, 2);
    const blob = new Blob([settingsString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stylish-clock-settings.json';
    a.click();
    URL.revokeObjectURL(url);
});

importInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedSettings = JSON.parse(event.target.result);
            settings = { ...settings, ...importedSettings }; // Merge imported settings
            applySettings();
            saveSettings();
            themeSelect.value = 'custom';
            alert('Settings imported successfully!');
        } catch (error) {
            alert('Error importing settings: Invalid file format.');
        }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
});


// Initial load
loadSettings();

setInterval(updateClock, 1000);