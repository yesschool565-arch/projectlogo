const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
const indexContent = fs.readFileSync(indexFile, 'utf8');

// Extract Header (Everything up to the end of <nav>)
const navEndTag = '</nav>';
const navEndIndex = indexContent.indexOf(navEndTag) + navEndTag.length;
const headerContent = indexContent.slice(0, navEndIndex);

// Extract Footer (Everything from <!-- Footer --> to the end)
const footerStartTag = '<!-- Footer -->';
const footerStartIndex = indexContent.indexOf(footerStartTag);
const footerContent = indexContent.slice(footerStartIndex);

const pages = [
  { folder: '', file: 'careers.html', title: 'Careers - OmnitraTech', displayTitle: 'Join Our Team' },
  { folder: 'solutions', file: 'ai-ml-services.html', title: 'AI & ML Services', displayTitle: 'AI & ML Services' },
  { folder: 'solutions', file: 'cloud-cognitive.html', title: 'Cloud & Cognitive Business Operations', displayTitle: 'Cloud & Cognitive Operations' },
  { folder: 'solutions', file: 'mechanical-industrial.html', title: 'Mechanical & Industrial Solutions', displayTitle: 'Mechanical & Industrial' },
  { folder: 'solutions', file: 'pipeline-design.html', title: 'Pipeline Design & Installation', displayTitle: 'Pipeline Design & Installation' },
  { folder: 'solutions', file: 'enterprise-solutions.html', title: 'Enterprise Solutions', displayTitle: 'Enterprise Solutions' },
  { folder: 'solutions', file: 'cybersecurity.html', title: 'Cybersecurity Solutions', displayTitle: 'Cybersecurity Solutions' },
  { folder: 'industries', file: 'manufacturing.html', title: 'Manufacturing Industry', displayTitle: 'Manufacturing' },
  { folder: 'industries', file: 'healthcare.html', title: 'Healthcare Industry', displayTitle: 'Healthcare' },
  { folder: 'industries', file: 'retail-ecommerce.html', title: 'Retail & E-commerce', displayTitle: 'Retail & E-commerce' },
  { folder: 'industries', file: 'financial-services.html', title: 'Financial Services', displayTitle: 'Financial Services' },
  { folder: 'industries', file: 'energy-utilities.html', title: 'Energy & Utilities', displayTitle: 'Energy & Utilities' },
  { folder: 'industries', file: 'logistics-supply-chain.html', title: 'Logistics & Supply Chain', displayTitle: 'Logistics & Supply Chain' },
  { folder: 'industries', file: 'oil-gas.html', title: 'Oil & Gas', displayTitle: 'Oil & Gas' },
  { folder: 'industries', file: 'infrastructure-construction.html', title: 'Infrastructure & Construction', displayTitle: 'Infrastructure & Construction' },
];

pages.forEach(page => {
  const isNested = page.folder !== '';
  const prefix = isNested ? '../' : '';
  
  // Fix paths in header (CSS, images, links)
  let fixedHeader = headerContent.replace(/src="public\//g, `src="${prefix}public/`);
  fixedHeader = fixedHeader.replace(/href="#/g, `href="${prefix}index.html#`);
  
  // Fix logic to replace titles
  fixedHeader = fixedHeader.replace(/<title>.*<\/title>/, `<title>${page.title} - OmnitraTech</title>`);
  
  // Create Main Body Content
  const bodyContent = `
    <!-- Inner Page Header -->
    <section class="py-32 bg-slate-50 relative border-b border-slate-200">
        <div class="absolute inset-0 bg-gradient-to-br from-brand-100/50 to-transparent"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 drop-shadow-sm">${page.displayTitle}</h1>
            <p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Discover how OmnitraTech's tailored approach drives success for exactly your operational and strategic needs.
            </p>
        </div>
    </section>
    
    <!-- Empty State Content Box -->
    <section class="py-24 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <div class="bg-brand-50 border border-brand-100 rounded-2xl p-16 shadow-inner">
                 <i data-lucide="wrench" class="w-12 h-12 text-brand-500 mx-auto mb-6"></i>
                 <h2 class="text-2xl font-bold text-slate-800 mb-4">Content Under Construction</h2>
                 <p class="text-slate-600 text-lg">We're finalizing the details for this specific offering/industry. Please contact us directly for deep-dive resources or consultation regarding ${page.displayTitle}.</p>
                 <a href="${prefix}index.html#contact" class="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700">Contact Us Now</a>
             </div>
        </div>
    </section>
  `;
  
  const fixedFooter = footerContent.replace(/href="#/g, `href="${prefix}index.html#`);
  
  const finalHTML = fixedHeader + '\\n' + bodyContent + '\\n' + fixedFooter;
  
  const targetDir = path.join(__dirname, page.folder);
  if (page.folder !== '' && !fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(targetDir, page.file), finalHTML, 'utf8');
  console.log(`Generated HTML file: ${path.join(page.folder, page.file)}`);
});
