'use client';

import React, { useState, useEffect, use, useRef } from 'react';
import Link from 'next/link';
import { getCrmUrl } from '@/lib/crmApi';

// Clean SVG Vector Icons (No Emojis)
const MapPinIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SearchIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const BriefcaseIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const BanknoteIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

const ClockIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ZapIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const SparklesIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);

const RocketIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const ScaleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

const TrendingUpIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const UsersIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const UploadCloudIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m8 16 4-4 4 4" />
  </svg>
);

const FileTextIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
  </svg>
);

const CheckIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LockIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ArrowRightIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

interface Job {
  id: number;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  work_mode: string;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_range?: string | null;
  is_salary_disclosed?: number | boolean | null;
  salary_currency?: string;
  experience_min?: number;
  experience_max?: number;
  skills: string;
  description: string;
}

interface CompanyInfo {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  website: string | null;
  industry: string | null;
  location: string | null;
}

interface CareerSettings {
  page_title: string;
  headline: string;
  description: string;
  primary_color: string;
  secondary_color: string;
  button_color: string;
  show_salary: number;
  show_location: number;
  show_company_description: number;
}

export default function HostedCareerPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const resolvedParams = use(params);
  const rawCompanySlug = resolvedParams.companySlug;

  // Dynamically resolve actual slug from URL in Next.js static export
  const [companySlug, setCompanySlug] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/\/c\/([^/]+)\/careers/);
      if (match && match[1] && match[1] !== 'default') {
        return decodeURIComponent(match[1]);
      }
    }
    return rawCompanySlug && rawCompanySlug !== 'default' ? rawCompanySlug : 'abc-technologies';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/\/c\/([^/]+)\/careers/);
      if (match && match[1] && match[1] !== 'default') {
        setCompanySlug(decodeURIComponent(match[1]));
      }
    }
  }, [rawCompanySlug]);

  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [settings, setSettings] = useState<CareerSettings | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedMode, setSelectedMode] = useState('');

  // Application Modal state (for specific job)
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formCoverLetter, setFormCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Drop Your CV state (Right-side sticky card)
  const [dropName, setDropName] = useState('');
  const [dropEmail, setDropEmail] = useState('');
  const [dropPhone, setDropPhone] = useState('');
  const [dropRole, setDropRole] = useState('');
  const [dropNote, setDropNote] = useState('');
  const [dropFile, setDropFile] = useState<File | null>(null);
  const [isDropSubmitting, setIsDropSubmitting] = useState(false);
  const [dropStatus, setDropStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // File input refs for custom dropzone click triggers
  const dropFileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [compRes, jobsRes] = await Promise.all([
          fetch(getCrmUrl(`/public/v1/companies/${encodeURIComponent(companySlug)}`)).then(r => r.json()),
          fetch(getCrmUrl(`/public/v1/companies/${encodeURIComponent(companySlug)}/jobs`)).then(r => r.json()),
        ]);

        if (!compRes.success || !jobsRes.success) {
          setError(compRes.error || jobsRes.error || 'Company career portal could not be loaded.');
          return;
        }

        setCompany(compRes.data.company);
        setSettings(compRes.data.career_page);
        setJobs(jobsRes.jobs || []);
      } catch {
        setError('Could not connect to the recruitment server.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [companySlug]);

  const departments = Array.from(new Set(jobs.map(j => j.department).filter(Boolean)));
  const workModes = Array.from(new Set(jobs.map(j => j.work_mode).filter(Boolean)));

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.skills && job.skills.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDept = !selectedDept || job.department === selectedDept;
    const matchesMode = !selectedMode || job.work_mode === selectedMode;
    return matchesSearch && matchesDept && matchesMode;
  });

  const handleOpenApply = (job: Job) => {
    setActiveJob(job);
    setSubmitStatus(null);
    setIsModalOpen(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJob) return;

    try {
      setIsSubmitting(true);
      setSubmitStatus(null);

      const formData = new FormData();
      formData.append('name', formName);
      formData.append('email', formEmail);
      formData.append('phone', formPhone);
      formData.append('last_company', formCompany);
      formData.append('cover_letter', formCoverLetter);
      formData.append('source', 'hosted_career_page');
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      const res = await fetch(getCrmUrl(`/public/v1/jobs/${activeJob.id}/applications`), {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSubmitStatus({ success: true, message: data.message });
        setFormName('');
        setFormEmail('');
        setFormPhone('');
        setFormCompany('');
        setFormCoverLetter('');
        setResumeFile(null);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2800);
      } else {
        setSubmitStatus({ success: false, message: data.error || 'Failed to submit application' });
      }
    } catch {
      setSubmitStatus({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDropCvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dropFile) {
      setDropStatus({ success: false, message: 'Please attach your CV/Resume file (PDF, DOC, DOCX).' });
      return;
    }

    try {
      setIsDropSubmitting(true);
      setDropStatus(null);

      const formData = new FormData();
      formData.append('name', dropName);
      formData.append('email', dropEmail);
      formData.append('phone', dropPhone);
      formData.append('preferred_role', dropRole);
      formData.append('note', dropNote);
      formData.append('resume', dropFile);

      const res = await fetch(getCrmUrl(`/public/v1/companies/${encodeURIComponent(companySlug)}/drop-cv`), {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setDropStatus({ success: true, message: data.message || 'Your CV has been received! Our recruitment team will review your profile.' });
        setDropName('');
        setDropEmail('');
        setDropPhone('');
        setDropRole('');
        setDropNote('');
        setDropFile(null);
      } else {
        setDropStatus({ success: false, message: data.error || 'Failed to submit CV. Please try again.' });
      }
    } catch {
      setDropStatus({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setIsDropSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#d6c180] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-semibold text-sm tracking-wide">Loading career opportunities...</p>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-red-200 rounded-3xl p-8 text-center shadow-lg">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">!</div>
          <h2 className="text-xl font-extrabold text-slate-900 mb-2">Portal Unavailable</h2>
          <p className="text-slate-600 text-sm mb-6">{error || 'Career portal not found or inactive.'}</p>
          <Link href="/" className="inline-block px-6 py-2.5 bg-[#d6c180] text-[#0F172A] font-bold text-xs rounded-xl hover:opacity-90 transition-opacity">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const primaryGold = settings?.primary_color || '#d6c180';

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0F172A] selection:bg-[#F5EFE0] selection:text-[#856E2E]">
      
      {/* Top Navbar */}
      <header className="border-b border-[#E8E2D5] bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white flex items-center justify-center font-black text-base shadow-sm ring-2 ring-[#E8E2D5]">
              {company.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-base tracking-tight">{company.name}</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200" title="Verified Employer">
                  <CheckIcon className="w-2.5 h-2.5" />
                  <span>Verified</span>
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                <span>Careers Portal</span>
                {company.location && (
                  <>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-0.5 text-slate-500">
                      <MapPinIcon className="w-3 h-3 text-slate-400" />
                      <span>{company.location}</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EFE0] border border-[#E5DECB] text-[#856E2E] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{jobs.length} Open Positions</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#FAF9F5] to-[#F5EFE0]/40 border-b border-[#E8E2D5] py-14 sm:py-16 px-4 sm:px-6">
        {/* Subtle Decorative Ambient Shapes */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d6c180]/15 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-[#0F172A]/5 rounded-full blur-2xl -z-0 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFE0] border border-[#E5DECB] text-[#856E2E] text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
            <SparklesIcon className="w-3.5 h-3.5 text-[#856E2E]" />
            <span>We&apos;re Hiring • Shape The Future With Us</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.15] mb-5">
            {settings?.headline || `Build Your Career at ${company.name}`}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            {settings?.description || 'Explore our open opportunities, join a mission-driven team, or share your profile for future openings.'}
          </p>

          {/* Quick Highlight Stats with Vector Line Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2 border-t border-[#E8E2D5]/70">
            <div className="p-3 bg-white/80 backdrop-blur rounded-2xl border border-[#E8E2D5] text-center shadow-xs">
              <BriefcaseIcon className="w-4 h-4 text-[#856E2E] mx-auto mb-1" />
              <span className="block text-xl font-black text-slate-900">{jobs.length}</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Open Roles</span>
            </div>
            <div className="p-3 bg-white/80 backdrop-blur rounded-2xl border border-[#E8E2D5] text-center shadow-xs">
              <ZapIcon className="w-4 h-4 text-[#856E2E] mx-auto mb-1" />
              <span className="block text-xl font-black text-[#856E2E]">48 Hours</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fast Review</span>
            </div>
            <div className="p-3 bg-white/80 backdrop-blur rounded-2xl border border-[#E8E2D5] text-center shadow-xs">
              <ScaleIcon className="w-4 h-4 text-slate-700 mx-auto mb-1" />
              <span className="block text-xl font-black text-slate-900">Hybrid</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Flexibility</span>
            </div>
            <div className="p-3 bg-white/80 backdrop-blur rounded-2xl border border-[#E8E2D5] text-center shadow-xs">
              <CheckIcon className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span className="block text-xl font-black text-emerald-600">100%</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Direct Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: 2-Column Responsive Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols): Search Filters + Job Listings */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Search & Filter Bar */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-4 sm:p-5 shadow-sm space-y-3.5">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <span className="absolute left-3.5 top-3 text-slate-400">
                    <SearchIcon className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by job title, skill (e.g. React, PHP), keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#d6c180] bg-slate-50/50 focus:bg-white transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  {workModes.length > 0 && (
                    <select
                      value={selectedMode}
                      onChange={(e) => setSelectedMode(e.target.value)}
                      className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:border-[#d6c180]"
                    >
                      <option value="">All Modes</option>
                      {workModes.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  )}
                </div>
              </div>

              {/* Quick Department Filter Chips */}
              {departments.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 whitespace-nowrap">
                    Filter:
                  </span>
                  <button
                    onClick={() => setSelectedDept('')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      selectedDept === ''
                        ? 'bg-[#0F172A] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Roles ({jobs.length})
                  </button>
                  {departments.map(dept => {
                    const count = jobs.filter(j => j.department === dept).length;
                    return (
                      <button
                        key={dept}
                        onClick={() => setSelectedDept(selectedDept === dept ? '' : dept)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                          selectedDept === dept
                            ? 'bg-[#856E2E] text-white shadow-xs'
                            : 'bg-[#F5EFE0]/60 text-slate-700 hover:bg-[#F5EFE0]'
                        }`}
                      >
                        {dept} ({count})
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Jobs List Header */}
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight">
                {selectedDept ? `${selectedDept} Positions` : 'All Open Positions'}
              </h2>
              <span className="text-xs font-bold text-slate-500">
                Showing <strong className="text-slate-900">{filteredJobs.length}</strong> of {jobs.length} roles
              </span>
            </div>

            {/* Jobs Cards */}
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-3xl border-2 border-dashed border-[#E8E2D5] p-12 text-center shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-[#F5EFE0] text-[#856E2E] flex items-center justify-center font-bold mx-auto mb-3">
                  <SearchIcon className="w-6 h-6 text-[#856E2E]" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">No matching positions found</h3>
                <p className="text-slate-500 text-xs max-w-md mx-auto mb-5 leading-relaxed">
                  We don&apos;t have an exact match for this search right now, but we are always looking for great candidates! You can submit your profile using the <strong>Drop Your CV</strong> card on the right.
                </p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedDept(''); setSelectedMode(''); }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => {
                  const salaryFormatted = (() => {
                    if (job.is_salary_disclosed === 0 || job.is_salary_disclosed === false) return null;
                    if (job.salary_range && job.salary_range.toLowerCase().includes('not disclosed')) return null;
                    const sMin = (job.salary_min !== undefined && job.salary_min !== null) ? Number(job.salary_min) : null;
                    const sMax = (job.salary_max !== undefined && job.salary_max !== null) ? Number(job.salary_max) : null;
                    if (sMin && sMax) {
                      if (sMin >= 100000 || sMax >= 100000) {
                        const minLpa = (sMin / 100000).toFixed(sMin % 100000 === 0 ? 0 : 1);
                        const maxLpa = (sMax / 100000).toFixed(sMax % 100000 === 0 ? 0 : 1);
                        return `₹${minLpa} - ${maxLpa} LPA`;
                      }
                      return `₹${sMin.toLocaleString('en-IN')} - ₹${sMax.toLocaleString('en-IN')}`;
                    }
                    if (sMin) {
                      return sMin >= 100000 ? `₹${(sMin / 100000).toFixed(1)} LPA` : `₹${sMin.toLocaleString('en-IN')}`;
                    }
                    if (job.salary_range) {
                      const range = job.salary_range.trim();
                      if (range.includes('LPA') || range.includes('₹')) return range;
                      const match = range.match(/(\d+(?:\.\d+)?)\s*[-–to]+\s*(\d+(?:\.\d+)?)/i);
                      if (match) {
                        const num1 = Number(match[1]);
                        const num2 = Number(match[2]);
                        if (num1 >= 100000 || num2 >= 100000) {
                          const minLpa = (num1 / 100000).toFixed(num1 % 100000 === 0 ? 0 : 1);
                          const maxLpa = (num2 / 100000).toFixed(num2 % 100000 === 0 ? 0 : 1);
                          return `₹${minLpa} - ${maxLpa} LPA`;
                        }
                        return `₹${num1.toLocaleString('en-IN')} - ₹${num2.toLocaleString('en-IN')}`;
                      }
                      return range;
                    }
                    return null;
                  })();

                  const skillsList = job.skills 
                    ? job.skills.split(',').map(s => s.trim()).filter(Boolean)
                    : [];

                  return (
                    <div 
                      key={job.id} 
                      className="group bg-white border border-[#E2E8F0] hover:border-[#d6c180] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 relative"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                        <div>
                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-2 mb-2.5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#856E2E]"></span>
                              {job.department}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md bg-[#F5EFE0] text-[#856E2E] text-xs font-bold">
                              {job.work_mode}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
                              {job.type}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 ml-auto sm:ml-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              Active
                            </span>
                          </div>

                          {/* Title */}
                          <Link href={`/c/${companySlug}/careers/${job.slug || job.id}`}>
                            <h3 className="text-xl font-extrabold text-[#0F172A] group-hover:text-[#856E2E] transition-colors tracking-tight">
                              {job.title}
                            </h3>
                          </Link>
                        </div>

                        {/* CTA Buttons on Desktop */}
                        <div className="hidden sm:flex items-center gap-2.5 shrink-0 pt-1">
                          <Link
                            href={`/c/${companySlug}/careers/${job.slug || job.id}`}
                            className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all text-center"
                          >
                            <span>Details</span>
                            <ArrowRightIcon className="w-3 h-3 text-slate-400" />
                          </Link>
                          <button
                            onClick={() => handleOpenApply(job)}
                            className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-[#0F172A] shadow-sm hover:opacity-90 transition-all"
                            style={{ backgroundColor: primaryGold }}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>

                      {/* Job Metadata Details with Vector Icons */}
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-600 mb-4 pt-1">
                        {job.location && (
                          <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
                            <MapPinIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{job.location}</span>
                          </span>
                        )}
                        {salaryFormatted && (
                          <span className="inline-flex items-center gap-1.5 font-bold text-slate-800">
                            <BanknoteIcon className="w-3.5 h-3.5 text-[#856E2E] shrink-0" />
                            <span>{salaryFormatted}</span>
                          </span>
                        )}
                        {job.experience_min !== undefined && job.experience_min > 0 && (
                          <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
                            <ClockIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{job.experience_min}-{job.experience_max} Years Exp</span>
                          </span>
                        )}
                      </div>

                      {/* Skills Tags */}
                      {skillsList.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100">
                          <span className="text-[11px] font-bold text-slate-400 mr-1">Skills:</span>
                          {skillsList.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200/80 text-slate-700 text-[11px] font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA Buttons on Mobile */}
                      <div className="flex sm:hidden items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                        <Link
                          href={`/c/${companySlug}/careers/${job.slug || job.id}`}
                          className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 text-center"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleOpenApply(job)}
                          className="flex-1 py-2.5 rounded-xl text-xs font-extrabold text-[#0F172A] text-center"
                          style={{ backgroundColor: primaryGold }}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Why Work With Us (Culture & Benefits Bar with Vector Icons) */}
            <div className="pt-8">
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm">
                <div className="max-w-xl mb-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#856E2E]">Company Culture & Benefits</span>
                  <h3 className="text-xl font-extrabold text-[#0F172A] tracking-tight mt-1">
                    Why Build Your Career at {company.name}?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    We invest in our people, support ambitious goals, and cultivate an environment where great ideas turn into real impact.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E2D5]/70 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white text-[#856E2E] shadow-xs flex items-center justify-center shrink-0 border border-[#E8E2D5]">
                      <RocketIcon className="w-4 h-4 text-[#856E2E]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">High Impact & Autonomy</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Work directly on core products with ownership and rapid decision-making.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E2D5]/70 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white text-[#856E2E] shadow-xs flex items-center justify-center shrink-0 border border-[#E8E2D5]">
                      <ScaleIcon className="w-4 h-4 text-[#856E2E]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">Work-Life Harmony</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Flexible work hours, hybrid options, and genuine respect for personal time.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E2D5]/70 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white text-[#856E2E] shadow-xs flex items-center justify-center shrink-0 border border-[#E8E2D5]">
                      <TrendingUpIcon className="w-4 h-4 text-[#856E2E]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">Growth & Upskilling</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Continuous mentorship, modern engineering tools, and clear career ladders.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E2D5]/70 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white text-[#856E2E] shadow-xs flex items-center justify-center shrink-0 border border-[#E8E2D5]">
                      <UsersIcon className="w-4 h-4 text-[#856E2E]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">People-First Team</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Collaborative colleagues, transparent leadership, and zero office politics.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (4-5 cols): Sticky "Drop Your CV for Future Opportunities" Card */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <div className="bg-gradient-to-b from-white via-white to-[#FAF8F2] border-2 border-[#E8E2D5] rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden ring-4 ring-[#FAF9F5]">
              
              {/* Header Accent Aura */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#d6c180]/20 rounded-bl-full -z-0 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFE0] border border-[#E5DECB] text-[#856E2E] text-[11px] font-black uppercase tracking-wider mb-3 shadow-xs">
                  <SparklesIcon className="w-3 h-3 text-[#856E2E]" />
                  <span>Direct Candidate Entry</span>
                </div>

                <h3 className="text-xl font-black text-[#0F172A] tracking-tight mb-2">
                  Drop Your CV for Future Opportunities
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5 font-normal">
                  Can&apos;t find a matching role right now? Share your CV and our recruitment team will reach out when a suitable position opens up.
                </p>

                {dropStatus && (
                  <div className={`p-3.5 rounded-2xl text-xs font-semibold mb-5 transition-all ${
                    dropStatus.success 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {dropStatus.message}
                  </div>
                )}

                <form onSubmit={handleDropCvSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={dropName}
                      onChange={(e) => setDropName(e.target.value)}
                      placeholder="e.g. Priyanshu Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/60 focus:bg-white focus:outline-none focus:border-[#d6c180] focus:ring-2 focus:ring-[#d6c180]/30 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={dropEmail}
                        onChange={(e) => setDropEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/60 focus:bg-white focus:outline-none focus:border-[#d6c180] focus:ring-2 focus:ring-[#d6c180]/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={dropPhone}
                        onChange={(e) => setDropPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/60 focus:bg-white focus:outline-none focus:border-[#d6c180] focus:ring-2 focus:ring-[#d6c180]/30 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Preferred Department / Role
                    </label>
                    <input
                      type="text"
                      value={dropRole}
                      onChange={(e) => setDropRole(e.target.value)}
                      placeholder="e.g. Frontend Developer, Sales Lead, HR..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/60 focus:bg-white focus:outline-none focus:border-[#d6c180] focus:ring-2 focus:ring-[#d6c180]/30 transition-all"
                    />
                  </div>

                  {/* Modern Drag & Drop Styled File Upload Zone */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Attach CV / Resume <span className="text-red-500">*</span>
                    </label>
                    
                    <input
                      type="file"
                      ref={dropFileInputRef}
                      required={!dropFile}
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setDropFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />

                    <div
                      onClick={() => dropFileInputRef.current?.click()}
                      className={`cursor-pointer rounded-2xl border-2 border-dashed p-4 text-center transition-all ${
                        dropFile
                          ? 'border-emerald-400 bg-emerald-50/50'
                          : 'border-[#E8E2D5] bg-white hover:border-[#d6c180] hover:bg-[#FAF9F5]'
                      }`}
                    >
                      {dropFile ? (
                        <div className="flex items-center justify-between gap-2 text-left">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                              <CheckIcon className="w-4 h-4 text-emerald-700" />
                            </span>
                            <div className="overflow-hidden">
                              <span className="block text-xs font-bold text-slate-900 truncate">
                                {dropFile.name}
                              </span>
                              <span className="block text-[10px] text-slate-500">
                                {(dropFile.size / 1024).toFixed(1)} KB • Ready to submit
                              </span>
                            </div>
                          </div>
                          <span className="text-[11px] font-bold text-[#856E2E] underline shrink-0">
                            Change
                          </span>
                        </div>
                      ) : (
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] text-[#856E2E] border border-[#E8E2D5] flex items-center justify-center mx-auto mb-2">
                            <UploadCloudIcon className="w-5 h-5 text-[#856E2E]" />
                          </div>
                          <span className="block text-xs font-bold text-slate-800">
                            Click to upload your CV
                          </span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">
                            PDF, DOC, DOCX files up to 10MB
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Brief Note or Expertise
                    </label>
                    <textarea
                      rows={2}
                      value={dropNote}
                      onChange={(e) => setDropNote(e.target.value)}
                      placeholder="Share a short note about your core skills, experience, or ideal role..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/60 focus:bg-white focus:outline-none focus:border-[#d6c180] focus:ring-2 focus:ring-[#d6c180]/30 transition-all"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isDropSubmitting}
                    className="w-full py-3.5 rounded-2xl font-black text-xs text-[#0F172A] shadow-md hover:shadow-lg hover:opacity-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 tracking-wide cursor-pointer"
                    style={{ backgroundColor: primaryGold }}
                  >
                    {isDropSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Your CV...</span>
                      </>
                    ) : (
                      <>
                        <span>Drop Your CV</span>
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <span className="text-[10px] font-medium text-slate-400 flex items-center justify-center gap-1.5">
                      <LockIcon className="w-3 h-3 text-slate-400" />
                      <span>Direct Recruiter Access • Data is kept strictly confidential</span>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E2D5] bg-white py-8 px-4 text-center mt-12">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-800">{company.name}</strong>. All rights reserved.
          </div>
          <div className="text-[11px] text-slate-400">
            Powered by PR Marketing Recruitment Engine
          </div>
        </div>
      </footer>

      {/* Application Modal (When clicking Apply Now on specific job) */}
      {isModalOpen && activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200 cursor-pointer"
            >
              ✕
            </button>

            <div className="mb-5">
              <span className="inline-block px-2.5 py-0.5 rounded bg-[#F5EFE0] text-[#856E2E] text-[10px] font-bold uppercase tracking-wider mb-2">
                {activeJob.department}
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-1">
                Apply for {activeJob.title}
              </h3>
              <p className="text-xs text-slate-500">
                at {company.name} • {activeJob.work_mode}
              </p>
            </div>

            {submitStatus && (
              <div className={`p-4 rounded-2xl text-xs font-semibold mb-5 ${
                submitStatus.success 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Company / Organization</label>
                <input
                  type="text"
                  value={formCompany}
                  onChange={(e) => setFormCompany(e.target.value)}
                  placeholder="e.g. Tech Solutions / Freelance"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              {/* Styled Resume Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Resume / CV (PDF or DOC) <span className="text-red-500">*</span></label>
                <input
                  type="file"
                  ref={modalFileInputRef}
                  required={!resumeFile}
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="hidden"
                />

                <div
                  onClick={() => modalFileInputRef.current?.click()}
                  className={`cursor-pointer rounded-2xl border-2 border-dashed p-4 text-center transition-all ${
                    resumeFile
                      ? 'border-emerald-400 bg-emerald-50/50'
                      : 'border-[#E8E2D5] bg-slate-50/50 hover:border-[#d6c180] hover:bg-white'
                  }`}
                >
                  {resumeFile ? (
                    <div className="flex items-center justify-between gap-2 text-left">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                          <CheckIcon className="w-4 h-4 text-emerald-700" />
                        </span>
                        <div className="overflow-hidden">
                          <span className="block text-xs font-bold text-slate-900 truncate">{resumeFile.name}</span>
                          <span className="block text-[10px] text-slate-500">{(resumeFile.size / 1024).toFixed(1)} KB • Ready</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#856E2E] underline">Change</span>
                    </div>
                  ) : (
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white text-[#856E2E] border border-[#E8E2D5] flex items-center justify-center mx-auto mb-2">
                        <UploadCloudIcon className="w-5 h-5 text-[#856E2E]" />
                      </div>
                      <span className="block text-xs font-bold text-slate-800">Click to upload your resume</span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">PDF, DOC, DOCX up to 10MB</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cover Note / Remarks</label>
                <textarea
                  rows={3}
                  value={formCoverLetter}
                  onChange={(e) => setFormCoverLetter(e.target.value)}
                  placeholder="Tell us why you are interested in this position..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#d6c180]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-extrabold text-xs text-[#0F172A] shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                style={{ backgroundColor: primaryGold }}
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
