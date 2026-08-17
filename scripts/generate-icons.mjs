/**
 * Generate Android launcher icons and web icons from the STASH app-icon.png
 * 
 * Produces:
 * - Android mipmap icons (mdpi through xxxhdpi) for ic_launcher + ic_launcher_round + ic_launcher_foreground
 * - Web PWA icons (192x192, 512x512)
 * - Favicon (32x32, 16x16)
 */

import sharp from 'sharp';
import { mkdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE = join(ROOT, 'src', 'assets', 'app-icon.png');

const ANDROID_RES = join(ROOT, 'android', 'app', 'src', 'main', 'res');

// Android mipmap sizes (dp * density)
const MIPMAP_SIZES = {
  'mipmap-mdpi':    48,
  'mipmap-hdpi':    72,
  'mipmap-xhdpi':   96,
  'mipmap-xxhdpi':  144,
  'mipmap-xxxhdpi': 192,
};

// Foreground icons are 108dp at each density (adaptive icon spec)
const FOREGROUND_SIZES = {
  'mipmap-mdpi':    108,
  'mipmap-hdpi':    162,
  'mipmap-xhdpi':   216,
  'mipmap-xxhdpi':  324,
  'mipmap-xxxhdpi': 432,
};

async function generateAndroidIcons() {
  console.log('📱 Generating Android launcher icons...');
  
  for (const [folder, size] of Object.entries(MIPMAP_SIZES)) {
    const dir = join(ANDROID_RES, folder);
    mkdirSync(dir, { recursive: true });

    // ic_launcher.png — square with slight rounding
    await sharp(SOURCE)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(join(dir, 'ic_launcher.png'));

    // ic_launcher_round.png — circular mask
    const roundMask = Buffer.from(
      `<svg width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white"/></svg>`
    );
    await sharp(SOURCE)
      .resize(size, size, { fit: 'cover' })
      .composite([{ input: roundMask, blend: 'dest-in' }])
      .png()
      .toFile(join(dir, 'ic_launcher_round.png'));

    console.log(`  ✅ ${folder}: ${size}x${size}`);
  }
  
  // Foreground icons for adaptive icon
  for (const [folder, size] of Object.entries(FOREGROUND_SIZES)) {
    const dir = join(ANDROID_RES, folder);
    mkdirSync(dir, { recursive: true });

    // The foreground needs padding — the icon should occupy the inner 66% (72dp of 108dp)
    const iconSize = Math.round(size * 0.66);
    const padding = Math.round((size - iconSize) / 2);

    await sharp(SOURCE)
      .resize(iconSize, iconSize, { fit: 'cover' })
      .extend({
        top: padding,
        bottom: size - iconSize - padding,
        left: padding,
        right: size - iconSize - padding,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(join(dir, 'ic_launcher_foreground.png'));

    console.log(`  ✅ ${folder} foreground: ${size}x${size}`);
  }
}

async function generateWebIcons() {
  console.log('🌐 Generating web/PWA icons...');
  
  const publicDir = join(ROOT, 'public');
  mkdirSync(publicDir, { recursive: true });

  // PWA icons
  await sharp(SOURCE)
    .resize(192, 192, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'icon-192.png'));

  await sharp(SOURCE)
    .resize(512, 512, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'icon-512.png'));

  // Favicon
  await sharp(SOURCE)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'favicon-32.png'));

  // Apple touch icon (180x180)
  await sharp(SOURCE)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));

  console.log('  ✅ icon-192.png, icon-512.png, favicon-32.png, apple-touch-icon.png');
}

async function main() {
  console.log('🎒 STASH Icon Generator\n');
  await generateAndroidIcons();
  await generateWebIcons();
  console.log('\n✨ All icons generated successfully!');
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
