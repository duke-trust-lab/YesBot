# Privacy Policy for YesBot

**Last Updated:** June 5, 2026

## Overview

YesBot is a Chrome extension that provides real-time sycophancy scoring for AI assistant responses. This privacy policy explains our commitment to protecting your privacy and describes how YesBot handles data.

## Our Privacy-First Approach

YesBot was built from the ground up with privacy as a core principle. We believe that you should be able to evaluate AI responses without sacrificing your privacy or sharing your conversations with third parties.

## Data Collection and Storage

### What We Collect

To receive a license key, you submit a Google Form with your **name and email address**. We use this information solely to email you your license key. After the key is sent, your name and email are not stored on our backend server — only the key itself is retained (with its creation date and revocation status) for authentication purposes.

We track **per-key request counts** on our backend for rate-limiting purposes. Your license key is an anonymous token; it is not linked to your name or email on our server.

### What We Don't Collect

YesBot **does not collect, transmit, or store** any of the following:

- Your AI prompts or conversations
- Your browsing history
- Your name or email address on our backend servers
- Your usage patterns or analytics beyond anonymous rate-limiting counts

### What Is Stored Locally

All extension functionality data is stored **locally on your device** using your browser's local storage. This includes:

- Your configuration preferences and theme settings
- Your license key (stored locally for authentication)

**Important:** Conversation content never leaves your device except for the anonymized scoring requests described below.

## How YesBot Works

### Scoring Requests

When you chat with a supported AI assistant, YesBot sends the user prompt and AI response text to the YesBot backend proxy for sycophancy scoring:

- **What is sent:** The text of the user message and AI response for the current exchange only, plus your license key in the request header for authentication
- **What is not sent:** Your browsing history, account credentials, or any prior conversation context
- **License key:** Your license key is used for authentication and rate-limit tracking. It is an anonymous token — your name and email are not stored on our server
- **Retention:** No conversation content is retained after scoring is complete

### Local Processing

All other extension functionality operates entirely within your browser:

- **Widget rendering:** The score display and tooltip are rendered locally
- **Settings:** All preferences are stored and applied locally

## Data You Control

### Delete Your Data

You can remove locally stored extension data at any time:

- Reset your license key and settings through the extension popup
- Uninstalling the extension removes all locally stored YesBot data

To revoke your license key (e.g., if you want to stop using YesBot), contact us with your key and we will revoke it.

## Third-Party Services

### OpenAI API

Scoring is performed by OpenAI's `gpt-4o-mini` model. When a response is scored, the user message and AI response text are sent to OpenAI's API. OpenAI's privacy policy and terms of service apply to data processed through their API.

### Google Forms

License key requests are collected via a Google Form. Google's privacy policy applies to data submitted through that form. We receive your name and email from form submissions for the sole purpose of emailing you a license key.

### No Other Third Parties

YesBot does not integrate with any analytics services, advertising networks, or other third-party data collection services.

## Permissions

YesBot requests only the permissions necessary for its functionality:

- **Storage:** To save your license key and preferences locally on your device
- **Host Permissions:** Access to ChatGPT, Claude, and Gemini to inject the scoring widget, and access to the YesBot proxy to submit scoring requests
- **Content Scripts:** Permission to run on supported AI chat websites to detect responses and display scores

These permissions are used solely for the stated functionality and not for data collection or tracking.

## Open Source Transparency

YesBot is open source, which means:

- Our code is publicly available for review
- Anyone can verify our privacy claims by examining the source code
- Community contributions are welcome
- Full transparency in how we handle data

You can view our source code at: [https://github.com/duke-trust-lab/YesBot](https://github.com/duke-trust-lab/YesBot)

## Children's Privacy

YesBot does not knowingly retain personal information from anyone, including children under the age of 13. Name and email submitted via our Google Form are used solely to deliver a license key and are not stored on our backend. We do not knowingly issue license keys to children under 13.

## Changes to This Privacy Policy

We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make changes:

- We will update the "Last Updated" date at the top of this policy
- Significant changes will be communicated through the extension or our GitHub repository
- Continued use of YesBot after changes constitutes acceptance of the updated policy

## Your Rights

Under various privacy laws, you have rights regarding your data. With YesBot:

- **Right to Access:** All locally stored data is accessible to you at any time through your browser
- **Right to Delete:** You can delete locally stored data through the extension settings; to revoke your license key from our server, contact us via GitHub
- **Right to Opt-Out:** You can disable the extension at any time

## Contact Us

If you have questions or concerns about this privacy policy or YesBot's privacy practices:

- **GitHub Issues:** Open an issue on our [GitHub repository](https://github.com/duke-trust-lab/YesBot/issues)
- **Email:** Contact the repository owner through GitHub

## Legal Compliance

YesBot is designed to comply with major privacy regulations including:

- General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA)
- Other applicable privacy laws

## Summary

**The Bottom Line:** YesBot is designed to give you complete privacy and control. We collect your name and email only to send you a license key — after that, your identity is not stored on our servers. Your license key is an anonymous token. Conversation content is never stored. We built YesBot this way because we believe privacy is a fundamental right, not a feature.
