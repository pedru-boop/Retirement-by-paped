/* ============================================================
   Retirement Planner v2 — Vanilla JS, no external dependencies
   ============================================================ */
(function () {
  'use strict';
  var APP_VERSION = 'v1.5 — ประกันกลับมา + เทียบสถานการณ์ + สรุปแผนลูกค้า';
  var LOGO_B64 = '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';
  var C = window.RPCalc;

  /* ---------- utils ---------- */
  function uid() { return Math.random().toString(36).slice(2, 10); }
  function fmt(n) { if (n === null || n === undefined || isNaN(n)) return '-'; return Math.round(n).toLocaleString('en-US'); }
  function incomeMonthlyEquiv(it) { return C.toMonthly(it.amount, it.frequency); }
  function incomeEffectiveGrowth(it) { return C.effectiveAnnualGrowth(it.growthRate || 0, it.adjustFrequencyYears || 1); }
  function sumCurrentInvestments(inv) { return (inv.currentInvestments.items || []).reduce(function (s, it) { return s + (it.amount || 0); }, 0); }
  function sumRecurringInvestmentsMonthly(inv) { return (inv.recurringInvestments.items || []).reduce(function (s, it) { return s + C.toMonthly(it.amount, it.frequency); }, 0); }
  function weightedAvgReturn(items) {
    var total = items.reduce(function (s, it) { return s + (it.amount || 0); }, 0);
    if (total <= 0) return 0;
    return items.reduce(function (s, it) { return s + (it.amount || 0) * (it.returnRate || 0); }, 0) / total;
  }
  function fmtSigned(n) { if (!n) return '-'; return (n > 0 ? '+' : '') + fmt(n); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function getPath(obj, path) { var cur = obj; for (var i = 0; i < path.length; i++) { if (cur == null) return undefined; cur = cur[path[i]]; } return cur; }
  function setPath(obj, path, val) { var cur = obj; for (var i = 0; i < path.length - 1; i++) cur = cur[path[i]]; cur[path[path.length - 1]] = val; }
  function pathAttr(path) { return esc(JSON.stringify(path)); }
  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

  /* ---------- default case ---------- */
  function defaultBuckets(yearsRetired) {
    return { list: [{ id: uid(), label: 'พอร์ตเดียวตลอดช่วงเกษียณ', years: yearsRetired || 25, waitingReturn: 0.02, drawdownReturn: 0.04 }] };
  }
  function newCase(name, blank) {
    var thisYear = new Date().getFullYear();
    if (blank) {
      return {
        id: uid(), name: name || 'ลูกค้าใหม่',
        personal: {
          clientName: '', currentAge: 35, retireAge: 60, lifeExpectancy: 85,
          currentYearAD: thisYear, currentSalary: 0, salaryGrowth: 0.03,
          spendingMethod: 'replacement', replacementRate: 0.7, customMonthlyExpense: 0,
          inflation: 0.03,
          gender: '', maritalStatus: '', numChildren: 0, occupation: '', province: ''
        },
        preRetirementPortfolio: { mode: 'flat', flatReturn: 0.05, segments: [] },
        assumptions: { educationInflation: 0.05, returnLow: 0.03, returnMid: 0.05, returnHigh: 0.08, inflationPreRetire: 0.03, inflationPostRetire: 0.03, returnPreRetire: 0.06, returnPostRetire: 0.04 },
        pvd: { enabled: false, employeeRate: 0.03, employerMode: 'flat', employerFlatRate: 0.03, employerTiers: [], fundReturn: 0.04, startingBalance: 0, serviceYearsSoFar: 0 },
        sso: { enabled: false, avgWageCapped: 15000, monthsPaidSoFar: 0 },
        severance: { enabled: false },
        goalsEnabled: false, windfallsEnabled: false, healthInsuranceEnabled: false,
        goals: [],
        currentSavings: { items: [] },
        regularSavings: { items: [] },
        windfalls: [],
        healthInsurance: { bands: [] },
        extraSavingMode: 'flat', extraSavingReturn: 0.05,
        buckets: defaultBuckets(25),
        stressTestDelta: -0.01,
        finance: {
          income: { items: [] },
          expenses: { regular: { items: [] }, irregular: { items: [] } },
          assets: { items: [] },
          liabilities: { items: [] },
          emergencyFund: { targetMonths: 6 },
          cashFlowSurplusReturn: 0.02,
          goals: { items: [] },
          education: { children: [] },
          majorPurchases: { items: [] },
          investment: { currentInvestments: { items: [] }, recurringInvestments: { items: [] }, years: 10, riskLevel: 'moderate', allocation: { cash: 0.15, bonds: 0.35, stocks: 0.4, alternatives: 0.1 } },
          insurance: {
            life: { yearsOfSupport: 10, familyLivingExpenseAnnual: 0, finalExpenses: 100000, legacyAmount: 0, existingCoverage: 0 },
            otherPolicies: { items: [] }
          }
        }
      };
    }
    return {
      id: uid(), name: name || 'ลูกค้าใหม่',
      personal: {
        clientName: '', currentAge: 35, retireAge: 60, lifeExpectancy: 85,
        currentYearAD: thisYear, currentSalary: 30000, salaryGrowth: 0.03,
        spendingMethod: 'replacement', replacementRate: 0.7, customMonthlyExpense: 25000,
        inflation: 0.03,
        gender: '', maritalStatus: '', numChildren: 0, occupation: '', province: ''
      },
      preRetirementPortfolio: { mode: 'flat', flatReturn: 0.05, segments: [{ id: uid(), fromAge: 35, toAge: 51, returnRate: 0.07 }, { id: uid(), fromAge: 51, toAge: 60, returnRate: 0.03 }] },
      assumptions: { educationInflation: 0.05, returnLow: 0.03, returnMid: 0.05, returnHigh: 0.08, inflationPreRetire: 0.03, inflationPostRetire: 0.03, returnPreRetire: 0.06, returnPostRetire: 0.04 },
      pvd: {
        enabled: true, employeeRate: 0.03, employerMode: 'flat', employerFlatRate: 0.03,
        employerTiers: [{ minYears: 0, employerRate: 0.03 }, { minYears: 5, employerRate: 0.05 }, { minYears: 10, employerRate: 0.07 }],
        fundReturn: 0.04, startingBalance: 0, serviceYearsSoFar: 3
      },
      sso: { enabled: true, avgWageCapped: 15000, monthsPaidSoFar: 60 },
      severance: { enabled: true },
      goalsEnabled: true, windfallsEnabled: true, healthInsuranceEnabled: true,
      goals: [{ id: uid(), name: 'เป้าหมายตัวอย่าง (แก้ไข/ลบได้)', startAge: 40, endAge: 40, amountToday: 200000, returnRate: 0.05 }],
      currentSavings: { items: [
        { id: uid(), name: 'กองทุนรวมหุ้น (ตัวอย่าง)', amount: 200000, returnRate: 0.07 },
        { id: uid(), name: 'เงินฝากประจำ (ตัวอย่าง)', amount: 100000, returnRate: 0.02 }
      ] },
      regularSavings: { items: [{ id: uid(), frequency: 'monthly', amount: 5000, timing: 'end', returnRate: 0.05 }] },
      windfalls: [{ id: uid(), description: 'เงินก้อนตัวอย่าง (แก้ไข/ลบได้)', flowType: 'lumpsum', amount: 100000, ageReceived: 60, frequency: 'annual', amountPerPeriod: 10000, startAge: 61, endAge: 65 }],
      healthInsurance: { bands: [{ id: uid(), fromAge: 61, toAge: 70, annualPremiumToday: 30000 }] },
      extraSavingMode: 'flat', extraSavingReturn: 0.05,
      buckets: defaultBuckets(25),
      stressTestDelta: -0.01,
      finance: {
        income: { items: [{ id: uid(), frequency: 'monthly', category: 'เงินเดือน (ตัวอย่าง)', amount: 30000, growthRate: 0.03, adjustFrequencyYears: 1 }] },
        expenses: {
          regular: { items: [{ id: uid(), expenseType: 'fixed', category: 'ค่าใช้จ่ายทั่วไป (ตัวอย่าง)', amount: 15000, frequency: 'monthly' }] },
          irregular: { items: [] }
        },
        assets: { items: [{ id: uid(), mainCategory: 'liquid', name: 'บัญชีออมทรัพย์ (ตัวอย่าง)', value: 100000 }] },
        liabilities: { items: [] },
        emergencyFund: { targetMonths: 6 },
        cashFlowSurplusReturn: 0.02,
        goals: { items: [{ id: uid(), name: 'ซื้อรถใหม่ (ตัวอย่าง)', amountToday: 800000, startAge: 40, endAge: 40, frequency: 'once' }] },
        education: { children: [{ id: uid(), childName: 'บุตรตัวอย่าง', childCurrentAge: 8, items: [{ id: uid(), level: 'mattayom1_3', annualCostToday: 60000, inflationRate: 0.05 }] }] },
        majorPurchases: { items: [{ id: uid(), name: 'บ้านหลังแรก (ตัวอย่าง)', price: 3000000, downPaymentPercent: 0.1, interestRate: 0.055, loanTermYears: 30, extraCosts: 50000 }] },
        investment: { currentInvestments: { items: [{ id: uid(), type: 'กองทุนรวมหุ้น (ตัวอย่าง)', amount: 200000, returnRate: 0.07 }] }, recurringInvestments: { items: [{ id: uid(), type: 'DCA กองทุนรวม (ตัวอย่าง)', frequency: 'monthly', amount: 5000, returnRate: 0.07 }] }, years: 15, riskLevel: 'moderate', allocation: { cash: 0.15, bonds: 0.35, stocks: 0.4, alternatives: 0.1 } },
        insurance: {
          life: { yearsOfSupport: 10, familyLivingExpenseAnnual: 180000, finalExpenses: 100000, legacyAmount: 500000, existingCoverage: 1000000 },
          otherPolicies: { items: [
            { id: uid(), type: 'ประกันสุขภาพ (ตัวอย่าง)', currentCoverage: 500000, recommendedCoverage: 1000000 },
            { id: uid(), type: 'ประกันอุบัติเหตุ (ตัวอย่าง)', currentCoverage: 200000, recommendedCoverage: 500000 }
          ] }
        }
      }
    };
  }

  /* ---------- storage ---------- */
  var STORE_KEY = 'retirementPlannerCases_v2';
  function loadStore() { try { var raw = localStorage.getItem(STORE_KEY); return raw ? JSON.parse(raw) : null; } catch (e) { return null; } }
  function saveStore() { try { localStorage.setItem(STORE_KEY, JSON.stringify(STORE)); } catch (e) {} }
  /* keep all later health-insurance age bands chained to whichever one was just edited: each subsequent
     band starts right after the previous one ends, keeping its own original length */
  function cascadeHealthBands(a, editedIndex) {
    var bands = a.healthInsurance.bands;
    for (var i = editedIndex + 1; i < bands.length; i++) {
      var prevSpan = Math.max(1, bands[i].toAge - bands[i].fromAge);
      bands[i].fromAge = bands[i - 1].toAge + 1;
      bands[i].toAge = bands[i].fromAge + prevSpan;
    }
  }

  /* Merge a loaded (possibly older-format) case onto a fresh default case, so old
     saved data from earlier versions of this tool never crashes the app. */
  function mergeObj(target, source) {
    if (!source || typeof source !== 'object') return target;
    Object.keys(target).forEach(function (k) { if (source[k] !== undefined) target[k] = source[k]; });
    return target;
  }
  var EDUCATION_LEVELS = [
    { value: 'kindergarten', label: 'อนุบาล', startAge: 3, years: 3 },
    { value: 'prathom1_3', label: 'ประถมศึกษาปีที่ 1-3', startAge: 6, years: 3 },
    { value: 'prathom4_6', label: 'ประถมศึกษาปีที่ 4-6', startAge: 9, years: 3 },
    { value: 'mattayom1_3', label: 'มัธยมศึกษาปีที่ 1-3', startAge: 12, years: 3 },
    { value: 'mattayom4_6', label: 'มัธยมศึกษาปีที่ 4-6', startAge: 15, years: 3 },
    { value: 'bachelor', label: 'ปริญญาตรี', startAge: 18, years: 4 },
    { value: 'master', label: 'ปริญญาโท', startAge: 22, years: 2 }
  ];
  function educationLevelInfo(value) { return EDUCATION_LEVELS.filter(function (l) { return l.value === value; })[0] || EDUCATION_LEVELS[0]; }
  function normalizeCase(loaded) {
    try {
      var base = newCase(loaded.name || 'เคส');
      base.id = loaded.id || base.id;
      base.name = loaded.name || base.name;
      base.personal = mergeObj(base.personal, loaded.personal);
      /* migrate old finance.personal (gender/maritalStatus/numChildren/occupation/province) into the merged personal object */
      if (loaded.finance && loaded.finance.personal) base.personal = mergeObj(base.personal, loaded.finance.personal);
      if (loaded.preRetirementPortfolio && Array.isArray(loaded.preRetirementPortfolio.segments)) base.preRetirementPortfolio = loaded.preRetirementPortfolio;
      base.assumptions = mergeObj(base.assumptions, loaded.assumptions);
      base.pvd = mergeObj(base.pvd, loaded.pvd);
      if (loaded.pvd && Array.isArray(loaded.pvd.employerTiers) && loaded.pvd.employerTiers.length) base.pvd.employerTiers = loaded.pvd.employerTiers;
      base.sso = mergeObj(base.sso, loaded.sso);
      base.severance = mergeObj(base.severance, loaded.severance);
      base.goalsEnabled = typeof loaded.goalsEnabled === 'boolean' ? loaded.goalsEnabled : (Array.isArray(loaded.goals) && loaded.goals.length > 0);
      base.windfallsEnabled = typeof loaded.windfallsEnabled === 'boolean' ? loaded.windfallsEnabled : (Array.isArray(loaded.windfalls) && loaded.windfalls.length > 0);
      base.healthInsuranceEnabled = typeof loaded.healthInsuranceEnabled === 'boolean' ? loaded.healthInsuranceEnabled : (loaded.healthInsurance && Array.isArray(loaded.healthInsurance.bands) && loaded.healthInsurance.bands.length > 0);
      /* migrate old goal shapes: kind/phase/targetAge -> startAge/endAge (drop 'premium' kind entirely, folded into healthInsurance) */
      if (Array.isArray(loaded.goals)) {
        base.goals = loaded.goals.filter(function (g) { return g.kind !== 'premium'; }).map(function (g) {
          var startAge = g.startAge != null ? g.startAge : (g.targetAge != null ? g.targetAge : base.personal.currentAge + 5);
          var endAge = g.endAge != null ? g.endAge : (g.targetAge != null ? g.targetAge : startAge);
          return { id: g.id || uid(), name: g.name || 'เป้าหมาย', startAge: startAge, endAge: endAge, amountToday: g.amountToday != null ? g.amountToday : 100000, returnRate: g.returnRate != null ? g.returnRate : 0.05 };
        });
        if (!base.goals.length) base.goals = [];
      }
      /* migrate old life annuities into recurring windfalls (post-retirement income) */
      var migratedAnnuityWindfalls = [];
      if (Array.isArray(loaded.lifeAnnuities)) {
        migratedAnnuityWindfalls = loaded.lifeAnnuities.map(function (la) {
          return { id: la.id || uid(), description: la.label || 'บำนาญประกันชีวิต', flowType: 'recurring', frequency: 'annual', amountPerPeriod: la.amountPerYear || 0, startAge: la.startAge || base.personal.retireAge, endAge: la.endAge != null ? la.endAge : (base.personal.lifeExpectancy) };
        });
      }
      /* migrate old currentSavings.amount (single value) -> items[] (list) */
      if (loaded.currentSavings) {
        if (Array.isArray(loaded.currentSavings.items) && loaded.currentSavings.items.length) {
          base.currentSavings = { items: loaded.currentSavings.items };
        } else if (typeof loaded.currentSavings.amount === 'number') {
          base.currentSavings = { items: [{ id: uid(), name: 'เงินออม/เงินลงทุนเดิม', amount: loaded.currentSavings.amount, returnRate: 0.05 }] };
        }
      }
      if (loaded.regularSavings) {
        if (Array.isArray(loaded.regularSavings.items) && loaded.regularSavings.items.length) {
          base.regularSavings = { items: loaded.regularSavings.items };
        } else if (typeof loaded.regularSavings.amount === 'number') {
          base.regularSavings = { items: [{ id: uid(), frequency: loaded.regularSavings.frequency || 'monthly', amount: loaded.regularSavings.amount, timing: loaded.regularSavings.timing || 'end', returnRate: 0.05 }] };
        }
      }
      if (Array.isArray(loaded.windfalls)) {
        base.windfalls = loaded.windfalls.map(function (w) {
          var endAge = w.endAge != null ? w.endAge : (w.durationYears != null ? (w.startAge || base.personal.retireAge) + w.durationYears - 1 : (w.startAge || base.personal.retireAge) + 4);
          return {
            id: w.id || uid(), description: w.description || 'เงินก้อน', flowType: w.flowType || 'lumpsum',
            amount: w.amount != null ? w.amount : 100000, ageReceived: w.ageReceived != null ? w.ageReceived : base.personal.retireAge,
            frequency: w.frequency || 'annual', amountPerPeriod: w.amountPerPeriod != null ? w.amountPerPeriod : 10000,
            startAge: w.startAge != null ? w.startAge : base.personal.retireAge, endAge: endAge
          };
        }).concat(migratedAnnuityWindfalls);
      } else if (migratedAnnuityWindfalls.length) {
        base.windfalls = base.windfalls.concat(migratedAnnuityWindfalls);
      }
      if (loaded.healthInsurance && Array.isArray(loaded.healthInsurance.bands)) base.healthInsurance = loaded.healthInsurance;
      base.extraSavingMode = loaded.extraSavingMode || base.extraSavingMode;
      if (typeof loaded.extraSavingReturn === 'number') base.extraSavingReturn = loaded.extraSavingReturn;
      if (loaded.buckets && Array.isArray(loaded.buckets.list) && loaded.buckets.list.length) base.buckets = loaded.buckets;
      if (typeof loaded.stressTestDelta === 'number') base.stressTestDelta = loaded.stressTestDelta;
      if (loaded.finance) {
        base.finance = base.finance || { income: { items: [] }, expenses: { regular: { items: [] }, irregular: { items: [] } }, assets: { items: [] }, liabilities: { items: [] }, emergencyFund: { targetMonths: 6 }, cashFlowSurplusReturn: 0.02, goals: { items: [] }, education: { children: [] }, majorPurchases: { items: [] }, investment: { currentInvestments: { items: [] }, recurringInvestments: { items: [] }, years: 10, riskLevel: 'moderate', allocation: { cash: 0.15, bonds: 0.35, stocks: 0.4, alternatives: 0.1 } }, insurance: { life: { yearsOfSupport: 10, familyLivingExpenseAnnual: 0, finalExpenses: 100000, legacyAmount: 0, existingCoverage: 0 }, otherPolicies: { items: [] } } };
        if (loaded.finance.personal) {} /* migrated above into base.personal directly */
        if (loaded.finance.income && Array.isArray(loaded.finance.income.items)) {
          base.finance.income = { items: loaded.finance.income.items.map(function (it) {
            if (it.frequency && typeof it.amount === 'number') return it;
            /* migrate old shape: monthlyAmount only, no explicit frequency */
            return { id: it.id, frequency: 'monthly', category: it.category, amount: it.monthlyAmount, growthRate: it.growthRate, adjustFrequencyYears: 1 };
          }) };
        }
        if (loaded.finance.expenses) {
          if (loaded.finance.expenses.regular && Array.isArray(loaded.finance.expenses.regular.items)) {
            base.finance.expenses.regular = { items: loaded.finance.expenses.regular.items.map(function (it) {
              if (it.expenseType && it.frequency) return it;
              return { id: it.id, expenseType: 'fixed', category: it.category, amount: it.monthlyAmount, frequency: 'monthly' };
            }) };
          }
          if (loaded.finance.expenses.irregular && Array.isArray(loaded.finance.expenses.irregular.items)) base.finance.expenses.irregular = { items: loaded.finance.expenses.irregular.items };
        }
        if (loaded.finance.assets && Array.isArray(loaded.finance.assets.items)) {
          base.finance.assets = { items: loaded.finance.assets.items.map(function (it) {
            if (it.mainCategory) return it;
            /* migrate old free-text category / liquidity into the new 4-way classification */
            var mc = it.liquidity === 'high' ? 'liquid' : (it.liquidity === 'low' ? 'personal' : 'investment');
            return { id: it.id, mainCategory: mc, name: it.name, value: it.value, expectedReturn: it.expectedReturn };
          }) };
        }
        if (loaded.finance.liabilities && Array.isArray(loaded.finance.liabilities.items)) {
          base.finance.liabilities = { items: loaded.finance.liabilities.items.map(function (it) {
            if (it.mainCategory) return it;
            var mc = (it.remainingMonths && it.remainingMonths <= 12) ? 'shortterm' : 'longterm';
            return { id: it.id, mainCategory: mc, name: it.name, balance: it.balance, interestRate: it.interestRate, monthlyPayment: it.monthlyPayment, remainingMonths: it.remainingMonths };
          }) };
        }
        if (loaded.finance.emergencyFund) base.finance.emergencyFund = mergeObj(base.finance.emergencyFund, loaded.finance.emergencyFund);
        if (typeof loaded.finance.cashFlowSurplusReturn === 'number') base.finance.cashFlowSurplusReturn = loaded.finance.cashFlowSurplusReturn;
        if (loaded.finance.goals && Array.isArray(loaded.finance.goals.items)) {
          base.finance.goals = {
            items: loaded.finance.goals.items.map(function (g) {
              if (g.amountToday != null && g.startAge != null) return g; /* already new shape */
              var startAge = g.targetAge != null ? g.targetAge : (base.personal.currentAge + 5);
              return { id: g.id || uid(), name: g.name || 'เป้าหมาย', amountToday: g.targetAmountToday != null ? g.targetAmountToday : (g.amountToday || 0), startAge: startAge, endAge: startAge, frequency: 'once' };
            })
          };
        }
        if (loaded.finance.education && Array.isArray(loaded.finance.education.children)) {
          base.finance.education = { children: loaded.finance.education.children };
        } else if (loaded.finance.education && Array.isArray(loaded.finance.education.items)) {
          /* old flat-item shape (one row per child per level) — group rows sharing the same childName into one child block */
          var flatItems = loaded.finance.education.items.map(function (e) {
            if (e.level) return e;
            var nearestLevel = EDUCATION_LEVELS.reduce(function (best, l) { return Math.abs(l.startAge - (e.startAge || 18)) < Math.abs(best.startAge - (e.startAge || 18)) ? l : best; }, EDUCATION_LEVELS[0]);
            return { id: e.id || uid(), childName: e.childName || 'บุตร', childCurrentAge: e.childCurrentAge != null ? e.childCurrentAge : 5, level: nearestLevel.value, annualCostToday: e.annualCostToday || 0, inflationRate: e.inflationRate != null ? e.inflationRate : base.assumptions.educationInflation };
          });
          var childMap = {}, childOrder = [];
          flatItems.forEach(function (e) {
            var key = e.childName || 'บุตร';
            if (!childMap[key]) { childMap[key] = { id: uid(), childName: key, childCurrentAge: e.childCurrentAge, items: [] }; childOrder.push(key); }
            childMap[key].items.push({ id: e.id || uid(), level: e.level, annualCostToday: e.annualCostToday, inflationRate: e.inflationRate });
          });
          base.finance.education = { children: childOrder.map(function (key) { return childMap[key]; }) };
        }
        if (loaded.finance.majorPurchases && Array.isArray(loaded.finance.majorPurchases.items)) base.finance.majorPurchases = { items: loaded.finance.majorPurchases.items };
        if (loaded.finance.investment) {
          var li = loaded.finance.investment;
          if (li.currentInvestments && Array.isArray(li.currentInvestments.items)) base.finance.investment.currentInvestments = { items: li.currentInvestments.items };
          else if (typeof li.currentAmount === 'number' && li.currentAmount > 0) base.finance.investment.currentInvestments = { items: [{ id: uid(), type: 'เงินลงทุน (ย้ายจากข้อมูลเดิม)', amount: li.currentAmount, returnRate: 0.05 }] };
          if (li.recurringInvestments && Array.isArray(li.recurringInvestments.items)) base.finance.investment.recurringInvestments = { items: li.recurringInvestments.items };
          else if (typeof li.monthlyAmount === 'number' && li.monthlyAmount > 0) base.finance.investment.recurringInvestments = { items: [{ id: uid(), type: 'เงินลงทุนต่อเนื่อง (ย้ายจากข้อมูลเดิม)', frequency: 'monthly', amount: li.monthlyAmount, returnRate: 0.05 }] };
          if (typeof li.years === 'number') base.finance.investment.years = li.years;
          if (li.riskLevel) base.finance.investment.riskLevel = li.riskLevel;
          if (li.allocation) base.finance.investment.allocation = mergeObj(base.finance.investment.allocation, li.allocation);
        }
        if (loaded.finance.insurance) {
          base.finance.insurance = base.finance.insurance || { life: { yearsOfSupport: 10, familyLivingExpenseAnnual: 0, finalExpenses: 100000, legacyAmount: 0, existingCoverage: 0 }, otherPolicies: { items: [] } };
          if (loaded.finance.insurance.life) base.finance.insurance.life = mergeObj(base.finance.insurance.life, loaded.finance.insurance.life);
          if (loaded.finance.insurance.otherPolicies && Array.isArray(loaded.finance.insurance.otherPolicies.items)) base.finance.insurance.otherPolicies = { items: loaded.finance.insurance.otherPolicies.items };
        }
      }
      return base;
    } catch (e) {
      return newCase(loaded && loaded.name ? loaded.name : 'เคส (กู้คืนไม่สำเร็จ)');
    }
  }

  /* Keep data across app opens (auto-save as you work), until the user explicitly clears it. */
  var STORE = loadStore();
  if (!STORE || !STORE.cases || !Object.keys(STORE.cases).length) {
    var c0 = newCase('ลูกค้ารายที่ 1');
    STORE = { activeId: c0.id, cases: {} };
    STORE.cases[c0.id] = c0;
  } else {
    var normalizedCases = {};
    Object.keys(STORE.cases).forEach(function (id) { normalizedCases[id] = normalizeCase(STORE.cases[id]); });
    STORE.cases = normalizedCases;
    if (!STORE.cases[STORE.activeId]) STORE.activeId = Object.keys(STORE.cases)[0];
  }
  var OPEN = {};
  var TAB = 'client'; /* 'client' | 'calc' | 'dashboard' */
  var COMPARE_ID = null;

  function activeCase() { return STORE.cases[STORE.activeId]; }

  /* ================= FIELD TEMPLATES ================= */
  function rawInput(path, value, opts) {
    opts = opts || {};
    var type = opts.type || 'number';
    var pa = pathAttr(path);
    if (type === 'select') {
      var optsHtml = opts.options.map(function (o) {
        return '<option value="' + esc(o.value) + '"' + (o.value === value ? ' selected' : '') + '>' + esc(o.label) + '</option>';
      }).join('');
      return '<select class="inp" data-path=\'' + pa + '\' data-type="select">' + optsHtml + '</select>';
    } else if (type === 'text') {
      var filledText = value && String(value).trim() !== '' ? ' inp-filled' : '';
      return '<input class="inp' + (opts.titleStyle ? ' inp-title' : '') + filledText + '" type="text" data-path=\'' + pa + '\' data-type="text" value="' + esc(value) + '">';
    } else if (type === 'percent') {
      var pctDisplay = Math.round(value * 100 * 1e6) / 1e6;
      var filledPct = value ? ' inp-filled' : '';
      return '<input class="inp' + filledPct + '" type="text" inputmode="decimal" data-path=\'' + pa + '\' data-type="percent" value="' + pctDisplay + '">';
    } else if (type === 'money') {
      var filledMoney = value ? ' inp-filled' : '';
      return '<input class="inp' + filledMoney + '" type="text" inputmode="numeric" data-path=\'' + pa + '\' data-type="money" value="' + fmt(value) + '">';
    }
    var filledNum = value ? ' inp-filled' : '';
    return '<input class="inp' + filledNum + '" type="text" inputmode="decimal" data-path=\'' + pa + '\' data-type="number" value="' + value + '">';
  }
  function field(label, path, value, opts) {
    opts = opts || {};
    var suffix = opts.suffix || '';
    var hint = opts.hint || '';
    var inputHtml = rawInput(path, value, opts);
    var labelText = label && suffix ? (label + ' (' + suffix + ')') : label;
    return '<label class="field">' +
      (labelText ? '<span class="field-label">' + esc(labelText) + '</span>' : '') +
      '<div class="field-input-row">' + inputHtml + '</div>' +
      (hint ? '<span class="field-hint">' + esc(hint) + '</span>' : '') +
      '</label>';
  }
  function entryTable(opts) {
    /* opts: { headers:[...], colTemplate: 'CSS grid-template-columns', rows: [...], rowCells: fn(row,i) -> array of cell html,
       addAction, addLabel, delAction, emptyMsg, extraAttr: 'data-child-index="0"' (optional, added to add/del buttons for nested tables) */
    var extraAttr = opts.extraAttr ? ' ' + opts.extraAttr : '';
    var cols = opts.colTemplate + ' 44px';
    var head = '<div class="entry-row entry-head" style="grid-template-columns:' + cols + '">' +
      opts.headers.map(function (h) { return '<div class="entry-cell">' + esc(h) + '</div>'; }).join('') +
      '<div class="entry-cell"></div></div>';
    var body = opts.rows.length ? opts.rows.map(function (row, i) {
      var cells = opts.rowCells(row, i).map(function (c) { return '<div class="entry-cell">' + c + '</div>'; }).join('');
      var delBtn = opts.rows.length > (opts.minRows || 0) ? '<button class="btn-icon" type="button" data-action="' + opts.delAction + '" data-index="' + i + '"' + extraAttr + '>×</button>' : '';
      return '<div class="entry-row" style="grid-template-columns:' + cols + '">' + cells + '<div class="entry-cell entry-cell-del">' + delBtn + '</div></div>';
    }).join('') : '<div class="entry-empty">' + esc(opts.emptyMsg || 'ยังไม่มีรายการ') + '</div>';
    return '<div class="entry-table"><div class="entry-table-scroll">' + head + body + '</div></div>' +
      '<button class="btn btn-add-row btn-sm" type="button" data-action="' + opts.addAction + '"' + extraAttr + ' style="margin-top:8px">+ ' + esc(opts.addLabel) + '</button>';
  }
  function radio(label, path, val, current) {
    var pa = pathAttr(path);
    return '<label class="radio"><input type="radio" data-path=\'' + pa + '\' data-type="radio" data-radio-value="' + esc(val) + '"' + (val === current ? ' checked' : '') + '> ' + esc(label) + '</label>';
  }
  function checkbox(label, path, checked) {
    var pa = pathAttr(path);
    return '<label class="checkbox-row"><input type="checkbox" data-path=\'' + pa + '\' data-type="checkbox"' + (checked ? ' checked' : '') + '> ' + esc(label) + '</label>';
  }
  function metricCard(label, value, tone, sub, id) {
    return '<div class="metric-card tone-' + (tone || 'navy') + '"' + (id ? ' id="' + id + '"' : '') + '>' +
      '<div class="metric-label">' + esc(label) + '</div>' +
      '<div class="metric-value">' + value + '</div>' +
      (sub ? '<div class="metric-sub">' + sub + '</div>' : '') + '</div>';
  }
  var detailCounter = 0;
  function detailTable(rows, columns, keyId) {
    detailCounter++;
    var domId = 'detail-' + keyId + '-' + detailCounter;
    var head = '<tr>' + columns.map(function (c) { return '<th>' + esc(c.label) + '</th>'; }).join('') + '</tr>';
    var body = rows.map(function (row) {
      return '<tr>' + columns.map(function (c) { return '<td>' + c.render(row) + '</td>'; }).join('') + '</tr>';
    }).join('');
    return '<details class="detail-table"><summary>ดูตารางรายละเอียดการคำนวณ</summary>' +
      '<div class="detail-table-scroll"><table><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div></details>';
  }

  /* ================= SVG CHART ================= */
  function lineChart(seriesList, opts) {
    opts = opts || {};
    var w = 560, h = 200, padL = 58, padB = 26, padT = 14, padR = 12;
    var allPts = [].concat.apply([], seriesList.map(function (s) { return s.points; }));
    if (!allPts.length) return '<svg viewBox="0 0 ' + w + ' ' + h + '"></svg>';
    var vals = allPts.map(function (p) { return p.y; });
    var minY = Math.min(0, Math.min.apply(null, vals));
    var maxY = Math.max.apply(null, vals) * 1.08 || 1;
    var n = seriesList[0].points.length;
    var innerW = w - padL - padR, innerH = h - padT - padB;
    function xAt(i) { return padL + (n <= 1 ? 0 : (i / (n - 1)) * innerW); }
    function yAt(v) { return padT + innerH - ((v - minY) / (maxY - minY || 1)) * innerH; }
    var gridLines = '';
    var steps = 4;
    for (var g = 0; g <= steps; g++) {
      var val = minY + ((maxY - minY) * g / steps);
      var y = yAt(val);
      gridLines += '<line x1="' + padL + '" x2="' + (w - padR) + '" y1="' + y.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="#DCE6F0" stroke-width="1"/>';
      gridLines += '<text x="' + (padL - 8) + '" y="' + (y + 3).toFixed(1) + '" font-size="10" fill="#3B4A5A" text-anchor="end">' + fmt(val) + '</text>';
    }
    var xLabels = '';
    var lblEvery = Math.max(1, Math.ceil(n / 6));
    seriesList[0].points.forEach(function (p, i) {
      if (i % lblEvery === 0 || i === n - 1) xLabels += '<text x="' + xAt(i).toFixed(1) + '" y="' + (h - 6) + '" font-size="10" fill="#3B4A5A" text-anchor="middle">' + p.label + '</text>';
    });
    var lines = seriesList.map(function (s) {
      var d = s.points.map(function (p, i) { return (i === 0 ? 'M' : 'L') + xAt(i).toFixed(1) + ',' + yAt(p.y).toFixed(1); }).join(' ');
      var area = d + ' L' + xAt(n - 1).toFixed(1) + ',' + yAt(minY).toFixed(1) + ' L' + xAt(0).toFixed(1) + ',' + yAt(minY).toFixed(1) + ' Z';
      return (s.fill !== false ? '<path d="' + area + '" fill="' + s.color + '" opacity="0.10"></path>' : '') +
        '<path d="' + d + '" fill="none" stroke="' + s.color + '" stroke-width="2.4"></path>';
    }).join('');
    var legend = seriesList.length > 1 ? '<div class="chart-legend">' + seriesList.map(function (s) {
      return '<span class="legend-item"><span class="legend-dot" style="background:' + s.color + '"></span>' + esc(s.name) + '</span>';
    }).join('') + '</div>' : '';
    return legend + '<svg viewBox="0 0 ' + w + ' ' + h + '" class="line-chart">' + gridLines + lines + xLabels + '</svg>';
  }

  /* ================= COMPUTE ================= */
  function computeFinancialHealthScore(a, fr, r) {
    var f = a.finance;
    function tier(value, thresholds, points) {
      for (var i = 0; i < thresholds.length; i++) { if (value >= thresholds[i]) return points[i]; }
      return points[points.length - 1];
    }
    var cats = [];

    /* กระแสเงินสด (15) — savings rate = net cash flow / income */
    var savingsRateCF = fr.cashFlowCalc.totalIncome > 0 ? fr.cashFlowCalc.netCashFlow / fr.cashFlowCalc.totalIncome : 0;
    cats.push({
      key: 'cashflow', label: 'กระแสเงินสด', max: 15,
      score: savingsRateCF < 0 ? 0 : tier(savingsRateCF, [0.2, 0.1, 0], [15, 10, 5]),
      note: 'เงินคงเหลือสุทธิคิดเป็น ' + (savingsRateCF * 100).toFixed(1) + '% ของรายได้',
      advice: savingsRateCF < 0.1 ? 'กระแสเงินสดเหลือน้อยหรือติดลบ — ลองทบทวนค่าใช้จ่ายที่ไม่จำเป็น หรือหารายได้เสริม' : null
    });

    /* เงินสำรองฉุกเฉิน (10) */
    var efRatio = f.emergencyFund.targetMonths > 0 ? fr.emergencyCalc.monthsCovered / f.emergencyFund.targetMonths : 1;
    cats.push({
      key: 'emergency', label: 'เงินสำรองฉุกเฉิน', max: 10,
      score: Math.max(0, Math.min(10, Math.round(efRatio * 10))),
      note: 'มีเงินสำรองพอใช้ได้ ' + fr.emergencyCalc.monthsCovered.toFixed(1) + ' จากเป้าหมาย ' + f.emergencyFund.targetMonths + ' เดือน',
      advice: efRatio < 1 ? 'เงินสำรองฉุกเฉินยังไม่ถึงเป้าหมาย — ลองกันเงินเพิ่มอีกประมาณ ' + fmt(fr.emergencyCalc.gap) + ' บาท' : null
    });

    /* หนี้สิน (15) — DTI */
    var dti = fr.cashFlowCalc.dti;
    cats.push({
      key: 'debt', label: 'หนี้สิน', max: 15,
      score: tier(dti, [0.5, 0.36, 0.2, -1], [0, 5, 10, 15]),
      note: 'สัดส่วนหนี้ต่อรายได้ (DTI) ' + (dti * 100).toFixed(1) + '%',
      advice: dti > 0.36 ? 'ภาระหนี้ต่อรายได้ค่อนข้างสูง (' + (dti * 100).toFixed(0) + '%) — ควรพิจารณาปิดหนี้ดอกเบี้ยสูงก่อน' : null
    });

    /* การออม (10) — regular investment contribution / income (single source: Investment section) */
    var totalMonthlySaving = sumRecurringInvestmentsMonthly(f.investment);
    var savingsRatioIncome = fr.cashFlowCalc.totalIncome > 0 ? totalMonthlySaving / fr.cashFlowCalc.totalIncome : 0;
    cats.push({
      key: 'savings', label: 'การออม', max: 10,
      score: tier(savingsRatioIncome, [0.15, 0.1, 0.05, 0], [10, 7, 4, 2]),
      note: 'ออม/ลงทุนสม่ำเสมอรวม ' + fmt(totalMonthlySaving) + ' บาท/เดือน (' + (savingsRatioIncome * 100).toFixed(1) + '% ของรายได้)',
      advice: savingsRatioIncome < 0.1 ? 'อัตราการออมยังค่อนข้างต่ำ — ลองตั้งเป้าออมอย่างน้อย 10% ของรายได้' : null
    });

    /* การลงทุน (15) — has a plan with allocation + ongoing contribution */
    var currentInvestAmt = sumCurrentInvestments(f.investment);
    var hasInvestPlan = currentInvestAmt > 0 || totalMonthlySaving > 0;
    var investScore = !hasInvestPlan ? 0 : (currentInvestAmt > 0 && totalMonthlySaving > 0 ? 15 : 8);
    cats.push({
      key: 'investment', label: 'การลงทุน', max: 15,
      score: investScore,
      note: hasInvestPlan ? 'มีเงินลงทุน ' + fmt(currentInvestAmt) + ' บาท และลงทุนเพิ่ม ' + fmt(totalMonthlySaving) + ' บาท/เดือน' : 'ยังไม่ได้เริ่มลงทุนอย่างสม่ำเสมอ',
      advice: !hasInvestPlan ? 'ยังไม่มีแผนการลงทุนระยะยาว — ลองเริ่มลงทุนสม่ำเสมอแม้จำนวนไม่มาก' : null
    });

    /* ประกัน/ความคุ้มครอง (10) — life insurance coverage ratio */
    var lc = fr.lifeInsuranceCalc;
    var coverRatio = lc.totalNeed > 0 ? lc.existingCoverage / lc.totalNeed : 1;
    cats.push({
      key: 'insurance', label: 'ประกัน/ความคุ้มครอง', max: 10,
      score: tier(coverRatio, [1, 0.75, 0.5, 0.25], [10, 7, 4, 2]),
      note: 'มีทุนประกันชีวิต ' + (coverRatio * 100).toFixed(0) + '% ของความต้องการที่ควรมี',
      advice: coverRatio < 0.75 ? 'ความคุ้มครองชีวิตยังไม่พอ — ขาดอยู่ประมาณ ' + fmt(lc.gap) + ' บาท' : null
    });

    /* เกษียณ (15) — reuse retirement gap ratio */
    var gapRatio = r.netRequiredCorpus > 0 ? r.gap / r.netRequiredCorpus : 0;
    cats.push({
      key: 'retirement', label: 'แผนเกษียณ', max: 15,
      score: gapRatio <= 0 ? 15 : tier(gapRatio, [0.35, 0.15, 0], [0, 5, 10]),
      note: r.gap > 0 ? 'ยังขาดเงินเกษียณอยู่ประมาณ ' + fmt(r.gap) + ' บาท' : 'มีเงินเกษียณเพียงพอตามแผนแล้ว',
      advice: gapRatio > 0.15 ? 'แผนเกษียณยังขาดอยู่มาก — ดูรายละเอียดที่แท็บ "แผนเกษียณ" เพื่อปรับแผนการออม' : null
    });

    /* เป้าหมายการเงิน (10) — reward having clearly defined goals (funded-ratio tracking removed with the simplified goal table) */
    var goalsList = fr.goalsCalc;
    var goalsScore = goalsList.length ? 8 : 5;
    cats.push({
      key: 'goals', label: 'เป้าหมายการเงิน', max: 10,
      score: goalsScore,
      note: goalsList.length ? 'มีเป้าหมายทางการเงิน ' + goalsList.length + ' รายการ' : 'ยังไม่ได้ตั้งเป้าหมายทางการเงิน',
      advice: !goalsList.length ? 'ลองตั้งเป้าหมายทางการเงินที่ชัดเจน จะได้วางแผนออมได้ตรงจุด' : null
    });

    var totalScore = cats.reduce(function (s, c) { return s + c.score; }, 0);
    var maxScore = cats.reduce(function (s, c) { return s + c.max; }, 0);
    var priorities = cats.filter(function (c) { return c.advice; }).sort(function (x, y) { return (x.score / x.max) - (y.score / y.max); }).slice(0, 4);
    return { categories: cats, totalScore: totalScore, maxScore: maxScore, priorities: priorities };
  }

  function deriveAssetReturn(mainCategory, invBlendReturn) {
    if (mainCategory === 'liquid') return C.ASSET_CLASS_ASSUMPTIONS.cash.return;
    if (mainCategory === 'investment') return invBlendReturn;
    return 0; /* personal-use / other assets: no assumed investment growth */
  }
  function groupByCategory(items, catList, catField, valueField) {
    var groups = {};
    catList.forEach(function (c) { groups[c.value] = { label: c.label, value: c.value, items: [], total: 0 }; });
    items.forEach(function (it) {
      var key = it[catField] || 'other';
      if (!groups[key]) groups[key] = { label: key, value: key, items: [], total: 0 };
      groups[key].items.push(it);
      groups[key].total += (it[valueField] || 0);
    });
    return Object.keys(groups).map(function (k) { return groups[k]; }).filter(function (g) { return g.items.length > 0; });
  }

  function computeFinancialHealthCheck(a, fr) {
    var nw = fr.netWorthCalc, cf = fr.cashFlowCalc;

    /* vertical analysis: balance sheet (base = total assets), grouped by main category first */
    var assetGroups = groupByCategory(a.finance.assets.items.filter(function (it) { return (it.value || 0) > 0; }), ASSET_MAIN_CATEGORIES, 'mainCategory', 'value').filter(function (g) { return g.total > 0; }).map(function (g) {
      return {
        label: g.label, total: g.total, pct: nw.totalAssets > 0 ? g.total / nw.totalAssets : 0,
        items: g.items.map(function (it) { return { name: it.name, value: it.value, pct: nw.totalAssets > 0 ? it.value / nw.totalAssets : 0 }; })
      };
    });
    var liabGroups = groupByCategory(a.finance.liabilities.items.filter(function (it) { return (it.balance || 0) > 0; }), LIABILITY_MAIN_CATEGORIES, 'mainCategory', 'balance').filter(function (g) { return g.total > 0; }).map(function (g) {
      return {
        label: g.label, total: g.total, pct: nw.totalAssets > 0 ? g.total / nw.totalAssets : 0,
        items: g.items.map(function (it) { return { name: it.name, value: it.balance, pct: nw.totalAssets > 0 ? it.balance / nw.totalAssets : 0 }; })
      };
    });
    var netWorthPct = nw.totalAssets > 0 ? nw.netWorth / nw.totalAssets : 0;

    /* vertical analysis: cash flow (base = total income) — skip line items that have no value entered */
    var incomeVertical = a.finance.income.items.filter(function (it) { return incomeMonthlyEquiv(it) > 0; }).map(function (it) {
      var m = incomeMonthlyEquiv(it);
      return { name: it.category, value: m, pct: cf.totalIncome > 0 ? m / cf.totalIncome : 0 };
    });
    var groupsRaw = groupByCategory(a.finance.expenses.regular.items.filter(function (it) { return C.toMonthly(it.amount, it.frequency) > 0; }).map(function (it) { return { expenseType: it.expenseType, category: it.category, monthlyValue: C.toMonthly(it.amount, it.frequency) }; }), EXPENSE_TYPE_CATEGORIES, 'expenseType', 'monthlyValue');
    /* debt payments are shown as named line items within "ค่าใช้จ่ายประจำ" (fixed) — not a separate lump-sum category, and only ones with an actual payment amount */
    var fixedGroup = groupsRaw.filter(function (g) { return g.value === 'fixed'; })[0];
    var liabilitiesWithPayment = a.finance.liabilities.items.filter(function (li) { return (li.monthlyPayment || 0) > 0; });
    if (liabilitiesWithPayment.length) {
      if (!fixedGroup) { fixedGroup = { label: 'ค่าใช้จ่ายประจำ (คงที่)', value: 'fixed', items: [], total: 0 }; groupsRaw.push(fixedGroup); }
      liabilitiesWithPayment.forEach(function (li) {
        fixedGroup.items.push({ expenseType: 'fixed', category: 'ค่างวด: ' + li.name, monthlyValue: li.monthlyPayment || 0 });
        fixedGroup.total += (li.monthlyPayment || 0);
      });
    }
    var expenseGroups = groupsRaw.filter(function (g) { return g.total > 0; }).map(function (g) {
      return {
        label: g.label, total: g.total, pct: cf.totalIncome > 0 ? g.total / cf.totalIncome : 0,
        items: g.items.map(function (it) { return { name: it.category, value: it.monthlyValue, pct: cf.totalIncome > 0 ? it.monthlyValue / cf.totalIncome : 0 }; })
      };
    });
    var debtPaymentPct = cf.totalIncome > 0 ? cf.totalDebtPayment / cf.totalIncome : 0;
    var totalExpensePct = cf.totalIncome > 0 ? (cf.totalExpenses + cf.totalDebtPayment) / cf.totalIncome : 0;
    var netCashFlowPct = cf.totalIncome > 0 ? cf.netCashFlow / cf.totalIncome : 0;

    /* CFP standard ratios — each with an explicit formula, the actual numbers substituted in, and a bar-chart scale for visual comparison against the standard */
    var investmentAssetValue = a.finance.assets.items.filter(function (it) { return it.mainCategory === 'investment'; }).reduce(function (s, it) { return s + it.value; }, 0);
    var ratios = [];
    var liquidityMonths = cf.totalExpenses > 0 ? fr.liquidAssets / cf.totalExpenses : 0;
    ratios.push({ key: 'liquidity', label: 'อัตราส่วนสภาพคล่อง (Liquidity Ratio)', value: liquidityMonths, display: liquidityMonths.toFixed(1) + ' เดือน', standard: '3-6 เดือน', standardMin: 3, standardMax: 6, visualMax: 8, markerIsPercent: false, markerUnit: ' เดือน',
      formulaNum: 'สินทรัพย์สภาพคล่อง', formulaDen: 'ค่าใช้จ่ายเฉลี่ยต่อเดือน', formulaSuffix: null,
      workingNum: fmt(fr.liquidAssets), workingDen: fmt(cf.totalExpenses), workingSuffix: null, workingResult: liquidityMonths.toFixed(2) + ' เดือน',
      status: liquidityMonths >= 3 ? 'green' : (liquidityMonths >= 1.5 ? 'yellow' : 'red'),
      advice: liquidityMonths < 3 ? ('มีเงินสำรองสภาพคล่องอยู่ ' + liquidityMonths.toFixed(1) + ' เดือน ต่ำกว่ามาตรฐาน 3 เดือน ควรเก็บเงินสดหรือสินทรัพย์สภาพคล่องเพิ่มอีกประมาณ ' + fmt(Math.max(0, 3 * cf.totalExpenses - fr.liquidAssets)) + ' บาท เพื่อรองรับเหตุฉุกเฉิน') : null });

    var debtToAsset = nw.totalAssets > 0 ? nw.totalLiabilities / nw.totalAssets : 0;
    ratios.push({ key: 'debtAsset', label: 'อัตราส่วนหนี้สินต่อสินทรัพย์ (Debt to Asset Ratio)', value: debtToAsset, display: (debtToAsset * 100).toFixed(1) + '%', standard: 'ไม่เกิน 50%', standardMax: 0.5, visualMax: 1, markerIsPercent: true,
      formulaNum: 'หนี้สินรวม', formulaDen: 'สินทรัพย์รวม', formulaSuffix: '× 100',
      workingNum: fmt(nw.totalLiabilities), workingDen: fmt(nw.totalAssets), workingSuffix: '× 100', workingResult: (debtToAsset * 100).toFixed(2) + '%',
      status: debtToAsset <= 0.5 ? 'green' : (debtToAsset <= 0.7 ? 'yellow' : 'red'),
      advice: debtToAsset > 0.5 ? ('หนี้สินคิดเป็น ' + (debtToAsset * 100).toFixed(1) + '% ของสินทรัพย์รวม สูงกว่ามาตรฐาน 50% ควรเร่งลดหนี้หรือเพิ่มสินทรัพย์ ประมาณ ' + fmt(Math.max(0, nw.totalLiabilities - 0.5 * nw.totalAssets)) + ' บาท เพื่อให้อัตราส่วนกลับสู่เกณฑ์ปลอดภัย') : null });

    ratios.push({ key: 'dti', label: 'ภาระหนี้ต่อรายได้ (Debt Service Ratio / DTI)', value: cf.dti, display: (cf.dti * 100).toFixed(1) + '%', standard: 'ไม่เกิน 36%', standardMax: 0.36, visualMax: 0.8, markerIsPercent: true,
      formulaNum: 'ค่างวดหนี้ทั้งหมดต่อเดือน', formulaDen: 'รายได้รวมต่อเดือน', formulaSuffix: '× 100',
      workingNum: fmt(cf.totalDebtPayment), workingDen: fmt(cf.totalIncome), workingSuffix: '× 100', workingResult: (cf.dti * 100).toFixed(2) + '%',
      status: cf.dti <= 0.36 ? 'green' : (cf.dti <= 0.5 ? 'yellow' : 'red'),
      advice: cf.dti > 0.36 ? ('DTI อยู่ที่ ' + (cf.dti * 100).toFixed(1) + '% สูงกว่ามาตรฐาน 36% ควรลดค่างวดหนี้ต่อเดือนลงประมาณ ' + fmt(Math.max(0, cf.totalDebtPayment - 0.36 * cf.totalIncome)) + ' บาท หรือเพิ่มรายได้ ก่อนก่อหนี้เพิ่ม') : null });

    var savingsRate = cf.totalIncome > 0 ? cf.netCashFlow / cf.totalIncome : 0;
    ratios.push({ key: 'savingsRate', label: 'อัตราการออม (Savings Ratio)', value: savingsRate, display: (savingsRate * 100).toFixed(1) + '%', standard: 'อย่างน้อย 10%', standardMin: 0.1, visualMax: 0.4, markerIsPercent: true,
      formulaNum: 'รายได้รวม − ค่าใช้จ่ายรวม − ค่างวดหนี้', formulaDen: 'รายได้รวม', formulaSuffix: '× 100',
      workingNum: '(' + fmt(cf.totalIncome) + ' − ' + fmt(cf.totalExpenses) + ' − ' + fmt(cf.totalDebtPayment) + ')', workingDen: fmt(cf.totalIncome), workingSuffix: '× 100', workingResult: (savingsRate * 100).toFixed(2) + '%',
      status: savingsRate >= 0.1 ? 'green' : (savingsRate >= 0.05 ? 'yellow' : 'red'),
      advice: savingsRate < 0.1 ? ('อัตราการออมอยู่ที่ ' + (savingsRate * 100).toFixed(1) + '% ต่ำกว่ามาตรฐาน 10% ควรลดค่าใช้จ่ายหรือเพิ่มรายได้ เพื่อออมเพิ่มอีกประมาณ ' + fmt(Math.max(0, 0.1 * cf.totalIncome - cf.netCashFlow)) + ' บาท/เดือน') : null });

    var investRatio = nw.netWorth > 0 ? investmentAssetValue / nw.netWorth : 0;
    ratios.push({ key: 'investRatio', label: 'สัดส่วนสินทรัพย์ลงทุนต่อมูลค่าสุทธิ (Investment Assets to Net Worth)', value: investRatio, display: (investRatio * 100).toFixed(1) + '%', standard: 'ควรมากกว่า 50%', standardMin: 0.5, visualMax: 1, markerIsPercent: true,
      formulaNum: 'สินทรัพย์เพื่อการลงทุน', formulaDen: 'มูลค่าสุทธิ', formulaSuffix: '× 100',
      workingNum: fmt(investmentAssetValue), workingDen: fmt(nw.netWorth), workingSuffix: '× 100', workingResult: (investRatio * 100).toFixed(2) + '%',
      status: investRatio >= 0.5 ? 'green' : (investRatio >= 0.25 ? 'yellow' : 'red'),
      advice: investRatio < 0.5 ? ('สินทรัพย์เพื่อการลงทุนคิดเป็นเพียง ' + (investRatio * 100).toFixed(1) + '% ของมูลค่าสุทธิ ต่ำกว่ามาตรฐาน 50% ความมั่งคั่งส่วนใหญ่ผูกอยู่กับสินทรัพย์ที่ไม่สร้างผลตอบแทน ควรพิจารณาจัดสรรเงินไปลงทุนเพิ่มเติมเพื่อให้เงินทำงาน') : null });

    /* narrative synthesis + prioritized action list, scoped only to these 5 ratios */
    var order = { red: 0, yellow: 1, green: 2 };
    var sortedRatios = ratios.slice().sort(function (x, y) { return order[x.status] - order[y.status]; });
    var priorities = sortedRatios.filter(function (rr) { return rr.advice; });
    var greenPoints = ratios.filter(function (rr) { return rr.status === 'green'; }).map(function (rr) { return rr.label.split(' (')[0]; });
    var weakPoints = ratios.filter(function (rr) { return rr.status !== 'green'; }).map(function (rr) { return rr.label.split(' (')[0]; });
    var hasRed = ratios.some(function (rr) { return rr.status === 'red'; });
    var hasYellow = ratios.some(function (rr) { return rr.status === 'yellow'; });
    var narrative;
    if (!hasRed && !hasYellow) {
      narrative = 'ภาพรวมฐานะการเงินอยู่ในเกณฑ์ดีทุกด้าน ทั้ง 5 อัตราส่วน (' + greenPoints.join(', ') + ') ผ่านมาตรฐานที่แนะนำครบถ้วน ควรรักษาวินัยทางการเงินนี้ต่อไปและทบทวนอัตราส่วนเหล่านี้เป็นระยะ';
    } else {
      var strongText = greenPoints.length ? ('จุดแข็งคือ ' + greenPoints.join(', ') + ' ที่อยู่ในเกณฑ์ดีแล้ว ') : '';
      var weakText = 'จุดที่ควรปรับปรุงคือ ' + weakPoints.join(', ') + ' ที่ยังไม่ผ่านมาตรฐาน';
      narrative = 'ภาพรวมฐานะการเงิน' + (hasRed ? 'ยังมีความเสี่ยงในบางด้านที่ควรรีบดูแล ' : 'อยู่ในเกณฑ์พอใช้ ') + strongText + weakText + ' ควรให้ความสำคัญกับ "' + sortedRatios[0].label.split(' (')[0] + '" เป็นลำดับแรก';
    }

    return {
      assetGroups: assetGroups, liabGroups: liabGroups, netWorthPct: netWorthPct,
      incomeVertical: incomeVertical, expenseGroups: expenseGroups, debtPaymentPct: debtPaymentPct, totalExpensePct: totalExpensePct, netCashFlowPct: netCashFlowPct,
      ratios: ratios, narrative: narrative, priorities: priorities
    };
  }

  function computeFinance(a) {
    var f = a.finance;
    var currentAge = a.personal.currentAge;
    var invBlendForAssets = C.blendAllocation(f.investment.allocation);
    var assetsWithReturn = f.assets.items.map(function (it) { return Object.assign({}, it, { expectedReturn: deriveAssetReturn(it.mainCategory, invBlendForAssets.blendedReturn) }); });
    var netWorthCalc = C.computeNetWorth(assetsWithReturn, f.liabilities.items);
    var incomeItemsMonthly = f.income.items.map(function (it) { return { monthlyAmount: incomeMonthlyEquiv(it) }; });
    var expenseItemsMonthly = f.expenses.regular.items.map(function (it) { return { monthlyAmount: C.toMonthly(it.amount, it.frequency) }; });
    var cashFlowCalc = C.computeCashFlow(incomeItemsMonthly, expenseItemsMonthly, f.liabilities.items);
    var liquidAssets = assetsWithReturn.filter(function (it) { return it.mainCategory === 'liquid'; }).reduce(function (s, it) { return s + (it.value || 0); }, 0);
    var emergencyCalc = C.computeEmergencyFund(cashFlowCalc.totalExpenses, f.emergencyFund.targetMonths, liquidAssets);
    var projections = [5, 10, 20, 30, 40].map(function (yrs) {
      var pr = C.projectNetWorth(assetsWithReturn, f.liabilities.items, cashFlowCalc.netCashFlow, yrs, f.cashFlowSurplusReturn);
      return { years: yrs, netWorth: pr.netWorth, assetTotal: pr.assetTotal, liabTotal: pr.liabTotal, surplusFV: pr.surplusFV };
    });

    /* general financial goals — TVM: inflate using the pre- or post-retirement inflation rate depending on
       whether the goal falls before or after retirement; discount/grow using the matching return rate */
    var retireAge = a.personal.retireAge;
    var asmp = a.assumptions;
    var goalsCalc = (f.goals.items || []).map(function (g) {
      var yearsToStart = Math.max(0, g.startAge - currentAge);
      var span = Math.max(1, (g.endAge || g.startAge) - g.startAge + 1);
      var isPost = g.startAge >= retireAge;
      var infl = isPost ? asmp.inflationPostRetire : asmp.inflationPreRetire;
      var ret = isPost ? asmp.returnPostRetire : asmp.returnPreRetire;
      var futureValueNeeded;
      if (g.frequency === 'annual') {
        futureValueNeeded = C.growingAnnuityPV(g.amountToday * Math.pow(1 + infl, yearsToStart), ret, infl, span, true);
      } else {
        futureValueNeeded = g.amountToday * Math.pow(1 + infl, yearsToStart);
      }
      var requiredMonthly = yearsToStart > 0 ? C.pmtFromFV(futureValueNeeded, ret, yearsToStart, false) / 12 : futureValueNeeded;
      return { id: g.id, name: g.name, years: yearsToStart, atAge: g.startAge, rateUsed: ret, inflUsed: infl, futureValueNeeded: futureValueNeeded, requiredMonthly: requiredMonthly };
    });

    /* children's education — same pre/post TVM split, based on the age the child starts that level */
    var educationCalc = [];
    (f.education.children || []).forEach(function (child) {
      (child.items || []).forEach(function (e) {
        var lvl = educationLevelInfo(e.level);
        var yearsToStart = Math.max(0, lvl.startAge - child.childCurrentAge);
        var atAge = currentAge + yearsToStart;
        var isPost = atAge >= retireAge;
        var ret = isPost ? asmp.returnPostRetire : asmp.returnPreRetire;
        var costAtStart = e.annualCostToday * Math.pow(1 + e.inflationRate, yearsToStart);
        var pvAtStart = C.growingAnnuityPV(costAtStart, ret, e.inflationRate, lvl.years, true);
        var requiredMonthly = yearsToStart > 0 ? C.pmtFromFV(pvAtStart, ret, yearsToStart, false) / 12 : pvAtStart;
        educationCalc.push({ id: e.id, childName: child.childName, levelLabel: lvl.label, yearsToStart: yearsToStart, atAge: atAge, rateUsed: ret, costAtStart: costAtStart, totalNeededAtStart: pvAtStart, requiredMonthly: requiredMonthly });
      });
    });

    /* major purchases (house/car) */
    var purchasesCalc = (f.majorPurchases.items || []).map(function (mp) {
      var downPayment = mp.price * mp.downPaymentPercent;
      var loanAmount = mp.price - downPayment;
      var monthlyPayment = C.loanPayment(loanAmount, mp.interestRate, mp.loanTermYears);
      var totalUpfront = downPayment + (mp.extraCosts || 0);
      var affordable = monthlyPayment <= Math.max(0, cashFlowCalc.netCashFlow);
      return { id: mp.id, name: mp.name, downPayment: downPayment, loanAmount: loanAmount, monthlyPayment: monthlyPayment, totalUpfront: totalUpfront, affordable: affordable };
    });

    /* investment: asset-allocation based projection + risk-scenario comparison */
    var ASSET_CLASS_ASSUMPTIONS = C.ASSET_CLASS_ASSUMPTIONS;
    var blendAllocation = C.blendAllocation;
    var inv = f.investment;
    var invCurrentTotal = sumCurrentInvestments(inv);
    var invRecurringMonthly = sumRecurringInvestmentsMonthly(inv);
    var invCurrentWeightedReturn = weightedAvgReturn(inv.currentInvestments.items || []);
    var invRecurringWeightedReturn = weightedAvgReturn(inv.recurringInvestments.items || []);
    var currentInvestmentsCalc = (inv.currentInvestments.items || []).map(function (it) {
      return { id: it.id, type: it.type, amount: it.amount, returnRate: it.returnRate, fv: C.fv(it.amount, it.returnRate, inv.years) };
    });
    var recurringInvestmentsCalc = (inv.recurringInvestments.items || []).map(function (it) {
      var annualAmt = C.toMonthly(it.amount, it.frequency) * 12;
      return { id: it.id, type: it.type, frequency: it.frequency, amount: it.amount, returnRate: it.returnRate, fv: C.annuityFV(annualAmt, it.returnRate, inv.years, false) };
    });
    var allocSum = Object.keys(inv.allocation).reduce(function (s, k) { return s + (inv.allocation[k] || 0); }, 0);
    var customBlend = blendAllocation(inv.allocation);
    var customFV = C.fv(invCurrentTotal, customBlend.blendedReturn, inv.years) + C.annuityFV(invRecurringMonthly * 12, customBlend.blendedReturn, inv.years, false);
    var RISK_PRESETS = [
      { key: 'conservative', label: 'Conservative (เน้นความมั่นคง)', allocation: { cash: 0.4, bonds: 0.4, stocks: 0.15, alternatives: 0.05 } },
      { key: 'moderate', label: 'Moderate (สมดุล)', allocation: { cash: 0.15, bonds: 0.35, stocks: 0.4, alternatives: 0.1 } },
      { key: 'aggressive', label: 'Aggressive (เน้นการเติบโต)', allocation: { cash: 0.05, bonds: 0.15, stocks: 0.65, alternatives: 0.15 } }
    ];
    var scenarioCalc = RISK_PRESETS.map(function (preset) {
      var b = blendAllocation(preset.allocation);
      var fvAmt = C.fv(invCurrentTotal, b.blendedReturn, inv.years) + C.annuityFV(invRecurringMonthly * 12, b.blendedReturn, inv.years, false);
      return { key: preset.key, label: preset.label, allocation: preset.allocation, blendedReturn: b.blendedReturn, blendedVol: b.blendedVol, futureValue: fvAmt };
    });

    /* life insurance needs analysis (needs-based method: debt + income replacement + education + final expenses + legacy) */
    var ins = f.insurance;
    var totalEducationNeed = educationCalc.reduce(function (s, e) { return s + e.totalNeededAtStart; }, 0);
    var incomeReplacementNeed = ins.life.familyLivingExpenseAnnual * ins.life.yearsOfSupport;
    var lifeInsuranceTotalNeed = netWorthCalc.totalLiabilities + incomeReplacementNeed + totalEducationNeed + ins.life.finalExpenses + ins.life.legacyAmount;
    var lifeInsuranceGap = Math.max(0, lifeInsuranceTotalNeed - ins.life.existingCoverage);
    var lifeInsuranceCalc = {
      totalDebt: netWorthCalc.totalLiabilities, incomeReplacementNeed: incomeReplacementNeed, totalEducationNeed: totalEducationNeed,
      finalExpenses: ins.life.finalExpenses, legacyAmount: ins.life.legacyAmount, totalNeed: lifeInsuranceTotalNeed,
      existingCoverage: ins.life.existingCoverage, gap: lifeInsuranceGap
    };
    var otherPoliciesCalc = (ins.otherPolicies.items || []).map(function (p) {
      return { id: p.id, type: p.type, currentCoverage: p.currentCoverage, recommendedCoverage: p.recommendedCoverage, gap: Math.max(0, p.recommendedCoverage - p.currentCoverage) };
    });

    return { netWorthCalc: netWorthCalc, cashFlowCalc: cashFlowCalc, liquidAssets: liquidAssets, emergencyCalc: emergencyCalc, projections: projections, goalsCalc: goalsCalc, educationCalc: educationCalc, purchasesCalc: purchasesCalc, assetClassAssumptions: ASSET_CLASS_ASSUMPTIONS, allocSum: allocSum, customBlend: customBlend, customFV: customFV, scenarioCalc: scenarioCalc, lifeInsuranceCalc: lifeInsuranceCalc, otherPoliciesCalc: otherPoliciesCalc, currentInvestmentsCalc: currentInvestmentsCalc, recurringInvestmentsCalc: recurringInvestmentsCalc, invCurrentTotal: invCurrentTotal, invRecurringMonthly: invRecurringMonthly, invCurrentWeightedReturn: invCurrentWeightedReturn, invRecurringWeightedReturn: invRecurringWeightedReturn };
  }

  function computeAll(a) {
    var p = Object.assign({}, a.personal);
    /* single source of truth: current salary & its growth rate are derived from the Income section, not entered twice */
    var totalMonthlyIncomeForSalary = a.finance.income.items.reduce(function (s, it) { return s + incomeMonthlyEquiv(it); }, 0);
    if (totalMonthlyIncomeForSalary > 0) {
      p.currentSalary = totalMonthlyIncomeForSalary;
      var weightedGrowthSum = a.finance.income.items.reduce(function (s, it) { return s + incomeMonthlyEquiv(it) * incomeEffectiveGrowth(it); }, 0);
      p.salaryGrowth = weightedGrowthSum / totalMonthlyIncomeForSalary;
    }
    var yearsToRetire = p.retireAge - p.currentAge;
    var yearsRetired = p.lifeExpectancy - p.retireAge;
    var portfolio = a.preRetirementPortfolio;
    var segs = portfolio.mode === 'glide' ? portfolio.segments : null;

    /* lightweight bucket age-map (mirrors computeBucketPlan's last-bucket auto-years correction),
       computed early so any section can look up "which bucket/rate covers age X" without
       needing the full sizing/oneOffs machinery yet. */
    var bucketAgeMap = (function () {
      var list = clone(a.buckets.list);
      if (list.length) {
        var sumOthers = list.slice(0, -1).reduce(function (s, b) { return s + b.years; }, 0);
        list[list.length - 1].years = Math.max(1, yearsRetired - sumOthers);
      }
      var cum = 0;
      return list.map(function (b) {
        var entry = { startAge: p.retireAge + cum, endAge: p.retireAge + cum + b.years - 1, drawdownReturn: b.drawdownReturn, label: b.label || 'บัคเก็ต' };
        cum += b.years;
        return entry;
      });
    })();
    function bucketForAge(age) {
      for (var i = 0; i < bucketAgeMap.length; i++) { if (age >= bucketAgeMap[i].startAge && age <= bucketAgeMap[i].endAge) return bucketAgeMap[i]; }
      return bucketAgeMap.length ? bucketAgeMap[0] : null;
    }

    var salaryAtRetire = p.currentSalary * Math.pow(1 + p.salaryGrowth, yearsToRetire);
    var firstYearMonthlyNeed = p.spendingMethod === 'replacement'
      ? salaryAtRetire * p.replacementRate
      : p.customMonthlyExpense * Math.pow(1 + p.inflation, yearsToRetire);
    var firstYearAnnualNeed = firstYearMonthlyNeed * 12;

    /* PVD */
    var pvdResult = { finalBalance: 0, path: [] };
    if (a.pvd.enabled) {
      pvdResult = C.simulatePVD({
        startSalaryMonthly: p.currentSalary, salaryGrowth: p.salaryGrowth, employeeRate: a.pvd.employeeRate,
        employerMode: a.pvd.employerMode, employerFlatRate: a.pvd.employerFlatRate, employerTiers: a.pvd.employerTiers,
        fundReturn: a.pvd.fundReturn, yearsToRetire: yearsToRetire, startingBalance: a.pvd.startingBalance,
        serviceYearsSoFar: a.pvd.serviceYearsSoFar, currentAge: p.currentAge
      });
    }

    var ssoMonthsAtRetirement = a.sso.monthsPaidSoFar + yearsToRetire * 12;
    var ssoAvgWageCapped = Math.min(p.currentSalary, 15000);
    var ssoMonthly = a.sso.enabled ? C.ssoPensionMonthly(ssoAvgWageCapped, ssoMonthsAtRetirement) : 0;
    var ssoAnnual = ssoMonthly * 12;
    var ssoYearsPaid = ssoMonthsAtRetirement / 12;
    var ssoExtraYears = Math.max(0, ssoYearsPaid - 15);
    var ssoPct = ssoMonthsAtRetirement >= 180 ? (20 + ssoExtraYears * 1.5) : 0;

    var severance = null;
    if (a.severance.enabled) {
      var serviceYears = (a.pvd.serviceYearsSoFar || 0) + yearsToRetire;
      var months = C.severanceMonths(serviceYears);
      severance = { serviceYears: serviceYears, months: months, amount: months * salaryAtRetire };
    }

    /* windfalls: auto-split lumpsum/recurring into pre/post portions based on retireAge */
    var GROWTH_STEP_YEARS = { annual: 1, every2years: 2, every3years: 3, every5years: 5 };
    function windfallAmountAtAge(w, age, perYearAmt) {
      var stepYears = GROWTH_STEP_YEARS[w.growthFrequency] || 1;
      var steps = Math.floor((age - w.startAge) / stepYears);
      return perYearAmt * Math.pow(1 + (w.growthRate || 0), Math.max(0, steps));
    }
    var windfallsFV = 0;
    var postWindfallOneOffs = [];
    var postIncomeStreams = []; /* {startAge, endAge, w, perYearAmt} */
    (a.windfalls || []).forEach(function (w) {
      if (w.flowType === 'recurring') {
        var perYearAmt = w.frequency === 'monthly' ? w.amountPerPeriod * 12 : w.amountPerPeriod;
        var preEndAge = Math.min(w.endAge, p.retireAge - 1);
        for (var age = w.startAge; age <= preEndAge; age++) windfallsFV += C.fvAlongGlide(windfallAmountAtAge(w, age, perYearAmt), age, p.retireAge, segs, portfolio.flatReturn);
        var postStartAge = Math.max(w.startAge, p.retireAge);
        if (postStartAge <= w.endAge) postIncomeStreams.push({ startAge: postStartAge, endAge: w.endAge, w: w, perYearAmt: perYearAmt });
      } else {
        if (w.ageReceived < p.retireAge) windfallsFV += C.fvAlongGlide(w.amount, w.ageReceived, p.retireAge, segs, portfolio.flatReturn);
        else postWindfallOneOffs.push(w);
      }
    });

    function pensionAnnualAtAge(age) {
      var sum = (a.sso.enabled ? ssoAnnual : 0);
      postIncomeStreams.forEach(function (s) { if (age >= s.startAge && age <= s.endAge) sum += windfallAmountAtAge(s.w, age, s.perYearAmt); });
      return sum;
    }
    function pensionAnnualAtYear(yearIdx) { return pensionAnnualAtAge(p.retireAge + yearIdx); }
    function needAnnualAtYear(yearIdx) { return firstYearAnnualNeed * Math.pow(1 + p.inflation, yearIdx - 1); }

    /* current savings/investments: single source of truth is the Balance Sheet's Assets list — no separate entry here.
       Expected return per asset is derived from its category (liquid=cash rate, investment=blended allocation rate, personal/other=0), not entered manually. */
    var invBlendForRetirementAssets = C.blendAllocation(a.finance.investment.allocation);
    var currentItems = (a.finance.assets.items || []).map(function (it) {
      var itReturn = deriveAssetReturn(it.mainCategory, invBlendForRetirementAssets.blendedReturn);
      var path = [];
      for (var yy1 = 0; yy1 <= yearsToRetire; yy1++) {
        path.push({ year: yy1, age: p.currentAge + yy1, beYear: p.currentYearAD + 543 + yy1, balance: C.fv(it.value, itReturn, yy1) });
      }
      return { id: it.id, name: it.name, amount: it.value, returnRate: itReturn, fv: C.fv(it.value, itReturn, yearsToRetire), path: path };
    });
    var currentTotalAmount = currentItems.reduce(function (s, it) { return s + it.amount; }, 0);
    var currentSavingsFV_asis = currentItems.reduce(function (s, it) { return s + it.fv; }, 0);
    var currentSavingsFV_ifPlanned = C.fvAlongGlide(currentTotalAmount, p.currentAge, p.retireAge, segs, portfolio.flatReturn);

    /* regular (recurring) savings: single source of truth is the Investment section's recurring-investment table,
       compounding at its own asset-allocation blended return */
    var invBlendForRetirement = C.blendAllocation(a.finance.investment.allocation);
    var regularItems = [];
    var recurringMonthlyTotal = sumRecurringInvestmentsMonthly(a.finance.investment);
    if (recurringMonthlyTotal > 0) {
      var annualAmt = recurringMonthlyTotal * 12;
      var due = false;
      var fv = C.annuityFV(annualAmt, invBlendForRetirement.blendedReturn, yearsToRetire, due);
      var regPath = [];
      for (var yy2 = 0; yy2 <= yearsToRetire; yy2++) {
        regPath.push({ year: yy2, age: p.currentAge + yy2, beYear: p.currentYearAD + 543 + yy2, contribution: yy2 === 0 ? 0 : annualAmt, balance: C.annuityFV(annualAmt, invBlendForRetirement.blendedReturn, yy2, due) });
      }
      regularItems.push({ id: 'investment-monthly', frequency: 'monthly', amount: recurringMonthlyTotal, timing: 'end', returnRate: invBlendForRetirement.blendedReturn, annualAmt: annualAmt, fv: fv, path: regPath });
    }
    var savingsRegularFV = regularItems.reduce(function (s, it) { return s + it.fv; }, 0);

    var availableAtRetirement = pvdResult.finalBalance + (severance ? severance.amount : 0) + savingsRegularFV + currentSavingsFV_asis + windfallsFV;

    /* one-offs during drawdown: post-retirement portion of goals (-), post lumpsum windfalls (+), post-retirement health premiums (-) */
    var oneOffs = {};
    (a.goals || []).forEach(function (g) {
      var fromAge = Math.max(g.startAge, p.retireAge);
      for (var age = fromAge; age <= g.endAge; age++) {
        var yi = age - p.retireAge;
        if (yi >= 1) oneOffs[yi] = (oneOffs[yi] || 0) - g.amountToday * Math.pow(1 + p.inflation, age - p.currentAge);
      }
    });
    postWindfallOneOffs.forEach(function (w) {
      var yi = w.ageReceived - p.retireAge;
      if (yi >= 1) oneOffs[yi] = (oneOffs[yi] || 0) + w.amount;
    });

    /* health insurance premiums: flat nominal amount per band (no inflation — the number entered IS the amount actually paid each year in that band).
       Each band's payment phase uses the actual retirement bucket's own return rate for whatever period it falls in —
       no separate/independent interest rate for this section, so it always matches the real retirement plan. */
    var hi = a.healthInsurance || { bands: [] };
    var healthBandsCalc = (hi.bands || []).map(function (b) {
      var bucket = bucketForAge(b.fromAge);
      var bandRate = bucket ? bucket.drawdownReturn : 0.04;
      var yearsFromNow = Math.max(0, b.fromAge - p.currentAge);
      var bandYears = Math.max(1, b.toAge - b.fromAge + 1);
      var pvAtStart = C.growingAnnuityPV(b.annualPremiumToday, bandRate, 0, bandYears, true);
      var pvToday = pvAtStart / Math.pow(1 + bandRate, yearsFromNow);
      return { id: b.id, fromAge: b.fromAge, toAge: b.toAge, annualPremiumToday: b.annualPremiumToday, bandRate: bandRate, bucketLabel: bucket ? bucket.label : '-', pvToday: pvToday };
    });
    var healthRequiredToday = healthBandsCalc.reduce(function (s, b) { return s + b.pvToday; }, 0);
    var healthYearTable = [];
    for (var hy = 0; hy <= (p.lifeExpectancy - p.currentAge); hy++) {
      var age = p.currentAge + hy;
      var band = (hi.bands || []).find(function (b) { return age >= b.fromAge && age <= b.toAge; });
      var bucketAtAge = age >= p.retireAge ? bucketForAge(age) : null;
      var phaseLabel = band ? ('จ่ายเบี้ย (' + (bucketAtAge ? bucketAtAge.label : '-') + ')') : (age < p.retireAge ? 'ก่อนเกษียณ' : 'ไม่มีเบี้ยช่วงนี้');
      healthYearTable.push({
        year: hy, beYear: p.currentYearAD + 543 + hy, age: age, phase: phaseLabel,
        premiumDue: band ? band.annualPremiumToday : 0, rateUsed: band && bucketAtAge ? bucketAtAge.drawdownReturn : null
      });
    }
    (hi.bands || []).forEach(function (b) {
      var fromAge = Math.max(b.fromAge, p.retireAge);
      for (var age = fromAge; age <= b.toAge; age++) {
        var yi = age - p.retireAge;
        if (yi >= 1) oneOffs[yi] = (oneOffs[yi] || 0) - b.annualPremiumToday;
      }
    });

    function pvOfOneOffsInRange(fromYear, toYear, rate) {
      var pv = 0;
      for (var y = fromYear; y <= toYear; y++) { if (oneOffs[y]) pv += oneOffs[y] / Math.pow(1 + rate, y - fromYear); }
      return pv;
    }

    /* Build a full plan (sizing + simulation + enriched year-by-year table) for a given bucket list.
       The LAST bucket's years is always auto-corrected to absorb whatever remains of yearsRetired,
       so the total can never drift away from the person's actual retirement horizon. */
    function computeBucketPlan(rawList) {
      var list = clone(rawList);
      if (list.length) {
        var sumOthers = list.slice(0, -1).reduce(function (s, b) { return s + b.years; }, 0);
        list[list.length - 1].years = Math.max(1, yearsRetired - sumOthers);
      }
      var cum2 = 0;
      var sized = list.map(function (b, i) {
        var startAgeOfBucket = p.retireAge + cum2;
        var needAtStart = firstYearAnnualNeed * Math.pow(1 + p.inflation, cum2);
        var pensionFlatForBucket = pensionAnnualAtAge(startAgeOfBucket);
        var reqAtStart = C.growingAnnuityPV(needAtStart, b.drawdownReturn, p.inflation, b.years, true)
          - (pensionFlatForBucket > 0 ? C.growingAnnuityPV(pensionFlatForBucket, b.drawdownReturn, 0, b.years, true) : 0);
        var oneOffsPV = pvOfOneOffsInRange(cum2 + 1, cum2 + b.years, b.drawdownReturn);
        reqAtStart = Math.max(0, reqAtStart - oneOffsPV);
        var reqToday = reqAtStart / Math.pow(1 + (i === 0 ? 0 : b.waitingReturn), cum2);
        var s = { id: b.id, label: b.label, years: b.years, waitingReturn: b.waitingReturn, drawdownReturn: b.drawdownReturn, startAge: startAgeOfBucket, requiredToday: reqToday, pensionFlatForBucket: pensionFlatForBucket, needAtStart: needAtStart, oneOffsPV: oneOffsPV };
        cum2 += b.years;
        return s;
      });
      var totalYears = sized.reduce(function (s, b) { return s + b.years; }, 0);
      var netRequired = sized.reduce(function (s, b) { return s + b.requiredToday; }, 0);
      var fwd = C.simulateBucketsForward(sized, needAnnualAtYear, pensionAnnualAtYear, totalYears, oneOffs);
      var depAge = fwd.shortfallStartYear ? p.retireAge + fwd.shortfallStartYear : null;
      function solveSustainable(sizedForSolve) {
        var lo = 0, hiB = Math.max(netRequired * 3, 1e6) + 1;
        for (var i = 0; i < 60; i++) {
          var mid = (lo + hiB) / 2;
          var f = C.simulateBucketsForward(sizedForSolve, function (y) { return mid * Math.pow(1 + p.inflation, y - 1); }, pensionAnnualAtYear, totalYears, oneOffs);
          if (f.shortfallStartYear === null) lo = mid; else hiB = mid;
        }
        return lo;
      }
      var sustainable = solveSustainable(sized) / 12;
      var bounds2 = [];
      var accB = 0;
      sized.forEach(function (b) { bounds2.push([accB, accB + b.years]); accB += b.years; });
      var table = [];
      var prevBal = netRequired;
      for (var ty = 1; ty <= totalYears; ty++) {
        var needY = needAnnualAtYear(ty);
        var pensionY = pensionAnnualAtYear(ty);
        var oneOffY = oneOffs[ty] || 0;
        var endBal = fwd.path[ty] ? fwd.path[ty].balance : null;
        var interest = endBal - prevBal + needY - pensionY - oneOffY;
        var activeIdx = bounds2.findIndex(function (bd) { return ty > bd[0] && ty <= bd[1]; });
        var rateUsedRow = activeIdx >= 0 ? sized[activeIdx].drawdownReturn : null;
        table.push({
          year: ty, beYear: p.currentYearAD + 543 + yearsToRetire + ty, age: p.retireAge + ty,
          startBalance: prevBal, interest: interest, pension: pensionY, oneOff: oneOffY, withdrawal: needY, endBalance: endBal,
          rateUsed: rateUsedRow, bucketLabel: activeIdx >= 0 ? (sized[activeIdx].label || ('บัคเก็ต ' + (activeIdx + 1))) : '-'
        });
        prevBal = endBal;
      }
      return { sizedBuckets: sized, totalYears: totalYears, netRequiredCorpus: netRequired, fwdPlanned: fwd, depletionAge: depAge, sustainableMonthly: sustainable, table: table, solveSustainable: solveSustainable };
    }

    var multiPlan = computeBucketPlan(a.buckets.list);
    var blendedRate = multiPlan.sizedBuckets.reduce(function (s, b) { return s + b.years * b.drawdownReturn; }, 0) / (multiPlan.totalYears || 1);
    var singlePlan = computeBucketPlan([{ id: 'single', label: 'พอร์ตเดียวตลอดช่วงเกษียณ', years: yearsRetired, waitingReturn: 0, drawdownReturn: blendedRate }]);

    var sizedBuckets = multiPlan.sizedBuckets;
    var netRequiredCorpus = multiPlan.netRequiredCorpus;
    var gap = netRequiredCorpus - availableAtRetirement;

    function extraSavingFor(gapAmt) {
      var out = { gap: gapAmt, flatMonthly: 0, growingFirstMonthly: 0, growingLastMonthly: 0 };
      if (gapAmt > 0) {
        out.flatMonthly = C.pmtFromFV(gapAmt, a.extraSavingReturn, yearsToRetire, false) / 12;
        out.growingFirstMonthly = C.pmtFromFVGrowing(gapAmt, a.extraSavingReturn, p.salaryGrowth, yearsToRetire, false) / 12;
        out.growingLastMonthly = yearsToRetire > 0 ? out.growingFirstMonthly * Math.pow(1 + p.salaryGrowth, yearsToRetire - 1) : out.growingFirstMonthly;
      }
      return out;
    }
    var multiExtraSaving = extraSavingFor(gap);
    var singleGap = singlePlan.netRequiredCorpus - availableAtRetirement;
    var singleExtraSaving = extraSavingFor(singleGap);

    var extraMonthlySaving = 0;
    var extraSavingFlatMonthly = multiExtraSaving.flatMonthly, extraSavingGrowingFirstMonthly = multiExtraSaving.growingFirstMonthly, extraSavingGrowingLastMonthly = multiExtraSaving.growingLastMonthly;
    if (gap > 0) {
      extraMonthlySaving = a.extraSavingMode === 'growing' ? extraSavingGrowingFirstMonthly : extraSavingFlatMonthly;
    }

    var totalBucketYears = multiPlan.totalYears;
    var fwdPlanned = multiPlan.fwdPlanned;
    var depletionAge = multiPlan.depletionAge;
    var drawdownTable = multiPlan.table;
    var sustainableMonthly = multiPlan.sustainableMonthly;

    /* stress test: apply delta to drawdownReturn of every bucket, for both plans */
    var stressedMultiList = a.buckets.list.map(function (b) { return Object.assign({}, b, { drawdownReturn: Math.max(-0.5, b.drawdownReturn + a.stressTestDelta) }); });
    var multiPlanStressed = computeBucketPlan(stressedMultiList);
    var depletionAgeStressed = multiPlanStressed.depletionAge;
    var sustainableMonthlyStressed = multiPlanStressed.sustainableMonthly;

    /* accumulation chart path (พ.ศ.) */
    var accumPath = [];
    for (var yy = 0; yy <= yearsToRetire; yy++) {
      var pvdBal = yy === 0 ? (a.pvd.startingBalance || 0) : (pvdResult.path[yy - 1] ? pvdResult.path[yy - 1].balance : 0);
      var currentItemsBal = currentItems.reduce(function (s, it) { return s + C.fv(it.amount, it.returnRate, yy); }, 0);
      var regularItemsBal = regularItems.reduce(function (s, it) { return s + C.annuityFV(it.annualAmt, it.returnRate, yy, it.timing === 'begin'); }, 0);
      accumPath.push({ x: yy, label: String(p.currentYearAD + 543 + yy), y: pvdBal + currentItemsBal + regularItemsBal, age: p.currentAge + yy });
    }
    var drawdownPath = fwdPlanned.path.map(function (pt) {
      return { x: pt.year, label: String(p.currentYearAD + 543 + yearsToRetire + pt.year), y: Math.max(0, pt.balance), age: p.retireAge + pt.year };
    });

    /* timeline events */
    var events = [];
    events.push({ age: p.currentAge, be: p.currentYearAD + 543, label: 'เริ่มวางแผน', type: 'milestone' });
    events.push({ age: p.retireAge, be: p.currentYearAD + 543 + yearsToRetire, label: 'วันเกษียณอายุ', type: 'milestone' });
    (a.goals || []).forEach(function (g) {
      var label = g.startAge === g.endAge ? ('เป้าหมาย: ' + g.name) : ('เริ่มเป้าหมาย: ' + g.name);
      events.push({ age: g.startAge, be: p.currentYearAD + 543 + (g.startAge - p.currentAge), label: label, type: 'goal' });
    });
    (a.windfalls || []).forEach(function (w) {
      if (w.flowType === 'lumpsum') events.push({ age: w.ageReceived, be: p.currentYearAD + 543 + (w.ageReceived - p.currentAge), label: 'เงินก้อนเข้า: ' + w.description, type: 'income' });
      else events.push({ age: w.startAge, be: p.currentYearAD + 543 + (w.startAge - p.currentAge), label: 'เริ่มรับ: ' + w.description, type: 'income' });
    });
    (a.healthInsurance.bands || []).forEach(function (b) {
      events.push({ age: b.fromAge, be: p.currentYearAD + 543 + (b.fromAge - p.currentAge), label: 'เริ่มจ่ายเบี้ยประกันสุขภาพ (' + b.fromAge + '-' + b.toAge + ' ปี)', type: 'goal' });
    });
    var cumEvt = 0;
    sizedBuckets.forEach(function (b, i) {
      if (i > 0) events.push({ age: p.retireAge + cumEvt, be: p.currentYearAD + 543 + yearsToRetire + cumEvt, label: 'เปลี่ยนช่วงบัคเก็ต: ' + (b.label || ('บัคเก็ตที่ ' + (i + 1))), type: 'bucket' });
      cumEvt += b.years;
    });
    if (depletionAge) events.push({ age: depletionAge, be: p.currentYearAD + 543 + (depletionAge - p.currentAge), label: 'เงินลงทุนคาดว่าจะหมด (เหลือเฉพาะบำนาญ)', type: 'warning' });
    events.push({ age: p.lifeExpectancy, be: p.currentYearAD + 543 + (p.lifeExpectancy - p.currentAge), label: 'สิ้นสุดแผน (อายุขัย)', type: 'milestone' });
    events.sort(function (x, y) { return x.age - y.age; });

    return {
      yearsToRetire: yearsToRetire, yearsRetired: yearsRetired, salaryAtRetire: salaryAtRetire,
      firstYearMonthlyNeed: firstYearMonthlyNeed, firstYearAnnualNeed: firstYearAnnualNeed,
      pvdResult: pvdResult, ssoMonthly: ssoMonthly, ssoMonthsAtRetirement: ssoMonthsAtRetirement, ssoYearsPaid: ssoYearsPaid, ssoPct: ssoPct, ssoAvgWageCapped: ssoAvgWageCapped, severance: severance,
      savingsRegularFV: savingsRegularFV, windfallsFV: windfallsFV, regularItems: regularItems,
      currentItems: currentItems, currentSavingsFV_asis: currentSavingsFV_asis, currentSavingsFV_ifPlanned: currentSavingsFV_ifPlanned,
      availableAtRetirement: availableAtRetirement, netRequiredCorpus: netRequiredCorpus, gap: gap,
      extraMonthlySaving: extraMonthlySaving, extraSavingFlatMonthly: extraSavingFlatMonthly,
      extraSavingGrowingFirstMonthly: extraSavingGrowingFirstMonthly, extraSavingGrowingLastMonthly: extraSavingGrowingLastMonthly,
      sizedBuckets: sizedBuckets,
      fwdPlanned: fwdPlanned, depletionAge: depletionAge, sustainableMonthly: sustainableMonthly,
      depletionAgeStressed: depletionAgeStressed, sustainableMonthlyStressed: sustainableMonthlyStressed,
      accumPath: accumPath, drawdownPath: drawdownPath, events: events,
      pensionAnnualAtYear: pensionAnnualAtYear, drawdownTable: drawdownTable,
      healthBandsCalc: healthBandsCalc, healthRequiredToday: healthRequiredToday, healthYearTable: healthYearTable,
      multiPlan: multiPlan, singlePlan: singlePlan, blendedRate: blendedRate,
      multiExtraSaving: multiExtraSaving, singleExtraSaving: singleExtraSaving, singleGap: singleGap
    };
  }

  /* ================= SECTION RENDERERS ================= */
  var SECTION_ICONS = { 1: '👤', 2: '🏦', 3: '🎯', 4: '💰', 5: '🎁', 6: '🏥', 7: '📊', 8: '🏦', 9: '📜', 10: '💹', 11: '🏥', 12: '🧮', 13: '🪣', 14: '⚡',
    102: '💵', 103: '🧾', 104: '💎', 105: '💳', 109: '🏆', 110: '🎓', 111: '🏠', 112: '📈', 113: '🛡️', 120: '🩺', 130: '📐',
    201: '🎯', 202: '💰', 203: '⚖️', 204: '🔀', 205: '📈', 206: '🛡️' };
  function sectionWrap(num, title, subtitle, tone, open, bodyHtml, filled) {
    return '<div class="section tone-' + tone + (open ? ' open' : '') + (filled ? ' filled' : '') + '">' +
      '<button class="section-head" type="button" data-action="toggleSection" data-num="' + num + '">' +
      '<span class="section-num">' + (filled ? '✓' : (SECTION_ICONS[num] || num)) + '</span>' +
      '<span class="section-title-wrap"><span class="section-title">' + esc(title) + '</span>' +
      (subtitle ? '<span class="section-subtitle">' + subtitle + '</span>' : '') + '</span>' +
      '<span class="section-chevron">' + (open ? '▾' : '▸') + '</span>' +
      '</button>' +
      (open ? '<div class="section-body">' + bodyHtml +
        '<div class="section-footer"><button class="section-collapse-btn" type="button" data-action="toggleSection" data-num="' + num + '" title="ย่อหัวข้อนี้">▲ ย่อ</button></div>' +
        '</div>' : '') +
      '</div>';
  }

  /* ================= FINANCE MODULE (Phase 1) ================= */

  function renderIncome(a) {
    var items = a.finance.income.items;
    var table = entryTable({
      headers: ['ความถี่ที่ได้รับ', 'รายการ', 'จำนวนเงิน', 'อัตราเติบโต (%)', 'ปรับทุกกี่ปี'],
      colTemplate: '1fr 1.3fr 1fr 0.9fr 0.9fr',
      rows: items.map(function (it, i) { return { it: it, idx: i }; }),
      rowCells: function (row) {
        var it = row.it, i = row.idx;
        return [
          rawInput(['finance', 'income', 'items', i, 'frequency'], it.frequency, { type: 'select', options: [{ value: 'monthly', label: 'รายเดือน' }, { value: 'semiannual', label: 'ราย 6 เดือน' }, { value: 'annual', label: 'รายปี' }] }),
          rawInput(['finance', 'income', 'items', i, 'category'], it.category, { type: 'text' }),
          rawInput(['finance', 'income', 'items', i, 'amount'], it.amount, { type: 'money' }),
          rawInput(['finance', 'income', 'items', i, 'growthRate'], it.growthRate, { type: 'percent' }),
          rawInput(['finance', 'income', 'items', i, 'adjustFrequencyYears'], it.adjustFrequencyYears, { suffix: 'ปี' })
        ];
      },
      addAction: 'addIncomeItem', addLabel: 'เพิ่มรายได้', delAction: 'delIncomeItem',
      emptyMsg: 'เช่น เงินเดือน (รายเดือน), โบนัส (รายปี), ค่าเช่า, เงินปันผล'
    });
    return table + '<div class="entry-note">"อัตราเติบโต" คือ % ที่เพิ่มขึ้นทุกครั้งที่ถึงรอบปรับ — ถ้าขึ้นทุกปีให้ใส่ "ปรับทุกกี่ปี" เป็น 1, ถ้าขึ้นทุก 3 ปีให้ใส่ 3 เป็นต้น</div>';
  }

  function renderExpenses(a) {
    var reg = a.finance.expenses.regular.items;
    var regTable = entryTable({
      headers: ['หมวด', 'รายการ', 'จำนวนเงิน', 'ความถี่ในการจ่าย'],
      colTemplate: '1.1fr 1.3fr 1fr 1.1fr',
      rows: reg.map(function (it, i) { return { it: it, idx: i }; }),
      rowCells: function (row) {
        var it = row.it, i = row.idx;
        return [
          rawInput(['finance', 'expenses', 'regular', 'items', i, 'expenseType'], it.expenseType, { type: 'select', options: EXPENSE_TYPE_CATEGORIES }),
          rawInput(['finance', 'expenses', 'regular', 'items', i, 'category'], it.category, { type: 'text' }),
          rawInput(['finance', 'expenses', 'regular', 'items', i, 'amount'], it.amount, { type: 'money' }),
          rawInput(['finance', 'expenses', 'regular', 'items', i, 'frequency'], it.frequency, { type: 'select', options: [{ value: 'monthly', label: 'รายเดือน' }, { value: 'quarterly', label: 'ราย 3 เดือน' }, { value: 'semiannual', label: 'ราย 6 เดือน' }, { value: 'annual', label: 'รายปี' }] })
        ];
      },
      addAction: 'addExpenseRegular', addLabel: 'เพิ่มค่าใช้จ่าย', delAction: 'delExpenseRegular',
      emptyMsg: 'เช่น ค่าเช่าบ้าน (ประจำ, รายเดือน), ค่าอาหาร (ผันแปร, รายเดือน), เบี้ยประกัน (ประจำ, รายปี)'
    });
    return '<div class="subblock" style="margin-top:0"><div class="subblock-title">ค่าใช้จ่ายประจำ/ผันแปร (จ่ายเป็นรอบ)</div>' + regTable + '</div>';
  }

  function renderInsurance(a, fr) {
    var life = a.finance.insurance.life;
    var lc = fr.lifeInsuranceCalc;
    var needCols = [
      { label: 'รายการ', render: function (row) { return row.label; } },
      { label: 'จำนวนเงิน', render: function (row) { return fmt(row.amount) + ' บาท'; } }
    ];
    var needRows = [
      { label: 'หนี้สินที่ต้องปิด', amount: lc.totalDebt },
      { label: 'เงินเลี้ยงดูครอบครัว (' + life.yearsOfSupport + ' ปี)', amount: lc.incomeReplacementNeed },
      { label: 'ค่าเล่าเรียนบุตรที่ยังขาด', amount: lc.totalEducationNeed },
      { label: 'ค่าใช้จ่ายสุดท้าย (งานศพ ฯลฯ)', amount: lc.finalExpenses },
      { label: 'เงินมรดกที่ต้องการทิ้งไว้', amount: lc.legacyAmount }
    ];
    var lifeSection = '<div class="subblock" style="margin-top:0"><div class="subblock-title">ทุนประกันชีวิตที่ควรมี (Needs-based Analysis)</div>' +
      '<div class="grid-2">' +
      field('ปีที่ต้องการเลี้ยงดูครอบครัว', ['finance', 'insurance', 'life', 'yearsOfSupport'], life.yearsOfSupport, { suffix: 'ปี' }) +
      field('ค่าใช้จ่ายครอบครัวต่อปี (ถ้าขาดคุณไป)', ['finance', 'insurance', 'life', 'familyLivingExpenseAnnual'], life.familyLivingExpenseAnnual, { type: 'money', suffix: 'บาท/ปี' }) +
      field('ค่าใช้จ่ายสุดท้าย (งานศพ ฯลฯ)', ['finance', 'insurance', 'life', 'finalExpenses'], life.finalExpenses, { type: 'money', suffix: 'บาท' }) +
      field('เงินมรดกที่ต้องการทิ้งไว้เพิ่มเติม', ['finance', 'insurance', 'life', 'legacyAmount'], life.legacyAmount, { type: 'money', suffix: 'บาท' }) +
      field('ทุนประกันชีวิตที่มีอยู่แล้ว', ['finance', 'insurance', 'life', 'existingCoverage'], life.existingCoverage, { type: 'money', suffix: 'บาท' }) +
      '</div>' +
      detailTable(needRows, needCols, 'lifeinsneed') +
      '<div class="grid-2" style="margin-top:14px">' +
      metricCard('ทุนประกันชีวิตที่ควรมีทั้งหมด', fmt(lc.totalNeed) + ' บาท', 'navy') +
      metricCard(lc.gap > 0 ? 'ยังขาดความคุ้มครองอยู่' : 'มีความคุ้มครองเพียงพอแล้ว', fmt(lc.gap) + ' บาท', lc.gap > 0 ? 'red' : 'green', 'มีอยู่แล้ว ' + fmt(lc.existingCoverage) + ' บาท') +
      '</div></div>';

    var items = a.finance.insurance.otherPolicies.items;
    var otherTable = entryTable({
      headers: ['ประเภทประกัน', 'ความคุ้มครองปัจจุบัน (บาท)', 'ความคุ้มครองที่แนะนำ (บาท)'],
      colTemplate: '1.3fr 1fr 1fr',
      rows: items.map(function (it, i) { return { it: it, idx: i }; }),
      rowCells: function (row) {
        var it = row.it, i = row.idx;
        return [
          rawInput(['finance', 'insurance', 'otherPolicies', 'items', i, 'type'], it.type, { type: 'text' }),
          rawInput(['finance', 'insurance', 'otherPolicies', 'items', i, 'currentCoverage'], it.currentCoverage, { type: 'money' }),
          rawInput(['finance', 'insurance', 'otherPolicies', 'items', i, 'recommendedCoverage'], it.recommendedCoverage, { type: 'money' })
        ];
      },
      addAction: 'addOtherPolicy', addLabel: 'เพิ่มกรมธรรม์', delAction: 'delOtherPolicy',
      emptyMsg: 'เช่น ประกันสุขภาพ, โรคร้ายแรง, อุบัติเหตุ, ทุพพลภาพ, บ้าน/ทรัพย์สิน, ธุรกิจ'
    });
    var otherCols = [
      { label: 'ประเภท', render: function (row) { return esc(row.type); } },
      { label: 'มีอยู่แล้ว', render: function (row) { return fmt(row.currentCoverage) + ' บาท'; } },
      { label: 'ที่แนะนำ', render: function (row) { return fmt(row.recommendedCoverage) + ' บาท'; } },
      { label: 'ส่วนที่ขาด', render: function (row) { return row.gap > 0 ? fmt(row.gap) + ' บาท' : 'เพียงพอแล้ว'; } }
    ];
    var otherSection = '<div class="subblock"><div class="subblock-title">ประกันสุขภาพและความคุ้มครองอื่นๆ</div>' +
      otherTable + (fr.otherPoliciesCalc.length ? detailTable(fr.otherPoliciesCalc, otherCols, 'otherinsurance') : '') + '</div>';

    return lifeSection + otherSection;
  }

  function renderAssumptions(a) {
    var as = a.assumptions;
    return '<div class="grid-2">' +
      field('อัตราเงินเฟ้อทั่วไป', ['personal', 'inflation'], a.personal.inflation, { type: 'percent', suffix: '%/ปี', hint: 'ใช้ปรับมูลค่าค่าใช้จ่ายและเป้าหมายทางการเงินทั่วไป' }) +
      field('อัตราเงินเฟ้อเพื่อการศึกษา', ['assumptions', 'educationInflation'], as.educationInflation, { type: 'percent', suffix: '%/ปี', hint: 'มักสูงกว่าเงินเฟ้อทั่วไป ใช้ปรับค่าเทอมในอนาคต' }) +
      '</div>' +
      '<div class="subblock-title" style="margin-top:14px">อัตราผลตอบแทนจากการลงทุน (ใช้เป็นค่าอ้างอิงในการคำนวณต่างๆ)</div>' +
      '<div class="grid-3">' +
      field('พอร์ตความเสี่ยงต่ำ', ['assumptions', 'returnLow'], as.returnLow, { type: 'percent', suffix: '%/ปี' }) +
      field('พอร์ตความเสี่ยงปานกลาง', ['assumptions', 'returnMid'], as.returnMid, { type: 'percent', suffix: '%/ปี' }) +
      field('พอร์ตความเสี่ยงสูง', ['assumptions', 'returnHigh'], as.returnHigh, { type: 'percent', suffix: '%/ปี' }) +
      '</div>' +
      '<div class="entry-note" style="margin-top:10px">ค่าสมมติฐานเหล่านี้ถูกใช้เป็นค่าเริ่มต้นในการคำนวณเป้าหมายต่างๆ ทั่วทั้งแผน (เช่น เป้าหมายเพื่อค่าใช้จ่ายอื่นๆ, การศึกษาบุตร) — ปรับที่นี่จุดเดียว มีผลทั้งแผน</div>';
  }

  function renderInvestment(a, fr) {
    var inv = a.finance.investment;
    var currentItems = inv.currentInvestments.items;
    var currentTable = entryTable({
      headers: ['ประเภทการลงทุน', 'จำนวนเงิน (บาท)', 'ผลตอบแทน (%/ปี)'],
      colTemplate: '1.4fr 1fr 1fr',
      rows: currentItems.map(function (it, i) { return { it: it, idx: i }; }),
      rowCells: function (row) {
        var it = row.it, i = row.idx;
        return [
          rawInput(['finance', 'investment', 'currentInvestments', 'items', i, 'type'], it.type, { type: 'text' }),
          rawInput(['finance', 'investment', 'currentInvestments', 'items', i, 'amount'], it.amount, { type: 'money' }),
          rawInput(['finance', 'investment', 'currentInvestments', 'items', i, 'returnRate'], it.returnRate, { type: 'percent' })
        ];
      },
      addAction: 'addCurrentInvestment', addLabel: 'เพิ่มเงินลงทุนปัจจุบัน', delAction: 'delCurrentInvestment',
      emptyMsg: 'เช่น กองทุนรวมหุ้น, หุ้นรายตัว, พันธบัตร, ทองคำ, คริปโต — ระบุได้หลายรายการ'
    });
    var recurringItems = inv.recurringInvestments.items;
    var recurringTable = entryTable({
      headers: ['ความถี่', 'ประเภทการลงทุน', 'จำนวนเงิน', 'ผลตอบแทน (%/ปี)'],
      colTemplate: '1fr 1.3fr 1fr 1fr',
      rows: recurringItems.map(function (it, i) { return { it: it, idx: i }; }),
      rowCells: function (row) {
        var it = row.it, i = row.idx;
        return [
          rawInput(['finance', 'investment', 'recurringInvestments', 'items', i, 'frequency'], it.frequency, { type: 'select', options: [{ value: 'monthly', label: 'ทุกเดือน' }, { value: 'quarterly', label: 'ทุก 3 เดือน' }, { value: 'semiannual', label: 'ทุก 6 เดือน' }, { value: 'annual', label: 'ทุกปี' }] }),
          rawInput(['finance', 'investment', 'recurringInvestments', 'items', i, 'type'], it.type, { type: 'text' }),
          rawInput(['finance', 'investment', 'recurringInvestments', 'items', i, 'amount'], it.amount, { type: 'money' }),
          rawInput(['finance', 'investment', 'recurringInvestments', 'items', i, 'returnRate'], it.returnRate, { type: 'percent' })
        ];
      },
      addAction: 'addRecurringInvestment', addLabel: 'เพิ่มเงินลงทุนต่อเนื่อง', delAction: 'delRecurringInvestment',
      emptyMsg: 'เช่น DCA กองทุนรวมทุกเดือน, ซื้อหุ้นปันผลทุก 6 เดือน — ระบุได้หลายรายการ'
    });
    return '<div class="subblock" style="margin-top:0"><div class="subblock-title">เงินลงทุนที่มีในปัจจุบัน</div>' +
      '<button class="btn btn-add-row btn-sm" type="button" data-action="syncCurrentInvestments" style="margin-bottom:10px">🔄 ดึงข้อมูลจากสินทรัพย์เพื่อการลงทุน</button>' +
      currentTable +
      metricCard('รวมเงินลงทุนปัจจุบัน', fmt(fr.invCurrentTotal) + ' บาท', 'navy') + '</div>' +
      '<div class="subblock"><div class="subblock-title">เงินลงทุนอย่างต่อเนื่อง</div>' +
      '<button class="btn btn-add-row btn-sm" type="button" data-action="syncRecurringInvestments" style="margin-bottom:10px">🔄 ดึงข้อมูลจากค่าใช้จ่ายเพื่อการลงทุน</button>' +
      recurringTable +
      metricCard('รวมเงินลงทุนต่อเนื่อง', fmt(fr.invRecurringMonthly) + ' บาท/เดือน', 'navy') + '</div>';
  }

  var ASSET_MAIN_CATEGORIES = [
    { value: 'liquid', label: 'สินทรัพย์สภาพคล่อง' },
    { value: 'investment', label: 'สินทรัพย์เพื่อการลงทุน' },
    { value: 'personal', label: 'สินทรัพย์ส่วนตัว' },
    { value: 'other', label: 'สินทรัพย์อื่นๆ' }
  ];
  var LIABILITY_MAIN_CATEGORIES = [
    { value: 'shortterm', label: 'หนี้สินระยะสั้น' },
    { value: 'longterm', label: 'หนี้สินระยะยาว' }
  ];
  var EXPENSE_TYPE_CATEGORIES = [
    { value: 'fixed', label: 'ค่าใช้จ่ายประจำ (คงที่)' },
    { value: 'variable', label: 'ค่าใช้จ่ายผันแปร' },
    { value: 'savingsInvestment', label: 'เงินออมและลงทุน' }
  ];
  function renderAssets(a) {
    var items = a.finance.assets.items;
    var table = entryTable({
      headers: ['หมวดหลัก', 'ชื่อรายการ', 'มูลค่าปัจจุบัน (บาท)'],
      colTemplate: '1.3fr 1.3fr 1fr',
      rows: items.map(function (it, i) { return { it: it, idx: i }; }),
      rowCells: function (row) {
        var it = row.it, i = row.idx;
        return [
          rawInput(['finance', 'assets', 'items', i, 'mainCategory'], it.mainCategory, { type: 'select', options: ASSET_MAIN_CATEGORIES }),
          rawInput(['finance', 'assets', 'items', i, 'name'], it.name, { type: 'text' }),
          rawInput(['finance', 'assets', 'items', i, 'value'], it.value, { type: 'money' })
        ];
      },
      addAction: 'addAsset', addLabel: 'เพิ่มสินทรัพย์', delAction: 'delAsset',
      emptyMsg: 'เช่น เงินสด/เงินฝาก (สภาพคล่อง), กองทุน/หุ้น (เพื่อการลงทุน), บ้าน/รถ (ส่วนตัว), ที่ดิน/ธุรกิจ (อื่นๆ)'
    });
    return table + '<div class="entry-note">ผลตอบแทนคาดหวังของแต่ละสินทรัพย์คำนวณอัตโนมัติตามหมวดหลัก: สินทรัพย์สภาพคล่องใช้อัตราเงินสด, สินทรัพย์เพื่อการลงทุนใช้อัตราผสมจากหัวข้อ "การลงทุน" (Asset Allocation), ส่วนสินทรัพย์ส่วนตัว/อื่นๆ ไม่คิดผลตอบแทน</div>';
  }

  function renderLiabilities(a) {
    var items = a.finance.liabilities.items;
    var table = entryTable({
      headers: ['ประเภทหนี้สิน', 'ชื่อหนี้สิน', 'ภาระหนี้คงเหลือปัจจุบัน (บาท)', 'อัตราดอกเบี้ย (%/ปี)', 'ค่างวด (บาท/เดือน)', 'ระยะเวลาที่เหลือ (เดือน)'],
      colTemplate: '1fr 1.1fr 1.1fr 0.9fr 1fr 1fr',
      rows: items.map(function (it, i) { return { it: it, idx: i }; }),
      rowCells: function (row) {
        var it = row.it, i = row.idx;
        return [
          rawInput(['finance', 'liabilities', 'items', i, 'mainCategory'], it.mainCategory, { type: 'select', options: LIABILITY_MAIN_CATEGORIES }),
          rawInput(['finance', 'liabilities', 'items', i, 'name'], it.name, { type: 'text' }),
          rawInput(['finance', 'liabilities', 'items', i, 'balance'], it.balance, { type: 'money' }),
          rawInput(['finance', 'liabilities', 'items', i, 'interestRate'], it.interestRate, { type: 'percent' }),
          rawInput(['finance', 'liabilities', 'items', i, 'monthlyPayment'], it.monthlyPayment, { type: 'money' }),
          rawInput(['finance', 'liabilities', 'items', i, 'remainingMonths'], it.remainingMonths, {})
        ];
      },
      addAction: 'addLiability', addLabel: 'เพิ่มหนี้สิน', delAction: 'delLiability',
      emptyMsg: 'เช่น บัตรเครดิต (ระยะสั้น), สินเชื่อบ้าน/รถ (ระยะยาว)'
    });
    return table;
  }

  function renderEmergencyFund(a, fr) {
    return field('เป้าหมายเงินสำรอง (กี่เดือนของค่าใช้จ่าย)', ['finance', 'emergencyFund', 'targetMonths'], a.finance.emergencyFund.targetMonths, { suffix: 'เดือน' }) +
      '<div class="grid-3" style="margin-top:14px">' +
      metricCard('เป้าหมายเงินสำรองฉุกเฉิน', fmt(fr.emergencyCalc.target) + ' บาท', 'navy') +
      metricCard('เงินสภาพคล่องสูงที่มีตอนนี้', fmt(fr.liquidAssets) + ' บาท', 'navy') +
      metricCard(fr.emergencyCalc.gap > 0 ? 'ยังขาดอยู่' : 'เพียงพอแล้ว', fmt(fr.emergencyCalc.gap) + ' บาท', fr.emergencyCalc.gap > 0 ? 'red' : 'green', 'ถ้าหยุดมีรายได้วันนี้ อยู่ได้ ' + fr.emergencyCalc.monthsCovered.toFixed(1) + ' เดือน') +
      '</div>';
  }

  function renderFinanceGoalsInput(a) {
    var items = a.finance.goals.items;
    return entryTable({
      headers: ['ชื่อเป้าหมาย', 'จำนวนเงินที่ต้องใช้ (มูลค่าวันนี้)', 'อายุเริ่มใช้', 'อายุสิ้นสุด', 'ความถี่'],
      colTemplate: '1.3fr 1.2fr 0.8fr 0.8fr 1fr',
      rows: items.map(function (it, i) { return { it: it, idx: i }; }),
      rowCells: function (row) {
        var it = row.it, i = row.idx;
        return [
          rawInput(['finance', 'goals', 'items', i, 'name'], it.name, { type: 'text' }),
          rawInput(['finance', 'goals', 'items', i, 'amountToday'], it.amountToday, { type: 'money' }),
          rawInput(['finance', 'goals', 'items', i, 'startAge'], it.startAge, {}),
          rawInput(['finance', 'goals', 'items', i, 'endAge'], it.endAge, {}),
          rawInput(['finance', 'goals', 'items', i, 'frequency'], it.frequency, { type: 'select', options: [{ value: 'once', label: 'ใช้ครั้งเดียว' }, { value: 'annual', label: 'ใช้ทุกปี' }] })
        ];
      },
      addAction: 'addFinanceGoal', addLabel: 'เพิ่มเป้าหมาย', delAction: 'delFinanceGoal',
      emptyMsg: 'เช่น ซื้อบ้าน, ซื้อรถ, แต่งงาน, ท่องเที่ยว, เปิดธุรกิจ, เงินก้อนให้ลูก/พ่อแม่ — ถ้าใช้ครั้งเดียว อายุเริ่ม=สิ้นสุดได้เลย'
    });
  }
  function renderFinanceGoalsCalc(fr) {
    var cols = [
      { label: 'เป้าหมาย', render: function (row) { return esc(row.name); } },
      { label: 'อีก (ปี)', render: function (row) { return row.years; } },
      { label: 'มูลค่าที่ต้องเตรียม (ปรับเงินเฟ้อแล้ว)', render: function (row) { return fmt(row.futureValueNeeded) + ' บาท'; } },
      { label: 'ควรออมเพิ่ม/เดือน', render: function (row) { return fmt(row.requiredMonthly) + ' บาท'; } }
    ];
    return fr.goalsCalc.length ? detailTable(fr.goalsCalc, cols, 'financegoals') : '<div class="note">ยังไม่ได้ระบุเป้าหมายทางการเงินอื่นๆ ในแท็บ "เป้าหมาย"</div>';
  }

  function renderFinanceEducationInput(a) {
    var children = a.finance.education.children;
    if (!children.length) {
      return '<div class="note">ยังไม่มีบุตร — กด "เพิ่มบุตร" ด้านล่างเพื่อเริ่มวางแผนการศึกษา</div>' +
        '<button class="btn btn-add-row" type="button" data-action="addEducationChild" style="margin-top:10px">+ เพิ่มบุตร</button>';
    }
    var blocks = children.map(function (child, ci) {
      var levelTable = entryTable({
        headers: ['ระดับการศึกษา', 'ค่าเทอมปัจจุบัน (บาท/ปี)', 'อีก (ปี) ก่อนเข้าเรียน', 'เงินเฟ้อค่าเรียน (%/ปี)'],
        colTemplate: '1.6fr 1.2fr 1fr 1fr',
        rows: child.items.map(function (it, i) { return { it: it, idx: i }; }),
        rowCells: function (row) {
          var it = row.it, i = row.idx;
          var lvl = educationLevelInfo(it.level);
          var yearsToStart = Math.max(0, lvl.startAge - child.childCurrentAge);
          return [
            rawInput(['finance', 'education', 'children', ci, 'items', i, 'level'], it.level, { type: 'select', options: EDUCATION_LEVELS.map(function (l) { return { value: l.value, label: l.label + ' (เริ่มอายุ ' + l.startAge + ')' }; }) }),
            rawInput(['finance', 'education', 'children', ci, 'items', i, 'annualCostToday'], it.annualCostToday, { type: 'money' }),
            '<span class="entry-note">' + yearsToStart + ' ปี</span>',
            rawInput(['finance', 'education', 'children', ci, 'items', i, 'inflationRate'], it.inflationRate, { type: 'percent' })
          ];
        },
        addAction: 'addEducationLevel', addLabel: 'เพิ่มระดับการศึกษา', delAction: 'delEducationLevel', extraAttr: 'data-child-index="' + ci + '"',
        emptyMsg: 'เลือกระดับการศึกษา ระบบจะกำหนดอายุที่เข้าเรียนและระยะเวลาเรียนของระดับนั้นให้อัตโนมัติ'
      });
      return '<div class="subblock' + (ci === 0 ? '' : '') + '" style="' + (ci === 0 ? 'margin-top:0' : '') + '">' +
        '<div class="child-header-row">' +
        '<div class="grid-2" style="flex:1">' +
        field('ชื่อบุตร', ['finance', 'education', 'children', ci, 'childName'], child.childName, { type: 'text' }) +
        field('อายุปัจจุบันบุตร', ['finance', 'education', 'children', ci, 'childCurrentAge'], child.childCurrentAge, { suffix: 'ปี' }) +
        '</div>' +
        '<button class="btn btn-del-row" type="button" data-action="delEducationChild" data-index="' + ci + '" title="ลบบุตรคนนี้">×</button>' +
        '</div>' +
        levelTable + '</div>';
    }).join('');
    return blocks + '<button class="btn btn-add-row" type="button" data-action="addEducationChild" style="margin-top:6px">+ เพิ่มบุตร</button>';

  }
  function renderFinanceEducationCalc(fr) {
    var cols = [
      { label: 'บุตร', render: function (row) { return esc(row.childName) + ' (' + esc(row.levelLabel) + ')'; } },
      { label: 'อีก (ปี) ก่อนเริ่มเรียน', render: function (row) { return row.yearsToStart; } },
      { label: 'ค่าเรียน/ปี ตอนเริ่ม', render: function (row) { return fmt(row.costAtStart) + ' บาท'; } },
      { label: 'เงินก้อนที่ต้องมีตอนเริ่มเรียน', render: function (row) { return fmt(row.totalNeededAtStart) + ' บาท'; } },
      { label: 'ควรออมเพิ่ม/เดือน', render: function (row) { return fmt(row.requiredMonthly) + ' บาท'; } }
    ];
    return fr.educationCalc.length ? detailTable(fr.educationCalc, cols, 'financeedu') : '<div class="note">ยังไม่ได้ระบุแผนการศึกษาบุตร ในแท็บ "เป้าหมาย"</div>';
  }

  function renderMajorPurchases(a, fr) {
    var items = a.finance.majorPurchases.items;
    var table = entryTable({
      headers: ['ชื่อรายการ', 'ราคา (บาท)', 'เงินดาวน์ (%)', 'อัตราดอกเบี้ย (%/ปี)', 'ระยะเวลากู้ (ปี)', 'ค่าใช้จ่ายอื่นๆ วันโอน (บาท)'],
      colTemplate: '1.2fr 1fr 0.8fr 0.9fr 0.8fr 1fr',
      rows: items.map(function (it, i) { return { it: it, idx: i }; }),
      rowCells: function (row) {
        var it = row.it, i = row.idx;
        return [
          rawInput(['finance', 'majorPurchases', 'items', i, 'name'], it.name, { type: 'text' }),
          rawInput(['finance', 'majorPurchases', 'items', i, 'price'], it.price, { type: 'money' }),
          rawInput(['finance', 'majorPurchases', 'items', i, 'downPaymentPercent'], it.downPaymentPercent, { type: 'percent' }),
          rawInput(['finance', 'majorPurchases', 'items', i, 'interestRate'], it.interestRate, { type: 'percent' }),
          rawInput(['finance', 'majorPurchases', 'items', i, 'loanTermYears'], it.loanTermYears, {}),
          rawInput(['finance', 'majorPurchases', 'items', i, 'extraCosts'], it.extraCosts, { type: 'money' })
        ];
      },
      addAction: 'addMajorPurchase', addLabel: 'เพิ่มแผนซื้อบ้าน/รถ', delAction: 'delMajorPurchase',
      emptyMsg: 'เช่น ซื้อบ้าน, ซื้อรถ พร้อมคำนวณค่างวดและตรวจสอบว่ากระแสเงินสดรับไหวหรือไม่'
    });
    var cols = [
      { label: 'รายการ', render: function (row) { return esc(row.name); } },
      { label: 'เงินดาวน์', render: function (row) { return fmt(row.downPayment) + ' บาท'; } },
      { label: 'ยอดกู้', render: function (row) { return fmt(row.loanAmount) + ' บาท'; } },
      { label: 'ค่างวด/เดือน', render: function (row) { return fmt(row.monthlyPayment) + ' บาท'; } },
      { label: 'เงินสดที่ต้องใช้วันโอน', render: function (row) { return fmt(row.totalUpfront) + ' บาท'; } },
      { label: 'กระแสเงินสดรับไหวไหม', render: function (row) { return row.affordable ? '✓ รับไหว' : '✕ เกินกำลัง'; } }
    ];
    return table + (fr.purchasesCalc.length ? detailTable(fr.purchasesCalc, cols, 'financepurchase') : '') +
      '<div class="entry-note">เทียบค่างวดกับ "เงินคงเหลือสุทธิ/เดือน" ในหัวข้อกระแสเงินสด (107) — ถ้าค่างวดมากกว่าเงินคงเหลือ แปลว่ายังรับภาระนี้ไม่ไหวตามกระแสเงินสดปัจจุบัน</div>';
  }

  function categoryLabel(list, value) {
    var found = list.filter(function (o) { return o.value === value; })[0];
    return found ? found.label : value;
  }
  var PIE_COLORS = ['#123A66', '#1E6FD9', '#17C3E0', '#2E9E63', '#C98A1F', '#A8382E', '#8A5C10'];
  function renderPieChart(slices, title) {
    var total = slices.reduce(function (s, x) { return s + x.value; }, 0);
    var cumPct = 0;
    var gradientParts = slices.map(function (s, i) {
      var pct = total > 0 ? (s.value / total * 100) : 0;
      var start = cumPct;
      cumPct += pct;
      return s.color + ' ' + start.toFixed(2) + '% ' + cumPct.toFixed(2) + '%';
    });
    var pieHtml = total > 0
      ? '<div class="pie-chart" style="background: conic-gradient(' + gradientParts.join(', ') + ')"></div>'
      : '<div class="pie-chart pie-chart-empty"></div>';
    var legendHtml = '<div class="pie-legend">' + slices.map(function (s) {
      var pct = total > 0 ? (s.value / total * 100) : 0;
      return '<div class="pie-legend-item"><span class="pie-legend-dot" style="background:' + s.color + '"></span><span class="pie-legend-label">' + esc(s.label) + '</span><span class="pie-legend-value">' + fmt(s.value) + ' บาท (' + pct.toFixed(1) + '%)</span></div>';
    }).join('') + '</div>';
    return '<div class="pie-block"><div class="pie-title">' + esc(title) + '</div><div class="pie-wrap">' + pieHtml + legendHtml + '</div></div>';
  }

  function renderFinancialHealthCheckBox(a, fr) {
    var hc = computeFinancialHealthCheck(a, fr);
    function groupBlock(groups) {
      if (!groups.length) return '<div class="entry-note" style="padding:6px 0">ยังไม่มีรายการ</div>';
      return groups.map(function (g) {
        return '<div class="tacct-cat-block">' +
          '<div class="tacct-cat-row"><span>' + esc(g.label) + '</span><span>' + fmt(g.total) + ' <span class="va-pct">(' + (g.pct * 100).toFixed(1) + '%)</span></span></div>' +
          g.items.map(function (it) { return '<div class="tacct-row tacct-row-sub"><span>' + esc(it.name) + '</span><span>' + fmt(it.value) + ' <span class="va-pct">(' + (it.pct * 100).toFixed(1) + '%)</span></span></div>'; }).join('') +
          '</div>';
      }).join('');
    }
    var bsHtml = '<div class="entry-note" style="text-align:right;padding:0 0 6px">หน่วย: บาท</div><div class="tacct-wrap">' +
      '<div class="tacct-col tacct-left"><div class="tacct-head">สินทรัพย์</div>' + groupBlock(hc.assetGroups) + '<div class="tacct-total">รวม: ' + fmt(fr.netWorthCalc.totalAssets) + ' (100%)</div></div>' +
      '<div class="tacct-col tacct-right"><div class="tacct-head">หนี้สิน + ส่วนของทุน</div>' + groupBlock(hc.liabGroups) +
      '<div class="tacct-row tacct-networth-row"><span>ส่วนของทุน (Net Worth)</span><span>' + fmt(fr.netWorthCalc.netWorth) + ' (' + (hc.netWorthPct * 100).toFixed(1) + '%)</span></div>' +
      '<div class="tacct-total">รวม: ' + fmt(fr.netWorthCalc.totalLiabilities + fr.netWorthCalc.netWorth) + ' (100%)</div></div>' +
      '</div>';

    function cfRows(list) {
      if (!list.length) return '<div class="entry-note" style="padding:6px 0">ยังไม่มีรายการ</div>';
      return list.map(function (row) {
        return '<div class="tacct-row"><span>' + esc(row.name) + '</span><span>' + fmt(row.value) + ' (' + (row.pct * 100).toFixed(1) + '%)</span></div>';
      }).join('');
    }
    var cfHtml = '<div class="entry-note" style="text-align:right;padding:0 0 6px">หน่วย: บาท/เดือน</div><div class="tacct-wrap">' +
      '<div class="tacct-col tacct-left"><div class="tacct-head">รายได้</div>' + cfRows(hc.incomeVertical) + '<div class="tacct-total">รวมรายได้: ' + fmt(fr.cashFlowCalc.totalIncome) + ' (100%)</div></div>' +
      '<div class="tacct-col tacct-right"><div class="tacct-head">ค่าใช้จ่าย</div>' + groupBlock(hc.expenseGroups) +
      '<div class="tacct-total">รวมค่าใช้จ่าย: ' + fmt(fr.cashFlowCalc.totalExpenses + fr.cashFlowCalc.totalDebtPayment) + ' บาท (' + (hc.totalExpensePct * 100).toFixed(1) + '%)</div></div>' +
      '</div>' +
      '<div class="net-cashflow-highlight net-cashflow-' + (fr.cashFlowCalc.netCashFlow >= 0 ? 'positive' : 'negative') + '">' +
      '<div class="net-cashflow-label">' + (fr.cashFlowCalc.netCashFlow >= 0 ? 'เงินคงเหลือสุทธิ/เดือน (นำไปออม ลงทุน หรือใช้เป้าหมายอื่นได้)' : 'ขาดสภาพคล่อง/เดือน') + '</div>' +
      '<div class="net-cashflow-value">' + fmt(Math.abs(fr.cashFlowCalc.netCashFlow)) + ' บาท</div>' +
      '<div class="net-cashflow-pct">(' + (hc.netCashFlowPct * 100).toFixed(1) + '% ของรายได้รวม)</div>' +
      '</div>';

    function ratioBar(rr) {
      var actualPct = Math.min(100, Math.max(0, (rr.value / rr.visualMax) * 100));
      var markerDefs = [];
      if (rr.standardMin != null) markerDefs.push(rr.standardMin);
      if (rr.standardMax != null) markerDefs.push(rr.standardMax);
      var markerHtml = markerDefs.map(function (mVal) {
        var mPos = Math.min(100, (mVal / rr.visualMax) * 100);
        var mLabel = rr.markerIsPercent ? (mVal * 100).toFixed(0) + '%' : mVal + (rr.markerUnit || '');
        return '<div class="ratio-bar-marker" style="left:' + mPos + '%"></div><div class="ratio-bar-marker-label" style="left:' + mPos + '%">' + esc(String(mLabel)) + '</div>';
      }).join('');
      return '<div class="ratio-bar-track">' +
        '<div class="ratio-bar-fill ratio-bar-' + rr.status + '" style="width:' + actualPct + '%"></div>' +
        markerHtml +
        '</div>' +
        '<div class="ratio-bar-legend"><span>0</span><span>มาตรฐาน: ' + esc(rr.standard) + '</span></div>';
    }
    function fraction(numHtml, denHtml, suffix) {
      return '<span class="fraction"><span class="fraction-num">' + numHtml + '</span><span class="fraction-den">' + denHtml + '</span></span>' + (suffix ? ' ' + esc(suffix) : '');
    }
    var ratioCards = hc.ratios.map(function (rr) {
      return '<div class="ratio-card ratio-' + rr.status + '">' +
        '<div class="ratio-label">' + esc(rr.label) + '</div>' +
        '<div class="ratio-formula">สูตร: ' + fraction(esc(rr.formulaNum), esc(rr.formulaDen), rr.formulaSuffix) + '</div>' +
        '<div class="ratio-workingout">วิธีทำ: ' + fraction(esc(rr.workingNum), esc(rr.workingDen), rr.workingSuffix) + ' = ' + esc(rr.workingResult) + '</div>' +
        '<div class="ratio-value">' + rr.display + '</div>' +
        ratioBar(rr) +
        (rr.advice ? '<div class="ratio-advice">' + esc(rr.advice) + '</div>' : '<div class="ratio-advice ratio-advice-ok">✓ อยู่ในเกณฑ์มาตรฐาน</div>') +
        '</div>';
    }).join('');

    /* pie charts: one for the balance sheet (asset composition), one for cash flow (where income goes) */
    var assetPieSlices = hc.assetGroups.map(function (g, i) { return { label: g.label, value: g.total, color: PIE_COLORS[i % PIE_COLORS.length] }; });
    var cfPieSlices = hc.expenseGroups.map(function (g, i) { return { label: g.label, value: g.total, color: PIE_COLORS[i % PIE_COLORS.length] }; });
    if (fr.cashFlowCalc.netCashFlow > 0) cfPieSlices.push({ label: 'เงินคงเหลือสุทธิ (ออม/ลงทุนได้เพิ่ม)', value: fr.cashFlowCalc.netCashFlow, color: PIE_COLORS[cfPieSlices.length % PIE_COLORS.length] });
    var pieHtml = '<div class="pie-grid">' + renderPieChart(assetPieSlices, 'สัดส่วนสินทรัพย์ (งบดุล)') + renderPieChart(cfPieSlices, 'รายได้ถูกใช้ไปทางไหน (งบกระแสเงินสด)') + '</div>';

    var priorityHtml = hc.priorities.length
      ? '<ol class="priority-list">' + hc.priorities.map(function (rr) { return '<li>' + esc(rr.advice) + '</li>'; }).join('') + '</ol>'
      : '<div class="note">ไม่มีจุดที่ต้องปรับปรุงเร่งด่วน ทั้ง 5 อัตราส่วนอยู่ในเกณฑ์ดี</div>';
    var summaryHtml = '<div class="story-block" style="margin-top:16px"><div class="dash-title">สรุปภาพรวมฐานะการเงิน</div><p class="story-text">' + esc(hc.narrative) + '</p></div>' +
      '<div class="subblock"><div class="subblock-title">🎯 ลำดับสิ่งที่ควรทำ (เฉพาะ 5 อัตราส่วนนี้)</div>' + priorityHtml + '</div>';

    return '<div class="subblock" style="margin-top:0"><div class="subblock-title">งบดุล + วิเคราะห์แนวตั้ง (แยกหมวดหลักก่อน แล้วลงรายละเอียดรายการ)</div>' + bsHtml + '</div>' +
      '<div class="subblock"><div class="subblock-title">งบกระแสเงินสด + วิเคราะห์แนวตั้ง (สัดส่วนต่อรายได้รวม)</div>' + cfHtml + '</div>' +
      '<div class="subblock"><div class="subblock-title">วิเคราะห์อัตราส่วนทางการเงินตามหลัก CFP</div>' + pieHtml + '<div class="ratio-grid">' + ratioCards + '</div>' + summaryHtml + '</div>';
  }

  function renderNetWorthSummary(a, fr, r) {
    var nw = fr.netWorthCalc;
    var pvdBalanceToday = (a.pvd.enabled ? (a.pvd.startingBalance || 0) : 0);
    var assetsByCategory = {};
    a.finance.assets.items.forEach(function (it) {
      var cat = categoryLabel(ASSET_MAIN_CATEGORIES, it.mainCategory);
      (assetsByCategory[cat] = assetsByCategory[cat] || []).push(it);
    });
    var assetRows = [];
    Object.keys(assetsByCategory).forEach(function (cat) {
      assetRows.push({ label: cat, amount: null, isHeader: true });
      assetsByCategory[cat].forEach(function (it) { assetRows.push({ label: '　' + it.name, amount: it.value }); });
    });
    if (pvdBalanceToday > 0) assetRows.push({ label: 'กองทุนสำรองเลี้ยงชีพ/กบข. (จากแผนเกษียณ)', amount: pvdBalanceToday });
    var liabByCategory = {};
    a.finance.liabilities.items.forEach(function (it) {
      var cat = categoryLabel(LIABILITY_MAIN_CATEGORIES, it.mainCategory);
      (liabByCategory[cat] = liabByCategory[cat] || []).push(it);
    });
    var liabRows = [];
    Object.keys(liabByCategory).forEach(function (cat) {
      liabRows.push({ label: cat, amount: null, isHeader: true });
      liabByCategory[cat].forEach(function (it) { liabRows.push({ label: '　' + it.name, amount: it.balance }); });
    });
    var totalAssetsWithPvd = nw.totalAssets + pvdBalanceToday;
    var netWorthWithPvd = totalAssetsWithPvd - nw.totalLiabilities;

    function tRows(rows) {
      if (!rows.length) return '<div class="entry-note" style="padding:8px 0">ยังไม่มีรายการ</div>';
      return rows.map(function (row) {
        if (row.isHeader) return '<div class="tacct-cat-header">' + esc(row.label) + '</div>';
        return '<div class="tacct-row"><span>' + esc(row.label) + '</span><span>' + fmt(row.amount) + ' บาท</span></div>';
      }).join('');
    }

    var projCols = [
      { label: 'อีก (ปี)', render: function (row) { return row.years; } },
      { label: 'สินทรัพย์โต', render: function (row) { return fmt(row.assetTotal) + ' บาท'; } },
      { label: 'หนี้สินคงเหลือ', render: function (row) { return fmt(row.liabTotal) + ' บาท'; } },
      { label: 'เงินออมสะสมจากกระแสเงินสดส่วนเกิน', render: function (row) { return fmt(row.surplusFV) + ' บาท'; } },
      { label: 'มูลค่าสุทธิโดยประมาณ', render: function (row) { return fmt(row.netWorth) + ' บาท'; } }
    ];
    return '<div class="tacct-wrap">' +
      '<div class="tacct-col tacct-left"><div class="tacct-head">สินทรัพย์ (Assets)</div>' +
      tRows(assetRows) +
      '<div class="tacct-total">รวมสินทรัพย์: ' + fmt(totalAssetsWithPvd) + ' บาท</div>' +
      '</div>' +
      '<div class="tacct-col tacct-right"><div class="tacct-head">หนี้สิน + ส่วนของทุน (Liabilities + Net Worth)</div>' +
      tRows(liabRows) +
      '<div class="tacct-row tacct-networth-row"><span>ส่วนของทุน (มูลค่าสุทธิ)</span><span>' + fmt(netWorthWithPvd) + ' บาท</span></div>' +
      '<div class="tacct-total">รวมหนี้สิน+ทุน: ' + fmt(nw.totalLiabilities + netWorthWithPvd) + ' บาท</div>' +
      '</div>' +
      '</div>' +
      '<div class="note" style="text-align:center;margin-top:10px">✓ สินทรัพย์รวม = หนี้สินรวม + ส่วนของทุน (ยอดสองด้านเท่ากันตามหลักบัญชี)</div>' +
      (pvdBalanceToday > 0 ? '<div class="entry-note">ยอดกองทุนสำรองฯ ดึงจาก "ยอดสะสมปัจจุบัน" ที่กรอกไว้ในแผนเกษียณ ไม่ต้องกรอกซ้ำที่นี่</div>' : '') +
      '<div class="note" style="margin-top:14px"><strong>คาดการณ์มูลค่าสุทธิในอนาคต:</strong></div>' +
      detailTable(fr.projections, projCols, 'networthproj') +
      '<div class="entry-note">สมมติฐาน: สินทรัพย์แต่ละตัวโตด้วยผลตอบแทนคาดหวังของตัวเอง, หนี้สินลดลงตามค่างวดที่จ่าย, เงินคงเหลือจากกระแสเงินสด (ถ้าเป็นบวก) ถูกออมและลงทุนต่อที่ผลตอบแทน ' + (a.finance.cashFlowSurplusReturn * 100).toFixed(2) + '%/ปี</div>';
  }

  function renderCashFlowSummary(a, fr) {
    var cf = fr.cashFlowCalc;
    return '<div class="grid-2">' +
      metricCard('รายได้รวม/เดือน', fmt(cf.totalIncome) + ' บาท', 'navy') +
      metricCard('ค่าใช้จ่ายรวม/เดือน', fmt(cf.totalExpenses) + ' บาท', 'navy') +
      metricCard('ค่างวดหนี้รวม/เดือน', fmt(cf.totalDebtPayment) + ' บาท', 'navy', 'สัดส่วนหนี้ต่อรายได้ (DTI): ' + (cf.dti * 100).toFixed(1) + '%') +
      metricCard(cf.netCashFlow >= 0 ? 'เงินคงเหลือสุทธิ/เดือน' : 'ขาดสภาพคล่อง/เดือน', fmt(Math.abs(cf.netCashFlow)) + ' บาท', cf.netCashFlow >= 0 ? 'green' : 'red') +
      '</div>';
  }

  function renderPersonal(a, r) {
    var p = a.personal;
    var beRetire = p.currentYearAD + 543 + (p.retireAge - p.currentAge);
    var beLife = p.currentYearAD + 543 + (p.lifeExpectancy - p.currentAge);
    var totalMonthlyIncome = a.finance.income.items.reduce(function (s, it) { return s + incomeMonthlyEquiv(it); }, 0);
    return '<div class="grid-2">' +
      field('ชื่อลูกค้า', ['personal', 'clientName'], p.clientName, { type: 'text' }) +
      field('ปี พ.ศ. ปัจจุบัน', ['personal', 'currentYearADasBE'], p.currentYearAD + 543, {}) +
      field('อายุปัจจุบัน', ['personal', 'currentAge'], p.currentAge, { suffix: 'ปี' }) +
      field('เพศ', ['personal', 'gender'], p.gender, { type: 'select', options: [{ value: '', label: '- เลือก -' }, { value: 'male', label: 'ชาย' }, { value: 'female', label: 'หญิง' }, { value: 'other', label: 'ไม่ระบุ' }] }) +
      field('สถานภาพสมรส', ['personal', 'maritalStatus'], p.maritalStatus, { type: 'select', options: [{ value: '', label: '- เลือก -' }, { value: 'single', label: 'โสด' }, { value: 'married', label: 'สมรส' }, { value: 'divorced', label: 'หย่าร้าง' }, { value: 'widowed', label: 'หม้าย' }] }) +
      field('จำนวนบุตร/ผู้ที่ต้องดูแล', ['personal', 'numChildren'], p.numChildren, {}) +
      field('อาชีพ', ['personal', 'occupation'], p.occupation, { type: 'text' }) +
      field('จังหวัด/ประเทศที่ใช้ชีวิต', ['personal', 'province'], p.province, { type: 'text' }) +
      field('อายุที่คาดว่าจะเกษียณ', ['personal', 'retireAge'], p.retireAge, { suffix: 'ปี', hint: 'จะครบเกษียณปี พ.ศ. ' + beRetire }) +
      field('อายุขัย (คาดการณ์)', ['personal', 'lifeExpectancy'], p.lifeExpectancy, { suffix: 'ปี', hint: 'สิ้นสุดแผนปี พ.ศ. ' + beLife }) +
      '</div>' +
      '<div class="entry-note" style="margin-top:10px">รายได้ปัจจุบัน (' + fmt(totalMonthlyIncome) + ' บาท/เดือน) และอัตราเติบโตของรายได้ ดึงมาจากหัวข้อ "รายได้" ในงบกระแสเงินสดโดยอัตโนมัติ ไม่ต้องกรอกซ้ำที่นี่ — ถ้าต้องการแก้ไข ไปที่หัวข้อรายได้ได้เลย</div>' +
      '<div class="checklist-box" style="margin-top:14px"><div class="checklist-title">สวัสดิการ/สิทธิที่มี <span class="checklist-hint">(ติ๊กแล้วกรอกรายละเอียดด้านล่างนี้ได้เลย — ผลคำนวณจะไปโผล่ที่แท็บ "การคำนวณ")</span></div>' +
      '<div class="checklist-grid">' +
      ['sso', 'pvd', 'severance'].map(function (key) {
        var labels = { sso: 'ประกันสังคม', pvd: 'กองทุนสำรองเลี้ยงชีพ / กบข.', severance: 'เงินชดเชยตามกฎหมายแรงงาน' };
        var val = a[key].enabled;
        var pa = pathAttr([key, 'enabled']);
        return '<label class="checklist-item' + (val ? ' checked' : '') + '"><input type="checkbox" data-path=\'' + pa + '\' data-type="checkbox"' + (val ? ' checked' : '') + '> ' + esc(labels[key]) + '</label>';
      }).join('') +
      '</div>' +
      (a.pvd.enabled || a.sso.enabled
        ? '<div class="subblock"><div class="subblock-title">รายละเอียดกองทุนสำรอง/กบข. และประกันสังคม</div>' + renderPensionInput(a, r) + '</div>'
        : '') +
      '</div>';
  }

  function renderNeedSummary(a, r) {
    var p = a.personal;
    var cards = [];
    var formula;
    if (p.spendingMethod === 'replacement') {
      cards.push(metricCard('เงินเดือนสุดท้ายก่อนเกษียณ (nominal)', fmt(r.salaryAtRetire) + ' บาท', 'navy'));
      cards.push(metricCard('อัตราทดแทนรายได้ที่ใช้', (p.replacementRate * 100).toFixed(2).replace(/\.00$/, '') + '%', 'navy', 'ของเงินเดือนเดือนสุดท้าย'));
      formula = 'วิธีคิด: เงินเดือนปัจจุบัน ' + fmt(p.currentSalary) + ' บาท × (1 + อัตราขึ้นเงินเดือน ' + (p.salaryGrowth * 100).toFixed(2) + '%)<sup>' + r.yearsToRetire + ' ปี</sup> = เงินเดือนสุดท้าย ' + fmt(r.salaryAtRetire) + ' บาท<br>แล้วนำมาคูณอัตราทดแทนรายได้: ' + fmt(r.salaryAtRetire) + ' × ' + (p.replacementRate * 100).toFixed(2).replace(/\.00$/, '') + '% = <strong>' + fmt(r.firstYearMonthlyNeed) + ' บาท/เดือน</strong>';
    } else {
      formula = 'วิธีคิด: ค่าใช้จ่ายที่ต้องการวันนี้ ' + fmt(p.customMonthlyExpense) + ' บาท/เดือน ปรับด้วยเงินเฟ้อ ' + (p.inflation * 100).toFixed(2) + '%/ปี เป็นเวลา ' + r.yearsToRetire + ' ปี จนถึงวันเกษียณ:<br>' + fmt(p.customMonthlyExpense) + ' × (1 + ' + (p.inflation * 100).toFixed(2) + '%)<sup>' + r.yearsToRetire + '</sup> = <strong>' + fmt(r.firstYearMonthlyNeed) + ' บาท/เดือน</strong>';
    }
    cards.push(metricCard('ค่าใช้จ่ายเดือนแรกหลังเกษียณ', fmt(r.firstYearMonthlyNeed) + ' บาท/เดือน', 'green'));
    cards.push(metricCard('ค่าใช้จ่ายทั้งปีแรกหลังเกษียณ', fmt(r.firstYearAnnualNeed) + ' บาท/ปี', 'green'));
    return field('อัตราเงินเฟ้อที่ใช้วางแผน (สมมติฐาน)', ['personal', 'inflation'], p.inflation, { type: 'percent', suffix: '%/ปี' }) +
      '<div class="formula-box">' + formula + '</div><div class="grid-3">' + cards.join('') + '</div>';
  }

  function renderPensionInput(a, r) {
    var pvd = a.pvd, sso = a.sso;
    var tiersTable = entryTable({
      headers: ['อายุงานตั้งแต่ (ปี)', '% นายจ้างสมทบ'],
      colTemplate: '1fr 1fr',
      rows: pvd.employerTiers.map(function (t, i) { return { t: t, idx: i }; }),
      rowCells: function (row) {
        var t = row.t, i = row.idx;
        return [
          rawInput(['pvd', 'employerTiers', i, 'minYears'], t.minYears, {}),
          rawInput(['pvd', 'employerTiers', i, 'employerRate'], t.employerRate, { type: 'percent' })
        ];
      },
      addAction: 'addTier', addLabel: 'เพิ่มขั้น', delAction: 'delTier', emptyMsg: 'ยังไม่มีขั้นบันได'
    });
    return (pvd.enabled ? '<div class="subblock">' +
      '<div class="subblock-title">กองทุนสำรองเลี้ยงชีพ / กบข.</div>' +
      '<div class="grid-2">' +
      field('อายุงานปัจจุบัน (ปี)', ['pvd', 'serviceYearsSoFar'], pvd.serviceYearsSoFar, { suffix: 'ปี' }) +
      field('ยอดสะสมปัจจุบันในกองทุน', ['pvd', 'startingBalance'], pvd.startingBalance, { type: 'money', suffix: 'บาท' }) +
      field('% เงินสะสม (ลูกจ้าง)', ['pvd', 'employeeRate'], pvd.employeeRate, { type: 'percent', suffix: '%' }) +
      field('ผลตอบแทนเฉลี่ยของกองทุน', ['pvd', 'fundReturn'], pvd.fundReturn, { type: 'percent', suffix: '%/ปี' }) +
      '</div>' +
      '<div class="radio-row">' +
      radio('เงินสมทบนายจ้างคงที่ตลอด', ['pvd', 'employerMode'], 'flat', pvd.employerMode) +
      radio('เพิ่มตามอายุงาน/การสะสม (ขั้นบันได)', ['pvd', 'employerMode'], 'tiered', pvd.employerMode) +
      '</div>' +
      (pvd.employerMode === 'flat'
        ? field('% เงินสมทบนายจ้าง', ['pvd', 'employerFlatRate'], pvd.employerFlatRate, { type: 'percent', suffix: '%' })
        : tiersTable) + '</div>' : '') +
      (sso.enabled ? '<div class="subblock">' +
      '<div class="subblock-title">บำนาญชราภาพจากประกันสังคม</div>' +
      '<div class="grid-2">' +
        field('จำนวนเดือนที่ส่งเงินสมทบมาแล้ว', ['sso', 'monthsPaidSoFar'], sso.monthsPaidSoFar, { suffix: 'เดือน', hint: 'ต้องส่งสมทบครบ 180 เดือนจึงมีสิทธิรับบำนาญ' }) + '</div>' +
        '<div class="entry-note" style="margin-top:8px">ค่าจ้างเฉลี่ย 60 เดือนสุดท้าย (ฐานคำนวณบำนาญ) คำนวณอัตโนมัติจากรายได้ปัจจุบันที่กรอกไว้ ครอบเพดานสูงสุด 15,000 บาท/เดือนตามเกณฑ์ประกันสังคม = <strong>' + fmt(r.ssoAvgWageCapped) + ' บาท/เดือน</strong> — ไม่ต้องกรอกซ้ำ ถ้าต้องการแก้ไข ไปที่หัวข้อ "รายได้" ได้เลย</div>' +
      '</div>' : '') +
      '<div class="entry-note" style="margin-top:8px">บำนาญประกันชีวิตหรือเงินรายงวดอื่นๆ ให้ไปเพิ่มที่หัวข้อ "เงินก้อน/เงินได้ระหว่างทาง" แบบรายงวด — ระบบจะรวมให้อัตโนมัติ ผลการคำนวณดูได้ในแท็บ "การคำนวณ"</div>';
  }

  function renderPensionCalc(a, r) {
    var pvd = a.pvd, sso = a.sso;
    var html = '';
    if (pvd.enabled) {
      html += '<div class="subblock"><div class="subblock-title">กองทุนสำรองเลี้ยงชีพ / กบข.</div>' +
        '<div class="formula-box">วิธีคิด: เริ่มจากยอดยกมา ' + fmt(pvd.startingBalance) + ' บาท ทุกปีนำ "เงินเดือนปีนั้น × (% ลูกจ้าง + % นายจ้าง)" มาบวกเข้ากองทุน แล้วให้ทั้งกองทุนโตด้วยผลตอบแทน ' + (pvd.fundReturn * 100).toFixed(2) + '%/ปี ทบต้นไปเรื่อยๆ จนถึงปีที่เกษียณ = <strong>' + fmt(r.pvdResult.finalBalance) + ' บาท</strong></div>' +
        metricCard('ยอดสะสมกองทุนโดยประมาณ ณ วันเกษียณ', fmt(r.pvdResult.finalBalance) + ' บาท', 'green') +
        detailTable(r.pvdResult.path, [
          { label: 'ปีที่', render: function (row) { return row.year; } },
          { label: 'อายุ', render: function (row) { return row.age; } },
          { label: 'ยอดยกมา (ต้นปี)', render: function (row) { return fmt(row.startBalance); } },
          { label: 'เงินเดือน/ปี', render: function (row) { return fmt(row.salaryAnnual); } },
          { label: '% นายจ้าง', render: function (row) { return (row.employerRate * 100).toFixed(2) + '%'; } },
          { label: 'สมทบลูกจ้าง', render: function (row) { return fmt(row.employeeContrib); } },
          { label: 'สมทบนายจ้าง', render: function (row) { return fmt(row.employerContrib); } },
          { label: 'อัตราผลตอบแทนที่ใช้', render: function () { return (pvd.fundReturn * 100).toFixed(2) + '%'; } },
          { label: 'ดอกเบี้ยที่ได้ปีนั้น', render: function (row) { return fmt(row.interestEarned); } },
          { label: 'ยอดสะสมปลายปี', render: function (row) { return fmt(row.balance); } }
        ], 'pvd') + '</div>';
    }
    if (sso.enabled) {
      var yrsPaid = r.ssoYearsPaid;
      var ssoFormula;
      if (yrsPaid >= 15) {
        var extraYrs = yrsPaid - 15;
        ssoFormula = 'วิธีคิด (ตามกฎหมายประกันสังคม): ส่งเงินสมทบมาแล้ว ' + r.ssoMonthsAtRetirement + ' เดือน (' + yrsPaid.toFixed(1) + ' ปี) ครบ 15 ปีขึ้นไป จึงได้รับ:<br>' +
          '&bull; <strong>20%</strong> ของค่าจ้างเฉลี่ย — เป็นสิทธิพื้นฐานตามกฎหมายเมื่อส่งสมทบครบ 180 เดือน (15 ปี)<br>' +
          '&bull; <strong>+ 1.5% ต่อปี</strong> ของทุกปีที่ส่งเกิน 15 ปี — ตอนนี้ส่งเกินมา ' + extraYrs.toFixed(1) + ' ปี จึงได้เพิ่ม ' + extraYrs.toFixed(1) + ' × 1.5% = ' + (extraYrs * 1.5).toFixed(2) + '%<br>' +
          'รวม: 20% + ' + (extraYrs * 1.5).toFixed(2) + '% = <strong>' + r.ssoPct.toFixed(2) + '%</strong> ของค่าจ้างเฉลี่ย ' + fmt(r.ssoAvgWageCapped) + ' บาท = <strong>' + fmt(r.ssoMonthly) + ' บาท/เดือน</strong>';
      } else {
        ssoFormula = 'วิธีคิด: ต้องส่งเงินสมทบครบ 180 เดือน (15 ปี) จึงจะมีสิทธิรับบำนาญ — ตอนนี้ส่งมาแล้ว ' + r.ssoMonthsAtRetirement + ' เดือน (' + yrsPaid.toFixed(1) + ' ปี) ยังไม่ครบเงื่อนไข จึงคำนวณได้ 0 บาท';
      }
      html += '<div class="subblock"><div class="subblock-title">บำนาญชราภาพประกันสังคม</div>' +
        '<div class="formula-box">' + ssoFormula + '</div>' +
        (r.ssoMonthly > 0
          ? metricCard('บำนาญชราภาพที่จะได้รับ', fmt(r.ssoMonthly) + ' บาท/เดือน', 'green', 'รับตั้งแต่อายุ ' + a.personal.retireAge + ' ปีไปตลอดชีพ')
          : '<div class="note" style="color:#A8382E">ยังไม่เข้าเงื่อนไข (ต้องส่งสมทบครบ 180 เดือน ณ วันเกษียณ) — ตอนนี้คำนวณได้ 0 บาท</div>') + '</div>';
    }
    if (!pvd.enabled && !sso.enabled) html = '<div class="note">ยังไม่ได้เปิดใช้งานกองทุนสำรอง/ประกันสังคม ในแท็บ "ข้อมูลลูกค้า" หัวข้อ 2</div>';
    return html;
  }

  function renderSeverance(r) {
    if (!r.severance) return '<div class="note">ยังไม่ได้เปิดใช้งาน (เปิดได้ในแท็บ "ข้อมูลลูกค้า" หัวข้อ 2)</div>';
    var s = r.severance;
    var tierNote;
    var yrs = s.serviceYears;
    if (yrs >= 20) tierNote = 'อายุงาน ' + yrs.toFixed(1) + ' ปี ≥ 20 ปี → ได้รับสูงสุด 400 วัน (13.33 เท่าของเงินเดือน)';
    else if (yrs >= 10) tierNote = 'อายุงาน ' + yrs.toFixed(1) + ' ปี อยู่ในช่วง 10-20 ปี → ได้รับ 300 วัน (10 เท่าของเงินเดือน)';
    else if (yrs >= 6) tierNote = 'อายุงาน ' + yrs.toFixed(1) + ' ปี อยู่ในช่วง 6-10 ปี → ได้รับ 240 วัน (8 เท่าของเงินเดือน)';
    else if (yrs >= 3) tierNote = 'อายุงาน ' + yrs.toFixed(1) + ' ปี อยู่ในช่วง 3-6 ปี → ได้รับ 180 วัน (6 เท่าของเงินเดือน)';
    else if (yrs >= 1) tierNote = 'อายุงาน ' + yrs.toFixed(1) + ' ปี อยู่ในช่วง 1-3 ปี → ได้รับ 90 วัน (3 เท่าของเงินเดือน)';
    else tierNote = 'อายุงาน ' + yrs.toFixed(1) + ' ปี (120 วัน - 1 ปี) → ได้รับ 30 วัน (1 เท่าของเงินเดือน)';
    return '<div class="formula-box">วิธีคิด (ไม่ใช่สูตร TVM แต่เป็นสิทธิตามกฎหมายคุ้มครองแรงงาน ตามอายุงาน ณ วันเกษียณ):<br>' + tierNote + '<br>เงินชดเชย = เงินเดือนสุดท้าย ' + fmt(r.salaryAtRetire) + ' บาท × ' + s.months.toFixed(2) + ' เท่า = <strong>' + fmt(s.amount) + ' บาท</strong></div>' +
      '<div class="grid-3">' +
      metricCard('อายุงานรวม ณ วันเกษียณ', s.serviceYears.toFixed(1) + ' ปี') +
      metricCard('สิทธิเงินชดเชย', s.months.toFixed(2) + ' เท่าของเงินเดือน') +
      metricCard('จำนวนเงินชดเชยโดยประมาณ', fmt(s.amount) + ' บาท', 'green') + '</div>' +
      detailTable([{ svcYears: s.serviceYears, months: s.months, salary: r.salaryAtRetire, amount: s.amount }], [
        { label: 'อายุงานรวม', render: function (row) { return row.svcYears.toFixed(1) + ' ปี'; } },
        { label: 'สิทธิตามกฎหมาย (ตารางวัน)', render: function (row) { return row.months.toFixed(2) + ' เท่าของเงินเดือน'; } },
        { label: 'เงินเดือนสุดท้าย (nominal)', render: function (row) { return fmt(row.salary) + ' บาท'; } },
        { label: '= เงินชดเชย', render: function (row) { return fmt(row.amount) + ' บาท'; } }
      ], 'severance');
  }

  function goalPhaseLabel(g, retireAge) {
    if (g.endAge < retireAge) return 'ก่อนเกษียณ';
    if (g.startAge >= retireAge) return 'หลังเกษียณ';
    return 'คาบเกี่ยว';
  }
  function pmtMonthlyForGoal(target, annualRate, years) {
    var r = annualRate / 12, n = years * 12;
    if (n <= 0) return 0; if (r === 0) return target / n;
    return target * r / (Math.pow(1 + r, n) - 1);
  }
  function renderGoals(a) {
    var p = a.personal;
    var spendingBlock = '<div class="subblock" style="margin-top:0"><div class="subblock-title">ต้องการใช้เงินหลังเกษียณแบบไหน</div>' +
      '<div class="radio-row">' +
      radio('Replacement Ratio จากเงินเดือนเดือนสุดท้าย', ['personal', 'spendingMethod'], 'replacement', p.spendingMethod) +
      radio('กำหนดเอง (มูลค่าเงินวันนี้)', ['personal', 'spendingMethod'], 'custom', p.spendingMethod) +
      '</div>' +
      (p.spendingMethod === 'replacement'
        ? field('อัตราทดแทนรายได้ (Replacement Ratio)', ['personal', 'replacementRate'], p.replacementRate, { type: 'percent', suffix: '% ของเงินเดือนเดือนสุดท้าย' })
        : field('ค่าใช้จ่ายที่ต้องการต่อเดือน (ราคาวันนี้)', ['personal', 'customMonthlyExpense'], p.customMonthlyExpense, { type: 'money', suffix: 'บาท/เดือน' })) +
      '</div>' +
      '<div class="subblock-title">เป้าหมายเกษียณ (รายการที่กระทบกองทุนเกษียณโดยตรง)</div>';
    var table = entryTable({
      headers: ['ชื่อเป้าหมาย', 'อายุเริ่ม', 'อายุสิ้นสุด', 'จำนวนเงิน/ปี (วันนี้)', 'ผลตอบแทน/ปี (ถ้าก่อนเกษียณ)'],
      colTemplate: '1.4fr 0.9fr 0.9fr 1.2fr 1.3fr',
      rows: a.goals.map(function (g, i) { return { g: g, idx: i }; }),
      rowCells: function (row) {
        var g = row.g, i = row.idx;
        var isPre = g.endAge < p.retireAge;
        return [
          rawInput(['goals', i, 'name'], g.name, { type: 'text' }),
          rawInput(['goals', i, 'startAge'], g.startAge, {}),
          rawInput(['goals', i, 'endAge'], g.endAge, {}),
          rawInput(['goals', i, 'amountToday'], g.amountToday, { type: 'money' }),
          isPre ? rawInput(['goals', i, 'returnRate'], g.returnRate, { type: 'percent' }) : '<span class="entry-note">-</span>'
        ];
      },
      addAction: 'addGoalLumpsum', addLabel: 'เพิ่มเป้าหมาย', delAction: 'delGoal',
      emptyMsg: 'เช่น "ซื้อบ้านตอนอายุ 40 มูลค่าวันนี้ 1,000,000 บาท" (อายุเริ่ม=สิ้นสุด=40) หรือค่าใช้จ่ายต่อเนื่องหลายปี — กด + เพิ่มเป้าหมาย ด้านล่าง'
    });
    return spendingBlock + '<div class="entry-note" style="padding:0 0 4px">ถ้าเป็นเป้าหมายครั้งเดียว ใส่อายุเริ่ม=อายุสิ้นสุดเท่ากัน (เช่น 40=40) — ถ้าเป็นค่าใช้จ่ายต่อเนื่องหลายปี ใส่ช่วงอายุ และ "จำนวนเงิน" จะถือเป็นยอดต่อปี ระบบจะแยกก่อน/หลังเกษียณให้อัตโนมัติจากอายุที่ใส่ เป้าหมายส่วนที่อยู่หลังเกษียณจะถูกหักออกจากเงินลงทุนหลังเกษียณให้อัตโนมัติ ผลคำนวณดูได้ที่แท็บ "การคำนวณ"</div>' + table;
  }


  function renderSavingsCalc(a, r) {
    var portfolio = a.preRetirementPortfolio;
    var segHtml = portfolio.segments.map(function (s, i) {
      return '<div class="tier-row">' +
        field('อายุตั้งแต่', ['preRetirementPortfolio', 'segments', i, 'fromAge'], s.fromAge, {}) +
        field('ถึงอายุ (ไม่รวม)', ['preRetirementPortfolio', 'segments', i, 'toAge'], s.toAge, {}) +
        field('ผลตอบแทนช่วงนี้', ['preRetirementPortfolio', 'segments', i, 'returnRate'], s.returnRate, { type: 'percent' }) +
        '<button class="btn-icon" type="button" data-action="delSegment" data-index="' + i + '">×</button></div>';
    }).join('');
    var portfolioBlock = '<div class="subblock"><div class="subblock-title">พอร์ตการลงทุนก่อนเกษียณ (ใช้เปรียบเทียบ "ถ้าย้ายไปพอร์ตตามแผน" ด้านล่าง และเงินก้อนที่เข้ามาก่อนเกษียณ)</div>' +
      '<div class="radio-row">' +
      radio('อัตราเดียวตลอดจนเกษียณ', ['preRetirementPortfolio', 'mode'], 'flat', portfolio.mode) +
      radio('ปรับพอร์ตหลายช่วง (Glide Path)', ['preRetirementPortfolio', 'mode'], 'glide', portfolio.mode) +
      '</div>' +
      (portfolio.mode === 'flat'
        ? field('อัตราผลตอบแทนก่อนเกษียณ', ['preRetirementPortfolio', 'flatReturn'], portfolio.flatReturn, { type: 'percent', suffix: '%/ปี' })
        : '<div class="tier-table">' + segHtml + '<button class="btn btn-add-row btn-sm" type="button" data-action="addSegment">+ เพิ่มช่วงอายุ</button></div>') +
      '</div>';
    var itemCols = [
      { label: 'รายการ', render: function (row) { return esc(row.name); } },
      { label: 'จำนวนเงินวันนี้', render: function (row) { return fmt(row.amount); } },
      { label: 'ผลตอบแทน/ปี', render: function (row) { return (row.returnRate * 100).toFixed(2) + '%'; } },
      { label: 'มูลค่า ณ วันเกษียณ', render: function (row) { return fmt(row.fv); } }
    ];
    var regCols = [
      { label: 'ความถี่', render: function (row) { return row.frequency === 'monthly' ? 'รายเดือน' : 'รายปี'; } },
      { label: 'จำนวนเงิน/งวด', render: function (row) { return fmt(row.amount); } },
      { label: 'ผลตอบแทน/ปี', render: function (row) { return (row.returnRate * 100).toFixed(2) + '%'; } },
      { label: 'มูลค่า ณ วันเกษียณ', render: function (row) { return fmt(row.fv); } }
    ];
    var pathCols = [
      { label: 'ปีที่', render: function (row) { return row.year; } },
      { label: 'พ.ศ.', render: function (row) { return row.beYear; } },
      { label: 'อายุ', render: function (row) { return row.age; } },
      { label: 'มูลค่าสะสม', render: function (row) { return fmt(row.balance); } }
    ];
    var regPathCols = [
      { label: 'ปีที่', render: function (row) { return row.year; } },
      { label: 'พ.ศ.', render: function (row) { return row.beYear; } },
      { label: 'อายุ', render: function (row) { return row.age; } },
      { label: 'เงินสมทบปีนั้น', render: function (row) { return row.contribution > 0 ? fmt(row.contribution) : '-'; } },
      { label: 'มูลค่าสะสม', render: function (row) { return fmt(row.balance); } }
    ];
    var currentBlocks = (r.currentItems || []).map(function (it) {
      return '<div class="formula-box">' + esc(it.name) + ' — วิธีคิด (สูตร FV เงินก้อนเดียว): ' + fmt(it.amount) + ' × (1 + ' + (it.returnRate * 100).toFixed(2) + '%)<sup>' + r.yearsToRetire + ' ปี</sup> = <strong>' + fmt(it.fv) + ' บาท</strong></div>' +
        detailTable(it.path, pathCols, 'item' + it.id);
    }).join('');
    var regularBlocks = (r.regularItems || []).map(function (it) {
      var dueLabel = it.timing === 'begin' ? 'ต้นงวด' : 'ปลายงวด';
      return '<div class="formula-box">รายการออม' + (it.frequency === 'monthly' ? 'รายเดือน' : 'รายปี') + ' ' + fmt(it.amount) + ' บาท (' + dueLabel + ') — วิธีคิด (สูตร FV เงินออมสม่ำเสมอ/Annuity): เงินสมทบปีละ ' + fmt(it.annualAmt) + ' บาท ที่ผลตอบแทน ' + (it.returnRate * 100).toFixed(2) + '%/ปี เป็นเวลา ' + r.yearsToRetire + ' ปี = <strong>' + fmt(it.fv) + ' บาท</strong></div>' +
        detailTable(it.path, regPathCols, 'regitem' + it.id);
    }).join('');
    return portfolioBlock +
      '<div class="subblock"><div class="subblock-title">เงินออม/เงินลงทุนปัจจุบัน</div>' +
      '<div class="grid-2">' +
      metricCard('รวมมูลค่า ณ วันเกษียณ (คงพอร์ตเดิมแต่ละตัว)', fmt(r.currentSavingsFV_asis) + ' บาท', 'navy') +
      metricCard('ถ้าย้ายทั้งหมดไปพอร์ตตามแผน (ข้อ 1)', fmt(r.currentSavingsFV_ifPlanned) + ' บาท', 'green', 'ใช้อัตราผลตอบแทนพอร์ตก่อนเกษียณที่ตั้งค่าไว้') +
      '</div>' +
      detailTable(r.currentItems, itemCols, 'currentsavingscalc') +
      currentBlocks + '</div>' +
      '<div class="subblock"><div class="subblock-title">เงินออมประจำ</div>' +
      metricCard('มูลค่ารวม ณ วันเกษียณ (เงินออมประจำ)', fmt(r.savingsRegularFV) + ' บาท', 'green') +
      detailTable(r.regularItems, regCols, 'regularsavingscalc') +
      regularBlocks + '</div>';
  }

  function renderWindfalls(a) {
    var p = a.personal;
    var lumpRows = [], recurRows = [];
    a.windfalls.forEach(function (w, i) { (w.flowType === 'recurring' ? recurRows : lumpRows).push({ w: w, idx: i }); });

    function phaseNote(startAge, endAge) {
      if ((endAge != null ? endAge : startAge) < p.retireAge) return 'ก่อนเกษียณ';
      if (startAge >= p.retireAge) return 'หลังเกษียณ';
      return 'คาบเกี่ยว';
    }

    var lumpTable = entryTable({
      headers: ['รายการ', 'อายุที่ได้รับ', 'จำนวนเงิน (ณ ปีที่ได้รับ)'],
      colTemplate: '1.6fr 0.9fr 1.3fr',
      rows: lumpRows,
      rowCells: function (row) {
        var w = row.w, i = row.idx;
        return [
          rawInput(['windfalls', i, 'description'], w.description, { type: 'text' }),
          rawInput(['windfalls', i, 'ageReceived'], w.ageReceived, {}),
          rawInput(['windfalls', i, 'amount'], w.amount, { type: 'money' })
        ];
      },
      addAction: 'addWindfallLump', addLabel: 'เพิ่มเงินก้อน (เข้าครั้งเดียว)', delAction: 'delWindfall',
      emptyMsg: 'เช่น เงินครบสัญญาประกันชีวิต, เงินจากการขายสินทรัพย์ ฯลฯ'
    });

    var recurTable = entryTable({
      headers: ['รายการ', 'ความถี่', 'จำนวนเงิน/งวด', 'เริ่มรับอายุ', 'รับถึงอายุ', 'อัตราการเพิ่ม (%)', 'ความถี่ปรับเพิ่ม'],
      colTemplate: '1.2fr 0.8fr 1fr 0.8fr 0.8fr 0.9fr 1fr',
      rows: recurRows,
      rowCells: function (row) {
        var w = row.w, i = row.idx;
        return [
          rawInput(['windfalls', i, 'description'], w.description, { type: 'text' }),
          rawInput(['windfalls', i, 'frequency'], w.frequency, { type: 'select', options: [{ value: 'monthly', label: 'รายเดือน' }, { value: 'annual', label: 'รายปี' }] }),
          rawInput(['windfalls', i, 'amountPerPeriod'], w.amountPerPeriod, { type: 'money' }),
          rawInput(['windfalls', i, 'startAge'], w.startAge, {}),
          rawInput(['windfalls', i, 'endAge'], w.endAge, {}),
          rawInput(['windfalls', i, 'growthRate'], w.growthRate, { type: 'percent' }),
          rawInput(['windfalls', i, 'growthFrequency'], w.growthFrequency, { type: 'select', options: [{ value: 'annual', label: 'ทุกปี' }, { value: 'every2years', label: 'ทุก 2 ปี' }, { value: 'every3years', label: 'ทุก 3 ปี' }, { value: 'every5years', label: 'ทุก 5 ปี' }] })
        ];
      },
      addAction: 'addWindfallRecurring', addLabel: 'เพิ่มเงินรายงวด', delAction: 'delWindfall',
      emptyMsg: 'เช่น เงินปันผลกองทุน, ค่าเช่า, บำนาญพิเศษ (รวมถึงบำนาญประกันชีวิต) ที่ได้รับเป็นงวดๆ'
    });

    return '<div class="subblock-title" style="margin-top:0">เงินก้อน (เข้าครั้งเดียว)</div>' + lumpTable +
      '<div class="subblock"><div class="subblock-title">เงินรายงวด</div>' + recurTable + '</div>' +
      '<div class="entry-note" style="padding:8px 0 0">ระบบแยกก่อน/หลังเกษียณให้อัตโนมัติจากอายุที่ใส่ — เงินที่เข้ามาก่อนเกษียณจะถูกลงทุนต่อตามพอร์ตก่อนเกษียณ (ข้อ 1) โดยอัตโนมัติ</div>';
  }

  function renderHealthInsuranceInput(a, r) {
    var hi = a.healthInsurance;
    var bandsTable = entryTable({
      headers: ['อายุตั้งแต่', 'อายุถึง', 'เบี้ยประกัน/ปี (จ่ายจริงเท่านี้ทุกปีในช่วงนี้)'],
      colTemplate: '0.8fr 0.8fr 1.3fr',
      rows: hi.bands.map(function (b, i) { return { b: b, idx: i }; }),
      rowCells: function (row) {
        var b = row.b, i = row.idx;
        return [
          rawInput(['healthInsurance', 'bands', i, 'fromAge'], b.fromAge, {}),
          rawInput(['healthInsurance', 'bands', i, 'toAge'], b.toAge, {}),
          rawInput(['healthInsurance', 'bands', i, 'annualPremiumToday'], b.annualPremiumToday, { type: 'money' })
        ];
      },
      addAction: 'addHealthBand', addLabel: 'เพิ่มช่วงอายุ/เบี้ยประกัน', delAction: 'delHealthBand',
      emptyMsg: 'เช่น อายุ 61-65 จ่ายเบี้ยปีละ 30,000 บาท (คงที่ทุกปีในช่วงนี้), อายุ 66-70 จ่ายปีละ 45,000 บาท'
    });
    return '<div class="entry-note" style="padding:0 0 4px">ระบุช่วงอายุและ "จำนวนเบี้ยที่ต้องจ่ายจริง" ในแต่ละช่วง (ไม่ต้องปรับเงินเฟ้อเอง ใส่ตัวเลขที่จะจ่ายจริงในปีนั้นๆ ได้เลย) เพิ่มช่วงใหม่จะต่อจากช่วงล่าสุดให้อัตโนมัติ แก้ไขเองได้ — คำนวณโดยใช้อัตราผลตอบแทนของบัคเก็ตที่ดูแลช่วงอายุนั้นๆ โดยอัตโนมัติ (ตั้งค่าบัคเก็ตได้ในแท็บ "การคำนวณ" หัวข้อ 13) ผลการคำนวณดูได้ในแท็บ "การคำนวณ"</div>' +
      bandsTable;
  }

  function renderHealthInsuranceCalc(a, r) {
    var bandCols = [
      { label: 'ช่วงอายุ', render: function (row) { return row.fromAge + '-' + row.toAge + ' ปี'; } },
      { label: 'เบี้ย/ปี', render: function (row) { return fmt(row.annualPremiumToday) + ' บาท'; } },
      { label: 'ดูแลโดยบัคเก็ต', render: function (row) { return esc(row.bucketLabel); } },
      { label: 'อัตราที่ใช้ (ของบัคเก็ตนั้น)', render: function (row) { return (row.bandRate * 100).toFixed(2) + '%'; } },
      { label: 'มูลค่า ณ วันนี้ (PV)', render: function (row) { return fmt(row.pvToday) + ' บาท'; } }
    ];
    var yearCols = [
      { label: 'ปีที่', render: function (row) { return row.year; } },
      { label: 'พ.ศ.', render: function (row) { return row.beYear; } },
      { label: 'อายุ', render: function (row) { return row.age; } },
      { label: 'ช่วง', render: function (row) { return row.phase; } },
      { label: 'อัตราที่ใช้', render: function (row) { return row.rateUsed != null ? (row.rateUsed * 100).toFixed(2) + '%' : '-'; } },
      { label: 'เบี้ยที่ต้องจ่ายปีนั้น', render: function (row) { return row.premiumDue > 0 ? fmt(row.premiumDue) : '-'; } }
    ];
    if (!a.healthInsurance.bands.length) return '<div class="note">ยังไม่ได้ระบุช่วงอายุ/เบี้ยประกันสุขภาพ ในแท็บ "ข้อมูลลูกค้า" หัวข้อ 6</div>';
    return '<div class="entry-note" style="padding:0 0 10px">วิธีคิด: ไม่มีอัตราดอกเบี้ยแยกต่างหากสำหรับเบี้ยประกันสุขภาพ — แต่ละช่วงอายุจะอ้างอิงอัตราผลตอบแทนของ "บัคเก็ต" ที่ดูแลช่วงอายุนั้นในแผนการบริหารเงินหลังเกษียณ (หัวข้อ 13) โดยตรง เพื่อให้ตัวเลขตรงกับแผนจริงเสมอ ถ้าใช้พอร์ตเดียวตลอดก็จะใช้อัตราของพอร์ตนั้นทั้งหมด ถ้าแบ่งบัคเก็ตก็จะสลับอัตราไปตามช่วงที่เบี้ยตกอยู่</div>' +
      metricCard('มูลค่ารวมของภาระเบี้ยทั้งหมด (PV ณ วันนี้)', fmt(r.healthRequiredToday) + ' บาท', 'navy', 'ยอดนี้ถูกรวมอยู่ในกองทุนที่ต้องมี (ข้อ 12) แล้ว ไม่ต้องเตรียมแยกอีกก้อน') +
      detailTable(r.healthBandsCalc, bandCols, 'healthbands') +
      detailTable(r.healthYearTable, yearCols, 'health') +
      '<div class="entry-note"><strong>หมายเหตุ:</strong> คำนวณแบบ "ต้นงวด" คือหักเบี้ยตอนต้นปีของแต่ละช่วง — เบี้ยในช่วงหลังเกษียณถูกหักออกจากเงินลงทุนหลังเกษียณ (ข้อ 12-13) โดยอัตโนมัติแล้ว ตารางนี้เป็นการแจกแจงรายละเอียดเพื่อความโปร่งใส ไม่ใช่กองทุนแยกต่างหาก</div>';
  }

  function calcDetail(html) {
    return '<details class="calc-detail"><summary>ดูวิธีคำนวณ (TVM)</summary><div class="calc-detail-body">' + html + '</div></details>';
  }
  /* Render a calculation as standard TVM line-item notation: given values, formula, then the worked substitution */
  function tvmBlock(formula, givens, result) {
    return '<div class="tvm-line"><strong>สูตร:</strong> ' + formula + '</div>' +
      '<div class="tvm-line"><strong>กำหนดให้:</strong> ' + givens + '</div>' +
      '<div class="tvm-line"><strong>คำนวณ:</strong> ' + result + '</div>';
  }
  function tvmCompound(pv, i, n, fv, pvLabel, fvLabel) {
    return tvmBlock('FV = PV × (1+i)<sup>n</sup>',
      'PV = ' + fmt(pv) + ' บาท (' + (pvLabel || '') + '), i = ' + (i * 100).toFixed(1) + '%, n = ' + n + ' ปี',
      'FV = ' + fmt(pv) + ' × (1+' + (i * 100).toFixed(1) + '%)<sup>' + n + '</sup> = <strong>' + fmt(fv) + ' บาท</strong>' + (fvLabel ? ' (' + fvLabel + ')' : ''));
  }
  function tvmDiscount(fv, i, n, pv, fvLabel, pvLabel) {
    return tvmBlock('PV = FV ÷ (1+i)<sup>n</sup>',
      'FV = ' + fmt(fv) + ' บาท (' + (fvLabel || '') + '), i = ' + (i * 100).toFixed(1) + '%, n = ' + n + ' ปี',
      'PV = ' + fmt(fv) + ' ÷ (1+' + (i * 100).toFixed(1) + '%)<sup>' + n + '</sup> = <strong>' + fmt(pv) + ' บาท</strong>' + (pvLabel ? ' (' + pvLabel + ')' : ''));
  }
  function tvmGrowingAnnuityPV(pmt1, i, g, n, pv) {
    return tvmBlock('PV = PMT × [1 − ((1+g)/(1+i))<sup>n</sup>] ÷ (i − g)',
      'PMT (งวดแรก) = ' + fmt(pmt1) + ' บาท, i = ' + (i * 100).toFixed(1) + '%, g (เงินเฟ้อ) = ' + (g * 100).toFixed(1) + '%, n = ' + n + ' งวด',
      'PV = <strong>' + fmt(pv) + ' บาท</strong>');
  }
  function tvmPMT(pv, i, n, pmt, pvLabel) {
    return tvmBlock('PMT = PV × i ÷ [1 − (1+i)<sup>−n</sup>]',
      'PV = ' + fmt(pv) + ' บาท (' + (pvLabel || '') + '), i = ' + (i * 100).toFixed(1) + '%/ปี ÷ 12 ต่อเดือน, n = ' + n + ' ปี',
      'PMT = <strong>' + fmt(pmt) + ' บาท/เดือน</strong>');
  }
  function calcRow(label, amount, detailHtml, note) {
    return '<div class="calc-row"><div class="calc-row-label">' + esc(label) + (note ? '<div class="entry-note" style="margin-top:2px">' + esc(note) + '</div>' : '') + (detailHtml ? calcDetail(detailHtml) : '') + '</div><div class="calc-row-amount">' + fmt(amount) + ' บาท</div></div>';
  }
  /* TVM: bring an amount valued at some age to its equivalent value at retirement age —
     compounds forward (pre-retirement rate) if that age is before retirement, discounts back (post-retirement rate) if after */
  function valueAtRetirement(amount, atAge, retireAge, ratePre, ratePost) {
    if (atAge <= retireAge) return amount * Math.pow(1 + ratePre, retireAge - atAge);
    return amount / Math.pow(1 + ratePost, atAge - retireAge);
  }
  function renderCalcRatesBox(a) {
    var asmp = a.assumptions;
    return '<div class="entry-note" style="margin-bottom:10px">อัตราเหล่านี้เป็นหลัก TVM (Time Value of Money) ที่ใช้แปลงมูลค่าเงินทุกรายการในแท็บนี้ให้อยู่บนฐานเวลาเดียวกัน (มูลค่า ณ วันเกษียณ) แก้ที่นี่จุดเดียว มีผลกับทุกกล่องด้านล่าง</div>' +
      '<div class="grid-2">' +
      field('เงินเฟ้อ ก่อนเกษียณ', ['assumptions', 'inflationPreRetire'], asmp.inflationPreRetire, { type: 'percent', suffix: '%/ปี' }) +
      field('เงินเฟ้อ หลังเกษียณ', ['assumptions', 'inflationPostRetire'], asmp.inflationPostRetire, { type: 'percent', suffix: '%/ปี' }) +
      field('ผลตอบแทน ก่อนเกษียณ', ['assumptions', 'returnPreRetire'], asmp.returnPreRetire, { type: 'percent', suffix: '%/ปี' }) +
      field('ผลตอบแทน หลังเกษียณ', ['assumptions', 'returnPostRetire'], asmp.returnPostRetire, { type: 'percent', suffix: '%/ปี' }) +
      '</div>' +
      '<div class="entry-note" style="margin-top:6px">เงินเฟ้อการศึกษา และผลตอบแทนของพอร์ตแต่ละระดับความเสี่ยง ยังแก้ได้ที่แท็บ "สมมติฐาน" เช่นเดิม</div>';
  }

  function goalsAtRetirementPV(a) {
    var p = a.personal, asmp = a.assumptions;
    var rows = (a.goals || []).map(function (g, i) {
      var isPost = g.startAge >= p.retireAge;
      var infl = isPost ? asmp.inflationPostRetire : asmp.inflationPreRetire;
      var ret = isPost ? asmp.returnPostRetire : asmp.returnPreRetire;
      var fromAge = Math.max(g.startAge, p.retireAge);
      var pvAtRetirement = 0, totalInflated = 0;
      for (var age = g.startAge; age <= g.endAge; age++) {
        var amt = g.amountToday * Math.pow(1 + infl, age - p.currentAge);
        totalInflated += amt;
        if (age >= fromAge) pvAtRetirement += amt / Math.pow(1 + ret, age - p.retireAge);
        else pvAtRetirement += amt * Math.pow(1 + ret, p.retireAge - age);
      }
      return { n: i + 1, name: g.name, startAge: g.startAge, endAge: g.endAge, amountToday: g.amountToday, totalInflated: totalInflated, pv: pvAtRetirement, rateUsed: ret, inflUsed: infl };
    });
    return { rows: rows, total: rows.reduce(function (s, gr) { return s + gr.pv; }, 0) };
  }

  function renderCalcBox1(a, r, fr) {
    var p = a.personal, asmp = a.assumptions;
    var retGoals = goalsAtRetirementPV(a);
    var rowsHtml = calcRow('ค่าใช้จ่ายหลังเกษียณตลอดชีพ', r.netRequiredCorpus,
      '<div class="tvm-line">คำนวณจากค่าใช้จ่ายเดือนแรกหลังเกษียณ (' + fmt(r.firstYearMonthlyNeed) + ' บาท/เดือน) เป็น PMT งวดแรกของ Growing Annuity ที่โตตามเงินเฟ้อหลังเกษียณ (g = ' + (asmp.inflationPostRetire * 100).toFixed(1) + '%) หักด้วยบำนาญที่ได้รับแต่ละปี แล้วคิดลดด้วยผลตอบแทนหลังเกษียณ (i = ' + (asmp.returnPostRetire * 100).toFixed(1) + '%) ตลอดช่วงเกษียณ (ดูตารางจำลองปีต่อปีในกล่องที่ 4)</div>' +
      tvmBlock('PV = Σ [ (ความต้องการปีที่ t − บำนาญปีที่ t) ÷ (1+i)<sup>t</sup> ]', 'PMT₁ = ' + fmt(r.firstYearMonthlyNeed * 12) + ' บาท/ปี, g = ' + (asmp.inflationPostRetire * 100).toFixed(1) + '%, i = ' + (asmp.returnPostRetire * 100).toFixed(1) + '%, n = ' + (a.personal.lifeExpectancy - a.personal.retireAge) + ' ปี', 'PV = <strong>' + fmt(r.netRequiredCorpus) + ' บาท</strong>'));

    rowsHtml += retGoals.rows.map(function (gr) {
      var yrs1 = gr.startAge - p.currentAge;
      var yrsToRet = Math.abs(p.retireAge - gr.startAge);
      var detail = tvmCompound(gr.amountToday, gr.inflUsed, yrs1, gr.totalInflated, 'มูลค่าวันนี้', 'มูลค่า ณ อายุ ' + gr.startAge) +
        (gr.startAge < p.retireAge
          ? tvmCompound(gr.totalInflated, gr.rateUsed, yrsToRet, gr.pv, 'ณ อายุ ' + gr.startAge, 'ณ วันเกษียณ')
          : tvmDiscount(gr.totalInflated, gr.rateUsed, yrsToRet, gr.pv, 'ณ อายุ ' + gr.startAge, 'ณ วันเกษียณ'));
      return calcRow('เป้าหมายเกษียณ: ' + gr.name, gr.pv, detail);
    }).join('');
    if (!retGoals.rows.length) rowsHtml += '<div class="entry-note" style="padding:4px 0">ยังไม่มีเป้าหมายเพื่อค่าใช้จ่ายในการเกษียณ</div>';

    var otherGoalsTotal = 0;
    rowsHtml += fr.goalsCalc.map(function (g) {
      var atRet = valueAtRetirement(g.futureValueNeeded, g.atAge, p.retireAge, asmp.returnPreRetire, asmp.returnPostRetire);
      otherGoalsTotal += atRet;
      var yrsGap = Math.abs(p.retireAge - g.atAge);
      var detail = g.atAge <= p.retireAge
        ? tvmCompound(g.futureValueNeeded, g.rateUsed, yrsGap, atRet, 'ณ อายุ ' + g.atAge, 'ณ วันเกษียณ')
        : tvmDiscount(g.futureValueNeeded, g.rateUsed, yrsGap, atRet, 'ณ อายุ ' + g.atAge, 'ณ วันเกษียณ');
      return calcRow('เป้าหมายอื่นๆ: ' + g.name, atRet, detail);
    }).join('');
    if (!fr.goalsCalc.length) rowsHtml += '<div class="entry-note" style="padding:4px 0">ยังไม่มีเป้าหมายเพื่อค่าใช้จ่ายอื่นๆ</div>';

    var eduTotal = 0;
    rowsHtml += fr.educationCalc.map(function (e) {
      var atRet = valueAtRetirement(e.totalNeededAtStart, e.atAge, p.retireAge, asmp.returnPreRetire, asmp.returnPostRetire);
      eduTotal += atRet;
      var yrsGap = Math.abs(p.retireAge - e.atAge);
      var detail = e.atAge <= p.retireAge
        ? tvmCompound(e.totalNeededAtStart, e.rateUsed, yrsGap, atRet, 'ณ ปีที่เริ่มเรียน (พ่อ/แม่อายุ ' + e.atAge + ')', 'ณ วันเกษียณ')
        : tvmDiscount(e.totalNeededAtStart, e.rateUsed, yrsGap, atRet, 'ณ ปีที่เริ่มเรียน (พ่อ/แม่อายุ ' + e.atAge + ')', 'ณ วันเกษียณ');
      return calcRow('การศึกษา: ' + e.childName + ' (' + e.levelLabel + ')', atRet, detail);
    }).join('');
    if (!fr.educationCalc.length) rowsHtml += '<div class="entry-note" style="padding:4px 0">ยังไม่มีแผนการศึกษาบุตร</div>';

    var healthAtRet = valueAtRetirement(r.healthRequiredToday, p.currentAge, p.retireAge, asmp.returnPreRetire, asmp.returnPostRetire);
    rowsHtml += calcRow('เบี้ยประกันสุขภาพหลังเกษียณ', healthAtRet,
      tvmCompound(r.healthRequiredToday, asmp.returnPreRetire, p.retireAge - p.currentAge, healthAtRet, 'ณ วันนี้ อายุ ' + p.currentAge, 'ณ วันเกษียณ'));

    var total = r.netRequiredCorpus + retGoals.total + otherGoalsTotal + eduTotal + healthAtRet;
    return renderCalcRatesBox(a) +
      '<div class="subblock"><div class="subblock-title">รายละเอียดเงินที่ต้องมีตามเป้าหมาย (มูลค่า ณ วันเกษียณ ทุกรายการ)</div>' +
      rowsHtml +
      '<div class="calc-row calc-row-total"><div class="calc-row-label">รวมเงินที่ต้องมีตามเป้าหมาย</div><div class="calc-row-amount">' + fmt(total) + ' บาท</div></div></div>';
  }

  function renderCalcBox2(a, r) {
    var p = a.personal, asmp = a.assumptions;
    var rowsHtml = '';
    if (a.pvd.enabled) {
      rowsHtml += calcRow('กองทุนสำรองเลี้ยงชีพ / กบข.', r.pvdResult.finalBalance,
        '<div class="tvm-line">FV = ยอดสะสมปัจจุบันทบต้น + FV ของเงินสะสม/สมทบรายเดือน (Annuity)</div>' +
        tvmBlock('FV = PV×(1+i)<sup>n</sup> + PMT×[((1+i)<sup>n</sup>−1)÷i]',
          'PV (ยอดเริ่มต้น) = ' + fmt(a.pvd.startingBalance) + ' บาท, i = ' + (a.pvd.fundReturn * 100).toFixed(1) + '%/ปี, n = ' + r.yearsToRetire + ' ปี, PMT = เงินสะสม+สมทบรายเดือน',
          'FV = <strong>' + fmt(r.pvdResult.finalBalance) + ' บาท</strong> (ดูตารางเต็มที่แท็บข้อมูลลูกค้า)'));
    }
    if (a.sso.enabled) {
      rowsHtml += calcRow('บำนาญชราภาพประกันสังคม', 0,
        tvmBlock('เงินบำนาญ/เดือน = % สิทธิ × ค่าจ้างเฉลี่ย', '% สิทธิ = ' + r.ssoPct.toFixed(2) + '%, ค่าจ้างเฉลี่ย = ' + fmt(r.ssoAvgWageCapped) + ' บาท', 'บำนาญ = ' + r.ssoPct.toFixed(2) + '% × ' + fmt(r.ssoAvgWageCapped) + ' = <strong>' + fmt(r.ssoMonthly) + ' บาท/เดือน</strong> ตลอดชีพหลังเกษียณ'),
        'เป็นรายเดือนตลอดชีพ ไม่ใช่เงินก้อน (PMT ไม่ใช่ PV) — ถูกนำไปหักลบค่าใช้จ่ายรายปีในกองทุนที่ต้องมี (กล่องที่ 1) แล้ว จึงไม่รวมเป็นเงินก้อนตรงนี้');
    }
    if (a.severance.enabled && r.severance) {
      rowsHtml += calcRow('เงินชดเชยตามกฎหมายแรงงาน', r.severance.amount,
        tvmBlock('เงินชดเชย = จำนวนเดือนตามกฎหมาย × เงินเดือน ณ วันเกษียณ',
          'จำนวนเดือน = ' + r.severance.months + ' เดือน (ตามอายุงาน ' + r.severance.serviceYears.toFixed(1) + ' ปี), เงินเดือน ณ วันเกษียณ = ' + fmt(r.severance.amount / r.severance.months) + ' บาท',
          '<strong>' + fmt(r.severance.amount) + ' บาท</strong>'));
    }
    rowsHtml += calcRow('เงินออมอย่างต่อเนื่อง (จากแท็บการลงทุน)', r.savingsRegularFV,
      tvmBlock('FV = PMT × [((1+i)<sup>n</sup>−1) ÷ i]', 'PMT = เงินลงทุนต่อเนื่องรวม/ปี, i = ' + (asmp.returnPreRetire * 100).toFixed(1) + '%/ปี, n = ' + r.yearsToRetire + ' ปี', 'FV = <strong>' + fmt(r.savingsRegularFV) + ' บาท</strong>'));
    rowsHtml += calcRow('สินทรัพย์ปัจจุบัน (จากงบดุล)', r.currentSavingsFV_asis,
      tvmBlock('FV = Σ PV<sub>แต่ละสินทรัพย์</sub> × (1+i)<sup>n</sup>', 'PV = มูลค่าแต่ละสินทรัพย์วันนี้, i = ผลตอบแทนตามประเภทสินทรัพย์, n = ' + r.yearsToRetire + ' ปี', 'FV = <strong>' + fmt(r.currentSavingsFV_asis) + ' บาท</strong>'));
    rowsHtml += calcRow('เงินก้อน/เงินได้ระหว่างทาง (ส่วนก่อนเกษียณ)', r.windfallsFV,
      tvmBlock('FV = PV × (1+i)<sup>n</sup> (แต่ละรายการ)', 'i = ' + (asmp.returnPreRetire * 100).toFixed(1) + '%/ปี (ผลตอบแทนก่อนเกษียณ), n = ปีที่เหลือจนเกษียณของแต่ละรายการ', 'FV = <strong>' + fmt(r.windfallsFV) + ' บาท</strong>'));
    return '<div class="subblock" style="margin-top:0"><div class="subblock-title">รายละเอียดเงินที่เตรียมไว้แล้ว (มูลค่า ณ วันเกษียณ)</div>' +
      rowsHtml +
      '<div class="calc-row calc-row-total"><div class="calc-row-label">รวมเงินที่เตรียมไว้แล้ว</div><div class="calc-row-amount">' + fmt(r.availableAtRetirement) + ' บาท</div></div></div>';
  }

  function renderCalcBox3(a, r, fr) {
    var p = a.personal, asmp = a.assumptions;
    var retGoals = goalsAtRetirementPV(a);
    var otherGoalsTotal = fr.goalsCalc.reduce(function (s, g) { return s + valueAtRetirement(g.futureValueNeeded, g.atAge, p.retireAge, asmp.returnPreRetire, asmp.returnPostRetire); }, 0);
    var eduTotal = fr.educationCalc.reduce(function (s, e) { return s + valueAtRetirement(e.totalNeededAtStart, e.atAge, p.retireAge, asmp.returnPreRetire, asmp.returnPostRetire); }, 0);
    var healthAtRet = valueAtRetirement(r.healthRequiredToday, p.currentAge, p.retireAge, asmp.returnPreRetire, asmp.returnPostRetire);
    var box1Total = r.netRequiredCorpus + retGoals.total + otherGoalsTotal + eduTotal + healthAtRet;
    var gapVsSurplus = box1Total - r.availableAtRetirement;
    return '<div class="grid-2">' +
      metricCard('เงินที่ต้องมีตามเป้าหมายทั้งหมด (กล่องที่ 1)', fmt(box1Total) + ' บาท', 'navy') +
      metricCard('เงินที่เตรียมไว้แล้ว (กล่องที่ 2)', fmt(r.availableAtRetirement) + ' บาท', 'navy') +
      '</div>' +
      metricCard(gapVsSurplus > 0 ? 'ส่วนที่ขาด (Gap)' : 'ส่วนที่เกิน (Surplus)', fmt(Math.abs(gapVsSurplus)) + ' บาท', gapVsSurplus > 0 ? 'red' : 'green', gapVsSurplus > 0 ? 'ต้องเตรียมเพิ่มอีกเท่านี้ ณ วันเกษียณ' : 'มีเกินความจำเป็นเท่านี้ ณ วันเกษียณ') +
      calcDetail(tvmBlock('Gap = PV(ต้องมี) − PV(เตรียมไว้) ที่ n=0 (ณ วันเกษียณ)',
        'PV(ต้องมี) = ' + fmt(box1Total) + ' บาท, PV(เตรียมไว้) = ' + fmt(r.availableAtRetirement) + ' บาท',
        'Gap = ' + fmt(box1Total) + ' − ' + fmt(r.availableAtRetirement) + ' = <strong>' + fmtSigned(gapVsSurplus) + ' บาท</strong> (บวก = ขาด, ลบ = เกิน)'));
  }

  function renderCalcBox4(a, r) {
    var asmp = a.assumptions;
    return '<div class="grid-2">' +
      metricCard('แบบที่ 1: ใช้เท่าที่มี ใช้ได้เดือนละ', fmt(r.sustainableMonthly) + ' บาท/เดือน', 'green', 'เดือนแรกหลังเกษียณ แล้วปรับเพิ่มตามเงินเฟ้อทุกปี จนพอดีหมดที่อายุขัย') +
      metricCard('แบบที่ 2: ใช้ตามเป้าหมายเดิม จะอยู่ได้ถึง', r.depletionAge ? ('อายุ ' + r.depletionAge + ' ปี') : 'ตลอดอายุขัย', r.depletionAge ? 'red' : 'green', r.depletionAge ? 'เงินลงทุนจะหมดก่อนอายุขัยที่ตั้งไว้ เหลือใช้เฉพาะเงินบำนาญที่มี' : 'เพียงพอใช้ตามเป้าหมายเดิมไปตลอดชีพ') +
      '</div>' +
      calcDetail(
        '<div class="tvm-line"><strong>แบบที่ 1 — แก้หา PMT จาก Growing Annuity PV:</strong></div>' +
        tvmBlock('PV = PMT × [1 − ((1+g)/(1+i))<sup>n</sup>] ÷ (i − g) → แก้หา PMT',
          'PV = ' + fmt(r.availableAtRetirement) + ' บาท, g = ' + (asmp.inflationPostRetire * 100).toFixed(1) + '% (เงินเฟ้อหลังเกษียณ), i = ' + (asmp.returnPostRetire * 100).toFixed(1) + '% (ผลตอบแทนหลังเกษียณ), n = ' + (r.yearsRetired || (a.personal.lifeExpectancy - a.personal.retireAge)) + ' ปี',
          'PMT ปีแรก ÷ 12 = <strong>' + fmt(r.sustainableMonthly) + ' บาท/เดือน</strong>') +
        '<div class="tvm-line" style="margin-top:8px"><strong>แบบที่ 2 — จำลองปีต่อปี (Amortization):</strong></div>' +
        tvmBlock('ยอดปลายปี<sub>t</sub> = (ยอดต้นปี<sub>t</sub> − ถอนใช้<sub>t</sub> + บำนาญ<sub>t</sub>) × (1+i)',
          'ยอดต้นปีที่ 1 = ' + fmt(r.availableAtRetirement) + ' บาท, ถอนใช้ปีแรก = ' + fmt(r.firstYearMonthlyNeed * 12) + ' บาท (โต g = ' + (asmp.inflationPostRetire * 100).toFixed(1) + '%/ปี), i = ' + (asmp.returnPostRetire * 100).toFixed(1) + '%',
          'วนคำนวณทีละปีจนยอดหมดหรือถึงอายุขัย → ' + (r.depletionAge ? 'หมดที่อายุ <strong>' + r.depletionAge + '</strong>' : '<strong>เพียงพอตลอดชีพ</strong>')));
  }

  function renderCalcBox5(a, r) {
    var asmp = a.assumptions;
    if (!(r.gap > 0)) return '<div class="note">เงินที่มีเพียงพอตามเป้าหมายที่ตั้งไว้แล้ว ไม่จำเป็นต้องออมเพิ่ม</div>';
    return '<div class="grid-2">' +
      metricCard('ออมคงที่ทุกเดือนจนเกษียณ', fmt(r.extraSavingFlatMonthly) + ' บาท/เดือน', 'green', 'จำนวนเท่ากันทุกเดือน') +
      '<div>' +
      metricCard('ออมเพิ่มขึ้นตามอัตราขึ้นเงินเดือน (เดือนแรก)', fmt(r.extraSavingGrowingFirstMonthly) + ' บาท/เดือน', 'navy') +
      metricCard('...เดือนสุดท้ายก่อนเกษียณ', fmt(r.extraSavingGrowingLastMonthly) + ' บาท/เดือน', 'green') +
      '</div></div>' +
      calcDetail(
        '<div class="tvm-line"><strong>แบบคงที่ — Ordinary Annuity PMT:</strong></div>' +
        tvmBlock('PMT = FV × i ÷ [(1+i)<sup>n</sup> − 1]', 'FV (ส่วนที่ขาด) = ' + fmt(r.gap) + ' บาท, i = ' + (asmp.returnPreRetire * 100).toFixed(1) + '%/ปี, n = ' + r.yearsToRetire + ' ปี', 'PMT/ปี ÷ 12 = <strong>' + fmt(r.extraSavingFlatMonthly) + ' บาท/เดือน</strong>') +
        '<div class="tvm-line" style="margin-top:8px"><strong>แบบเพิ่มขึ้นตามเงินเดือน — Growing Annuity PMT:</strong></div>' +
        tvmBlock('FV = PMT₁ × [((1+i)<sup>n</sup> − (1+g)<sup>n</sup>) ÷ (i − g)] → แก้หา PMT₁',
          'FV = ' + fmt(r.gap) + ' บาท, i = ' + (asmp.returnPreRetire * 100).toFixed(1) + '%/ปี, g (อัตราขึ้นเงินเดือน) = ' + ((a.personal.salaryGrowth || 0) * 100).toFixed(1) + '%/ปี, n = ' + r.yearsToRetire + ' ปี',
          'PMT₁ ÷ 12 = <strong>' + fmt(r.extraSavingGrowingFirstMonthly) + ' บาท/เดือน</strong> (เดือนแรก) เพิ่มขึ้นทุกปีจนถึง <strong>' + fmt(r.extraSavingGrowingLastMonthly) + ' บาท/เดือน</strong> (เดือนสุดท้าย)'));
  }

  function renderCalcBox6(a, fr) {
    var lc = fr.lifeInsuranceCalc;
    var rowsHtml = calcRow('หนี้สินที่ต้องปิดทั้งหมด', lc.totalDebt, null);
    rowsHtml += calcRow('เงินเลี้ยงดูครอบครัว (' + a.finance.insurance.life.yearsOfSupport + ' ปี)', lc.incomeReplacementNeed,
      tvmBlock('เงินเลี้ยงดู = ค่าใช้จ่ายครอบครัว/ปี × จำนวนปีที่ต้องดูแล', 'ค่าใช้จ่าย/ปี = ' + fmt(a.finance.insurance.life.familyLivingExpenseAnnual) + ' บาท, ปีที่ดูแล = ' + a.finance.insurance.life.yearsOfSupport + ' ปี', '<strong>' + fmt(lc.incomeReplacementNeed) + ' บาท</strong>'));
    rowsHtml += calcRow('ค่าเล่าเรียนบุตรที่ยังขาด', lc.totalEducationNeed, 'รวมจากกล่อง "เงินที่ต้องมีตามเป้าหมาย" หัวข้อการศึกษาบุตรทุกคน (มูลค่า ณ ปีที่แต่ละคนเริ่มเรียน)');
    rowsHtml += calcRow('ค่าใช้จ่ายสุดท้าย (งานศพ ฯลฯ)', lc.finalExpenses, null);
    rowsHtml += calcRow('เงินมรดกที่ต้องการทิ้งไว้', lc.legacyAmount, null);
    rowsHtml += '<div class="calc-row calc-row-total"><div class="calc-row-label">รวมทุนประกันชีวิตที่ควรมี</div><div class="calc-row-amount">' + fmt(lc.totalNeed) + ' บาท</div></div>';
    rowsHtml += calcRow('ความคุ้มครองที่มีอยู่แล้ว', lc.existingCoverage, null);
    var gapHtml = '<div class="subblock"><div class="subblock-title">ทุนประกันชีวิต (Needs-based Analysis)</div>' + rowsHtml +
      '<div class="calc-row calc-row-total"><div class="calc-row-label">' + (lc.gap > 0 ? 'ทุนประกันที่ยังขาด' : 'มีความคุ้มครองเพียงพอ') + '</div><div class="calc-row-amount">' + fmt(lc.gap) + ' บาท</div></div></div>';
    var otherHtml = '';
    if (fr.otherPoliciesCalc.length) {
      var otherRows = fr.otherPoliciesCalc.map(function (p) {
        return calcRow(p.type, p.gap, 'ความคุ้มครองที่ควรมี ' + fmt(p.recommendedCoverage) + ' บาท − มีอยู่แล้ว ' + fmt(p.currentCoverage) + ' บาท = ' + fmt(p.gap) + ' บาท');
      }).join('');
      otherHtml = '<div class="subblock"><div class="subblock-title">ความคุ้มครองอื่นๆ (ทุพพลภาพ, โรคร้ายแรง ฯลฯ)</div>' + otherRows + '</div>';
    }
    return gapHtml + otherHtml;
  }

  function renderGap(a, r) {
    var p = a.personal;
    var discountRate = r.sizedBuckets.length ? r.sizedBuckets[0].drawdownReturn : 0.04;
    var goalRows = (a.goals || []).map(function (g, i) {
      var fromAge = Math.max(g.startAge, p.retireAge);
      var pvAtRetirement = 0;
      var totalInflated = 0;
      for (var age = g.startAge; age <= g.endAge; age++) {
        var amt = g.amountToday * Math.pow(1 + p.inflation, age - p.currentAge);
        totalInflated += amt;
        if (age >= fromAge) pvAtRetirement += amt / Math.pow(1 + discountRate, age - p.retireAge);
      }
      return { n: i + 1, name: g.name, startAge: g.startAge, endAge: g.endAge, amountToday: g.amountToday, phase: goalPhaseLabel(g, p.retireAge), totalInflated: totalInflated, pv: pvAtRetirement };
    });
    var goalTotal = goalRows.reduce(function (s, gr) { return s + gr.pv; }, 0);
    var goalCols = [
      { label: 'ลำดับ', render: function (row) { return row.n; } },
      { label: 'ชื่อเป้าหมาย', render: function (row) { return esc(row.name); } },
      { label: 'อายุเริ่ม', render: function (row) { return row.startAge; } },
      { label: 'อายุสิ้นสุด', render: function (row) { return row.endAge; } },
      { label: 'จำนวนเงิน/ปี (วันนี้)', render: function (row) { return fmt(row.amountToday); } },
      { label: 'ช่วง', render: function (row) { return row.phase; } },
      { label: 'มูลค่ารวมปรับเงินเฟ้อ', render: function (row) { return fmt(row.totalInflated) + ' บาท'; } },
      { label: 'ที่ต้องใช้ ณ วันเกษียณ (PV)', render: function (row) { return row.pv > 0 ? fmt(row.pv) + ' บาท' : 'ไม่กระทบกองทุนหลัก'; } }
    ];
    var sumRows = r.sizedBuckets.map(function (b) { return { label: b.label || 'บัคเก็ต', need: b.needAtStart, pension: b.pensionFlatForBucket, req: b.requiredToday }; });
    var sumCols = [
      { label: 'บัคเก็ต', render: function (row) { return esc(row.label); } },
      { label: 'ความต้องการใช้/ปี (ต้นช่วง)', render: function (row) { return fmt(row.need); } },
      { label: 'บำนาญหักออก/ปี', render: function (row) { return fmt(row.pension); } },
      { label: 'เงินต้องมี ณ วันนี้', render: function (row) { return fmt(row.req); } }
    ];
    var detailCols = [
      { label: 'ปีที่', render: function (row) { return row.year; } },
      { label: 'พ.ศ.', render: function (row) { return row.beYear; } },
      { label: 'อายุ', render: function (row) { return row.age; } },
      { label: 'ยอดต้นปี', render: function (row) { return fmt(row.startBalance); } },
      { label: 'ค่าใช้จ่ายที่ต้องการ/ปี', render: function (row) { return fmt(row.need); } },
      { label: 'บำนาญที่ได้รับ/ปี', render: function (row) { return fmt(row.pension); } },
      { label: 'ยอดปลายปี', render: function (row) { return fmt(row.endBalance); } }
    ];
    var html = '<div class="grid-2">' +
      metricCard('กองทุนที่ควรมี ณ วันเกษียณ (รวมทุกบัคเก็ต, หักบำนาญแล้ว)', fmt(r.netRequiredCorpus) + ' บาท', 'navy') +
      metricCard('เงินที่คาดว่าจะมี ณ วันเกษียณ', fmt(r.availableAtRetirement) + ' บาท', 'navy') + '</div>' +
      metricCard(r.gap > 0 ? 'ส่วนที่ขาด (Gap)' : 'ส่วนที่เกิน (Surplus)', fmt(Math.abs(r.gap)) + ' บาท', r.gap > 0 ? 'red' : 'green') +
      '<div class="note" style="margin-top:14px"><strong>เป้าหมายที่รวมอยู่ในกองทุนนี้:</strong></div>' +
      (goalRows.length
        ? detailTable(goalRows, goalCols, 'goalbreakdown') + '<div class="note">รวมมูลค่าเป้าหมายทั้งหมด ณ วันเกษียณ (PV): <strong>' + fmt(goalTotal) + ' บาท</strong></div>'
        : '<div class="note">ยังไม่มีเป้าหมาย</div>') +
      '<div class="note" style="margin-top:14px"><strong>สรุปยอดที่ต้องมีแยกตามบัคเก็ต:</strong></div>' +
      detailTable(sumRows, sumCols, 'gapsummary') +
      '<div class="note" style="margin-top:6px"><strong>ตารางจำลองปีต่อปี (ใช้เงินตามแผนเดิม จนถึงอายุขัย):</strong></div>' +
      detailTable(r.drawdownTable, detailCols, 'gapdetail');
    function selectModeRadio(val, label) {
      var pa = pathAttr(['extraSavingMode']);
      return '<label class="radio" style="margin-top:8px"><input type="radio" data-path=\'' + pa + '\' data-type="radio" data-radio-value="' + val + '"' + (val === a.extraSavingMode ? ' checked' : '') + '> ' + esc(label) + '</label>';
    }
    if (r.gap > 0) {
      html += '<div class="subblock">' +
        field('อัตราผลตอบแทนของเงินออมเพิ่ม', ['extraSavingReturn'], a.extraSavingReturn, { type: 'percent', suffix: '%/ปี' }) +
        '<div class="note" style="margin-top:10px"><strong>เปรียบเทียบ 2 แบบ:</strong></div>' +
        '<div class="grid-2" style="margin-top:8px">' +
        '<div class="list-card">' +
        '<div class="list-card-head"><strong>ออมคงที่ทุกเดือน</strong></div>' +
        metricCard('ต้องออมเดือนละ', fmt(r.extraSavingFlatMonthly) + ' บาท/เดือน', 'green', 'จำนวนเท่ากันทุกเดือนจนเกษียณ') +
        selectModeRadio('flat', 'เลือกใช้แบบนี้') + '</div>' +
        '<div class="list-card">' +
        '<div class="list-card-head"><strong>ออมเพิ่มขึ้นตามอัตราขึ้นเงินเดือน</strong></div>' +
        metricCard('เดือนแรกออม', fmt(r.extraSavingGrowingFirstMonthly) + ' บาท/เดือน', 'navy') +
        metricCard('เดือนสุดท้ายก่อนเกษียณ ออม', fmt(r.extraSavingGrowingLastMonthly) + ' บาท/เดือน', 'green') +
        selectModeRadio('growing', 'เลือกใช้แบบนี้') + '</div>' +
        '</div></div>';
    } else html += '<div class="note">เงินที่มีเพียงพอตามเป้าหมายที่ตั้งไว้แล้ว</div>';
    return html;
  }

  function fullPlanTable(plan) {
    var cols = [
      { label: 'ปีที่', render: function (row) { return row.year; } },
      { label: 'พ.ศ.', render: function (row) { return row.beYear; } },
      { label: 'อายุ', render: function (row) { return row.age; } },
      { label: 'บัคเก็ตที่ใช้', render: function (row) { return esc(row.bucketLabel); } },
      { label: 'อัตราที่ใช้', render: function (row) { return row.rateUsed != null ? (row.rateUsed * 100).toFixed(2) + '%' : '-'; } },
      { label: 'ยอดต้นปี', render: function (row) { return fmt(row.startBalance); } },
      { label: 'ดอกเบี้ยที่ได้ปีนั้น', render: function (row) { return fmt(row.interest); } },
      { label: 'บำนาญที่ได้รับ', render: function (row) { return fmt(row.pension); } },
      { label: 'รายการพิเศษ (เป้าหมาย/เงินก้อน/เบี้ยสุขภาพ)', render: function (row) { return row.oneOff ? fmtSigned(row.oneOff) : '-'; } },
      { label: 'เงินที่ใช้จ่ายปีนั้น', render: function (row) { return fmt(row.withdrawal); } },
      { label: 'ยอดปลายปี', render: function (row) { return fmt(row.endBalance); } }
    ];
    return detailTable(plan.table, cols, 'plan' + Math.random().toString(36).slice(2, 6));
  }

  function planScenarioBlock(title, plan, extraSaving, a) {
    var html = '<div class="list-card"><div class="list-card-head"><strong>' + esc(title) + '</strong></div>' +
      metricCard('เงินต้องมี ณ วันเกษียณ', fmt(plan.netRequiredCorpus) + ' บาท', 'navy') +
      '<div class="subblock-title" style="margin-top:14px;font-size:15px">ถ้าไม่ออมเพิ่ม</div>' +
      '<div class="grid-2">' +
      metricCard('ใช้เท่ากันตลอด (เดือนแรก)', fmt(plan.sustainableMonthly) + ' บาท/เดือน', 'green', 'ไปจนถึงอายุขัยพอดี') +
      metricCard('ถ้าใช้ตามเป้าหมายเดิม จะอยู่ได้ถึง', plan.depletionAge ? ('อายุ ' + plan.depletionAge + ' ปี') : 'ตลอดอายุขัย', plan.depletionAge ? 'red' : 'green') +
      '</div>';
    if (extraSaving.gap > 0) {
      html += '<div class="subblock-title" style="margin-top:14px;font-size:15px">ถ้าจะออมเพิ่มให้พอตามเป้าหมาย (ขาดอยู่ ' + fmt(extraSaving.gap) + ' บาท)</div>' +
        '<div class="grid-2">' +
        metricCard('ออมคงที่ทุกเดือน', fmt(extraSaving.flatMonthly) + ' บาท/เดือน', 'green', 'ที่ผลตอบแทน ' + (a.extraSavingReturn * 100).toFixed(2) + '%/ปี') +
        metricCard('หรือออมเพิ่มขึ้นตามเงินเดือน', fmt(extraSaving.growingFirstMonthly) + ' → ' + fmt(extraSaving.growingLastMonthly) + ' บาท/เดือน', 'navy', 'เดือนแรก → เดือนสุดท้ายก่อนเกษียณ') +
        '</div>';
    } else {
      html += '<div class="note" style="margin-top:10px">เงินที่มีเพียงพอตามเป้าหมายแล้ว ไม่ต้องออมเพิ่ม</div>';
    }
    html += fullPlanTable(plan) + '</div>';
    return html;
  }

  function renderBuckets(a, r) {
    var list = a.buckets.list;
    var rowsHtml = list.map(function (b, i) {
      var sb = r.multiPlan.sizedBuckets[i];
      var isLast = i === list.length - 1;
      return '<div class="list-card">' +
        '<div class="list-card-head">' + field('', ['buckets', 'list', i, 'label'], b.label, { type: 'text', titleStyle: true }) +
        (list.length > 1 ? '<button class="btn-icon" type="button" data-action="delBucket" data-index="' + i + '">×</button>' : '') + '</div>' +
        '<div class="grid-3">' +
        (isLast
          ? '<div class="field"><span class="field-label">จำนวนปีของช่วงนี้</span><div class="field-input-row"><span class="entry-note" style="font-size:15px;font-weight:700;color:var(--navy-900)">' + sb.years + ' ปี (อัตโนมัติ)</span></div><span class="field-hint">คำนวณจากปีที่เหลือทั้งหมด ให้รวมพอดีกับอายุขัย</span></div>'
          : field('จำนวนปีของช่วงนี้', ['buckets', 'list', i, 'years'], b.years, { suffix: 'ปี' })) +
        (i === 0 ? '<div class="note" style="align-self:end">เริ่มใช้ทันทีที่เกษียณ ไม่มีช่วงรอ</div>' : field('ผลตอบแทนช่วงรอคิว', ['buckets', 'list', i, 'waitingReturn'], b.waitingReturn, { type: 'percent', suffix: '%/ปี' })) +
        field('ผลตอบแทนช่วงถอนใช้ (ความเสี่ยงต่ำ)', ['buckets', 'list', i, 'drawdownReturn'], b.drawdownReturn, { type: 'percent', suffix: '%/ปี' }) +
        '</div>' +
        metricCard('เงินต้องมี ณ วันเกษียณสำหรับบัคเก็ตนี้', fmt(sb.requiredToday) + ' บาท', 'green', 'เริ่มใช้ที่อายุ ' + sb.startAge + ' ปี, ' + sb.years + ' ปี') +
        '</div>';
    }).join('');
    return '<div class="note">ตั้งค่าบัคเก็ตของคุณด้านล่าง — บัคเก็ตแรกใช้ก่อน (ความเสี่ยงต่ำทันที) บัคเก็ตถัดไปลงทุนความเสี่ยงสูงขึ้นได้ระหว่างรอคิว บัคเก็ตสุดท้ายจะปรับจำนวนปีให้อัตโนมัติเสมอเพื่อให้รวมพอดีกับอายุขัย (แก้ไขปีของบัคเก็ตอื่นแทน)</div>' +
      rowsHtml + '<button class="btn btn-add-row" type="button" data-action="addBucket">+ เพิ่มบัคเก็ต</button>' +
      '<div class="subblock"><div class="subblock-title">เปรียบเทียบ 2 แนวทางการบริหาร (ใช้ข้อมูลเดียวกัน)</div>' +
      '<div class="grid-2">' +
      planScenarioBlock('แบบพอร์ตเดียวตลอดช่วงเกษียณ (ผลตอบแทนเฉลี่ยถ่วงน้ำหนัก ' + (r.blendedRate * 100).toFixed(2) + '%/ปี)', r.singlePlan, r.singleExtraSaving, a) +
      planScenarioBlock('แบบแบ่งบัคเก็ตตามที่ตั้งค่าไว้', r.multiPlan, r.multiExtraSaving, a) +
      '</div></div>';
  }

  function renderStressTest(a, r) {
    return '<div class="grid-2">' +
      field('ปรับผลตอบแทนหลังเกษียณ (สถานการณ์ทดสอบ)', ['stressTestDelta'], a.stressTestDelta, { type: 'percent', suffix: '%/ปี (ใส่ค่าติดลบ = แย่ลง)' }) +
      '</div>' +
      '<div class="grid-2">' +
      '<div class="list-card"><div class="list-card-head"><strong>กรณีฐาน (Base case)</strong></div>' +
      metricCard('ใช้ได้เท่ากันตลอด (เดือนแรก)', fmt(r.sustainableMonthly) + ' บาท/เดือน', 'green') +
      metricCard('ถ้าใช้ตามแผนเดิม เงินลงทุนจะหมดที่อายุ', r.depletionAge ? (r.depletionAge + ' ปี') : 'ไม่หมด (เหลือถึงอายุขัย)', r.depletionAge ? 'red' : 'green') + '</div>' +
      '<div class="list-card"><div class="list-card-head"><strong>กรณีทดสอบความเสี่ยง</strong></div>' +
      metricCard('ใช้ได้เท่ากันตลอด (เดือนแรก)', fmt(r.sustainableMonthlyStressed) + ' บาท/เดือน', 'navy') +
      metricCard('ถ้าใช้ตามแผนเดิม เงินลงทุนจะหมดที่อายุ', r.depletionAgeStressed ? (r.depletionAgeStressed + ' ปี') : 'ไม่หมด (เหลือถึงอายุขัย)', r.depletionAgeStressed ? 'red' : 'green') + '</div>' +
      '</div>';
  }

  function renderCharts(r) {
    return '<div class="charts-panel no-print">' +
      '<div class="chart-card"><div class="chart-title">เงินสะสมก่อนเกษียณ (บาท, ตามปี พ.ศ.)</div>' + lineChart([{ points: r.accumPath, color: '#1E6FD9', name: 'เงินสะสม' }]) + '</div>' +
      '<div class="chart-card"><div class="chart-title">เงินคงเหลือหลังเกษียณ (บาท, ตามแผนเดิม)</div>' + lineChart([{ points: r.drawdownPath, color: '#2E9E63', name: 'เงินคงเหลือ' }]) + '</div>' +
      '</div>';
  }

  function renderTimeline(r, p) {
    var typeColor = { milestone: '#1E6FD9', goal: '#0B2545', income: '#2E9E63', bucket: '#C98A1F', warning: '#A8382E' };
    return '<div class="timeline">' + r.events.map(function (e) {
      return '<div class="timeline-item"><div class="timeline-dot" style="background:' + typeColor[e.type] + '"></div>' +
        '<div class="timeline-content"><div class="timeline-age">อายุ ' + e.age + ' ปี · พ.ศ. ' + e.be + '</div><div class="timeline-label">' + esc(e.label) + '</div></div></div>';
    }).join('') + '</div>';
  }

  function renderPlanHealth(a, r) {
    var p = a.personal;
    var gapRatio = r.netRequiredCorpus > 0 ? r.gap / r.netRequiredCorpus : 0;
    var status, statusLabel, statusIcon;
    if (gapRatio <= 0) { status = 'green'; statusLabel = 'แผนของคุณ: เพียงพอแล้ว'; statusIcon = '✓'; }
    else if (gapRatio <= 0.15) { status = 'yellow'; statusLabel = 'แผนของคุณ: ใกล้เพียงพอ ต้องปรับอีกนิด'; statusIcon = '!'; }
    else { status = 'red'; statusLabel = 'แผนของคุณ: ต้องปรับปรุง'; statusIcon = '✕'; }

    var advice;
    if (status === 'red' && r.yearsToRetire > 15) {
      advice = 'ยังมีเวลาอีก ' + r.yearsToRetire + ' ปีก่อนเกษียณ ลองพิจารณาปรับสัดส่วนความเสี่ยง/ผลตอบแทนของพอร์ตการลงทุนดูก่อน อาจไม่ต้องออมเพิ่มมากขนาดนั้นก็ได้';
    } else if (status === 'red') {
      advice = 'เวลาที่เหลือก่อนเกษียณค่อนข้างจำกัด (' + r.yearsToRetire + ' ปี) ควรพิจารณาทั้งการออมเพิ่มและความเป็นไปได้ในการเลื่อนอายุเกษียณควบคู่กัน';
    } else if (status === 'yellow') {
      advice = 'ใกล้จะถึงเป้าหมายแล้ว ลองปรับเพิ่มเงินออมเล็กน้อยเดือนละประมาณ ' + fmt(r.extraMonthlySaving) + ' บาท ก็จะครบตามแผนที่วางไว้';
    } else {
      advice = 'แผนของคุณดูมั่นคงดี ลองพิจารณาเป้าหมายทางการเงินอื่นเพิ่มเติม หรือทบทวนแผนนี้อีกครั้งทุกปีเพื่อให้ยังคงเพียงพอตามสถานการณ์จริง';
    }
    return '<div class="plan-health plan-health-' + status + '">' +
      '<div class="plan-health-badge">' + statusIcon + '</div>' +
      '<div class="plan-health-text"><div class="plan-health-label">' + esc(statusLabel) + '</div><div class="plan-health-advice">' + esc(advice) + '</div></div>' +
      '</div>';
  }

  function renderStorySummary(a, r) {
    var p = a.personal;
    var beRetire = p.currentYearAD + 543 + (p.retireAge - p.currentAge);
    var name = p.clientName ? esc(p.clientName) : 'คุณ';
    var parts = [];
    parts.push('ตอนนี้ ' + name + 'อายุ ' + p.currentAge + ' ปี วางแผนจะเกษียณตอนอายุ ' + p.retireAge + ' ปี (อีก ' + r.yearsToRetire + ' ปี ตรงกับปี พ.ศ. ' + beRetire + ')');
    parts.push('ถ้าเก็บออมและลงทุนตามแผนที่วางไว้ตอนนี้ต่อไปเรื่อยๆ คาดว่าจะมีเงินรวมประมาณ <strong>' + fmt(r.availableAtRetirement) + ' บาท</strong> ในวันที่เกษียณ');
    parts.push('จากการคำนวณ ' + name + 'ควรมีเงินอย่างน้อย <strong>' + fmt(r.netRequiredCorpus) + ' บาท</strong> ณ วันเกษียณ เพื่อให้ใช้ได้เพียงพอไปจนถึงอายุ ' + p.lifeExpectancy + ' ปีตามที่วางแผนไว้');
    if (r.gap > 0) {
      parts.push('ตอนนี้ยังขาดอยู่ประมาณ <strong>' + fmt(r.gap) + ' บาท</strong> — ถ้าเริ่มออมเพิ่มเดือนละประมาณ <strong>' + fmt(r.extraMonthlySaving) + ' บาท</strong> ตั้งแต่วันนี้จนถึงวันเกษียณ ก็จะครบตามเป้าหมาย');
    } else {
      parts.push('ข่าวดีคือแผนตอนนี้เพียงพอแล้ว และมีเงินเกินอยู่ประมาณ <strong>' + fmt(Math.abs(r.gap)) + ' บาท</strong>');
    }
    if (r.depletionAge) {
      parts.push('แต่ถ้าไม่ออมเพิ่มเลยและใช้เงินตามแผนเดิมทุกปี เงินลงทุนจะหมดตอนอายุประมาณ <strong>' + r.depletionAge + ' ปี</strong> (ก่อนอายุขัยที่ตั้งไว้) หลังจากนั้นจะเหลือใช้เฉพาะเงินบำนาญที่มี');
    } else {
      parts.push('ถ้าใช้เงินคงที่เท่ากันทุกเดือน (ปรับตามเงินเฟ้อ) โดยไม่ออมเพิ่ม จะใช้ได้ประมาณเดือนละ <strong>' + fmt(r.sustainableMonthly) + ' บาท</strong> ไปได้ตลอดจนถึงอายุขัย');
    }
    return '<div class="dash-block story-block"><div class="dash-title">เรื่องราวแผนเกษียณของคุณ</div><p class="story-text">' + parts.join('. ') + '.</p></div>';
  }

  function computeScenarios(a) {
    var defs = [
      { key: 'base', label: 'ปัจจุบัน (Base Case)', tweak: function (c) {} },
      { key: 'retireEarly', label: 'เกษียณเร็วขึ้น 5 ปี', tweak: function (c) { c.personal.retireAge = Math.max(c.personal.currentAge + 1, c.personal.retireAge - 5); } },
      { key: 'retireLate', label: 'เกษียณช้าลง 5 ปี', tweak: function (c) { c.personal.retireAge += 5; } },
      { key: 'lowReturn', label: 'ผลตอบแทนต่ำกว่าคาด 2%', tweak: function (c) { c.assumptions.returnPreRetire = Math.max(0, c.assumptions.returnPreRetire - 0.02); c.assumptions.returnPostRetire = Math.max(0, c.assumptions.returnPostRetire - 0.02); } }
    ];
    return defs.map(function (d) {
      var clone = JSON.parse(JSON.stringify(a));
      d.tweak(clone);
      var rr = computeAll(clone);
      return { key: d.key, label: d.label, retireAge: clone.personal.retireAge, r: rr };
    });
  }

  function renderScenarioComparison(a, r) {
    var scenarios = computeScenarios(a);
    var cols = scenarios.map(function (s) {
      return { label: s.label, render: function (row) { return row.get(s); } };
    });
    var rows = [
      { label: 'อายุเกษียณ', get: function (s) { return s.retireAge + ' ปี'; } },
      { label: 'เงินที่ต้องมี (Box 1, เดิมยังไม่รวมเป้าหมาย/ประกัน)', get: function (s) { return fmt(s.r.netRequiredCorpus) + ' บาท'; } },
      { label: 'เงินที่เตรียมไว้แล้ว ณ วันเกษียณ', get: function (s) { return fmt(s.r.availableAtRetirement) + ' บาท'; } },
      { label: 'ขาด(+)/เกิน(−)', get: function (s) { return fmtSigned(s.r.gap) + ' บาท'; } },
      { label: 'ควรออมเพิ่ม/เดือน (แบบคงที่)', get: function (s) { return fmt(s.r.gap > 0 ? s.r.extraSavingFlatMonthly : 0) + ' บาท'; } },
      { label: 'ใช้เท่าที่มีได้เดือนละ', get: function (s) { return fmt(s.r.sustainableMonthly) + ' บาท'; } },
      { label: 'เงินจะอยู่ได้ถึง', get: function (s) { return s.r.depletionAge ? ('อายุ ' + s.r.depletionAge) : 'ตลอดอายุขัย'; } }
    ];
    var theadHtml = '<tr><th></th>' + scenarios.map(function (s) { return '<th>' + esc(s.label) + '</th>'; }).join('') + '</tr>';
    var tbodyHtml = rows.map(function (row) {
      return '<tr><td>' + esc(row.label) + '</td>' + scenarios.map(function (s) { return '<td>' + row.get(s) + '</td>'; }).join('') + '</tr>';
    }).join('');
    return '<div class="dash-block"><div class="dash-title">เปรียบเทียบสถานการณ์ (What-if Scenarios)</div>' +
      '<div class="entry-note" style="margin-bottom:8px">เทียบแผนปัจจุบันกับสถานการณ์สมมติ โดยใช้ข้อมูลและสมมติฐานชุดเดียวกัน ปรับแค่ตัวแปรที่ระบุในแต่ละคอลัมน์</div>' +
      '<div class="compare-table-wrap"><table class="compare-table"><thead>' + theadHtml + '</thead><tbody>' + tbodyHtml + '</tbody></table></div></div>';
  }

  function renderComparison(a, r) {
    var others = Object.keys(STORE.cases).filter(function (id) { return id !== STORE.activeId; });
    if (!others.length) return '<div class="dash-block"><div class="dash-title">เปรียบเทียบกับเคสอื่น</div><div class="note">ต้องมีอย่างน้อย 2 เคสจึงจะเปรียบเทียบได้ — ลองกด "ทำสำเนาเคสนี้" แล้วปรับสมมติฐานดูก่อน</div></div>';
    var optionsHtml = '<option value="">— เลือกเคสที่จะเทียบ —</option>' + others.map(function (id) {
      return '<option value="' + id + '"' + (id === COMPARE_ID ? ' selected' : '') + '>' + esc(STORE.cases[id].name) + '</option>';
    }).join('');
    var selectHtml = '<select class="inp" data-action="setCompareId" style="max-width:320px">' + optionsHtml + '</select>';
    var body = '';
    if (COMPARE_ID && STORE.cases[COMPARE_ID]) {
      var otherCase = STORE.cases[COMPARE_ID];
      var r2 = computeAll(otherCase);
      var rows = [
        ['อายุเกษียณ', a.personal.retireAge + ' ปี', otherCase.personal.retireAge + ' ปี'],
        ['กองทุนที่ควรมี ณ วันเกษียณ', fmt(r.netRequiredCorpus) + ' บาท', fmt(r2.netRequiredCorpus) + ' บาท'],
        ['เงินที่คาดว่าจะมี', fmt(r.availableAtRetirement) + ' บาท', fmt(r2.availableAtRetirement) + ' บาท'],
        [r.gap > 0 || r2.gap > 0 ? 'ขาด(+)/เกิน(-)' : 'ส่วนต่าง', fmtSigned(r.gap) + ' บาท', fmtSigned(r2.gap) + ' บาท'],
        ['ควรออมเพิ่ม/เดือน', fmt(r.gap > 0 ? r.extraMonthlySaving : 0) + ' บาท', fmt(r2.gap > 0 ? r2.extraMonthlySaving : 0) + ' บาท'],
        ['ใช้ได้เท่ากันตลอด (เดือนแรก)', fmt(r.sustainableMonthly) + ' บาท/เดือน', fmt(r2.sustainableMonthly) + ' บาท/เดือน'],
        ['เงินจะอยู่ได้ถึง', r.depletionAge ? ('อายุ ' + r.depletionAge) : 'ตลอดอายุขัย', r2.depletionAge ? ('อายุ ' + r2.depletionAge) : 'ตลอดอายุขัย']
      ];
      body = '<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th></th><th>' + esc(a.name) + '</th><th>' + esc(otherCase.name) + '</th></tr></thead><tbody>' +
        rows.map(function (row) { return '<tr><td>' + esc(row[0]) + '</td><td>' + row[1] + '</td><td>' + row[2] + '</td></tr>'; }).join('') +
        '</tbody></table></div>';
    }
    return '<div class="dash-block no-print"><div class="dash-title">เปรียบเทียบกับเคสอื่น</div>' + selectHtml + body + '</div>';
  }

  function renderSummaryBar(r) {
    return '<div class="summary-bar no-print">' +
      metricCard('ต้องมี ณ เกษียณ', fmt(r.netRequiredCorpus), 'navy') +
      metricCard('คาดว่าจะมี', fmt(r.availableAtRetirement), 'navy') +
      metricCard(r.gap > 0 ? 'ขาดอยู่' : 'เกินอยู่', fmt(Math.abs(r.gap)), r.gap > 0 ? 'red' : 'green') +
      metricCard('ควรออมเพิ่ม/เดือน', r.gap > 0 ? fmt(r.extraMonthlySaving) : '0', 'green') + '</div>';
  }

  function renderPrintReport(a, r) {
    var p = a.personal;
    var rows = [
      ['อายุปัจจุบัน / อายุเกษียณ / อายุขัย', p.currentAge + ' / ' + p.retireAge + ' / ' + p.lifeExpectancy + ' ปี'],
      ['ปีเกษียณ (พ.ศ.)', String(p.currentYearAD + 543 + (p.retireAge - p.currentAge))],
      ['ค่าใช้จ่ายเดือนแรกหลังเกษียณ', fmt(r.firstYearMonthlyNeed) + ' บาท/เดือน'],
      ['กองทุนที่ควรมี ณ วันเกษียณ', fmt(r.netRequiredCorpus) + ' บาท'],
      ['เงินที่คาดว่าจะมี ณ วันเกษียณ', fmt(r.availableAtRetirement) + ' บาท'],
      [r.gap > 0 ? 'ส่วนที่ขาด' : 'ส่วนที่เกิน', fmt(Math.abs(r.gap)) + ' บาท']
    ];
    if (r.gap > 0) rows.push(['ควรออมเพิ่ม', fmt(r.extraMonthlySaving) + ' บาท/เดือน']);
    rows.push(['ถ้าใช้เท่ากันตลอด (ไม่ออมเพิ่ม)', fmt(r.sustainableMonthly) + ' บาท/เดือน']);
    rows.push(['ถ้าใช้ตามแผนเดิม เงินลงทุนจะอยู่ได้ถึง', r.depletionAge ? ('อายุ ' + r.depletionAge) : 'ตลอดอายุขัย']);
    return '<div class="print-report">' +
      '<h1>แผนการเงินเพื่อการเกษียณ</h1>' +
      '<p>ชื่อลูกค้า: ' + esc(p.clientName || '-') + ' | เคส: ' + esc(a.name) + '</p>' +
      '<p>จัดทำโดย ป้าเป็ด CFP&reg; — Bangkok Life Assurance</p>' +
      '<table class="print-table"><tbody>' + rows.map(function (row) { return '<tr><td>' + esc(row[0]) + '</td><td>' + row[1] + '</td></tr>'; }).join('') + '</tbody></table>' +
      '<p class="print-note">เอกสารนี้จัดทำขึ้นเพื่อประกอบการวางแผนการเงินเบื้องต้นเท่านั้น ตัวเลขจริงอาจแตกต่างไปตามผลตอบแทนการลงทุนและอัตราเงินเฟ้อที่เกิดขึ้นจริง</p></div>';
  }

  /* ================= MAIN RENDER ================= */
  function renderSidebar() {
    var ids = Object.keys(STORE.cases);
    return '<aside class="sidebar no-print">' +
      '<div class="brand"><div class="brand-mark"><img src="data:image/png;base64,' + LOGO_B64 + '" alt="RetireWell" /></div><div><div class="brand-title">RetireWell</div><div class="brand-sub">PLAN | INVEST | LIVE BETTER</div></div></div>' +
      '<div class="action-row">' +
      '<button class="icon-btn" type="button" data-action="addCase" title="สร้างเคสลูกค้าใหม่"><span class="icon-btn-ic">＋</span><span class="icon-btn-label">เคสใหม่</span></button>' +
      '<button class="icon-btn" type="button" data-action="duplicateCase" title="ทำสำเนาเคสนี้ทั้งหมด"><span class="icon-btn-ic">⧉</span><span class="icon-btn-label">ทำสำเนา</span></button>' +
      '<span class="action-divider"></span>' +
      '<button class="icon-btn" type="button" data-action="exportData" title="ส่งออกข้อมูลทุกเคสเป็นไฟล์สำรอง"><span class="icon-btn-ic">⬇</span><span class="icon-btn-label">ส่งออก</span></button>' +
      '<label class="icon-btn" title="นำเข้าไฟล์ข้อมูลสำรอง"><span class="icon-btn-ic">⬆</span><span class="icon-btn-label">นำเข้า</span><input type="file" id="importFile" accept="application/json" style="display:none"></label>' +
      '</div>' +
      '<div class="case-list">' + ids.map(function (id) {
        var c = STORE.cases[id];
        return '<div class="case-item' + (id === STORE.activeId ? ' active' : '') + '" data-action="selectCase" data-id="' + id + '">' +
          '<input class="case-name-edit" type="text" value="' + esc(c.name) + '" data-path=\'["__rename__","' + id + '"]\' data-type="text">' +
          (id === STORE.activeId ? '<button class="case-del" type="button" data-action="deleteCase" data-id="' + id + '">×</button>' : '') + '</div>';
      }).join('') + '</div>' +
      '<button class="btn btn-warn-outline" type="button" data-action="clearCurrentCase">🧹 ล้างเฉพาะเคสนี้</button>' +
      '<button class="btn btn-danger-outline" type="button" data-action="clearAll">🗑 ล้างข้อมูลทุกเคส</button>' +
      '</aside>';
  }

  function renderTabs() {
    var tabs = [['client', 'ตรวจสุขภาพทางการเงิน'], ['investment', 'การลงทุน'], ['goals', 'เป้าหมาย'], ['assumptions', 'สมมติฐาน'], ['calc', 'การคำนวณ'], ['dashboard', 'แดชบอร์ด']];
    return '<div class="tabs no-print">' + tabs.map(function (tb) {
      return '<button class="tab-btn' + (TAB === tb[0] ? ' active' : '') + '" type="button" data-action="setTab" data-tab="' + tb[0] + '">' + tb[1] + '</button>';
    }).join('') + '</div>';
  }

  function renderClientSummary(a, r, fr) {
    var p = a.personal, asmp = a.assumptions;
    var retGoals = goalsAtRetirementPV(a);
    var otherGoalsTotal = fr.goalsCalc.reduce(function (s, g) { return s + valueAtRetirement(g.futureValueNeeded, g.atAge, p.retireAge, asmp.returnPreRetire, asmp.returnPostRetire); }, 0);
    var eduTotal = fr.educationCalc.reduce(function (s, e) { return s + valueAtRetirement(e.totalNeededAtStart, e.atAge, p.retireAge, asmp.returnPreRetire, asmp.returnPostRetire); }, 0);
    var healthAtRet = valueAtRetirement(r.healthRequiredToday, p.currentAge, p.retireAge, asmp.returnPreRetire, asmp.returnPostRetire);
    var totalNeed = r.netRequiredCorpus + retGoals.total + otherGoalsTotal + eduTotal + healthAtRet;
    var gapVsSurplus = totalNeed - r.availableAtRetirement;
    var lc = fr.lifeInsuranceCalc;
    var name = p.clientName ? esc(p.clientName) : 'ลูกค้า';
    var today = new Date();
    var todayStr = today.getDate() + '/' + (today.getMonth() + 1) + '/' + (today.getFullYear() + 543);

    var actions = [];
    if (gapVsSurplus > 0) actions.push('ออมเพิ่มอย่างน้อย ' + fmt(r.extraSavingFlatMonthly) + ' บาท/เดือน จนถึงวันเกษียณ เพื่อปิดช่องว่างเป้าหมายทางการเงิน');
    if (lc.gap > 0) actions.push('พิจารณาเพิ่มทุนประกันชีวิตอีกประมาณ ' + fmt(lc.gap) + ' บาท เพื่อคุ้มครองความเสี่ยงของครอบครัว');
    if (fr.emergencyCalc && fr.emergencyCalc.gap > 0) actions.push('สำรองเงินฉุกเฉินเพิ่มอีก ' + fmt(fr.emergencyCalc.gap) + ' บาท ให้ครบเป้าหมาย');
    if (!actions.length) actions.push('แผนการเงินโดยรวมอยู่ในเกณฑ์ดี แนะนำให้ทบทวนแผนนี้อย่างน้อยปีละ 1 ครั้ง');

    return '<div class="dash-block client-summary-block">' +
      '<div class="client-summary-header"><div><div class="client-summary-title">สรุปแผนการเงินเพื่อเกษียณ</div><div class="client-summary-sub">จัดทำสำหรับ ' + name + ' — ข้อมูล ณ วันที่ ' + todayStr + '</div></div></div>' +
      '<div class="client-summary-grid">' +
      metricCard('อายุปัจจุบัน / อายุเกษียณที่วางแผน', p.currentAge + ' / ' + p.retireAge + ' ปี', 'navy') +
      metricCard('เงินที่ต้องมีทั้งหมด (รวมทุกเป้าหมาย)', fmt(totalNeed) + ' บาท', 'navy') +
      metricCard('เงินที่เตรียมไว้แล้ว ณ วันนี้', fmt(r.availableAtRetirement) + ' บาท', 'navy') +
      metricCard(gapVsSurplus > 0 ? 'ส่วนที่ยังขาดอยู่' : 'ส่วนที่เกินความจำเป็น', fmt(Math.abs(gapVsSurplus)) + ' บาท', gapVsSurplus > 0 ? 'red' : 'green') +
      '</div>' +
      '<div class="client-summary-actions"><div class="client-summary-actions-title">สิ่งที่ควรทำต่อไป</div><ol>' +
      actions.map(function (a2) { return '<li>' + esc(a2) + '</li>'; }).join('') +
      '</ol></div>' +
      '<div class="entry-note no-print" style="margin-top:10px">กดปุ่ม "ส่งออก PDF" ด้านบนเพื่อพิมพ์หรือส่งสรุปนี้ให้ลูกค้า</div>' +
      '</div>';
  }

  function renderFinancialHealthScore(a, fr, r) {
    var hs = computeFinancialHealthScore(a, fr, r);
    var pct = hs.maxScore > 0 ? hs.totalScore / hs.maxScore : 0;
    var status = pct >= 0.75 ? 'green' : (pct >= 0.5 ? 'yellow' : 'red');
    var statusLabel = status === 'green' ? 'สุขภาพการเงินดี' : (status === 'yellow' ? 'พอใช้ได้ ควรปรับปรุงบางจุด' : 'ควรปรับปรุงหลายจุด');
    var catRows = hs.categories.map(function (c) {
      var cpct = c.max > 0 ? c.score / c.max : 0;
      var cstatus = cpct >= 0.75 ? 'green' : (cpct >= 0.5 ? 'yellow' : 'red');
      return '<div class="score-row">' +
        '<div class="score-row-head"><span class="score-dot score-dot-' + cstatus + '"></span><span class="score-row-label">' + esc(c.label) + '</span><span class="score-row-pts">' + c.score + '/' + c.max + '</span></div>' +
        '<div class="progress-bar-track" style="height:6px"><div class="progress-bar-fill" style="width:' + (cpct * 100) + '%"></div></div>' +
        '<div class="score-row-note">' + esc(c.note) + '</div>' +
        '</div>';
    }).join('');
    var priorityHtml = hs.priorities.length
      ? '<ol class="priority-list">' + hs.priorities.map(function (c) { return '<li>' + esc(c.advice) + '</li>'; }).join('') + '</ol>'
      : '<div class="note">ไม่มีจุดที่ต้องปรับปรุงเร่งด่วน สุขภาพการเงินโดยรวมอยู่ในเกณฑ์ดี</div>';
    return '<div class="health-score-block health-score-' + status + '">' +
      '<div class="health-score-top">' +
      '<div class="health-score-ring">' + hs.totalScore + '<span class="health-score-ring-max">/' + hs.maxScore + '</span></div>' +
      '<div><div class="health-score-title">คะแนนสุขภาพการเงิน</div><div class="health-score-status">' + statusLabel + '</div></div>' +
      '</div>' +
      '<div class="score-grid">' + catRows + '</div>' +
      '<div class="dash-title" style="margin-top:16px">🎯 ลำดับสิ่งที่ควรทำ</div>' + priorityHtml +
      '</div>';
  }

  function renderMain(a, r) {
    var fr = computeFinance(a);
    var filled1 = !!(a.personal.clientName && a.personal.clientName.trim() !== '');
    var filled2 = !!(a.pvd.enabled || a.sso.enabled);
    var filled3 = a.goals.length > 0;
    var filled5 = a.windfalls.length > 0;
    var filled6 = a.healthInsurance.bands.length > 0;
    var clientSections = [
      [1, 'ข้อมูลลูกค้า', '', 'navy', renderPersonal(a, r), filled1, true],
      [104, 'สินทรัพย์', fmt(fr.netWorthCalc.totalAssets) + ' บาท', 'navy', renderAssets(a), a.finance.assets.items.length > 0, true],
      [105, 'หนี้สิน', fmt(fr.netWorthCalc.totalLiabilities) + ' บาท', 'navy', renderLiabilities(a), a.finance.liabilities.items.length > 0, true],
      [102, 'รายได้', fmt(fr.cashFlowCalc.totalIncome) + ' บาท/เดือน', 'navy', renderIncome(a), a.finance.income.items.length > 0, true],
      [103, 'ค่าใช้จ่าย', fmt(fr.cashFlowCalc.totalExpenses) + ' บาท/เดือน', 'navy', renderExpenses(a), a.finance.expenses.regular.items.length > 0, true],
      [120, 'สุขภาพทางการเงิน (งบดุล/กระแสเงินสด/อัตราส่วน CFP)', '', 'green', renderFinancialHealthCheckBox(a, fr), null, true]
    ].filter(function (s) { return s[6]; });
    var goalsSections = [
      [3, 'เป้าหมายเพื่อค่าใช้จ่ายในการเกษียณ (กระทบกองทุนเกษียณโดยตรง)', '', 'navy', renderGoals(a), filled3, true],
      [109, 'เป้าหมายเพื่อค่าใช้จ่ายอื่นๆ', '', 'navy', renderFinanceGoalsInput(a), a.finance.goals.items.length > 0, true],
      [5, 'เงินก้อน/เงินได้ระหว่างทาง (รวมบำนาญประกันชีวิต)', '', 'navy', renderWindfalls(a), filled5, true],
      [6, 'เตรียมเงินสำหรับเบี้ยประกันสุขภาพ', '', 'navy', renderHealthInsuranceInput(a, r), filled6, true],
      [110, 'การศึกษาบุตร', '', 'navy', renderFinanceEducationInput(a), a.finance.education.children.length > 0, true],
      [113, 'ประกันและการบริหารความเสี่ยง', '', 'navy', renderInsurance(a, fr), (a.finance.insurance.life.existingCoverage > 0 || a.finance.insurance.otherPolicies.items.length > 0), true]
    ].filter(function (s) { return s[6]; });
    var investmentSections = [
      [112, 'การลงทุน (Asset Allocation & Risk)', '', 'navy', renderInvestment(a, fr), (a.finance.investment.currentInvestments.items.length > 0 || a.finance.investment.recurringInvestments.items.length > 0), true]
    ].filter(function (s) { return s[6]; });
    var assumptionsSections = [
      [130, 'สมมติฐานการวางแผน', '', 'navy', renderAssumptions(a), true, true]
    ].filter(function (s) { return s[6]; });
    var calcSections = [
      [201, 'เงินที่ต้องมีตามเป้าหมาย', '', 'green', renderCalcBox1(a, r, fr), false, true],
      [202, 'เงินที่เตรียมไว้แล้ว', fmt(r.availableAtRetirement) + ' บาท', 'green', renderCalcBox2(a, r), false, true],
      [203, 'ส่วนที่ขาด/เกิน', '', 'green', renderCalcBox3(a, r, fr), false, true],
      [204, 'ทางเลือกในการใช้เงิน', '', 'green', renderCalcBox4(a, r), false, true],
      [205, 'ออมเพิ่มเพื่อให้ถึงเป้าหมาย', '', 'green', renderCalcBox5(a, r), false, true],
      [206, 'ช่องว่างความคุ้มครอง (ประกันชีวิต/ความเสี่ยง)', '', 'green', renderCalcBox6(a, fr), false, true]
    ].filter(function (s) { return s[6]; });
    function sectionsHtml(list) { return '<div class="sections">' + list.map(function (s) { return sectionWrap(s[0], s[1], s[2], s[3], !!OPEN[s[0]], s[4], s[5]); }).join('') + '</div>'; }
    var dashHtml = '<div class="dashboard">' +
      renderClientSummary(a, r, fr) +
      renderFinancialHealthScore(a, fr, r) +
      renderPlanHealth(a, r) +
      renderStorySummary(a, r) +
      renderSummaryBar(r) + renderCharts(r) +
      '<div class="dash-block"><div class="dash-title">ไทม์ไลน์เหตุการณ์สำคัญ</div>' + renderTimeline(r, a.personal) + '</div>' +
      renderScenarioComparison(a, r) +
      renderComparison(a, r) +
      '</div>';
    var progressEligible = clientSections.filter(function (s) { return s[5] !== null; });
    var filledCount = progressEligible.filter(function (s) { return s[5]; }).length;
    var totalCount = progressEligible.length;
    var progressPct = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;
    var progressHtml = '<div class="progress-box"><div class="progress-box-text">กรอกข้อมูลไปแล้ว <strong>' + filledCount + '/' + totalCount + '</strong> หัวข้อ</div>' +
      '<div class="progress-bar-track"><div class="progress-bar-fill" style="width:' + progressPct + '%"></div></div></div>';
    var body = TAB === 'client' ? (progressHtml + sectionsHtml(clientSections)) : (TAB === 'investment' ? sectionsHtml(investmentSections) : (TAB === 'goals' ? sectionsHtml(goalsSections) : (TAB === 'assumptions' ? sectionsHtml(assumptionsSections) : (TAB === 'calc' ? sectionsHtml(calcSections) : dashHtml))));
    return '<main class="main">' +
      '<div class="header no-print">' +
      '<input class="case-name-input" type="text" data-path=\'["name"]\' data-type="text" value="' + esc(a.name) + '">' +
      '<span class="app-version-badge">' + esc(APP_VERSION) + '</span>' +
      '<button class="btn btn-primary" type="button" data-action="printPdf">ส่งออก PDF</button>' +
      '</div>' +
      renderTabs() + body +
      '<div class="print-only">' + renderPrintReport(a, r) + '</div>' +
      '</main>';
  }

  function render() {
    try {
      var focusInfo = captureFocus();
      var a = activeCase();
      var r = computeAll(a);
      document.getElementById('root').innerHTML = renderSidebar() + renderMain(a, r);
      restoreFocus(focusInfo);
    } catch (err) {
      document.getElementById('root').innerHTML =
        '<div style="max-width:520px;margin:60px auto;padding:24px;font-family:Sarabun,sans-serif;background:#FFFFFF;border:1px solid #CBDAEA;border-radius:10px;">' +
        '<h2 style="color:#0B2545;margin-top:0;">เกิดข้อผิดพลาดในการแสดงผล</h2>' +
        '<p style="color:#3B4A5A;font-size:14px;">ข้อมูลที่บันทึกไว้อาจมีปัญหา ลองกดปุ่มด้านล่างเพื่อล้างข้อมูลและเริ่มใหม่ (ข้อมูลเดิมจะหายไป) หรือส่งข้อความรายละเอียดด้านล่างนี้กลับมาแจ้งได้</p>' +
        '<p style="color:#A8382E;font-size:12px;background:#FBEAE8;padding:8px;border-radius:6px;word-break:break-all;">' + esc(err.message) + '</p>' +
        '<button type="button" style="background:#A8382E;color:white;border:none;border-radius:8px;padding:10px 16px;font-family:inherit;font-weight:700;cursor:pointer;" onclick="localStorage.removeItem(\'retirementPlannerCases_v2\'); location.reload();">ล้างข้อมูลและเริ่มใหม่</button>' +
        '</div>';
    }
  }

  function digitsBefore(str, pos) { return str.slice(0, pos).replace(/[^\d]/g, '').length; }
  function captureFocus() {
    var el = document.activeElement;
    if (!el || !el.dataset || !el.dataset.path) return null;
    if (el.tagName === 'SELECT') return null; /* never restore focus to a <select> — re-focusing it can reopen the native picker on mobile */
    var info = { path: el.dataset.path, type: el.dataset.type };
    if (el.dataset.type === 'money') info.digits = digitsBefore(el.value, el.selectionStart);
    else if (el.dataset.type === 'number' || el.dataset.type === 'percent') {
      info.rawValue = el.value;
      if (typeof el.selectionStart === 'number') { info.start = el.selectionStart; info.end = el.selectionEnd; }
    } else if (typeof el.selectionStart === 'number') { info.start = el.selectionStart; info.end = el.selectionEnd; }
    return info;
  }
  var programmaticFocus = false;
  function restoreFocus(info) {
    if (!info) return;
    var els = document.querySelectorAll('[data-path]');
    for (var i = 0; i < els.length; i++) {
      if (els[i].dataset.path === info.path) {
        programmaticFocus = true;
        els[i].focus();
        programmaticFocus = false;
        if (info.type === 'money') {
          var pos = 0, count = 0, v = els[i].value;
          while (pos < v.length && count < info.digits) { if (/\d/.test(v[pos])) count++; pos++; }
          try { els[i].setSelectionRange(pos, pos); } catch (e) {}
        } else if (info.type === 'number' || info.type === 'percent') {
          if (info.rawValue !== undefined) els[i].value = info.rawValue;
          if (info.start !== undefined) { try { els[i].setSelectionRange(info.start, info.end); } catch (e) {} }
        } else if (info.start !== undefined && els[i].setSelectionRange) {
          try { els[i].setSelectionRange(info.start, info.end); } catch (e) {}
        }
        break;
      }
    }
  }

  /* ================= EVENT DELEGATION ================= */
  var root = document.getElementById('root');

  root.addEventListener('input', function (e) {
    var t = e.target;
    if (!t.dataset || !t.dataset.path) return;
    if (t.dataset.type === 'radio' || t.dataset.type === 'checkbox' || t.dataset.type === 'select') return;
    var path = JSON.parse(t.dataset.path);
    if (path[0] === '__rename__') { STORE.cases[path[1]].name = t.value; saveStore(); render(); return; }
    var a = activeCase();
    var val;
    if (t.dataset.type === 'number') val = parseFloat(t.value) || 0;
    else if (t.dataset.type === 'percent') val = (parseFloat(t.value) || 0) / 100;
    else if (t.dataset.type === 'money') val = parseInt(String(t.value).replace(/[^\d]/g, ''), 10) || 0;
    else val = t.value;
    if (path[0] === 'name') a.name = val;
    else if (path[0] === 'personal' && path[1] === 'currentYearADasBE') a.personal.currentYearAD = (parseFloat(t.value) || 0) - 543;
    else setPath(a, path, val);
    if (path[0] === 'healthInsurance' && path[1] === 'bands' && (path[3] === 'fromAge' || path[3] === 'toAge')) cascadeHealthBands(a, path[2]);
    saveStore(); render();
  });

  root.addEventListener('change', function (e) {
    var t = e.target;
    var a = activeCase();
    if (t.id === 'importFile') { handleImportFile(t); return; }
    if (t.dataset && t.dataset.action === 'setCompareId') { COMPARE_ID = t.value || null; render(); return; }
    if (t.dataset && t.dataset.type === 'select') { setPath(a, JSON.parse(t.dataset.path), t.value); saveStore(); render(); return; }
    if (t.dataset && t.dataset.type === 'checkbox') { setPath(a, JSON.parse(t.dataset.path), t.checked); saveStore(); render(); return; }
    if (t.dataset && t.dataset.type === 'radio') { setPath(a, JSON.parse(t.dataset.path), t.dataset.radioValue); saveStore(); render(); return; }
  });

  function handleImportFile(input) {
    var file = input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      try {
        var imported = JSON.parse(ev.target.result);
        if (imported && imported.cases) {
          Object.keys(imported.cases).forEach(function (id) { STORE.cases[id] = normalizeCase(imported.cases[id]); });
          STORE.activeId = (imported.activeId && STORE.cases[imported.activeId]) ? imported.activeId : STORE.activeId;
          saveStore(); render();
        }
      } catch (e) { alert('ไฟล์ไม่ถูกต้อง'); }
    };
    reader.readAsText(file);
  }

  root.addEventListener('click', function (e) {
    var t = e.target.closest('[data-action]');
    if (!t) return;
    var action = t.dataset.action;
    var a = activeCase();
    if (action === 'toggleSection') { OPEN[t.dataset.num] = !OPEN[t.dataset.num]; render(); }
    else if (action === 'setTab') { TAB = t.dataset.tab; render(); }
    else if (action === 'selectCase') { STORE.activeId = t.dataset.id; if (COMPARE_ID === t.dataset.id) COMPARE_ID = null; saveStore(); render(); }
    else if (action === 'deleteCase') {
      e.stopPropagation();
      if (Object.keys(STORE.cases).length <= 1) return;
      delete STORE.cases[t.dataset.id];
      if (STORE.activeId === t.dataset.id) STORE.activeId = Object.keys(STORE.cases)[0];
      if (COMPARE_ID === t.dataset.id) COMPARE_ID = null;
      saveStore(); render();
    }
    else if (action === 'addCase') { var c = newCase('ลูกค้ารายที่ ' + (Object.keys(STORE.cases).length + 1)); STORE.cases[c.id] = c; STORE.activeId = c.id; saveStore(); render(); }
    else if (action === 'duplicateCase') { var d = clone(a); d.id = uid(); d.name = a.name + ' (สำเนา)'; STORE.cases[d.id] = d; STORE.activeId = d.id; saveStore(); render(); }
    else if (action === 'exportData') {
      var blob = new Blob([JSON.stringify(STORE, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url; link.download = 'retirement-planner-backup.json'; link.click();
      URL.revokeObjectURL(url);
    }
    else if (action === 'printPdf') { window.print(); }
    else if (action === 'addSegment') { a.preRetirementPortfolio.segments.push({ id: uid(), fromAge: a.personal.currentAge, toAge: a.personal.retireAge, returnRate: 0.05 }); saveStore(); render(); }
    else if (action === 'delSegment') { a.preRetirementPortfolio.segments.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'addTier') { a.pvd.employerTiers.push({ minYears: 0, employerRate: 0.03 }); saveStore(); render(); }
    else if (action === 'delTier') { a.pvd.employerTiers.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'addGoalLumpsum') { a.goals.push({ id: uid(), name: 'เป้าหมายใหม่', startAge: a.personal.currentAge + 5, endAge: a.personal.currentAge + 5, amountToday: 100000, returnRate: 0.05 }); saveStore(); render(); }
    else if (action === 'delGoal') { a.goals.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'addWindfallLump') { a.windfalls.push({ id: uid(), description: 'เงินก้อนใหม่', flowType: 'lumpsum', amount: 100000, ageReceived: a.personal.retireAge, frequency: 'annual', amountPerPeriod: 10000, startAge: a.personal.retireAge, endAge: a.personal.retireAge + 4 }); saveStore(); render(); }
    else if (action === 'addWindfallRecurring') { a.windfalls.push({ id: uid(), description: 'เงินรายงวดใหม่', flowType: 'recurring', amount: 100000, ageReceived: a.personal.retireAge, frequency: 'annual', amountPerPeriod: 10000, startAge: a.personal.retireAge, endAge: a.personal.lifeExpectancy, growthRate: 0, growthFrequency: 'annual' }); saveStore(); render(); }
    else if (action === 'delWindfall') { a.windfalls.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'addHealthBand') {
      var lastBand = a.healthInsurance.bands[a.healthInsurance.bands.length - 1];
      var firstBand = a.healthInsurance.bands[0];
      var bandLen = firstBand ? Math.max(1, firstBand.toAge - firstBand.fromAge) : 4;
      var fromAge = lastBand ? lastBand.toAge + 1 : a.personal.retireAge;
      a.healthInsurance.bands.push({ id: uid(), fromAge: fromAge, toAge: fromAge + bandLen, annualPremiumToday: lastBand ? lastBand.annualPremiumToday : 30000 });
      saveStore(); render();
    }
    else if (action === 'delHealthBand') { a.healthInsurance.bands.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'addBucket') {
      var lastB = a.buckets.list[a.buckets.list.length - 1];
      var half = lastB ? Math.max(1, Math.round(lastB.years / 2)) : 10;
      if (lastB) lastB.years = half;
      a.buckets.list.push({ id: uid(), label: 'บัคเก็ตที่ ' + (a.buckets.list.length + 1), years: half, waitingReturn: 0.05, drawdownReturn: 0.03 });
      saveStore(); render();
    }
    else if (action === 'delBucket') { if (a.buckets.list.length > 1) { a.buckets.list.splice(+t.dataset.index, 1); saveStore(); render(); } }
    else if (action === 'addIncomeItem') { a.finance.income.items.push({ id: uid(), frequency: 'monthly', category: 'รายได้ใหม่', amount: 0, growthRate: 0.03, adjustFrequencyYears: 1 }); saveStore(); render(); }
    else if (action === 'delIncomeItem') { a.finance.income.items.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'addExpenseRegular') { a.finance.expenses.regular.items.push({ id: uid(), expenseType: 'fixed', category: 'ค่าใช้จ่ายใหม่', amount: 0, frequency: 'monthly' }); saveStore(); render(); }
    else if (action === 'delExpenseRegular') { a.finance.expenses.regular.items.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'addAsset') { a.finance.assets.items.push({ id: uid(), mainCategory: 'liquid', name: '', value: 0 }); saveStore(); render(); }
    else if (action === 'delAsset') { a.finance.assets.items.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'addLiability') { a.finance.liabilities.items.push({ id: uid(), mainCategory: 'shortterm', name: '', balance: 0, interestRate: 0.05, monthlyPayment: 0, remainingMonths: 12 }); saveStore(); render(); }
    else if (action === 'delLiability') { a.finance.liabilities.items.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'addFinanceGoal') { a.finance.goals.items.push({ id: uid(), name: 'เป้าหมายใหม่', amountToday: 100000, startAge: a.personal.currentAge + 5, endAge: a.personal.currentAge + 5, frequency: 'once' }); saveStore(); render(); }
    else if (action === 'delFinanceGoal') { a.finance.goals.items.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'addEducationChild') { a.finance.education.children.push({ id: uid(), childName: 'บุตรคนใหม่', childCurrentAge: 5, items: [{ id: uid(), level: 'prathom1_3', annualCostToday: 30000, inflationRate: a.assumptions.educationInflation }] }); saveStore(); render(); }
    else if (action === 'delEducationChild') { a.finance.education.children.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'addEducationLevel') { a.finance.education.children[+t.dataset.childIndex].items.push({ id: uid(), level: 'prathom1_3', annualCostToday: 30000, inflationRate: a.assumptions.educationInflation }); saveStore(); render(); }
    else if (action === 'delEducationLevel') { a.finance.education.children[+t.dataset.childIndex].items.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'addMajorPurchase') { a.finance.majorPurchases.items.push({ id: uid(), name: 'รายการใหม่', price: 1000000, downPaymentPercent: 0.1, interestRate: 0.05, loanTermYears: 20, extraCosts: 20000 }); saveStore(); render(); }
    else if (action === 'delMajorPurchase') { a.finance.majorPurchases.items.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'setRiskPreset') {
      var presets = { conservative: { cash: 0.4, bonds: 0.4, stocks: 0.15, alternatives: 0.05 }, moderate: { cash: 0.15, bonds: 0.35, stocks: 0.4, alternatives: 0.1 }, aggressive: { cash: 0.05, bonds: 0.15, stocks: 0.65, alternatives: 0.15 } };
      a.finance.investment.allocation = Object.assign({}, presets[t.dataset.key]);
      a.finance.investment.riskLevel = t.dataset.key;
      saveStore(); render();
    }
    else if (action === 'addCurrentInvestment') { a.finance.investment.currentInvestments.items.push({ id: uid(), type: 'การลงทุนใหม่', amount: 0, returnRate: 0.05 }); saveStore(); render(); }
    else if (action === 'delCurrentInvestment') { a.finance.investment.currentInvestments.items.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'addRecurringInvestment') { a.finance.investment.recurringInvestments.items.push({ id: uid(), type: 'การลงทุนใหม่', frequency: 'monthly', amount: 0, returnRate: 0.05 }); saveStore(); render(); }
    else if (action === 'delRecurringInvestment') { a.finance.investment.recurringInvestments.items.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'syncCurrentInvestments') {
      var srcAssets = a.finance.assets.items.filter(function (it) { return it.mainCategory === 'investment'; });
      srcAssets.forEach(function (asset) {
        var existing = a.finance.investment.currentInvestments.items.filter(function (it) { return it.type === asset.name; })[0];
        if (existing) existing.amount = asset.value;
        else a.finance.investment.currentInvestments.items.push({ id: uid(), type: asset.name, amount: asset.value, returnRate: 0.05 });
      });
      saveStore(); render();
    }
    else if (action === 'syncRecurringInvestments') {
      var srcExpenses = a.finance.expenses.regular.items.filter(function (it) { return it.expenseType === 'savingsInvestment'; });
      srcExpenses.forEach(function (exp) {
        var existing = a.finance.investment.recurringInvestments.items.filter(function (it) { return it.type === exp.category; })[0];
        if (existing) { existing.amount = exp.amount; existing.frequency = exp.frequency; }
        else a.finance.investment.recurringInvestments.items.push({ id: uid(), type: exp.category, frequency: exp.frequency, amount: exp.amount, returnRate: 0.05 });
      });
      saveStore(); render();
    }
    else if (action === 'addOtherPolicy') { a.finance.insurance.otherPolicies.items.push({ id: uid(), type: 'กรมธรรม์ใหม่', currentCoverage: 0, recommendedCoverage: 0 }); saveStore(); render(); }
    else if (action === 'delOtherPolicy') { a.finance.insurance.otherPolicies.items.splice(+t.dataset.index, 1); saveStore(); render(); }
    else if (action === 'clearCurrentCase') {
      if (window.confirm('ล้างข้อมูลเฉพาะเคส "' + a.name + '" เคสเดียว? เคสลูกค้ารายอื่นจะไม่ถูกแตะต้อง การกระทำนี้ไม่สามารถย้อนกลับได้')) {
        var blankCase = newCase(a.name, true);
        blankCase.id = STORE.activeId;
        STORE.cases[STORE.activeId] = blankCase;
        OPEN = { 1: true }; TAB = 'client';
        saveStore(); render();
      }
    }
    else if (action === 'clearAll') {
      var caseCount = Object.keys(STORE.cases).length;
      if (window.confirm('ล้างข้อมูลลูกค้าทุกราย (ทั้งหมด ' + caseCount + ' ราย) และเริ่มใหม่หมด? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
        var nc = newCase('ลูกค้ารายที่ 1', true);
        STORE = { activeId: nc.id, cases: {} };
        STORE.cases[nc.id] = nc;
        OPEN = { 1: true }; TAB = 'client';
        saveStore(); render();
      }
    }
  });

  /* tap-to-select-all + Enter-to-next-field, for faster mobile data entry */
  root.addEventListener('focusin', function (e) {
    if (programmaticFocus) return;
    var t = e.target;
    if (t.tagName === 'INPUT' && t.dataset && t.dataset.path && (t.type === 'text' || t.type === 'number')) {
      try { t.select(); } catch (e2) {}
    }
  });
  root.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var t = e.target;
    if (t.tagName !== 'INPUT' || !t.dataset || !t.dataset.path) return;
    e.preventDefault();
    var focusables = Array.prototype.slice.call(root.querySelectorAll('input[data-path], select[data-path]'))
      .filter(function (el) { return el.offsetParent !== null && !el.disabled; });
    var idx = focusables.indexOf(t);
    if (idx >= 0 && idx < focusables.length - 1) focusables[idx + 1].focus();
    else t.blur();
  });

  render();
})();
