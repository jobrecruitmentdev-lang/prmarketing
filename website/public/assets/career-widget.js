/**
 * PR Marketing Multi-Tenant Career Widget (v1.0.0)
 * Standalone, zero-dependency Embeddable Widget using Shadow DOM
 */
(function () {
  'use strict';

  // 1. Locate widget configuration
  const currentScript = document.currentScript || (function() {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && scripts[i].src.indexOf('career-widget.js') !== -1) {
        return scripts[i];
      }
    }
    return null;
  })();

  const scriptBaseUrl = currentScript && currentScript.src 
    ? new URL(currentScript.src).origin 
    : 'http://localhost:8000';

  let targetElement = document.getElementById('crm-careers');
  let companySlug = (targetElement && targetElement.getAttribute('data-company')) || 
                    (currentScript && currentScript.getAttribute('data-company')) || 
                    'abc-technologies';

  if (!targetElement) {
    targetElement = document.createElement('div');
    targetElement.id = 'crm-careers';
    if (currentScript && currentScript.parentNode) {
      currentScript.parentNode.insertBefore(targetElement, currentScript.nextSibling);
    } else {
      document.body.appendChild(targetElement);
    }
  }

  // Attach Shadow DOM for style isolation
  const shadow = targetElement.attachShadow ? targetElement.attachShadow({ mode: 'open' }) : targetElement;

  // Render initial loading skeleton
  shadow.innerHTML = `
    <style>
      :host { display: block; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      .cw-container { max-width: 900px; margin: 0 auto; padding: 20px; color: #0F172A; }
      .cw-loading { text-align: center; padding: 40px; color: #64748B; font-size: 15px; }
      .cw-spinner { display: inline-block; width: 28px; height: 28px; border: 3px solid #E2E8F0; border-top-color: #d6c180; border-radius: 50%; animation: cw-spin 0.8s linear infinite; margin-bottom: 12px; }
      @keyframes cw-spin { to { transform: rotate(360deg); } }
    </style>
    <div class="cw-container">
      <div class="cw-loading">
        <div class="cw-spinner"></div>
        <div>Loading open career positions...</div>
      </div>
    </div>
  `;

  // Fetch company jobs and career settings
  async function loadCareerPortal() {
    try {
      const [compRes, jobsRes] = await Promise.all([
        fetch(`${scriptBaseUrl}/api/public/v1/companies/${encodeURIComponent(companySlug)}`).then(r => r.json()),
        fetch(`${scriptBaseUrl}/api/public/v1/companies/${encodeURIComponent(companySlug)}/jobs`).then(r => r.json())
      ]);

      if (!compRes.success || !jobsRes.success) {
        renderError('Unable to load career listings. Please try again later.');
        return;
      }

      const company = compRes.data.company;
      const settings = compRes.data.career_page || {};
      const jobs = jobsRes.jobs || [];

      renderPortal(company, settings, jobs);
    } catch (err) {
      console.error('Widget error:', err);
      renderError('Could not connect to career services.');
    }
  }

  function renderError(msg) {
    shadow.innerHTML = `
      <style>
        .cw-error { max-width: 600px; margin: 20px auto; padding: 18px 24px; background: #FEF2F2; border: 1px solid #FCA5A5; color: #991B1B; border-radius: 12px; text-align: center; font-size: 14px; font-family: sans-serif; }
      </style>
      <div class="cw-error">${msg}</div>
    `;
  }

  function renderPortal(company, settings, allJobs) {
    const primaryColor = settings.primary_color || '#d6c180';
    const departments = Array.from(new Set(allJobs.map(j => j.department).filter(Boolean)));

    const styles = `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :host { display: block; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0F172A; }
        .cw-container { max-width: 960px; margin: 0 auto; padding: 24px 16px; }
        
        .cw-header { margin-bottom: 28px; text-align: left; }
        .cw-badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; background: #FAF8F2; border: 1px solid #E5DECB; color: #856E2E; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px; }
        .cw-title { font-size: 28px; font-weight: 800; color: #0F172A; line-height: 1.25; margin-bottom: 8px; }
        .cw-desc { font-size: 15px; color: #475569; line-height: 1.5; max-width: 700px; }
        
        .cw-toolbar { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 24px; }
        .cw-search { flex: 1 1 240px; position: relative; }
        .cw-input, .cw-select { width: 100%; padding: 11px 16px; border: 1px solid #CBD5E1; border-radius: 10px; font-size: 14px; background: #FFFFFF; color: #0F172A; outline: none; transition: border-color 0.2s; }
        .cw-input:focus, .cw-select:focus { border-color: ${primaryColor}; box-shadow: 0 0 0 3px rgba(214, 193, 128, 0.2); }
        
        .cw-jobs-grid { display: flex; flex-direction: column; gap: 14px; }
        .cw-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px 24px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; transition: all 0.2s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .cw-card:hover { border-color: #CBD5E1; box-shadow: 0 6px 18px rgba(0,0,0,0.04); transform: translateY(-1px); }
        
        .cw-job-info { flex: 1 1 320px; }
        .cw-job-title { font-size: 18px; font-weight: 700; color: #0F172A; margin-bottom: 6px; }
        .cw-meta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; font-size: 13px; color: #64748B; margin-bottom: 8px; }
        .cw-pill { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 6px; background: #F8FAFC; border: 1px solid #E2E8F0; font-size: 12px; font-weight: 600; color: #334155; }
        
        .cw-btn-apply { display: inline-block; padding: 11px 22px; background: ${primaryColor}; color: #0F172A; font-weight: 700; font-size: 14px; border-radius: 9px; border: none; cursor: pointer; text-decoration: none; transition: opacity 0.15s; text-align: center; }
        .cw-btn-apply:hover { opacity: 0.88; }

        .cw-empty { text-align: center; padding: 48px 20px; background: #F8FAFC; border-radius: 12px; border: 1px dashed #CBD5E1; color: #64748B; font-size: 15px; }

        /* Modal Styles */
        .cw-modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(3px); z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 16px; opacity: 0; pointer-events: none; transition: opacity 0.2s; }
        .cw-modal-overlay.open { opacity: 1; pointer-events: auto; }
        .cw-modal { background: #FFFFFF; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; border-radius: 16px; padding: 28px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); border: 1px solid #E2E8F0; position: relative; transform: translateY(20px); transition: transform 0.2s; }
        .cw-modal-overlay.open .cw-modal { transform: translateY(0); }
        .cw-close-btn { position: absolute; top: 18px; right: 18px; background: #F1F5F9; border: none; font-size: 18px; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #475569; }
        .cw-close-btn:hover { background: #E2E8F0; }
        
        .cw-form-group { margin-bottom: 16px; }
        .cw-label { display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px; }
        .cw-label span { color: #DC2626; }
        .cw-textarea { width: 100%; padding: 10px 14px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 14px; resize: vertical; min-height: 80px; outline: none; font-family: inherit; }
        .cw-textarea:focus { border-color: ${primaryColor}; }
        .cw-file-drop { border: 2px dashed #CBD5E1; border-radius: 10px; padding: 18px; text-align: center; cursor: pointer; background: #F8FAFC; transition: border-color 0.2s; }
        .cw-file-drop:hover { border-color: ${primaryColor}; }
        .cw-submit-btn { width: 100%; padding: 13px; background: ${primaryColor}; color: #0F172A; border: none; border-radius: 10px; font-size: 15px; font-weight: 700; cursor: pointer; margin-top: 8px; }
        .cw-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .cw-toast { margin-top: 14px; padding: 12px 16px; border-radius: 8px; font-size: 13px; display: none; }
        .cw-toast.success { display: block; background: #ECFDF5; border: 1px solid #6EE7B7; color: #065F46; }
        .cw-toast.error { display: block; background: #FEF2F2; border: 1px solid #FCA5A5; color: #991B1B; }
      </style>
    `;

    function buildJobsList(filteredJobs) {
      if (filteredJobs.length === 0) {
        return `<div class="cw-empty">No positions currently open in this category. Check back soon!</div>`;
      }
      return filteredJobs.map(job => {
        let salaryText = null;
        if (job.is_salary_disclosed !== 0 && job.is_salary_disclosed !== false && job.is_salary_disclosed !== '0' && (!job.salary_range || !job.salary_range.toLowerCase().includes('not disclosed'))) {
          if (job.salary_min && job.salary_max) {
            const min = Number(job.salary_min);
            const max = Number(job.salary_max);
            if (min >= 100000 || max >= 100000) {
              salaryText = `₹${(min/100000).toFixed(1)} - ${(max/100000).toFixed(1)} LPA`;
            } else {
              salaryText = `₹${min.toLocaleString('en-IN')} - ₹${max.toLocaleString('en-IN')}`;
            }
          } else if (job.salary_range) {
            const match = job.salary_range.match(/(\d+(?:\.\d+)?)\s*[-–to]+\s*(\d+(?:\.\d+)?)/i);
            if (match) {
              const num1 = Number(match[1]);
              const num2 = Number(match[2]);
              if (num1 >= 100000 || num2 >= 100000) {
                salaryText = `₹${(num1/100000).toFixed(1)} - ${(num2/100000).toFixed(1)} LPA`;
              } else {
                salaryText = `₹${num1.toLocaleString('en-IN')} - ₹${num2.toLocaleString('en-IN')}`;
              }
            } else {
              salaryText = job.salary_range;
            }
          }
        }
        
        return `
          <div class="cw-card" data-id="${job.id}">
            <div class="cw-job-info">
              <h3 class="cw-job-title">${escapeHtml(job.title)}</h3>
              <div class="cw-meta-row">
                ${job.department ? `<span class="cw-pill">${escapeHtml(job.department)}</span>` : ''}
                ${job.work_mode ? `<span class="cw-pill">${escapeHtml(job.work_mode)}</span>` : ''}
                ${job.location ? `<span>📍 ${escapeHtml(job.location)}</span>` : ''}
                ${salaryText ? `<span>💰 ${salaryText}</span>` : ''}
              </div>
            </div>
            <button class="cw-btn-apply" data-job-id="${job.id}" data-job-title="${escapeHtml(job.title)}">
              Apply Now
            </button>
          </div>
        `;
      }).join('');
    }

    shadow.innerHTML = `
      ${styles}
      <div class="cw-container">
        <header class="cw-header">
          <div class="cw-badge">${allJobs.length} Open Positions</div>
          <h1 class="cw-title">${escapeHtml(settings.headline || `Careers at ${company.name}`)}</h1>
          <p class="cw-desc">${escapeHtml(settings.description || 'Join our innovative team and make a direct impact.')}</p>
        </header>

        <div class="cw-toolbar">
          <div class="cw-search">
            <input type="text" id="cw-search-input" class="cw-input" placeholder="Search by role or keyword...">
          </div>
          ${departments.length > 1 ? `
            <div style="flex: 0 0 200px;">
              <select id="cw-dept-select" class="cw-select">
                <option value="">All Departments</option>
                ${departments.map(d => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join('')}
              </select>
            </div>
          ` : ''}
        </div>

        <div id="cw-jobs-container" class="cw-jobs-grid">
          ${buildJobsList(allJobs)}
        </div>
      </div>

      <!-- Application Modal -->
      <div id="cw-modal-overlay" class="cw-modal-overlay">
        <div class="cw-modal">
          <button id="cw-modal-close" class="cw-close-btn">&times;</button>
          <h2 id="cw-modal-title" style="font-size: 20px; font-weight: 800; margin-bottom: 4px;">Apply for Job</h2>
          <p id="cw-modal-subtitle" style="font-size: 13px; color: #64748B; margin-bottom: 20px;">Complete this short application to get in touch with our hiring team.</p>

          <form id="cw-apply-form">
            <input type="hidden" id="cw-form-job-id" name="job_id">
            <input type="hidden" name="source" value="website_widget">

            <div class="cw-form-group">
              <label class="cw-label">Full Name <span>*</span></label>
              <input type="text" class="cw-input" id="cw-name" required placeholder="e.g. Rahul Sharma">
            </div>

            <div class="cw-form-group">
              <label class="cw-label">Email Address <span>*</span></label>
              <input type="email" class="cw-input" id="cw-email" required placeholder="rahul@example.com">
            </div>

            <div class="cw-form-group">
              <label class="cw-label">Phone Number <span>*</span></label>
              <input type="tel" class="cw-input" id="cw-phone" required placeholder="+91 98765 43210">
            </div>

            <div class="cw-form-group">
              <label class="cw-label">Current / Most Recent Company</label>
              <input type="text" class="cw-input" id="cw-last-company" placeholder="e.g. Acme Tech / Freelance">
            </div>

            <div class="cw-form-group">
              <label class="cw-label">Resume / CV (PDF or DOC) <span>*</span></label>
              <div class="cw-file-drop" id="cw-file-drop-area">
                <input type="file" id="cw-resume-file" accept=".pdf,.doc,.docx" required style="display: none;">
                <div id="cw-file-label" style="font-size: 13px; color: #475569;">
                  📎 Click to browse resume file (Max 10MB)
                </div>
              </div>
            </div>

            <div class="cw-form-group">
              <label class="cw-label">Note / Cover Letter (Optional)</label>
              <textarea class="cw-textarea" id="cw-cover-letter" placeholder="Why are you a good fit for this role?"></textarea>
            </div>

            <div id="cw-form-toast" class="cw-toast"></div>

            <button type="submit" id="cw-btn-submit" class="cw-submit-btn">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    `;

    // Setup interactive filter events
    const searchInput = shadow.getElementById('cw-search-input');
    const deptSelect = shadow.getElementById('cw-dept-select');
    const jobsContainer = shadow.getElementById('cw-jobs-container');

    function filterJobs() {
      const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const dept = deptSelect ? deptSelect.value : '';

      const filtered = allJobs.filter(job => {
        const matchesQ = !q || 
          (job.title && job.title.toLowerCase().includes(q)) ||
          (job.skills && job.skills.toLowerCase().includes(q)) ||
          (job.description && job.description.toLowerCase().includes(q));
        const matchesDept = !dept || job.department === dept;
        return matchesQ && matchesDept;
      });

      jobsContainer.innerHTML = buildJobsList(filtered);
      attachApplyButtons();
    }

    if (searchInput) searchInput.addEventListener('input', filterJobs);
    if (deptSelect) deptSelect.addEventListener('change', filterJobs);

    // Modal logic
    const modalOverlay = shadow.getElementById('cw-modal-overlay');
    const modalClose = shadow.getElementById('cw-modal-close');
    const modalTitle = shadow.getElementById('cw-modal-title');
    const formJobId = shadow.getElementById('cw-form-job-id');
    const fileDropArea = shadow.getElementById('cw-file-drop-area');
    const resumeFileInput = shadow.getElementById('cw-resume-file');
    const fileLabel = shadow.getElementById('cw-file-label');
    const applyForm = shadow.getElementById('cw-apply-form');
    const formToast = shadow.getElementById('cw-form-toast');
    const btnSubmit = shadow.getElementById('cw-btn-submit');

    function attachApplyButtons() {
      const applyBtns = shadow.querySelectorAll('.cw-btn-apply');
      applyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const jobId = btn.getAttribute('data-job-id');
          const jobTitle = btn.getAttribute('data-job-title');
          modalTitle.textContent = `Apply for ${jobTitle}`;
          formJobId.value = jobId;
          formToast.className = 'cw-toast';
          formToast.style.display = 'none';
          modalOverlay.classList.add('open');
        });
      });
    }

    attachApplyButtons();

    modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('open');
    });

    // File input trigger
    fileDropArea.addEventListener('click', () => resumeFileInput.click());
    resumeFileInput.addEventListener('change', () => {
      if (resumeFileInput.files.length > 0) {
        fileLabel.innerHTML = `✅ Selected: <strong>${escapeHtml(resumeFileInput.files[0].name)}</strong>`;
      }
    });

    // Form submission
    applyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const jobId = formJobId.value;
      if (!jobId) return;

      btnSubmit.disabled = true;
      btnSubmit.textContent = 'Submitting application...';
      formToast.className = 'cw-toast';
      formToast.style.display = 'none';

      const formData = new FormData();
      formData.append('name', shadow.getElementById('cw-name').value);
      formData.append('email', shadow.getElementById('cw-email').value);
      formData.append('phone', shadow.getElementById('cw-phone').value);
      formData.append('last_company', shadow.getElementById('cw-last-company').value);
      formData.append('cover_letter', shadow.getElementById('cw-cover-letter').value);
      formData.append('source', 'website_widget');
      if (resumeFileInput.files[0]) {
        formData.append('resume', resumeFileInput.files[0]);
      }

      try {
        const res = await fetch(`${scriptBaseUrl}/api/public/v1/jobs/${jobId}/applications`, {
          method: 'POST',
          body: formData
        });
        const result = await res.json();

        if (result.success) {
          formToast.className = 'cw-toast success';
          formToast.textContent = '🎉 ' + result.message;
          applyForm.reset();
          fileLabel.innerHTML = '📎 Click to browse resume file (Max 10MB)';
          setTimeout(() => {
            modalOverlay.classList.remove('open');
          }, 2500);
        } else {
          formToast.className = 'cw-toast error';
          formToast.textContent = '⚠️ ' + (result.error || 'Failed to submit application');
        }
      } catch (err) {
        formToast.className = 'cw-toast error';
        formToast.textContent = 'Network error. Please try again.';
      } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Submit Application';
      }
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCareerPortal);
  } else {
    loadCareerPortal();
  }
})();
