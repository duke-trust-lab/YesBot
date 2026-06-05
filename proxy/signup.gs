/**
 * Yesbot License Key Issuance — Google Apps Script
 *
 * Setup:
 *   1. Create a Google Form with fields: "Name" and "Email"
 *   2. In the Form, open Script Editor (Extensions → Apps Script)
 *   3. Paste this file's contents, replacing the CONFIG values below
 *   4. Run setupTrigger() once manually to register the form submit trigger
 *   5. Authorize the script when prompted (needs Gmail + external URL access)
 */

var CONFIG = {
  PROXY_URL:    'https://yesbot-proxy.up.railway.app',
  ADMIN_SECRET: 'YOUR_ADMIN_SECRET_HERE',  // same value as Railway ADMIN_SECRET env var
  FORM_NAME_FIELD:  'Name',                // must match your form field label exactly
  FORM_EMAIL_FIELD: 'Email',               // must match your form field label exactly
};

// ---------------------------------------------------------------------------
// Run this function ONCE manually from the Apps Script editor to register
// the trigger. You do not need to run it again.
// ---------------------------------------------------------------------------
function setupTrigger() {
  // Remove any existing triggers to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(function(t) {
    ScriptApp.deleteTrigger(t);
  });

  var form = FormApp.getActiveForm();
  ScriptApp.newTrigger('onFormSubmit')
    .forForm(form)
    .onFormSubmit()
    .create();

  Logger.log('Trigger registered for form: ' + form.getTitle());
}

// ---------------------------------------------------------------------------
// Called automatically on every form submission
// ---------------------------------------------------------------------------
function onFormSubmit(e) {
  var responses = e.response.getItemResponses();
  var name  = '';
  var email = '';

  responses.forEach(function(r) {
    var title = r.getItem().getTitle();
    if (title === CONFIG.FORM_NAME_FIELD)  name  = r.getResponse();
    if (title === CONFIG.FORM_EMAIL_FIELD) email = r.getResponse();
  });

  if (!email) {
    Logger.log('No email found in submission — skipping');
    return;
  }

  var key = createLicenseKey(email, name);

  if (!key) {
    Logger.log('Failed to create key for: ' + email);
    sendErrorNotification(email, name);
    return;
  }

  sendKeyEmail(email, name, key);
  Logger.log('Key issued: ' + key + ' → ' + email);
}

// ---------------------------------------------------------------------------
// Call the proxy admin endpoint to generate a key
// ---------------------------------------------------------------------------
function createLicenseKey(email, name) {
  var url = CONFIG.PROXY_URL + '/admin/keys';
  var payload = JSON.stringify({ label: name + ' <' + email + '>' });

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'x-admin-secret': CONFIG.ADMIN_SECRET },
    payload: payload,
    muteHttpExceptions: true
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var code = response.getResponseCode();

    if (code !== 200) {
      Logger.log('Proxy returned ' + code + ': ' + response.getContentText());
      return null;
    }

    var data = JSON.parse(response.getContentText());
    return data.key || null;
  } catch (err) {
    Logger.log('Error calling proxy: ' + err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Send the key to the user via Gmail
// ---------------------------------------------------------------------------
function sendKeyEmail(email, name, key) {
  var firstName = name ? name.split(' ')[0] : 'there';
  var subject   = 'Your Yesbot License Key';

  var body = [
    'Hi ' + firstName + ',',
    '',
    'Thanks for signing up for Yesbot! Here is your license key:',
    '',
    '    ' + key,
    '',
    'How to activate:',
    '  1. Install the Yesbot Chrome extension',
    '  2. Click the Yesbot icon in your toolbar',
    '  3. Enter your license key and click Activate',
    '',
    'Yesbot will then score AI responses for sycophancy on ChatGPT, Claude,',
    'Gemini, and Perplexity.',
    '',
    'If you have any questions, just reply to this email.',
    '',
    '— The Yesbot Team'
  ].join('\n');

  var htmlBody = [
    '<p>Hi ' + firstName + ',</p>',
    '<p>Thanks for signing up for Yesbot! Here is your license key:</p>',
    '<p style="font-family:monospace;font-size:16px;background:#f5f5f5;padding:12px 16px;border-radius:8px;display:inline-block;">',
    key,
    '</p>',
    '<p><strong>How to activate:</strong></p>',
    '<ol>',
    '  <li>Install the <a href="https://chrome.google.com/webstore">Yesbot Chrome extension</a></li>',
    '  <li>Click the Yesbot icon in your toolbar</li>',
    '  <li>Enter your license key and click <strong>Activate</strong></li>',
    '</ol>',
    '<p>Yesbot will then score AI responses for sycophancy on ChatGPT, Claude, Gemini, and Perplexity.</p>',
    '<p>If you have any questions, just reply to this email.</p>',
    '<p>— The Yesbot Team</p>'
  ].join('\n');

  GmailApp.sendEmail(email, subject, body, { htmlBody: htmlBody });
}

// ---------------------------------------------------------------------------
// Notify yourself if key creation fails so no one is left waiting
// ---------------------------------------------------------------------------
function sendErrorNotification(email, name) {
  var adminEmail = Session.getActiveUser().getEmail();
  GmailApp.sendEmail(
    adminEmail,
    '[Yesbot] Failed to issue key for ' + email,
    'Key creation failed for: ' + name + ' <' + email + '>. Check the proxy logs on Railway.'
  );
}
