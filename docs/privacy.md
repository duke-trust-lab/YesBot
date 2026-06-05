# Privacy Policy for YesBot

**Last Updated:** November 23, 2024

## Overview

YesBot is a Chrome extension that provides real-time sycophancy scoring for AI assistant responses. This privacy policy explains our commitment to protecting your privacy and describes how YesBot handles data.

## Our Privacy-First Approach

YesBot was built from the ground up with privacy as a core principle. We believe that you should be able to evaluate AI responses without sacrificing your privacy or sharing your conversations with third parties.

## Data Collection and Storage

### What We Don't Collect

YesBot **does not collect, transmit, or store** any of the following:

- Your AI prompts or conversations
- Your browsing history
- Your personal information
- Your usage patterns or analytics
- Any data on external servers

### What Is Stored Locally

All data related to your usage of YesBot is stored **locally on your device** using your browser's local storage. This includes:

- Your configuration preferences and theme settings
- Your license key (stored locally for authentication only)

**Important:** This data never leaves your device except for the anonymized scoring requests described below.

## How YesBot Works

### Scoring Requests

When you chat with a supported AI assistant, YesBot sends the user prompt and AI response text to the YesBot backend proxy for sycophancy scoring:

- **What is sent:** The text of the user message and AI response for the current exchange only
- **What is not sent:** Your identity, browsing history, account information, or any prior conversation context
- **License key:** Your license key is included in the request header solely for authentication — it is not stored or logged alongside conversation content
- **Retention:** No conversation content is retained after scoring is complete

### Local Processing

All other extension functionality operates entirely within your browser:

- **Widget rendering:** The score display and tooltip are rendered locally
- **Settings:** All preferences are stored and applied locally

## Data You Control

### Delete Your Data

You have complete control over your locally stored data:

- Reset your license key and settings at any time through the extension popup
- Uninstalling the extension removes all locally stored YesBot data

## Third-Party Services

### YesBot Scoring Proxy

YesBot routes scoring requests through a backend proxy hosted on Railway (yesbot.up.railway.app). This proxy:

- Authenticates your license key
- Forwards the scoring request to OpenAI's API
- Returns the score and explanation
- Does not log or retain conversation content

### OpenAI API

Scoring is performed by OpenAI's `gpt-4o-mini` model. When a response is scored, the user message and AI response text are sent to OpenAI's API. OpenAI's privacy policy and terms of service apply to data processed through their API.

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

YesBot does not knowingly collect any information from anyone, including children under the age of 13. Since we do not collect personal data, YesBot can be used by anyone while maintaining their privacy.

## Changes to This Privacy Policy

We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make changes:

- We will update the "Last Updated" date at the top of this policy
- Significant changes will be communicated through the extension or our GitHub repository
- Continued use of YesBot after changes constitutes acceptance of the updated policy

## Your Rights

Under various privacy laws, you have rights regarding your data. With YesBot:

- **Right to Access:** All locally stored data is accessible to you at any time
- **Right to Delete:** You can delete your data at any time through the extension settings
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

**The Bottom Line:** YesBot is designed to give you complete privacy and control. Your locally stored data stays on your device. Scoring requests transmit only the current message exchange and are not retained. We built YesBot this way because we believe privacy is a fundamental right, not a feature.
