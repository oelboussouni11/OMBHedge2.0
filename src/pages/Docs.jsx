import './Docs.css'

function Section({ num, title, children }) {
  return (
    <div className="doc-section">
      <div className="doc-section-number">{num}</div>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

function Callout({ icon, children }) {
  return (
    <div className="doc-callout">
      <div className="doc-callout-icon">{icon}</div>
      <div>{children}</div>
    </div>
  )
}

function Formula({ title, code, note }) {
  return (
    <div className="doc-formula">
      <div className="doc-formula-title">{title}</div>
      <code>{code}</code>
      {note && <p>{note}</p>}
    </div>
  )
}

export default function Docs() {
  return (
    <div className="docs-page">
      <div className="container">
        <div className="doc-page">

          <div className="doc-hero">
            <div className="doc-hero-badge">Documentation</div>
            <h2>The Risk-Neutral Hedging Framework</h2>
            <p className="doc-hero-sub">A systematic approach to prop firm challenges where you never lose money.</p>
          </div>

          <Section num="01" title="The Core Concept">
            <p>This system exploits a fundamental asymmetry: <strong>prop firm accounts use virtual capital</strong>, while your broker uses real money. By placing opposite trades on both accounts simultaneously, you create a hedged position where every outcome is either profitable or breakeven.</p>
            <Callout icon="💡">
              <strong>The Key Insight:</strong> When the prop account loses, your broker wins. When the prop account wins, your broker loses — but you advance to the next phase or collect a payout. The broker lot sizes are carefully calculated so that losses always cover your total investment.
            </Callout>
            <p>The instrument used on both sides is <strong>XAUUSD (Gold)</strong>, where 1 standard lot = $10 per pip. Both trades are opened simultaneously in opposite directions.</p>
          </Section>

          <Section num="02" title="How the Hedge Works">
            <p>Every trade you take on the prop firm account has an <strong>opposite trade on your real broker</strong>. The lot sizes are different — the prop uses standard risk (1% per trade), while the broker lot is calibrated to a specific dollar target.</p>
            <div className="doc-grid">
              <div className="doc-card">
                <div className="doc-card-header prop">Prop Firm Side</div>
                <div className="doc-card-body">
                  <p><strong>Risk per trade:</strong> 1% of account</p>
                  <p><strong>Lot size:</strong> Based on SL pips</p>
                  <p><strong>Goal:</strong> Pass the challenge or earn payouts</p>
                  <p><strong>Capital:</strong> Virtual (not your money)</p>
                </div>
              </div>
              <div className="doc-card">
                <div className="doc-card-header broker">Broker Side</div>
                <div className="doc-card-body">
                  <p><strong>Risk per trade:</strong> Calculated to cover investment</p>
                  <p><strong>Lot size:</strong> Based on target profit at X% drawdown</p>
                  <p><strong>Goal:</strong> Profit when prop fails, cover costs when prop wins</p>
                  <p><strong>Capital:</strong> Real money</p>
                </div>
              </div>
            </div>
          </Section>

          <Section num="03" title="Approach 1: 2-Step Pro Challenge">
            <p>This approach uses a prop firm with two evaluation phases before reaching a funded (Master) account. Each phase has a 6% profit target and 6% max drawdown.</p>

            <h4>Phase 1 — Student</h4>
            <Formula title="Broker Lot Calculation" code="Broker Lots = (2 × Test Fee) ÷ (Safety DD Pips × $10 per pip)" note="The broker lot is sized so that when the prop hits -4% drawdown (the 'safety threshold'), the broker has profited 2× the test fee." />
            <div className="doc-example">
              <div className="doc-example-title">Example: $100K Account, $400 Test Fee</div>
              <div className="doc-example-body">
                <p>• Prop risk: 1% = $1,000/trade → SL 50 pips → <strong>2.00 lots</strong></p>
                <p>• Safety at -4% = 4 losing trades = 200 pips on broker</p>
                <p>• Broker target: 2 × $400 = $800</p>
                <p>• Broker lots: $800 ÷ (200 × $10) = <strong>0.400 lots</strong></p>
              </div>
            </div>

            <div className="doc-outcomes">
              <div className="doc-outcome win">
                <div className="doc-outcome-label">If Prop Fails at -4%</div>
                <p>Broker wins $800. After subtracting the $400 test fee = <strong>+$400 profit</strong>.</p>
              </div>
              <div className="doc-outcome next">
                <div className="doc-outcome-label">If Prop Passes (+6%)</div>
                <p>Broker loses: 300 × 0.4 × $10 = <strong>-$1,200</strong>. Total investment into Phase 2: <strong>$1,600</strong>.</p>
              </div>
            </div>

            <h4>Phase 2 — Practitioner</h4>
            <Formula title="Broker Lot Calculation" code="Broker Lots = Total Investment ÷ (Max DD Pips × $10 per pip)" note="Phase 2 uses the full 6% drawdown. The broker lot is sized so that blowing Phase 2 recovers the entire Phase 1 investment." />

            <div className="doc-outcomes">
              <div className="doc-outcome even">
                <div className="doc-outcome-label">If Prop Fails Phase 2</div>
                <p>Broker wins $1,600 → covers everything = <strong>Breakeven</strong>.</p>
              </div>
              <div className="doc-outcome next">
                <div className="doc-outcome-label">If Prop Passes Phase 2</div>
                <p>Broker loses $1,600. Total investment into Master: <strong>$3,200</strong>.</p>
              </div>
            </div>

            <h4>Master — Funded Account</h4>
            <Formula title="Broker Lot Calculation" code="Broker Lots = Total Investment ÷ (Max DD Pips × $10 per pip)" note="Same logic: blowing the Master recovers all cumulative investment. The prop targets 3% (TP 150 pips) for the payout." />

            <div className="doc-outcomes">
              <div className="doc-outcome even">
                <div className="doc-outcome-label">If Master Blows</div>
                <p>Broker wins $3,200 → covers everything = <strong>Breakeven</strong>.</p>
              </div>
              <div className="doc-outcome win">
                <div className="doc-outcome-label">If Payout Achieved (3%)</div>
                <p>Payout: $3,000 × 80% = $2,400. Broker loss: ~$1,600. <strong>Net: +$800</strong>.</p>
              </div>
            </div>
          </Section>

          <Section num="04" title="Approach 2: 1-Step Challenge">
            <p>The 1-Step approach is simpler — only one evaluation phase before funding. The challenge target is <strong>10%</strong>, requiring TP 1000 / SL 100 pips to pass in a single trade.</p>
            <div className="doc-grid">
              <div className="doc-card">
                <div className="doc-card-header prop">Challenge Phase</div>
                <div className="doc-card-body">
                  <p><strong>Target:</strong> 10% profit</p>
                  <p><strong>TP/SL:</strong> 1000 / 100 pips (10:1 RR)</p>
                  <p><strong>Safety:</strong> -4% = broker secures 2× test fee</p>
                  <p><strong>Pass in:</strong> 1 winning trade</p>
                </div>
              </div>
              <div className="doc-card">
                <div className="doc-card-header broker">Funded Account</div>
                <div className="doc-card-body">
                  <p><strong>Target:</strong> 3% payout</p>
                  <p><strong>Split:</strong> 80%</p>
                  <p><strong>Blow:</strong> Broker covers total investment</p>
                  <p><strong>Win:</strong> Payout minus broker loss = profit</p>
                </div>
              </div>
            </div>
          </Section>

          <Section num="05" title="Minimum Broker Balance">
            <p>Your broker account needs enough capital to sustain the <strong>worst-case scenario</strong>: passing every phase straight through, meaning the broker loses on every winning trade.</p>
            <Formula title="Formula" code="Min Balance = Test Fee + Σ (Broker Loss per Winning Trade) across all phases" />
            <Callout icon="⚠️">
              <strong>Important:</strong> This is the absolute minimum. In practice, you should have a 10-20% buffer to account for spread, slippage, and swap fees.
            </Callout>
          </Section>

          <Section num="06" title="Risk Factors">
            <p>This framework is mathematically sound in theory, but <strong>real-world execution introduces risks</strong> that can turn breakeven scenarios into losses.</p>

            <div className="risk-grid">
              <div className="risk-card high">
                <div className="risk-level">High Risk</div>
                <h4>Execution & Slippage</h4>
                <p>You need both trades at the exact same price. Spread on XAUUSD can be 20-50 pips during news. A 30-pip entry difference on one leg compounds over multiple trades.</p>
              </div>
              <div className="risk-card high">
                <div className="risk-level">High Risk</div>
                <h4>Prop Firm Detection</h4>
                <p>Many prop firms ban hedging across accounts and use trade copier detection. If detected, they can void your account and refuse payouts. This is the existential risk.</p>
              </div>
              <div className="risk-card medium">
                <div className="risk-level">Medium Risk</div>
                <h4>Swap Fees</h4>
                <p>Overnight positions incur swap on both sides. Since you're long on one and short on the other, swaps usually don't cancel — both are often negative.</p>
              </div>
              <div className="risk-card medium">
                <div className="risk-level">Medium Risk</div>
                <h4>Gap Risk at -4%</h4>
                <p>The safety threshold assumes clean 1% losses. A volatility spike could blow past -4% to -6% in one candle, meaning you don't get the full broker profit at safety.</p>
              </div>
              <div className="risk-card medium">
                <div className="risk-level">Medium Risk</div>
                <h4>Broker Margin Calls</h4>
                <p>If the broker trade goes against you (prop wins), you might get margin called before the prop hits TP — especially on a small broker balance.</p>
              </div>
              <div className="risk-card low">
                <div className="risk-level">Low Risk</div>
                <h4>ROI Efficiency</h4>
                <p>Passing everything costs ~$4,800 for a $100K 2-step to make $800. That's a 16.7% return — only if the payout succeeds. The capital is real and at risk.</p>
              </div>
            </div>

            <Callout icon="🔍">
              <strong>Bottom line:</strong> The framework assumes perfect execution, no slippage, no swaps, no detection, and no margin calls. Accumulated friction costs (spread × 2 accounts × multiple trades) can erode margins. Factor in a realistic spread cost when calculating your expected outcomes.
            </Callout>
          </Section>

          <Section num="07" title="Key Rules & Assumptions">
            <div className="doc-rules">
              {[
                { title: 'Same instrument, opposite direction.', desc: 'Both trades are on XAUUSD. If prop goes long, broker goes short — opened at the same time.' },
                { title: '1% risk per trade on the prop.', desc: 'This determines the prop lot size. The broker lot is always smaller and calculated based on the investment to recover.' },
                { title: 'Phase 1 safety at -4%.', desc: 'At this point, the broker profit is secured (2× test fee). The remaining 2% is a free roll with no additional risk.' },
                { title: 'Phase 2 and Master use full -6% drawdown.', desc: 'The broker is sized to recover the entire cumulative investment if the prop blows.' },
                { title: 'Master payout uses reduced TP.', desc: 'Instead of the full RR, the master targets a smaller % (default 3%) to secure the payout quickly.' },
                { title: 'All parameters are customizable.', desc: 'Account size, test fee, TP/SL, risk %, targets, and split can all be adjusted in the calculator.' },
              ].map((rule, i) => (
                <div className="doc-rule" key={i}>
                  <span className="doc-rule-num">{i + 1}</span>
                  <div><strong>{rule.title}</strong> {rule.desc}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section num="08" title="Outcome Matrix">
            <p>Every possible outcome falls into one of two categories:</p>
            <div className="doc-matrix">
              <div className="doc-matrix-row header"><span>Outcome</span><span>Result</span><span>When</span></div>
              <div className="doc-matrix-row"><span className="positive">Profit</span><span>+$400 to +$800</span><span>Fail Phase 1 or get Master payout</span></div>
              <div className="doc-matrix-row"><span className="neutral">Breakeven</span><span>$0</span><span>Fail Phase 2 or blow Master</span></div>
              <div className="doc-matrix-row"><span className="negative">Loss</span><span>Never*</span><span>Not possible in theory</span></div>
            </div>
            <Callout icon="🎯">
              <strong>*In theory.</strong> In practice, execution costs (spread, slippage, swaps) can turn breakeven into small losses. See Risk Factors above.
            </Callout>
          </Section>

        </div>
      </div>
    </div>
  )
}
