'use client';

import React, { useState, useEffect, useRef, use } from 'react';
import { crmFetch, getCrmUrl, getCrmResumeUrl, getAuthToken } from '@/lib/crmApi';
import {
  UsersIcon,
  SearchIcon,
  FileTextIcon,
  DownloadIcon,
  CheckIcon,
  XIcon,
  PlusIcon,
} from '@/components/crm/CrmIcons';

interface Candidate {
  id: number;
  admin_id: number;
  job_id: number | null;
  name: string;
  email: string;
  phone: string | null;
  last_company: string | null;
  resume_filename: string | null;
  has_resume: number;
  stage: string;
  source: string;
  tags: string | null;
  job_title?: string;
  job_slug?: string;
  note_count?: number;
  applied_date?: string;
  created_at?: string;
}

interface JobOption {
  id: number;
  title: string;
  department: string;
}

interface NoteItem {
  id: number;
  note_text: string;
  author_name?: string;
  created_at: string;
}

export default function CandidatesPipelinePage({ params }: { params: Promise<{ tenant: string }> }) {
  const resolvedParams = use(params);
  const tenantSlug = resolvedParams.tenant;

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<JobOption[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [sourceTab, setSourceTab] = useState<'all' | 'job_applications' | 'direct_cv'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');

  // Add Candidate Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPhone, setAddPhone] = useState('');
  const [addJobId, setAddJobId] = useState('');
  const [addCompany, setAddCompany] = useState('');
  const [addStage, setAddStage] = useState('applied');
  const [addSource, setAddSource] = useState('manual');
  const [addNotes, setAddNotes] = useState('');
  const [addResumeFile, setAddResumeFile] = useState<File | null>(null);
  const [isSubmittingAdd, setIsSubmittingAdd] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [addSuccessMsg, setAddSuccessMsg] = useState<string | null>(null);

  const addFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const resetAddForm = () => {
    setAddName('');
    setAddEmail('');
    setAddPhone('');
    setAddJobId('');
    setAddCompany('');
    setAddStage('applied');
    setAddSource('manual');
    setAddNotes('');
    setAddResumeFile(null);
    setAddError(null);
    if (addFileInputRef.current) {
      addFileInputRef.current.value = '';
    }
  };

  // Edit Modal State
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editStage, setEditStage] = useState('');
  const [editJobId, setEditJobId] = useState<string>('');
  const [editResumeFile, setEditResumeFile] = useState<File | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Notes Modal State
  const [activeNotesCandidate, setActiveNotesCandidate] = useState<Candidate | null>(null);
  const [notesList, setNotesList] = useState<NoteItem[]>([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);

  const stages = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'];

  const sources = [
    { key: 'manual', label: 'Manual Entry' },
    { key: 'walk_in', label: 'Walk-In Interview' },
    { key: 'referral', label: 'Employee Referral' },
    { key: 'linkedin', label: 'LinkedIn Sourced' },
    { key: 'job_portal', label: 'Job Portal / Naukri / Indeed' },
    { key: 'direct_call', label: 'Phone Inquiry / Direct Call' },
    { key: 'direct_cv', label: 'General CV Submission' },
  ];

  const loadCandidates = async () => {
    try {
      if (!getAuthToken()) return;
      setLoading(true);
      const [candRes, jobsRes] = await Promise.all([
        crmFetch('/api/recruitment/candidates'),
        crmFetch('/api/recruitment/jobs').catch(() => ({ data: [] })),
      ]);
      setCandidates(candRes.data || []);
      setJobs(jobsRes.data || []);
    } catch (err: any) {
      console.warn('Failed to load candidates:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, [tenantSlug]);

  const handleStageChange = async (candidateId: number, nextStage: string) => {
    try {
      await crmFetch(`/api/recruitment/candidates/${candidateId}/stage`, {
        method: 'PATCH',
        body: JSON.stringify({ stage: nextStage }),
      });
      setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, stage: nextStage } : c));
    } catch (err: any) {
      alert('Failed to update stage: ' + err.message);
    }
  };

  const handleDeleteCandidate = async (candidateId: number, name: string) => {
    if (!confirm(`Are you sure you want to delete candidate '${name}'?`)) {
      return;
    }
    try {
      await crmFetch(`/api/recruitment/candidates/${candidateId}`, { method: 'DELETE' });
      setCandidates(prev => prev.filter(c => c.id !== candidateId));
    } catch (err: any) {
      alert('Failed to delete candidate: ' + err.message);
    }
  };

  const handleDownloadResume = (filename: string) => {
    const token = getAuthToken();
    window.open(getCrmResumeUrl(filename, token || undefined), '_blank');
  };

  // Open Edit Modal
  const openEditModal = (c: Candidate) => {
    setEditingCandidate(c);
    setEditName(c.name || '');
    setEditEmail(c.email || '');
    setEditPhone(c.phone || '');
    setEditRole(c.last_company || '');
    setEditStage(c.stage || 'applied');
    setEditJobId(c.job_id ? String(c.job_id) : '');
    setEditResumeFile(null);
    if (editFileInputRef.current) {
      editFileInputRef.current.value = '';
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCandidate) return;

    try {
      setIsSavingEdit(true);
      const token = getAuthToken();
      const formData = new FormData();
      formData.append('name', editName.trim());
      formData.append('email', editEmail.trim());
      formData.append('phone', editPhone.trim());
      formData.append('last_company', editRole.trim());
      formData.append('stage', editStage);
      if (editJobId) formData.append('job_id', editJobId);
      if (editResumeFile) formData.append('resume', editResumeFile);

      const res = await fetch(getCrmUrl(`/recruitment/candidates/${editingCandidate.id}`), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update candidate');
      }

      setEditingCandidate(null);
      setEditResumeFile(null);
      if (editFileInputRef.current) {
        editFileInputRef.current.value = '';
      }
      setAddSuccessMsg(`Candidate '${editName}' profile & resume updated successfully!`);
      setTimeout(() => setAddSuccessMsg(null), 4000);
      await loadCandidates();
    } catch (err: any) {
      alert('Failed to update candidate: ' + err.message);
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Notes Modal Handlers
  const openNotesModal = async (c: Candidate) => {
    setActiveNotesCandidate(c);
    setNewNoteText('');
    try {
      setIsLoadingNotes(true);
      const res = await crmFetch(`/api/recruitment/candidates/${c.id}/notes`);
      setNotesList(res.data || []);
    } catch (err) {
      console.error('Failed to load notes:', err);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeNotesCandidate || !newNoteText.trim()) return;

    try {
      setIsAddingNote(true);
      await crmFetch(`/api/recruitment/candidates/${activeNotesCandidate.id}/notes`, {
        method: 'POST',
        body: JSON.stringify({ note_text: newNoteText.trim() }),
      });
      // Refresh notes list
      const res = await crmFetch(`/api/recruitment/candidates/${activeNotesCandidate.id}/notes`);
      setNotesList(res.data || []);
      setNewNoteText('');
      // Update note count in candidate
      setCandidates(prev => prev.map(c => c.id === activeNotesCandidate.id ? { ...c, note_count: (c.note_count || 0) + 1 } : c));
    } catch (err: any) {
      alert('Failed to add note: ' + err.message);
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim()) {
      setAddError('Please enter candidate full name.');
      return;
    }

    try {
      setIsSubmittingAdd(true);
      setAddError(null);

      const token = getAuthToken();
      const formData = new FormData();
      formData.append('name', addName.trim());
      if (addEmail.trim()) formData.append('email', addEmail.trim());
      if (addPhone.trim()) formData.append('phone', addPhone.trim());
      if (addJobId) formData.append('job_id', addJobId);
      if (addCompany.trim()) formData.append('last_company', addCompany.trim());
      formData.append('stage', addStage);
      formData.append('source', addSource);
      if (addNotes.trim()) formData.append('notes', addNotes.trim());
      if (addResumeFile) formData.append('resume', addResumeFile);

      const res = await fetch(getCrmUrl('/recruitment/candidates'), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to add candidate');
      }

      setIsAddModalOpen(false);
      resetAddForm();
      setAddSuccessMsg('Candidate added successfully!');
      setTimeout(() => setAddSuccessMsg(null), 4000);
      await loadCandidates();
    } catch (err: any) {
      setAddError(err.message || 'Error adding candidate');
    } finally {
      setIsSubmittingAdd(false);
    }
  };

  // Calculations for tab badges
  const totalCount = candidates.length;
  const directCvCount = candidates.filter(c => c.source === 'direct_cv').length;
  const jobAppsCount = candidates.filter(c => c.source !== 'direct_cv').length;

  const filtered = candidates.filter(c => {
    // Tab filter
    if (sourceTab === 'direct_cv' && c.source !== 'direct_cv') return false;
    if (sourceTab === 'job_applications' && c.source === 'direct_cv') return false;

    // Search filter
    const q = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.phone && c.phone.includes(q)) ||
      (c.job_title && c.job_title.toLowerCase().includes(q)) ||
      (c.last_company && c.last_company.toLowerCase().includes(q));

    // Stage filter
    const matchesStage = selectedStage === 'all' || c.stage === selectedStage;

    return matchesSearch && matchesStage;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-9 h-9 border-4 border-slate-200 border-t-[#d6c180] rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs font-semibold text-slate-500">Loading candidate pipelines...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Candidates & Applications</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage incoming job applications and direct CV submissions in one unified workspace
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
            Total Candidates: <strong className="text-slate-900">{totalCount}</strong>
          </span>
          <button
            type="button"
            onClick={() => {
              resetAddForm();
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#0F172A] bg-[#d6c180] hover:bg-[#c4af6e] shadow-sm transition-all cursor-pointer"
          >
            <PlusIcon size={16} />
            <span>Add Candidate</span>
          </button>
        </div>
      </div>

      {addSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckIcon size={16} className="text-emerald-600" />
            <span>{addSuccessMsg}</span>
          </div>
          <button onClick={() => setAddSuccessMsg(null)} className="text-emerald-600 hover:text-emerald-800 text-xs cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Main Channel Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setSourceTab('all')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            sourceTab === 'all'
              ? 'bg-[#0F172A] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <UsersIcon size={15} />
          <span>All Candidates</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${sourceTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
            {totalCount}
          </span>
        </button>

        <button
          onClick={() => setSourceTab('direct_cv')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            sourceTab === 'direct_cv'
              ? 'bg-[#856E2E] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-[#FAF8F2] border border-[#E8E2D5]'
          }`}
        >
          <span className="text-amber-300 font-black">✦</span>
          <span>Direct CV Submissions</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${sourceTab === 'direct_cv' ? 'bg-white/25 text-white' : 'bg-[#F5EFE0] text-[#856E2E]'}`}>
            {directCvCount}
          </span>
        </button>

        <button
          onClick={() => setSourceTab('job_applications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            sourceTab === 'job_applications'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileTextIcon size={15} />
          <span>Job Applications</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${sourceTab === 'job_applications' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
            {jobAppsCount}
          </span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Search by name, email, phone, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-3.5 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
          />
        </div>

        {/* Stage Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedStage('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              selectedStage === 'all' ? 'bg-[#0F172A] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Stages
          </button>
          {stages.map(s => {
            const count = candidates.filter(c => {
              if (sourceTab === 'direct_cv' && c.source !== 'direct_cv') return false;
              if (sourceTab === 'job_applications' && c.source === 'direct_cv') return false;
              return c.stage === s;
            }).length;

            return (
              <button
                key={s}
                onClick={() => setSelectedStage(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize whitespace-nowrap transition-colors ${
                  selectedStage === s ? 'bg-[#856E2E] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Candidates Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#FAF9F5] border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Candidate Details</th>
                <th className="px-5 py-3.5">Submission Type & Role</th>
                <th className="px-5 py-3.5">Stage</th>
                <th className="px-5 py-3.5">Resume</th>
                <th className="px-5 py-3.5">Notes & Remarks</th>
                <th className="px-5 py-3.5 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center text-slate-400">
                    <div className="max-w-sm mx-auto">
                      <p className="text-slate-600 font-bold text-sm mb-1">No candidate records found</p>
                      <p className="text-slate-400 text-xs">
                        {sourceTab === 'direct_cv'
                          ? 'No candidates have dropped their CV yet. When visitors submit via the career page right-side form, they will appear here.'
                          : 'Try changing your search term or stage filter.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((c) => {
                  const isDirect = c.source === 'direct_cv';

                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      {/* Candidate Details */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span>{c.name}</span>
                          {isDirect && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#F5EFE0] text-[#856E2E] border border-[#E8E2D5]">
                              Direct CV
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{c.email}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {c.phone || 'No phone'} {c.created_at && `• ${new Date(c.created_at).toLocaleDateString()}`}
                        </div>
                      </td>

                      {/* Submission Type & Role */}
                      <td className="px-5 py-4">
                        {isDirect ? (
                          <div>
                            <div className="font-semibold text-[#856E2E] text-xs">
                              {c.last_company ? `Desired Role: ${c.last_company}` : 'General Opportunity'}
                            </div>
                            {c.job_id && (
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                Assigned to: <strong className="text-slate-700">{c.job_title}</strong>
                              </div>
                            )}
                            <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Direct Submission</div>
                          </div>
                        ) : (
                          <div>
                            <div className="font-semibold text-slate-900 text-xs">
                              {c.job_title || 'Position Application'}
                            </div>
                            {c.last_company && (
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                Prev Org: {c.last_company}
                              </div>
                            )}
                            <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{c.source || 'Hosted Portal'}</div>
                          </div>
                        )}
                      </td>

                      {/* Stage Pill */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          c.stage === 'hired' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          c.stage === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                          c.stage === 'interview' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          c.stage === 'offer' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                          c.stage === 'screening' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                          'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {c.stage}
                        </span>
                      </td>

                      {/* Resume */}
                      <td className="px-5 py-4">
                        {c.resume_filename ? (
                          <button
                            onClick={() => handleDownloadResume(c.resume_filename!)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E2D5] bg-[#FAF8F2] text-[#856E2E] hover:bg-[#F5EFE0] text-xs font-bold transition-all shadow-sm"
                          >
                            <FileTextIcon size={14} />
                            <span>View CV</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">No File</span>
                        )}
                      </td>

                      {/* Notes & Remarks */}
                      <td className="px-5 py-4">
                        <button
                          onClick={() => openNotesModal(c)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium"
                        >
                          <span>💬 Notes</span>
                          {(c.note_count || 0) > 0 && (
                            <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-[10px] font-bold text-slate-800">
                              {c.note_count}
                            </span>
                          )}
                        </button>
                      </td>

                      {/* Quick Actions (Stage selector, Edit, Delete) */}
                      <td className="px-5 py-4 text-right space-x-1.5 whitespace-nowrap">
                        <select
                          value={c.stage}
                          onChange={(e) => handleStageChange(c.id, e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:border-[#d6c180]"
                        >
                          {stages.map(s => (
                            <option key={s} value={s}>{s.toUpperCase()}</option>
                          ))}
                        </select>

                        <button
                          onClick={() => openEditModal(c)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold"
                          title="Edit candidate profile & job matching"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteCandidate(c.id, c.name)}
                          className="px-2.5 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold"
                          title="Delete candidate"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Candidate Modal */}
      {editingCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setEditingCandidate(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200"
            >
              ✕
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Edit Candidate Profile</h3>
            <p className="text-xs text-slate-500 mb-6">
              Update candidate details or match direct submissions to open vacancies
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Candidate Full Name *</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Role / Department / Previous Org
                </label>
                <input
                  type="text"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Recruitment Stage</label>
                  <select
                    value={editStage}
                    onChange={(e) => setEditStage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:border-[#d6c180] capitalize"
                  >
                    {stages.map(s => (
                      <option key={s} value={s}>{s.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assign to Active Job</label>
                  <select
                    value={editJobId}
                    onChange={(e) => setEditJobId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:border-[#d6c180]"
                  >
                    <option value="">-- General Opportunity (Unassigned) --</option>
                    {jobs.map(j => (
                      <option key={j.id} value={j.id}>
                        {j.title} ({j.department})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    Candidate Resume / CV Document:
                  </label>
                  {editingCandidate.has_resume && editingCandidate.resume_filename && (
                    <button
                      type="button"
                      onClick={() => handleDownloadResume(editingCandidate.resume_filename!)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#d6c180] text-[11px] font-bold text-[#856E2E] hover:bg-[#FAF8F2] flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                    >
                      <FileTextIcon size={13} />
                      <span>View Current CV</span>
                    </button>
                  )}
                </div>

                {/* Status of Current Saved Resume */}
                {editingCandidate.has_resume && editingCandidate.resume_filename ? (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-700 font-medium truncate max-w-[320px]">
                      <FileTextIcon size={16} className="text-emerald-600 shrink-0" />
                      <span className="truncate">Saved File: <strong className="text-slate-900">{editingCandidate.resume_filename}</strong></span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold shrink-0">
                      Active
                    </span>
                  </div>
                ) : !editResumeFile ? (
                  <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-800 text-xs font-medium flex items-center gap-2">
                    <span className="text-sm">⚠️</span>
                    <span>No resume file currently attached to this candidate. Select a file below to upload one.</span>
                  </div>
                ) : null}

                {/* Hidden File Input */}
                <input
                  ref={editFileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.rtf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setEditResumeFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                {/* Staged New File or Upload Area */}
                {editResumeFile ? (
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-300 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 truncate">
                        <CheckIcon size={15} className="text-emerald-600 shrink-0" />
                        <span className="truncate">{editResumeFile.name}</span>
                        <span className="text-[11px] text-emerald-700 font-semibold shrink-0">
                          ({(editResumeFile.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditResumeFile(null);
                          if (editFileInputRef.current) editFileInputRef.current.value = '';
                        }}
                        className="text-red-500 hover:text-red-700 font-bold text-xs px-2 py-0.5 rounded hover:bg-red-50 cursor-pointer shrink-0 transition-colors"
                        title="Remove selected file"
                      >
                        ✕ Remove
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-emerald-800 pt-1.5 border-t border-emerald-200/60">
                      <span>✓ Ready to upload. Click <strong>&apos;Save Changes&apos;</strong> to apply.</span>
                      <button
                        type="button"
                        onClick={() => editFileInputRef.current?.click()}
                        className="text-[#856E2E] hover:underline font-bold text-[11px] cursor-pointer"
                      >
                        Choose different file
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => editFileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-[#d6c180] rounded-xl p-3.5 bg-slate-50 hover:bg-[#FAF8F2] transition-colors text-center cursor-pointer group"
                  >
                    <div className="flex flex-col items-center justify-center gap-1">
                      <FileTextIcon size={20} className="text-slate-400 group-hover:text-[#856E2E] transition-colors" />
                      <p className="text-xs font-bold text-slate-700 group-hover:text-slate-900">
                        {editingCandidate.has_resume ? 'Click to replace with a new resume file' : 'Click to select and attach candidate resume'}
                      </p>
                      <p className="text-[11px] text-slate-400">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCandidate(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#0F172A] text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {isSavingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Candidate Notes Modal */}
      {activeNotesCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Notes: {activeNotesCandidate.name}
                </h3>
                <p className="text-xs text-slate-500">{activeNotesCandidate.email}</p>
              </div>
              <button
                onClick={() => setActiveNotesCandidate(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Notes List */}
            <div className="p-6 flex-1 overflow-y-auto space-y-3">
              {isLoadingNotes ? (
                <div className="text-center py-8 text-xs text-slate-400">Loading notes...</div>
              ) : notesList.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">No notes or remarks yet for this candidate.</div>
              ) : (
                notesList.map((n) => (
                  <div key={n.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                      <span>{n.author_name || 'System / Candidate'}</span>
                      <span>{new Date(n.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">{n.note_text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="p-4 border-t border-slate-100 bg-[#FAF9F5] flex gap-2">
              <input
                type="text"
                required
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Add recruiter feedback or interview notes..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#d6c180]"
              />
              <button
                type="submit"
                disabled={isAddingNote || !newNoteText.trim()}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#0F172A] text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {isAddingNote ? 'Adding...' : 'Add Note'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Candidate Modal */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddModalOpen(false);
          }}
        >
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full my-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FAF9F5] border border-[#d6c180]/40 flex items-center justify-center text-[#856E2E]">
                  <PlusIcon size={18} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0F172A]">Add New Candidate</h3>
                  <p className="text-[11px] text-slate-500">Manually register candidate into recruitment pipeline</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleAddCandidate} className="flex-1 overflow-y-auto p-6 space-y-5">
              {addError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{addError}</span>
                </div>
              )}

              {/* Section 1: Personal Details */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  1. Candidate Details:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={addName}
                      onChange={(e) => setAddName(e.target.value)}
                      placeholder="e.g. Aman Sharma"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180] focus:ring-1 focus:ring-[#d6c180]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={addEmail}
                      onChange={(e) => setAddEmail(e.target.value)}
                      placeholder="e.g. aman@example.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180] focus:ring-1 focus:ring-[#d6c180]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={addPhone}
                      onChange={(e) => setAddPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180] focus:ring-1 focus:ring-[#d6c180]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Job & Sourcing */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  2. Role, Sourcing &amp; Experience:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Applying For / Vacancy
                    </label>
                    <select
                      value={addJobId}
                      onChange={(e) => setAddJobId(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#d6c180] focus:ring-1 focus:ring-[#d6c180]"
                    >
                      <option value="">-- General Opportunity / Direct CV --</option>
                      {jobs.map((j) => (
                        <option key={j.id} value={j.id}>
                          {j.title} ({j.department})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Current / Previous Company or Role
                    </label>
                    <input
                      type="text"
                      value={addCompany}
                      onChange={(e) => setAddCompany(e.target.value)}
                      placeholder="e.g. Wipro / Senior UI Dev"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180] focus:ring-1 focus:ring-[#d6c180]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Candidate Source
                    </label>
                    <select
                      value={addSource}
                      onChange={(e) => setAddSource(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#d6c180] focus:ring-1 focus:ring-[#d6c180]"
                    >
                      {sources.map((src) => (
                        <option key={src.key} value={src.key}>
                          {src.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Stage & Resume Upload */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  3. Stage &amp; Resume File:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Initial Recruitment Stage
                    </label>
                    <select
                      value={addStage}
                      onChange={(e) => setAddStage(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#d6c180] focus:ring-1 focus:ring-[#d6c180] uppercase"
                    >
                      {stages.map((st) => (
                        <option key={st} value={st}>
                          {st.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Resume / CV File (Optional)
                    </label>
                    <input
                      ref={addFileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.rtf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setAddResumeFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                    {addResumeFile ? (
                      <div className="flex items-center justify-between gap-1.5 text-xs font-bold text-emerald-900 px-3 py-2 bg-emerald-50 rounded-xl border border-emerald-300">
                        <div className="flex items-center gap-1.5 truncate">
                          <CheckIcon size={14} className="text-emerald-600 shrink-0" />
                          <span className="truncate">{addResumeFile.name}</span>
                          <span className="text-[10px] text-emerald-700 font-semibold shrink-0">
                            ({(addResumeFile.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setAddResumeFile(null);
                            if (addFileInputRef.current) addFileInputRef.current.value = '';
                          }}
                          className="text-red-500 hover:text-red-700 font-bold text-xs px-1.5 py-0.5 rounded hover:bg-red-50 cursor-pointer shrink-0 transition-colors"
                          title="Remove file"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => addFileInputRef.current?.click()}
                        className="border border-dashed border-slate-300 hover:border-[#d6c180] rounded-xl p-2.5 bg-slate-50 hover:bg-[#FAF8F2] transition-colors text-center cursor-pointer group"
                      >
                        <div className="text-xs text-slate-500 group-hover:text-slate-800 flex items-center justify-center gap-1.5">
                          <FileTextIcon size={14} className="text-slate-400 group-hover:text-[#856E2E]" />
                          <span>Attach PDF / DOC resume (Max 10MB)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 4: Initial Notes */}
              <div className="space-y-1.5 pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  4. Initial Screening Remarks / Notes (Optional):
                </label>
                <textarea
                  rows={2}
                  value={addNotes}
                  onChange={(e) => setAddNotes(e.target.value)}
                  placeholder="e.g. Strong React skills, expected CTC 12 LPA, notice period 15 days, scheduled for round 1..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180] focus:ring-1 focus:ring-[#d6c180]"
                />
              </div>

              {/* Sticky Action Footer */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingAdd}
                  className="px-5 py-2 rounded-xl font-bold text-xs bg-[#d6c180] hover:bg-[#c4af6e] text-[#0F172A] shadow-sm disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <PlusIcon size={15} />
                  <span>{isSubmittingAdd ? 'Adding Candidate...' : 'Add Candidate'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
