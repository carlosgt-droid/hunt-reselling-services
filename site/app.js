/* Hunt — standalone SPA (vanilla JS, hash router, zero dependencies) */

// ---------- data ----------
const steps = [
  { icon: 'tag', title: 'Tell us what you want', desc: "Drop a link or describe the item — the exact model, size, color, and the max price you're willing to pay." },
  { icon: 'search', title: 'We hunt it down', desc: 'Our team and tooling monitor restocks, drops, and verified sellers around the clock until we secure your item.' },
  { icon: 'card', title: 'Pay only on success', desc: 'When we land it, we charge your saved payment method for the item plus a one-time service fee ($0–$100).' },
  { icon: 'package', title: 'It ships to you', desc: 'The item ships straight to your door with tracking. If we never find it, you pay absolutely nothing.' },
]

const features = [
  { icon: 'shield', title: 'No-find, no-fee guarantee', desc: 'Your card is only ever charged when the item is actually in hand. No find means no charge — zero risk.' },
  { icon: 'bolt', title: 'Beat the scalpers', desc: 'We fight stock shortages and bots with monitoring that reacts in milliseconds, so you get the real retail item.' },
  { icon: 'clock', title: 'Always watching', desc: '24/7 restock and drop tracking across major retailers and verified marketplaces means you never miss a window.' },
  { icon: 'lock', title: 'Secure by default', desc: 'Payment details are tokenized and encrypted. We never store raw card numbers, and you set a hard price cap.' },
  { icon: 'users', title: 'Real human sourcing', desc: 'Behind the automation is a sourcing team that verifies authenticity and condition before anything ships.' },
  { icon: 'tag', title: 'Transparent pricing', desc: 'You approve the item price and see the service fee up front. No surprise markups, ever.' },
]

const faqs = [
  { q: 'When exactly am I charged?', a: "Only after we successfully secure your item. We charge the item's price plus a one-time service fee between $0 and $100. If we never find it, you are never charged a single cent." },
  { q: 'How is the service fee decided?', a: 'The fee depends on how difficult the item is to source. Everyday items that are briefly out of stock sit near the low end, while hyped, limited drops with heavy scalper competition sit toward $100. You always see and approve the fee before we start hunting.' },
  { q: 'What kinds of items can you find?', a: 'Sneakers, consoles and GPUs, limited-edition collectibles, concert and event tickets, hard-to-find electronics, and more. If it has a retail price and a real seller, we can usually hunt it down.' },
  { q: 'Is this legal and legit?', a: 'Yes. We purchase items at or near their legitimate retail price from authorized retailers and verified sellers on your behalf — a personal shopping and sourcing service. We are not scalpers; our goal is to get you the real item without the markup games.' },
  { q: 'Can I set a maximum price?', a: 'Absolutely. Every request includes a hard price cap. We will never buy above the limit you set, so there are no surprise charges.' },
  { q: 'What if the item I receive is wrong or damaged?', a: 'Buyer protection covers you. If an item arrives not as described, we work to replace it or fully refund the item cost and the service fee.' },
  { q: 'How long does a hunt take?', a: 'It varies by item. Common restocks can resolve in hours; rare limited drops may take days or weeks until the next window opens. You can cancel a pending hunt anytime at no cost.' },
]

const pricingTiers = [
  { name: 'In Stock Soon', fee: '$0 – $15', tagline: 'Items that restock often', description: 'Everyday products that are temporarily sold out but restock on a predictable cycle.', examples: ['Popular electronics', 'Household restocks', 'Standard retail items'], highlighted: false },
  { name: 'Hard to Get', fee: '$15 – $50', tagline: 'Limited stock, real competition', description: 'Items with genuine scarcity where timing and monitoring make the difference.', examples: ['Current-gen consoles', 'Popular GPUs', 'Mid-tier sneaker drops'], highlighted: true },
  { name: 'Grail Tier', fee: '$50 – $100', tagline: 'The stuff everyone wants', description: 'Hyped, bot-targeted releases where securing a single unit is a genuine win.', examples: ['Hyped sneaker releases', 'Limited collectibles', 'High-demand event tickets'], highlighted: false },
]

const stats = [
  { value: '38k+', label: 'Items secured' },
  { value: '94%', label: 'Hunt success rate' },
  { value: '$0', label: 'Charged if not found' },
  { value: '24/7', label: 'Restock monitoring' },
]

const testimonials = [
  { name: 'Marcus T.', role: 'Sneakerhead', quote: "Got the drop I'd missed four times in a row. Paid retail plus a fair fee instead of 3x resale. Done." },
  { name: 'Priya K.', role: 'Parent, holiday shopper', quote: 'The console was sold out everywhere. I set my price cap, forgot about it, and it showed up a week later.' },
  { name: 'Dev R.', role: 'PC builder', quote: 'Snagged a GPU at MSRP during the shortage. The fact that I only paid once they found it sealed it for me.' },
]

const categories = ['Sneakers', 'Consoles', 'GPUs', 'Collectibles', 'Event tickets', 'Electronics', 'Trading cards', 'Toys']

// ---------- icons ----------
const I = {
  _s: (p) => `<svg width="${p.s||24}" height="${p.s||24}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${p.c||''}">`,
  search: (p={}) => `${I._s(p)}<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`,
  shield: (p={}) => `${I._s(p)}<path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  bolt: (p={}) => `${I._s(p)}<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>`,
  card: (p={}) => `${I._s(p)}<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19"/><path d="M6 15h4"/></svg>`,
  check: (p={}) => `${I._s(p)}<path d="m5 12 4 4 10-10"/></svg>`,
  clock: (p={}) => `${I._s(p)}<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  lock: (p={}) => `${I._s(p)}<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 1 1 8 0v3.5"/></svg>`,
  package: (p={}) => `${I._s(p)}<path d="M21 8 12 3 3 8l9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>`,
  tag: (p={}) => `${I._s(p)}<path d="M3 3h7l11 11-7 7L3 10V3Z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>`,
  users: (p={}) => `${I._s(p)}<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.5a3.5 3.5 0 0 1 0 6.9"/><path d="M18 20a6 6 0 0 0-3-5.2"/></svg>`,
  arrow: (p={}) => `${I._s(p)}<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`,
  plus: (p={}) => `${I._s(p)}<path d="M12 5v14M5 12h14"/></svg>`,
  minus: (p={}) => `${I._s(p)}<path d="M5 12h14"/></svg>`,
  star: (p={}) => `<svg width="${p.s||16}" height="${p.s||16}" viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.5 5.9 6.4.5-4.9 4.2 1.5 6.3L12 16.8 6 20.9l1.5-6.3L2.6 10.4l6.4-.5L12 3Z"/></svg>`,
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '<', '>': '>', '"': '"', "'": ''' }[c]))

// ---------- shared chrome ----------
function navbar() {
  const links = [['#/how-it-works', 'How it works'], ['#/pricing', 'Pricing'], ['#/faq', 'FAQ']]
  const route = currentRoute()
  return `
  <header class="nav">
    <nav class="container-x nav-inner">
      <a href="#/" class="logo">
        <span class="logo-mark">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
        </span>
        <span class="logo-text">Hunt<span>.</span></span>
      </a>
      <div class="nav-links">
        ${links.map(([h, l]) => `<a href="${h}" class="nav-link ${route === h.slice(1) ? 'active' : ''}">${l}</a>`).join('')}
      </div>
      <div class="nav-cta">
        <a href="#/request" class="signin">Sign in</a>
        <a href="#/request" class="btn btn-primary">Start a request</a>
      </div>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </nav>
    <div class="mobile-menu hidden" id="mobileMenu">
      <div class="container-x inner">
        ${links.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}
        <a href="#/request" class="btn btn-primary" style="margin-top:.5rem">Start a request</a>
      </div>
    </div>
  </header>`
}

function footer() {
  const year = new Date().getFullYear()
  return `
  <footer class="footer">
    <div class="container-x footer-grid">
      <div class="footer-about">
        <a href="#/" class="logo">
          <span class="logo-mark"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg></span>
          <span class="logo-text">Hunt<span>.</span></span>
        </a>
        <p class="about">We track down hard-to-get items so you don't have to. No luck required — just tell us what you want. You're only charged when we actually land it.</p>
      </div>
      <div>
        <h4>Product</h4>
        <ul>
          <li><a href="#/how-it-works">How it works</a></li>
          <li><a href="#/pricing">Pricing</a></li>
          <li><a href="#/request">Start a request</a></li>
          <li><a href="#/faq">FAQ</a></li>
        </ul>
      </div>
      <div>
        <h4>Trust</h4>
        <ul>
          <li><span>No-find, no-fee guarantee</span></li>
          <li><span>Secure payments</span></li>
          <li><span>Buyer protection</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container-x inner">
        <p>© ${year} Hunt. All rights reserved.</p>
        <p>We only charge for successful finds. Service fee ranges from $0–$100 per item.</p>
      </div>
    </div>
  </footer>`
}

function sectionHead({ eyebrow, title, subtitle, left }) {
  return `<div class="section-head ${left ? 'left' : ''}">
    ${eyebrow ? `<span class="chip chip-brand">${eyebrow}</span>` : ''}
    <h2>${title}</h2>
    ${subtitle ? `<p>${subtitle}</p>` : ''}
  </div>`
}

// ---------- pages ----------
function pageHome() {
  const heroSteps = [
    { label: 'Request received', state: 'done' },
    { label: 'Monitoring restocks', state: 'done' },
    { label: 'Item secured', state: 'done' },
    { label: 'Payment charged · $534', state: 'active' },
  ]
  return `
  <section class="hero">
    <div class="container-x hero-grid">
      <div>
        <span class="chip chip-brand">${I.shield({ s: 14 })} No-find, no-fee guarantee</span>
        <h1>Get the items you <span class="grad">can't buy</span>.</h1>
        <p class="lead">Sold out? Scalped? Bots everywhere? Tell us what you want and we'll hunt it down for you. You're only charged when we actually land it — item price plus a small <strong style="color:#e2e8f0">$0–$100</strong> service fee.</p>
        <div class="hero-actions">
          <a href="#/request" class="btn btn-primary btn-lg">Start a request ${I.arrow({ s: 18 })}</a>
          <a href="#/how-it-works" class="btn btn-ghost btn-lg">See how it works</a>
        </div>
        <ul class="hero-checks">
          ${['Pay only on success', 'Set your own price cap', 'Real retail, not resale'].map((t) => `<li>${I.check({ s: 16, c: 'text-brand' })} ${t}</li>`).join('')}
        </ul>
      </div>
      <div class="hero-card-wrap">
        <div class="hero-card-glow"></div>
        <div class="card shadow-glow">
          <div class="flex" style="align-items:center;justify-content:space-between">
            <div class="flex" style="align-items:center;gap:.5rem"><span class="dot-pulse"></span><span style="font-size:.875rem;font-weight:600;color:#fff">Active hunt</span></div>
            <span class="chip">#HNT-20418</span>
          </div>
          <div class="hero-item">
            <div class="thumb">🎮</div>
            <div style="min-width:0">
              <p style="font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Next-Gen Console — Disc Edition</p>
              <p style="font-size:.875rem;color:#94a3b8">Price cap: $499 · Fee: $35</p>
            </div>
          </div>
          <div class="hero-steps">
            ${heroSteps.map((s) => `
              <div class="hs">
                <span class="mark ${s.state}">${s.state === 'done' ? I.check({ s: 14 }) : '<span class="pip"></span>'}</span>
                <span class="txt ${s.state === 'todo' ? 'off' : 'on'}">${s.label}</span>
              </div>`).join('')}
          </div>
          <div class="hero-save"><strong>Secured at retail.</strong> You just saved an estimated $220 vs. resale market.</div>
        </div>
      </div>
    </div>
    <div class="marquee">
      <div class="container-x inner">
        <span class="eyebrow">We hunt</span>
        ${categories.map((c) => `<span class="chip">${c}</span>`).join('')}
      </div>
    </div>
  </section>

  <section class="container-x section">
    <div class="grid stats">
      ${stats.map((s) => `<div class="card"><p class="val">${s.value}</p><p class="lab">${s.label}</p></div>`).join('')}
    </div>
  </section>

  <section class="container-x section">
    ${sectionHead({ eyebrow: 'How it works', title: 'Four steps. Zero risk.', subtitle: "You describe it, we hunt it, and your card only moves when the item is actually yours." })}
    <div class="grid steps-grid">
      ${steps.map((s, i) => `
        <div class="card step-card">
          <span class="num">${i + 1}</span>
          <div class="icon-box">${I[s.icon]({ s: 22 })}</div>
          <h3>${s.title}</h3>
          <p class="desc">${s.desc}</p>
        </div>`).join('')}
    </div>
  </section>

  <section class="container-x section">
    ${sectionHead({ eyebrow: 'Why Hunt', title: 'Built to actually get you the item', subtitle: "Stock shortages and scalper bots are the problem. We're the counter-measure." })}
    <div class="grid features-grid">
      ${features.map((f) => `
        <div class="card feature-card">
          <div class="icon-box grad sm">${I[f.icon]({ s: 20 })}</div>
          <h3>${f.title}</h3>
          <p class="desc">${f.desc}</p>
        </div>`).join('')}
    </div>
  </section>

  <section class="container-x section">
    ${sectionHead({ eyebrow: 'Loved by hunters', title: 'People who stopped missing out' })}
    <div class="grid tgrid">
      ${testimonials.map((t) => `
        <figure class="card">
          <div class="stars">${Array.from({ length: 5 }).map(() => I.star({ s: 16 })).join('')}</div>
          <blockquote class="quote">"${t.quote}"</blockquote>
          <figcaption class="author">
            <span class="avatar">${t.name.charAt(0)}</span>
            <div><p class="nm">${t.name}</p><p class="rl">${t.role}</p></div>
          </figcaption>
        </figure>`).join('')}
    </div>
  </section>

  <section class="container-x section">
    <div class="cta">
      <div class="blob a"></div><div class="blob b"></div>
      <h2>There's an item you keep missing.</h2>
      <p>Let us catch it for you. Start a request in under two minutes — you won't be charged unless we land it.</p>
      <div style="position:relative;margin-top:2rem;display:flex;justify-content:center">
        <a href="#/request" class="btn btn-primary btn-lg">Start your hunt ${I.arrow({ s: 18 })}</a>
      </div>
    </div>
  </section>`
}

function pageHowItWorks() {
  const guarantees = [
    'You are never charged until the item is physically secured.',
    'If we never find it, there is no charge and no cancellation fee.',
    'You set a hard price cap — we never buy above it.',
    'The service fee ($0–$100) is shown and approved before the hunt begins.',
  ]
  return `
  <div class="container-x section" style="padding-top:5rem">
    ${sectionHead({ eyebrow: 'How it works', title: 'From sold out to shipped out', subtitle: 'A simple, risk-free process. You stay in control of the price and only pay when we succeed.' })}
    <div class="timeline">
      <div class="rail"></div>
      <ol>
        ${steps.map((s, i) => `
          <li>
            <span class="node">${I[s.icon]({ s: 22 })}</span>
            <div class="card">
              <h3><span class="tnum">${i + 1}</span><span><span class="muted-step">Step ${i + 1} — </span>${s.title}</span></h3>
              <p class="desc">${s.desc}</p>
            </div>
          </li>`).join('')}
      </ol>
    </div>
    <div class="callout">
      <h3>${I.check({ s: 20, c: 'text-brand' })} The guarantee, in plain terms</h3>
      <ul>${guarantees.map((t) => `<li>${I.check({ s: 18, c: 'text-brand' })} ${t}</li>`).join('')}</ul>
    </div>
    <div class="flex justify-center" style="margin-top:3rem">
      <a href="#/request" class="btn btn-primary btn-lg">Start a request ${I.arrow({ s: 18 })}</a>
    </div>
  </div>`
}

function pagePricing() {
  const rows = [
    { k: 'Item price', v: 'Always at or near retail. You set the cap.' },
    { k: 'Service fee', v: '$0–$100, based on difficulty. Shown before the hunt.' },
    { k: 'If not found', v: 'You pay $0. No charge, no cancellation fee.' },
  ]
  return `
  <div class="container-x section" style="padding-top:5rem">
    ${sectionHead({ eyebrow: 'Pricing', title: 'One fee. Only when we win.', subtitle: "You pay the item's retail price plus a single service fee between $0 and $100. The fee scales with how hard the item is to secure — and you approve it up front." })}
    <div class="grid pricing-grid">
      ${pricingTiers.map((t) => `
        <div class="tier ${t.highlighted ? 'hot' : ''}">
          ${t.highlighted ? '<span class="badge">Most common</span>' : ''}
          <h3>${t.name}</h3>
          <p class="tagline">${t.tagline}</p>
          <div class="fee"><span class="amt">${t.fee}</span><span class="per">service fee</span></div>
          <p class="desc">${t.description}</p>
          <ul>${t.examples.map((e) => `<li>${I.check({ s: 16, c: 'text-brand' })} ${e}</li>`).join('')}</ul>
          <a href="#/request" class="btn ${t.highlighted ? 'btn-primary' : 'btn-ghost'}">Start a request</a>
        </div>`).join('')}
    </div>
    <div class="card fee-info">
      <h3 style="margin-top:0">How the fee is calculated</h3>
      <p class="desc">The service fee reflects the real effort and competition involved in landing your item. A product that simply restocks on a schedule costs us little to catch, so the fee is low — sometimes $0. A hyped, bot-targeted release that requires constant monitoring and fast action sits toward the top of the range.</p>
      <div class="grid grid3">
        ${rows.map((r) => `<div class="box"><p class="k">${r.k}</p><p class="v">${r.v}</p></div>`).join('')}
      </div>
    </div>
    <div class="flex justify-center" style="margin-top:3rem">
      <a href="#/request" class="btn btn-primary btn-lg">Start your hunt ${I.arrow({ s: 18 })}</a>
    </div>
  </div>`
}

let faqOpen = 0
function pageFAQ() {
  return `
  <div class="container-x section" style="padding-top:5rem">
    ${sectionHead({ eyebrow: 'FAQ', title: 'Questions, answered', subtitle: 'Everything you need to know about how charging, finding, and the service fee work.' })}
    <div class="faq-list" id="faqList">
      ${faqs.map((f, i) => `
        <div class="faq-item ${faqOpen === i ? 'open' : ''}" data-i="${i}">
          <button class="faq-q" data-faq="${i}">
            <span class="qt">${f.q}</span>
            <span class="faq-ic">${faqOpen === i ? I.minus({ s: 16 }) : I.plus({ s: 16 })}</span>
          </button>
          ${faqOpen === i ? `<p class="faq-a">${f.a}</p>` : ''}
        </div>`).join('')}
    </div>
    <div class="faq-help">
      <h3>Still have a question?</h3>
      <p>Start a request and our sourcing team will walk you through the details.</p>
      <div class="flex justify-center mt-6"><a href="#/request" class="btn btn-primary">Start a request ${I.arrow({ s: 18 })}</a></div>
    </div>
  </div>`
}

// ---------- request wizard (stateful) ----------
const req = {
  step: 1,
  submitted: false,
  form: { item: '', link: '', category: 'Sneakers', details: '', priceCap: '', difficulty: 'medium', name: '', email: '', card: '', exp: '', cvc: '' },
}

function estimateFee(priceCap, difficulty) {
  const base = { low: 10, medium: 35, high: 75 }[difficulty] ?? 25
  const price = Number(priceCap) || 0
  return Math.max(0, Math.min(100, Math.round(base + price * 0.03)))
}

function canNext() {
  const f = req.form
  if (req.step === 1) return f.item.trim().length > 1
  if (req.step === 2) return Number(f.priceCap) > 0
  if (req.step === 3) return f.name && f.email.includes('@') && f.card.replace(/\s/g, '').length >= 12
  return false
}

function summaryRow(k, v, strong) {
  return `<div class="row ${strong ? 'strong' : ''}"><span class="k">${k}</span><span class="v">${v}</span></div>`
}

function pageRequest() {
  const f = req.form
  const fee = estimateFee(f.priceCap, f.difficulty)

  if (req.submitted) {
    return `
    <div class="container-x section" style="padding-top:6rem">
      <div class="card narrow-sm text-center">
        <div class="success-ic">${I.check({ s: 34 })}</div>
        <h1 style="margin-top:1.25rem;font-size:1.5rem;font-weight:800;color:#fff">Your hunt is live</h1>
        <p style="margin-top:.75rem;font-size:.875rem;color:#94a3b8">We're now watching for <strong style="color:#e2e8f0">${esc(f.item)}</strong>. You won't be charged anything until we secure it. We'll email <strong style="color:#e2e8f0">${esc(f.email)}</strong> the moment there's news.</p>
        <div class="summary" style="margin-top:1.5rem;text-align:left">
          ${summaryRow('Item', esc(f.item))}
          ${summaryRow('Category', esc(f.category))}
          ${summaryRow('Price cap', '$' + Number(f.priceCap).toLocaleString())}
          ${summaryRow('Service fee (on success)', '$' + fee)}
          <div class="divider">${summaryRow('Charged today', '$0.00', true)}</div>
        </div>
        <div class="col sm-row mt-7">
          <button class="btn btn-ghost" id="reqReset">Start another hunt</button>
          <a href="#/" class="btn btn-primary">Back to home</a>
        </div>
      </div>
    </div>`
  }

  const stepsMeta = [[1, 'Item'], [2, 'Budget'], [3, 'Payment']]
  const stepper = `
    <div class="stepper">
      ${stepsMeta.map(([n, label], i) => `
        <div class="seg">
          <div class="flex" style="align-items:center;gap:.5rem">
            <span class="step-dot ${req.step > n ? 'done' : req.step === n ? 'current' : ''}">${req.step > n ? I.check({ s: 16 }) : n}</span>
            <span class="step-lab ${req.step >= n ? 'on' : ''}">${label}</span>
          </div>
          ${i < stepsMeta.length - 1 ? `<span class="step-line ${req.step > n ? 'done' : ''}"></span>` : ''}
        </div>`).join('')}
    </div>`

  let body = ''
  if (req.step === 1) {
    body = `
      <div class="space-y">
        <div>
          <label class="label">What are you looking for? *</label>
          <input class="input" data-field="item" placeholder="e.g. PlayStation 5 Pro, Disc Edition" value="${esc(f.item)}" autofocus />
        </div>
        <div>
          <label class="label">Product link (optional)</label>
          <input class="input" data-field="link" placeholder="https://retailer.com/product/..." value="${esc(f.link)}" />
          <p style="margin-top:.375rem;font-size:.75rem;color:#64748b">A link helps us lock onto the exact item, size, and color.</p>
        </div>
        <div>
          <label class="label">Category</label>
          <div class="cat-wrap">
            ${categories.map((c) => `<button type="button" class="cat-btn ${f.category === c ? 'sel' : ''}" data-cat="${c}">${c}</button>`).join('')}
          </div>
        </div>
        <div>
          <label class="label">Extra details (optional)</label>
          <textarea class="input" data-field="details" placeholder="Size, color, edition, region, or anything else that matters.">${esc(f.details)}</textarea>
        </div>
      </div>`
  } else if (req.step === 2) {
    const diffs = [['low', 'Restocks often', 'Usually in stock'], ['medium', 'Hard to get', 'Real competition'], ['high', 'Grail tier', 'Everyone wants it']]
    body = `
      <div class="space-y-6">
        <div>
          <label class="label">Maximum price you'll pay for the item *</label>
          <div class="input-prefix"><span class="sym">$</span><input class="input" type="number" min="0" data-field="priceCap" placeholder="499" value="${esc(f.priceCap)}" autofocus /></div>
          <p style="margin-top:.375rem;font-size:.75rem;color:#64748b">We will never purchase above this cap. This is the most the item itself can cost you.</p>
        </div>
        <div>
          <label class="label">How hard is this item to find?</label>
          <div class="diff-grid">
            ${diffs.map(([k, t, d]) => `<button type="button" class="diff-btn ${f.difficulty === k ? 'sel' : ''}" data-diff="${k}"><p class="t">${t}</p><p class="d">${d}</p></button>`).join('')}
          </div>
        </div>
        <div class="fee-preview">
          <div class="top"><span class="lab">${I.tag({ s: 16 })} Estimated service fee</span><span class="amt">$${fee}</span></div>
          <p class="note">Charged only if we secure the item, on top of the item price. Final fee is confirmed before any charge and never exceeds $100.</p>
        </div>
      </div>`
  } else {
    body = `
      <div class="space-y">
        <div class="form-grid-2">
          <div><label class="label">Full name *</label><input class="input" data-field="name" placeholder="Alex Morgan" value="${esc(f.name)}" /></div>
          <div><label class="label">Email *</label><input class="input" type="email" data-field="email" placeholder="you@email.com" value="${esc(f.email)}" /></div>
        </div>
        <div>
          <label class="label">Card number *</label>
          <div class="input-icon">${I.card({ s: 18 })}<input class="input" inputmode="numeric" data-field="card" placeholder="4242 4242 4242 4242" value="${esc(f.card)}" /></div>
        </div>
        <div class="form-grid-2">
          <div><label class="label">Expiry *</label><input class="input" data-field="exp" placeholder="MM/YY" value="${esc(f.exp)}" /></div>
          <div><label class="label">CVC *</label><input class="input" inputmode="numeric" data-field="cvc" placeholder="123" value="${esc(f.cvc)}" /></div>
        </div>
        <div class="reassure">
          ${I.lock({ s: 18, c: 'text-brand' })}
          <div style="font-size:.875rem;color:#cbd5e1">
            <p class="ttl">A $0.00 hold today.</p>
            <p class="sub">We securely save your card but <strong style="color:#e2e8f0">do not charge it now</strong>. You're only charged the item price plus the $${fee} service fee if and when we land it.</p>
          </div>
        </div>
        <div class="summary">
          ${summaryRow('Item', f.item ? esc(f.item) : '—')}
          ${summaryRow('Price cap', f.priceCap ? '$' + Number(f.priceCap).toLocaleString() : '—')}
          ${summaryRow('Service fee (if found)', '$' + fee)}
          <div class="divider">${summaryRow('Due today', '$0.00', true)}</div>
        </div>
      </div>`
  }

  const nextLabel = req.step < 3 ? `Continue ${I.arrow({ s: 18 })}` : 'Start the hunt — $0 today'

  return `
  <div class="container-x section" style="padding-top:4rem">
    <div class="narrow">
      <div class="req-head">
        <span class="chip chip-brand">${I.shield({ s: 14 })} You won't be charged unless we find it</span>
        <h1>Start a request</h1>
        <p>Tell us what to hunt. It takes about two minutes.</p>
      </div>
      ${stepper}
      <div class="card" style="margin-top:2rem">
        ${body}
        <div class="form-nav">
          ${req.step > 1 ? '<button class="btn btn-ghost" id="reqBack">Back</button>' : '<span></span>'}
          <button class="btn btn-primary" id="reqNext" ${canNext() ? '' : 'disabled'}>${nextLabel}</button>
        </div>
      </div>
      <p class="fine">By starting a hunt you authorize Hunt to charge the item price plus the agreed service fee ($0–$100) only upon a successful find. Cancel anytime before then at no cost.</p>
    </div>
  </div>`
}

function pageNotFound() {
  return `<div class="container-x nf"><p class="big">404</p><h1>Page not found</h1><p>The page you're hunting for isn't here.</p><a href="#/" class="btn btn-primary mt-6">Back to home</a></div>`
}

// ---------- router ----------
function currentRoute() {
  const h = location.hash.replace(/^#/, '')
  return h || '/'
}

const routes = {
  '/': pageHome,
  '/how-it-works': pageHowItWorks,
  '/pricing': pagePricing,
  '/faq': pageFAQ,
  '/request': pageRequest,
}

function render() {
  const route = currentRoute()
  const page = routes[route] || pageNotFound
  document.getElementById('app').innerHTML = `${navbar()}<main>${page()}</main>${footer()}`
  bindEvents(route)
}

function bindEvents(route) {
  // mobile menu
  const toggle = document.getElementById('navToggle')
  const menu = document.getElementById('mobileMenu')
  if (toggle && menu) toggle.addEventListener('click', () => menu.classList.toggle('hidden'))

  if (route === '/faq') {
    document.querySelectorAll('[data-faq]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const i = Number(btn.getAttribute('data-faq'))
        faqOpen = faqOpen === i ? -1 : i
        render()
      })
    })
  }

  if (route === '/request') bindRequest()
}

function bindRequest() {
  if (req.submitted) {
    const reset = document.getElementById('reqReset')
    if (reset) reset.addEventListener('click', () => {
      req.submitted = false
      req.step = 1
      req.form = { ...req.form, item: '', link: '', details: '', priceCap: '' }
      render()
    })
    return
  }

  // text/number inputs: update state without re-render (keeps focus), but refresh dependent bits
  document.querySelectorAll('[data-field]').forEach((el) => {
    el.addEventListener('input', (e) => {
      const field = el.getAttribute('data-field')
      let v = e.target.value
      if (field === 'card') {
        v = v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
        e.target.value = v
      } else if (field === 'exp') {
        v = v.replace(/\D/g, '').slice(0, 4)
        if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2)
        e.target.value = v
      } else if (field === 'cvc') {
        v = v.replace(/\D/g, '').slice(0, 4)
        e.target.value = v
      }
      req.form[field] = v
      refreshRequestDynamic()
    })
  })

  document.querySelectorAll('[data-cat]').forEach((b) =>
    b.addEventListener('click', () => { req.form.category = b.getAttribute('data-cat'); render() }))

  document.querySelectorAll('[data-diff]').forEach((b) =>
    b.addEventListener('click', () => { req.form.difficulty = b.getAttribute('data-diff'); render() }))

  const back = document.getElementById('reqBack')
  if (back) back.addEventListener('click', () => { req.step = Math.max(1, req.step - 1); render() })

  const next = document.getElementById('reqNext')
  if (next) next.addEventListener('click', () => {
    if (!canNext()) return
    if (req.step < 3) { req.step += 1; render(); window.scrollTo({ top: 0 }) }
    else { req.submitted = true; render(); window.scrollTo({ top: 0 }) }
  })
}

// update fee + enable/disable next button live without losing input focus
function refreshRequestDynamic() {
  const next = document.getElementById('reqNext')
  if (next) next.disabled = !canNext()
  const fee = estimateFee(req.form.priceCap, req.form.difficulty)
  const amt = document.querySelector('.fee-preview .amt')
  if (amt) amt.textContent = '$' + fee
}

window.addEventListener('hashchange', () => { window.scrollTo({ top: 0 }); render() })
window.addEventListener('DOMContentLoaded', () => { if (!location.hash) location.hash = '#/'; render() })
