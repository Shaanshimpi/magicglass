import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import http from 'http';

interface ImgReport {
  page: string;
  src: string;
  naturalWidth?: number;
  naturalHeight?: number;
  naturalAspect?: string;
  isExternal?: boolean;
  existsLocal?: boolean;
  potentialIssue?: string;
}

const reports: ImgReport[] = [];

function fetchPageHtml(urlPath: string): Promise<string> {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function inspectImg(page: string, rawSrc: string) {
  // If Next.js image optimizer URL:
  let resolvedSrc = rawSrc;
  if (rawSrc.startsWith('/_next/image')) {
    const match = rawSrc.match(/[?&]url=([^&]+)/);
    if (match) {
      resolvedSrc = decodeURIComponent(match[1]);
    }
  }

  // Remove query params
  const cleanPath = resolvedSrc.split('?')[0];

  if (cleanPath.startsWith('http')) {
    reports.push({
      page,
      src: cleanPath,
      isExternal: true
    });
    return;
  }

  // Local file in public/
  const localFile = path.join('public', cleanPath.replace(/^\//, ''));
  if (fs.existsSync(localFile)) {
    try {
      const meta = await sharp(localFile).metadata();
      const w = meta.width || 0;
      const h = meta.height || 0;
      const aspect = (w / (h || 1)).toFixed(2);

      let issue = '';
      // If image is small (< 600px width) but appears in a banner or hero or large card
      if (w < 800 && (rawSrc.includes('w=1920') || rawSrc.includes('w=3840') || rawSrc.includes('w=1200') || rawSrc.includes('banner') || rawSrc.includes('hero'))) {
        issue = `LOW RES FOR HERO/BANNER: only ${w}x${h}px`;
      } else if (w < 400 && !cleanPath.includes('icon') && !cleanPath.includes('logo')) {
        issue = `VERY SMALL IMAGE: only ${w}x${h}px`;
      }

      reports.push({
        page,
        src: cleanPath,
        naturalWidth: w,
        naturalHeight: h,
        naturalAspect: aspect,
        existsLocal: true,
        potentialIssue: issue || undefined
      });
    } catch (e: any) {
      reports.push({
        page,
        src: cleanPath,
        existsLocal: true,
        potentialIssue: `Sharp error: ${e.message}`
      });
    }
  } else {
    reports.push({
      page,
      src: cleanPath,
      existsLocal: false,
      potentialIssue: '404 NOT FOUND locally'
    });
  }
}

async function audit() {
  const pages = [
    '/',
    '/about',
    '/infrastructure',
    '/industry-solution',
    '/products',
    '/projects',
    '/contact-us',
    '/color-options',
    '/toughened-glass',
    '/dashboard'
  ];

  console.log('Auditing images across all key pages on localhost:3000...\n');

  for (const p of pages) {
    const html = await fetchPageHtml(p);
    if (!html) {
      console.warn(`Could not fetch ${p}`);
      continue;
    }

    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
    for (const m of imgMatches) {
      await inspectImg(p, m[1]);
    }
  }

  console.log(`Audited total ${reports.length} image references.`);
  const issues = reports.filter(r => r.potentialIssue);
  console.log(`\nFound ${issues.length} potential issues:`);
  for (const iss of issues) {
    console.log(`[${iss.page}] ${iss.src} -> ${iss.potentialIssue}`);
  }

  // Also print all banners and hero images on each page
  console.log('\n--- Key Banner & Hero Images Found ---');
  for (const r of reports) {
    if (r.src.includes('hero') || r.src.includes('banner') || r.src.includes('infra') || r.src.includes('industry')) {
      console.log(`[${r.page}] ${r.src} (${r.naturalWidth}x${r.naturalHeight}, aspect ${r.naturalAspect})`);
    }
  }
}

audit();
