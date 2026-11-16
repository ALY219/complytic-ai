import { useEffect, useState } from "react"

const REPO_URL = "https://github.com/ALY219/complytic-receipts"
const PROFILE_URL = "https://github.com/ALY219"
const LINKEDIN_URL = "https://www.linkedin.com/in/aaliyan-tariq-a5b399360/"
const EMAIL = "aaliyan@complytic.dev"
const NOTIFY_URL =
  "mailto:aaliyan@complytic.dev?subject=Complytic%20%E2%80%94%20notify%20me%20when%20integrations%20open"

const receipt = `{
  "receipt": {
    "v": 1,
    "chain_id": "demo-chain-1",
    "seq": 1,
    "prev_hash": "7962a00ddcd8e7b269913825ab4f4b7d6b388ae28a41e0b77a254387b2de27f0",
    "kind": "intent",
    "tx_id": "49bce51e-ee19-4889-bb0b-2b9246ab935b",
    "ts": "2026-11-13T17:44:23.068058+00:00",
    "actor": { "principal": "eng-142", "role": "agent_runner" },
    "payload": {
      "sql": "INSERT INTO ledger VALUES (?, ?, ?)",
      "params_sha256": "c67ed0602a10a55860056ff79a3f228f19d644c1bae14da9527f02b8974cb65a",
      "database": "ledger-demo",
      "driver": "sqlite3"
    }
  },
  "receipt_hash": "dffffb5998191a7789b4c24220665dbebe33b8647f17d5ec479ebc4e3e0a8838",
  "sig": {
    "alg": "ECDSA_SHA_256",
    "key_id": "isolated-dev-1",
    "value_b64": "MEUCIGNOncO3kpHxFdqxWJgUCj9rFKQcOzH/E0H+m5/I068xAiEA0XG884bFLqS5ou2ibFklukLMcRNWJYOl90NXrYsuu4k=",
    "canonicalization": "JSON: sort_keys=True, separators=(',',':'), ensure_ascii=False, UTF-8, floats rejected"
  }
}`

const quickstart = `git clone https://github.com/ALY219/complytic-receipts
cd complytic-receipts
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\\Scripts\\activate
pip install -r requirements-dev.txt

make verify    # verify the committed chain against artifacts/pubkey.pem
make tamper    # five attacks + a clean-chain control; every attack must be detected
make test      # unit tests
make demo      # optional: fresh chain with a local in-process dev key (see THREAT_MODEL.md)`

const flowDiagram = `agent → driver wrapper → [seal intent] → execute → commit
          ↓                                      ↓
    signer (separate process)            [seal outcome]
          ↓                                      ↓
artifacts/chain.json → python -m complytic_receipts verify + artifacts/pubkey.pem`

type CodeBlockProps = {
  children: string
  label?: string
}

function CodeBlock({ children, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-wrap">
      {label && <p className="code-label">{label}</p>}
      <button className="copy-button" type="button" onClick={copyCode}>
        {copied ? "Copied ✓" : "Copy"}
      </button>
      <pre className="code-block">
        <code>{children}</code>
      </pre>
    </div>
  )
}

type StatusCardProps = {
  status: "working" | "pending"
  label: string
  items: string[]
}

function StatusCard({ status, label, items }: StatusCardProps) {
  return (
    <article className="status-card">
      <h3 className="status-heading">
        <span className={`status-dot ${status}`} aria-hidden="true" />
        {label}
      </h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}

function FindingCard({ title, children }: { title: string children: string }) {
  return (
    <article className="finding-card">
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  )
}

type PricingCardProps = {
  status: "working" | "pending"
  title: string
  price: string
  children: React.ReactNode
  button: string
  href?: string
}

function PricingCard({
  status,
  title,
  price,
  children,
  button,
  href,
}: PricingCardProps) {
  return (
    <article className={`pricing-card ${status}`}>
      <h3>{title}</h3>
      <p className="price">{price}</p>
      <div className="pricing-copy">{children}</div>
      {href ? (
        <a
          className="button secondary"
          href={href}
          {...(!href.startsWith("mailto:")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          {button}
        </a>
      ) : (
        <button className="button disabled" type="button" disabled>
          {button}
        </button>
      )}
    </article>
  )
}

const faqs = [
  {
    question: "Is this a product I can buy?",
    answer:
      "Not yet. The reference implementation is public and free. Paid integration work opens once someone outside this project has run the verifier and published what they found.",
  },
  {
    question: "Do you have clients?",
    answer:
      "No. There are no client engagements, no deployments, and no case studies. Any earlier material suggesting otherwise has been withdrawn.",
  },
  {
    question: "Is this SOC 2 or EU AI Act compliance?",
    answer:
      "No. This produces technical artifacts that may support a compliance effort. It is not a certification, it is not an attestation, and it does not make any system compliant. Only an accredited body can attest.",
  },
  {
    question: "Why not just use Datadog or LangSmith?",
    answer:
      "Those are observability tools and they are good at observability. This produces a signed, hash-linked record intended to be checked by someone outside your organization. Different purpose. Use both.",
  },
  {
    question: "What stops an agent from bypassing the wrapper?",
    answer:
      "Nothing, in this version, if the agent holds its own database credentials. That limitation is stated in the threat model and it is the next thing to build.",
  },
]

function Accordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="accordion">
      {faqs.map(({ question, answer }, index) => {
        const isOpen = open === index
        return (
          <div className="accordion-item" key={question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`answer-${index}`}
                id={`question-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span>{question}</span>
                <span className="accordion-mark" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              className="accordion-answer"
              id={`answer-${index}`}
              role="region"
              aria-labelledby={`question-${index}`}
              hidden={!isOpen}
            >
              <p>{answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.title =
      "Complytic — Tamper-evident execution records for AI agents"
  }, [])

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="nav-inner">
          <a className="wordmark" href="#top">
            Complytic
          </a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Menu
          </button>
          <nav
            id="primary-navigation"
            className={menuOpen ? "nav-open" : ""}
            aria-label="Primary navigation"
          >
            <a href="#status" onClick={() => setMenuOpen(false)}>
              Status
            </a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
              How it works
            </a>
            <a href="#verify" onClick={() => setMenuOpen(false)}>
              Verify
            </a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>
              Pricing
            </a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>
              FAQ
            </a>
            <a
              className="nav-github"
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">
            PRE-REVENUE · NO CLIENT ENGAGEMENTS · BUILDING IN PUBLIC
          </p>
          <h1>Tamper-evident execution records for AI agents.</h1>
          <p className="hero-subhead">
            The receipt is sealed before the write executes, signed out-of-band
            by a separate signer process, and verifiable by anyone holding the
            public key.
          </p>
          <p className="hero-body">
            This is a reference implementation, not a deployed product. The code
            is public. You can run the verifier and the tamper tests yourself
            without access to any of our systems.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#verify">
              Run the verifier
            </a>
            <a
              className="button secondary"
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
            >
              Read the code
            </a>
            <a className="hero-tertiary" href={NOTIFY_URL}>
              Notify me when this opens
            </a>
          </div>
          <p className="hero-note">
            Built by Aaliyan Tariq. Not independently audited yet.
          </p>
        </section>

        <section id="status" aria-labelledby="status-heading">
          <h2 id="status-heading">What exists, and what does not.</h2>
          <div className="status-grid">
            <StatusCard
              status="working"
              label="WORKING"
              items={[
                "Receipt chain with canonical JSON and SHA-256 linking",
                "ECDSA P-256 signatures over the receipt digest",
                "Intent receipt sealed before the statement executes",
                "Outcome receipt sealed after commit or rollback",
                "Local verifier requiring only the public key",
                "Tamper tests: alter, rehash-without-key, delete, reorder, forged outcome",
              ]}
            />
            <StatusCard
              status="pending"
              label="NOT BUILT"
              items={[
                "KMS-backed signing (local development key only)",
                "Real key isolation (test runs both processes as one OS user)",
                "Trusted timestamping (ts is the signer's clock)",
                "Bypass resistance (an agent holding its own DB credentials can still write outside the wrapper)",
                "Wire-level interception (this is driver-level)",
                "Any client deployment",
                "Any independent review or attestation",
              ]}
            />
          </div>
          <p className="status-file">
            Full status file: STATUS.md in the repository.
          </p>
        </section>

        <section aria-labelledby="problem-heading">
          <h2 id="problem-heading">Why this exists.</h2>
          <div className="problem-list">
            <article>
              <h3>The questionnaire wall.</h3>
              <p>
                Enterprise security reviews now run 600+ questions including AI
                supplements. Policy documents do not answer them. Reviewers want
                artifacts.
              </p>
            </article>
            <article>
              <h3>The trust deficit.</h3>
              <p>
                A vendor asserting its own controls is not verification. Buyers
                increasingly ask for evidence they can check without trusting
                the vendor.
              </p>
            </article>
            <article>
              <h3>The engineering tax.</h3>
              <p>
                Every stalled review pulls engineers off product work for weeks,
                usually right before a deal closes.
              </p>
            </article>
          </div>
        </section>

        <section id="how-it-works" aria-labelledby="architecture-heading">
          <h2 id="architecture-heading">How the receipt is produced.</h2>
          <div className="architecture-grid">
            <ol className="steps">
              <li>
                <span>01</span>
                <div>
                  <h3>Intercept at the driver.</h3>
                  <p>
                    The receipt is built from the SQL and parameters handed to
                    the database driver, not from what the agent reports it did.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Seal before execution.</h3>
                  <p>
                    The intent receipt is canonicalized, hashed, and signed
                    before the statement runs.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Sign out of band.</h3>
                  <p>
                    Signing happens in a separate process. The agent requests a
                    signature over HTTP and receives only the signature — never
                    key material. In this dev build both processes run as one OS
                    user, so the key file is still readable from disk;
                    non-exportable keys (AWS KMS) are written but not deployed.
                  </p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <h3>Seal the outcome.</h3>
                  <p>
                    After commit or rollback, a second receipt records the
                    result and links to the intent set. Divergence between
                    intent and outcome is recorded.
                  </p>
                </div>
              </li>
              <li>
                <span>05</span>
                <div>
                  <h3>Verify with the public key.</h3>
                  <p>
                    Anyone can recompute the hashes and check the signatures
                    locally. No access to our infrastructure is required.
                  </p>
                </div>
              </li>
            </ol>
            <CodeBlock>{flowDiagram}</CodeBlock>
          </div>
        </section>

        <section aria-labelledby="receipt-heading">
          <h2 id="receipt-heading">A receipt from the committed test run.</h2>
          <p className="section-intro">
            The committed intent receipt (seq 1) from artifacts/chain.json.
            Check these exact values with make verify — no key generation, no
            access to our systems.
          </p>
          <CodeBlock>{receipt}</CodeBlock>
        </section>

        <section aria-labelledby="tamper-heading">
          <h2 id="tamper-heading">What happens when you alter the record.</h2>
          <p className="section-intro primary-text">
            Output of make tamper. Five attacks plus a clean-chain control. Each
            attack must be detected. This is the acceptance condition for the
            implementation.
          </p>
          <div className="table-scroll">
            <table className="tamper-table">
              <thead>
                <tr>
                  <th>Case</th>
                  <th>Expected</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Case">clean chain</td>
                  <td data-label="Expected">PASS</td>
                  <td data-label="Result">PASS</td>
                </tr>
                <tr>
                  <td data-label="Case">alter SQL after the fact</td>
                  <td data-label="Expected">DETECT</td>
                  <td data-label="Result">DETECTED</td>
                </tr>
                <tr>
                  <td data-label="Case">rehash without signing key</td>
                  <td data-label="Expected">DETECT</td>
                  <td data-label="Result">DETECTED</td>
                </tr>
                <tr>
                  <td data-label="Case">delete a record</td>
                  <td data-label="Expected">DETECT</td>
                  <td data-label="Result">DETECTED</td>
                </tr>
                <tr>
                  <td data-label="Case">reorder records</td>
                  <td data-label="Expected">DETECT</td>
                  <td data-label="Result">DETECTED</td>
                </tr>
                <tr>
                  <td data-label="Case">forge outcome status</td>
                  <td data-label="Expected">DETECT</td>
                  <td data-label="Result">DETECTED</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tamper-example">
            <CodeBlock label="Example findings — alter SQL after the fact. Full output: make tamper.">
              {`[1] HASH MISMATCH
[2] CHAIN BREAK`}
            </CodeBlock>
          </div>
          <p className="table-note">
            An attacker can recompute a hash. They cannot re-sign it, because
            they do not hold the key. That is the entire security property, and
            it is the only one we claim.
          </p>
        </section>

        <section id="threat-model" aria-labelledby="threat-heading">
          <h2 id="threat-heading">What this does not prove.</h2>
          <p className="section-intro">
            Stated plainly, because the edges matter more than the feature list.
          </p>
          <div className="finding-list">
            <FindingCard title="Bypass is not prevented.">
              If the agent runs in the same process and holds database
              credentials, it can open its own connection and write without
              producing a receipt. Driver-level wrapping proves what passed
              through the wrapper, not that everything went through it. Closing
              this requires the agent to hold no database credentials and reach
              data only through a gateway it does not control. Not built yet.
            </FindingCard>
            <FindingCard title="Payload provenance is partial.">
              The receipt is built from the statement handed to the driver, not
              from agent self-report. It does not prove the agent's reasoning
              was honest, and it does not prove the database reported
              truthfully.
            </FindingCard>
            <FindingCard title="Tamper-evident does not make alteration impossible.">
              A hash chain makes alteration detectable. It does not make
              alteration impossible. We do not claim that records cannot be
              changed, and we do not claim any evidentiary or legal status.
              Whether a record is admissible is a determination for a court, not
              a vendor.
            </FindingCard>
          </div>
        </section>

        <section id="verify" aria-labelledby="verify-heading">
          <h2 id="verify-heading">Verify it yourself.</h2>
          <p className="section-intro primary-text">
            No account, no access to our systems, no trust required.
          </p>
          <div className="verify-list">
            <CodeBlock>{quickstart}</CodeBlock>
          </div>
          <p className="verify-note">
            The committed chain was produced with the process-separated signer
            (key_id isolated-dev-1). make demo defaults to an in-process dev
            key; that difference is documented in THREAT_MODEL.md.
          </p>
          <p className="callout">
            If you run this and it behaves differently than described above,
            that is a finding. Open an issue or email me directly. I would
            rather know.
          </p>
        </section>

        <section id="pricing" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading">Pricing.</h2>
          <p className="section-intro">
            The reference implementation is free and always will be. Paid work
            opens after the implementation has been reviewed by someone outside
            this project.
          </p>
          <div className="pricing-list">
            <PricingCard
              status="working"
              title="Reference implementation"
              price="Free"
              button="Open the repository"
              href={REPO_URL}
            >
              <p>
                Public repository, verifier, tamper tests, threat model,
                committed test chain. MIT licensed.
              </p>
            </PricingCard>
            <PricingCard
              status="pending"
              title="Scoped integration"
              price="Not yet open"
              button="Notify me when this opens"
              href={NOTIFY_URL}
            >
              <p>
                One agent framework, one datastore. Out-of-band signer,
                pre-execution sealing, verifier, threat model, handoff
                documentation.
              </p>
              <p>Published acceptance test, agreed before any invoice:</p>
              <ol>
                <li>A clean chain verifies with zero findings.</li>
                <li>Altering a committed record is detected.</li>
                <li>
                  Recomputing a hash without the key fails signature
                  verification.
                </li>
                <li>Deleting a record breaks the chain.</li>
                <li>A forced rollback still produces an outcome receipt.</li>
              </ol>
              <p>
                All five must pass, checked by a party who is not us. If any
                fails, no invoice.
              </p>
            </PricingCard>
            <PricingCard
              status="pending"
              title="Assessment"
              price="Not yet open"
              button="Notify me when this opens"
              href={NOTIFY_URL}
            >
              <p>
                We will not sell a readiness assessment until we can publish the
                full method, every scored point, a stated pass threshold, a
                stated failure condition, and reproduction steps for every
                finding. A review you cannot rerun is an opinion.
              </p>
            </PricingCard>
          </div>
          <p className="pricing-note">
            Paid work will be implementation only. Any future assessment is paid
            advice, not independent verification, and will say so on every page.
          </p>
        </section>

        <section aria-labelledby="about-heading">
          <h2 id="about-heading">Who is building this.</h2>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                Complytic is one person, Aaliyan Tariq, based in Pakistan. The
                project started from a simple observation: enterprise buyers
                stopped accepting policy documents and started asking for
                artifacts, and most small AI teams have no way to produce them.
              </p>
              <p>
                This is being built in public because a tool that claims to make
                evidence checkable should itself be checkable. There are no
                clients yet. There is no audit yet. What there is, is code you
                can run.
              </p>
            </div>
            <div className="contact-card">
              <a href={PROFILE_URL} target="_blank" rel="noreferrer">
                <span>GitHub</span> github.com/ALY219
              </a>
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                <span>Repo</span> github.com/ALY219/complytic-receipts
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                <span>LinkedIn</span> linkedin.com/in/aaliyan-tariq-a5b399360
              </a>
              <a href={`mailto:${EMAIL}`}>
                <span>Email</span> {EMAIL}
              </a>
            </div>
          </div>
        </section>

        <section id="faq" aria-labelledby="questions-heading">
          <h2 id="questions-heading">Questions.</h2>
          <Accordion />
        </section>
      </main>

      <footer>
        <p className="wordmark">Complytic</p>
        <p className="footer-description">
          Tamper-evident execution records for AI agents.
          <br />
          Pre-revenue. No client engagements. Not independently audited.
        </p>
        <div className="footer-links">
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            Repo
          </a>
          <a
            href={`${REPO_URL}/blob/main/STATUS.md`}
            target="_blank"
            rel="noreferrer"
          >
            STATUS.md
          </a>
          <a
            href={`${REPO_URL}/blob/main/THREAT_MODEL.md`}
            target="_blank"
            rel="noreferrer"
          >
            THREAT_MODEL.md
          </a>
          <a
            href={`${REPO_URL}/blob/main/LICENSE`}
            target="_blank"
            rel="noreferrer"
          >
            MIT License
          </a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
        <p className="copyright">
          © 2026 Aaliyan Tariq. Code released under MIT. No certification,
          attestation, or legal determination is claimed or implied.
        </p>
      </footer>
    </div>
  )
}

export default App
