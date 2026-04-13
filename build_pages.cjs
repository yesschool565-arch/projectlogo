const fs = require('fs');
const path = require('path');

// ─── Shared template parts ───────────────────────────────────────────────────

function getHead(title, prefix = '') {
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - OmnitraTech</title>
    <meta name="description" content="${title} solutions from OmnitraTech - advanced technology and engineering expertise.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"><\/script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'] },
                    colors: {
                        brand: {
                            50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd',
                            300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9',
                            600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e'
                        }
                    }
                }
            }
        }
    <\/script>
    <style>
        .glass-nav { background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); }
        .clip-diagonal { clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%); }
    </style>
</head>
<body class="font-sans antialiased text-slate-800 bg-white selection:bg-brand-500 selection:text-white">`;
}

function getNav(prefix = '') {
  const p = prefix;
  return `
    <!-- Navigation -->
    <nav class="fixed w-full z-50 glass-nav border-b border-gray-100 transition-all duration-300 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-20 items-center">
                <a href="${p}index.html" class="flex-shrink-0 flex items-center gap-3">
                    <img src="${p}public/logo.png" alt="OmnitraTech Logo" class="h-10 w-auto"
                        onerror="this.outerHTML='<div class=\\'w-10 h-10 rounded-full bg-brand-50 border-2 border-brand-500 flex items-center justify-center\\'><i data-lucide=\\'hexagon\\' class=\\'text-brand-600\\'></i></div>'">
                    <div class="flex flex-col justify-center">
                        <span class="font-bold text-xl leading-none text-slate-900 tracking-tight">OMNITRA</span>
                        <span class="text-[10px] font-semibold text-brand-600 tracking-widest uppercase mt-0.5">Tech Services</span>
                    </div>
                </a>
                <div class="hidden md:flex space-x-8 items-center">
                    <a href="${p}index.html" class="text-slate-600 font-medium hover:text-brand-500 transition-colors">Home</a>
                    <a href="${p}index.html#about" class="text-slate-600 font-medium hover:text-brand-500 transition-colors">About Us</a>
                    <a href="${p}index.html#services" class="text-slate-600 font-medium hover:text-brand-500 transition-colors">Services</a>
                    <a href="${p}index.html#industries" class="text-slate-600 font-medium hover:text-brand-500 transition-colors">Industries</a>
                    <a href="${p}careers.html" class="text-slate-600 font-medium hover:text-brand-500 transition-colors">Careers</a>
                    <a href="${p}index.html#contact" class="bg-brand-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-brand-700 transition shadow-md">Contact</a>
                </div>
                <!-- Mobile hamburger -->
                <button id="mobileMenuBtn" class="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div id="mobileMenu" class="hidden md:hidden bg-white border-t border-slate-100 shadow-lg">
            <div class="px-4 py-4 space-y-3">
                <a href="${p}index.html" class="block text-slate-600 font-medium py-2 hover:text-brand-500">Home</a>
                <a href="${p}index.html#about" class="block text-slate-600 font-medium py-2 hover:text-brand-500">About Us</a>
                <a href="${p}index.html#services" class="block text-slate-600 font-medium py-2 hover:text-brand-500">Services</a>
                <a href="${p}index.html#industries" class="block text-slate-600 font-medium py-2 hover:text-brand-500">Industries</a>
                <a href="${p}careers.html" class="block text-slate-600 font-medium py-2 hover:text-brand-500">Careers</a>
                <a href="${p}index.html#contact" class="block w-full text-center bg-brand-600 text-white px-5 py-2.5 rounded-lg font-medium">Contact</a>
            </div>
        </div>
    </nav>`;
}

function getFooter(prefix = '') {
  const p = prefix;
  return `
    <!-- Footer -->
    <footer class="bg-slate-950 pt-16 pb-8 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div class="col-span-1">
                    <div class="flex items-center gap-2 mb-6">
                        <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                            <i data-lucide="hexagon" class="w-5 h-5 text-white"></i>
                        </div>
                        <span class="font-bold text-xl text-white tracking-tight">OMNITRA</span>
                    </div>
                    <p class="text-slate-400 text-sm leading-relaxed mb-6">OmnitraTech delivers advanced technology and engineering solutions across AI/ML, Cloud Infrastructure, Mechanical Systems, and Pipeline Engineering.</p>
                    <div class="flex gap-4">
                        <a href="#" class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all"><i data-lucide="linkedin" class="w-4 h-4"></i></a>
                        <a href="#" class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all"><i data-lucide="twitter" class="w-4 h-4"></i></a>
                        <a href="#" class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all"><i data-lucide="facebook" class="w-4 h-4"></i></a>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold text-white mb-6">Quick Links</h4>
                    <ul class="space-y-3 text-sm text-slate-400">
                        <li><a href="${p}index.html" class="hover:text-brand-400 transition">Home</a></li>
                        <li><a href="${p}index.html#about" class="hover:text-brand-400 transition">About Us</a></li>
                        <li><a href="${p}index.html#industries" class="hover:text-brand-400 transition">Industries</a></li>
                        <li><a href="${p}index.html#contact" class="hover:text-brand-400 transition">Contact</a></li>
                        <li><a href="${p}careers.html" class="hover:text-brand-400 transition">Careers</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-white mb-6">Services</h4>
                    <ul class="space-y-3 text-sm text-slate-400">
                        <li><a href="${p}solutions/ai-ml-services.html" class="hover:text-brand-400 transition">AI &amp; ML Services</a></li>
                        <li><a href="${p}solutions/cloud-cognitive.html" class="hover:text-brand-400 transition">Cloud Operations</a></li>
                        <li><a href="${p}solutions/mechanical-industrial.html" class="hover:text-brand-400 transition">Mechanical &amp; Industrial</a></li>
                        <li><a href="${p}solutions/pipeline-design.html" class="hover:text-brand-400 transition">Pipeline Design</a></li>
                        <li><a href="${p}solutions/cybersecurity.html" class="hover:text-brand-400 transition">Cybersecurity</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-white mb-6">Industries</h4>
                    <ul class="space-y-3 text-sm text-slate-400">
                        <li><a href="${p}industries/manufacturing.html" class="hover:text-brand-400 transition">Manufacturing</a></li>
                        <li><a href="${p}industries/healthcare.html" class="hover:text-brand-400 transition">Healthcare</a></li>
                        <li><a href="${p}industries/oil-gas.html" class="hover:text-brand-400 transition">Oil &amp; Gas</a></li>
                        <li><a href="${p}industries/energy-utilities.html" class="hover:text-brand-400 transition">Energy &amp; Utilities</a></li>
                        <li><a href="${p}industries/financial-services.html" class="hover:text-brand-400 transition">Financial Services</a></li>
                    </ul>
                </div>
            </div>
            <div class="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-slate-500 text-sm">&copy; 2026 OmnitraTech. All rights reserved.</p>
                <div class="flex gap-6 text-sm text-slate-500">
                    <a href="#" class="hover:text-white transition">Privacy Policy</a>
                    <a href="#" class="hover:text-white transition">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
    <script>
        lucide.createIcons();
        window.addEventListener('scroll', () => {
            document.querySelector('nav').classList.toggle('shadow-md', window.scrollY > 20);
        });
        document.getElementById('mobileMenuBtn').addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.toggle('hidden');
        });
    <\/script>
</body>
</html>`;
}

// ─── Hero Banner helper ───────────────────────────────────────────────────────
function hero(icon, label, title, desc, bgClass = 'bg-brand-900') {
  return `
    <section class="pt-32 pb-20 ${bgClass} text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="max-w-3xl">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
                    <i data-lucide="${icon}" class="w-4 h-4"></i> ${label}
                </div>
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">${title}</h1>
                <p class="text-xl text-white/80 leading-relaxed mb-10">${desc}</p>
                <div class="flex flex-wrap gap-4">
                    <a href="../index.html#contact" class="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-900 font-semibold rounded-lg hover:bg-slate-100 transition shadow-lg">
                        Get a Consultation <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </a>
                    <a href="../index.html#services" class="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition">
                        View All Services
                    </a>
                </div>
            </div>
        </div>
    </section>`;
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
function statsBar(stats) {
  const items = stats.map(s => `
        <div class="text-center">
            <div class="text-3xl font-bold text-brand-600 mb-1">${s.value}</div>
            <div class="text-sm text-slate-500 font-medium">${s.label}</div>
        </div>`).join('');
  return `
    <section class="py-12 bg-white border-b border-slate-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">${items}
            </div>
        </div>
    </section>`;
}

// ─── Feature cards ────────────────────────────────────────────────────────────
function featureGrid(title, subtitle, features) {
  const cards = features.map(f => `
                <div class="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-200 hover:-translate-y-1 transition-all duration-300 group">
                    <div class="h-12 w-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-5 group-hover:bg-brand-600 group-hover:text-white transition-all">
                        <i data-lucide="${f.icon}" class="w-6 h-6"></i>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 mb-3">${f.title}</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">${f.desc}</p>
                </div>`).join('');
  return `
    <section class="py-20 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-14">
                <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">${title}</h2>
                <p class="text-lg text-slate-600">${subtitle}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">${cards}
            </div>
        </div>
    </section>`;
}

// ─── Two-column highlight ─────────────────────────────────────────────────────
function highlight(tag, title, body, bullets, icon, reverse = false) {
  const textSide = `
            <div class="flex flex-col justify-center ${reverse ? 'lg:order-1' : ''}">
                <span class="text-brand-600 font-bold uppercase tracking-widest text-sm mb-3">${tag}</span>
                <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-5 leading-tight">${title}</h2>
                <p class="text-slate-600 leading-relaxed mb-8">${body}</p>
                <ul class="space-y-3">
                    ${bullets.map(b => `<li class="flex items-start gap-3"><i data-lucide="check-circle" class="w-5 h-5 text-brand-500 mt-0.5 shrink-0"></i><span class="text-slate-700 font-medium">${b}</span></li>`).join('')}
                </ul>
            </div>`;
  const imgSide = `
            <div class="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center min-h-[320px] ${reverse ? 'lg:order-2' : ''}">
                <i data-lucide="${icon}" class="w-32 h-32 text-white/20"></i>
            </div>`;
  return `
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                ${reverse ? imgSide + textSide : textSide + imgSide}
            </div>
        </div>
    </section>`;
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function ctaBanner(title, subtitle, btn, prefix) {
  return `
    <section class="py-20 bg-brand-900 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-5">${title}</h2>
            <p class="text-xl text-white/80 mb-10">${subtitle}</p>
            <a href="${prefix}index.html#contact" class="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-900 font-bold rounded-xl shadow-xl hover:bg-slate-100 transition text-lg">
                ${btn} <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </a>
        </div>
    </section>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

const prefixRoot = '';            // careers.html lives at root
const prefixSub  = '../';         // solutions/ and industries/ are one level deep

// ─── CAREERS ─────────────────────────────────────────────────────────────────
function buildCareers() {
  const p = prefixRoot;
  return getHead('Careers') + getNav(p) + `
    <!-- Hero -->
    <section class="pt-32 pb-20 bg-brand-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
                <i data-lucide="users" class="w-4 h-4"></i> Join Our Team
            </div>
            <h1 class="text-5xl md:text-6xl font-bold mb-6">Build the Future with Us</h1>
            <p class="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">OmnitraTech is a team of passionate engineers, data scientists, and consultants united by one mission — delivering transformative technology solutions across industries.</p>
        </div>
    </section>

    <!-- Values -->
    <section class="py-20 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-14">
                <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why OmnitraTech?</h2>
                <p class="text-lg text-slate-600">We invest in our people because they're our greatest asset.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${[
                  {icon:'rocket',title:'Cutting-Edge Projects',desc:'Work on AI, cloud, pipeline engineering, and cybersecurity solutions for global enterprise clients.'},
                  {icon:'graduation-cap',title:'Learning & Growth',desc:'Access mentorship, certifications, conferences, and a dedicated annual learning budget.'},
                  {icon:'globe',title:'Global Impact',desc:'Your work will directly impact operations across manufacturing, healthcare, energy, and more.'},
                  {icon:'users',title:'Collaborative Culture',desc:'Flat hierarchy, open communication, and a team that celebrates wins together.'},
                  {icon:'heart',title:'Well-being First',desc:'Flexible hours, remote-friendly, health benefits, and generous paid time off policies.'},
                  {icon:'trending-up',title:'Competitive Compensation',desc:'Market-leading salaries, performance bonuses, and equity options for senior roles.'}
                ].map(f => `
                <div class="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div class="h-12 w-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-5 group-hover:bg-brand-600 group-hover:text-white transition-all">
                        <i data-lucide="${f.icon}" class="w-6 h-6"></i>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 mb-3">${f.title}</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">${f.desc}</p>
                </div>`).join('')}
            </div>
        </div>
    </section>

    <!-- Open Positions -->
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-14">
                <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Open Positions</h2>
                <p class="text-lg text-slate-600">Find the role that matches your expertise and ambition.</p>
            </div>
            <div class="space-y-5">
                ${[
                  {title:'Senior AI/ML Engineer',dept:'AI & Machine Learning',loc:'Pune / Remote',type:'Full-time'},
                  {title:'Cloud Infrastructure Architect',dept:'Cloud Operations',loc:'Pune / Remote',type:'Full-time'},
                  {title:'Pipeline Design Engineer',dept:'Mechanical Engineering',loc:'Amravati / On-site',type:'Full-time'},
                  {title:'Cybersecurity Analyst',dept:'Security Operations',loc:'Remote',type:'Full-time'},
                  {title:'Full Stack Developer',dept:'Digital Products',loc:'Pune / Remote',type:'Full-time'},
                  {title:'Business Development Manager',dept:'Sales & Partnerships',loc:'Pune',type:'Full-time'},
                ].map(j => `
                <div class="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all group">
                    <div class="mb-4 md:mb-0">
                        <h3 class="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition">${j.title}</h3>
                        <div class="flex flex-wrap gap-3 mt-2">
                            <span class="text-sm text-slate-500 flex items-center gap-1"><i data-lucide="briefcase" class="w-3.5 h-3.5"></i> ${j.dept}</span>
                            <span class="text-sm text-slate-500 flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${j.loc}</span>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-700">${j.type}</span>
                        </div>
                    </div>
                    <a href="index.html#contact" class="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition shrink-0">
                        Apply Now <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </a>
                </div>`).join('')}
            </div>
            <div class="mt-10 text-center">
                <p class="text-slate-600 mb-4">Don't see the right role? We're always open to talented people.</p>
                <a href="index.html#contact" class="inline-flex items-center gap-2 px-7 py-3 border-2 border-brand-600 text-brand-600 font-semibold rounded-lg hover:bg-brand-50 transition">
                    Send Us Your CV <i data-lucide="send" class="w-4 h-4"></i>
                </a>
            </div>
        </div>
    </section>
    ${ctaBanner('Ready to Make an Impact?', 'Join a team that is redefining what technology and engineering can achieve across industries.', 'Get in Touch', p)}
  ` + getFooter(p);
}

// ─── SOLUTION PAGE BUILDER ────────────────────────────────────────────────────
function buildSolution(config) {
  const p = prefixSub;
  return getHead(config.title) + getNav(p) +
    hero(config.icon, 'Our Solutions', config.title, config.heroDesc, 'bg-brand-900') +
    statsBar(config.stats) +
    featureGrid(config.featuresTitle, config.featuresSub, config.features) +
    highlight(config.highlightTag, config.highlightTitle, config.highlightBody, config.highlightBullets, config.highlightIcon) +
    ctaBanner(`Ready to Transform with ${config.title}?`, 'Our experts are ready to design a tailored solution for your enterprise.', 'Start a Conversation', p) +
    getFooter(p);
}

// ─── INDUSTRY PAGE BUILDER ────────────────────────────────────────────────────
function buildIndustry(config) {
  const p = prefixSub;
  return getHead(config.title) + getNav(p) +
    hero(config.icon, 'Industries We Serve', config.title, config.heroDesc, 'bg-slate-800') +
    statsBar(config.stats) +
    featureGrid(config.featuresTitle, config.featuresSub, config.features) +
    highlight(config.highlightTag, config.highlightTitle, config.highlightBody, config.highlightBullets, config.highlightIcon) +
    ctaBanner(`Partner with OmnitraTech for ${config.title}`, 'Let us help you overcome industry-specific challenges with targeted technology and engineering solutions.', 'Talk to an Expert', p) +
    getFooter(p);
}

// ─────────────────────────────────────────────────────────────────────────────
// SOLUTION CONFIGS
// ─────────────────────────────────────────────────────────────────────────────

const solutions = [
  {
    file: 'solutions/ai-ml-services.html',
    title: 'AI & ML Services',
    icon: 'brain-circuit',
    heroDesc: 'Accelerate your enterprise with cutting-edge GenAI, Agentic AI, and machine learning solutions engineered for real-world business impact.',
    stats: [{value:'200+',label:'AI Projects Delivered'},{value:'95%',label:'Model Accuracy Rate'},{value:'40%',label:'Avg. Efficiency Gain'},{value:'50+',label:'Enterprise Clients'}],
    featuresTitle: 'Comprehensive AI & ML Capabilities',
    featuresSub: 'End-to-end artificial intelligence and machine learning services tailored to your industry and data environment.',
    features: [
      {icon:'brain',title:'Generative AI',desc:'Custom LLM deployment, fine-tuning, and RAG architectures for enterprise knowledge systems and copilots.'},
      {icon:'bot',title:'Agentic AI Systems',desc:'Multi-agent frameworks that autonomously execute complex workflows, integrate APIs, and drive decisions.'},
      {icon:'bar-chart-2',title:'Predictive Analytics',desc:'ML models that forecast demand, detect anomalies, and surface actionable insights from your data.'},
      {icon:'eye',title:'Computer Vision',desc:'Object detection, quality inspection, and visual analytics solutions deployed at the edge or cloud.'},
      {icon:'message-square',title:'NLP & Conversational AI',desc:'Intelligent chatbots, document intelligence, and sentiment analysis powered by state-of-the-art language models.'},
      {icon:'database',title:'MLOps & Data Engineering',desc:'Robust pipelines for data ingestion, feature engineering, model training, deployment, and monitoring.'},
    ],
    highlightTag: 'Our Approach',
    highlightTitle: 'From Data to Deployed Intelligence',
    highlightBody: 'We follow a rigorous, iterative approach — from business problem definition and data audit to model development, testing, and production-grade deployment. Every AI solution we build is interpretable, scalable, and aligned with your business KPIs.',
    highlightBullets: ['Enterprise-grade security and data governance','Cloud-agnostic deployment (AWS, Azure, GCP)','Continuous model monitoring and retraining','Integration with your existing ERP and CRM systems'],
    highlightIcon: 'brain-circuit',
  },
  {
    file: 'solutions/cloud-cognitive.html',
    title: 'Cloud & Cognitive Business Operations',
    icon: 'cloud-cog',
    heroDesc: 'Modernize your operations with intelligent cloud architectures that unlock agility, reduce costs, and drive data-driven decision-making at scale.',
    stats: [{value:'99.9%',label:'Uptime SLA'},{value:'35%',label:'Avg. Cost Reduction'},{value:'10x',label:'Scalability Achieved'},{value:'100+',label:'Cloud Migrations'}],
    featuresTitle: 'Cloud & Operations Services',
    featuresSub: 'A complete suite of cloud strategy, migration, and cognitive operations services for modern enterprises.',
    features: [
      {icon:'cloud',title:'Cloud Strategy & Architecture',desc:'Design of secure, scalable multi-cloud and hybrid architectures aligned to your organizational goals.'},
      {icon:'move-3d',title:'Cloud Migration',desc:'Lift-and-shift, re-platforming, and re-architecture migration strategies executed with zero downtime.'},
      {icon:'activity',title:'Cognitive Operations (AIOps)',desc:'AI-powered IT operations that proactively detect, diagnose, and resolve infrastructure issues.'},
      {icon:'shield-check',title:'Cloud Security & Compliance',desc:'Identity management, threat detection, and compliance frameworks across AWS, Azure, and GCP.'},
      {icon:'layout-dashboard',title:'Digital Workspace Transformation',desc:'Modern workplace tools, collaboration platforms, and process automation for distributed teams.'},
      {icon:'trending-up',title:'FinOps & Cost Optimization',desc:'Continuous cloud cost visibility, rightsizing recommendations, and governance to maximize ROI.'},
    ],
    highlightTag: 'Why OmnitraTech Cloud',
    highlightTitle: 'Intelligent, Automated, and Always-On',
    highlightBody: 'We do not just lift and shift — we transform your operations by embedding intelligence into infrastructure. Our cognitive operations layer uses AI to predict failures, optimize performance, and keep your systems running at peak efficiency around the clock.',
    highlightBullets: ['Certified architects across AWS, Azure & GCP','24/7 managed cloud operations support','GDPR and SOC 2 compliance expertise','Proven frameworks for highly regulated industries'],
    highlightIcon: 'cloud-cog',
  },
  {
    file: 'solutions/mechanical-industrial.html',
    title: 'Mechanical & Industrial Solutions',
    icon: 'cog',
    heroDesc: 'Precision mechanical engineering and industrial systems design that solves complex physical-world problems across manufacturing, energy, and infrastructure.',
    stats: [{value:'500+',label:'Systems Designed'},{value:'30+',label:'Years Experience'},{value:'15+',label:'Countries Served'},{value:'99%',label:'On-Time Delivery'}],
    featuresTitle: 'Mechanical Engineering Services',
    featuresSub: 'Comprehensive engineering capabilities spanning design, simulation, fabrication oversight, and maintenance.',
    features: [
      {icon:'settings',title:'CAD/CAM Design',desc:'Advanced 3D modeling, drafting, and design for complex mechanical components and assemblies.'},
      {icon:'layers',title:'Structural Analysis & FEA',desc:'Finite element analysis to validate structural integrity under static, dynamic, and thermal loads.'},
      {icon:'thermometer',title:'Thermal & Fluid Systems',desc:'HVAC, heat exchanger, and fluid dynamics engineering for industrial process environments.'},
      {icon:'factory',title:'Industrial Automation',desc:'PLC programming, SCADA systems, and robotics integration for automated manufacturing lines.'},
      {icon:'wrench',title:'Maintenance Engineering',desc:'Predictive maintenance strategies, RCM analysis, and asset lifecycle optimization programs.'},
      {icon:'clipboard-check',title:'Quality Assurance',desc:'Inspection protocols, NDT services, and quality management systems aligned with ISO standards.'},
    ],
    highlightTag: 'Engineering Excellence',
    highlightTitle: 'Where Precision Meets Innovation',
    highlightBody: 'Our multidisciplinary mechanical engineering team bridges the gap between digital design and physical execution. From conceptual design through to commissioning, we provide end-to-end engineering support that guarantees performance, safety, and reliability.',
    highlightBullets: ['ISO 9001 certified engineering processes','Integration with digital twin technologies','Compliance with ASME, EN, and IS standards','Collaboration with on-site fabrication teams'],
    highlightIcon: 'cog',
  },
  {
    file: 'solutions/pipeline-design.html',
    title: 'Pipeline Design & Installation',
    icon: 'workflow',
    heroDesc: 'End-to-end pipeline engineering — from feasibility studies and FEED to detailed design, procurement support, and installation management for oil, gas, and industrial pipelines.',
    stats: [{value:'1000+',label:'KM Pipeline Designed'},{value:'50+',label:'Projects Completed'},{value:'100%',label:'Safety Record'},{value:'20+',label:'Countries'}],
    featuresTitle: 'Pipeline Engineering Services',
    featuresSub: 'Complete lifecycle pipeline engineering services from concept to commissioning.',
    features: [
      {icon:'map',title:'Route Survey & Feasibility',desc:'GIS-based route analysis, environmental assessment, and feasibility studies for optimal pipeline corridors.'},
      {icon:'file-text',title:'FEED & Detailed Design',desc:'Front-End Engineering Design and detailed engineering packages meeting international standards.'},
      {icon:'shield',title:'Stress Analysis & Integrity',desc:'Pipe stress analysis, corrosion protection design, and structural integrity assessments.'},
      {icon:'hard-hat',title:'Installation Management',desc:'Construction supervision, quality control, and HSE management for pipeline installation projects.'},
      {icon:'search',title:'Inspection & Testing',desc:'Hydrostatic testing, pigging operations, and non-destructive examination services.'},
      {icon:'activity',title:'Pipeline Monitoring',desc:'SCADA integration, leak detection systems, and real-time pipeline condition monitoring.'},
    ],
    highlightTag: 'Safe. Reliable. Compliant.',
    highlightTitle: 'Pipeline Engineering You Can Trust',
    highlightBody: 'Safety is not optional — it is our fundamental operating principle. Every pipeline we design adheres to ASME B31.3/B31.4/B31.8 standards, with rigorous QA/QC protocols applied at every phase from design to commissioning.',
    highlightBullets: ['Compliance with ASME, API, and IS standards','Full HSE management and documentation','Corrosion inhibition and cathodic protection design','Pipeline GIS mapping and documentation management'],
    highlightIcon: 'workflow',
  },
  {
    file: 'solutions/enterprise-solutions.html',
    title: 'Enterprise Solutions',
    icon: 'building-2',
    heroDesc: 'Scalable, integrated enterprise technology solutions — from ERP and digital transformation to custom software development and strategic consulting.',
    stats: [{value:'300+',label:'Enterprise Clients'},{value:'98%',label:'Client Satisfaction'},{value:'5x',label:'Avg. ROI Delivered'},{value:'24/7',label:'Support Coverage'}],
    featuresTitle: 'Enterprise Technology Portfolio',
    featuresSub: 'Comprehensive enterprise solutions that integrate people, processes, and technology for sustainable growth.',
    features: [
      {icon:'layout',title:'Digital Transformation',desc:'End-to-end programs that reimagine business processes through technology, data, and organizational change.'},
      {icon:'code',title:'Custom Software Development',desc:'Bespoke web, mobile, and enterprise applications built on modern, maintainable technology stacks.'},
      {icon:'link',title:'Systems Integration',desc:'API-led connectivity and middleware solutions that unify your ERP, CRM, and operational systems.'},
      {icon:'bar-chart',title:'Business Intelligence',desc:'Data warehousing, dashboards, and self-service analytics platforms for data-driven leadership.'},
      {icon:'users',title:'Change Management',desc:'Organizational change programs, training, and adoption strategies to maximize technology ROI.'},
      {icon:'headphones',title:'Managed IT Services',desc:'Outsourced IT operations, helpdesk, and infrastructure management for lean enterprises.'},
    ],
    highlightTag: 'Strategic Partnership',
    highlightTitle: 'More Than a Vendor — A Transformation Partner',
    highlightBody: 'We embed with your team to understand your business deeply before recommending any technology. Our enterprise engagements are outcomes-based — tied to your KPIs, timelines, and budgets — not just deliverables.',
    highlightBullets: ['Dedicated engagement managers for each project','Agile delivery with regular business reviews','Technology-agnostic vendor selection','Post-implementation support and optimization'],
    highlightIcon: 'building-2',
  },
  {
    file: 'solutions/cybersecurity.html',
    title: 'Cybersecurity Solutions',
    icon: 'shield-check',
    heroDesc: 'Protect your organization from evolving cyber threats with enterprise-grade security consulting, managed security services, and incident response capabilities.',
    stats: [{value:'<2hr',label:'Mean Response Time'},{value:'99.99%',label:'Threat Detection Rate'},{value:'500+',label:'Vulnerabilities Patched'},{value:'24/7',label:'Security Monitoring'}],
    featuresTitle: 'Cybersecurity Services Portfolio',
    featuresSub: 'A complete security stack covering prevention, detection, response, and compliance.',
    features: [
      {icon:'search',title:'Vulnerability Assessment',desc:'Comprehensive scanning and manual testing to identify and prioritize security weaknesses across your attack surface.'},
      {icon:'swords',title:'Penetration Testing',desc:'Ethical hacking exercises — network, web app, mobile, and social engineering — to expose real exploitable risk.'},
      {icon:'eye',title:'Security Operations (SOC)',desc:'24/7 managed detection and response service powered by a SIEM platform and threat intelligence feeds.'},
      {icon:'file-shield',title:'Compliance & Governance',desc:'ISO 27001, SOC 2, GDPR, HIPAA, and PCI DSS compliance programs with audit support.'},
      {icon:'cloud-lightning',title:'Cloud Security',desc:'Cloud posture management, workload protection, and identity security across AWS, Azure, and GCP.'},
      {icon:'alert-triangle',title:'Incident Response',desc:'Rapid response, digital forensics, and business continuity planning to minimize breach impact.'},
    ],
    highlightTag: 'Zero-Trust Security',
    highlightTitle: 'Defense-in-Depth for the Modern Enterprise',
    highlightBody: 'Cyber threats are growing in sophistication. Our zero-trust architecture approach means we assume breach at every layer — verifying every user, device, and connection before granting the least-privilege access required, protecting your most critical assets.',
    highlightBullets: ['Certified ethical hackers (CEH, OSCP)','Threat intelligence from global feeds','Integration with your existing security stack','Tabletop exercises and red team/blue team drills'],
    highlightIcon: 'shield-check',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRY CONFIGS
// ─────────────────────────────────────────────────────────────────────────────

const industries = [
  {
    file: 'industries/manufacturing.html',
    title: 'Manufacturing',
    icon: 'factory',
    heroDesc: 'Driving the next industrial revolution with AI-powered quality control, smart factory systems, and digital twin technologies.',
    stats: [{value:'40%',label:'Defect Reduction'},{value:'25%',label:'OEE Improvement'},{value:'30%',label:'Downtime Reduced'},{value:'150+',label:'Plants Digitized'}],
    featuresTitle: 'Smart Manufacturing Solutions',
    featuresSub: 'Technology and engineering solutions purpose-built for modern manufacturing environments.',
    features: [
      {icon:'cpu',title:'AI-Powered Quality Control',desc:'Computer vision systems that inspect 100% of production output in real time, eliminating defects before they ship.'},
      {icon:'activity',title:'Predictive Maintenance',desc:'Sensor fusion and ML models that predict equipment failures days in advance, eliminating unplanned downtime.'},
      {icon:'layers',title:'Digital Twin',desc:'1:1 virtual replicas of your factory floor for simulation, optimization, and operator training.'},
      {icon:'route',title:'Supply Chain Optimization',desc:'End-to-end supply chain visibility and AI-driven demand forecasting tied directly to your production schedule.'},
      {icon:'settings',title:'Industrial Automation',desc:'Robotics integration, PLC programming, and MES connectivity for lights-out manufacturing capability.'},
      {icon:'bar-chart-2',title:'OEE Analytics',desc:'Real-time dashboards tracking availability, performance, and quality to drive continuous improvement.'},
    ],
    highlightTag: 'Industry 4.0',
    highlightTitle: 'Your Factory, Intelligently Connected',
    highlightBody: 'OmnitraTech helps manufacturers transcend traditional limitations through a comprehensive Industry 4.0 roadmap. We integrate OT and IT systems, add an AI intelligence layer, and deliver measurable productivity and quality gains within months.',
    highlightBullets: ['ISA-95 compliant system architecture','Brownfield and greenfield project expertise','Integration with SAP, Oracle, and Siemens MES','Edge AI deployment in bandwidth-constrained environments'],
    highlightIcon: 'factory',
  },
  {
    file: 'industries/healthcare.html',
    title: 'Healthcare',
    icon: 'heart-pulse',
    heroDesc: 'Empowering healthcare providers and medtech companies with AI diagnostics, digital health platforms, and compliant data infrastructure.',
    stats: [{value:'30%',label:'Diagnosis Time Reduction'},{value:'99.9%',label:'Data Uptime'},{value:'HIPAA',label:'Compliant by Design'},{value:'50+',label:'Healthcare Clients'}],
    featuresTitle: 'Healthcare Technology Solutions',
    featuresSub: 'Technology solutions that improve patient outcomes, streamline workflows, and ensure regulatory compliance.',
    features: [
      {icon:'scan',title:'AI Diagnostics',desc:'Deep learning models for medical imaging analysis — radiology, pathology, and ophthalmology applications.'},
      {icon:'smartphone',title:'Digital Health Platforms',desc:'Patient engagement apps, telehealth platforms, and remote monitoring solutions for modern care delivery.'},
      {icon:'database',title:'Health Data Infrastructure',desc:'FHIR-compliant data lakes, HL7 integration engines, and interoperability solutions across care settings.'},
      {icon:'shield-check',title:'Compliance & Security',desc:'HIPAA, HITECH, and GDPR-compliant architecture with end-to-end encryption and audit trails.'},
      {icon:'bot',title:'Clinical AI Workflows',desc:'AI-assisted clinical decision support, automated coding, and documentation summarization tools.'},
      {icon:'trending-up',title:'Revenue Cycle Optimization',desc:'ML-powered claims processing, denial management, and predictive revenue cycle analytics.'},
    ],
    highlightTag: 'Patient-Centered Innovation',
    highlightTitle: 'Technology That Improves Lives',
    highlightBody: 'We understand that in healthcare, technology failures have human consequences. Our solutions are built with redundancy, compliance, and clinical workflow integration as first principles — not afterthoughts.',
    highlightBullets: ['FDA SaMD framework compliance support','Integration with Epic, Cerner, and major EHRs','On-premise or private cloud deployment options','Clinical validation and evidence generation support'],
    highlightIcon: 'heart-pulse',
  },
  {
    file: 'industries/retail-ecommerce.html',
    title: 'Retail & E-commerce',
    icon: 'shopping-bag',
    heroDesc: 'Transform the customer journey and streamline operations with AI personalization, omnichannel platforms, and intelligent supply chain solutions.',
    stats: [{value:'35%',label:'Conversion Rate Lift'},{value:'40%',label:'Return Rate Reduction'},{value:'2x',label:'Inventory Turns'},{value:'100+',label:'Retail Clients'}],
    featuresTitle: 'Retail Technology Solutions',
    featuresSub: 'End-to-end retail and e-commerce capabilities that drive growth and operational efficiency.',
    features: [
      {icon:'user-check',title:'AI Personalization',desc:'Recommendation engines and dynamic content that personalize every touchpoint of the shopping journey.'},
      {icon:'layout',title:'Omnichannel Commerce',desc:'Unified commerce platforms connecting in-store, web, mobile, and marketplace channels seamlessly.'},
      {icon:'package',title:'Inventory Intelligence',desc:'Demand forecasting and automated replenishment systems that eliminate stockouts and overstock.'},
      {icon:'truck',title:'Last-Mile Optimization',desc:'AI-driven route optimization and real-time tracking for cost-effective last-mile delivery.'},
      {icon:'search',title:'Visual Search & AR',desc:'Computer vision-powered visual search and augmented reality try-on experiences for online shoppers.'},
      {icon:'bar-chart-2',title:'Retail Analytics',desc:'Foot traffic analysis, basket analytics, and customer lifetime value modeling for smarter decisions.'},
    ],
    highlightTag: 'Commerce Transformation',
    highlightTitle: 'Meet Customers Where They Are',
    highlightBody: 'Modern retail success requires a seamless blend of physical and digital experiences. OmnitraTech helps retailers build the unified data foundation and intelligent systems needed to compete in an increasingly demanding consumer landscape.',
    highlightBullets: ['Headless commerce architecture expertise','Shopify, Magento, and custom platform integration','GDPR and PCI DSS compliant data handling','Real-time inventory sync across all channels'],
    highlightIcon: 'shopping-bag',
  },
  {
    file: 'industries/financial-services.html',
    title: 'Financial Services',
    icon: 'landmark',
    heroDesc: 'Future-proof your financial institution with AI-powered risk management, regulatory compliance automation, and next-generation digital banking platforms.',
    stats: [{value:'60%',label:'Fraud Detection Rate'},{value:'50%',label:'Manual Process Reduction'},{value:'<1sec',label:'Real-Time Analytics'},{value:'100%',label:'Audit Trail Coverage'}],
    featuresTitle: 'Fintech & Banking Solutions',
    featuresSub: 'Trusted technology solutions for banks, insurers, asset managers, and fintech innovators.',
    features: [
      {icon:'shield-check',title:'Fraud & Risk AI',desc:'Real-time transaction scoring, behavioral analytics, and network graph analysis to combat financial crime.'},
      {icon:'file-text',title:'RegTech & Compliance',desc:'Automated regulatory reporting, KYC/AML automation, and compliance workflow management platforms.'},
      {icon:'smartphone',title:'Digital Banking Platforms',desc:'Core banking modernization, mobile-first banking apps, and open banking API infrastructure.'},
      {icon:'bar-chart',title:'Quantitative Analytics',desc:'Algorithmic trading models, portfolio optimization, and credit risk modeling for financial precision.'},
      {icon:'users',title:'Customer Intelligence',desc:'Propensity models, churn prediction, and next-best-action engines for relationship banking.'},
      {icon:'lock',title:'Cybersecurity for Finance',desc:'Financial-grade security operations, threat intelligence, and zero-trust architectures for institutions.'},
    ],
    highlightTag: 'Trusted by Institutions',
    highlightTitle: 'Precision Technology for High-Stakes Finance',
    highlightBody: 'Financial institutions operate under extraordinary scrutiny. Every technology decision carries regulatory, reputational, and fiduciary weight. OmnitraTech brings financial domain expertise together with technology excellence to navigate this complexity confidently.',
    highlightBullets: ['RBI, SEBI, and global regulatory expertise','ISO 27001 certified security operations','Core banking and legacy system modernization','Real-time payment and settlement infrastructure'],
    highlightIcon: 'landmark',
  },
  {
    file: 'industries/energy-utilities.html',
    title: 'Energy & Utilities',
    icon: 'zap',
    heroDesc: 'Accelerating the energy transition with grid modernization, renewable energy optimization, and asset intelligence platforms for utilities and energy companies.',
    stats: [{value:'20%',label:'Energy Loss Reduction'},{value:'30%',label:'Asset Life Extension'},{value:'99.9%',label:'Grid Uptime'},{value:'50+',label:'Energy Projects'}],
    featuresTitle: 'Energy Technology Solutions',
    featuresSub: 'Intelligent solutions for power generation, transmission, distribution, and renewable energy operations.',
    features: [
      {icon:'zap',title:'Smart Grid Solutions',desc:'Advanced metering infrastructure, grid automation, and demand response management systems.'},
      {icon:'sun',title:'Renewable Energy Analytics',desc:'Performance monitoring, yield forecasting, and O&M optimization for solar and wind assets.'},
      {icon:'activity',title:'Asset Performance Management',desc:'AI-driven predictive maintenance programs for turbines, transformers, and grid infrastructure.'},
      {icon:'database',title:'Energy Data Platforms',desc:'Real-time operational data historians, energy analytics dashboards, and SCADA integration.'},
      {icon:'leaf',title:'Sustainability & ESG',desc:'Emissions monitoring, carbon accounting, and ESG reporting platforms for energy companies.'},
      {icon:'shield',title:'OT/ICS Cybersecurity',desc:'Industrial control system security assessments and continuous monitoring for critical infrastructure.'},
    ],
    highlightTag: 'Grid Modernization',
    highlightTitle: 'Powering the Clean Energy Future',
    highlightBody: 'The energy sector is undergoing its greatest transformation in a century. OmnitraTech is at the forefront, helping utilities and energy companies integrate renewable sources, modernize aging infrastructure, and leverage data to maximize efficiency and reliability.',
    highlightBullets: ['NERC CIP and IEC 62351 security compliance','Integration with PI System and OsiSoft historians','Experience in thermal, hydro, and renewable assets','Digital twin modeling for power plant optimization'],
    highlightIcon: 'zap',
  },
  {
    file: 'industries/logistics-supply-chain.html',
    title: 'Logistics & Supply Chain',
    icon: 'truck',
    heroDesc: 'Build a resilient, intelligent supply chain with real-time visibility, AI-powered logistics optimization, and autonomous warehouse solutions.',
    stats: [{value:'25%',label:'Transport Cost Reduction'},{value:'40%',label:'Order Accuracy Improvement'},{value:'3x',label:'Warehouse Throughput'},{value:'Real-time',label:'Supply Chain Visibility'}],
    featuresTitle: 'Logistics & Supply Chain Solutions',
    featuresSub: 'Technology to optimize every link in your supply chain from supplier to customer.',
    features: [
      {icon:'map',title:'Route Optimization',desc:'AI-powered dynamic routing that reduces fuel consumption, delivery times, and fleet operating costs.'},
      {icon:'package',title:'Warehouse Automation',desc:'WMS platforms, robotic picking systems, and conveyor optimization for high-throughput distribution centers.'},
      {icon:'globe',title:'Supply Chain Visibility',desc:'End-to-end tracking platforms that provide real-time inventory and shipment visibility across all tiers.'},
      {icon:'bar-chart-2',title:'Demand Planning',desc:'Statistical and ML-based demand forecasting integrated with procurement and production planning.'},
      {icon:'link',title:'Supplier Intelligence',desc:'Supplier risk scoring, performance analytics, and digital collaboration portals for supply chain resilience.'},
      {icon:'clipboard-check',title:'Trade & Customs',desc:'Automated customs compliance, trade document management, and duty optimization solutions.'},
    ],
    highlightTag: 'Supply Chain 4.0',
    highlightTitle: 'From Reactive to Predictive Logistics',
    highlightBody: 'In an era of supply chain disruptions, companies that invest in supply chain intelligence gain a lasting competitive advantage. OmnitraTech helps logistics operators shift from reactive problem-solving to predictive, data-driven optimization.',
    highlightBullets: ['Integration with SAP TM, Oracle SCM, and Blue Yonder','Control tower implementation expertise','IoT sensor integration for real-time tracking','Carbon footprint optimization for sustainable logistics'],
    highlightIcon: 'truck',
  },
  {
    file: 'industries/oil-gas.html',
    title: 'Oil & Gas',
    icon: 'droplet',
    heroDesc: 'Maximizing upstream efficiency, ensuring downstream reliability, and driving safety performance across oil and gas operations worldwide.',
    stats: [{value:'30%',label:'OPEX Reduction'},{value:'Zero',label:'Safety Incidents'},{value:'1000+',label:'Wells Monitored'},{value:'20+',label:'Countries Served'}],
    featuresTitle: 'Oil & Gas Technology Solutions',
    featuresSub: 'Specialized engineering and digital solutions for upstream, midstream, and downstream operations.',
    features: [
      {icon:'activity',title:'Upstream Production Optimization',desc:'Reservoir simulation, well performance analytics, and production optimization AI for maximum recovery.'},
      {icon:'workflow',title:'Pipeline Integrity Management',desc:'ILI data analysis, corrosion management, and fitness-for-service assessments for pipeline networks.'},
      {icon:'shield-check',title:'HSE & Safety Systems',desc:'Process safety management, SIL verification, and safety instrumented system design and assessment.'},
      {icon:'database',title:'Operational Data Platforms',desc:'Real-time production data historians, SCADA integration, and operational intelligence dashboards.'},
      {icon:'search',title:'Inspection Technologies',desc:'Drone inspection, ROV services, and advanced NDT analysis for asset integrity management.'},
      {icon:'leaf',title:'Emissions & Decarbonization',desc:'Methane leak detection, flare gas recovery, and emissions reduction program management.'},
    ],
    highlightTag: 'Operational Excellence',
    highlightTitle: 'Engineering Reliability in Demanding Environments',
    highlightBody: 'Oil and gas assets operate in extreme conditions — offshore platforms, desert pipelines, arctic installations. OmnitraTech brings deep domain expertise and proven digital tools to keep these critical assets operating safely and profitably.',
    highlightBullets: ['API 580/581 RBI methodology implementation','WITSML-compliant drilling data management','Integration with AVEVA, AspenTech, and Honeywell','Carbon capture and storage project support'],
    highlightIcon: 'droplet',
  },
  {
    file: 'industries/infrastructure-construction.html',
    title: 'Infrastructure & Construction',
    icon: 'hard-hat',
    heroDesc: 'Delivering smarter infrastructure projects with BIM, digital project management, structural engineering expertise, and data-driven asset management.',
    stats: [{value:'20%',label:'Project Cost Savings'},{value:'35%',label:'Schedule Compression'},{value:'Zero',label:'Rework Rate Goal'},{value:'100+',label:'Projects Managed'}],
    featuresTitle: 'Infrastructure Technology Solutions',
    featuresSub: 'Digital engineering and project management solutions for infrastructure and construction enterprises.',
    features: [
      {icon:'layers',title:'BIM & Digital Engineering',desc:'Level 2/3 BIM implementation, clash detection, and 4D/5D modeling for complex infrastructure projects.'},
      {icon:'clipboard-list',title:'Project Management Platforms',desc:'Custom PMO dashboards, earned value management, and digital reporting for mega-projects.'},
      {icon:'map',title:'GIS & Geospatial Analytics',desc:'Spatial data platforms, terrain modelling, and location intelligence for infrastructure planning.'},
      {icon:'cpu',title:'Smart Infrastructure',desc:'IoT-enabled structural health monitoring, smart city platforms, and connected asset management.'},
      {icon:'hard-hat',title:'Construction Safety AI',desc:'Computer vision systems that monitor PPE compliance and unsafe behaviors on construction sites.'},
      {icon:'file-text',title:'Asset Information Management',desc:'ISO 19650-compliant AIM/BIM handover, O&M documentation management, and asset lifecycle tracking.'},
    ],
    highlightTag: 'Built for Scale',
    highlightTitle: 'From Blueprint to Smart Asset',
    highlightBody: 'Great infrastructure begins with great engineering data. OmnitraTech helps infrastructure owners and contractors create a single source of truth — from design and construction through to decades of operation — enabling data-driven decisions at every phase of the asset lifecycle.',
    highlightBullets: ['ISO 19650 BIM compliance support','Integration with Autodesk, Bentley, and Hexagon platforms','Digital twin creation for operational assets','GIS-based infrastructure registry and compliance management'],
    highlightIcon: 'hard-hat',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// WRITE ALL FILES
// ─────────────────────────────────────────────────────────────────────────────

// Careers
fs.writeFileSync(path.join(__dirname, 'careers.html'), buildCareers(), 'utf8');
console.log('✓ careers.html');

// Solutions
solutions.forEach(cfg => {
  const dir = path.dirname(path.join(__dirname, cfg.file));
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(__dirname, cfg.file), buildSolution(cfg), 'utf8');
  console.log(`✓ ${cfg.file}`);
});

// Industries
industries.forEach(cfg => {
  const dir = path.dirname(path.join(__dirname, cfg.file));
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(__dirname, cfg.file), buildIndustry(cfg), 'utf8');
  console.log(`✓ ${cfg.file}`);
});

console.log('\n✅ All 15 pages generated successfully!');
