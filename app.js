function getDatasetIdFromUrl(){
  const params = new URLSearchParams(window.location.search);
  return Number(params.get('id')) || 1;
}

function getSavedIds(){
  try { return JSON.parse(localStorage.getItem('savedDatasetIds')) || []; }
  catch { return []; }
}

function setSavedIds(ids){
  localStorage.setItem('savedDatasetIds', JSON.stringify(ids));
}

function isSaved(id){
  return getSavedIds().includes(Number(id));
}

function toggleSave(id){
  id = Number(id);
  const ids = getSavedIds();
  let message = '';
  if(ids.includes(id)){
    setSavedIds(ids.filter(item => item !== id));
    message = 'Dataset removed from saved list.';
  }else{
    ids.push(id);
    setSavedIds(ids);
    message = 'Dataset saved for later.';
  }
  showToast(message);
  if(document.body.dataset.page === 'datasets') renderDatasets();
  if(document.body.dataset.page === 'saved') renderSaved();
  if(document.body.dataset.page === 'detail') renderDetail();
}

function showToast(message){
  let toast = document.querySelector('.toast');
  if(!toast){
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function statusBadge(status){
  const clean = String(status).toLowerCase();
  if(clean.includes('approved') || clean.includes('active') || clean.includes('completed')) return `<span class="badge badge-green">${status}</span>`;
  if(clean.includes('pending') || clean.includes('running')) return `<span class="badge badge-orange">${status}</span>`;
  if(clean.includes('denied')) return `<span class="badge badge-red">${status}</span>`;
  if(clean.includes('follow')) return `<span class="badge badge-purple">${status}</span>`;
  return `<span class="badge">${status}</span>`;
}

function shortText(text, max){
  if(text.length <= max) return text;
  return text.substring(0, max).trim() + '...';
}

function datasetCard(dataset){
  const savedLabel = isSaved(dataset.id) ? 'Saved ✓' : 'Save';
  return `
    <article class="dataset-card card card-hover">
      <div>
        <div>
          <span class="tag">${dataset.accession}</span>
          <span class="tag">${dataset.source}</span>
        </div>
        <h3>${dataset.title}</h3>
        <p>${shortText(dataset.description, 210)}</p>
        <div class="dataset-meta">
          <div class="meta-item"><span class="meta-icon">▣</span><div><strong>${dataset.organism}</strong><span>${dataset.tissue}</span></div></div>
          <div class="meta-item"><span class="meta-icon">👥</span><div><strong>${dataset.samples.toLocaleString()} samples</strong><span>${dataset.population}</span></div></div>
          <div class="meta-item"><span class="meta-icon">📍</span><div><strong>${dataset.region}</strong><span>Geography</span></div></div>
          <div class="meta-item"><span class="meta-icon">📅</span><div><strong>${dataset.published}</strong><span>Published</span></div></div>
        </div>
      </div>
      <div class="actions-col">
        <a class="btn btn-dark" href="dataset-detail.html?id=${dataset.id}">View Details</a>
        <button class="btn btn-outline" onclick="toggleSave(${dataset.id})">${savedLabel}</button>
      </div>
    </article>
  `;
}

function renderFeatured(){
  const box = document.getElementById('featuredDatasets');
  if(!box) return;
  box.innerHTML = datasets.slice(0,2).map(dataset => `
    <article class="card card-pad card-hover">
      <div><span class="tag">${dataset.accession}</span></div>
      <h3>${dataset.title}</h3>
      <p class="muted">${shortText(dataset.description, 130)}</p>
      <div class="quick-tags">
        <span>${dataset.organism}</span><span>${dataset.samples.toLocaleString()} samples</span><span>${dataset.region}</span>
      </div>
      <br>
      <a class="btn btn-dark" href="dataset-detail.html?id=${dataset.id}">View Details</a>
    </article>
  `).join('');
}

function renderDatasets(){
  const list = document.getElementById('datasetList');
  if(!list) return;
  const search = (document.getElementById('datasetSearch')?.value || '').toLowerCase();
  const type = document.getElementById('datasetFilter')?.value || 'All';
  const filtered = datasets.filter(dataset => {
    const matchesSearch = [dataset.title, dataset.description, dataset.accession, dataset.organism, dataset.region, dataset.type, dataset.source].join(' ').toLowerCase().includes(search);
    const matchesType = type === 'All' || dataset.type === type || dataset.source === type;
    return matchesSearch && matchesType;
  });
  document.getElementById('resultCount').textContent = `${filtered.length} dataset${filtered.length === 1 ? '' : 's'} found`;
  list.innerHTML = filtered.length ? filtered.map(datasetCard).join('') : `<div class="card empty-state"><div><div class="empty-icon">⌕</div><h2>No datasets found</h2><p>Try a different keyword or filter.</p></div></div>`;
}

function renderSaved(){
  const list = document.getElementById('savedList');
  if(!list) return;
  const saved = datasets.filter(dataset => isSaved(dataset.id));
  if(saved.length === 0){
    list.innerHTML = `
      <div class="card empty-state">
        <div>
          <div class="empty-icon">♡</div>
          <h2>No saved datasets yet</h2>
          <p>Browse the dataset discovery page and save datasets for quick access later.</p>
          <a class="btn btn-dark" href="datasets.html">Browse Datasets</a>
        </div>
      </div>
    `;
  }else{
    list.innerHTML = `<div class="dataset-list">${saved.map(datasetCard).join('')}</div>`;
  }
}

function renderDetail(){
  const target = document.getElementById('detailArea');
  if(!target) return;
  const dataset = datasets.find(item => item.id === getDatasetIdFromUrl()) || datasets[0];
  const related = ncbiRecords.filter(record => record.datasetId === dataset.id);
  target.innerHTML = `
    <div class="detail-layout">
      <main>
        <section class="card detail-hero">
          <span class="tag">${dataset.accession}</span>
          <span class="tag">${dataset.source}</span>
          <span class="tag">${dataset.type}</span>
          <h1>${dataset.title}</h1>
          <p>${dataset.description}</p>
          <div class="metrics">
            <div class="metric"><strong>${dataset.samples.toLocaleString()}</strong><span>Samples</span></div>
            <div class="metric"><strong>${dataset.markers.toLocaleString()}</strong><span>Markers</span></div>
            <div class="metric"><strong>${dataset.taxId}</strong><span>Tax ID</span></div>
          </div>
        </section>

        <section class="card card-pad" style="margin-top:20px">
          <h2>Dataset Information</h2>
          <div class="info-table">
            <div class="info-row"><span>Current Accession</span><strong>${dataset.currentAccession}</strong></div>
            <div class="info-row"><span>Organism</span><strong>${dataset.organism} (${dataset.commonName})</strong></div>
            <div class="info-row"><span>Tissue / Sample Type</span><strong>${dataset.tissue}</strong></div>
            <div class="info-row"><span>Population</span><strong>${dataset.population}</strong></div>
            <div class="info-row"><span>Geographic Region</span><strong>${dataset.region}</strong></div>
            <div class="info-row"><span>Platform</span><strong>${dataset.platform}</strong></div>
            <div class="info-row"><span>Published Date</span><strong>${dataset.published}</strong></div>
          </div>
        </section>

        <section class="card card-pad" style="margin-top:20px">
          <h2>Linked NCBI / Repository Records</h2>
          ${related.length ? related.map(record => `
            <div class="record-row">
              <div>
                <strong>${record.title}</strong>
                <div class="muted">${record.source} • ${record.recordType} • ${record.accession}</div>
              </div>
              <div class="muted">Updated ${record.lastUpdated}</div>
            </div>
          `).join('') : '<p class="muted">No linked records found for this mock dataset.</p>'}
        </section>
      </main>
      <aside>
        <section class="side-card card">
          <h3>Actions</h3>
          <button class="btn btn-dark btn-block" onclick="openRequestModal(${dataset.id})">Request Access</button><br><br>
          <button class="btn btn-outline btn-block" onclick="toggleSave(${dataset.id})">${isSaved(dataset.id) ? 'Remove Saved Dataset' : 'Save Dataset'}</button><br><br>
          <a class="btn btn-outline btn-block" href="analyses.html">Run Mock Analysis</a>
        </section>
        <section class="side-card card">
          <h3>Status</h3>
          ${statusBadge(dataset.status)}
          <br><br>
          <div class="info-table">
            <div class="info-row"><span>Uploaded By</span><strong>Admin</strong></div>
            <div class="info-row"><span>HIPAA Access</span><strong>Required</strong></div>
            <div class="info-row"><span>Export</span><strong>CSV / PDF</strong></div>
          </div>
        </section>
      </aside>
    </div>
  `;
}

function renderRequests(){
  const list = document.getElementById('requestTableBody');
  if(!list) return;
  const filter = document.querySelector('.tab-btn.active')?.dataset.filter || 'All';
  const shown = filter === 'All' ? requests : requests.filter(req => req.status === filter);
  list.innerHTML = shown.map(req => `
    <tr>
      <td><strong>#${req.id}</strong></td>
      <td>${req.user}</td>
      <td>${req.dataset}</td>
      <td>${shortText(req.reason, 55)}</td>
      <td>${statusBadge(req.status)}</td>
      <td>${req.requestedAt}</td>
      <td>
        <button class="btn btn-outline" onclick="showToast('Opened request #${req.id}')">View</button>
        <button class="btn btn-success" onclick="showToast('Mock action: request approved')">Approve</button>
        <button class="btn btn-danger" onclick="showToast('Mock action: follow-up sent')">Follow Up</button>
      </td>
    </tr>
  `).join('');
}

function setupRequestFilters(){
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(item => item.classList.remove('active'));
      btn.classList.add('active');
      renderRequests();
    });
  });
}

function renderAnalyses(){
  const body = document.getElementById('analysisTableBody');
  if(!body) return;
  body.innerHTML = analyses.map(analysis => `
    <tr>
      <td><strong>${analysis.type}</strong><div class="muted">${analysis.dataset}</div></td>
      <td>${analysis.user}</td>
      <td>${analysis.filters}</td>
      <td>${statusBadge(analysis.status)}</td>
      <td>${analysis.createdAt}</td>
      <td>
        <button class="btn btn-outline" onclick="showToast('${analysis.summary}')">View Results</button>
        <button class="btn btn-dark" onclick="showToast('Mock export created for ${analysis.type}')">Export</button>
      </td>
    </tr>
  `).join('');
}

function renderExports(){
  const body = document.getElementById('exportTableBody');
  if(!body) return;
  body.innerHTML = exportsHistory.map(item => `
    <tr>
      <td><strong>${item.file}</strong></td>
      <td>${item.dataset}</td>
      <td>${item.analysis}</td>
      <td>${item.format}</td>
      <td>${item.exportedAt}</td>
      <td><button class="btn btn-dark" onclick="showToast('Mock download started for ${item.file}')">Download</button></td>
    </tr>
  `).join('');
}

function setupAdminTabs(){
  document.querySelectorAll('[data-admin-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-admin-tab]').forEach(item => item.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(panel => panel.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.adminTab).classList.add('active');
    });
  });
}

function renderAdmin(){
  const usersBody = document.getElementById('usersBody');
  const requestsBody = document.getElementById('adminRequestsBody');
  const datasetsBody = document.getElementById('adminDatasetsBody');
  if(usersBody){
    usersBody.innerHTML = users.map(user => `
      <tr><td><strong>${user.name}</strong></td><td>${user.email}</td><td>${user.role}</td><td>${statusBadge(user.status)}</td><td>${user.createdAt}</td><td><button class="btn btn-outline" onclick="showToast('Mock edit user: ${user.name}')">Edit</button></td></tr>
    `).join('');
  }
  if(requestsBody){
    requestsBody.innerHTML = requests.map(req => `
      <tr><td>#${req.id}</td><td>${req.user}</td><td>${req.dataset}</td><td>${statusBadge(req.status)}</td><td><button class="btn btn-success" onclick="showToast('Request approved in demo')">Approve</button></td></tr>
    `).join('');
  }
  if(datasetsBody){
    datasetsBody.innerHTML = datasets.map(dataset => `
      <tr><td><strong>${dataset.title}</strong></td><td>${dataset.accession}</td><td>${dataset.source}</td><td>${dataset.samples.toLocaleString()}</td><td>${statusBadge(dataset.status)}</td><td><a class="btn btn-outline" href="dataset-detail.html?id=${dataset.id}">Open</a></td></tr>
    `).join('');
  }
}

function openRequestModal(id){
  const modal = document.getElementById('requestModal');
  if(!modal) return;
  const dataset = datasets.find(item => item.id === Number(id));
  document.getElementById('modalDatasetTitle').textContent = dataset ? dataset.title : 'Selected Dataset';
  document.getElementById('requestDatasetId').value = id;
  modal.classList.add('show');
}

function closeRequestModal(){
  const modal = document.getElementById('requestModal');
  if(modal) modal.classList.remove('show');
}

function submitRequest(event){
  event.preventDefault();
  closeRequestModal();
  showToast('Access request submitted. This is mock demo data.');
}

function setupForms(){
  const signIn = document.getElementById('signInForm');
  if(signIn){
    signIn.addEventListener('submit', event => {
      event.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      if(!email || !password){
        document.getElementById('loginError').classList.add('show');
        return;
      }
      window.location.href = 'home.html';
    });
  }

  const register = document.getElementById('registerForm');
  if(register){
    register.addEventListener('submit', event => {
      event.preventDefault();
      showToast('Registration request submitted for review.');
      setTimeout(() => window.location.href = 'index.html', 900);
    });
  }

  const requestForm = document.getElementById('requestForm');
  if(requestForm) requestForm.addEventListener('submit', submitRequest);
}

function setupSearch(){
  const datasetSearch = document.getElementById('datasetSearch');
  const datasetFilter = document.getElementById('datasetFilter');
  if(datasetSearch) datasetSearch.addEventListener('input', renderDatasets);
  if(datasetFilter) datasetFilter.addEventListener('change', renderDatasets);

  const homeSearch = document.getElementById('homeSearchForm');
  if(homeSearch){
    homeSearch.addEventListener('submit', event => {
      event.preventDefault();
      const q = document.getElementById('homeSearchInput').value.trim();
      window.location.href = 'datasets.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
  }

  const query = new URLSearchParams(window.location.search).get('q');
  if(query && datasetSearch){
    datasetSearch.value = query;
  }
}

function setActiveNav(){
  const page = document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach(link => {
    if(link.dataset.nav === page) link.classList.add('active');
  });
}

function init(){
  setActiveNav();
  setupForms();
  setupSearch();
  setupRequestFilters();
  setupAdminTabs();
  renderFeatured();
  renderDatasets();
  renderSaved();
  renderDetail();
  renderRequests();
  renderAnalyses();
  renderExports();
  renderAdmin();
}

document.addEventListener('DOMContentLoaded', init);
