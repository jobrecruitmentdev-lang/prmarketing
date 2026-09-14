'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { getCrmUrl } from '@/lib/crmApi';

interface JobDetail {
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
  qualification: string;
  vacancies: number;
  description: string;
  published_at: string;
}

interface CompanyInfo {
  name: string;
  slug: string;
  logo: string | null;
  website: string | null;
}

export default function JobDetailPage({
  params
}: {
  params: Promise<{ companySlug: string; jobSlug: string }>
}) {
  const resolvedParams = use(params);
  const { companySlug: rawCompanySlug, jobSlug: rawJobSlug } = resolvedParams;

  const [companySlug, setCompanySlug] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/\/c\/([^/]+)\/careers\/([^/]+)/);
      if (match && match[1] && match[1] !== 'default') {
        return decodeURIComponent(match[1]);
      }
    }
    return rawCompanySlug && rawCompanySlug !== 'default' ? rawCompanySlug : 'abc-technologies';
  });

  const [jobSlug, setJobSlug] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/\/c\/([^/]+)\/careers\/([^/]+)/);
      if (match && match[2] && match[2] !== 'default') {
        return decodeURIComponent(match[2]);
      }
    }
    return rawJobSlug && rawJobSlug !== 'default' ? rawJobSlug : '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/\/c\/([^/]+)\/careers\/([^/]+)/);
      if (match) {
        if (match[1] && match[1] !== 'default') setCompanySlug(decodeURIComponent(match[1]));
        if (match[2] && match[2] !== 'default') setJobSlug(decodeURIComponent(match[2]));
      }
    }
  }, [rawCompanySlug, rawJobSlug]);

  const [job, setJob] = useState<JobDetail | null>(null);
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Application form
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formCoverLetter, setFormCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        setLoading(true);
        const res = await fetch(getCrmUrl(`/public/v1/companies/${encodeURIComponent(companySlug)}/jobs/${encodeURIComponent(jobSlug)}`));
        const data = await res.json();
        if (!data.success) {
          setError(data.error || 'Job not found');
          return;
        }
        setJob(data.job);
        setCompany(data.company);
      } catch {
        setError('Could not load job details.');
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [companySlug, jobSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

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

      const res = await fetch(getCrmUrl(`/public/v1/jobs/${job.id}/applications`), {
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
      } else {
        setSubmitStatus({ success: false, message: data.error || 'Failed to submit application' });
      }
    } catch {
      setSubmitStatus({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#E2E8F0] border-t-[#d6c180] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !job || !company) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-red-200 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Position Not Found</h2>
          <p className="text-slate-600 text-sm mb-6">{error || 'This job opening may have been filled or closed.'}</p>
          <Link href={`/c/${companySlug}/careers`} className="inline-block px-5 py-2.5 bg-[#d6c180] text-[#0F172A] font-semibold text-sm rounded-xl">
            View All Open Jobs
          </Link>
        </div>
      </div>
    );
  }

  const salaryText = (() => {
    if (!job) return null;
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

  // Google JobPosting JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.published_at ? job.published_at.split('T')[0] : '2026-09-10',
    employmentType: job.type === 'Full Time' ? 'FULL_TIME' : 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: company.name,
      sameAs: company.website || undefined,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location || 'Ahmedabad',
        addressCountry: 'IN',
      },
    },
    baseSalary: (salaryText && job.salary_min && job.salary_max) ? {
      '@type': 'MonetaryAmount',
      currency: job.salary_currency || 'INR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salary_min,
        maxValue: job.salary_max,
        unitText: 'YEAR',
      },
    } : undefined,
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0F172A]">
      {/* Inject Google JobPosting SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-[#E8E2D5] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href={`/c/${companySlug}/careers`} className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5">
            ← Back to All Positions
          </Link>
          <span className="text-xs font-semibold text-slate-500">{company.name} Careers</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {job.department && (
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                    {job.department}
                  </span>
                )}
                {job.work_mode && (
                  <span className="px-2.5 py-1 rounded-md bg-[#F4EEDF] text-[#856E2E] text-xs font-bold">
                    {job.work_mode}
                  </span>
                )}
                {(job.type || 'Full-time') && (
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                    {job.type || 'Full-time'}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-4">
                {job.title}
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-xs mb-6">
                <div>
                  <span className="text-slate-500 block">Location</span>
                  <strong className="text-slate-800 text-sm font-semibold">{job.location || 'Remote'}</strong>
                </div>
                {salaryText && (
                  <div>
                    <span className="text-slate-500 block">Compensation</span>
                    <strong className="text-slate-800 text-sm font-semibold">{salaryText}</strong>
                  </div>
                )}
                <div>
                  <span className="text-slate-500 block">Experience</span>
                  <strong className="text-slate-800 text-sm font-semibold">
                    {(job.experience_min !== undefined && job.experience_min > 0) ? `${job.experience_min}-${job.experience_max} Years` : 'Any Experience'}
                  </strong>
                </div>
              </div>

              {job.skills && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Required Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.split(',').map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-6">
                <h3 className="text-base font-bold text-slate-900 mb-2">Role Overview & Responsibilities</h3>
                {job.description}
              </div>
            </div>
          </div>

          {/* Right Col: Direct Application Form */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-7 shadow-sm sticky top-24">
              <h2 className="text-lg font-extrabold text-slate-900 mb-1">Apply for this Role</h2>
              <p className="text-xs text-slate-500 mb-6">Direct application to hiring manager</p>

              {submitStatus && (
                <div className={`p-4 rounded-xl text-xs font-semibold mb-6 ${submitStatus.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Resume / CV (PDF or DOC) <span className="text-red-500">*</span></label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#FAF8F2] file:text-[#856E2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cover Note</label>
                  <textarea
                    rows={3}
                    value={formCoverLetter}
                    onChange={(e) => setFormCoverLetter(e.target.value)}
                    placeholder="Key highlights about your experience..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Send Application'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
