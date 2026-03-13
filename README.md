# OMBHedge

A risk-neutral hedging calculator for prop firm challenges. Trade opposite positions on a prop firm and real broker simultaneously — never lose money.

## The Framework

- **Fail the prop?** → Broker profits, you make money
- **Pass the prop?** → Move to next phase, broker covers you if anything goes wrong
- **Get a payout?** → Payout exceeds broker loss, you profit

## Two Approaches

### 2-Step Pro
Phase 1 (Student) → Phase 2 (Practitioner) → Master (Funded)
- TP 300 / SL 50 pips · 6:1 RR
- 6% profit target per phase

### 1-Step
Challenge → Funded
- TP 1000 / SL 100 pips · 10:1 RR
- 10% challenge target, pass in 1 trade

## Features

- Live calculator with customizable parameters
- Broker lot size calculator for each phase
- Minimum broker balance calculation
- Scenario tree visualization
- Full documentation with formulas and risk factors

## Tech Stack

- React 18 + Vite
- React Router (HashRouter for GitHub Pages)
- Custom CSS (no frameworks)
- Fonts: Bebas Neue, Syne, DM Mono

## Getting Started

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

```bash
npm run build
```

Push the `dist/` folder to the `gh-pages` branch, or use GitHub Actions.

## Disclaimer

This is a calculator tool, not financial advice. See the Risk Factors section in the docs for real-world execution risks including slippage, swap fees, and prop firm detection policies.

---

Built by Omar El Boussouni
