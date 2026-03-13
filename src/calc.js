const PIP_VALUE = 10

export function calcTwoStep({ accountSize, testFee, riskPercent, tpPips, slPips, profitTarget, masterTarget, profitSplit, maxDD, safetyDD }) {
  const riskPerTrade = accountSize * (riskPercent / 100)
  const propLots = riskPerTrade / (slPips * PIP_VALUE)

  // Phase 1
  const p1Losses = safetyDD / riskPercent
  const p1BrokerPips = p1Losses * slPips
  const p1BrokerTarget = 2 * testFee
  const p1BrokerLots = p1BrokerTarget / (p1BrokerPips * PIP_VALUE)
  const p1BrokerLossPerWin = tpPips * p1BrokerLots * PIP_VALUE
  const p1FailProfit = p1BrokerTarget - testFee
  const p1TotalInvestment = testFee + p1BrokerLossPerWin

  // Phase 2
  const p2Losses = maxDD / riskPercent
  const p2BrokerPips = p2Losses * slPips
  const p2BrokerTarget = p1TotalInvestment
  const p2BrokerLots = p2BrokerTarget / (p2BrokerPips * PIP_VALUE)
  const p2BrokerLossPerWin = tpPips * p2BrokerLots * PIP_VALUE
  const p2TotalInvestment = p1TotalInvestment + p2BrokerLossPerWin

  // Master
  const mLosses = maxDD / riskPercent
  const mBrokerPips = mLosses * slPips
  const mBrokerTarget = p2TotalInvestment
  const mBrokerLots = mBrokerTarget / (mBrokerPips * PIP_VALUE)
  const mTPPips = (accountSize * (masterTarget / 100)) / (propLots * PIP_VALUE)
  const mBrokerLossOnPayout = mTPPips * mBrokerLots * PIP_VALUE
  const mPayout = accountSize * (masterTarget / 100) * (profitSplit / 100)
  const mNetProfit = mPayout - mBrokerLossOnPayout

  // Broker balance
  const minBrokerBalance = testFee + p1BrokerLossPerWin + p2BrokerLossPerWin + mBrokerLossOnPayout

  return {
    propLots,
    phase1: { losses: p1Losses, brokerLots: p1BrokerLots, brokerTarget: p1BrokerTarget, brokerLossPerWin: p1BrokerLossPerWin, failProfit: p1FailProfit, totalInvestment: p1TotalInvestment },
    phase2: { losses: p2Losses, brokerLots: p2BrokerLots, brokerTarget: p2BrokerTarget, brokerLossPerWin: p2BrokerLossPerWin, totalInvestment: p2TotalInvestment },
    master: { losses: mLosses, brokerLots: mBrokerLots, brokerTarget: mBrokerTarget, tpPips: mTPPips, brokerLossOnPayout: mBrokerLossOnPayout, payout: mPayout, netProfit: mNetProfit },
    minBrokerBalance,
  }
}

export function calcOneStep({ accountSize, testFee, riskPercent, tpPips, slPips, profitTarget, fundedTarget, profitSplit, maxDD, safetyDD }) {
  const riskPerTrade = accountSize * (riskPercent / 100)
  const propLots = riskPerTrade / (slPips * PIP_VALUE)

  // Challenge
  const cLosses = safetyDD / riskPercent
  const cBrokerPips = cLosses * slPips
  const cBrokerTarget = 2 * testFee
  const cBrokerLots = cBrokerTarget / (cBrokerPips * PIP_VALUE)
  const cBrokerLossPerWin = tpPips * cBrokerLots * PIP_VALUE
  const cFailProfit = cBrokerTarget - testFee
  const cTotalInvestment = testFee + cBrokerLossPerWin

  // Funded
  const fLosses = maxDD / riskPercent
  const fBrokerPips = fLosses * slPips
  const fBrokerTarget = cTotalInvestment
  const fBrokerLots = fBrokerTarget / (fBrokerPips * PIP_VALUE)
  const fTPPips = (accountSize * (fundedTarget / 100)) / (propLots * PIP_VALUE)
  const fBrokerLossOnPayout = fTPPips * fBrokerLots * PIP_VALUE
  const fPayout = accountSize * (fundedTarget / 100) * (profitSplit / 100)
  const fNetProfit = fPayout - fBrokerLossOnPayout

  const minBrokerBalance = testFee + cBrokerLossPerWin + fBrokerLossOnPayout

  return {
    propLots,
    challenge: { losses: cLosses, brokerLots: cBrokerLots, brokerTarget: cBrokerTarget, brokerLossPerWin: cBrokerLossPerWin, failProfit: cFailProfit, totalInvestment: cTotalInvestment },
    funded: { losses: fLosses, brokerLots: fBrokerLots, brokerTarget: fBrokerTarget, tpPips: fTPPips, brokerLossOnPayout: fBrokerLossOnPayout, payout: fPayout, netProfit: fNetProfit },
    minBrokerBalance,
  }
}
