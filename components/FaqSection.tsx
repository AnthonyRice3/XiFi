'use client';

import { useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory =
  | 'Getting Started'
  | 'Proxies & Plans'
  | 'Proxy Manager'
  | 'Billing'
  | 'Security & Privacy'
  | 'Support';

const faqData: Record<FaqCategory, FaqItem[]> = {
  'Getting Started': [
    {
      question: 'What is ProXiFi?',
      answer:
        'ProXiFi is an enterprise-grade mobile proxy platform. We provide dedicated 4G/5G mobile proxy IP addresses hosted on real SIM cards, alongside a cloud-based Proxy Manager to route, rotate, and monitor all your traffic from a single dashboard.',
    },
    {
      question: 'How do I get started?',
      answer:
        'Sign up at proxifi.net, choose a proxy plan that fits your needs, and complete checkout. Your proxy credentials will be emailed to you instantly and available inside your Dashboard under "My Proxies." Most users are live within 5 minutes.',
    },
    {
      question: 'Do I need any technical experience?',
      answer:
        'No. Our Dashboard and Proxy Manager are designed for both technical teams and non-technical users. We provide step-by-step setup guides for every major browser, scraping framework, and automation tool in our Docs.',
    },
    {
      question: 'What regions are your proxies located in?',
      answer:
        'Our proxies are currently available in the United States (multiple carriers including AT&T, T-Mobile, and Verizon) with UK and EU expansion in progress. You can filter by region and carrier inside the Proxy Manager.',
    },
    {
      question: 'Is there a free trial?',
      answer:
        'We offer a limited-time free trial on select plans. You can also book a demo and our team will walk you through the platform live before you commit.',
    },
  ],
  'Proxies & Plans': [
    {
      question: 'What types of proxies does ProXiFi offer?',
      answer:
        'We offer dedicated mobile proxies (4G/5G) running on real SIM cards, giving you a genuine residential mobile IP that rotates on demand. These are the highest-trust IPs available â€” ideal for ad verification, social media automation, and web scraping.',
    },
    {
      question: 'What is the difference between your proxy plans?',
      answer:
        'Plans differ by number of dedicated ports, GB of data/month, rotation controls, and support tier. Our Starter plan suits individual users; Growth suits small teams; Business and Enterprise plans include custom port counts, dedicated account managers, and SLA guarantees.',
    },
    {
      question: 'Can I rotate IP addresses?',
      answer:
        'Yes. You can rotate your IP on demand via an HTTP endpoint, on a schedule (e.g., every 30 minutes), or trigger it automatically after N requests â€” all configurable inside the Proxy Manager without touching your code.',
    },
    {
      question: 'Will my proxies be shared with other users?',
      answer:
        'No. All ProXiFi proxies are dedicated to your account. You are the only user on that IP address, which ensures maximum anonymity, speed, and avoids blocks caused by other users\' activity.',
    },
    {
      question: 'What is the average proxy speed?',
      answer:
        'Mobile proxy speeds rely on carrier signal quality, but our average is 15â€“60 Mbps download. We colocate hardware in high-signal areas and monitor uptime 24/7. You can check live latency stats per proxy port inside the Dashboard.',
    },
    {
      question: 'Can I request proxies from a specific carrier?',
      answer:
        'Yes. On Growth-tier plans and above you can request a specific carrier (AT&T, T-Mobile, Verizon). Contact sales or select your carrier preference during checkout.',
    },
  ],
  'Proxy Manager': [
    {
      question: 'What is the ProXiFi Proxy Manager?',
      answer:
        'The Proxy Manager is our cloud-based control panel for managing all your proxy ports. It provides real-time traffic graphs, IP rotation scheduling, whitelist/blacklist rules, usage analytics, team seat management, and one-click IP rotation â€” accessible from any browser.',
    },
    {
      question: 'Does the Proxy Manager work with my existing tools?',
      answer:
        'Yes. It outputs standard HTTP/HTTPS/SOCKS5 proxy credentials that work with any tool that accepts a proxy â€” including Puppeteer, Playwright, Selenium, Scrapy, GoLogin, Multilogin, AdsPower, and more. Full integration guides are in our Docs.',
    },
    {
      question: 'Can I manage multiple proxies from one place?',
      answer:
        'Absolutely. The Proxy Manager is built for bulk management. You can view all ports at once, apply rotation rules globally or per-port, assign ports to team members, and export usage reports.',
    },
    {
      question: 'Is there an API for the Proxy Manager?',
      answer:
        'Yes. Our REST API lets you rotate IPs, query usage stats, and manage port settings programmatically. API documentation is available in the Docs section.',
    },
    {
      question: 'Does the software require installation?',
      answer:
        'No installation required â€” the Proxy Manager is fully cloud-based and runs in your browser. We also offer a lightweight desktop client for Windows and macOS for users who prefer a native app.',
    },
  ],
  Billing: [
    {
      question: 'How does billing work?',
      answer:
        'Plans are billed monthly or annually. You\'re charged at the start of each billing period. Annual plans receive a discount of up to 20% compared to monthly billing. All payments are processed securely through Stripe.',
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer:
        'Yes, you can change your plan at any time from the Dashboard under Billing. Upgrades take effect immediately and are prorated for the remaining billing period. Downgrades take effect at the next renewal date.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover) via Stripe. For Enterprise plans, we also accept ACH bank transfers and wire transfers. Crypto payments are available on request.',
    },
    {
      question: 'Is there a refund policy?',
      answer:
        'We offer a 3-day money-back guarantee on new subscriptions. If you\'re unsatisfied, contact support within 3 days of your first payment and we\'ll issue a full refund â€” no questions asked.',
    },
    {
      question: 'What happens if I exceed my data limit?',
      answer:
        'You\'ll receive an email alert at 80% and 100% usage. Once your data allowance is consumed, you can purchase a one-time data top-up from the Dashboard or upgrade to a higher-tier plan.',
    },
    {
      question: 'How do I cancel my subscription?',
      answer:
        'You can cancel anytime from the Dashboard under Billing â†’ Manage Subscription. Your service remains active until the end of the current billing period. There are no cancellation fees.',
    },
  ],
  'Security & Privacy': [
    {
      question: 'Is my traffic encrypted?',
      answer:
        'All connections between your device and our proxy infrastructure are encrypted in transit using TLS 1.2/1.3. We do not log browsing content â€” only aggregate bandwidth usage for billing purposes.',
    },
    {
      question: 'Do you store or sell my data?',
      answer:
        'No. ProXiFi does not sell, rent, or share your personal data with third parties. We collect only what is necessary to operate the service (account info, usage totals). See our Privacy Policy at /Docs#terms-of-service for full details.',
    },
    {
      question: 'Is ProXiFi compliant with GDPR and CCPA?',
      answer:
        'Yes. We are compliant with GDPR (for EU users) and CCPA (for California residents). You can request a data export or account deletion from account settings at any time.',
    },
    {
      question: 'Can I whitelist specific IP addresses to access my proxies?',
      answer:
        'Yes. The Proxy Manager lets you add IP whitelists per port so only your servers or devices can use those credentials, even if they were somehow leaked.',
    },
    {
      question: 'What happens to my proxies if ProXiFi experiences downtime?',
      answer:
        'We target 99.9% uptime and maintain redundant infrastructure. Planned maintenance is announced 48 hours in advance via email and our status page. Business and Enterprise plans include SLA-backed uptime guarantees.',
    },
  ],
  Support: [
    {
      question: 'How do I get help?',
      answer:
        'You can submit a support ticket directly from your Dashboard (Support tab â†’ Contact Support), email us at support@proxifi.net, or reach us via live chat on the website. We aim to respond within 4 hours on weekdays.',
    },
    {
      question: 'What are your support hours?',
      answer:
        'Standard support is available Mondayâ€“Friday, 9AMâ€“6PM EST. Business and Enterprise plan customers have access to priority 24/7 support with a 1-hour SLA response time.',
    },
    {
      question: 'Where can I find documentation and guides?',
      answer:
        'All setup guides, API references, integration tutorials, and troubleshooting articles are available at proxifi.net/Docs. Guides are available for every major scraping framework, browser automation tool, and antidetect browser.',
    },
    {
      question: 'Can I request a feature or integration?',
      answer:
        'Yes! We actively incorporate customer feedback. Submit a feature request via the Dashboard or email us at feedback@proxifi.net. Top-voted features get prioritised in our monthly releases.',
    },
    {
      question: 'Do you offer onboarding help for new customers?',
      answer:
        'Yes. All new customers receive a welcome email with setup instructions. Growth and above plans include a 30-minute onboarding call with a technical specialist. Enterprise customers are assigned a dedicated account manager.',
    },
  ],
};

const TAB_ICONS: Record<FaqCategory, string> = {
  'Getting Started':  'ðŸš€',
  'Proxies & Plans':  'ðŸŒ',
  'Proxy Manager':    'âš™ï¸',
  'Billing':          'ðŸ’³',
  'Security & Privacy': 'ðŸ”’',
  'Support':          'ðŸ’¬',
};

export default function FaqSection({ onContactSupport }: { onContactSupport?: () => void }) {
  const categories = Object.keys(faqData) as FaqCategory[];
  const [activeCategory, setActiveCategory] = useState<FaqCategory>(categories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative max-w-6xl mx-auto py-16 px-4 md:px-6">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-500 rounded-full opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-700 rounded-full opacity-10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-amber-400 to-amber-100">
          Frequently Asked Questions
        </h2>
        <p className="text-zinc-400 mt-3 text-sm max-w-xl mx-auto">
          Everything you need to know about ProXiFi. Can&apos;t find an answer?{' '}
          <a href="/Contact" className="text-amber-400 hover:underline">Contact us</a>.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              cat === activeCategory
                ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20'
                : 'border-zinc-700 text-zinc-400 hover:border-amber-500/50 hover:text-amber-300 bg-zinc-900/50'
            }`}
          >
            <span>{TAB_ICONS[cat]}</span>
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ accordion */}
      <div className="space-y-3">
        {faqData[activeCategory].map((item, index) => (
          <div
            key={index}
            className={`border rounded-xl overflow-hidden transition-all ${
              openIndex === index
                ? 'border-amber-500/50 bg-amber-950/20'
                : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center text-left px-5 py-4 gap-4"
            >
              <span className="font-medium text-white text-sm md:text-base">{item.question}</span>
              <span className={`text-xl shrink-0 transition-transform duration-200 ${openIndex === index ? 'text-amber-400 rotate-45' : 'text-zinc-500'}`}>
                +
              </span>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5">
                <p className="text-sm text-zinc-300 leading-relaxed border-t border-zinc-800 pt-4">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30">
        <p className="text-zinc-300 font-medium">Still have questions?</p>
        <p className="text-zinc-500 text-sm mt-1 mb-4">Our team typically responds within 4 hours on business days.</p>
        <div className="flex flex-wrap justify-center gap-3">
          {onContactSupport ? (
            <button
              onClick={onContactSupport}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg text-sm transition-colors"
            >
              Contact Support
            </button>
          ) : (
            <a
              href="/Contact"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg text-sm transition-colors"
            >
              Contact Support
            </a>
          )}
          <a
            href="/Docs"
            className="px-5 py-2.5 border border-zinc-700 hover:border-amber-500/50 text-zinc-300 hover:text-white rounded-lg text-sm transition-colors"
          >
            Browse Docs
          </a>
        </div>
      </div>
    </section>
  );
}
