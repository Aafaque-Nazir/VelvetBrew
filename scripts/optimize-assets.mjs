import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = './public';

async function optimizeImages() {
  try {
    const files = await readdir(PUBLIC_DIR);
    
    for (const file of files) {
      if (['.png', '.jpg', '.jpeg'].includes(extname(file).toLowerCase())) {
        const inputPath = join(PUBLIC_DIR, file);
        const fileStats = await stat(inputPath);
        
        // Only optimize if larger than 200KB
        if (fileStats.size > 200 * 1024) {
           const outputPath = join(PUBLIC_DIR, basename(file, extname(file)) + '.webp');
           console.log(`Optimizing ${file} (${(fileStats.size / 1024).toFixed(2)}KB) -> WebP...`);
           
           try {
               await sharp(inputPath)
                 .webp({ quality: 80 })
                 .toFile(outputPath);
               console.log(`Saved to ${outputPath}`);
           } catch (err) {
               console.error(`Failed to optimize ${file}:`, err.message);
           }
        }
      }
    }
    console.log("Optimization complete.");
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

optimizeImages();
