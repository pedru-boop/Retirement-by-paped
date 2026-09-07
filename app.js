/* global React, ReactDOM, Chart */
(function () {
  'use strict';
  var E = React.createElement;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useMemo = React.useMemo;
  var useRef = React.useRef;

  /* ---------------- utils ---------------- */
  function uid() { return Math.random().toString(36).slice(2, 10); }
  function fmt(n) {
    if (n === null || n === undefined || isNaN(n)) return '-';
    return Math.round(n).toLocaleString('th-TH');
  }
  function fmtSigned(n) {
    var s = fmt(Math.abs(n));
    return (n < 0 ? '-' : '') + s;
  }
  function pct(n) { return (n * 100).toFixed(2).replace(/\.00$/, ''); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function setIn(obj, path, value) {
    var next = clone(obj);
    var cur = next;
    for (var i = 0; i < path.length - 1; i++) cur = cur[path[i]];
    cur[path[path.length - 1]] = value;
    return next;
  }

  /* ---------------- default case ---------------- */
  function newCase(name) {
    var thisYear = new Date().getFullYear();
    return {
      id: uid(),
      name: name || 'ลูกค้าใหม่',
      personal: {
        clientName: '', currentAge: 35, retireAge: 60, lifeExpectancy: 85,
        currentYearAD: thisYear, currentSalary: 30000, salaryGrowth: 0.03,
        spendingMethod: 'replacement', replacementRate: 0.7, customMonthlyExpense: 25000,
        inflation: 0.03, postReturn: 0.04
      },
      pvd: {
        enabled: true, label: 'กองทุนสำรองเลี้ยงชีพ', employeeRate: 0.03,
        employerMode: 'flat', employerFlatRate: 0.03,
        employerTiers: [
          { minYears: 0, employerRate: 0.03 },
          { minYears: 5, employerRate: 0.05 },
          { minYears: 10, employerRate: 0.07 }
        ],
        fundReturn: 0.04, startingBalance: 0, serviceYearsSoFar: 3
      },
      sso: { enabled: true, avgWageCapped: 15000, monthsPaidSoFar: 60 },
      severance: { enabled: true },
      goals: [],
      currentSavings: { amount: 300000, returnRate: 0.05 },
      regularSavings: { amount: 5000, frequency: 'monthly', returnRate: 0.05, timing: 'end' },
      windfalls: [],
      extraSavingMode: 'flat',
      extraSavingReturn: 0.05,
      buckets: {
        mode: 'single',
        splits: [{ years: null, amountPct: 100, returnRate: 0.04 }]
      }
    };
  }

  /* ---------------- storage ---------------- */
  var STORE_KEY = 'retirementPlannerCases_v1';
  function loadStore() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }
  function saveStore(store) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) {}
  }

  /* ---------------- small UI atoms ---------------- */
  function Field(props) {
    var label = props.label, value = props.value, onChange = props.onChange,
        type = props.type || 'number', suffix = props.suffix, step = props.step,
        hint = props.hint, options = props.options;
    var input;
    if (type === 'select') {
      input = E('select', {
        className: 'inp', value: value,
        onChange: function (e) { onChange(e.target.value); }
      }, options.map(function (o) {
        return E('option', { key: o.value, value: o.value }, o.label);
      }));
    } else if (type === 'text') {
      input = E('input', {
        className: 'inp', type: 'text', value: value,
        onChange: function (e) { onChange(e.target.value); }
      });
    } else if (type === 'percent') {
      input = E('input', {
        className: 'inp', type: 'number', step: step || '0.1',
        value: value * 100,
        onChange: function (e) { onChange((parseFloat(e.target.value) || 0) / 100); }
      });
    } else {
      input = E('input', {
        className: 'inp', type: 'number', step: step || '1',
        value: value,
        onChange: function (e) { onChange(parseFloat(e.target.value) || 0); }
      });
    }
    return E('label', { className: 'field' },
      E('span', { className: 'field-label' }, label),
      E('div', { className: 'field-input-row' },
        input,
        suffix ? E('span', { className: 'field-suffix' }, suffix) : null
      ),
      hint ? E('span', { className: 'field-hint' }, hint) : null
    );
  }

  function Section(props) {
    var num = props.num, title = props.title, subtitle = props.subtitle,
        open = props.open, onToggle = props.onToggle, children = props.children, tone = props.tone || 'navy';
    return E('div', { className: 'section tone-' + tone + (open ? ' open' : '') },
      E('button', { className: 'section-head', onClick: onToggle, type: 'button' },
        E('span', { className: 'section-num' }, num),
        E('span', { className: 'section-title-wrap' },
          E('span', { className: 'section-title' }, title),
          subtitle ? E('span', { className: 'section-subtitle' }, subtitle) : null
        ),
        E('span', { className: 'section-chevron' }, open ? '−' : '+')
      ),
      open ? E('div', { className: 'section-body' }, children) : null
    );
  }

  function MetricCard(props) {
    return E('div', { className: 'metric-card tone-' + (props.tone || 'navy') },
      E('div', { className: 'metric-label' }, props.label),
      E('div', { className: 'metric-value' }, props.value),
      props.sub ? E('div', { className: 'metric-sub' }, props.sub) : null
    );
  }

  /* ---------------- App ---------------- */
  function App() {
    var storeState = useState(function () {
      var store = loadStore();
      if (!store || !store.cases || !Object.keys(store.cases).length) {
        var c = newCase('ลูกค้ารายที่ 1');
        store = { activeId: c.id, cases: {} };
        store.cases[c.id] = c;
      }
      return store;
    });
    var store = storeState[0], setStore = storeState[1];

    useEffect(function () { saveStore(store); }, [store]);

    var active = store.cases[store.activeId];

    function updateActive(path, value) {
      setStore(function (s) {
        var nextCase = setIn(s.cases[s.activeId], path, value);
        var nextCases = Object.assign({}, s.cases);
        nextCases[s.activeId] = nextCase;
        return Object.assign({}, s, { cases: nextCases });
      });
    }
    function replaceActive(nextCaseData) {
      setStore(function (s) {
        var nextCases = Object.assign({}, s.cases);
        nextCases[s.activeId] = nextCaseData;
        return Object.assign({}, s, { cases: nextCases });
      });
    }
    function addCase() {
      var c = newCase('ลูกค้ารายที่ ' + (Object.keys(store.cases).length + 1));
      setStore(function (s) {
        var nextCases = Object.assign({}, s.cases);
        nextCases[c.id] = c;
        return { activeId: c.id, cases: nextCases };
      });
    }
    function duplicateCase() {
      var c = clone(active);
      c.id = uid();
      c.name = active.name + ' (สำเนา)';
      setStore(function (s) {
        var nextCases = Object.assign({}, s.cases);
        nextCases[c.id] = c;
        return { activeId: c.id, cases: nextCases };
      });
    }
    function deleteCase(id) {
      if (Object.keys(store.cases).length <= 1) return;
      setStore(function (s) {
        var nextCases = Object.assign({}, s.cases);
        delete nextCases[id];
        var nextActive = s.activeId === id ? Object.keys(nextCases)[0] : s.activeId;
        return { activeId: nextActive, cases: nextCases };
      });
    }
    function selectCase(id) {
      setStore(function (s) { return Object.assign({}, s, { activeId: id }); });
    }

    var openState = useState({ 1: true });
    var openSections = openState[0], setOpenSections = openState[1];
    function toggleSection(n) {
      setOpenSections(function (o) {
        var next = Object.assign({}, o);
        next[n] = !next[n];
        return next;
      });
    }

    var results = useMemo(function () { return computeAll(active); }, [active]);

    return E('div', { className: 'app' },
      E(Sidebar, {
        cases: store.cases, activeId: store.activeId,
        onSelect: selectCase, onAdd: addCase, onDuplicate: duplicateCase, onDelete: deleteCase
      }),
      E('main', { className: 'main' },
        E(Header, { active: active, updateActive: updateActive }),
        E(SummaryBar, { results: results }),
        E(ChartsPanel, { active: active, results: results }),
        E('div', { className: 'sections' },
          E(Section, {
            num: 1, title: 'ข้อมูลผู้รับการวางแผน', tone: 'navy',
            open: !!openSections[1], onToggle: function () { toggleSection(1); }
          }, E(PersonalSection, { data: active.personal, update: updateActive })),

          E(Section, {
            num: 2, title: 'เงินที่ต้องใช้เดือนแรกหลังเกษียณ', tone: 'green',
            subtitle: fmt(results.firstYearMonthlyNeed) + ' บาท/เดือน (มูลค่า ณ ปีเกษียณ)',
            open: !!openSections[2], onToggle: function () { toggleSection(2); }
          }, E(NeedSummary, { active: active, results: results })),

          E(Section, {
            num: 3, title: 'กองทุนสำรองเลี้ยงชีพ / กบข. และประกันสังคม', tone: 'navy',
            open: !!openSections[3], onToggle: function () { toggleSection(3); }
          }, E(PensionSection, { data: active, update: updateActive })),

          E(Section, {
            num: 4, title: 'เงินชดเชยตามกฎหมายแรงงานเมื่อออกจากงาน', tone: 'navy',
            subtitle: results.severance ? fmt(results.severance.amount) + ' บาท' : '',
            open: !!openSections[4], onToggle: function () { toggleSection(4); }
          }, E(SeveranceSection, { active: active, results: results })),

          E(Section, {
            num: 5, title: 'เป้าหมายระยะสั้น / กลาง / ยาว', tone: 'navy',
            open: !!openSections[5], onToggle: function () { toggleSection(5); }
          }, E(GoalsSection, { active: active, update: updateActive, replaceActive: replaceActive })),

          E(Section, {
            num: 6, title: 'เงินออม/เงินลงทุนปัจจุบัน', tone: 'navy',
            open: !!openSections[6], onToggle: function () { toggleSection(6); }
          }, E(CurrentSavingsSection, { data: active.currentSavings, update: updateActive })),

          E(Section, {
            num: 7, title: 'เงินออมประจำ (รายเดือน/รายปี)', tone: 'navy',
            open: !!openSections[7], onToggle: function () { toggleSection(7); }
          }, E(RegularSavingsSection, { data: active.regularSavings, update: updateActive })),

          E(Section, {
            num: 8, title: 'เงินก้อนระหว่างทาง (ประกันชีวิต / ขายสินทรัพย์ ฯลฯ)', tone: 'navy',
            open: !!openSections[8], onToggle: function () { toggleSection(8); }
          }, E(WindfallsSection, { active: active, update: updateActive, replaceActive: replaceActive })),

          E(Section, {
            num: 9, title: 'สรุปกองทุนที่ต้องมี ณ วันเกษียณ และส่วนที่ขาด', tone: 'green',
            open: !!openSections[9], onToggle: function () { toggleSection(9); }
          }, E(GapSection, { active: active, update: updateActive, results: results })),

          E(Section, {
            num: 10, title: 'ถ้าไม่ออมเพิ่ม — จะใช้เงินได้เท่าไหร่/ถึงอายุเท่าไหร่', tone: 'green',
            open: !!openSections[10], onToggle: function () { toggleSection(10); }
          }, E(NoExtraSection, { results: results })),

          E(Section, {
            num: 11, title: 'การบริหารเงินหลังเกษียณ (พอร์ตเดียว / 3 บัคเก็ต)', tone: 'green',
            open: !!openSections[11], onToggle: function () { toggleSection(11); }
          }, E(BucketsSection, { active: active, update: updateActive, results: results }))
        ),
        E('div', { className: 'print-only' }, E(PrintReport, { active: active, results: results }))
      )
    );
  }

  /* ---------------- Sidebar ---------------- */
  function Sidebar(props) {
    var cases = props.cases, activeId = props.activeId;
    var ids = Object.keys(cases);
    return E('aside', { className: 'sidebar no-print' },
      E('div', { className: 'brand' },
        E('div', { className: 'brand-mark' }, 'RP'),
        E('div', null,
          E('div', { className: 'brand-title' }, 'แผนเกษียณ'),
          E('div', { className: 'brand-sub' }, 'Retirement Planning Tool')
        )
      ),
      E('div', { className: 'case-list' },
        ids.map(function (id) {
          var c = cases[id];
          return E('div', {
            key: id,
            className: 'case-item' + (id === activeId ? ' active' : ''),
            onClick: function () { props.onSelect(id); }
          },
            E('span', { className: 'case-name' }, c.name),
            id === activeId ? E('button', {
              className: 'case-del', title: 'ลบเคสนี้', type: 'button',
              onClick: function (e) { e.stopPropagation(); props.onDelete(id); }
            }, '×') : null
          );
        })
      ),
      E('div', { className: 'sidebar-actions' },
        E('button', { className: 'btn btn-ghost', type: 'button', onClick: props.onAdd }, '+ เคสใหม่'),
        E('button', { className: 'btn btn-ghost', type: 'button', onClick: props.onDuplicate }, 'ทำสำเนาเคสนี้')
      )
    );
  }

  /* ---------------- Header ---------------- */
  function Header(props) {
    var active = props.active;
    return E('div', { className: 'header no-print' },
      E('input', {
        className: 'case-name-input', type: 'text', value: active.name,
        onChange: function (e) { props.updateActive(['name'], e.target.value); }
      }),
      E('button', { className: 'btn btn-primary', type: 'button', onClick: function () { window.print(); } }, 'ส่งออก PDF')
    );
  }

  /* ---------------- Section 1: Personal ---------------- */
  function PersonalSection(props) {
    var d = props.data, u = props.update;
    function set(key, val) { u(['personal', key], val); }
    var beRetire = d.currentYearAD + 543 + (d.retireAge - d.currentAge);
    var beLife = d.currentYearAD + 543 + (d.lifeExpectancy - d.currentAge);
    return E('div', null,
      E('div', { className: 'grid-2' },
        E(Field, { label: 'ชื่อลูกค้า', type: 'text', value: d.clientName, onChange: function (v) { set('clientName', v); } }),
        E(Field, { label: 'ปี พ.ศ. ปัจจุบัน', value: d.currentYearAD + 543, onChange: function (v) { set('currentYearAD', v - 543); } }),
        E(Field, { label: 'อายุปัจจุบัน', value: d.currentAge, suffix: 'ปี', onChange: function (v) { set('currentAge', v); } }),
        E(Field, { label: 'อายุที่คาดว่าจะเกษียณ', value: d.retireAge, suffix: 'ปี', onChange: function (v) { set('retireAge', v); },
          hint: 'จะครบเกษียณปี พ.ศ. ' + beRetire }),
        E(Field, { label: 'อายุขัย (คาดการณ์)', value: d.lifeExpectancy, suffix: 'ปี', onChange: function (v) { set('lifeExpectancy', v); },
          hint: 'สิ้นสุดแผนปี พ.ศ. ' + beLife }),
        E(Field, { label: 'เงินเดือนปัจจุบัน', value: d.currentSalary, suffix: 'บาท/เดือน', onChange: function (v) { set('currentSalary', v); } }),
        E(Field, { label: 'อัตราการขึ้นเงินเดือนเฉลี่ย', type: 'percent', value: d.salaryGrowth, suffix: '%/ปี', onChange: function (v) { set('salaryGrowth', v); } }),
        E(Field, { label: 'อัตราเงินเฟ้อที่ใช้วางแผน', type: 'percent', value: d.inflation, suffix: '%/ปี', onChange: function (v) { set('inflation', v); } }),
        E(Field, { label: 'ผลตอบแทนเฉลี่ยหลังเกษียณ', type: 'percent', value: d.postReturn, suffix: '%/ปี', onChange: function (v) { set('postReturn', v); },
          hint: 'ใช้คำนวณกองทุนที่ต้องมี ณ วันเกษียณ' })
      ),
      E('div', { className: 'subblock' },
        E('div', { className: 'subblock-title' }, 'ต้องการใช้เงินหลังเกษียณแบบไหน'),
        E('div', { className: 'radio-row' },
          E('label', { className: 'radio' },
            E('input', { type: 'radio', checked: d.spendingMethod === 'replacement', onChange: function () { set('spendingMethod', 'replacement'); } }),
            ' Replacement Ratio จากเงินเดือนเดือนสุดท้าย'),
          E('label', { className: 'radio' },
            E('input', { type: 'radio', checked: d.spendingMethod === 'custom', onChange: function () { set('spendingMethod', 'custom'); } }),
            ' กำหนดเอง (มูลค่าเงินวันนี้)')
        ),
        d.spendingMethod === 'replacement'
          ? E(Field, { label: 'อัตราทดแทนรายได้ (Replacement Ratio)', type: 'percent', value: d.replacementRate, suffix: '% ของเงินเดือนเดือนสุดท้าย', onChange: function (v) { set('replacementRate', v); } })
          : E(Field, { label: 'ค่าใช้จ่ายที่ต้องการต่อเดือน (ราคาวันนี้)', value: d.customMonthlyExpense, suffix: 'บาท/เดือน', onChange: function (v) { set('customMonthlyExpense', v); } })
      )
    );
  }

  function NeedSummary(props) {
    var r = props.results;
    return E('div', { className: 'grid-3' },
      E(MetricCard, { label: 'เงินเดือนสุดท้ายก่อนเกษียณ (nominal)', value: fmt(r.salaryAtRetire) + ' บาท', tone: 'navy' }),
      E(MetricCard, { label: 'ค่าใช้จ่ายเดือนแรกหลังเกษียณ', value: fmt(r.firstYearMonthlyNeed) + ' บาท/เดือน', tone: 'green' }),
      E(MetricCard, { label: 'ค่าใช้จ่ายทั้งปีแรกหลังเกษียณ', value: fmt(r.firstYearAnnualNeed) + ' บาท/ปี', tone: 'green' })
    );
  }

  /* ---------------- Section 3: Pension ---------------- */
  function PensionSection(props) {
    var active = props.data, u = props.update;
    var pvd = active.pvd, sso = active.sso;
    function setPvd(key, val) { u(['pvd', key], val); }
    function setSso(key, val) { u(['sso', key], val); }
    function setTier(i, key, val) {
      var tiers = clone(pvd.employerTiers);
      tiers[i][key] = val;
      setPvd('employerTiers', tiers);
    }
    function addTier() {
      var tiers = clone(pvd.employerTiers);
      tiers.push({ minYears: 0, employerRate: 0.03 });
      setPvd('employerTiers', tiers);
    }
    function delTier(i) {
      var tiers = clone(pvd.employerTiers);
      tiers.splice(i, 1);
      setPvd('employerTiers', tiers);
    }
    return E('div', null,
      E('div', { className: 'subblock' },
        E('label', { className: 'checkbox-row' },
          E('input', { type: 'checkbox', checked: pvd.enabled, onChange: function (e) { setPvd('enabled', e.target.checked); } }),
          ' มีกองทุนสำรองเลี้ยงชีพ / กบข.'
        ),
        pvd.enabled && E('div', null,
          E('div', { className: 'grid-2' },
            E(Field, { label: 'อายุงานปัจจุบัน (ปี)', value: pvd.serviceYearsSoFar, suffix: 'ปี', onChange: function (v) { setPvd('serviceYearsSoFar', v); } }),
            E(Field, { label: 'ยอดสะสมปัจจุบันในกองทุน', value: pvd.startingBalance, suffix: 'บาท', onChange: function (v) { setPvd('startingBalance', v); } }),
            E(Field, { label: '% เงินสะสม (ลูกจ้าง)', type: 'percent', value: pvd.employeeRate, suffix: '%', onChange: function (v) { setPvd('employeeRate', v); } }),
            E(Field, { label: 'ผลตอบแทนเฉลี่ยของกองทุน', type: 'percent', value: pvd.fundReturn, suffix: '%/ปี', onChange: function (v) { setPvd('fundReturn', v); } })
          ),
          E('div', { className: 'radio-row' },
            E('label', { className: 'radio' },
              E('input', { type: 'radio', checked: pvd.employerMode === 'flat', onChange: function () { setPvd('employerMode', 'flat'); } }),
              ' เงินสมทบนายจ้างคงที่ตลอด'),
            E('label', { className: 'radio' },
              E('input', { type: 'radio', checked: pvd.employerMode === 'tiered', onChange: function () { setPvd('employerMode', 'tiered'); } }),
              ' เพิ่มตามอายุงาน/การสะสม (ขั้นบันได)')
          ),
          pvd.employerMode === 'flat'
            ? E(Field, { label: '% เงินสมทบนายจ้าง', type: 'percent', value: pvd.employerFlatRate, suffix: '%', onChange: function (v) { setPvd('employerFlatRate', v); } })
            : E('div', { className: 'tier-table' },
                pvd.employerTiers.map(function (t, i) {
                  return E('div', { className: 'tier-row', key: i },
                    E(Field, { label: 'อายุงานตั้งแต่ (ปี)', value: t.minYears, onChange: function (v) { setTier(i, 'minYears', v); } }),
                    E(Field, { label: '% นายจ้างสมทบ', type: 'percent', value: t.employerRate, onChange: function (v) { setTier(i, 'employerRate', v); } }),
                    E('button', { className: 'btn-icon', type: 'button', onClick: function () { delTier(i); } }, '×')
                  );
                }),
                E('button', { className: 'btn btn-ghost btn-sm', type: 'button', onClick: addTier }, '+ เพิ่มขั้น')
              )
        )
      ),
      E('div', { className: 'subblock' },
        E('label', { className: 'checkbox-row' },
          E('input', { type: 'checkbox', checked: sso.enabled, onChange: function (e) { setSso('enabled', e.target.checked); } }),
          ' บำนาญชราภาพจากประกันสังคม'
        ),
        sso.enabled && E('div', { className: 'grid-2' },
          E(Field, { label: 'ค่าจ้างเฉลี่ย 60 เดือนสุดท้าย (ไม่เกิน 15,000)', value: sso.avgWageCapped, suffix: 'บาท', onChange: function (v) { setSso('avgWageCapped', v); } }),
          E(Field, { label: 'จำนวนเดือนที่ส่งเงินสมทบมาแล้ว', value: sso.monthsPaidSoFar, suffix: 'เดือน', onChange: function (v) { setSso('monthsPaidSoFar', v); },
            hint: 'ต้องส่งสมทบครบ 180 เดือนจึงมีสิทธิรับบำนาญ' })
        )
      )
    );
  }

  /* ---------------- Section 4: Severance ---------------- */
  function SeveranceSection(props) {
    var r = props.results;
    if (!r.severance) return E('div', { className: 'note' }, 'ยังไม่ได้เปิดใช้งาน');
    return E('div', { className: 'grid-3' },
      E(MetricCard, { label: 'อายุงานรวม ณ วันเกษียณ', value: r.severance.serviceYears.toFixed(1) + ' ปี' }),
      E(MetricCard, { label: 'สิทธิเงินชดเชย', value: r.severance.months.toFixed(2) + ' เท่าของเงินเดือน' }),
      E(MetricCard, { label: 'จำนวนเงินชดเชยโดยประมาณ', value: fmt(r.severance.amount) + ' บาท', tone: 'green' })
    );
  }

  /* ---------------- Section 5: Goals ---------------- */
  function GoalsSection(props) {
    var active = props.active, goals = active.goals;
    function set(next) { props.update(['goals'], next); }
    function addGoal() {
      set(goals.concat([{ id: uid(), name: 'เป้าหมายใหม่', phase: 'pre', targetAge: active.personal.currentAge + 5, amountToday: 100000, returnRate: 0.05 }]));
    }
    function updateGoal(i, key, val) {
      var next = clone(goals);
      next[i][key] = val;
      set(next);
    }
    function delGoal(i) {
      var next = clone(goals);
      next.splice(i, 1);
      set(next);
    }
    function term(g) {
      var yearsAway = g.targetAge - active.personal.currentAge;
      if (yearsAway <= 3) return 'ระยะสั้น';
      if (yearsAway <= 10) return 'ระยะกลาง';
      return 'ระยะยาว';
    }
    return E('div', null,
      goals.length === 0 ? E('div', { className: 'note' }, 'ยังไม่มีเป้าหมาย — กด "เพิ่มเป้าหมาย" ด้านล่าง') : null,
      goals.map(function (g, i) {
        var yearsAway = g.targetAge - active.personal.currentAge;
        var infl = active.personal.inflation;
        var amountFuture = g.amountToday * Math.pow(1 + infl, Math.max(0, yearsAway));
        return E('div', { className: 'list-card', key: g.id },
          E('div', { className: 'list-card-head' },
            E('input', { className: 'inp inp-title', type: 'text', value: g.name, onChange: function (e) { updateGoal(i, 'name', e.target.value); } }),
            E('span', { className: 'badge' }, term(g)),
            E('button', { className: 'btn-icon', type: 'button', onClick: function () { delGoal(i); } }, '×')
          ),
          E('div', { className: 'radio-row' },
            E('label', { className: 'radio' },
              E('input', { type: 'radio', checked: g.phase === 'pre', onChange: function () { updateGoal(i, 'phase', 'pre'); } }), ' ก่อนเกษียณ'),
            E('label', { className: 'radio' },
              E('input', { type: 'radio', checked: g.phase === 'post', onChange: function () { updateGoal(i, 'phase', 'post'); } }), ' หลังเกษียณ')
          ),
          E('div', { className: 'grid-3' },
            E(Field, { label: 'อายุเมื่อถึงเป้าหมาย', value: g.targetAge, suffix: 'ปี', onChange: function (v) { updateGoal(i, 'targetAge', v); } }),
            E(Field, { label: 'จำนวนเงิน (มูลค่าวันนี้)', value: g.amountToday, suffix: 'บาท', onChange: function (v) { updateGoal(i, 'amountToday', v); } }),
            g.phase === 'pre' ? E(Field, { label: 'ผลตอบแทนเงินออมเพื่อเป้าหมายนี้', type: 'percent', value: g.returnRate, suffix: '%/ปี', onChange: function (v) { updateGoal(i, 'returnRate', v); } }) : null
          ),
          E('div', { className: 'note' },
            'มูลค่าเมื่อถึงเป้าหมาย (ปรับเงินเฟ้อ): ' + fmt(amountFuture) + ' บาท' +
            (g.phase === 'pre' && yearsAway > 0
              ? ' — ควรออมเพิ่มเดือนละ ~' + fmt(pmtFromFVforUI(amountFuture, g.returnRate, yearsAway)) + ' บาท (แยกต่างหากจากแผนเกษียณ)'
              : '')
          )
        );
      }),
      E('button', { className: 'btn btn-ghost', type: 'button', onClick: addGoal }, '+ เพิ่มเป้าหมาย')
    );
  }
  function pmtFromFVforUI(target, annualRate, years) {
    var r = annualRate / 12, n = years * 12;
    if (n <= 0) return 0;
    if (r === 0) return target / n;
    return target * r / (Math.pow(1 + r, n) - 1);
  }

  /* ---------------- Section 6 ---------------- */
  function CurrentSavingsSection(props) {
    var d = props.data;
    function set(key, val) { props.update(['currentSavings', key], val); }
    return E('div', { className: 'grid-2' },
      E(Field, { label: 'ยอดเงินออม/เงินลงทุนปัจจุบัน', value: d.amount, suffix: 'บาท', onChange: function (v) { set('amount', v); } }),
      E(Field, { label: 'อัตราผลตอบแทนคาดหวัง', type: 'percent', value: d.returnRate, suffix: '%/ปี', onChange: function (v) { set('returnRate', v); } })
    );
  }

  /* ---------------- Section 7 ---------------- */
  function RegularSavingsSection(props) {
    var d = props.data;
    function set(key, val) { props.update(['regularSavings', key], val); }
    return E('div', null,
      E('div', { className: 'grid-2' },
        E(Field, {
          label: 'ความถี่ในการออม', type: 'select', value: d.frequency,
          options: [{ value: 'monthly', label: 'รายเดือน' }, { value: 'annual', label: 'รายปี' }],
          onChange: function (v) { set('frequency', v); }
        }),
        E(Field, { label: d.frequency === 'monthly' ? 'จำนวนเงินต่อเดือน' : 'จำนวนเงินต่อปี', value: d.amount, suffix: 'บาท', onChange: function (v) { set('amount', v); } }),
        E(Field, { label: 'อัตราผลตอบแทนคาดหวัง', type: 'percent', value: d.returnRate, suffix: '%/ปี', onChange: function (v) { set('returnRate', v); } }),
        E(Field, {
          label: 'ออมต้นงวดหรือปลายงวด', type: 'select', value: d.timing,
          options: [{ value: 'end', label: 'ปลายงวด' }, { value: 'begin', label: 'ต้นงวด' }],
          onChange: function (v) { set('timing', v); }
        })
      )
    );
  }

  /* ---------------- Section 8 ---------------- */
  function WindfallsSection(props) {
    var active = props.active, list = active.windfalls;
    function set(next) { props.update(['windfalls'], next); }
    function add() {
      set(list.concat([{ id: uid(), description: 'เงินก้อนใหม่', amount: 100000, ageReceived: active.personal.retireAge, phase: 'pre', reinvestReturn: 0.04 }]));
    }
    function upd(i, key, val) { var next = clone(list); next[i][key] = val; set(next); }
    function del(i) { var next = clone(list); next.splice(i, 1); set(next); }
    return E('div', null,
      list.length === 0 ? E('div', { className: 'note' }, 'เช่น เงินครบสัญญาประกันชีวิต, เงินจากการขายสินทรัพย์ ฯลฯ') : null,
      list.map(function (w, i) {
        return E('div', { className: 'list-card', key: w.id },
          E('div', { className: 'list-card-head' },
            E('input', { className: 'inp inp-title', type: 'text', value: w.description, onChange: function (e) { upd(i, 'description', e.target.value); } }),
            E('button', { className: 'btn-icon', type: 'button', onClick: function () { del(i); } }, '×')
          ),
          E('div', { className: 'radio-row' },
            E('label', { className: 'radio' }, E('input', { type: 'radio', checked: w.phase === 'pre', onChange: function () { upd(i, 'phase', 'pre'); } }), ' ก่อนเกษียณ'),
            E('label', { className: 'radio' }, E('input', { type: 'radio', checked: w.phase === 'post', onChange: function () { upd(i, 'phase', 'post'); } }), ' หลังเกษียณ')
          ),
          E('div', { className: 'grid-3' },
            E(Field, { label: 'อายุที่จะได้รับเงิน', value: w.ageReceived, suffix: 'ปี', onChange: function (v) { upd(i, 'ageReceived', v); } }),
            E(Field, { label: 'จำนวนเงิน (มูลค่า ณ ปีที่ได้รับ)', value: w.amount, suffix: 'บาท', onChange: function (v) { upd(i, 'amount', v); } }),
            w.phase === 'pre' ? E(Field, { label: 'ผลตอบแทนหากนำไปลงทุนต่อ', type: 'percent', value: w.reinvestReturn, suffix: '%/ปี', onChange: function (v) { upd(i, 'reinvestReturn', v); } }) : null
          )
        );
      }),
      E('button', { className: 'btn btn-ghost', type: 'button', onClick: add }, '+ เพิ่มเงินก้อน')
    );
  }

  /* ---------------- Section 9: Gap ---------------- */
  function GapSection(props) {
    var r = props.results, active = props.active;
    return E('div', null,
      E('div', { className: 'grid-2' },
        E(MetricCard, { label: 'กองทุนที่ควรมี ณ วันเกษียณ (หักบำนาญ/หลังหักแล้ว)', value: fmt(r.netRequiredCorpus) + ' บาท', tone: 'navy' }),
        E(MetricCard, { label: 'เงินที่คาดว่าจะมี ณ วันเกษียณ', value: fmt(r.availableAtRetirement) + ' บาท', tone: 'navy' })
      ),
      E(MetricCard, {
        label: r.gap > 0 ? 'ส่วนที่ขาด (Gap)' : 'ส่วนที่เกิน (Surplus)',
        value: fmt(Math.abs(r.gap)) + ' บาท',
        tone: r.gap > 0 ? 'red' : 'green'
      }),
      r.gap > 0 ? E('div', { className: 'subblock' },
        E('div', { className: 'radio-row' },
          E('label', { className: 'radio' },
            E('input', { type: 'radio', checked: active.extraSavingMode === 'flat', onChange: function () { props.update(['extraSavingMode'], 'flat'); } }),
            ' ออมเพิ่มคงที่ทุกปี'),
          E('label', { className: 'radio' },
            E('input', { type: 'radio', checked: active.extraSavingMode === 'growing', onChange: function () { props.update(['extraSavingMode'], 'growing'); } }),
            ' ออมเพิ่มขึ้นตามอัตราขึ้นเงินเดือน')
        ),
        E(Field, { label: 'อัตราผลตอบแทนของเงินออมเพิ่ม', type: 'percent', value: active.extraSavingReturn, suffix: '%/ปี', onChange: function (v) { props.update(['extraSavingReturn'], v); } }),
        E(MetricCard, { label: 'ควรออมเพิ่มเดือนละ', value: fmt(r.extraMonthlySaving) + ' บาท/เดือน', sub: active.extraSavingMode === 'growing' ? '(เดือนแรก, เพิ่มขึ้นทุกปีตามเงินเดือน)' : '(คงที่ตลอดจนเกษียณ)', tone: 'green' })
      ) : E('div', { className: 'note' }, 'เงินที่มีเพียงพอตามเป้าหมายที่ตั้งไว้แล้ว')
    );
  }

  /* ---------------- Section 10 ---------------- */
  function NoExtraSection(props) {
    var r = props.results;
    return E('div', { className: 'grid-2' },
      E('div', { className: 'list-card' },
        E('div', { className: 'list-card-head' }, E('strong', null, 'ทางเลือก A: ใช้ได้เท่ากันตลอด (ปรับเพิ่มตามเงินเฟ้อ)')),
        E(MetricCard, { label: 'ใช้ได้เดือนแรก', value: fmt(r.sustainableMonthly) + ' บาท/เดือน', tone: 'green' }),
        E('div', { className: 'note' }, 'หลังจากนั้นเพิ่มขึ้นตามอัตราเงินเฟ้อทุกปี จนถึงอายุขัยพอดี')
      ),
      E('div', { className: 'list-card' },
        E('div', { className: 'list-card-head' }, E('strong', null, 'ทางเลือก B: ใช้ตามแผนเดิมตั้งแต่แรก')),
        E(MetricCard, {
          label: 'เงินจะอยู่ได้ถึง',
          value: r.depletionAge ? ('อายุ ' + r.depletionAge + ' ปี') : 'ตลอดอายุขัย (มีเงินเหลือ)',
          tone: r.depletionAge ? 'red' : 'green'
        }),
        E('div', { className: 'note' }, 'ใช้เดือนละ ' + fmt(r.firstYearMonthlyNeed) + ' บาท เพิ่มตามเงินเฟ้อทุกปี')
      )
    );
  }

  /* ---------------- Section 11: Buckets ---------------- */
  function BucketsSection(props) {
    var active = props.active, b = active.buckets, r = props.results;
    function setMode(mode) {
      var splits;
      if (mode === 'single') splits = [{ years: null, amountPct: 100, returnRate: 0.04 }];
      else {
        var per = Math.floor(r.yearsRetired / 3);
        splits = [
          { years: per, amountPct: 34, returnRate: 0.02 },
          { years: per, amountPct: 33, returnRate: 0.04 },
          { years: r.yearsRetired - per * 2, amountPct: 33, returnRate: 0.06 }
        ];
      }
      props.update(['buckets'], { mode: mode, splits: splits });
    }
    function updSplit(i, key, val) {
      var splits = clone(b.splits);
      splits[i][key] = val;
      props.update(['buckets', 'splits'], splits);
    }
    return E('div', null,
      E('div', { className: 'radio-row' },
        E('label', { className: 'radio' }, E('input', { type: 'radio', checked: b.mode === 'single', onChange: function () { setMode('single'); } }), ' พอร์ตเดียวตลอดช่วงเกษียณ'),
        E('label', { className: 'radio' }, E('input', { type: 'radio', checked: b.mode === 'three', onChange: function () { setMode('three'); } }), ' แบ่ง 3 บัคเก็ต (3 ช่วงอายุ)')
      ),
      (r.bucketResults || []).map(function (bk, i) {
        return E('div', { className: 'list-card', key: i },
          E('div', { className: 'list-card-head' }, E('strong', null, b.mode === 'three' ? 'บัคเก็ตที่ ' + (i + 1) : 'พอร์ตเดียว')),
          E('div', { className: 'grid-3' },
            E(Field, { label: 'จำนวนปีของช่วงนี้', value: b.splits[i].years == null ? r.yearsRetired : b.splits[i].years, onChange: function (v) { updSplit(i, 'years', v); }, suffix: 'ปี' }),
            E(Field, { label: '% ของเงินก้อนที่แบ่งมาช่วงนี้', type: 'percent', value: b.splits[i].amountPct / 100, suffix: '%', onChange: function (v) { updSplit(i, 'amountPct', v * 100); } }),
            E(Field, { label: 'ผลตอบแทนของพอร์ตช่วงนี้', type: 'percent', value: b.splits[i].returnRate, suffix: '%/ปี', onChange: function (v) { updSplit(i, 'returnRate', v); } })
          ),
          E(MetricCard, { label: 'ใช้ได้เดือนแรกของช่วงนี้', value: fmt(bk.monthlyC1) + ' บาท/เดือน', tone: 'green', sub: 'เงินต้นช่วงนี้: ' + fmt(bk.amount) + ' บาท' })
        );
      })
    );
  }

  /* ---------------- Charts ---------------- */
  function ChartsPanel(props) {
    var canvasRef1 = useRef(null), canvasRef2 = useRef(null);
    var chart1 = useRef(null), chart2 = useRef(null);
    useEffect(function () {
      var r = props.results;
      if (canvasRef1.current) {
        if (chart1.current) chart1.current.destroy();
        chart1.current = new Chart(canvasRef1.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: r.accumPath.map(function (p) { return p.beYear; }),
            datasets: [{
              label: 'เงินสะสมก่อนเกษียณ (บาท)', data: r.accumPath.map(function (p) { return Math.round(p.total); }),
              borderColor: '#0B2545', backgroundColor: 'rgba(11,37,69,0.08)', fill: true, tension: 0.25, pointRadius: 0
            }]
          },
          options: { responsive: true, plugins: { legend: { display: true } }, scales: { y: { ticks: { callback: function (v) { return fmt(v); } } } } }
        });
      }
      if (canvasRef2.current) {
        if (chart2.current) chart2.current.destroy();
        chart2.current = new Chart(canvasRef2.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: r.drawdownPath.map(function (p) { return p.beYear; }),
            datasets: [{
              label: 'เงินคงเหลือหลังเกษียณ (บาท, กรณีไม่ออมเพิ่ม)', data: r.drawdownPath.map(function (p) { return Math.round(Math.max(0, p.balance)); }),
              borderColor: '#3FA772', backgroundColor: 'rgba(63,167,114,0.12)', fill: true, tension: 0.25, pointRadius: 0
            }]
          },
          options: { responsive: true, plugins: { legend: { display: true } }, scales: { y: { ticks: { callback: function (v) { return fmt(v); } } } } }
        });
      }
    }, [props.results]);
    return E('div', { className: 'charts-panel no-print' },
      E('div', { className: 'chart-card' }, E('canvas', { ref: canvasRef1, height: 180 })),
      E('div', { className: 'chart-card' }, E('canvas', { ref: canvasRef2, height: 180 }))
    );
  }

  /* ---------------- Summary bar ---------------- */
  function SummaryBar(props) {
    var r = props.results;
    return E('div', { className: 'summary-bar no-print' },
      E(MetricCard, { label: 'ต้องมี ณ เกษียณ', value: fmt(r.netRequiredCorpus), tone: 'navy' }),
      E(MetricCard, { label: 'คาดว่าจะมี', value: fmt(r.availableAtRetirement), tone: 'navy' }),
      E(MetricCard, { label: r.gap > 0 ? 'ขาดอยู่' : 'เกินอยู่', value: fmt(Math.abs(r.gap)), tone: r.gap > 0 ? 'red' : 'green' }),
      E(MetricCard, { label: 'ควรออมเพิ่ม/เดือน', value: r.gap > 0 ? fmt(r.extraMonthlySaving) : '0', tone: 'green' })
    );
  }

  /* ---------------- Print report ---------------- */
  function PrintReport(props) {
    var a = props.active, r = props.results, p = a.personal;
    return E('div', { className: 'print-report' },
      E('h1', null, 'แผนการเงินเพื่อการเกษียณ'),
      E('p', null, 'ชื่อลูกค้า: ' + (p.clientName || '-') + ' | เคส: ' + a.name),
      E('p', null, 'จัดทำโดย ป้าเป็ด CFP\u00AE — Bangkok Life Assurance'),
      E('table', { className: 'print-table' },
        E('tbody', null,
          E('tr', null, E('td', null, 'อายุปัจจุบัน / อายุเกษียณ / อายุขัย'), E('td', null, p.currentAge + ' / ' + p.retireAge + ' / ' + p.lifeExpectancy + ' ปี')),
          E('tr', null, E('td', null, 'ปีเกษียณ (พ.ศ.)'), E('td', null, (p.currentYearAD + 543 + (p.retireAge - p.currentAge)))),
          E('tr', null, E('td', null, 'ค่าใช้จ่ายเดือนแรกหลังเกษียณ'), E('td', null, fmt(r.firstYearMonthlyNeed) + ' บาท/เดือน')),
          E('tr', null, E('td', null, 'กองทุนที่ควรมี ณ วันเกษียณ'), E('td', null, fmt(r.netRequiredCorpus) + ' บาท')),
          E('tr', null, E('td', null, 'เงินที่คาดว่าจะมี ณ วันเกษียณ'), E('td', null, fmt(r.availableAtRetirement) + ' บาท')),
          E('tr', null, E('td', null, r.gap > 0 ? 'ส่วนที่ขาด' : 'ส่วนที่เกิน'), E('td', null, fmt(Math.abs(r.gap)) + ' บาท')),
          r.gap > 0 ? E('tr', null, E('td', null, 'ควรออมเพิ่ม'), E('td', null, fmt(r.extraMonthlySaving) + ' บาท/เดือน')) : null,
          E('tr', null, E('td', null, 'ถ้าใช้เท่ากันตลอด (ไม่ออมเพิ่ม)'), E('td', null, fmt(r.sustainableMonthly) + ' บาท/เดือน')),
          E('tr', null, E('td', null, 'ถ้าใช้ตามแผนเดิม เงินจะอยู่ได้ถึง'), E('td', null, r.depletionAge ? ('อายุ ' + r.depletionAge) : 'ตลอดอายุขัย'))
        )
      ),
      E('p', { className: 'print-note' }, 'เอกสารนี้จัดทำขึ้นเพื่อประกอบการวางแผนการเงินเบื้องต้นเท่านั้น ตัวเลขจริงอาจแตกต่างไปตามผลตอบแทนการลงทุนและอัตราเงินเฟ้อที่เกิดขึ้นจริง')
    );
  }

  /* ---------------- Master calculation ---------------- */
  function computeAll(a) {
    var C = window.RPCalc;
    var p = a.personal;
    var yearsToRetire = p.retireAge - p.currentAge;
    var yearsRetired = p.lifeExpectancy - p.retireAge;

    var salaryAtRetire = p.currentSalary * Math.pow(1 + p.salaryGrowth, yearsToRetire);
    var firstYearMonthlyNeed;
    if (p.spendingMethod === 'replacement') firstYearMonthlyNeed = salaryAtRetire * p.replacementRate;
    else firstYearMonthlyNeed = p.customMonthlyExpense * Math.pow(1 + p.inflation, yearsToRetire);
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

    /* SSO */
    var ssoMonthly = 0;
    if (a.sso.enabled) ssoMonthly = C.ssoPensionMonthly(a.sso.avgWageCapped, a.sso.monthsPaidSoFar + yearsToRetire * 12);
    var ssoAnnual = ssoMonthly * 12;

    /* Severance */
    var severance = null;
    if (a.severance.enabled) {
      var serviceYears = (a.pvd.serviceYearsSoFar || 0) + yearsToRetire;
      var months = C.severanceMonths(serviceYears);
      severance = { serviceYears: serviceYears, months: months, amount: months * salaryAtRetire };
    }

    /* Current savings + regular savings */
    var savingsFV = C.fv(a.currentSavings.amount, a.currentSavings.returnRate, yearsToRetire);
    var regAnnual = a.regularSavings.frequency === 'monthly' ? a.regularSavings.amount * 12 : a.regularSavings.amount;
    var regularFV = C.annuityFV(regAnnual, a.regularSavings.returnRate, yearsToRetire, a.regularSavings.timing === 'begin');

    /* Windfalls pre-retirement -> FV; post-retirement -> oneOffs */
    var windfallsFV = 0;
    var postWindfalls = [];
    (a.windfalls || []).forEach(function (w) {
      if (w.phase === 'pre') {
        var n = Math.max(0, p.retireAge - w.ageReceived);
        windfallsFV += C.fv(w.amount, w.reinvestReturn || 0, n);
      } else postWindfalls.push(w);
    });

    var availableAtRetirement = pvdResult.finalBalance + (severance ? severance.amount : 0) + savingsFV + regularFV + windfallsFV;

    /* Required corpus */
    var requiredCorpus = C.growingAnnuityPV(firstYearAnnualNeed, p.postReturn, p.inflation, yearsRetired, true);
    var ssoPV = ssoAnnual > 0 ? C.growingAnnuityPV(ssoAnnual, p.postReturn, 0, yearsRetired, true) : 0;
    var netRequiredCorpus = Math.max(0, requiredCorpus - ssoPV);

    var gap = netRequiredCorpus - availableAtRetirement;
    var extraMonthlySaving = 0;
    if (gap > 0) {
      if (a.extraSavingMode === 'growing') {
        extraMonthlySaving = C.pmtFromFVGrowing(gap, a.extraSavingReturn, p.salaryGrowth, yearsToRetire, false) / 12;
      } else {
        extraMonthlySaving = C.pmtFromFV(gap, a.extraSavingReturn, yearsToRetire, false) / 12;
      }
    }

    /* one-offs during drawdown from post-retirement goals & windfalls */
    var oneOffs = {};
    (a.goals || []).forEach(function (g) {
      if (g.phase === 'post') {
        var yi = g.targetAge - p.retireAge;
        if (yi >= 1) {
          var amt = g.amountToday * Math.pow(1 + p.inflation, Math.max(0, g.targetAge - p.currentAge));
          oneOffs[yi] = (oneOffs[yi] || 0) - amt;
        }
      }
    });
    postWindfalls.forEach(function (w) {
      var yi = w.ageReceived - p.retireAge;
      if (yi >= 1) oneOffs[yi] = (oneOffs[yi] || 0) + w.amount;
    });

    /* No-extra-saving scenarios */
    var sustainableAnnual = C.solveSustainableW1(availableAtRetirement, p.inflation, ssoAnnual, p.postReturn, yearsRetired, oneOffs);
    var sustainableMonthly = sustainableAnnual / 12;
    var depletionYear = C.findDepletionYear(availableAtRetirement, firstYearAnnualNeed, p.inflation, ssoAnnual, p.postReturn, 80, oneOffs);
    var depletionAge = depletionYear ? p.retireAge + depletionYear : null;

    /* Buckets */
    var bucketResults = (a.buckets.splits || []).map(function (s) {
      var yrs = s.years == null ? yearsRetired : s.years;
      var amount = availableAtRetirement * (s.amountPct / 100);
      var monthlyC1 = C.pmtFromPVGrowing(amount, s.returnRate, p.inflation, yrs, true) / 12;
      return { years: yrs, amount: amount, returnRate: s.returnRate, monthlyC1: monthlyC1 };
    });

    /* chart paths */
    var accumPath = [];
    var cumSavings = a.currentSavings.amount, cumReg = 0;
    for (var y = 0; y <= yearsToRetire; y++) {
      var savingsBal = C.fv(a.currentSavings.amount, a.currentSavings.returnRate, y);
      var regBal = C.annuityFV(regAnnual, a.regularSavings.returnRate, y, a.regularSavings.timing === 'begin');
      var pvdBal = 0;
      if (y === 0) pvdBal = a.pvd.startingBalance || 0;
      else if (pvdResult.path[y - 1]) pvdBal = pvdResult.path[y - 1].balance;
      accumPath.push({ year: y, beYear: p.currentYearAD + 543 + y, total: savingsBal + regBal + pvdBal });
    }
    var drawdown = C.simulateDrawdown(availableAtRetirement, firstYearAnnualNeed, p.inflation, ssoAnnual, p.postReturn, yearsRetired, oneOffs);
    var drawdownPath = drawdown.path.map(function (pt) {
      return { year: pt.year, beYear: p.currentYearAD + 543 + yearsToRetire + pt.year, balance: pt.balance };
    });

    return {
      yearsToRetire: yearsToRetire, yearsRetired: yearsRetired,
      salaryAtRetire: salaryAtRetire, firstYearMonthlyNeed: firstYearMonthlyNeed, firstYearAnnualNeed: firstYearAnnualNeed,
      pvdResult: pvdResult, ssoMonthly: ssoMonthly, severance: severance,
      savingsFV: savingsFV, regularFV: regularFV, windfallsFV: windfallsFV,
      availableAtRetirement: availableAtRetirement, requiredCorpus: requiredCorpus, ssoPV: ssoPV,
      netRequiredCorpus: netRequiredCorpus, gap: gap, extraMonthlySaving: extraMonthlySaving,
      sustainableMonthly: sustainableMonthly, depletionAge: depletionAge,
      bucketResults: bucketResults, accumPath: accumPath, drawdownPath: drawdownPath
    };
  }

  var root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(E(App));
})();
