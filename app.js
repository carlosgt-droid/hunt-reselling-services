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

// ---------- sample account data (mock) ----------
// Each hunt moves through: requested -> hunting -> secured -> charged -> shipped (or: not_found)
const hunts = [
  {
    id: 'HNT-20418', emoji: '🎮', item: 'Next-Gen Console — Disc Edition', category: 'Consoles',
    priceCap: 499, itemPrice: 499, fee: 35, status: 'shipped', difficulty: 'high',
    opened: 'Sep 28, 2026', updated: 'Oct 3, 2026', eta: 'Delivered Oct 5', tracking: '1Z-882-HNT-4410',
    stage: 5,
    events: [
      { label: 'Request received', note: 'We locked onto the exact model and set your $499 cap.', date: 'Sep 28', done: true },
      { label: 'Hunting', note: 'Monitoring 6 retailers and 3 verified sellers 24/7.', date: 'Sep 28', done: true },
      { label: 'Item secured', note: 'Grabbed one unit at retail during a surprise restock.', date: 'Oct 2', done: true },
      { label: 'Payment charged', note: 'Charged $534 (item $499 + $35 fee) to Visa •• 4242.', date: 'Oct 2', done: true },
      { label: 'Shipped', note: 'Out for delivery with tracking 1Z-882-HNT-4410.', date: 'Oct 3', done: true },
    ],
  },
  {
    id: 'HNT-20533', emoji: '👟', item: 'Limited Runner "Volt" — US 10.5', category: 'Sneakers',
    priceCap: 220, itemPrice: null, fee: 60, status: 'hunting', difficulty: 'high',
    opened: 'Oct 1, 2026', updated: 'Oct 5, 2026', eta: 'Next drop window ~Oct 8', tracking: null,
    stage: 2,
    events: [
      { label: 'Request received', note: 'Size US 10.5 locked. Hard cap set at $220.', date: 'Oct 1', done: true },
      { label: 'Hunting', note: 'Watching the next scheduled drop. High scalper activity detected.', date: 'Oct 1', done: true, active: true },
      { label: 'Item secured', note: 'Waiting for the next release window.', date: null, done: false },
      { label: 'Payment charged', note: 'You are only charged once we secure it.', date: null, done: false },
      { label: 'Shipped', note: '', date: null, done: false },
    ],
  },
  {
    id: 'HNT-20571', emoji: '🖥️', item: 'RTX Founders GPU', category: 'GPUs',
    priceCap: 1099, itemPrice: 1099, fee: 45, status: 'secured', difficulty: 'high',
    opened: 'Oct 2, 2026', updated: 'Oct 5, 2026', eta: 'Charging + shipping shortly', tracking: null,
    stage: 3,
    events: [
      { label: 'Request received', note: 'Founders edition only. Cap $1,099.', date: 'Oct 2', done: true },
      { label: 'Hunting', note: 'Caught a restock alert within 40 seconds.', date: 'Oct 2', done: true },
      { label: 'Item secured', note: 'Reserved one unit at MSRP. Confirming your charge next.', date: 'Oct 5', done: true, active: true },
      { label: 'Payment charged', note: 'About to charge $1,144 (item $1,099 + $45 fee).', date: null, done: false },
      { label: 'Shipped', note: '', date: null, done: false },
    ],
  },
  {
    id: 'HNT-20244', emoji: '🎟️', item: 'Arena Tour — 2x Floor Seats', category: 'Event tickets',
    priceCap: 400, itemPrice: null, fee: 0, status: 'not_found', difficulty: 'medium',
    opened: 'Sep 20, 2026', updated: 'Sep 27, 2026', eta: 'Closed — no charge', tracking: null,
    stage: 1,
    events: [
      { label: 'Request received', note: 'Two floor seats, cap $400 total.', date: 'Sep 20', done: true },
      { label: 'Hunting', note: 'Event sold out; no verified seats appeared under your cap.', date: 'Sep 20', done: true },
      { label: 'Closed — not found', note: 'We could not secure it under your cap, so you were charged $0.', date: 'Sep 27', done: true, failed: true },
    ],
  },
]

const account = {
  name: 'Alex Morgan',
  email: 'alex.morgan@email.com',
  memberSince: 'Member since 2025',
  card: { brand: 'Visa', last4: '4242', exp: '08/28' },
}

// ---------- mock auth session (demo only — no real authentication) ----------
const session = { loggedIn: false, mode: 'login', redirect: '#/dashboard' }

const statusMeta = {
  requested: { label: 'Requested', cls: 'st-blue' },
  hunting: { label: 'Hunting', cls: 'st-amber' },
  secured: { label: 'Secured', cls: 'st-violet' },
  charged: { label: 'Charged', cls: 'st-green' },
  shipped: { label: 'Shipped', cls: 'st-green' },
  not_found: { label: 'Not found · $0', cls: 'st-gray' },
}

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
  grid: (p={}) => `${I._s(p)}<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>`,
  truck: (p={}) => `${I._s(p)}<path d="M3 6.5h11v9H3z"/><path d="M14 9.5h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/></svg>`,
  mail: (p={}) => `${I._s(p)}<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>`,
  chat: (p={}) => `${I._s(p)}<path d="M4 5h16v11H9l-4 3v-3H4z"/></svg>`,
  doc: (p={}) => `${I._s(p)}<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 13h6M9 16h6"/></svg>`,
  globe: (p={}) => `${I._s(p)}<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>`,
}

const esc = (s) => { const d = document.createElement('div'); d.textContent = String(s); return d.innerHTML }

// ---------- shared chrome ----------
function navbar() {
  const links = [['#/how-it-works', 'How it works'], ['#/pricing', 'Pricing'], ['#/dashboard', 'Dashboard'], ['#/faq', 'FAQ']]
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
        ${session.loggedIn
          ? `<a href="#/dashboard" class="nav-user">${I.users({ s: 15 })} ${esc(account.name.split(' ')[0])}</a>
             <button class="signin" id="navSignOut">Sign out</button>`
          : `<a href="#/login" class="signin">Sign in</a>`}
        <a href="#/request" class="btn btn-primary">Start a request</a>
      </div>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </nav>
    <div class="mobile-menu hidden" id="mobileMenu">
      <div class="container-x inner">
        ${links.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}
        ${session.loggedIn
          ? `<button class="mobile-signout" id="navSignOutMobile">Sign out</button>`
          : `<a href="#/login">Sign in</a>`}
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
          <li><a href="#/dashboard">My dashboard</a></li>
          <li><a href="#/track">Track an order</a></li>
          <li><a href="#/faq">FAQ</a></li>
        </ul>
      </div>
      <div>
        <h4>Trust</h4>
        <ul>
          <li><a href="#/guarantee">No-find, no-fee guarantee</a></li>
          <li><a href="#/secure-payments">Secure payments</a></li>
          <li><a href="#/buyer-protection">Buyer protection</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="#/about">About</a></li>
          <li><a href="#/contact">Contact</a></li>
          <li><a href="#/terms">Terms of Service</a></li>
          <li><a href="#/privacy">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container-x inner">
        <p>© ${year} Hunt. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#/terms">Terms</a>
          <a href="#/privacy">Privacy</a>
          <a href="#/contact">Contact</a>
        </div>
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

// ---------- dashboard + tracking ----------
function statusBadge(status) {
  const m = statusMeta[status] || { label: status, cls: 'st-gray' }
  return `<span class="status ${m.cls}">${m.label}</span>`
}

function money(n) {
  return '$' + Number(n).toLocaleString()
}

function huntRow(h) {
  const paid = h.itemPrice != null
  const total = paid ? h.itemPrice + h.fee : null
  return `
    <a href="#/track?id=${h.id}" class="hunt-row">
      <div class="hr-emoji">${h.emoji}</div>
      <div class="hr-main">
        <p class="hr-item">${esc(h.item)}</p>
        <p class="hr-meta">${h.id} · ${esc(h.category)} · opened ${h.opened}</p>
      </div>
      <div class="hr-side">
        ${statusBadge(h.status)}
        <p class="hr-amt">${total != null ? money(total) + ' charged' : 'Cap ' + money(h.priceCap)}</p>
      </div>
      <span class="hr-chevron">${I.arrow({ s: 18 })}</span>
    </a>`
}

// ---------- auth (mock) ----------
function pageLogin() {
  const isSignup = session.mode === 'signup'
  return `
  <div class="container-x section" style="padding-top:4rem">
    <div class="auth-wrap">
      <div class="auth-brand">
        <span class="logo-mark" style="height:2.75rem;width:2.75rem">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
        </span>
        <h1 class="auth-title">${isSignup ? 'Create your account' : 'Welcome back'}</h1>
        <p class="auth-sub">${isSignup ? 'Start hunting items you can\'t buy anywhere else.' : 'Sign in to track your hunts and manage your account.'}</p>
      </div>

      <div class="card auth-card">
        <form id="authForm" class="space-y">
          ${isSignup ? `
          <div>
            <label class="label">Full name</label>
            <input class="input" id="authName" placeholder="Alex Morgan" value="Alex Morgan" />
          </div>` : ''}
          <div>
            <label class="label">Email</label>
            <input class="input" id="authEmail" type="email" placeholder="you@email.com" value="alex.morgan@email.com" />
          </div>
          <div>
            <label class="label">Password</label>
            <input class="input" id="authPass" type="password" placeholder="••••••••" value="demopass" />
            ${!isSignup ? '<p style="margin-top:.375rem;font-size:.75rem"><a href="#/login" class="link">Forgot password?</a></p>' : ''}
          </div>
          <p class="auth-error hidden" id="authError"></p>
          <button type="submit" class="btn btn-primary" style="width:100%">
            ${isSignup ? 'Create account' : 'Sign in'} ${I.arrow({ s: 18 })}
          </button>
        </form>

        <div class="auth-divider"><span>or</span></div>
        <button class="btn btn-ghost" style="width:100%" id="authDemo">${I.bolt({ s: 16 })} Continue with demo account</button>

        <p class="auth-switch">
          ${isSignup
            ? `Already have an account? <a href="#" data-authmode="login" class="link">Sign in</a>`
            : `New to Hunt? <a href="#" data-authmode="signup" class="link">Create an account</a>`}
        </p>
      </div>

      <p class="demo-note">${I.shield({ s: 13 })} Demo sign-in only — any email/password works and no real account is created.</p>
    </div>
  </div>`
}

function pageDashboard() {
  // mock auth guard: must be "logged in" to view the dashboard
  if (!session.loggedIn) {
    session.redirect = '#/dashboard'
    return pageLogin()
  }
  const active = hunts.filter((h) => ['requested', 'hunting', 'secured'].includes(h.status))
  const past = hunts.filter((h) => ['charged', 'shipped', 'not_found'].includes(h.status))
  const secured = hunts.filter((h) => h.itemPrice != null)
  const totalSpent = secured.reduce((s, h) => s + h.itemPrice + h.fee, 0)
  const totalFees = secured.reduce((s, h) => s + h.fee, 0)

  const summary = [
    { icon: 'search', value: active.length, label: 'Active hunts' },
    { icon: 'package', value: secured.length, label: 'Items secured' },
    { icon: 'card', value: money(totalSpent), label: 'Total spent' },
    { icon: 'tag', value: money(totalFees), label: 'Service fees paid' },
  ]

  return `
  <div class="container-x section" style="padding-top:2.5rem">
    <div class="dash-head">
      <div class="flex" style="align-items:center;gap:1rem">
        <span class="avatar lg">${account.name.charAt(0)}</span>
        <div>
          <h1 class="dash-title">Welcome back, ${esc(account.name.split(' ')[0])}</h1>
          <p class="dash-sub">${esc(account.email)} · ${account.memberSince}</p>
        </div>
      </div>
      <a href="#/request" class="btn btn-primary">${I.plus({ s: 16 })} New hunt</a>
    </div>

    <div class="grid dash-stats">
      ${summary.map((s) => `
        <div class="card dash-stat">
          <div class="icon-box sm">${I[s.icon]({ s: 18 })}</div>
          <div><p class="ds-val">${s.value}</p><p class="ds-lab">${s.label}</p></div>
        </div>`).join('')}
    </div>

    <div class="dash-grid">
      <div class="dash-col-main">
        <h2 class="dash-section-title">Active hunts</h2>
        ${active.length ? `<div class="hunt-list">${active.map(huntRow).join('')}</div>`
          : `<div class="card empty">No active hunts right now. <a href="#/request" class="link">Start one →</a></div>`}

        <h2 class="dash-section-title" style="margin-top:2.5rem">History</h2>
        ${past.length ? `<div class="hunt-list">${past.map(huntRow).join('')}</div>`
          : `<div class="card empty">Nothing here yet.</div>`}
      </div>

      <aside class="dash-col-side">
        <div class="card">
          <h3 class="side-title">Payment method</h3>
          <div class="pay-card">
            <div class="pay-top">
              <span class="pay-brand">${account.card.brand}</span>
              ${I.card({ s: 20 })}
            </div>
            <p class="pay-num">•••• •••• •••• ${account.card.last4}</p>
            <p class="pay-exp">Expires ${account.card.exp}</p>
          </div>
          <p class="side-note">${I.lock({ s: 13 })} Charged only when a hunt succeeds.</p>
          <button class="btn btn-ghost" style="width:100%;margin-top:.75rem" disabled>Update card</button>
        </div>

        <div class="card" style="margin-top:1.5rem">
          <h3 class="side-title">The guarantee</h3>
          <ul class="side-list">
            <li>${I.check({ s: 15, c: 'text-brand' })} No find, no fee — ever.</li>
            <li>${I.check({ s: 15, c: 'text-brand' })} You set a hard price cap.</li>
            <li>${I.check({ s: 15, c: 'text-brand' })} Fee shown before any charge.</li>
          </ul>
        </div>
      </aside>
    </div>

    <p class="demo-note">${I.shield({ s: 13 })} This dashboard is a demo with sample data — no real account or payments yet.</p>
  </div>`
}

function findHunt(id) {
  return hunts.find((h) => h.id === id)
}

function pageTrack() {
  // read ?id= from the hash
  const q = (location.hash.split('?')[1] || '')
  const params = new URLSearchParams(q)
  const id = params.get('id')
  const hunt = id ? findHunt(id) : null

  // No id (or not found): show a lookup form + quick-pick list
  if (!hunt) {
    return `
    <div class="container-x section" style="padding-top:4rem">
      <div class="narrow">
        <div class="req-head">
          <span class="chip chip-brand">${I.truck({ s: 14 })} Track my hunt</span>
          <h1>Where's my item?</h1>
          <p>Enter your hunt ID to see live status, or pick a recent one below.</p>
        </div>
        <div class="card" style="margin-top:2rem">
          <label class="label">Hunt ID</label>
          <div class="input-icon">${I.search({ s: 18 })}<input class="input" id="trackInput" placeholder="e.g. HNT-20418" /></div>
          <button class="btn btn-primary" id="trackGo" style="width:100%;margin-top:1rem">Track hunt ${I.arrow({ s: 18 })}</button>
          ${id ? `<p class="track-error">No hunt found with ID "${esc(id)}". Check the ID and try again.</p>` : ''}
        </div>
        <h2 class="dash-section-title" style="margin-top:2.5rem">Your recent hunts</h2>
        <div class="hunt-list">${hunts.map(huntRow).join('')}</div>
      </div>
    </div>`
  }

  const paid = hunt.itemPrice != null
  const total = paid ? hunt.itemPrice + hunt.fee : null
  const totalStages = hunt.status === 'not_found' ? 1 : 5
  const pct = Math.round((hunt.stage / totalStages) * 100)

  return `
  <div class="container-x section" style="padding-top:2.5rem">
    <div class="narrow">
      <a href="#/dashboard" class="back-link">${I.arrow({ s: 16, c: 'flip' })} Back to dashboard</a>

      <div class="card track-head" style="margin-top:1rem">
        <div class="th-top">
          <div class="flex" style="align-items:center;gap:1rem">
            <div class="hr-emoji lg">${hunt.emoji}</div>
            <div>
              <h1 class="track-item">${esc(hunt.item)}</h1>
              <p class="hr-meta">${hunt.id} · ${esc(hunt.category)}</p>
            </div>
          </div>
          ${statusBadge(hunt.status)}
        </div>

        ${hunt.status !== 'not_found' ? `
          <div class="progress-wrap">
            <div class="progress-bar"><span style="width:${pct}%"></span></div>
            <p class="progress-eta">${esc(hunt.eta)}</p>
          </div>` : `
          <div class="track-closed">${I.shield({ s: 16 })} This hunt closed without a find — <strong>you were charged $0</strong>.</div>`}

        <div class="track-facts">
          <div><span class="tf-k">Price cap</span><span class="tf-v">${money(hunt.priceCap)}</span></div>
          <div><span class="tf-k">Service fee</span><span class="tf-v">${hunt.fee === 0 ? '$0' : money(hunt.fee)}</span></div>
          <div><span class="tf-k">${paid ? 'Total charged' : 'Charged so far'}</span><span class="tf-v ${paid ? 'accent' : ''}">${total != null ? money(total) : '$0.00'}</span></div>
          <div><span class="tf-k">Tracking #</span><span class="tf-v">${hunt.tracking ? esc(hunt.tracking) : '—'}</span></div>
        </div>
      </div>

      <h2 class="dash-section-title" style="margin-top:2rem">Hunt timeline</h2>
      <ol class="track-timeline">
        ${hunt.events.map((e) => `
          <li class="te ${e.done ? (e.failed ? 'failed' : 'done') : 'todo'} ${e.active ? 'active' : ''}">
            <span class="te-dot">${e.failed ? '!' : e.done ? I.check({ s: 13 }) : '<span class="te-pip"></span>'}</span>
            <div class="te-body">
              <div class="te-head">
                <span class="te-label">${esc(e.label)}</span>
                ${e.date ? `<span class="te-date">${esc(e.date)}</span>` : ''}
              </div>
              ${e.note ? `<p class="te-note">${esc(e.note)}</p>` : ''}
            </div>
          </li>`).join('')}
      </ol>

      <p class="demo-note">${I.shield({ s: 13 })} Sample tracking data for demonstration — not a live order.</p>
    </div>
  </div>`
}

function pageNotFound() {
  return `<div class="container-x nf"><p class="big">404</p><h1>Page not found</h1><p>The page you're hunting for isn't here.</p><a href="#/" class="btn btn-primary mt-6">Back to home</a></div>`
}

// ---------- about ----------
function pageAbout() {
  const values = [
    { icon: 'shield', title: 'Fair, not predatory', desc: 'We buy at or near retail and charge a small, transparent service fee — the opposite of scalping. The goal is to get real people the real item.' },
    { icon: 'bolt', title: 'Fast where it counts', desc: 'Monitoring and sourcing that react in seconds, because the difference between getting an item and missing it is often measured in moments.' },
    { icon: 'users', title: 'Humans behind the tech', desc: 'Automation finds the openings; a real sourcing team verifies authenticity and condition before anything ships to you.' },
  ]
  const stats2 = [
    { value: '38k+', label: 'Items secured' },
    { value: '94%', label: 'Hunt success rate' },
    { value: '$0', label: 'Charged if not found' },
  ]
  return `
  <div class="container-x section" style="padding-top:4rem">
    ${sectionHead({ eyebrow: 'About Hunt', title: 'We get people the items they can\'t buy', subtitle: 'Stock shortages and scalper bots turned buying popular things into a lottery. We built Hunt to fix that — a sourcing service that only wins when you do.' })}

    <div class="about-story card">
      <p>Hunt started from a simple frustration: wanting something that was technically on sale somewhere, at a fair price, but impossible to actually get. Sold out in seconds. Snapped up by bots. Flipped at double the price.</p>
      <p>So we flipped the model. Instead of racing the scalpers yourself, you tell us what you want and set a price cap. We watch the restocks, drops, and verified sellers around the clock, and when we land it, we charge you the item price plus a small service fee. If we can't get it, you pay nothing. No risk, no games.</p>
    </div>

    <div class="grid info-points">
      ${values.map((v) => `
        <div class="card info-point">
          <div class="icon-box grad sm">${I[v.icon]({ s: 20 })}</div>
          <h3>${v.title}</h3>
          <p class="desc">${v.desc}</p>
        </div>`).join('')}
    </div>

    <div class="grid stats" style="margin-top:3rem">
      ${stats2.map((s) => `<div class="card"><p class="val">${s.value}</p><p class="lab">${s.label}</p></div>`).join('')}
    </div>

    <div class="cta" style="margin-top:3.5rem">
      <div class="blob a"></div><div class="blob b"></div>
      <h2>Let us catch the one you keep missing.</h2>
      <p>Start a request in under two minutes — you won't be charged unless we land it.</p>
      <div style="position:relative;margin-top:2rem;display:flex;justify-content:center;gap:.75rem;flex-wrap:wrap">
        <a href="#/request" class="btn btn-primary btn-lg">Start a request ${I.arrow({ s: 18 })}</a>
        <a href="#/contact" class="btn btn-ghost btn-lg">Contact us</a>
      </div>
    </div>
  </div>`
}

// ---------- contact (stateful form) ----------
const contact = { submitted: false, form: { name: '', email: '', topic: 'General question', message: '' } }

function pageContact() {
  if (contact.submitted) {
    return `
    <div class="container-x section" style="padding-top:6rem">
      <div class="card narrow-sm text-center">
        <div class="success-ic">${I.check({ s: 34 })}</div>
        <h1 style="margin-top:1.25rem;font-size:1.5rem;font-weight:800;color:#fff">Message sent</h1>
        <p style="margin-top:.75rem;font-size:.875rem;color:#94a3b8">Thanks, ${esc(contact.form.name || 'there')}! Our team will reply to <strong style="color:#e2e8f0">${esc(contact.form.email)}</strong> within one business day.</p>
        <div class="col sm-row mt-7">
          <button class="btn btn-ghost" id="contactReset">Send another</button>
          <a href="#/" class="btn btn-primary">Back to home</a>
        </div>
      </div>
    </div>`
  }

  const f = contact.form
  const topics = ['General question', 'Help with a hunt', 'Billing', 'Partnerships', 'Press']
  const methods = [
    { icon: 'mail', title: 'Email us', value: 'support@hunt.example', note: 'Replies within 1 business day' },
    { icon: 'chat', title: 'Live chat', value: 'In-app (coming soon)', note: 'Mon–Fri, 9am–6pm' },
    { icon: 'globe', title: 'Help center', value: 'Browse the FAQ', note: 'Answers to common questions', link: '#/faq' },
  ]

  return `
  <div class="container-x section" style="padding-top:4rem">
    ${sectionHead({ eyebrow: 'Contact', title: 'Get in touch', subtitle: "Questions about a hunt, billing, or partnerships? Send us a message and we'll get back to you fast." })}

    <div class="contact-grid">
      <div class="card contact-form-card">
        <form id="contactForm" class="space-y">
          <div class="form-grid-2">
            <div><label class="label">Name</label><input class="input" id="cName" placeholder="Alex Morgan" value="${esc(f.name)}" /></div>
            <div><label class="label">Email *</label><input class="input" id="cEmail" type="email" placeholder="you@email.com" value="${esc(f.email)}" /></div>
          </div>
          <div>
            <label class="label">Topic</label>
            <div class="cat-wrap">
              ${topics.map((t) => `<button type="button" class="cat-btn ${f.topic === t ? 'sel' : ''}" data-topic="${t}">${t}</button>`).join('')}
            </div>
          </div>
          <div>
            <label class="label">Message *</label>
            <textarea class="input" id="cMessage" placeholder="How can we help?">${esc(f.message)}</textarea>
          </div>
          <p class="auth-error hidden" id="cError"></p>
          <button type="submit" class="btn btn-primary" style="width:100%">Send message ${I.arrow({ s: 18 })}</button>
        </form>
      </div>

      <aside class="contact-side">
        ${methods.map((m) => `
          ${m.link ? `<a href="${m.link}" class="card contact-method">` : `<div class="card contact-method">`}
            <div class="icon-box grad sm">${I[m.icon]({ s: 18 })}</div>
            <div>
              <p class="cm-title">${m.title}</p>
              <p class="cm-value">${m.value}</p>
              <p class="cm-note">${m.note}</p>
            </div>
          ${m.link ? `</a>` : `</div>`}`).join('')}
      </aside>
    </div>

    <p class="demo-note">${I.shield({ s: 13 })} Demo contact form — messages aren't actually sent yet.</p>
  </div>`
}

// ---------- legal pages (terms / privacy) ----------
function legalPage({ title, updated, intro, sections }) {
  return `
  <div class="container-x section" style="padding-top:4rem">
    <div class="legal">
      <h1 class="legal-title">${title}</h1>
      <p class="legal-updated">Last updated: ${updated}</p>
      <p class="legal-intro">${intro}</p>
      ${sections.map((s, i) => `
        <section class="legal-section">
          <h2>${i + 1}. ${s.h}</h2>
          <p>${s.p}</p>
        </section>`).join('')}
      <div class="legal-disclaimer">
        ${I.shield({ s: 15 })}
        <span>This is sample/template content for a prototype, not legal advice. Before launching a real service, have a qualified attorney review and finalize these terms.</span>
      </div>
    </div>
  </div>`
}

function pageTerms() {
  return legalPage({
    title: 'Terms of Service',
    updated: 'October 2026',
    intro: 'These terms govern your use of Hunt (the "Service"). By creating a request or using the site, you agree to them. Please read them carefully.',
    sections: [
      { h: 'The service we provide', p: 'Hunt is a personal shopping and sourcing service. You tell us what item you want and set a maximum price; we attempt to purchase it on your behalf at or near retail from authorized retailers and verified sellers.' },
      { h: 'Charges and the service fee', p: 'You are only charged if we successfully secure your item. When we do, we charge your saved payment method for the item price plus a one-time service fee between $0 and $100, shown and approved before the hunt begins. If we do not secure the item, you are not charged.' },
      { h: 'Your price cap', p: 'Every request includes a hard maximum price. We will not purchase an item above the cap you set. You are responsible for providing accurate item details (model, size, color, edition).' },
      { h: 'Cancellations', p: 'You may cancel a pending hunt at any time before we secure the item, at no cost. Once an item is secured and charged, standard buyer-protection and refund terms apply.' },
      { h: 'Buyer protection and refunds', p: 'If an item arrives not as described, damaged, or inauthentic, we will work to replace it or refund the item cost and the service fee, subject to our Buyer Protection policy.' },
      { h: 'Acceptable use', p: 'You agree not to use the Service for any unlawful purpose, to request prohibited or illegal items, or to attempt to defraud Hunt, retailers, or sellers.' },
      { h: 'Limitation of liability', p: 'The Service is provided on an "as is" basis. To the maximum extent permitted by law, Hunt is not liable for indirect or consequential damages arising from use of the Service.' },
      { h: 'Changes to these terms', p: 'We may update these terms from time to time. Material changes will be communicated, and continued use of the Service after changes take effect constitutes acceptance.' },
    ],
  })
}

function pagePrivacy() {
  return legalPage({
    title: 'Privacy Policy',
    updated: 'October 2026',
    intro: 'This policy explains what information Hunt collects, how we use it, and the choices you have. We aim to collect only what we need to run the Service.',
    sections: [
      { h: 'Information we collect', p: 'Account details (name, email), the items and price caps you request, and communications with our team. Payment details are collected and processed by our payment provider — we do not store raw card numbers.' },
      { h: 'How we use your information', p: 'To source and purchase items on your behalf, to charge you only upon a successful find, to provide support, and to improve the Service. We do not sell your personal information.' },
      { h: 'Payment data', p: 'Card information is encrypted and tokenized by a PCI-compliant payment processor. Hunt retains only a secure token reference needed to charge you when a hunt succeeds.' },
      { h: 'Data sharing', p: 'We share only what is necessary with payment processors, shipping carriers, and verified sellers to complete your orders. We may disclose information if required by law.' },
      { h: 'Data retention', p: 'We keep your information for as long as your account is active or as needed to provide the Service and meet legal obligations. You may request deletion of your account data.' },
      { h: 'Your rights', p: 'Depending on where you live, you may have rights to access, correct, export, or delete your personal data. Contact us to exercise these rights.' },
      { h: 'Cookies', p: 'We use essential cookies to keep you signed in and to understand how the site is used. You can control cookies through your browser settings.' },
      { h: 'Contact', p: 'For privacy questions or requests, reach us through the Contact page.' },
    ],
  })
}

// ---------- trust / info pages ----------
// Shared renderer for a focused single-topic page.
function infoPage({ eyebrow, title, subtitle, points, how, faqs: pageFaqs, ctaTitle }) {
  return `
  <div class="container-x section" style="padding-top:4rem">
    ${sectionHead({ eyebrow, title, subtitle })}

    <div class="grid info-points">
      ${points.map((p) => `
        <div class="card info-point">
          <div class="icon-box grad sm">${I[p.icon]({ s: 20 })}</div>
          <h3>${p.title}</h3>
          <p class="desc">${p.desc}</p>
        </div>`).join('')}
    </div>

    ${how ? `
    <div class="callout" style="margin-top:3rem">
      <h3>${I.check({ s: 20, c: 'text-brand' })} ${how.title}</h3>
      <ul>${how.items.map((t) => `<li>${I.check({ s: 18, c: 'text-brand' })} ${t}</li>`).join('')}</ul>
    </div>` : ''}

    ${pageFaqs ? `
    <div class="info-faqs">
      <h2 class="dash-section-title" style="text-align:center;margin-bottom:1.25rem">Good to know</h2>
      ${pageFaqs.map((f) => `
        <div class="info-qa card">
          <p class="iq">${f.q}</p>
          <p class="ia">${f.a}</p>
        </div>`).join('')}
    </div>` : ''}

    <div class="cta" style="margin-top:3.5rem">
      <div class="blob a"></div><div class="blob b"></div>
      <h2>${ctaTitle || "Ready when you are."}</h2>
      <p>Start a request in under two minutes — you won't be charged unless we land it.</p>
      <div style="position:relative;margin-top:2rem;display:flex;justify-content:center;gap:.75rem;flex-wrap:wrap">
        <a href="#/request" class="btn btn-primary btn-lg">Start a request ${I.arrow({ s: 18 })}</a>
        <a href="#/faq" class="btn btn-ghost btn-lg">See all FAQs</a>
      </div>
    </div>
  </div>`
}

function pageGuarantee() {
  return infoPage({
    eyebrow: 'Our promise',
    title: 'The no-find, no-fee guarantee',
    subtitle: "It's simple: your card is never charged unless we actually get the item into our hands. No luck, no risk, no catch.",
    points: [
      { icon: 'shield', title: 'Charged only on success', desc: 'The moment we secure your item is the only moment your payment method is ever charged — item price plus the agreed service fee.' },
      { icon: 'card', title: 'No find = no charge', desc: "If we can't track it down, you pay nothing. There's no cancellation fee and no charge for the attempt. Ever." },
      { icon: 'tag', title: 'You set a hard price cap', desc: 'We will never buy above the maximum price you set. The service fee ($0–$100) is shown and approved before the hunt begins.' },
    ],
    how: {
      title: 'The guarantee in plain terms',
      items: [
        'You are never charged until the item is physically secured.',
        'If we never find it, there is no charge and no cancellation fee.',
        'You set a hard price cap — we never buy above it.',
        'The service fee ($0–$100) is shown and approved before the hunt begins.',
        'Cancel a pending hunt anytime, at no cost.',
      ],
    },
    faqs: [
      { q: 'When exactly am I charged?', a: "Only after we successfully secure your item — the item's price plus a one-time service fee between $0 and $100. If we never find it, you're never charged a cent." },
      { q: 'What if I change my mind mid-hunt?', a: 'You can cancel any pending hunt before we secure the item, completely free. Since nothing has been charged, there is nothing to refund.' },
    ],
    ctaTitle: 'Zero risk. Start a hunt.',
  })
}

function pageSecurePayments() {
  return infoPage({
    eyebrow: 'Payments',
    title: 'Secure payments, by design',
    subtitle: 'Your payment details are protected with bank-grade encryption, and your card is only ever charged for a successful find.',
    points: [
      { icon: 'lock', title: 'Encrypted & tokenized', desc: 'Card details are encrypted and tokenized by our payment provider. We never see or store your raw card number.' },
      { icon: 'shield', title: 'No charge up front', desc: 'Saving a card places a $0.00 hold — not a payment. You are only charged if and when we land your item.' },
      { icon: 'tag', title: 'Transparent totals', desc: 'You approve the item price and the service fee before any charge. No surprise markups, no hidden costs.' },
    ],
    how: {
      title: 'How we keep payments safe',
      items: [
        'Card data is handled by a PCI-compliant payment processor, not stored on our servers.',
        'Every charge maps to a specific secured item you requested.',
        'A hard price cap means we can never charge above what you approved.',
        'Clear receipts show the item price and the service fee separately.',
      ],
    },
    faqs: [
      { q: 'Do you store my card number?', a: 'No. Your card is tokenized by our payment provider. We keep only a secure reference, never the raw number.' },
      { q: 'Will I be charged when I sign up a card?', a: 'No. Adding a card is a $0.00 authorization, not a charge. Money only moves when we successfully secure an item for you.' },
    ],
    ctaTitle: 'Pay only when we win.',
  })
}

function pageBuyerProtection() {
  return infoPage({
    eyebrow: 'Buyer protection',
    title: 'Covered from hunt to doorstep',
    subtitle: "If something isn't right with an item we secured for you, we make it right — a replacement or a full refund of the item and the service fee.",
    points: [
      { icon: 'package', title: 'Arrives as described', desc: 'We verify authenticity and condition before anything ships. If an item arrives not as described, you are covered.' },
      { icon: 'shield', title: 'Replace or refund', desc: 'For a covered issue, we work to source a replacement or fully refund the item cost and the service fee.' },
      { icon: 'users', title: 'Real humans to help', desc: 'A sourcing team stands behind every order to resolve problems quickly, without the runaround.' },
    ],
    how: {
      title: "What buyer protection covers",
      items: [
        'Items that arrive damaged or not as described.',
        'Wrong size, color, edition, or model versus what you requested.',
        'Authenticity concerns on verified-seller purchases.',
        'A full refund of the item cost and service fee when we can\'t make it right.',
      ],
    },
    faqs: [
      { q: 'What if my item arrives damaged?', a: 'Contact us and we\'ll work to replace it or fully refund the item cost and the service fee. We verify condition before shipping to minimize this.' },
      { q: 'How long do I have to report an issue?', a: 'Reach out as soon as your item arrives. The sooner we know, the faster we can source a replacement or process a refund.' },
    ],
    ctaTitle: 'Shop hard-to-get items with confidence.',
  })
}

// ---------- router ----------
function currentRoute() {
  const h = location.hash.replace(/^#/, '').split('?')[0]
  return h || '/'
}

const routes = {
  '/': pageHome,
  '/how-it-works': pageHowItWorks,
  '/pricing': pagePricing,
  '/faq': pageFAQ,
  '/request': pageRequest,
  '/login': pageLogin,
  '/dashboard': pageDashboard,
  '/track': pageTrack,
  '/guarantee': pageGuarantee,
  '/secure-payments': pageSecurePayments,
  '/buyer-protection': pageBuyerProtection,
  '/about': pageAbout,
  '/contact': pageContact,
  '/terms': pageTerms,
  '/privacy': pagePrivacy,
}

function render() {
  const route = currentRoute()
  const page = routes[route] || pageNotFound
  document.getElementById('app').innerHTML = `${navbar()}<main>${page()}</main>${footer()}`
  bindEvents(route)
}

function signOut() {
  session.loggedIn = false
  location.hash = '#/'
  render()
}

function bindEvents(route) {
  // mobile menu
  const toggle = document.getElementById('navToggle')
  const menu = document.getElementById('mobileMenu')
  if (toggle && menu) toggle.addEventListener('click', () => menu.classList.toggle('hidden'))

  // sign out (nav, both desktop + mobile)
  const so = document.getElementById('navSignOut')
  if (so) so.addEventListener('click', signOut)
  const soM = document.getElementById('navSignOutMobile')
  if (soM) soM.addEventListener('click', signOut)

  if (route === '/login') bindAuth()

  if (route === '/contact') bindContact()

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

  if (route === '/track') {
    const input = document.getElementById('trackInput')
    const go = document.getElementById('trackGo')
    if (go && input) {
      const submit = () => {
        const val = input.value.trim().toUpperCase()
        if (val) location.hash = '#/track?id=' + encodeURIComponent(val)
      }
      go.addEventListener('click', submit)
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit() })
    }
  }
}

function bindContact() {
  if (contact.submitted) {
    const reset = document.getElementById('contactReset')
    if (reset) reset.addEventListener('click', () => {
      contact.submitted = false
      contact.form = { name: '', email: '', topic: 'General question', message: '' }
      render()
    })
    return
  }

  // topic chips
  document.querySelectorAll('[data-topic]').forEach((b) =>
    b.addEventListener('click', () => { contact.form.topic = b.getAttribute('data-topic'); render() }))

  // keep field values in state as the user types
  const bindField = (id, key) => {
    const el = document.getElementById(id)
    if (el) el.addEventListener('input', (e) => { contact.form[key] = e.target.value })
  }
  bindField('cName', 'name')
  bindField('cEmail', 'email')
  bindField('cMessage', 'message')

  const form = document.getElementById('contactForm')
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault()
    const err = document.getElementById('cError')
    const show = (msg) => { if (err) { err.textContent = msg; err.classList.remove('hidden') } }
    if (!contact.form.email.includes('@')) return show('Please enter a valid email address.')
    if (contact.form.message.trim().length < 5) return show('Please enter a short message.')
    contact.submitted = true
    render()
    window.scrollTo({ top: 0 })
  })
}

function bindAuth() {
  const isSignup = session.mode === 'signup'

  // switch between login / signup
  document.querySelectorAll('[data-authmode]').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault()
      session.mode = a.getAttribute('data-authmode')
      render()
    }))

  const complete = () => {
    session.loggedIn = true
    location.hash = session.redirect || '#/dashboard'
    render()
    window.scrollTo({ top: 0 })
  }

  // demo shortcut
  const demo = document.getElementById('authDemo')
  if (demo) demo.addEventListener('click', complete)

  // form submit (any input is accepted — this is a mock)
  const form = document.getElementById('authForm')
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = (document.getElementById('authEmail') || {}).value || ''
    const pass = (document.getElementById('authPass') || {}).value || ''
    const name = (document.getElementById('authName') || {}).value || ''
    const err = document.getElementById('authError')
    const show = (msg) => { if (err) { err.textContent = msg; err.classList.remove('hidden') } }

    if (!email.includes('@')) return show('Please enter a valid email address.')
    if (pass.length < 4) return show('Password must be at least 4 characters.')
    if (isSignup && name.trim().length < 2) return show('Please enter your name.')
    complete()
  })
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
