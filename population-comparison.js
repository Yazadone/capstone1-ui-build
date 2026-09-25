const populationComparisons = [
  { pop1:'ACB', pop2:'FIN', location:'African Caribbean in Barbados ↔ Finnish in Finland', af1:0.078125, af2:0.909091, fst:0.815919, delta:0.830966 },
  { pop1:'FIN', pop2:'GIH', location:'Finnish ↔ Gujarati Indian in Houston', af1:0.909091, af2:0.0825243, fst:0.811111, delta:0.826567 },
  { pop1:'FIN', pop2:'IBS', location:'Finnish ↔ Iberian in Spain', af1:0.909091, af2:0.32243, fst:0.526871, delta:0.586661 },
  { pop1:'FIN', pop2:'JPT', location:'Finnish ↔ Japanese in Tokyo', af1:0.909091, af2:0, fst:0.910733, delta:0.909091 },
  { pop1:'FIN', pop2:'KHV', location:'Finnish ↔ Kinh Vietnamese in Ho Chi Minh City', af1:0.909091, af2:0, fst:0.908673, delta:0.909091 },
  { pop1:'FIN', pop2:'MXL', location:'Finnish ↔ Mexican ancestry in Los Angeles', af1:0.909091, af2:0.179688, fst:0.708967, delta:0.729403 },
  { pop1:'FIN', pop2:'PEL', location:'Finnish ↔ Peruvian in Lima', af1:0.909091, af2:0.111765, fst:0.777636, delta:0.797326 },
  { pop1:'FIN', pop2:'PUR', location:'Finnish ↔ Puerto Rican', af1:0.909091, af2:0.230769, fst:0.634823, delta:0.678322 },
  { pop1:'FIN', pop2:'TSI', location:'Finnish ↔ Toscani in Italy', af1:0.909091, af2:0.420561, fst:0.415161, delta:0.48853 },
  { pop1:'FIN', pop2:'YRI', location:'Finnish ↔ Yoruba in Nigeria', af1:0.909091, af2:0, fst:0.912315, delta:0.909091 }
];

const populationNames = {
  ACB:'African Caribbean in Barbados', FIN:'Finnish', GIH:'Gujarati Indian in Houston', IBS:'Iberian in Spain',
  JPT:'Japanese in Tokyo', KHV:'Kinh Vietnamese in Ho Chi Minh City', MXL:'Mexican ancestry in Los Angeles',
  PEL:'Peruvian in Lima', PUR:'Puerto Rican', TSI:'Toscani in Italy', YRI:'Yoruba in Nigeria'
};

function comparisonNumber(value){ return Number(value).toFixed(6).replace(/0+$/,'').replace(/\.$/,''); }
function populationOption(code){ return `<option value="${code}">${code} — ${populationNames[code]}</option>`; }
function comparisonMetric(value, color){ return `<span class="metric-value">${comparisonNumber(value)}</span><div class="metric-bar ${color === 'teal' ? 'teal' : ''}"><span style="width:${Math.max(0, Math.min(100, value * 100))}%"></span></div>`; }

function renderPopulationComparison(){
  const body = document.getElementById('comparisonTableBody');
  if(!body) return;
  const pop1 = document.getElementById('comparisonPop1').value;
  const pop2 = document.getElementById('comparisonPop2').value;
  const sort = document.getElementById('comparisonSort').value;
  let rows = populationComparisons.filter(row => (!pop1 || row.pop1 === pop1) && (!pop2 || row.pop2 === pop2));
  if(sort === 'fst') rows = [...rows].sort((a,b) => b.fst - a.fst);
  if(sort === 'delta') rows = [...rows].sort((a,b) => b.delta - a.delta);
  if(sort === 'frequency') rows = [...rows].sort((a,b) => Math.abs(b.af1 - b.af2) - Math.abs(a.af1 - a.af2));
  body.innerHTML = rows.length ? rows.map(row => `<tr>
    <td><span class="population-code">${row.pop1}</span><span class="population-label">${populationNames[row.pop1]}</span></td>
    <td><span class="population-code">${row.pop2}</span><span class="population-label">${populationNames[row.pop2]}</span></td>
    <td>${row.location}</td>
    <td>${comparisonMetric(row.af1, 'blue')}</td>
    <td>${comparisonMetric(row.af2, 'teal')}</td>
    <td>${comparisonMetric(row.fst, 'blue')}</td>
    <td>${comparisonMetric(row.delta, 'teal')}</td>
  </tr>`).join('') : '<tr><td colspan="7" class="muted">No population pairs match the selected filters.</td></tr>';
  const summary = document.getElementById('comparisonSummary');
  if(summary) summary.innerHTML = `<div class="comparison-stat"><strong>${rows.length}</strong><span>Visible comparisons</span></div><div class="comparison-stat"><strong>HERC2</strong><span>Gene</span></div><div class="comparison-stat"><strong>rs12913832</strong><span>Variant</span></div><div class="comparison-stat"><strong>hg19</strong><span>Assembly</span></div>`;
}

function setupPopulationComparison(){
  const pop1 = document.getElementById('comparisonPop1');
  const pop2 = document.getElementById('comparisonPop2');
  if(!pop1 || !pop2) return;
  const codes = [...new Set(populationComparisons.flatMap(row => [row.pop1, row.pop2]))].sort();
  codes.forEach(code => { pop1.insertAdjacentHTML('beforeend', populationOption(code)); pop2.insertAdjacentHTML('beforeend', populationOption(code)); });
  [pop1, pop2, document.getElementById('comparisonSort')].forEach(control => control.addEventListener('change', renderPopulationComparison));
  document.getElementById('resetComparison').addEventListener('click', () => { pop1.value=''; pop2.value=''; document.getElementById('comparisonSort').value='original'; renderPopulationComparison(); });
  renderPopulationComparison();
}

document.addEventListener('DOMContentLoaded', setupPopulationComparison);
