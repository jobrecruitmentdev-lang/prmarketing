'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { crmFetch, getCurrentUser } from '@/lib/crmApi';
import {
  BriefcaseIcon,
  UsersIcon,
  CalendarCheckIcon,
  TrendingUpIcon,
  PlusIcon,
  ExternalLinkIcon,
} from '@/components/crm/CrmIcons';

export default function TenantDashboardPage({ params }: { params: Promise<{ tenant: string }> }) {
  const resolvedParams = use(params);
  const tenantSlug = resolvedParams.tenant;

  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [salesSummary, setSalesSummary] = useState<any>(null);
  const [attendanceSummary, setAttendanceSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);

        const isMaster = currentUser?.role === 'master';
        const isAdmin = currentUser?.role === 'admin';
        const userModules: string[] = currentUser?.modules || [];

        const canRecruitment = isMaster || isAdmin || userModules.includes('recruitment');
        const canSales = isMaster || isAdmin || userModules.includes('sales');
        const canAttendance = isMaster || isAdmin;

        const [jobsRes, candRes, salesRes, attRes] = await Promise.all([
          canRecruitment
            ? crmFetch('/api/recruitment/jobs').catch((e) => {
                console.warn('Jobs fetch skipped or restricted:', e?.message || e);
                return { data: [] };
              })
            : Promise.resolve({ data: [] }),
          canRecruitment
            ? crmFetch('/api/recruitment/candidates').catch((e) => {
                console.warn('Candidates fetch skipped or restricted:', e?.message || e);
                return { data: [] };
              })
            : Promise.resolve({ data: [] }),
          canSales
            ? crmFetch('/api/sales/dashboard').catch((e) => {
                console.warn('Sales fetch skipped or restricted:', e?.message || e);
                return { data: {} };
              })
            : Promise.resolve({ data: {} }),
          canAttendance
            ? crmFetch('/api/attendance/summary').catch((e) => {
                console.warn('Attendance fetch skipped or restricted:', e?.message || e);
                return { total_employees: 0, status_counts: {} };
              })
            : Promise.resolve({ total_employees: 0, status_counts: {} }),
        ]);

        setJobs(jobsRes.data || []);
        setCandidates(candRes.data || []);
        setSalesSummary(salesRes.data || {});
        setAttendanceSummary(attRes || {});
      } catch (err) {
        console.error('Failed to load tenant dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [tenantSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#d6c180] rounded-full animate-spin"></div>
      </div>
    );
  }

  const isMaster = user?.role === 'master';
  const isAdmin = user?.role === 'admin';
  const userModules: string[] = user?.modules || [];
  const canRecruitment = isMaster || isAdmin || userModules.includes('recruitment');
  const canSales = isMaster || isAdmin || userModules.includes('sales');
  const canAttendance = isMaster || isAdmin;

  const activeJobs = jobs.filter(j => j.status === 'published' || j.status === 'Open');

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            {isAdmin || isMaster ? 'Organization Overview' : 'Employee Workspace'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isAdmin || isMaster
              ? 'Real-time status of recruitment, staff attendance & revenue pipeline'
              : `Welcome, ${user?.name || 'Team Member'} • Assigned Module(s): ${userModules.length > 0 ? userModules.join(', ') : 'Restricted'}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {canRecruitment && (
            <>
              <a
                href={`/c/${tenantSlug}/careers`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
              >
                <span>Live Careers Portal</span>
                <ExternalLinkIcon size={14} />
              </a>
              <Link
                href={`/crm/${tenantSlug}/jobs`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d6c180] text-[#0F172A] text-xs font-bold shadow-sm hover:opacity-90"
              >
                <PlusIcon size={16} />
                <span>Post Job</span>
              </Link>
            </>
          )}
          {!canRecruitment && canAttendance && (
            <Link
              href={`/crm/${tenantSlug}/attendance`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d6c180] text-[#0F172A] text-xs font-bold shadow-sm hover:opacity-90"
            >
              <CalendarCheckIcon size={16} />
              <span>Mark Attendance</span>
            </Link>
          )}
          {!canRecruitment && !canAttendance && canSales && (
            <Link
              href={`/crm/${tenantSlug}/sales`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d6c180] text-[#0F172A] text-xs font-bold shadow-sm hover:opacity-90"
            >
              <TrendingUpIcon size={16} />
              <span>Manage Sales</span>
            </Link>
          )}
        </div>
      </div>

      {/* Dynamic KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {canRecruitment && (
          <>
            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Openings</span>
                <BriefcaseIcon size={18} className="text-[#856E2E]" />
              </div>
              <p className="text-2xl font-black text-slate-900">{activeJobs.length}</p>
              <span className="text-[11px] text-slate-500 font-medium">Published positions</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Candidates</span>
                <UsersIcon size={18} className="text-[#856E2E]" />
              </div>
              <p className="text-2xl font-black text-slate-900">{candidates.length}</p>
              <span className="text-[11px] text-emerald-600 font-semibold">Active candidates</span>
            </div>
          </>
        )}

        {canAttendance && (
          <>
            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Staff Active</span>
                <CalendarCheckIcon size={18} className="text-[#856E2E]" />
              </div>
              <p className="text-2xl font-black text-slate-900">{attendanceSummary?.total_employees || 0}</p>
              <span className="text-[11px] text-slate-500 font-medium">Recorded in roster</span>
            </div>

            {!canRecruitment && (
              <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Present Marked</span>
                  <CalendarCheckIcon size={18} className="text-emerald-600" />
                </div>
                <p className="text-2xl font-black text-slate-900">{attendanceSummary?.status_counts?.present || 0}</p>
                <span className="text-[11px] text-emerald-600 font-semibold">Today's attendance</span>
              </div>
            )}
          </>
        )}

        {canSales && (
          <>
            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Sales</span>
                <TrendingUpIcon size={18} className="text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-slate-900">
                ₹{((salesSummary?.total_revenue || 0) / 100000).toFixed(2)} L
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold">Completed revenue</span>
            </div>

            {!canRecruitment && (
              <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Month Revenue</span>
                  <TrendingUpIcon size={18} className="text-[#856E2E]" />
                </div>
                <p className="text-2xl font-black text-slate-900">
                  ₹{((salesSummary?.month_revenue || 0) / 100000).toFixed(2)} L
                </p>
                <span className="text-[11px] text-slate-500 font-medium">Current cycle</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Main Content Area */}
      {canRecruitment ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Openings Box */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Active Job Vacancies</h2>
              <Link href={`/crm/${tenantSlug}/jobs`} className="text-xs font-bold text-[#856E2E] hover:underline">
                Manage All →
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {jobs.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No active job postings found. Click "Post Job" to create your first vacancy.
                </div>
              ) : (
                jobs.slice(0, 4).map((job) => (
                  <div key={job.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{job.title}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.work_mode || job.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        job.status === 'published' || job.status === 'Open' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Candidate Pipeline Activity */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Latest Candidate Applications</h2>
              <Link href={`/crm/${tenantSlug}/candidates`} className="text-xs font-bold text-[#856E2E] hover:underline">
                View Pipeline →
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {candidates.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No applications yet. Applications from the Career Page or Widget will appear here in real-time.
                </div>
              ) : (
                candidates.slice(0, 4).map((c) => (
                  <div key={c.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{c.name}</h3>
                      <p className="text-[11px] text-slate-500">{c.job_title || 'General Application'} • {c.email}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#F5EFE0] text-[#856E2E]">
                      {c.stage}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : canAttendance ? (
        /* Dedicated Attendance Module Card for Attendance Employees */
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EFE0] text-[#856E2E] flex items-center justify-center font-bold">
                <CalendarCheckIcon size={24} />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Attendance Management Desk</h2>
                <p className="text-xs text-slate-500">
                  You are assigned to the Staff Attendance module. Mark daily check-ins, record working hours & track leaves.
                </p>
              </div>
            </div>
            <Link
              href={`/crm/${tenantSlug}/attendance`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#d6c180] text-[#0F172A] text-xs font-bold shadow-sm hover:opacity-90"
            >
              <span>Open Attendance Roster →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E8E2D5]">
              <span className="text-xs font-bold text-slate-500 block mb-1">Total Active Staff</span>
              <p className="text-xl font-extrabold text-slate-900">{attendanceSummary?.total_employees || 0}</p>
              <span className="text-[11px] text-slate-400 font-medium">In organization roster</span>
            </div>
            <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E8E2D5]">
              <span className="text-xs font-bold text-slate-500 block mb-1">Present Recorded</span>
              <p className="text-xl font-extrabold text-emerald-600">{attendanceSummary?.status_counts?.present || 0}</p>
              <span className="text-[11px] text-slate-400 font-medium">Logged present</span>
            </div>
            <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E8E2D5]">
              <span className="text-xs font-bold text-slate-500 block mb-1">Leaves / Off</span>
              <p className="text-xl font-extrabold text-amber-600">{attendanceSummary?.status_counts?.leave || 0}</p>
              <span className="text-[11px] text-slate-400 font-medium">Approved leaves</span>
            </div>
          </div>
        </div>
      ) : canSales ? (
        /* Dedicated Sales Module Card for Sales Employees */
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EFE0] text-[#856E2E] flex items-center justify-center font-bold">
                <TrendingUpIcon size={24} />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Sales & Pipeline Desk</h2>
                <p className="text-xs text-slate-500">
                  You are assigned to the Sales & Revenue module. Log transactions, update deals & monitor customer conversions.
                </p>
              </div>
            </div>
            <Link
              href={`/crm/${tenantSlug}/sales`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#d6c180] text-[#0F172A] text-xs font-bold shadow-sm hover:opacity-90"
            >
              <span>Open Sales Desk →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E8E2D5]">
              <span className="text-xs font-bold text-slate-500 block mb-1">Total Closed Revenue</span>
              <p className="text-xl font-extrabold text-slate-900">
                ₹{((salesSummary?.total_revenue || 0) / 100000).toFixed(2)} Lakhs
              </p>
              <span className="text-[11px] text-slate-400 font-medium">All-time settled payments</span>
            </div>
            <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E8E2D5]">
              <span className="text-xs font-bold text-slate-500 block mb-1">Current Month Revenue</span>
              <p className="text-xl font-extrabold text-emerald-600">
                ₹{((salesSummary?.month_revenue || 0) / 100000).toFixed(2)} Lakhs
              </p>
              <span className="text-[11px] text-slate-400 font-medium">This billing month</span>
            </div>
          </div>
        </div>
      ) : (
        /* Restricted Employee Workspace */
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            🔒
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">No Modules Assigned Yet</h2>
          <p className="text-xs text-slate-500">
            Please contact your organization administrator to assign you to Recruitment, Attendance, or Sales modules.
          </p>
        </div>
      )}
    </div>
  );
}
