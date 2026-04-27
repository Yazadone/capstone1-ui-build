const datasets = [
  {
    id: 1,
    accession: 'GSE123456',
    currentAccession: 'GSE123456',
    source: 'NCBI GEO',
    type: 'SNP Genotyping',
    title: 'Population genomic analysis of European Homo sapiens',
    description: 'Comprehensive population genomic study examining genetic variation across European populations. This dataset includes genome-wide SNP genotyping data from 1,247 individuals sampled from Central Europe, Northern Europe, and Southern Europe.',
    taxId: 9606,
    organism: 'Homo sapiens',
    commonName: 'Human',
    tissue: 'Whole blood',
    population: 'European',
    region: 'Central Europe',
    platform: 'Illumina HumanOmniExpress',
    samples: 1247,
    markers: 642000,
    published: '2024-03-15',
    status: 'Active'
  },
  {
    id: 2,
    accession: 'GSE234567',
    currentAccession: 'GSE234567',
    source: 'ArrayExpress',
    type: 'Methylation Array',
    title: 'Asian population diversity study using methylation arrays',
    description: 'Large-scale DNA methylation study across East Asian populations. This dataset provides methylation profiles from 856 individuals and shows epigenetic variation across multiple population groups.',
    taxId: 9606,
    organism: 'Homo sapiens',
    commonName: 'Human',
    tissue: 'Peripheral blood mononuclear cells',
    population: 'East Asian',
    region: 'East Asia',
    platform: 'Illumina MethylationEPIC',
    samples: 856,
    markers: 850000,
    published: '2025-01-22',
    status: 'Active'
  },
  {
    id: 3,
    accession: 'GSE345678',
    currentAccession: 'GSE345678',
    source: 'NCBI SRA',
    type: 'Expression Array',
    title: 'African genetic diversity and adaptation signatures',
    description: 'Extensive population genomic study examining genetic diversity across multiple African populations. This dataset represents one of the largest collections of African genomic data with samples from Sub-Saharan Africa.',
    taxId: 9606,
    organism: 'Homo sapiens',
    commonName: 'Human',
    tissue: 'Saliva',
    population: 'African',
    region: 'Sub-Saharan Africa',
    platform: 'Illumina Global Screening Array',
    samples: 2103,
    markers: 850000,
    published: '2025-11-08',
    status: 'Active'
  },
  {
    id: 4,
    accession: 'E-MTAB-9753',
    currentAccession: 'E-MTAB-9753',
    source: 'ArrayExpress',
    type: 'Gene Expression',
    title: 'Latin American population expression profile project',
    description: 'Transcriptomic profiles for population comparison across admixed Latin American populations. This mock record demonstrates how a researcher could find, save, and request access to expression datasets.',
    taxId: 9606,
    organism: 'Homo sapiens',
    commonName: 'Human',
    tissue: 'Lymphoblastoid cell lines',
    population: 'Latin American',
    region: 'South America',
    platform: 'Illumina HumanHT-12',
    samples: 642,
    markers: 48000,
    published: '2024-09-30',
    status: 'Active'
  }
];

const ncbiRecords = [
  { id: 1, datasetId: 1, accession: 'GSM1000121', source: 'NCBI GEO', recordType: 'Sample', title: 'European blood sample A01', releaseDate: '2024-03-15', lastUpdated: '2025-02-03' },
  { id: 2, datasetId: 1, accession: 'SRR5501200', source: 'NCBI SRA', recordType: 'Run', title: 'SNP genotyping run batch 1', releaseDate: '2024-03-20', lastUpdated: '2025-02-03' },
  { id: 3, datasetId: 2, accession: 'E-GEOD-234567', source: 'ArrayExpress', recordType: 'Experiment', title: 'Methylation array series', releaseDate: '2025-01-22', lastUpdated: '2025-03-10' },
  { id: 4, datasetId: 3, accession: 'SRP345678', source: 'NCBI SRA', recordType: 'Project', title: 'African genetic diversity project', releaseDate: '2025-11-08', lastUpdated: '2026-01-16' }
];

const requests = [
  { id: 801, user: 'Dr. Maya Jackson', datasetId: 1, dataset: 'European Homo sapiens analysis', reason: 'Need genotype data for population structure comparison.', status: 'Pending', autoApproved: false, reviewedBy: '-', requestedAt: '2026-04-21', reviewedAt: '-' },
  { id: 802, user: 'Yacine Hamadou', datasetId: 3, dataset: 'African genetic diversity', reason: 'Class demo and visualization testing.', status: 'Approved', autoApproved: true, reviewedBy: 'Admin', requestedAt: '2026-04-18', reviewedAt: '2026-04-18' },
  { id: 803, user: 'Chris Tolis', datasetId: 2, dataset: 'Asian methylation arrays', reason: 'Missing institution verification.', status: 'Follow Up', autoApproved: false, reviewedBy: 'Admin', requestedAt: '2026-04-15', reviewedAt: '2026-04-16' },
  { id: 804, user: 'Christopher Pascucci', datasetId: 4, dataset: 'Latin American expression profile', reason: 'Needs controlled access for research methods review.', status: 'Denied', autoApproved: false, reviewedBy: 'Admin', requestedAt: '2026-04-11', reviewedAt: '2026-04-12' }
];

const analyses = [
  { id: 501, datasetId: 1, dataset: 'European Homo sapiens analysis', user: 'Yacine Hamadou', type: 'Population PCA', filters: 'Population: European; Markers: common SNPs; Missingness < 5%', summary: 'The first two principal components separate Northern, Central, and Southern European sample groups.', createdAt: '2026-04-20', status: 'Completed' },
  { id: 502, datasetId: 3, dataset: 'African genetic diversity', user: 'Dr. Maya Jackson', type: 'Admixture Summary', filters: 'Region: Sub-Saharan Africa; Sample quality: high', summary: 'Mock analysis shows multiple population clusters with strong regional structure.', createdAt: '2026-04-22', status: 'Running' },
  { id: 503, datasetId: 2, dataset: 'Asian methylation arrays', user: 'Chris Tolis', type: 'Methylation Heatmap', filters: 'Tissue: PBMC; Platform: EPIC', summary: 'Differential methylation patterns are grouped by population label in the demo results.', createdAt: '2026-04-23', status: 'Completed' }
];

const exportsHistory = [
  { id: 1, user: 'Yacine Hamadou', analysis: 'Population PCA', dataset: 'European Homo sapiens analysis', format: 'CSV', file: 'european_pca_results.csv', exportedAt: '2026-04-20' },
  { id: 2, user: 'Dr. Maya Jackson', analysis: 'Admixture Summary', dataset: 'African genetic diversity', format: 'PDF', file: 'african_admixture_summary.pdf', exportedAt: '2026-04-22' },
  { id: 3, user: 'Chris Tolis', analysis: 'Methylation Heatmap', dataset: 'Asian methylation arrays', format: 'PNG', file: 'methylation_heatmap.png', exportedAt: '2026-04-23' }
];

const users = [
  { id: 1, name: 'Yacine Hamadou', email: 'yacine@university.edu', role: 'Researcher', status: 'Active', createdAt: '2026-04-01' },
  { id: 2, name: 'Dr. Maya Jackson', email: 'mjackson@university.edu', role: 'Researcher', status: 'Active', createdAt: '2026-04-05' },
  { id: 3, name: 'Chris Tolis', email: 'ct@temple.edu', role: 'Reviewer', status: 'Pending', createdAt: '2026-04-10' },
  { id: 4, name: 'Admin User', email: 'admin@poparraydb.edu', role: 'Admin', status: 'Active', createdAt: '2026-03-15' }
];
