/**
 * fix-pages.cjs
 * Batch fixes all sub-pages:
 *  1. Replaces old hexagon-icon footer logo with real logo img tag
 *  2. Replaces broken Lucide brand icons (linkedin, twitter, facebook) with inline SVGs
 */

const fs = require('fs');
const path = require('path');

const BASE = __dirname;

// Gather all HTML files in solutions/, industries/, and careers.html
const files = [];
for (const dir of ['solutions', 'industries']) {
  const fullDir = path.join(BASE, dir);
  if (fs.existsSync(fullDir)) {
    fs.readdirSync(fullDir)
      .filter(f => f.endsWith('.html'))
      .forEach(f => files.push(path.join(fullDir, f)));
  }
}
const careers = path.join(BASE, 'careers.html');
if (fs.existsSync(careers)) files.push(careers);

// Helper: is this in a sub-directory?
function isSubPage(filePath) {
  return path.dirname(filePath) !== BASE;
}

// Logo block to replace (in sub-pages: ../ prefix)
const OLD_LOGO_PATTERN = /<div class="flex items-center gap-2 mb-6">\s*<div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">\s*<i data-lucide="hexagon" class="w-5 h-5 text-white"><\/i>\s*<\/div>\s*<span class="font-bold text-xl text-white tracking-tight">OMNITRA<\/span>\s*<\/div>/g;

function newLogoBlock(isRoot) {
  const logoSrc = isRoot ? 'public/logo.png' : '../public/logo.png';
  return `<div class="flex items-center gap-3 mb-6">
                        <img src="${logoSrc}" alt="OmnitraTech Logo" class="h-10 w-auto"
                            onerror="this.outerHTML='<div class=\\'w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center\\'><i data-lucide=\\'hexagon\\' class=\\'text-white\\'></i></div>'">
                        <div class="flex flex-col justify-center">
                            <span class="font-bold text-xl leading-none text-white tracking-tight">OMNITRA</span>
                            <span class="text-[10px] font-semibold text-brand-400 tracking-widest uppercase mt-0.5">Tech Services</span>
                        </div>
                    </div>`;
}

// Social icons block to replace
const OLD_SOCIAL_PATTERN = /<div class="flex gap-4">\s*<a href="#" class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all"><i\s*data-lucide="linkedin" class="w-4 h-4"><\/i><\/a>\s*<a href="#" class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all"><i\s*data-lucide="twitter" class="w-4 h-4"><\/i><\/a>\s*<a href="#" class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all"><i\s*data-lucide="facebook" class="w-4 h-4"><\/i><\/a>\s*<\/div>/g;

const NEW_SOCIAL_BLOCK = `<div class="flex gap-4">
                        <!-- LinkedIn -->
                        <a href="#" aria-label="LinkedIn"
                            class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1S4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.84v2.13h.05c.53-1 1.84-2.13 3.78-2.13 4.04 0 4.79 2.66 4.79 6.11V24h-4v-8.36c0-1.99-.04-4.55-2.77-4.55-2.77 0-3.2 2.17-3.2 4.41V24h-4V8.5z"/>
                            </svg>
                        </a>
                        <!-- X / Twitter -->
                        <a href="#" aria-label="X (Twitter)"
                            class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <!-- Facebook -->
                        <a href="#" aria-label="Facebook"
                            class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                            </svg>
                        </a>
                    </div>`;

let fixedCount = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  const root = !isSubPage(file);

  content = content.replace(OLD_LOGO_PATTERN, newLogoBlock(root));
  content = content.replace(OLD_SOCIAL_PATTERN, NEW_SOCIAL_BLOCK);

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Fixed: ${path.relative(BASE, file)}`);
    fixedCount++;
  } else {
    console.log(`⏭️  No changes: ${path.relative(BASE, file)}`);
  }
}

console.log(`\nDone! Fixed ${fixedCount} / ${files.length} files.`);
