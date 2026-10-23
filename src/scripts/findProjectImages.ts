import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const results: any[] = [];

async function scan(dir: string) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (!full.includes('node_modules') && !full.includes('.git') && !full.includes('.next')) {
        await scan(full);
      }
    } else if (/\.(png|jpe?g|webp)$/i.test(item.name) && !item.name.match(/-\d+x\d+\./)) {
      const lower = item.name.toLowerCase();
      if (
        lower.includes('airport') ||
        lower.includes('ganga') ||
        lower.includes('balmoral') ||
        lower.includes('ark') ||
        lower.includes('verde') ||
        lower.includes('mall') ||
        lower.includes('solitaire') ||
        lower.includes('soliatre') ||
        lower.includes('nyati') ||
        lower.includes('eon') ||
        lower.includes('imperium') ||
        lower.includes('kushwal') ||
        lower.includes('keshav') ||
        lower.includes('project')
      ) {
        try {
          const meta = await sharp(full).metadata();
          results.push({
            name: item.name,
            path: full,
            width: meta.width,
            height: meta.height,
            size: fs.statSync(full).size
          });
        } catch(e){}
      }
    }
  }
}

async function run() {
  await scan('d:/Work/X13 Yoga/Projects/Magicglass/backup');
  await scan('d:/Work/X13 Yoga/Projects/Magicglass/magicglass-temp-site');
  await scan('d:/Work/X13 Yoga/Projects/Magicglass/new-site/Project/magic-glass/public');

  console.log(`Found ${results.length} matches:`);
  for (const r of results.sort((a,b) => (b.width || 0) - (a.width || 0))) {
    console.log(`${r.width}x${r.height} (${(r.size/1024).toFixed(0)}KB) : ${r.name} -> ${r.path}`);
  }
}

run();
