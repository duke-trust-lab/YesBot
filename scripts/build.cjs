#!/usr/bin/env node
/**
 * Yesbot Build Script
 *
 * Copies extension files and creates a distributable ZIP.
 * No secrets are injected — auth is handled via user license keys at runtime.
 *
 * Usage:
 *   node scripts/build.cjs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const EXTENSION_FILES = [
  'manifest.json',
  'content.js',
  'aiClient.js',
  'energyConfig.js',
  'popup.html',
  'popup.js',
  'styles.css',
  'icons'
];

function log(message) {
  console.log(`[Yesbot Build] ${message}`);
}

function cleanDist() {
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });
  log('Cleaned dist directory');
}

function copyFile(src) {
  const srcPath = path.join(ROOT_DIR, src);
  const destPath = path.join(DIST_DIR, src);

  if (!fs.existsSync(srcPath)) {
    log(`Skipping ${src} (not found)`);
    return;
  }

  const stat = fs.statSync(srcPath);
  if (stat.isDirectory()) {
    fs.cpSync(srcPath, destPath, { recursive: true });
  } else {
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(srcPath, destPath);
  }
  log(`Copied ${src}`);
}

function createZip() {
  const zipName = 'yesbot.zip';
  const zipPath = path.join(DIST_DIR, zipName);

  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

  try {
    const filesToZip = EXTENSION_FILES.filter(f => fs.existsSync(path.join(DIST_DIR, f))).join(' ');
    execSync(`cd "${DIST_DIR}" && zip -r "${zipName}" ${filesToZip}`, { stdio: 'inherit' });
    log(`Created ${zipName}`);
    return zipPath;
  } catch {
    log('zip command not available, skipping ZIP creation');
    return null;
  }
}

function main() {
  log('Starting Yesbot build...');

  cleanDist();

  log('Copying extension files...');
  for (const file of EXTENSION_FILES) copyFile(file);

  log('Creating distribution ZIP...');
  const zipPath = createZip();

  log('');
  log('Build complete!');
  log(`Output directory: ${DIST_DIR}`);
  if (zipPath) log(`ZIP package: ${zipPath}`);
  log('');
  log('To test locally:');
  log('  1. Go to chrome://extensions/');
  log('  2. Enable Developer mode');
  log('  3. Click "Load unpacked"');
  log(`  4. Select: ${DIST_DIR}`);
}

main();
