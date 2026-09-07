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
    balance = balance * (1 + fundReturn) + employeeContrib + employerContrib;
    path.push({ year: y, age: currentAge + y, salaryAnnual: annualSalary, employeeContrib, employerContrib, employerRate, balance });
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
