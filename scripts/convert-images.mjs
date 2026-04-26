import sharp from 'sharp';
import { readdir, unlink, stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsDir = path.join(__dirname, '..', 'public', 'assets', 'projects');
const assetsDir = path.join(__dirname, '..', 'public', 'assets');

// Files to keep (used by the app)
const usedFiles = new Set([
  '3p-logo.png',
  'aarambha-logo.png',
  'pine.png',
  'email-1.png',
  'email-2.png',
  'email-3.png',
  'email-4.png',
  'tishy-1.png',
  'tishy-2.png',
  'polar-1.png',
  'polar-2.png',
  'kirana-1.png',
  'kirana-2.png',
  'kirana-3.png',
  'r4c-1.png',
  'r4c-2.png',
]);

// SVGs used in the app (from Social.tsx)
const usedAssetsRoot = new Set([
  'email.svg',
  'linkedin.svg',
  'github.svg',
  'twitter.svg',
]);

async function convertAndOptimize() {
  console.log('\n📸 Converting project images to WebP...\n');

  const files = await readdir(projectsDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const base = path.basename(file, ext);
    const inputPath = path.join(projectsDir, file);
    const outputPath = path.join(projectsDir, `${base}.webp`);

    if (!usedFiles.has(file)) {
      console.log(`🗑️  Deleting unused: ${file}`);
      await unlink(inputPath);
      continue;
    }

    if (ext === '.webp') {
      console.log(`✅ Already WebP: ${file}`);
      continue;
    }

    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      continue;
    }

    const statBefore = await stat(inputPath);
    const sizeBefore = (statBefore.size / 1024).toFixed(1);

    // Logo images: preserve quality, just convert
    const isLogo = file.includes('logo') || file.includes('pine') || file.includes('3p');
    
    try {
      await sharp(inputPath)
        .webp({
          quality: isLogo ? 90 : 80,
          effort: 6,
        })
        .toFile(outputPath);

      const statAfter = await stat(outputPath);
      const sizeAfter = (statAfter.size / 1024).toFixed(1);
      const saving = (((statBefore.size - statAfter.size) / statBefore.size) * 100).toFixed(0);
      
      console.log(`✅ ${file} → ${base}.webp | ${sizeBefore}KB → ${sizeAfter}KB (${saving}% smaller)`);
      
      // Delete original PNG after conversion
      await unlink(inputPath);
    } catch (err) {
      console.error(`❌ Failed to convert ${file}:`, err.message);
    }
  }

  console.log('\n🗑️  Checking for unused files in /assets root...\n');
  const assetRootFiles = await readdir(assetsDir);
  for (const file of assetRootFiles) {
    const filePath = path.join(assetsDir, file);
    const s = await stat(filePath);
    if (s.isDirectory()) continue;

    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      if (!usedAssetsRoot.has(file)) {
        const fileStat = await stat(filePath);
        console.log(`🗑️  Deleting unused asset: ${file} (${(fileStat.size / 1024).toFixed(0)}KB)`);
        await unlink(filePath);
      }
    }
  }

  console.log('\n✅ Image optimization complete!\n');
}

convertAndOptimize().catch(console.error);
