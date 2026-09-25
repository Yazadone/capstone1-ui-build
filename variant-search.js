// Mock variant metadata for tester searches. The existing search box can now find these values.
const variantSearchMetadata = {
  1: { gene: 'APOE', rsids: ['rs7412', 'rs429358'], variant: 'APOE rs7412' },
  2: { gene: 'DNMT3A', rsids: ['rs1805373'], variant: 'DNMT3A rs1805373' },
  3: { gene: 'HLA-DQA1', rsids: ['rs9273349'], variant: 'HLA-DQA1 rs9273349' },
  4: { gene: 'IL6', rsids: ['rs1800795'], variant: 'IL6 rs1800795' }
};

Object.entries(variantSearchMetadata).forEach(([id, metadata]) => {
  const dataset = datasets.find(item => item.id === Number(id));
  if (!dataset) return;
  dataset.gene = metadata.gene;
  dataset.rsids = metadata.rsids;
  dataset.variant = metadata.variant;
  dataset.description += ` Variant: ${metadata.variant}. SNP/rsID: ${metadata.rsids.join(', ')}.`;
});
