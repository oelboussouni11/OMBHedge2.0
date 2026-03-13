import { Link } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb orb-1"></div>
          <div className="hero-orb orb-2"></div>
          <div className="hero-grid-overlay"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-badge">OMB Trading Systems</div>
          <h1 className="hero-title">
            <span className="hero-line-1">Never Lose</span>
            <span className="hero-line-2">Money Again</span>
          </h1>
          <p className="hero-sub">
            A risk-neutral hedging framework that turns prop firm challenges into 
            zero-loss opportunities. Profit when you fail. Break even when you don't.
          </p>
          <div className="hero-cta">
            <Link to="/calculator" className="btn-primary">Open Calculator</Link>
            <Link to="/docs" className="btn-secondary">How It Works</Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">$0</span>
              <span className="stat-label">Maximum Loss</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">2</span>
              <span className="stat-label">Approaches</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">∞</span>
              <span className="stat-label">Retry Cycles</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="container">
          <div className="section-label">The Framework</div>
          <h2 className="section-heading">How It Works</h2>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">01</div>
              <div className="step-icon">⚡</div>
              <h3>Open Opposite Trades</h3>
              <p>Go long on the prop firm, short on your broker — same instrument, same time. Every pip is hedged.</p>
            </div>
            <div className="step-card">
              <div className="step-num">02</div>
              <div className="step-icon">🎯</div>
              <h3>Calibrate Broker Lots</h3>
              <p>Size your broker position so that the prop failing generates enough profit to cover your investment — and then some.</p>
            </div>
            <div className="step-card">
              <div className="step-num">03</div>
              <div className="step-icon">🔄</div>
              <h3>Advance or Profit</h3>
              <p>Fail the prop? You profit. Pass it? Move to the next phase with your broker covering the cost if anything goes wrong.</p>
            </div>
            <div className="step-card">
              <div className="step-num">04</div>
              <div className="step-icon">💰</div>
              <h3>Collect Payouts</h3>
              <p>Reach the funded account, target a small %, and collect 80% profit split. The payout exceeds your broker loss.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Approaches */}
      <section className="approaches-section">
        <div className="container">
          <div className="section-label">Choose Your Path</div>
          <h2 className="section-heading">Two Approaches</h2>

          <div className="approach-grid">
            <div className="approach-card">
              <div className="approach-tag">2-Step Pro</div>
              <h3>Phase 1 → Phase 2 → Master</h3>
              <div className="approach-details">
                <div className="approach-row">
                  <span>Phases</span>
                  <span>3 (Student → Practitioner → Master)</span>
                </div>
                <div className="approach-row">
                  <span>Target per phase</span>
                  <span>6%</span>
                </div>
                <div className="approach-row">
                  <span>TP / SL</span>
                  <span>300 / 50 pips</span>
                </div>
                <div className="approach-row">
                  <span>Fail Phase 1</span>
                  <span className="positive">+$400 profit</span>
                </div>
                <div className="approach-row">
                  <span>Master Payout</span>
                  <span className="positive">+$800 profit</span>
                </div>
              </div>
              <Link to="/calculator" className="approach-btn">Calculate →</Link>
            </div>

            <div className="approach-card">
              <div className="approach-tag cyan">1-Step</div>
              <h3>Challenge → Funded</h3>
              <div className="approach-details">
                <div className="approach-row">
                  <span>Phases</span>
                  <span>2 (Challenge → Funded)</span>
                </div>
                <div className="approach-row">
                  <span>Challenge target</span>
                  <span>10%</span>
                </div>
                <div className="approach-row">
                  <span>TP / SL</span>
                  <span>1000 / 100 pips</span>
                </div>
                <div className="approach-row">
                  <span>Fail Challenge</span>
                  <span className="positive">+$570 profit</span>
                </div>
                <div className="approach-row">
                  <span>Funded Payout</span>
                  <span className="positive">+$690 profit</span>
                </div>
              </div>
              <Link to="/calculator" className="approach-btn">Calculate →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome Matrix */}
      <section className="matrix-section">
        <div className="container">
          <div className="section-label">The Bottom Line</div>
          <h2 className="section-heading">Every Outcome</h2>
          <div className="matrix-wrapper">
            <div className="matrix-row matrix-header">
              <span>Scenario</span>
              <span>Result</span>
            </div>
            <div className="matrix-row">
              <span>Fail any evaluation phase</span>
              <span className="positive">Profit or Breakeven</span>
            </div>
            <div className="matrix-row">
              <span>Blow the funded account</span>
              <span className="neutral">Breakeven</span>
            </div>
            <div className="matrix-row">
              <span>Get a payout</span>
              <span className="positive">Profit</span>
            </div>
            <div className="matrix-row">
              <span>Lose money</span>
              <span className="negative">Not possible*</span>
            </div>
          </div>
          <p className="matrix-disclaimer">*Assumes perfect execution. See <Link to="/docs">risk factors</Link> for real-world considerations.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Calculate?</h2>
            <p>Plug in your prop firm parameters and see exactly what lots to use, how much to deposit, and what every outcome looks like.</p>
            <Link to="/calculator" className="btn-primary">Open Calculator</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="logo-omb">OMB</span><span className="logo-hedge">Hedge</span>
          </div>
          <p className="footer-note">Built by Omar El Boussouni · Not financial advice</p>
        </div>
      </footer>
    </div>
  )
}
