export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1A202C]">
      <Nav />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <WhatYouGet />
      <CtaSection />
      <ProcurementBanner />
      <Footer />
    </div>
  )
}

function Nav() {
  return (
    <header className="border-b border-[#E2E8F0] bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-[20px] font-bold text-[#1E3A5F] leading-none pl-2">Complytic</span>
        <a
          href="https://tally.so/r/2EY8jp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium bg-[#1E3A5F] text-white px-4 py-2 rounded-md hover:bg-[#162d4a] transition-colors"
        >
          Free Gap Analysis
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="bg-white pt-20 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#1E3A5F] border border-[#1E3A5F]/20 bg-[#1E3A5F]/5 px-3 py-1 rounded-sm">
            EU AI Act Compliance
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1A202C] leading-[1.1] mb-6 max-w-3xl">
          AI Governance & Readiness Audits for{' '}
          <span className="text-[#1E3A5F]">Autonomous Startups</span>
        </h1>

        <p className="text-lg sm:text-xl text-[#718096] leading-relaxed mb-10 max-w-2xl font-normal">
          Don't let AI risk questionnaires block your enterprise deals or funding rounds. We deliver fast,
          async governance audits and technical evidence packs in 5 days.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <a
            href="https://tally.so/r/2EY8jp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1E3A5F] text-white text-sm font-medium px-6 py-3.5 rounded-md hover:bg-[#162d4a] transition-colors"
          >
            Get Your Free 15-Point Gap Analysis
          </a>
          <a
            href="#how-it-works"
            className="inline-block text-[#1E3A5F] text-sm font-medium px-6 py-3.5 rounded-md border border-[#E2E8F0] hover:border-[#1E3A5F]/30 hover:bg-[#F7FAFC] transition-colors"
          >
            See How It Works
          </a>
        </div>

        <p className="mt-5 text-sm text-[#A0AEC0]">
          Trusted by AI startups across EU &amp; US &mdash; 48-hour turnaround. No sales calls.
        </p>
      </div>
    </section>
  )
}

function TrustBar() {
  const items = [
    { label: 'Turnaround', value: '5 Days' },
    { label: 'Audit Points', value: '15-Point' },
    { label: 'Format', value: '100% Async' },
    { label: 'Deliverable', value: 'Evidence Pack' },
  ]

  return (
    <section className="border-y border-[#E2E8F0] bg-[#F7FAFC] py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
        {items.map(({ label, value }) => (
          <div key={label} className="text-center">
            <div className="text-2xl font-semibold text-[#1E3A5F] tracking-tight">{value}</div>
            <div className="text-xs font-medium text-[#A0AEC0] uppercase tracking-widest mt-1">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Async Questionnaire',
      time: '2 minutes',
      description:
        'Fill out our brief structured form about your AI architecture, data flows, and intended use. No calls required.',
    },
    {
      number: '02',
      title: 'Deep-Dive Audit',
      time: '5 business days',
      description:
        'Our compliance team analyzes your workflows, data provenance, risk controls, and documentation against EU AI Act requirements.',
    },
    {
      number: '03',
      title: 'Evidence Pack Delivery',
      time: 'Investor-ready',
      description:
        'Receive a comprehensive PDF report, compliance score, gap analysis, policy templates, and a remediation roadmap.',
    },
  ]

  return (
    <section id="how-it-works" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-medium tracking-widest uppercase text-[#A0AEC0] mb-3">Process</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A202C]">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">
          {steps.map((step) => (
            <div key={step.number} className="py-8 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0">
              <div className="text-5xl font-light text-[#E2E8F0] tracking-tight mb-6 select-none">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-[#1A202C] mb-1">{step.title}</h3>
              <p className="text-xs font-medium text-[#1E3A5F] mb-3 tracking-wide">{step.time}</p>
              <p className="text-[#718096] text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhatYouGet() {
  const items = [
    {
      title: 'EU AI Act Compliance Score',
      description: 'A precise score mapping your current posture against EUAIA risk tiers and obligations.',
    },
    {
      title: 'Gap Analysis with Prioritized Fixes',
      description: 'Ranked list of compliance gaps ordered by regulatory severity and remediation effort.',
    },
    {
      title: 'Investor-Ready Evidence Pack',
      description: 'Structured documentation designed for due diligence review by investors and CFOs.',
    },
    {
      title: 'Ready-to-Use Policy Templates',
      description: 'Editable templates for data governance, model cards, and transparency disclosures.',
    },
    {
      title: 'Remediation Roadmap',
      description: 'Phased action plan with clear ownership, timelines, and success criteria.',
    },
    {
      title: '100% Async — No Zoom Calls',
      description: 'Everything delivered through structured documents. Your time stays yours.',
    },
  ]

  return (
    <section className="bg-[#F7FAFC] py-24 px-6 border-y border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-medium tracking-widest uppercase text-[#A0AEC0] mb-3">Deliverables</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A202C]">
            What's Included in Your Audit
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E2E8F0]">
          {items.map((item) => (
            <div key={item.title} className="bg-[#F7FAFC] p-8">
              <div className="w-5 h-px bg-[#1E3A5F] mb-5" />
              <h3 className="text-sm font-semibold text-[#1A202C] mb-2">{item.title}</h3>
              <p className="text-sm text-[#718096] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section id="gap-analysis" className="bg-white py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-medium tracking-widest uppercase text-[#A0AEC0] mb-4">Get Started</p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A202C] mb-4">
          Know your compliance gaps before your investors do.
        </h2>
        <p className="text-[#718096] mb-10 leading-relaxed">
          Free 15-point gap analysis. 48-hour turnaround. No sales calls.
        </p>

        <a
          href="https://tally.so/r/2EY8jp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#1E3A5F] text-white text-sm font-medium px-8 py-3.5 rounded-md hover:bg-[#162d4a] transition-colors"
        >
          Get Your Free Gap Analysis
        </a>

        <p className="text-xs text-[#A0AEC0] mt-5">
          No spam. No sales calls. We'll reach out only with your analysis.
        </p>
      </div>
    </section>
  )
}

function ProcurementBanner() {
  return (
    <section className="bg-[#1E3A5F] py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white font-semibold text-lg leading-snug">
            Stuck in procurement?
          </p>
          <p className="text-[#93B8D8] text-sm mt-1">
            Ask about our Done-For-You Questionnaire Mapping — we handle vendor security and AI risk questionnaires on your behalf.
          </p>
        </div>
        <a
          href="https://tally.so/r/2EY8jp"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-white text-[#1E3A5F] text-sm font-semibold px-6 py-3 rounded-md hover:bg-[#F7FAFC] transition-colors"
        >
          Ask About This Service
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F7FAFC] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-sm font-semibold text-[#1A202C]">Complytic</p>
          <p className="text-xs text-[#A0AEC0] mt-0.5">A GrowthFlow AI Company</p>
        </div>
        <div className="text-right">
          <a
            href="mailto:aaliyan@growthflowai.site"
            className="text-sm text-[#718096] hover:text-[#1E3A5F] transition-colors"
          >
            aaliyan@growthflowai.site
          </a>
          <p className="text-xs text-[#A0AEC0] mt-1">&copy; {new Date().getFullYear()} GrowthFlow AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
