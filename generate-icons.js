const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const sizes = [192, 512];
  const input = 'arkham-horror-gamebook/public/elder-sign.svg';
  
  for (const size of sizes) {
    await sharp(input)
      .resize(size, size)
      .composite([{
        input: Buffer.from(`<svg><rect x="0" y="0" width="${size}" height="${size}" fill="#1a1814"/></svg>`),
        blend: 'dest-over'
      }])
      .toFile(`arkham-horror-gamebook/public/pwa-${size}x${size}.png`);
  }
  
  // Create apple-touch-icon
  await sharp(input)
    .resize(180, 180)
    .composite([{
      input: Buffer.from('<svg><rect x="0" y="0" width="180" height="180" fill="#1a1814"/></svg>'),
      blend: 'dest-over'
    }])
    .toFile('arkham-horror-gamebook/public/apple-touch-icon.png');
}

generateIcons().catch(console.error);
