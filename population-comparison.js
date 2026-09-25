const populationComparisons=[
 {pop1:'ACB',pop2:'FIN',af1:.078125,af2:.909091,fst:.815919,delta:.830966},
 {pop1:'FIN',pop2:'GIH',af1:.909091,af2:.0825243,fst:.811111,delta:.826567},
 {pop1:'FIN',pop2:'IBS',af1:.909091,af2:.32243,fst:.526871,delta:.586661},
 {pop1:'FIN',pop2:'JPT',af1:.909091,af2:0,fst:.910733,delta:.909091},
 {pop1:'FIN',pop2:'KHV',af1:.909091,af2:0,fst:.908673,delta:.909091},
 {pop1:'FIN',pop2:'MXL',af1:.909091,af2:.179688,fst:.708967,delta:.729403},
 {pop1:'FIN',pop2:'PEL',af1:.909091,af2:.111765,fst:.777636,delta:.797326},
 {pop1:'FIN',pop2:'PUR',af1:.909091,af2:.230769,fst:.634823,delta:.678322},
 {pop1:'FIN',pop2:'TSI',af1:.909091,af2:.420561,fst:.415161,delta:.48853},
 {pop1:'FIN',pop2:'YRI',af1:.909091,af2:0,fst:.912315,delta:.909091}
];
const variantMetadata={gene:'HERC2',rsid:'rs12913832',chr:'15',pos:'28365618',assembly:'hg19',function:'intronic'};
const populationNames={ACB:'Africa — African Caribbean in Barbados',FIN:'Europe — Finnish in Finland',GIH:'North America — Gujarati Indian in Houston',IBS:'Europe — Iberian in Spain',JPT:'Asia — Japanese in Tokyo',KHV:'Asia — Kinh Vietnamese in Ho Chi Minh City',MXL:'North America — Mexican ancestry in Los Angeles',PEL:'South America — Peruvian in Lima',PUR:'North America — Puerto Rican',TSI:'Europe — Toscani in Italy',YRI:'Africa — Yoruba in Nigeria'};
function comparisonNumber(value){return Number(value).toFixed(6).replace(/0+$/,'').replace(/\.$/,'')}
function populationOption(code){return `<option value="${code}">${populationNames[code]}</option>`}
function comparisonMetric(value,color){return `<span class="metric-value">${comparisonNumber(value)}</span><div class="metric-bar ${color==='teal'?'teal':''}"><span style="width:${Math.max(0,Math.min(100,value*100))}%"></span></div>`}
function renderPopulationComparison(){
 const body=document.getElementById('comparisonTableBody');if(!body)return;
 const pop1=document.getElementById('comparisonPop1').value,pop2=document.getElementById('comparisonPop2').value,sort=document.getElementById('comparisonSort').value;
 let rows=populationComparisons.filter(row=>(!pop1||row.pop1===pop1)&&(!pop2||row.pop2===pop2));
 if(sort==='fst')rows=[...rows].sort((a,b)=>b.fst-a.fst);if(sort==='delta')rows=[...rows].sort((a,b)=>b.delta-a.delta);if(sort==='frequency')rows=[...rows].sort((a,b)=>Math.abs(b.af1-b.af2)-Math.abs(a.af1-a.af2));
 body.innerHTML=rows.length?rows.map(row=>`<tr><td><span class="variant-code">${variantMetadata.rsid}</span><span class="population-label">chr${variantMetadata.chr}:${variantMetadata.pos} • ${variantMetadata.assembly}</span></td><td><span class="gene-code">${variantMetadata.gene}</span><span class="population-label">${variantMetadata.function}</span></td><td><span class="population-code">${row.pop1}</span><span class="population-label">${populationNames[row.pop1]}</span>${comparisonMetric(row.af1,'blue')}</td><td><span class="population-code">${row.pop2}</span><span class="population-label">${populationNames[row.pop2]}</span>${comparisonMetric(row.af2,'teal')}</td><td>${comparisonNumber(row.af1)}</td><td>${comparisonNumber(row.af2)}</td><td>${comparisonMetric(row.delta,'teal')}</td><td>${comparisonMetric(row.fst,'blue')}</td></tr>`).join(''):'<tr><td colspan="8" class="muted">No population pairs match the selected filters.</td></tr>';
 document.getElementById('comparisonSummary').innerHTML=`<div class="comparison-stat"><strong>${rows.length}</strong><span>Population pairs</span></div><div class="comparison-stat"><strong>${variantMetadata.rsid}</strong><span>Same SNP in every row</span></div><div class="comparison-stat"><strong>chr${variantMetadata.chr}:${variantMetadata.pos}</strong><span>Same genomic location</span></div><div class="comparison-stat"><strong>${variantMetadata.assembly}</strong><span>Assembly</span></div>`;
}
function setupPopulationComparison(){const pop1=document.getElementById('comparisonPop1'),pop2=document.getElementById('comparisonPop2');if(!pop1||!pop2)return;const codes=[...new Set(populationComparisons.flatMap(row=>[row.pop1,row.pop2]))].sort();codes.forEach(code=>{pop1.insertAdjacentHTML('beforeend',populationOption(code));pop2.insertAdjacentHTML('beforeend',populationOption(code))});[pop1,pop2,document.getElementById('comparisonSort')].forEach(control=>control.addEventListener('change',renderPopulationComparison));document.getElementById('resetComparison').addEventListener('click',()=>{pop1.value='';pop2.value='';document.getElementById('comparisonSort').value='original';renderPopulationComparison()});renderPopulationComparison()}
document.addEventListener('DOMContentLoaded',setupPopulationComparison);
