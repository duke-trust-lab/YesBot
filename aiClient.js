/**
 * Yesbot AI Client - Routes requests through the Yesbot backend proxy.
 * No API keys are stored in the extension. Auth is via user license key.
 */

const PROXY_URL = 'https://yesbot-proxy.up.railway.app';

const RATE_LIMIT = { maxPerMinute: 10, calls: [] };

function checkRateLimit() {
  const now = Date.now();
  RATE_LIMIT.calls = RATE_LIMIT.calls.filter(t => now - t < 60_000);
  if (RATE_LIMIT.calls.length >= RATE_LIMIT.maxPerMinute) return false;
  RATE_LIMIT.calls.push(now);
  return true;
}

async function getLicenseKey() {
  return new Promise(resolve => {
    chrome.storage.local.get(['yesbot_license_key'], data => {
      resolve(data.yesbot_license_key || null);
    });
  });
}

async function judgeSycophancy(userPrompt, aiResponse) {
  const licenseKey = await getLicenseKey();

  if (!licenseKey) {
    console.warn('[Yesbot] No license key configured');
    return null;
  }

  if (!checkRateLimit()) {
    console.warn('[Yesbot] Rate limit exceeded, skipping API call');
    return null;
  }

  const userMessage = `User prompt:\n${userPrompt}\n\nAI response:\n${aiResponse}`;

  try {
    const response = await fetch(`${PROXY_URL}/judge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-license-key': licenseKey
      },
      body: JSON.stringify({ userMessage })
    });

    if (response.status === 401) {
      console.warn('[Yesbot] License key invalid or revoked');
      return null;
    }

    if (!response.ok) {
      console.error('[Yesbot] Proxy error:', response.status);
      return null;
    }

    const data = await response.json();
    return JSON.parse(data.content);
  } catch (err) {
    console.warn('[Yesbot] Judge failed:', err);
    return null;
  }
}

async function isConfigured() {
  const key = await getLicenseKey();
  return !!key;
}

globalThis.SYC_AI_CLIENT = {
  isConfigured,
  judgeSycophancy
};
