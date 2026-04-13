const fs = require('fs');

const filePaths = ['index.html', 'index-vanilla.html'];

filePaths.forEach(file => {
   if(!fs.existsSync(file)) return;
   let content = fs.readFileSync(file, 'utf8');
   
   // Nav careers
   content = content.replace(/href="#careers"/g, 'href="careers.html"');
   
   // Services Links
   let c = content;
   let i = 0;
   const serviceLinks = [
       'solutions/ai-ml-services.html',
       'solutions/cloud-cognitive.html',
       'solutions/mechanical-industrial.html',
       'solutions/pipeline-design.html',
       'solutions/enterprise-solutions.html',
       'solutions/cybersecurity.html'
   ];
   // Replace only the occurrences of `href="#"` that are strictly inside the services or nav
   // Simple way, manually replace them
   c = c.replace(/<a href="#"\s+class="inline-flex items-center text-brand-600 font-semibold group-hover:text-brand-700">Learn/g, (match) => {
       const replacement = `<a href="${serviceLinks[i]}" class="inline-flex items-center text-brand-600 font-semibold group-hover:text-brand-700">Learn`;
       i++;
       return replacement;
   });

   // Industries wrap
   const industriesInfo = [
       {name: "Manufacturing", href: "industries/manufacturing.html"},
       {name: "Healthcare", href: "industries/healthcare.html"},
       {name: "Retail & E-commerce", href: "industries/retail-ecommerce.html"},
       {name: "Financial Services", href: "industries/financial-services.html"},
       {name: "Energy & Utilities", href: "industries/energy-utilities.html"},
       {name: "Logistics", href: "industries/logistics-supply-chain.html"},
       {name: "Oil & Gas", href: "industries/oil-gas.html"},
       {name: "Infrastructure", href: "industries/infrastructure-construction.html"}
   ];
   
   industriesInfo.forEach(ind => {
      // Find the div and turn it into an 'a' tag
      // It looks like: <div class="border border-brand-400/30 rounded-lg p-6 hover:bg-white/5 transition duration-300 flex flex-col items-center justify-center min-h-[140px] cursor-default">
      // the span contains the text (partially)
      // I will regex replace the <div ...> ... <span>Text</span> ... </div>
      
      // Let's do a simple regex that finds the div wrapping the industry name
      const regex = new RegExp(`(<div class="border border-brand-400[\\s\\S]*?>)([\\s\\S]*?<span[^>]*>[^<]*${ind.name}[\\s\\S]*?)(<\\/div>)`, 'g');
      c = c.replace(regex, (match, open, middle, close) => {
          let newOpen = open.replace('<div', `<a href="${ind.href}"`).replace('cursor-default', 'cursor-pointer group');
          let newMiddle = middle.replace('mb-4', 'mb-4 group-hover:scale-110 transition');
          return newOpen + newMiddle + '</a>';
      });
   });
   
   // Footer specific Links
   c = c.replace(/href="#" class="hover:text-brand-400 transition">AI & ML Services<\/a>/, 'href="solutions/ai-ml-services.html" class="hover:text-brand-400 transition">AI & ML Services</a>');
   c = c.replace(/href="#" class="hover:text-brand-400 transition">Cloud Operations<\/a>/, 'href="solutions/cloud-cognitive.html" class="hover:text-brand-400 transition">Cloud Operations</a>');
   c = c.replace(/href="#" class="hover:text-brand-400 transition">Mechanical & Industrial<\/a>/, 'href="solutions/mechanical-industrial.html" class="hover:text-brand-400 transition">Mechanical & Industrial</a>');
   c = c.replace(/href="#" class="hover:text-brand-400 transition">Pipeline Design<\/a>/, 'href="solutions/pipeline-design.html" class="hover:text-brand-400 transition">Pipeline Design</a>');
   c = c.replace(/href="#" class="hover:text-brand-400 transition">Cybersecurity<\/a>/, 'href="solutions/cybersecurity.html" class="hover:text-brand-400 transition">Cybersecurity</a>');

   fs.writeFileSync(file, c, 'utf8');
   console.log(`Updated ${file}`);
});
