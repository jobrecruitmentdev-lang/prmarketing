'use client';

import React, { useState, useEffect, use } from 'react';
import { crmFetch, CRM_API_BASE } from '@/lib/crmApi';
import {
  BriefcaseIcon,
  PlusIcon,
  CodeIcon,
  SettingsIcon,
  ExternalLinkIcon,
  CopyIcon,
  CheckIcon,
} from '@/components/crm/CrmIcons';

export default function JobsManagementPage({ params }: { params: Promise<{ tenant: string }> }) {
  const resolvedParams = use(params);
  const tenantSlug = resolvedParams.tenant;

  const [activeTab, setActiveTab] = useState<'jobs' | 'settings' | 'widget'>('jobs');
  const [jobs, setJobs] = useState<any[]>([]);
  const [careerSettings, setCareerSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  // Job Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [location, setLocation] = useState('Ahmedabad, India');
  const [type, setType] = useState('Full Time');
  const [workMode, setWorkMode] = useState('On-site');
  const [salaryMin, setSalaryMin] = useState('500000');
  const [salaryMax, setSalaryMax] = useState('900000');
  const [expMin, setExpMin] = useState('2');
  const [expMax, setExpMax] = useState('5');
  const [skills, setSkills] = useState('');
  const [description, setDescription] = useState('');
  const [vacancies, setVacancies] = useState('1');
  const [isSaving, setIsSaving] = useState(false);

  // Edit Job Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editJobId, setEditJobId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDepartment, setEditDepartment] = useState('Engineering');
  const [editLocation, setEditLocation] = useState('Ahmedabad, India');
  const [editType, setEditType] = useState('Full Time');
  const [editWorkMode, setEditWorkMode] = useState('On-site');
  const [editSalaryMin, setEditSalaryMin] = useState('500000');
  const [editSalaryMax, setEditSalaryMax] = useState('900000');
  const [editExpMin, setEditExpMin] = useState('2');
  const [editExpMax, setEditExpMax] = useState('5');
  const [editSkills, setEditSkills] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editVacancies, setEditVacancies] = useState('1');
  const [editStatus, setEditStatus] = useState('published');
  const [isUpdating, setIsUpdating] = useState(false);

  // Career settings form
  const [pageHeadline, setPageHeadline] = useState('');
  const [pageDesc, setPageDesc] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#d6c180');
  const [showSalary, setShowSalary] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [settingsFeedback, setSettingsFeedback] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [jobsRes, setRes] = await Promise.all([
        crmFetch('/api/recruitment/jobs'),
        crmFetch('/api/recruitment/career-settings'),
      ]);
      setJobs(jobsRes.data || []);
      const s = setRes.data || {};
      setCareerSettings(s);
      setPageHeadline(s.headline || '');
      setPageDesc(s.description || '');
      setPrimaryColor(s.primary_color || '#d6c180');
      setShowSalary(Boolean(s.show_salary));
      setShowLocation(Boolean(s.show_location));
    } catch (err) {
      console.error('Failed to load jobs data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [tenantSlug]);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await crmFetch('/api/recruitment/jobs', {
        method: 'POST',
        body: JSON.stringify({
          title,
          department,
          location,
          type,
          work_mode: workMode,
          salary_min: salaryMin,
          salary_max: salaryMax,
          experience_min: expMin,
          experience_max: expMax,
          skills,
          description,
          vacancies,
          status: 'published',
        }),
      });
      await loadData();
      setIsModalOpen(false);
      setTitle('');
      setSkills('');
      setDescription('');
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    const nextStatus = (currentStatus === 'published' || currentStatus === 'Open') ? 'closed' : 'published';
    try {
      await crmFetch(`/api/recruitment/jobs/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus }),
      });
      loadData();
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleOpenEditModal = (job: any) => {
    setEditJobId(job.id);
    setEditTitle(job.title || '');
    setEditDepartment(job.department || 'Engineering');
    setEditLocation(job.location || 'Ahmedabad, India');
    setEditType(job.type || 'Full Time');
    setEditWorkMode(job.work_mode || 'On-site');
    setEditSalaryMin(job.salary_min ? String(job.salary_min) : '500000');
    setEditSalaryMax(job.salary_max ? String(job.salary_max) : '900000');
    setEditExpMin(job.experience_min ? String(job.experience_min) : '2');
    setEditExpMax(job.experience_max ? String(job.experience_max) : '5');
    setEditSkills(job.skills || '');
    setEditDescription(job.description || '');
    setEditVacancies(job.vacancies ? String(job.vacancies) : '1');
    setEditStatus(job.status || 'published');
    setIsEditModalOpen(true);
  };

  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editJobId) return;
    try {
      setIsUpdating(true);
      await crmFetch(`/api/recruitment/jobs/${editJobId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: editTitle,
          department: editDepartment,
          location: editLocation,
          type: editType,
          work_mode: editWorkMode,
          salary_min: editSalaryMin,
          salary_max: editSalaryMax,
          experience_min: editExpMin,
          experience_max: editExpMax,
          skills: editSkills,
          description: editDescription,
          vacancies: editVacancies,
          status: editStatus,
        }),
      });
      setIsEditModalOpen(false);
      await loadData();
    } catch (err: any) {
      alert('Error updating job: ' + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteJob = async (id: number, jobTitle: string) => {
    if (!confirm(`Are you sure you want to permanently delete '${jobTitle}'?`)) {
      return;
    }
    try {
      await crmFetch(`/api/recruitment/jobs/${id}`, { method: 'DELETE' });
      await loadData();
    } catch (err: any) {
      alert('Error deleting job: ' + err.message);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSettingsFeedback(null);
      await crmFetch('/api/recruitment/career-settings', {
        method: 'PUT',
        body: JSON.stringify({
          enabled: 1,
          headline: pageHeadline,
          description: pageDesc,
          primary_color: primaryColor,
          show_salary: showSalary ? 1 : 0,
          show_location: showLocation ? 1 : 0,
        }),
      });
      setSettingsFeedback('Career page settings saved successfully!');
    } catch (err: any) {
      setSettingsFeedback('Failed to save settings: ' + err.message);
    }
  };

  const siteOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://prmarketingventures.com';
  const widgetEmbedCode = `<!-- PR Marketing Careers Widget -->
<div id="crm-careers" data-company="${tenantSlug}"></div>
<script src="${siteOrigin}/assets/career-widget.js" async></script>`;

  const copyWidgetCode = () => {
    navigator.clipboard.writeText(widgetEmbedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#d6c180] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Jobs & Career Engine</h1>
          <p className="text-xs text-slate-500 mt-1">Multi-tenant job listings, career page customization & embed widget</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/c/${tenantSlug}/careers`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
          >
            <span>Live Careers Page</span>
            <ExternalLinkIcon size={14} />
          </a>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d6c180] text-[#0F172A] text-xs font-bold shadow-sm hover:opacity-90"
          >
            <PlusIcon size={16} />
            <span>Create Job Opening</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E2E8F0] flex gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'jobs' ? 'border-[#856E2E] text-[#856E2E]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BriefcaseIcon size={16} />
          <span>Active Vacancies ({jobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('widget')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'widget' ? 'border-[#856E2E] text-[#856E2E]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CodeIcon size={16} />
          <span>Website Widget (Option B)</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'settings' ? 'border-[#856E2E] text-[#856E2E]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <SettingsIcon size={16} />
          <span>Hosted Page Branding (Option A)</span>
        </button>
      </div>

      {/* TAB 1: Jobs List */}
      {activeTab === 'jobs' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#FAF9F5] border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Position Title</th>
                  <th className="px-5 py-3.5">Department</th>
                  <th className="px-5 py-3.5">Mode / Type</th>
                  <th className="px-5 py-3.5">Salary Range</th>
                  <th className="px-5 py-3.5">Applicants</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => {
                  const isPub = job.status === 'published' || job.status === 'Open';
                  const sal = (job.salary_min && job.salary_max)
                    ? `₹${(job.salary_min/100000).toFixed(1)} - ${(job.salary_max/100000).toFixed(1)} LPA`
                    : 'Not disclosed';

                  return (
                    <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 font-bold text-slate-900">
                        <div>{job.title}</div>
                        <span className="text-[10px] text-slate-400 font-normal">📍 {job.location || 'Remote'}</span>
                      </td>
                      <td className="px-5 py-4 font-semibold">{job.department}</td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {job.work_mode || job.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-800">{sal}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 font-bold text-slate-900">
                          {job.candidate_count || 0}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isPub ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {isPub ? 'Published' : 'Closed'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right space-x-2">
                        <a
                          href={`/c/${tenantSlug}/careers/${job.slug || job.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-[11px] font-bold inline-block"
                        >
                          Preview ↗
                        </a>
                        <button
                          onClick={() => handleToggleStatus(job.id, job.status)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-[11px] font-bold"
                        >
                          {isPub ? 'Close Job' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(job)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-[11px] font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id, job.title)}
                          className="px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-[11px] font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Website Widget (Option B) */}
      {activeTab === 'widget' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-base font-extrabold text-slate-900 mb-1">Universal Embed Widget (Option B)</h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mb-6">
              Give this 2-line code snippet to your client company. When they paste it into any website (WordPress, Shopify, React, HTML, Webflow), their open jobs and application form will automatically load live from your CRM database without them needing any backend!
            </p>

            <div className="bg-[#0F172A] rounded-2xl p-5 text-slate-200 font-mono text-xs relative">
              <button
                onClick={copyWidgetCode}
                className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-colors"
              >
                {isCopied ? <CheckIcon size={14} className="text-emerald-400" /> : <CopyIcon size={14} />}
                <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
              </button>
              <pre className="overflow-x-auto text-[#d6c180] pr-20">{widgetEmbedCode}</pre>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="/widget-demo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d6c180] text-[#0F172A] text-xs font-bold hover:opacity-90 shadow-sm"
              >
                <span>Open Simulated Client Website Demo ↗</span>
              </a>
              <span className="text-xs text-slate-500">
                Tests Shadow DOM isolation and direct application flow.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Career Page Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm max-w-3xl">
          <h2 className="text-base font-extrabold text-slate-900 mb-1">Hosted Career Page Branding (Option A)</h2>
          <p className="text-xs text-slate-500 mb-6">Customize the headline, colors, and information displayed on your hosted portal at <code>/c/{tenantSlug}/careers</code></p>

          {settingsFeedback && (
            <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
              {settingsFeedback}
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hero Headline</label>
              <input
                type="text"
                value={pageHeadline}
                onChange={(e) => setPageHeadline(e.target.value)}
                placeholder="Build your career with us."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subheadline / Description</label>
              <textarea
                rows={3}
                value={pageDesc}
                onChange={(e) => setPageDesc(e.target.value)}
                placeholder="Describe your company culture, mission, and benefits..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Brand Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-28 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSalary}
                    onChange={(e) => setShowSalary(e.target.checked)}
                    className="rounded border-slate-300 text-[#856E2E] focus:ring-0"
                  />
                  <span>Show Salary Ranges to Candidates</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showLocation}
                    onChange={(e) => setShowLocation(e.target.checked)}
                    className="rounded border-slate-300 text-[#856E2E] focus:ring-0"
                  />
                  <span>Show Office Location & Work Mode</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 mt-4"
            >
              Save Career Page Settings
            </button>
          </form>
        </div>
      )}

      {/* Create Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200"
            >
              ✕
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Post New Job Vacancy</h3>
            <p className="text-xs text-slate-500 mb-6">Immediately updates Hosted Career Page and client website embed widget</p>

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Lead Fullstack Engineer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR & Recruitment">HR & Recruitment</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Mode</label>
                  <select
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Employment Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Min Salary (INR / Year)</label>
                  <input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    placeholder="500000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Salary (INR / Year)</label>
                  <input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    placeholder="1000000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ahmedabad, Gujarat"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Required Skills</label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="React, Node.js, SQL, REST"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Description & Responsibilities</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key responsibilities, team expectations, and qualifications..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 disabled:opacity-50 mt-2"
              >
                {isSaving ? 'Publishing Job...' : 'Publish Job Listing'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200"
            >
              ✕
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Edit Job Vacancy</h3>
            <p className="text-xs text-slate-500 mb-6">Modify details, compensation, work mode, or published status</p>

            <form onSubmit={handleUpdateJob} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR & Recruitment">HR & Recruitment</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Mode</label>
                  <select
                    value={editWorkMode}
                    onChange={(e) => setEditWorkMode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Employment Type</label>
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Min Salary (INR)</label>
                  <input
                    type="number"
                    value={editSalaryMin}
                    onChange={(e) => setEditSalaryMin(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Salary (INR)</label>
                  <input
                    type="number"
                    value={editSalaryMax}
                    onChange={(e) => setEditSalaryMax(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Required Skills</label>
                  <input
                    type="text"
                    value={editSkills}
                    onChange={(e) => setEditSkills(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Job Description</label>
                <textarea
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 disabled:opacity-50 mt-2"
              >
                {isUpdating ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
