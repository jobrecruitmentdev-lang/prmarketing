'use client';

import React, { useState, useEffect } from 'react';
import { crmFetch, setAuthSession, getCurrentUser, CRM_API_BASE } from '@/lib/crmApi';
import { useRouter } from 'next/navigation';
import {
  BuildingIcon,
  UsersIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  PlusIcon,
  CalendarCheckIcon,
  ExternalLinkIcon,
  CheckIcon,
  XIcon,
  CodeIcon,
  SettingsIcon,
  CopyIcon,
} from '@/components/crm/CrmIcons';

export default function MasterDashboardPage() {
  const router = useRouter();
  const [overview, setOverview] = useState<any>(null);
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Drilldown state
  const [selectedTenantId, setSelectedTenantId] = useState<number | null>(null);
  const [drilldownData, setDrilldownData] = useState<any>(null);
  const [drilldownLoading, setDrilldownLoading] = useState(false);
  const [drilldownTab, setDrilldownTab] = useState<'employees' | 'attendance' | 'sales' | 'jobs' | 'career'>('employees');

  // Career & Widget settings state
  const [careerHeadline, setCareerHeadline] = useState('Build your career with us.');
  const [careerDesc, setCareerDesc] = useState('');
  const [careerColor, setCareerColor] = useState('#d6c180');
  const [careerEnabled, setCareerEnabled] = useState(true);
  const [careerShowSalary, setCareerShowSalary] = useState(true);
  const [careerShowLocation, setCareerShowLocation] = useState(true);
  const [careerFeedback, setCareerFeedback] = useState<string | null>(null);
  const [isSavingCareer, setIsSavingCareer] = useState(false);
  const [isWidgetCopied, setIsWidgetCopied] = useState(false);

  // New Tenant Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [slug, setSlug] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('Admin@123');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Edit Tenant Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTenantId, setEditTenantId] = useState<number | null>(null);
  const [editCompanyName, setEditCompanyName] = useState('');
  const [editWebsiteUrl, setEditWebsiteUrl] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAdminPassword, setEditAdminPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const loadData = async () => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role !== 'master') {
      const slug = currentUser.tenant_slug || 'abc-technologies';
      router.push(`/crm/${slug}/dashboard`);
      return;
    }

    try {
      setLoading(true);
      const [ovRes, tenRes] = await Promise.all([
        crmFetch('/api/master/overview'),
        crmFetch('/api/master/tenants'),
      ]);
      setOverview(ovRes.data);
      const tenantList = tenRes.data || [];
      setTenants(tenantList);
      if (tenantList.length > 0 && !selectedTenantId) {
        setSelectedTenantId(tenantList[0].id);
      }
    } catch (err: any) {
      console.warn('Failed to load master data:', err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Fetch Drilldown details when selectedTenantId changes
  useEffect(() => {
    if (!selectedTenantId) return;
    async function loadDrilldown() {
      try {
        setDrilldownLoading(true);
        const res = await crmFetch(`/api/master/drilldown/${selectedTenantId}`);
        setDrilldownData(res.data);
        if (res.data?.career_page) {
          const cp = res.data.career_page;
          setCareerHeadline(cp.headline || 'Build your career with us.');
          setCareerDesc(cp.description || '');
          setCareerColor(cp.primary_color || '#d6c180');
          setCareerEnabled(cp.enabled !== undefined ? Boolean(Number(cp.enabled)) : true);
          setCareerShowSalary(cp.show_salary !== undefined ? Boolean(Number(cp.show_salary)) : true);
          setCareerShowLocation(cp.show_location !== undefined ? Boolean(Number(cp.show_location)) : true);
        }
      } catch (err) {
        console.error('Failed to load drilldown:', err);
      } finally {
        setDrilldownLoading(false);
      }
    }
    loadDrilldown();
  }, [selectedTenantId]);

  const handleSaveCareerSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTenantId) return;
    try {
      setIsSavingCareer(true);
      setCareerFeedback(null);
      await crmFetch(`/api/master/tenants/${selectedTenantId}/career-settings`, {
        method: 'PUT',
        body: JSON.stringify({
          enabled: careerEnabled ? 1 : 0,
          headline: careerHeadline,
          description: careerDesc,
          primary_color: careerColor,
          show_salary: careerShowSalary ? 1 : 0,
          show_location: careerShowLocation ? 1 : 0,
        }),
      });
      setCareerFeedback('Career page branding & widget configuration saved successfully!');
      setTimeout(() => setCareerFeedback(null), 4000);
    } catch (err: any) {
      setCareerFeedback('Failed to save settings: ' + err.message);
    } finally {
      setIsSavingCareer(false);
    }
  };

  const copyWidgetEmbedCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsWidgetCopied(true);
    setTimeout(() => setIsWidgetCopied(false), 2000);
  };

  const handleCreateTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setFeedback(null);
      await crmFetch('/api/master/tenants', {
        method: 'POST',
        body: JSON.stringify({
          company_display_name: companyName,
          slug,
          admin_name: adminName,
          admin_email: adminEmail,
          admin_password: adminPassword,
          website_url: websiteUrl,
          phone,
        }),
      });
      setFeedback('Tenant successfully created!');
      setCompanyName('');
      setSlug('');
      setAdminName('');
      setAdminEmail('');
      setWebsiteUrl('');
      setPhone('');
      await loadData();
      setTimeout(() => {
        setIsModalOpen(false);
        setFeedback(null);
      }, 1500);
    } catch (err: any) {
      setFeedback('Error: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenEditModal = (t: any) => {
    setEditTenantId(t.id);
    setEditCompanyName(t.company_display_name);
    setEditWebsiteUrl(t.website_url || '');
    setEditPhone(t.phone || '');
    setEditEmail(t.email || '');
    setEditAdminPassword('');
    setIsEditModalOpen(true);
  };

  const handleUpdateTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTenantId) return;
    try {
      setIsUpdating(true);
      const payload: any = {
        company_display_name: editCompanyName,
        website_url: editWebsiteUrl,
        phone: editPhone,
        email: editEmail,
      };
      if (editAdminPassword.trim()) {
        payload.admin_password = editAdminPassword.trim();
      }

      await crmFetch(`/api/master/tenants/${editTenantId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      setIsEditModalOpen(false);
      setEditAdminPassword('');
      await loadData();
      if (selectedTenantId === editTenantId) {
        const res = await crmFetch(`/api/master/drilldown/${editTenantId}`);
        setDrilldownData(res.data);
      }
    } catch (err: any) {
      alert('Error updating organization: ' + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteTenant = async (id: number, name: string) => {
    if (!confirm(`CAUTION: Are you sure you want to permanently delete '${name}'? This will delete all its staff, jobs, attendance, and sales data.`)) {
      return;
    }
    try {
      await crmFetch(`/api/master/tenants/${id}`, { method: 'DELETE' });
      setSelectedTenantId(null);
      await loadData();
    } catch (err: any) {
      alert('Failed to delete organization: ' + err.message);
    }
  };

  const handleImpersonateTenant = async (tenantId: number) => {
    try {
      const res = await crmFetch(`/api/master/impersonate/${tenantId}`, { method: 'POST' });
      if (res.success && res.token) {
        setAuthSession(res.token, res.user);
        router.push(`/crm/${res.user.tenant_slug}/dashboard`);
      }
    } catch (err: any) {
      alert('Impersonation failed: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#d6c180] rounded-full animate-spin"></div>
      </div>
    );
  }

  const selectedTenant = tenants.find(t => t.id === selectedTenantId) || tenants[0];

  return (
    <div className="space-y-8">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Master Control Center</h1>
          <p className="text-xs text-slate-500 mt-1">Multi-tenant management & full organizational drilldown</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d6c180] text-[#0F172A] text-xs font-bold shadow-sm hover:opacity-90"
        >
          <PlusIcon size={16} />
          <span>New Organization</span>
        </button>
      </div>

      {/* Global KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Organizations</span>
            <BuildingIcon size={18} className="text-[#856E2E]" />
          </div>
          <p className="text-2xl font-black text-slate-900">{overview?.total_tenants || 0}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">{overview?.active_tenants || 0} active</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Jobs</span>
            <BriefcaseIcon size={18} className="text-[#856E2E]" />
          </div>
          <p className="text-2xl font-black text-slate-900">{overview?.total_jobs || 0}</p>
          <span className="text-[11px] text-slate-500 font-medium">Across all tenants</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Candidates</span>
            <UsersIcon size={18} className="text-[#856E2E]" />
          </div>
          <p className="text-2xl font-black text-slate-900">{overview?.total_candidates || 0}</p>
          <span className="text-[11px] text-slate-500 font-medium">Global applicant pool</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Revenue</span>
            <TrendingUpIcon size={18} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">
            ₹{((overview?.total_revenue || 0) / 100000).toFixed(2)} L
          </p>
          <span className="text-[11px] text-slate-500 font-medium">Recorded collections</span>
        </div>
      </div>

      {/* SECTION: DEEP DRILLDOWN INSPECTOR (USER APPROVED FEATURE) */}
      <div className="bg-white border-2 border-[#E5DECB] rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <span className="text-[10px] font-bold text-[#856E2E] uppercase tracking-wider bg-[#F5EFE0] px-2.5 py-1 rounded-md mb-2 inline-block">
              Super Admin Drilldown Inspector
            </span>
            <h2 className="text-lg font-extrabold text-slate-900">
              Live Company Deep-Dive
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Inspect all staff members, attendance roster, sales, and jobs of any client</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="text-xs font-bold text-slate-600">Select Organization:</label>
            <select
              value={selectedTenantId || ''}
              onChange={(e) => setSelectedTenantId(parseInt(e.target.value, 10))}
              className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white font-bold text-xs text-slate-900 shadow-sm focus:outline-none focus:border-[#d6c180]"
            >
              {tenants.map(t => (
                <option key={t.id} value={t.id}>
                  {t.company_display_name} ({t.employee_count || 0} Staff)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Drilldown Subtabs */}
        {selectedTenant && (
          <div className="mt-6">
            <div className="border-b border-slate-200 flex gap-6 text-xs font-bold mb-6">
              <button
                onClick={() => setDrilldownTab('employees')}
                className={`pb-3 border-b-2 transition-colors ${
                  drilldownTab === 'employees' ? 'border-[#856E2E] text-[#856E2E]' : 'border-transparent text-slate-500'
                }`}
              >
                Staff Roster ({drilldownData?.employees?.length || 0})
              </button>
              <button
                onClick={() => setDrilldownTab('attendance')}
                className={`pb-3 border-b-2 transition-colors ${
                  drilldownTab === 'attendance' ? 'border-[#856E2E] text-[#856E2E]' : 'border-transparent text-slate-500'
                }`}
              >
                Attendance Register ({drilldownData?.attendance?.length || 0})
              </button>
              <button
                onClick={() => setDrilldownTab('sales')}
                className={`pb-3 border-b-2 transition-colors ${
                  drilldownTab === 'sales' ? 'border-[#856E2E] text-[#856E2E]' : 'border-transparent text-slate-500'
                }`}
              >
                Sales & Leads ({drilldownData?.sales?.length || 0})
              </button>
              <button
                onClick={() => setDrilldownTab('jobs')}
                className={`pb-3 border-b-2 transition-colors ${
                  drilldownTab === 'jobs' ? 'border-[#856E2E] text-[#856E2E]' : 'border-transparent text-slate-500'
                }`}
              >
                Job Openings ({drilldownData?.jobs?.length || 0})
              </button>
              <button
                onClick={() => setDrilldownTab('career')}
                className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  drilldownTab === 'career' ? 'border-[#856E2E] text-[#856E2E]' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <SettingsIcon size={14} />
                <span>Career &amp; Widget (Options A &amp; B)</span>
              </button>
            </div>

            {drilldownLoading ? (
              <div className="py-12 text-center">
                <div className="w-6 h-6 border-2 border-slate-200 border-t-[#d6c180] rounded-full animate-spin mx-auto mb-2"></div>
                <span className="text-xs text-slate-500">Loading drilldown data...</span>
              </div>
            ) : (
              <div>
                {/* 1. Staff Roster */}
                {drilldownTab === 'employees' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-[#FAF9F5] border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                        <tr>
                          <th className="px-4 py-3">Code</th>
                          <th className="px-4 py-3">Staff Name</th>
                          <th className="px-4 py-3">Designation</th>
                          <th className="px-4 py-3">Department</th>
                          <th className="px-4 py-3">Assigned Modules</th>
                          <th className="px-4 py-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {drilldownData?.employees?.length === 0 ? (
                          <tr><td colSpan={6} className="py-6 text-center text-slate-400">No staff registered for this tenant.</td></tr>
                        ) : (
                          drilldownData?.employees?.map((emp: any) => (
                            <tr key={emp.id} className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-mono font-bold text-slate-600">{emp.employee_code}</td>
                              <td className="px-4 py-3 font-bold text-slate-900">{emp.name}</td>
                              <td className="px-4 py-3">{emp.designation || 'Associate'}</td>
                              <td className="px-4 py-3">{emp.department || 'Operations'}</td>
                              <td className="px-4 py-3">
                                <div className="flex flex-wrap gap-1">
                                  {emp.modules?.map((m: string) => (
                                    <span key={m} className="px-1.5 py-0.5 bg-[#F5EFE0] text-[#856E2E] rounded text-[9px] font-bold uppercase">
                                      {m}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-right font-bold text-emerald-600 uppercase text-[10px]">
                                {emp.status}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 2. Attendance Register */}
                {drilldownTab === 'attendance' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-[#FAF9F5] border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                        <tr>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Staff Name</th>
                          <th className="px-4 py-3">Designation</th>
                          <th className="px-4 py-3">Timing</th>
                          <th className="px-4 py-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {drilldownData?.attendance?.length === 0 ? (
                          <tr><td colSpan={5} className="py-6 text-center text-slate-400">No attendance records logged yet.</td></tr>
                        ) : (
                          drilldownData?.attendance?.map((att: any) => (
                            <tr key={att.id} className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-mono text-slate-600">{att.date}</td>
                              <td className="px-4 py-3 font-bold text-slate-900">{att.employee_name}</td>
                              <td className="px-4 py-3">{att.designation}</td>
                              <td className="px-4 py-3 font-mono">{att.check_in_time} - {att.check_out_time}</td>
                              <td className="px-4 py-3 text-right">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  att.status === 'present' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                                }`}>
                                  {att.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 3. Sales & Leads */}
                {drilldownTab === 'sales' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-[#FAF9F5] border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                        <tr>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Client Name</th>
                          <th className="px-4 py-3">Service</th>
                          <th className="px-4 py-3">Amount</th>
                          <th className="px-4 py-3 text-right">Payment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {drilldownData?.sales?.length === 0 ? (
                          <tr><td colSpan={5} className="py-6 text-center text-slate-400">No sales transactions logged.</td></tr>
                        ) : (
                          drilldownData?.sales?.map((sale: any) => (
                            <tr key={sale.id} className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-mono text-slate-600">{sale.sale_date}</td>
                              <td className="px-4 py-3 font-bold text-slate-900">{sale.client_name}</td>
                              <td className="px-4 py-3">{sale.service_or_product}</td>
                              <td className="px-4 py-3 font-bold">₹{parseFloat(sale.amount).toLocaleString('en-IN')}</td>
                              <td className="px-4 py-3 text-right uppercase text-[10px] font-bold text-emerald-600">
                                {sale.payment_status}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 4. Jobs */}
                {drilldownTab === 'jobs' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-[#FAF9F5] border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                        <tr>
                          <th className="px-4 py-3">Position Title</th>
                          <th className="px-4 py-3">Department</th>
                          <th className="px-4 py-3">Work Mode</th>
                          <th className="px-4 py-3">Applicants</th>
                          <th className="px-4 py-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {drilldownData?.jobs?.length === 0 ? (
                          <tr><td colSpan={5} className="py-6 text-center text-slate-400">No jobs posted yet.</td></tr>
                        ) : (
                          drilldownData?.jobs?.map((job: any) => (
                            <tr key={job.id} className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-bold text-slate-900">{job.title}</td>
                              <td className="px-4 py-3">{job.department}</td>
                              <td className="px-4 py-3">{job.work_mode}</td>
                              <td className="px-4 py-3 font-bold">{job.candidate_count || 0}</td>
                              <td className="px-4 py-3 text-right uppercase text-[10px] font-bold text-emerald-600">
                                {job.status}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 5. Career & Widget Settings (Options A & B) */}
                {drilldownTab === 'career' && selectedTenant && (
                  <div className="space-y-6">
                    {careerFeedback && (
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center justify-between">
                        <span>{careerFeedback}</span>
                        <button onClick={() => setCareerFeedback(null)} className="text-emerald-600 font-bold hover:text-emerald-900">✕</button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Option A: Hosted Portal Branding */}
                      <div className="bg-[#FAF9F5] border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 mb-1.5">
                              Option A
                            </span>
                            <h3 className="text-sm font-extrabold text-slate-900">Hosted Career Portal Branding</h3>
                            <p className="text-xs text-slate-500">
                              Direct portal at <code className="text-[#856E2E] font-mono">/c/{selectedTenant.slug}/careers</code>
                            </p>
                          </div>
                          <a
                            href={`/c/${selectedTenant.slug}/careers`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
                          >
                            <span>Live Portal</span>
                            <ExternalLinkIcon size={14} />
                          </a>
                        </div>

                        <form onSubmit={handleSaveCareerSettings} className="space-y-3 pt-2">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Hero Headline</label>
                            <input
                              type="text"
                              value={careerHeadline}
                              onChange={(e) => setCareerHeadline(e.target.value)}
                              placeholder="Build your career with us."
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs focus:outline-none focus:border-[#d6c180]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Company Pitch / Description</label>
                            <textarea
                              rows={3}
                              value={careerDesc}
                              onChange={(e) => setCareerDesc(e.target.value)}
                              placeholder="Describe why candidates should join this company..."
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs focus:outline-none focus:border-[#d6c180]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3 items-center">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Brand Accent Color</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={careerColor}
                                  onChange={(e) => setCareerColor(e.target.value)}
                                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                                />
                                <input
                                  type="text"
                                  value={careerColor}
                                  onChange={(e) => setCareerColor(e.target.value)}
                                  className="w-24 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-mono"
                                />
                              </div>
                            </div>
                            <div className="space-y-1.5 pt-1">
                              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={careerShowSalary}
                                  onChange={(e) => setCareerShowSalary(e.target.checked)}
                                  className="rounded border-slate-300 text-[#856E2E] focus:ring-0"
                                />
                                <span>Show Salary Ranges</span>
                              </label>
                              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={careerShowLocation}
                                  onChange={(e) => setCareerShowLocation(e.target.checked)}
                                  className="rounded border-slate-300 text-[#856E2E] focus:ring-0"
                                />
                                <span>Show Office Location</span>
                              </label>
                            </div>
                          </div>

                          <div className="pt-1">
                            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={careerEnabled}
                                onChange={(e) => setCareerEnabled(e.target.checked)}
                                className="rounded border-slate-300 text-[#856E2E] focus:ring-0"
                              />
                              <span>Enable Public Hosted Career Page</span>
                            </label>
                          </div>

                          <button
                            type="submit"
                            disabled={isSavingCareer}
                            className="w-full px-4 py-2.5 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 mt-3"
                          >
                            {isSavingCareer ? 'Saving Branding Settings...' : 'Save Hosted Portal Branding'}
                          </button>
                        </form>
                      </div>

                      {/* Option B: Universal Embed Widget */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 mb-1.5">
                            Option B
                          </span>
                          <h3 className="text-sm font-extrabold text-slate-900">Universal Website Embed Widget</h3>
                          <p className="text-xs text-slate-500 mb-4">
                            Provide this 2-line snippet to <strong>{selectedTenant.company_display_name}</strong>. Their open vacancies &amp; candidate application flow will embed live directly on their official website (WordPress, Shopify, Webflow, React, HTML).
                          </p>

                          {/* Embed Code Snippet */}
                          <div className="bg-[#0F172A] rounded-xl p-4 text-slate-200 font-mono text-xs relative">
                            <button
                              onClick={() => {
                                const siteOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://prmarketingventures.com';
                                const code = `<!-- PR Marketing Careers Widget for ${selectedTenant.company_display_name} -->\n<div id="crm-careers" data-company="${selectedTenant.slug}"></div>\n<script src="${siteOrigin}/assets/career-widget.js" async></script>`;
                                copyWidgetEmbedCode(code);
                              }}
                              className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-colors"
                            >
                              {isWidgetCopied ? <CheckIcon size={14} className="text-emerald-400" /> : <CopyIcon size={14} />}
                              <span>{isWidgetCopied ? 'Copied!' : 'Copy Code'}</span>
                            </button>
                            <pre className="overflow-x-auto text-[#d6c180] pr-20 whitespace-pre-wrap">
{`<!-- PR Marketing Careers Widget for ${selectedTenant.company_display_name} -->
<div id="crm-careers" data-company="${selectedTenant.slug}"></div>
<script src="${typeof window !== 'undefined' ? window.location.origin : 'https://prmarketingventures.com'}/assets/career-widget.js" async></script>`}
                            </pre>
                          </div>

                          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                            <div className="font-bold text-slate-800">Master Integration Controls:</div>
                            <ul className="list-disc pl-4 space-y-1 text-[11px]">
                              <li><strong>Shadow DOM Isolation:</strong> Client website styles cannot alter or conflict with application modal styles.</li>
                              <li><strong>Zero Maintenance:</strong> When tenant adds/edits jobs in CRM, client website updates instantly.</li>
                              <li><strong>Direct Pipeline:</strong> Candidate resumes and details feed directly into this tenant&apos;s CRM module.</li>
                            </ul>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center gap-3">
                          <a
                            href={`/widget-demo.html?company=${selectedTenant.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
                          >
                            <CodeIcon size={14} />
                            <span>Launch Live Client Website Demo ↗</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tenants Table with Full CRUD (Update & Delete) */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#E2E8F0]">
          <h2 className="text-sm font-bold text-slate-900">All Client Organizations ({tenants.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#FAF9F5] border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Company</th>
                <th className="px-5 py-3.5">Slug</th>
                <th className="px-5 py-3.5">Staff</th>
                <th className="px-5 py-3.5">Jobs</th>
                <th className="px-5 py-3.5">Candidates</th>
                <th className="px-5 py-3.5">Revenue</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Master Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-900">
                    <div>{t.company_display_name}</div>
                    {t.website_url && (
                      <span className="text-[10px] text-slate-400 font-normal">{t.website_url}</span>
                    )}
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">
                    /c/{t.slug}/careers
                  </td>
                  <td className="px-5 py-4 font-semibold">{t.employee_count || 0}</td>
                  <td className="px-5 py-4 font-semibold">{t.job_count || 0}</td>
                  <td className="px-5 py-4 font-semibold">{t.candidate_count || 0}</td>
                  <td className="px-5 py-4 font-semibold">
                    ₹{((parseFloat(t.total_sales) || 0) / 100000).toFixed(1)} L
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      t.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEditModal(t)}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-[11px] font-bold cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTenant(t.id, t.company_display_name)}
                      className="px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-[11px] font-bold cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: New Organization */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative my-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200"
            >
              ✕
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Create New Organization</h3>
            <p className="text-xs text-slate-500 mb-6">Setup new tenant workspace, career portal, and admin credentials</p>

            {feedback && (
              <div className="p-3 mb-4 rounded-xl bg-slate-50 text-xs font-semibold text-slate-800 border border-slate-200">
                {feedback}
              </div>
            )}

            <form onSubmit={handleCreateTenant} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    if (!slug) {
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                    }
                  }}
                  placeholder="e.g. Apex Innovations"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company Slug (URL identifier) *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  placeholder="e.g. apex-innovations"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Admin Name *</label>
                  <input
                    type="text"
                    required
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email *</label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="hr@apexinnovations.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Admin Password *</label>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Official Website</label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 disabled:opacity-50 mt-4"
              >
                {isSaving ? 'Registering Organization...' : 'Create Organization'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Organization */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative my-auto">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200"
            >
              ✕
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Edit Organization</h3>
            <p className="text-xs text-slate-500 mb-5">Update company branding and contact information</p>

            <form onSubmit={handleUpdateTenant} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company Display Name</label>
                <input
                  type="text"
                  required
                  value={editCompanyName}
                  onChange={(e) => setEditCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Website URL</label>
                <input
                  type="url"
                  value={editWebsiteUrl}
                  onChange={(e) => setEditWebsiteUrl(e.target.value)}
                  placeholder="https://company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Change / Reset Admin Password <span className="text-slate-400 font-normal">(Leave blank to keep unchanged)</span>
                </label>
                <input
                  type="password"
                  value={editAdminPassword}
                  onChange={(e) => setEditAdminPassword(e.target.value)}
                  placeholder="•••••••• (Enter new password to reset)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 disabled:opacity-50 mt-4"
              >
                {isUpdating ? 'Saving Changes...' : 'Save Organization Details'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
