const populationVariants = [
  ['BEB','CEU',0.116279,0.787879,0.619887,0.6716],
  ['CDX','CEU',0,0.787879,0.781647,0.787879],
  ['CEU','CHB',0.787879,0,0.79025,0.787879],
  ['CEU','CHS',0.787879,0.0047619,0.784913,0.783117],
  ['CEU','CLM',0.787879,0.287234,0.400253,0.500645],
  ['CEU','GIH',0.787879,0.0825243,0.672159,0.705355],
  ['CEU','IBS',0.787879,0.359813,0.311038,0.428066],
  ['CEU','ITU',0.787879,0.0441176,0.726021,0.743761],
  ['CEU','JPT',0.787879,0,0.791073,0.787879],
  ['CEU','KHV',0.787879,0,0.786892,0.787879]
].map(([pop1, pop2, afPop1, afPop2, fst, delta]) => ({
  pop1, pop2, chr: 15, pos: 28410491, rsid: 'rs12916300', assembly: 'hg19',
  gene: 'HERC2', function: 'intronic', distanceBp: 0, afPop1, afPop2, fst, delta
}));

function variantNumber(value) {
  return Number(value).toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
}

function renderPopulationVariants() {
  const detailArea = document.getElementById('detailArea');
  if (!detailArea) return;
  const rows = populationVariants.map(variant => `
    <tr>
      <td>${variant.pop1}</td><td>${variant.pop2}</td><td>${variant.chr}</td>
      <td>${variant.pos.toLocaleString()}</td>
      <td><a class="link" href="https://www.ncbi.nlm.nih.gov/snp/${variant.rsid}" target="_blank" rel="noopener">${variant.rsid}</a></td>
      <td>${variant.assembly}</td><td>${variant.gene}</td><td>${variant.function}</td>
      <td>${variant.distanceBp}</td><td>${variantNumber(variant.afPop1)}</td>
      <td>${variantNumber(variant.afPop2)}</td><td>${variantNumber(variant.fst)}</td><td>${variantNumber(variant.delta)}</td>
    </tr>`).join('');

  detailArea.insertAdjacentHTML('beforeend', `
    <section class="card card-pad" style="margin-top:20px">
      <h2>Population Variant Comparisons</h2>
      <p class="muted">${populationVariants.length} pairwise comparisons for rs12916300 in HERC2 (hg19).</p>
      <div class="table-wrap"><table class="table">
        <thead><tr><th>POP1</th><th>POP2</th><th>CHR</th><th>POS</th><th>RSID</th><th>Assembly</th><th>Gene</th><th>Function</th><th>Distance_bp</th><th>AF_pop1</th><th>AF_pop2</th><th>FST</th><th>Delta</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </section>`);
}

document.addEventListener('DOMContentLoaded', renderPopulationVariants);
