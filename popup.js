(() => {
  if (!globalThis.SYC_CONFIG || !globalThis.SYC_STORAGE_KEYS) {
    console.warn('yesbot popup: missing config');
    return;
  }

  const els = {
    licenseScreen: document.getElementById('syc-license-screen'),
    mainScreen:    document.getElementById('syc-main-screen'),
    keyInput:      document.getElementById('syc-key-input'),
    keySubmit:     document.getElementById('syc-key-submit'),
    keyFeedback:   document.getElementById('syc-key-feedback'),
    keyDisplay:    document.getElementById('syc-key-display'),
    keyChange:     document.getElementById('syc-key-change'),
    enabled:       document.getElementById('syc-enabled'),
    theme:         document.getElementById('syc-theme'),
    status:        document.getElementById('syc-status')
  };

  initPopup();

  function initPopup() {
    populateThemes();
    chrome.storage.local.get(['yesbot_license_key'], data => {
      if (data.yesbot_license_key) {
        showMainScreen(data.yesbot_license_key);
      } else {
        showLicenseScreen();
      }
    });
    bindEvents();
  }

  function showLicenseScreen() {
    els.licenseScreen.style.display = 'block';
    els.mainScreen.style.display = 'none';
    els.keyInput.value = '';
    setFeedback('', '');
  }

  function showMainScreen(key) {
    els.licenseScreen.style.display = 'none';
    els.mainScreen.style.display = 'block';
    els.keyDisplay.textContent = maskKey(key);
    loadSettings();
  }

  function maskKey(key) {
    // Show YESBOT-XXXX-…-LAST
    const parts = key.split('-');
    if (parts.length === 5) return `${parts[0]}-${parts[1]}-…-${parts[4]}`;
    return key.slice(0, 10) + '…';
  }

  function bindEvents() {
    els.keySubmit.addEventListener('click', activateKey);
    els.keyInput.addEventListener('keydown', e => { if (e.key === 'Enter') activateKey(); });
    els.keyChange.addEventListener('click', () => {
      chrome.storage.local.remove('yesbot_license_key', showLicenseScreen);
    });
    els.enabled.addEventListener('change', () => {
      saveSettings();
      updateStatus(els.enabled.checked);
    });
    els.theme.addEventListener('change', () => {
      applyTheme(els.theme.value);
      saveSettings();
    });
  }

  async function activateKey() {
    const key = els.keyInput.value.trim().toUpperCase();

    if (!key) {
      setFeedback('Please enter your license key.', 'error');
      return;
    }

    els.keySubmit.disabled = true;
    setFeedback('Validating…', '');

    try {
      const response = await fetch('https://yesbot.up.railway.app/judge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-license-key': key
        },
        body: JSON.stringify({ userMessage: 'ping' })
      });

      // 400 (bad request) means the key was accepted but input was invalid — key is valid
      // 401 means the key itself is rejected
      if (response.status === 401) {
        setFeedback('Invalid or revoked license key.', 'error');
        els.keySubmit.disabled = false;
        return;
      }

      chrome.storage.local.set({ yesbot_license_key: key }, () => {
        setFeedback('', '');
        showMainScreen(key);
      });
    } catch {
      setFeedback('Could not reach server. Check your connection.', 'error');
      els.keySubmit.disabled = false;
    }
  }

  function setFeedback(msg, type) {
    els.keyFeedback.textContent = msg;
    els.keyFeedback.className = `syc-key-feedback ${type}`;
  }

  function populateThemes() {
    Object.entries(SYC_CONFIG.themes).forEach(([value, meta]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = meta.label || value;
      els.theme.appendChild(option);
    });
  }

  function loadSettings() {
    chrome.storage.sync.get([SYC_STORAGE_KEYS.settings], data => {
      const settings = { ...SYC_CONFIG.defaultSettings, ...(data[SYC_STORAGE_KEYS.settings] || {}) };
      els.enabled.checked = settings.enabled;
      els.theme.value = getValidTheme(settings.theme);
      applyTheme(els.theme.value);
      updateStatus(settings.enabled);
    });
  }

  function saveSettings() {
    const payload = {
      enabled: els.enabled.checked,
      theme: getValidTheme(els.theme.value)
    };
    chrome.storage.sync.set({ [SYC_STORAGE_KEYS.settings]: payload });
  }

  function getValidTheme(themeKey) {
    return SYC_CONFIG.themes[themeKey] ? themeKey : 'light';
  }

  function applyTheme(themeKey) {
    document.body.dataset.sycTheme = getValidTheme(themeKey);
  }

  function updateStatus(enabled) {
    els.status.textContent = enabled
      ? 'Active — scoring AI responses on supported sites.'
      : 'Disabled — no scores will appear.';
  }
})();
