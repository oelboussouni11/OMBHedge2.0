import { useState, useMemo } from 'react'
import { calcTwoStep, calcOneStep } from '../calc'
import './Calculator.css'

const $ = (v) => `$${v.toFixed(0)}`
const PIP_VALUE = 10

function InputGroup({ label, suffix, value, onChange, ...rest }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      {suffix ? (
        <div className="input-suffix">
          <input type="number" value={value} onChange={e => onChange(+e.target.value)} {...rest} />
          <span className="suffix">{suffix}</span>
        </div>
      ) : (
        <input type="number" value={value} onChange={e => onChange(+e.target.value)} {...rest} />
      )}
    </div>
  )
}

function SelectGroup({ label, options, value, onChange }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <select value={value} onChange={e => onChange(+e.target.value)}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

function LotCard({ phase, name, propLots, brokerLots, ddLabel, ddValue, losses, brokerTarget, extra }) {
  return (
    <div className={`lot-card ${phase}`}>
      <div className="phase-label">{phase.replace(/\d/g, '').replace('phase', 'Phase ')}</div>
      <div className="phase-name">{name}</div>
      <div className="lot-row"><span className="label">Prop Lots</span><span className="value">{propLots.toFixed(2)}</span></div>
      <div className="lot-row"><span className="label">Broker Lots</span><span className="value highlight">{brokerLots.toFixed(3)}</span></div>
      <div className="lot-row"><span className="label">Broker $/pip</span><span className="value">{$(brokerLots * PIP_VALUE)}</span></div>
      <div className="lot-row"><span className="label">{ddLabel}</span><span className="value">{ddValue} ({losses.toFixed(0)} losses)</span></div>
      <div className="lot-row"><span className="label">Broker target</span><span className="value">{$(brokerTarget)}</span></div>
      {extra && <div className="lot-row"><span className="label">{extra.label}</span><span className="value">{extra.value}</span></div>}
    </div>
  )
}

function BrokerBalance({ total, items }) {
  return (
    <div className="broker-balance">
      <div className="bb-left">
        <div className="bb-label">Minimum Required</div>
        <div className="bb-title">Broker Account Balance</div>
        <div className="bb-amount">{$(total)}</div>
      </div>
      <div className="bb-breakdown">
        {items.map((item, i) => (
          <div className="bb-item" key={i}>
            <span className="bb-item-label">{item.label}</span>
            <span className="bb-item-value">-{$(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FlowNode({ label, title, active }) {
  return <div className={`flow-node ${active ? 'active-phase' : ''}`}><div className="fn-label">{label}</div><div className="fn-title">{title}</div></div>
}

function FlowSplit({ left, right }) {
  return (
    <>
      <div className="flow-arrow"></div>
      <div className="flow-split">
        <div className="flow-branch">
          <div className="branch-connector"></div>
          <div className="outcome-node">
            <div className="on-label">{left.label}</div>
            <div className={`on-result ${left.type}`}>{left.text}</div>
          </div>
        </div>
        <div className="flow-branch">
          <div className="branch-connector"></div>
          <div className="outcome-node">
            <div className="on-label">{right.label}</div>
            <div className={`on-result ${right.type}`}>{right.text}</div>
          </div>
        </div>
      </div>
    </>
  )
}

function SummaryTable({ rows }) {
  return (
    <table className="summary-table">
      <thead><tr><th>Scenario</th><th>Broker P/L</th><th>Payout</th><th>Test Fee</th><th>Net Result</th></tr></thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td className="scenario-name">{r.name}</td>
            <td className={r.brokerClass}>{r.broker}</td>
            <td>{r.payout}</td>
            <td className="negative">{r.fee}</td>
            <td className={r.netClass}>{r.net}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ==================== TWO-STEP ====================
function TwoStepTab() {
  const [p, setP] = useState({ accountSize: 100000, testFee: 400, riskPercent: 1, tpPips: 300, slPips: 50, profitTarget: 6, masterTarget: 3, profitSplit: 80, maxDD: 6, safetyDD: 4 })
  const set = (key) => (val) => setP(prev => ({ ...prev, [key]: val }))

  const r = useMemo(() => calcTwoStep(p), [p])

  const accountOptions = [
    { value: 5000, label: '$5,000' }, { value: 10000, label: '$10,000' }, { value: 25000, label: '$25,000' },
    { value: 50000, label: '$50,000' }, { value: 100000, label: '$100,000' }, { value: 200000, label: '$200,000' },
  ]

  return (
    <>
      <div className="input-panel">
        <div className="section-title"><span className="dot"></span> Parameters</div>
        <div className="input-grid">
          <SelectGroup label="Account Size" options={accountOptions} value={p.accountSize} onChange={set('accountSize')} />
          <InputGroup label="Test Fee" suffix="USD" value={p.testFee} onChange={set('testFee')} min={0} step={10} />
          <InputGroup label="Risk / Trade" suffix="%" value={p.riskPercent} onChange={set('riskPercent')} min={0.1} max={3} step={0.1} />
          <InputGroup label="Take Profit" suffix="PIPS" value={p.tpPips} onChange={set('tpPips')} min={10} step={10} />
          <InputGroup label="Stop Loss" suffix="PIPS" value={p.slPips} onChange={set('slPips')} min={5} step={5} />
          <InputGroup label="Profit Target (P1 & P2)" suffix="%" value={p.profitTarget} onChange={set('profitTarget')} min={1} max={15} step={1} />
          <InputGroup label="Master Target" suffix="%" value={p.masterTarget} onChange={set('masterTarget')} min={0.5} max={6} step={0.5} />
          <InputGroup label="Profit Split" suffix="%" value={p.profitSplit} onChange={set('profitSplit')} min={50} max={95} step={5} />
          <InputGroup label="Max Drawdown" suffix="%" value={p.maxDD} onChange={set('maxDD')} min={1} max={12} step={1} />
          <InputGroup label="Phase 1 Safety DD" suffix="%" value={p.safetyDD} onChange={set('safetyDD')} min={1} max={6} step={0.5} />
        </div>
      </div>

      <div className="section-title"><span className="dot"></span> Minimum Broker Balance</div>
      <BrokerBalance total={r.minBrokerBalance} items={[
        { label: 'Test Fee', value: p.testFee },
        { label: 'Phase 1', value: r.phase1.brokerLossPerWin },
        { label: 'Phase 2', value: r.phase2.brokerLossPerWin },
        { label: 'Master', value: r.master.brokerLossOnPayout },
      ]} />

      <div className="section-title"><span className="dot"></span> Lot Sizes</div>
      <div className="lots-panel cols-3">
        <LotCard phase="phase1" name="Student" propLots={r.propLots} brokerLots={r.phase1.brokerLots} ddLabel={`Safety at`} ddValue={`-${p.safetyDD}%`} losses={r.phase1.losses} brokerTarget={r.phase1.brokerTarget} />
        <LotCard phase="phase2" name="Practitioner" propLots={r.propLots} brokerLots={r.phase2.brokerLots} ddLabel="Blow at" ddValue={`-${p.maxDD}%`} losses={r.phase2.losses} brokerTarget={r.phase2.brokerTarget} />
        <LotCard phase="master" name="Funded Account" propLots={r.propLots} brokerLots={r.master.brokerLots} ddLabel="TP Pips" ddValue={`${r.master.tpPips.toFixed(0)} pips`} losses={r.master.losses} brokerTarget={r.master.brokerTarget} extra={{ label: 'Target', value: `${p.masterTarget}%` }} />
      </div>

      <div className="section-title"><span className="dot"></span> Scenario Tree</div>
      <div className="tree-container">
        <div className="scenario-flow">
          <FlowNode label={`Phase 1 · Student`} title={`Prop: ${r.propLots.toFixed(2)} lots · Broker: ${r.phase1.brokerLots.toFixed(3)} lots`} active />
          <FlowSplit
            left={{ label: `Fail at -${p.safetyDD}%`, text: `+${$(r.phase1.failProfit)} profit`, type: 'profit' }}
            right={{ label: `Pass (+${p.profitTarget}%)`, text: `→ Phase 2 (cost: ${$(r.phase1.brokerLossPerWin)})`, type: 'next' }}
          />
          <div className="flow-arrow" style={{ marginTop: 16 }}></div>
          <FlowNode label="Phase 2 · Practitioner" title={`Total invested: ${$(r.phase1.totalInvestment)}`} active />
          <FlowSplit
            left={{ label: `Fail at -${p.maxDD}%`, text: '$0 · Breakeven', type: 'breakeven' }}
            right={{ label: `Pass (+${p.profitTarget}%)`, text: `→ Master (cost: ${$(r.phase2.brokerLossPerWin)})`, type: 'next' }}
          />
          <div className="flow-arrow" style={{ marginTop: 16 }}></div>
          <FlowNode label="Master · Funded" title={`Total invested: ${$(r.phase2.totalInvestment)}`} active />
          <FlowSplit
            left={{ label: 'Blow account', text: '$0 · Breakeven', type: 'breakeven' }}
            right={{ label: `Payout (${p.masterTarget}%)`, text: `+${$(r.master.netProfit)} profit`, type: 'profit' }}
          />
        </div>
      </div>

      <div className="section-title"><span className="dot"></span> Outcome Summary</div>
      <SummaryTable rows={[
        { name: 'Fail Phase 1', broker: `+${$(r.phase1.brokerTarget)}`, brokerClass: 'positive', payout: '$0', fee: `-${$(p.testFee)}`, net: `+${$(r.phase1.failProfit)}`, netClass: 'positive' },
        { name: 'Pass P1, Fail Phase 2', broker: `+${$(r.phase1.totalInvestment)}`, brokerClass: 'positive', payout: '$0', fee: `-${$(p.testFee)}`, net: '$0 (breakeven)', netClass: 'neutral' },
        { name: 'Pass P1 & P2, Blow Master', broker: `+${$(r.phase2.totalInvestment)}`, brokerClass: 'positive', payout: '$0', fee: `-${$(p.testFee)}`, net: '$0 (breakeven)', netClass: 'neutral' },
        { name: 'Pass All → Payout', broker: `-${$(r.master.brokerLossOnPayout)}`, brokerClass: 'negative', payout: `+${$(r.master.payout)}`, fee: `-${$(p.testFee)}`, net: `+${$(r.master.netProfit)}`, netClass: 'positive' },
      ]} />
    </>
  )
}

// ==================== ONE-STEP ====================
function OneStepTab() {
  const [p, setP] = useState({ accountSize: 100000, testFee: 570, riskPercent: 1, tpPips: 1000, slPips: 100, profitTarget: 10, fundedTarget: 3, profitSplit: 80, maxDD: 6, safetyDD: 4 })
  const set = (key) => (val) => setP(prev => ({ ...prev, [key]: val }))

  const r = useMemo(() => calcOneStep(p), [p])

  const accountOptions = [
    { value: 6000, label: '$6,000' }, { value: 15000, label: '$15,000' }, { value: 25000, label: '$25,000' },
    { value: 50000, label: '$50,000' }, { value: 100000, label: '$100,000' }, { value: 200000, label: '$200,000' },
  ]

  return (
    <>
      <div className="input-panel">
        <div className="section-title"><span className="dot"></span> Parameters</div>
        <div className="input-grid">
          <SelectGroup label="Account Size" options={accountOptions} value={p.accountSize} onChange={set('accountSize')} />
          <InputGroup label="Test Fee" suffix="USD" value={p.testFee} onChange={set('testFee')} min={0} step={10} />
          <InputGroup label="Risk / Trade" suffix="%" value={p.riskPercent} onChange={set('riskPercent')} min={0.1} max={3} step={0.1} />
          <InputGroup label="Take Profit" suffix="PIPS" value={p.tpPips} onChange={set('tpPips')} min={10} step={10} />
          <InputGroup label="Stop Loss" suffix="PIPS" value={p.slPips} onChange={set('slPips')} min={5} step={5} />
          <InputGroup label="Challenge Target" suffix="%" value={p.profitTarget} onChange={set('profitTarget')} min={1} max={15} step={1} />
          <InputGroup label="Funded Target" suffix="%" value={p.fundedTarget} onChange={set('fundedTarget')} min={0.5} max={6} step={0.5} />
          <InputGroup label="Profit Split" suffix="%" value={p.profitSplit} onChange={set('profitSplit')} min={50} max={95} step={5} />
          <InputGroup label="Max Drawdown" suffix="%" value={p.maxDD} onChange={set('maxDD')} min={1} max={12} step={1} />
          <InputGroup label="Safety DD" suffix="%" value={p.safetyDD} onChange={set('safetyDD')} min={1} max={6} step={0.5} />
        </div>
      </div>

      <div className="section-title"><span className="dot"></span> Minimum Broker Balance</div>
      <BrokerBalance total={r.minBrokerBalance} items={[
        { label: 'Test Fee', value: p.testFee },
        { label: 'Challenge', value: r.challenge.brokerLossPerWin },
        { label: 'Funded', value: r.funded.brokerLossOnPayout },
      ]} />

      <div className="section-title"><span className="dot"></span> Lot Sizes</div>
      <div className="lots-panel cols-2">
        <LotCard phase="phase1" name="1-Step Evaluation" propLots={r.propLots} brokerLots={r.challenge.brokerLots} ddLabel="Safety at" ddValue={`-${p.safetyDD}%`} losses={r.challenge.losses} brokerTarget={r.challenge.brokerTarget} />
        <LotCard phase="master" name="Live Account" propLots={r.propLots} brokerLots={r.funded.brokerLots} ddLabel="TP Pips" ddValue={`${r.funded.tpPips.toFixed(0)} pips`} losses={r.funded.losses} brokerTarget={r.funded.brokerTarget} extra={{ label: 'Target', value: `${p.fundedTarget}%` }} />
      </div>

      <div className="section-title"><span className="dot"></span> Scenario Tree</div>
      <div className="tree-container">
        <div className="scenario-flow">
          <FlowNode label="Challenge · 1-Step" title={`Prop: ${r.propLots.toFixed(2)} lots · Broker: ${r.challenge.brokerLots.toFixed(3)} lots`} active />
          <FlowSplit
            left={{ label: `Fail at -${p.safetyDD}%`, text: `+${$(r.challenge.failProfit)} profit`, type: 'profit' }}
            right={{ label: `Pass (+${p.profitTarget}%)`, text: `→ Funded (cost: ${$(r.challenge.brokerLossPerWin)})`, type: 'next' }}
          />
          <div className="flow-arrow" style={{ marginTop: 16 }}></div>
          <FlowNode label="Funded · Live" title={`Total invested: ${$(r.challenge.totalInvestment)}`} active />
          <FlowSplit
            left={{ label: 'Blow account', text: '$0 · Breakeven', type: 'breakeven' }}
            right={{ label: `Payout (${p.fundedTarget}%)`, text: `+${$(r.funded.netProfit)} profit`, type: 'profit' }}
          />
        </div>
      </div>

      <div className="section-title"><span className="dot"></span> Outcome Summary</div>
      <SummaryTable rows={[
        { name: 'Fail Challenge', broker: `+${$(r.challenge.brokerTarget)}`, brokerClass: 'positive', payout: '$0', fee: `-${$(p.testFee)}`, net: `+${$(r.challenge.failProfit)}`, netClass: 'positive' },
        { name: 'Pass Challenge, Blow Funded', broker: `+${$(r.challenge.totalInvestment)}`, brokerClass: 'positive', payout: '$0', fee: `-${$(p.testFee)}`, net: '$0 (breakeven)', netClass: 'neutral' },
        { name: 'Pass All → Payout', broker: `-${$(r.funded.brokerLossOnPayout)}`, brokerClass: 'negative', payout: `+${$(r.funded.payout)}`, fee: `-${$(p.testFee)}`, net: `+${$(r.funded.netProfit)}`, netClass: 'positive' },
      ]} />
    </>
  )
}

// ==================== MAIN ====================
export default function Calculator() {
  const [tab, setTab] = useState('twoStep')

  return (
    <div className="calc-page">
      <div className="container">
        <div className="calc-header">
          <div className="header-badge">OMB Trading Systems</div>
          <h1 className="calc-title">Hedge Calculator</h1>
          <p className="calc-sub">Prop Firm × Broker · Risk-Neutral Hedging Framework</p>
        </div>

        <div className="tabs">
          <button className={`tab-btn ${tab === 'twoStep' ? 'active' : ''}`} onClick={() => setTab('twoStep')}>2-Step Pro</button>
          <button className={`tab-btn ${tab === 'oneStep' ? 'active' : ''}`} onClick={() => setTab('oneStep')}>1-Step</button>
        </div>

        {tab === 'twoStep' ? <TwoStepTab /> : <OneStepTab />}
      </div>
    </div>
  )
}
