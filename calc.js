/* ============================================================
   Retirement Planner — Calculation Engine (pure functions)
   All money values in Thai Baht. All rates are decimals (0.03 = 3%)
   ============================================================ */

/* ---------- Generic TVM helpers ---------- */
function fv(pv, r, n) { return pv * Math.pow(1 + r, n); }
function pv(fvAmt, r, n) { return fvAmt / Math.pow(1 + r, n); }

function growingAnnuityFV(C1, r, g, n, due) {
  if (n <= 0) return 0;
  let val;
  if (Math.abs(r - g) < 1e-9) val = C1 * n * Math.pow(1 + r, n - 1);
  else val = (C1 * (Math.pow(1 + r, n) - Math.pow(1 + g, n))) / (r - g);
  if (due) val *= (1 + r);
  return val;
}
function growingAnnuityPV(C1, r, g, n, due) {
  if (n <= 0) return 0;
  let val;
  if (Math.abs(r - g) < 1e-9) val = (C1 * n) / (1 + r);
  else val = (C1 / (r - g)) * (1 - Math.pow((1 + g) / (1 + r), n));
  if (due) val *= (1 + r);
  return val;
}
function pmtFromFVGrowing(target, r, g, n, due) {
  if (n <= 0) return 0;
  let base;
  if (Math.abs(r - g) < 1e-9) base = n * Math.pow(1 + r, n - 1);
  else base = (Math.pow(1 + r, n) - Math.pow(1 + g, n)) / (r - g);
  if (due) base *= (1 + r);
  return base === 0 ? 0 : target / base;
}
function pmtFromPVGrowing(pvAmt, r, g, n, due) {
  if (n <= 0) return 0;
  let base;
  if (Math.abs(r - g) < 1e-9) base = n / (1 + r);
  else base = (1 / (r - g)) * (1 - Math.pow((1 + g) / (1 + r), n));
  if (due) base *= (1 + r);
  return base === 0 ? 0 : pvAmt / base;
}
function annuityFV(pmt, r, n, due) {
  if (n <= 0) return 0;
  if (r === 0) return pmt * n;
  let val = pmt * ((Math.pow(1 + r, n) - 1) / r);
  if (due) val *= (1 + r);
  return val;
}
function pmtFromFV(target, r, n, due) {
  if (n <= 0) return 0;
  if (r === 0) return target / n;
  let factor = (Math.pow(1 + r, n) - 1) / r;
  if (due) factor *= (1 + r);
  return target / factor;
}

/* ---------- ปี พ.ศ. helpers ---------- */
function toBE(adYear) { return adYear + 543; }
function yearForAge(currentYearAD, currentAge, targetAge) {
  return currentYearAD + (targetAge - currentAge);
}

/* ---------- กองทุนสำรองเลี้ยงชีพ / กบข. (defined contribution, year-by-year) ----------
   tiers: [{minYears: number, employerRate: decimal}], sorted ascending by minYears
   returns { finalBalance, path:[{year, age, salaryAnnual, employeeContrib, employerContrib, balance}] } */
function simulatePVD(opts) {
  const { startSalaryMonthly, salaryGrowth, employeeRate, employerMode, employerFlatRate,
          employerTiers, fundReturn, yearsToRetire, startingBalance, serviceYearsSoFar, currentAge } = opts;
  let balance = startingBalance || 0;
  let salary = startSalaryMonthly;
  const path = [];
  for (let y = 1; y <= yearsToRetire; y++) {
    const startBalance = balance;
    const annualSalary = salary * 12;
    const serviceYears = (serviceYearsSoFar || 0) + y;
    let employerRate = employerFlatRate;
    if (employerMode === 'tiered' && employerTiers && employerTiers.length) {
      const sorted = [...employerTiers].sort((a, b) => a.minYears - b.minYears);
      employerRate = sorted[0].employerRate;
      for (const t of sorted) if (serviceYears >= t.minYears) employerRate = t.employerRate;
    }
    const employeeContrib = annualSalary * employeeRate;
    const employerContrib = annualSalary * employerRate;
    const interestEarned = startBalance * fundReturn;
    balance = balance * (1 + fundReturn) + employeeContrib + employerContrib;
    path.push({ year: y, age: currentAge + y, salaryAnnual: annualSalary, employeeContrib, employerContrib, employerRate, startBalance, interestEarned, balance });
    salary = salary * (1 + salaryGrowth);
  }
  return { finalBalance: balance, path };
}

/* ---------- ประกันสังคม บำนาญชราภาพ ---------- */
function ssoPensionMonthly(avgWageCapped, monthsPaid) {
  if (monthsPaid < 180) return 0; // ต้องส่งเงินสมทบครบ 180 เดือน (15 ปี) จึงได้บำนาญ
  const yearsPaid = monthsPaid / 12;
  const extraYears = Math.max(0, yearsPaid - 15);
  const pct = 20 + extraYears * 1.5;
  return (avgWageCapped * pct) / 100;
}

/* ---------- เงินชดเชยตามกฎหมายแรงงาน (severance) ---------- */
function severanceMonths(totalServiceYears) {
  const days = totalServiceYears * 365;
  if (days < 120) return 0;
  if (days < 365) return 1;
  if (days < 365 * 3) return 3;
  if (days < 365 * 6) return 6;
  if (days < 365 * 10) return 8;
  if (days < 365 * 20) return 10;
  return 400 / 30; // 13.33 เดือน
}

/* ---------- Drawdown simulation หลังเกษียณ ---------- */
function simulateDrawdown(startBalance, w1Annual, inflation, extraAnnualIncome, postReturn, years, oneOffs) {
  // oneOffs: { [yearIndex]: amount } net cashflow (positive=inflow) applied that year (year 1..years)
  let balance = startBalance;
  const path = [{ year: 0, balance }];
  for (let y = 1; y <= years; y++) {
    const withdrawal = w1Annual * Math.pow(1 + inflation, y - 1);
    const oneOff = (oneOffs && oneOffs[y]) || 0;
    balance = balance * (1 + postReturn) + extraAnnualIncome + oneOff - withdrawal;
    path.push({ year: y, balance, withdrawal });
  }
  return { finalBalance: balance, path };
}
function solveSustainableW1(startBalance, inflation, extraAnnualIncome, postReturn, years, oneOffs) {
  let lo = 0, hi = Math.max(startBalance * 4, 1e6) + 1;
  for (let i = 0; i < 90; i++) {
    const mid = (lo + hi) / 2;
    const { finalBalance } = simulateDrawdown(startBalance, mid, inflation, extraAnnualIncome, postReturn, years, oneOffs);
    if (finalBalance > 0) lo = mid; else hi = mid;
  }
  return lo;
}
function findDepletionYear(startBalance, w1Annual, inflation, extraAnnualIncome, postReturn, maxYears, oneOffs) {
  let balance = startBalance;
  for (let y = 1; y <= maxYears; y++) {
    const withdrawal = w1Annual * Math.pow(1 + inflation, y - 1);
    const oneOff = (oneOffs && oneOffs[y]) || 0;
    balance = balance * (1 + postReturn) + extraAnnualIncome + oneOff - withdrawal;
    if (balance <= 0) return y;
  }
  return null;
}

var RPCalc = {
  fv: fv, pv: pv, growingAnnuityFV: growingAnnuityFV, growingAnnuityPV: growingAnnuityPV,
  pmtFromFVGrowing: pmtFromFVGrowing, pmtFromPVGrowing: pmtFromPVGrowing,
  annuityFV: annuityFV, pmtFromFV: pmtFromFV, toBE: toBE, yearForAge: yearForAge,
  simulatePVD: simulatePVD, ssoPensionMonthly: ssoPensionMonthly,
  severanceMonths: severanceMonths, simulateDrawdown: simulateDrawdown,
  solveSustainableW1: solveSustainableW1, findDepletionYear: findDepletionYear
};
if (typeof module !== 'undefined') { module.exports = RPCalc; }
if (typeof window !== 'undefined') { window.RPCalc = RPCalc; }

/* ============================================================
   v2 additions — glide-path accumulation, bucket sizing, richer drawdown
   ============================================================ */

/* rate that applies at a given age, from a sorted list of segments
   segments: [{fromAge, toAge, returnRate}] (inclusive fromAge, exclusive toAge except last) */
function glideRateAt(age, segments, fallbackRate) {
  if (!segments || !segments.length) return fallbackRate;
  var sorted = segments.slice().sort(function (a, b) { return a.fromAge - b.fromAge; });
  var rate = sorted[0].returnRate;
  for (var i = 0; i < sorted.length; i++) {
    if (age >= sorted[i].fromAge) rate = sorted[i].returnRate;
  }
  return rate;
}

/* year-by-year accumulation of a lump sum + regular contribution under a glide path */
function simulateGlideAccumulation(opts) {
  var pv0 = opts.pv0 || 0, regularAnnual = opts.regularAnnual || 0, due = opts.due,
      startAge = opts.startAge, years = opts.years, segments = opts.segments, flatRate = opts.flatRate;
  var balance = pv0;
  var path = [{ year: 0, age: startAge, rate: null, balance: balance }];
  for (var y = 1; y <= years; y++) {
    var age = startAge + y - 1;
    var rate = segments && segments.length ? glideRateAt(age, segments, flatRate) : flatRate;
    if (due) balance += regularAnnual;
    balance = balance * (1 + rate);
    if (!due) balance += regularAnnual;
    path.push({ year: y, age: startAge + y, rate: rate, balance: balance });
  }
  return { finalBalance: balance, path: path };
}

/* compound a single contribution amount from ageReceived to targetAge along a glide path */
function fvAlongGlide(amount, ageReceived, targetAge, segments, flatRate) {
  var balance = amount;
  for (var age = ageReceived; age < targetAge; age++) {
    var rate = segments && segments.length ? glideRateAt(age, segments, flatRate) : flatRate;
    balance *= (1 + rate);
  }
  return balance;
}

/* Required amount (in today's-at-retirement money) for one bucket, netting a flat pension stream,
   then discounted back to retirement date across the waiting years at waitingReturn. */
function bucketRequiredToday(needAnnualAtBucketStart, pensionAnnualFlat, drawdownReturn, inflation, bucketYears, waitingReturn, yearsUntilBucketStarts) {
  var pvAtBucketStart = growingAnnuityPV(needAnnualAtBucketStart, drawdownReturn, inflation, bucketYears, true)
    - (pensionAnnualFlat > 0 ? growingAnnuityPV(pensionAnnualFlat, drawdownReturn, 0, bucketYears, true) : 0);
  pvAtBucketStart = Math.max(0, pvAtBucketStart);
  return pvAtBucketStart / Math.pow(1 + waitingReturn, yearsUntilBucketStarts);
}

/* Forward simulation across sequential buckets — for charting / detail tables.
   buckets: [{years, waitingReturn, drawdownReturn, requiredToday}]
   needAnnualFn(yearIndex) -> desired annual withdrawal that year (1-based, inflation already applied)
   pensionAnnualFn(yearIndex) -> flat pension income that year (SSO + annuities + recurring post-retirement income) */
function simulateBucketsForward(buckets, needAnnualFn, pensionAnnualFn, totalYears, oneOffs) {
  var bals = buckets.map(function (b) { return b.requiredToday; });
  var bounds = [];
  var acc = 0;
  buckets.forEach(function (b) { bounds.push([acc, acc + b.years]); acc += b.years; });
  var path = [{ year: 0, balance: bals.reduce(function (s, v) { return s + v; }, 0), buckets: bals.slice() }];
  var shortfallStartYear = null;
  for (var y = 1; y <= totalYears; y++) {
    var need = needAnnualFn(y);
    var pension = pensionAnnualFn(y);
    var oneOff = (oneOffs && oneOffs[y]) || 0;
    for (var i = 0; i < buckets.length; i++) {
      var active = y > bounds[i][0] && y <= bounds[i][1];
      if (active) {
        var proposed = bals[i] * (1 + buckets[i].drawdownReturn) + pension - need + oneOff;
        if (proposed < 0) {
          if (shortfallStartYear === null) shortfallStartYear = y;
          bals[i] = 0;
        } else bals[i] = proposed;
      } else if (y <= bounds[i][0]) {
        bals[i] = bals[i] * (1 + buckets[i].waitingReturn);
      }
      // once its own window has passed (y>bounds[i][1]) balance stays as last (should be ~0)
    }
    path.push({ year: y, balance: bals.reduce(function (s, v) { return s + v; }, 0), buckets: bals.slice() });
  }
  return { path: path, shortfallStartYear: shortfallStartYear };
}

/* Generalized drawdown with variable pension income per year + shortfall tracking */
function simulateDrawdown2(startBalance, needAnnualFn, pensionAnnualFn, postReturn, years, oneOffs) {
  var balance = startBalance;
  var path = [{ year: 0, balance: balance, shortfall: 0 }];
  var shortfallStartYear = null;
  for (var y = 1; y <= years; y++) {
    var need = needAnnualFn(y);
    var pension = pensionAnnualFn(y);
    var oneOff = (oneOffs && oneOffs[y]) || 0;
    var proposed = balance * (1 + postReturn) + pension + oneOff - need;
    var shortfall = 0;
    if (proposed < 0) {
      shortfall = -proposed;
      if (shortfallStartYear === null) shortfallStartYear = y;
      proposed = 0;
    }
    balance = proposed;
    path.push({ year: y, balance: balance, shortfall: shortfall });
  }
  return { path: path, shortfallStartYear: shortfallStartYear };
}

Object.assign(RPCalc, {
  glideRateAt: glideRateAt,
  simulateGlideAccumulation: simulateGlideAccumulation,
  fvAlongGlide: fvAlongGlide,
  bucketRequiredToday: bucketRequiredToday,
  simulateBucketsForward: simulateBucketsForward,
  simulateDrawdown2: simulateDrawdown2
});
if (typeof module !== 'undefined') { module.exports = RPCalc; }

/* ============================================================
   Phase 1 — Foundational personal finance calculations
   ============================================================ */

function sumBy(list, key) { return (list || []).reduce(function (s, it) { return s + (it[key] || 0); }, 0); }

function computeNetWorth(assets, liabilities) {
  var totalAssets = sumBy(assets, 'value');
  var totalLiabilities = sumBy(liabilities, 'balance');
  return { totalAssets: totalAssets, totalLiabilities: totalLiabilities, netWorth: totalAssets - totalLiabilities };
}

function computeCashFlow(incomeItems, expenseItems, liabilities) {
  var totalIncome = sumBy(incomeItems, 'monthlyAmount');
  var totalExpenses = sumBy(expenseItems, 'monthlyAmount');
  var totalDebtPayment = sumBy(liabilities, 'monthlyPayment');
  var netCashFlow = totalIncome - totalExpenses - totalDebtPayment;
  var dti = totalIncome > 0 ? totalDebtPayment / totalIncome : 0;
  return { totalIncome: totalIncome, totalExpenses: totalExpenses, totalDebtPayment: totalDebtPayment, netCashFlow: netCashFlow, dti: dti };
}

function computeEmergencyFund(essentialMonthlyExpenses, targetMonths, liquidAssets) {
  var target = essentialMonthlyExpenses * targetMonths;
  var gap = Math.max(0, target - liquidAssets);
  var monthsCovered = essentialMonthlyExpenses > 0 ? liquidAssets / essentialMonthlyExpenses : 0;
  return { target: target, gap: gap, monthsCovered: monthsCovered };
}

/* Simple multi-year net worth projection:
   - each asset compounds at its own expected return
   - each liability pays down linearly by its monthly payment (floored at 0)
   - any positive net monthly cash flow surplus is assumed saved and compounds at a modest blended rate */
function projectNetWorth(assets, liabilities, netMonthlyCashFlow, years, surplusReturn) {
  var assetTotal = (assets || []).reduce(function (s, a) { return s + fv(a.value, a.expectedReturn || 0, years); }, 0);
  var liabTotal = (liabilities || []).reduce(function (s, l) {
    var remaining = l.balance - (l.monthlyPayment || 0) * 12 * years;
    return s + Math.max(0, remaining);
  }, 0);
  var annualSurplus = Math.max(0, netMonthlyCashFlow) * 12;
  var surplusFV = annuityFV(annualSurplus, surplusReturn || 0.02, years, false);
  return { assetTotal: assetTotal, liabTotal: liabTotal, surplusFV: surplusFV, netWorth: assetTotal - liabTotal + surplusFV };
}

Object.assign(RPCalc, {
  sumBy: sumBy, computeNetWorth: computeNetWorth, computeCashFlow: computeCashFlow,
  computeEmergencyFund: computeEmergencyFund, projectNetWorth: projectNetWorth
});
if (typeof module !== 'undefined') { module.exports = RPCalc; }

/* Standard loan amortization payment (e.g., mortgage/car loan) */
function loanPayment(principal, annualRate, termYears) {
  var r = annualRate / 12, n = termYears * 12;
  if (n <= 0) return 0;
  if (r === 0) return principal / n;
  return principal * r / (1 - Math.pow(1 + r, -n));
}

Object.assign(RPCalc, { loanPayment: loanPayment });
if (typeof module !== 'undefined') { module.exports = RPCalc; }

var ASSET_CLASS_ASSUMPTIONS = { cash: { return: 0.015, vol: 0.02 }, bonds: { return: 0.035, vol: 0.05 }, stocks: { return: 0.08, vol: 0.18 }, alternatives: { return: 0.06, vol: 0.12 } };
function blendAllocation(alloc) {
  var r = 0, v = 0;
  Object.keys(ASSET_CLASS_ASSUMPTIONS).forEach(function (k) { r += (alloc[k] || 0) * ASSET_CLASS_ASSUMPTIONS[k].return; v += (alloc[k] || 0) * ASSET_CLASS_ASSUMPTIONS[k].vol; });
  return { blendedReturn: r, blendedVol: v };
}
Object.assign(RPCalc, { ASSET_CLASS_ASSUMPTIONS: ASSET_CLASS_ASSUMPTIONS, blendAllocation: blendAllocation });
if (typeof module !== 'undefined') { module.exports = RPCalc; }

function toMonthly(amount, frequency) {
  if (frequency === 'annual') return amount / 12;
  if (frequency === 'semiannual') return amount / 6;
  if (frequency === 'quarterly') return amount / 3;
  return amount;
}
function effectiveAnnualGrowth(growthRate, adjustFrequencyYears) {
  var n = adjustFrequencyYears || 1;
  if (n <= 1) return growthRate;
  return Math.pow(1 + growthRate, 1 / n) - 1;
}
Object.assign(RPCalc, { toMonthly: toMonthly, effectiveAnnualGrowth: effectiveAnnualGrowth });
if (typeof module !== 'undefined') { module.exports = RPCalc; }
