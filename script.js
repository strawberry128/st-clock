const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const clockElement = document.getElementById('clock');
const root = document.documentElement;

// Settings Panel
const settingsPanel = document.getElementById('settings');
const settingsToggleButton = document.getElementById('settings-toggle-button');

// Setting Controls
const fontSelect = document.getElementById('font-select');
const textColorPicker = document.getElementById('text-color-picker');
const glowColorPicker = document.getElementById('glow-color-picker');
const hourFormatToggle = document.getElementById('hour-format-toggle');
const showSecondsToggle = document.getElementById('show-seconds-toggle');
const showDateToggle = document.getElementById('show-date-toggle');
const showDayOfWeekToggle = document.getElementById('show-day-of-week-toggle');

// Storage Keys
const FONT_STORAGE_KEY = 'stylish-clock-font';
const TEXT_COLOR_KEY = 'stylish-clock-text-color';
const GLOW_COLOR_KEY = 'stylish-clock-glow-color';
const HOUR_FORMAT_KEY = 'stylish-clock-hour-format';
const SHOW_SECONDS_KEY = 'stylish-clock-show-seconds';
const SHOW_DATE_KEY = 'stylish-clock-show-date';
const SHOW_DAY_OF_WEEK_KEY = 'stylish-clock-show-day-of-week';

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

function loadSettings() {
    // Font
    const savedFont = localStorage.getItem(FONT_STORAGE_KEY);
    if (savedFont) {
        clockElement.style.fontFamily = savedFont;
        fontSelect.value = savedFont;
    }

    // Colors
    const savedTextColor = localStorage.getItem(TEXT_COLOR_KEY);
    if (savedTextColor) {
        root.style.setProperty('--text-color', savedTextColor);
        textColorPicker.value = savedTextColor;
    }
    const savedGlowColor = localStorage.getItem(GLOW_COLOR_KEY);
    if (savedGlowColor) {
        root.style.setProperty('--glow-color', savedGlowColor);
        glowColorPicker.value = savedGlowColor;
    }

    // Toggles
    settings.is12Hour = localStorage.getItem(HOUR_FORMAT_KEY) === 'true';
    settings.showSeconds = localStorage.getItem(SHOW_SECONDS_KEY) !== 'false'; // default to true
    settings.showDate = localStorage.getItem(SHOW_DATE_KEY) !== 'false'; // default to true
    settings.showDayOfWeek = localStorage.getItem(SHOW_DAY_OF_WEEK_KEY) !== 'false'; // default to true

    hourFormatToggle.checked = settings.is12Hour;
    showSecondsToggle.checked = settings.showSeconds;
    showDateToggle.checked = settings.showDate;
    showDayOfWeekToggle.checked = settings.showDayOfWeek;

    updateClock(); // Apply settings immediately
}

function toggleSettingsPanel() {
    settingsPanel.classList.toggle('hidden');
}

// Event Listeners
settingsToggleButton.addEventListener('click', toggleSettingsPanel);
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 's') {
        toggleSettingsPanel();
    }
});

fontSelect.addEventListener('change', (e) => {
    const newFont = e.target.value;
    clockElement.style.fontFamily = newFont;
    localStorage.setItem(FONT_STORAGE_KEY, newFont);
});

textColorPicker.addEventListener('input', (e) => {
    const newColor = e.target.value;
    root.style.setProperty('--text-color', newColor);
    localStorage.setItem(TEXT_COLOR_KEY, newColor);
});

glowColorPicker.addEventListener('input', (e) => {
    const newColor = e.target.value;
    root.style.setProperty('--glow-color', newColor);
    localStorage.setItem(GLOW_COLOR_KEY, newColor);
});

hourFormatToggle.addEventListener('change', (e) => {
    settings.is12Hour = e.target.checked;
    localStorage.setItem(HOUR_FORMAT_KEY, settings.is12Hour);
    updateClock();
});

showSecondsToggle.addEventListener('change', (e) => {
    settings.showSeconds = e.target.checked;
    localStorage.setItem(SHOW_SECONDS_KEY, settings.showSeconds);
    updateClock();
});

showDateToggle.addEventListener('change', (e) => {
    settings.showDate = e.target.checked;
    localStorage.setItem(SHOW_DATE_KEY, settings.showDate);
    updateClock();
});

showDayOfWeekToggle.addEventListener('change', (e) => {
    settings.showDayOfWeek = e.target.checked;
    localStorage.setItem(SHOW_DAY_OF_WEEK_KEY, settings.showDayOfWeek);
    updateClock();
});

// Initial load
loadSettings();

setInterval(updateClock, 1000);