'use client';

import React, { useState, useEffect, use } from 'react';
import { crmFetch, getAuthToken, getCrmUrl } from '@/lib/crmApi';
import { CalendarCheckIcon, CheckIcon, PlusIcon, UsersIcon, DownloadIcon, EyeIcon, XIcon } from '@/components/crm/CrmIcons';

export default function AttendanceRegisterPage({ params }: { params: Promise<{ tenant: string }> }) {
  const resolvedParams = use(params);
  const tenantSlug = resolvedParams.tenant;

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Export Report Modal State
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<'today' | '7days' | '30days' | 'this_month' | 'last_month' | 'ytd' | null>('this_month');
  const [exportStartDate, setExportStartDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().split('T')[0];
  });
  const [exportEndDate, setExportEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [exportEmployeeMode, setExportEmployeeMode] = useState<'all' | 'selected'>('all');
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);
  const [exportStatus, setExportStatus] = useState('all');
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);
  const [allEmployeesList, setAllEmployeesList] = useState<any[]>([]);
  const [previewData, setPreviewData] = useState<any>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [showPreviewTable, setShowPreviewTable] = useState(false);
  const [exportLayoutMode, setExportLayoutMode] = useState<'combo' | 'matrix' | 'detailed'>('combo');
  const [previewTab, setPreviewTab] = useState<'matrix' | 'detailed'>('matrix');

  // Add Employee to Roster Modal State
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmpCode, setNewEmpCode] = useState("");
  const [newDesignation, setNewDesignation] = useState("Operations Executive");
  const [newDepartment, setNewDepartment] = useState("Operations");
  const [newInitialStatus, setNewInitialStatus] = useState("present");
  const [isSubmittingEmployee, setIsSubmittingEmployee] = useState(false);

  // Edit Attendance Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState<number | null>(null);
  const [editEmployeeName, setEditEmployeeName] = useState('');
  const [editStatus, setEditStatus] = useState('present');
  const [editCheckIn, setEditCheckIn] = useState('09:30:00');
  const [editCheckOut, setEditCheckOut] = useState('18:30:00');
  const [editRemarks, setEditRemarks] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const statuses = [
    { key: 'present', label: 'Present', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { key: 'wfh', label: 'WFH', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { key: 'half-day', label: 'Half-Day', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { key: 'leave', label: 'Leave', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { key: 'absent', label: 'Absent', color: 'bg-red-50 text-red-700 border-red-200' },
  ];

  const loadAttendance = async (targetDate: string) => {
    try {
      if (!getAuthToken()) return;
      setLoading(true);
      const [recRes, sumRes] = await Promise.all([
        crmFetch(`/api/attendance/records?date=${targetDate}`),
        crmFetch(`/api/attendance/summary?month=${targetDate.slice(0, 7)}`),
      ]);
      setRecords(recRes.data || []);
      setSummary(sumRes || {});
    } catch (err: any) {
      console.warn('Failed to load attendance:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance(date);
  }, [date, tenantSlug]);

  const handleMark = async (employeeId: number, status: string) => {
    try {
      setActionFeedback(null);
      await crmFetch('/api/attendance/mark', {
        method: 'POST',
        body: JSON.stringify({
          employee_id: employeeId,
          date,
          status,
          check_in_time: '09:30:00',
          check_out_time: '18:30:00',
        }),
      });
      setRecords(prev => prev.map(r => r.employee_id === employeeId ? { ...r, status } : r));
      setActionFeedback(`Marked as ${status.toUpperCase()}`);
      setTimeout(() => setActionFeedback(null), 2000);
      loadAttendance(date);
    } catch (err: any) {
      alert('Error marking attendance: ' + err.message);
    }
  };


  const handleOpenAddEmployee = () => {
    const randomCode = "EMP-" + Math.floor(1000 + Math.random() * 9000);
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setNewEmpCode(randomCode);
    setNewDesignation("Staff Executive");
    setNewDepartment("Operations");
    setNewInitialStatus("present");
    setIsAddEmployeeModalOpen(true);
  };

  const handleAddEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      alert("Please enter employee full name");
      return;
    }

    try {
      setIsSubmittingEmployee(true);
      await crmFetch("/api/attendance/employees", {
        method: "POST",
        body: JSON.stringify({
          name: newName.trim(),
          email: newEmail.trim() || ("emp_" + Date.now().toString().slice(-5) + "@company.com"),
          phone: newPhone.trim(),
          employee_code: newEmpCode.trim() || ("EMP-" + Date.now().toString().slice(-4)),
          designation: newDesignation.trim() || "Staff",
          department: newDepartment.trim() || "Operations",
          initial_status: newInitialStatus,
          date,
          check_in_time: "09:30:00",
          check_out_time: "18:30:00",
        }),
      });

      setIsAddEmployeeModalOpen(false);
      setActionFeedback("Employee \"" + newName + "\" successfully registered and added to roster!");
      setTimeout(() => setActionFeedback(null), 4000);
      await loadAttendance(date);
    } catch (err: any) {
      alert("Failed to add employee: " + err.message);
    } finally {
      setIsSubmittingEmployee(false);
    }
  };

  const handleRemoveEmployeeFromRoster = async (employeeId: number, employeeName: string) => {
    if (!confirm("Are you sure you want to remove \"" + employeeName + "\" from the active staff roster?")) {
      return;
    }
    try {
      await crmFetch("/api/attendance/employees/" + employeeId, { method: "DELETE" });
      setActionFeedback("Removed \"" + employeeName + "\" from active roster");
      setTimeout(() => setActionFeedback(null), 3000);
      await loadAttendance(date);
    } catch (err: any) {
      alert("Error removing employee: " + err.message);
    }
  };

  const handleOpenEdit = (r: any) => {
    setEditEmployeeId(r.employee_id);
    setEditEmployeeName(r.employee_name);
    setEditStatus(r.status === 'unmarked' ? 'present' : r.status);
    setEditCheckIn(r.check_in_time || '09:30:00');
    setEditCheckOut(r.check_out_time || '18:30:00');
    setEditRemarks(r.remarks || '');
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEmployeeId) return;
    try {
      setIsSavingEdit(true);
      await crmFetch('/api/attendance/mark', {
        method: 'POST',
        body: JSON.stringify({
          employee_id: editEmployeeId,
          date,
          status: editStatus,
          check_in_time: editCheckIn,
          check_out_time: editCheckOut,
          remarks: editRemarks,
        }),
      });
      setIsEditModalOpen(false);
      await loadAttendance(date);
    } catch (err: any) {
      alert('Error saving attendance: ' + err.message);
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleDeleteAttendance = async (attendanceId: number, employeeName: string) => {
    if (!confirm(`Are you sure you want to reset attendance for '${employeeName}'?`)) {
      return;
    }
    try {
      await crmFetch(`/api/attendance/records/${attendanceId}`, { method: 'DELETE' });
      await loadAttendance(date);
    } catch (err: any) {
      alert('Error deleting attendance: ' + err.message);
    }
  };

  const handleOpenExportModal = async () => {
    setIsExportModalOpen(true);
    setExportFeedback(null);
    setShowPreviewTable(false);
    setPreviewData(null);
    setActivePreset('this_month');
    try {
      const res = await crmFetch('/api/admin/employees');
      if (res.data && res.data.length > 0) {
        setAllEmployeesList(res.data);
      } else {
        const unique = Array.from(new Map(records.map(r => [r.employee_id, { id: r.employee_id, name: r.employee_name, employee_code: r.employee_code, department: r.department, designation: r.designation }])).values());
        setAllEmployeesList(unique);
      }
    } catch {
      const unique = Array.from(new Map(records.map(r => [r.employee_id, { id: r.employee_id, name: r.employee_name, employee_code: r.employee_code, department: r.department, designation: r.designation }])).values());
      setAllEmployeesList(unique);
    }
  };

  const handleSetPresetDate = (type: 'today' | '7days' | '30days' | 'this_month' | 'last_month' | 'ytd') => {
    setActivePreset(type);
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    if (type === 'today') {
      setExportStartDate(todayStr);
      setExportEndDate(todayStr);
    } else if (type === '7days') {
      const d = new Date();
      d.setDate(d.getDate() - 6);
      setExportStartDate(d.toISOString().split('T')[0]);
      setExportEndDate(todayStr);
    } else if (type === '30days') {
      const d = new Date();
      d.setDate(d.getDate() - 29);
      setExportStartDate(d.toISOString().split('T')[0]);
      setExportEndDate(todayStr);
    } else if (type === 'this_month') {
      const d = new Date(today.getFullYear(), today.getMonth(), 1);
      setExportStartDate(d.toISOString().split('T')[0]);
      setExportEndDate(todayStr);
    } else if (type === 'last_month') {
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const end = new Date(today.getFullYear(), today.getMonth(), 0);
      setExportStartDate(start.toISOString().split('T')[0]);
      setExportEndDate(end.toISOString().split('T')[0]);
    } else if (type === 'ytd') {
      const start = new Date(today.getFullYear(), 0, 1);
      setExportStartDate(start.toISOString().split('T')[0]);
      setExportEndDate(todayStr);
    }
  };

  const handleToggleEmployee = (id: number) => {
    setSelectedEmployeeIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAllEmployees = () => {
    setSelectedEmployeeIds(allEmployeesList.map(e => e.id));
  };

  const handleClearAllEmployees = () => {
    setSelectedEmployeeIds([]);
  };

  const handlePreviewReport = async () => {
    try {
      setIsPreviewLoading(true);
      setExportFeedback(null);
      const empIdsParam = exportEmployeeMode === 'all' ? 'all' : selectedEmployeeIds.join(',');
      if (exportEmployeeMode === 'selected' && selectedEmployeeIds.length === 0) {
        alert('Please select at least one employee or choose All Employees.');
        return;
      }
      const res = await crmFetch(`/api/attendance/export?start_date=${exportStartDate}&end_date=${exportEndDate}&employee_ids=${empIdsParam}&status=${exportStatus}&format=json&export_type=${exportLayoutMode}`);
      setPreviewData(res);
      setShowPreviewTable(true);
    } catch (err: any) {
      alert('Error loading preview: ' + err.message);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      setIsExporting(true);
      setExportFeedback(null);
      const token = getAuthToken();
      const empIdsParam = exportEmployeeMode === 'all' ? 'all' : selectedEmployeeIds.join(',');

      if (exportEmployeeMode === 'selected' && selectedEmployeeIds.length === 0) {
        alert('Please select at least one employee or choose All Employees.');
        return;
      }

      const url = getCrmUrl(`/attendance/export?start_date=${exportStartDate}&end_date=${exportEndDate}&employee_ids=${empIdsParam}&status=${exportStatus}&format=csv&export_type=${exportLayoutMode}&download=1`);

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to download report');
      }

      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `Attendance_${exportStartDate}_to_${exportEndDate}_${exportLayoutMode}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      setExportFeedback('Attendance report downloaded successfully! (Opens natively in Excel)');
      setTimeout(() => {
        setExportFeedback(null);
      }, 4000);
    } catch (err: any) {
      alert('Error downloading report: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#d6c180] rounded-full animate-spin"></div>
      </div>
    );
  }

  const counts = summary?.status_counts || {};

  return (
    <div className="space-y-6">
      {/* Title & Date Picker Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Staff Attendance Register</h1>
          <p className="text-xs text-slate-500 mt-1">Daily roster check-in, check-out times, and work status marking</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-500">Select Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 shadow-sm focus:outline-none focus:border-[#d6c180]"
            />
          </div>
          <button
            onClick={handleOpenExportModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-bold shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <DownloadIcon size={16} />
            <span>Download Attendance</span>
          </button>
          <button
            onClick={handleOpenAddEmployee}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d6c180] text-[#0F172A] text-xs font-extrabold shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            <PlusIcon size={16} />
            <span>+ Add Employee</span>
          </button>
        </div>
      </div>

      {actionFeedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckIcon size={16} />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Monthly Summary Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {statuses.map(st => (
          <div key={st.key} className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {st.label}
            </span>
            <p className="text-xl font-black text-slate-900">{counts[st.key] || 0}</p>
            <span className="text-[10px] text-slate-500">in {date.slice(0, 7)}</span>
          </div>
        ))}
      </div>

      {/* Daily Attendance Grid */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            Attendance for {date} ({records.length} Staff Members)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#FAF9F5] border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Employee Name</th>
                <th className="px-5 py-3.5">Designation & Dept</th>
                <th className="px-5 py-3.5">Timings</th>
                <th className="px-5 py-3.5">Current Status</th>
                <th className="px-5 py-3.5 text-right">Quick Mark Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((r) => (
                <tr key={r.employee_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-900">
                    <div>{r.employee_name}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{r.employee_code}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold">{r.designation || 'Staff'}</div>
                    <span className="text-[10px] text-slate-500">{r.department || 'Operations'}</span>
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">
                    {r.check_in_time ? `${r.check_in_time} - ${r.check_out_time || 'Present'}` : 'Not checked in'}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      r.status === 'present' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      r.status === 'wfh' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      r.status === 'absent' ? 'bg-red-50 text-red-700 border border-red-200' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {r.status || 'Unmarked'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex items-center gap-1.5 flex-wrap justify-end">
                      {statuses.map(st => (
                        <button
                          key={st.key}
                          onClick={() => handleMark(r.employee_id, st.key)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            r.status === st.key
                              ? 'bg-[#0F172A] text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                      <button
                        onClick={() => handleOpenEdit(r)}
                        className="px-2 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-[10px] font-bold cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveEmployeeFromRoster(r.employee_id, r.employee_name)}
                        className="px-2 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-[10px] font-bold cursor-pointer"
                        title="Deactivate employee from roster"
                      >
                        ✕ Remove
                      </button>
                      {r.attendance_id && (
                        <button
                          onClick={() => handleDeleteAttendance(r.attendance_id, r.employee_name)}
                          className="px-2 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-[10px] font-bold"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      {/* MODAL: Add New Employee Directly into Roster */}
      {isAddEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddEmployeeModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200 cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-2xl bg-[#F5EFE0] text-[#856E2E] flex items-center justify-center font-bold">
                <UsersIcon size={20} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Add New Employee</h3>
                <p className="text-xs text-slate-500">Register staff member into roster & mark attendance for {date}</p>
              </div>
            </div>

            <form onSubmit={handleAddEmployeeSubmit} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Work Email <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="rahul@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Employee Code</label>
                  <input
                    type="text"
                    value={newEmpCode}
                    onChange={(e) => setNewEmpCode(e.target.value)}
                    placeholder="EMP-1001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={newDesignation}
                    onChange={(e) => setNewDesignation(e.target.value)}
                    placeholder="Sales Rep / HR"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-bold text-slate-800 focus:outline-none focus:border-[#d6c180]"
                  >
                    <option value="Operations">Operations (Attendance Desk)</option>
                    <option value="Sales">Sales & BD (Auto-enables Sales)</option>
                    <option value="HR & Recruitment">HR & Recruitment</option>
                    <option value="General Staff">General Staff</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#d6c180]/30 text-[11px] text-slate-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span>Auto-synced: Appears across <strong>HR Staff</strong> and <strong>Sales Rep</strong> lists.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Initial Status for {date}
                  </label>
                  <select
                    value={newInitialStatus}
                    onChange={(e) => setNewInitialStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-bold text-slate-800"
                  >
                    <option value="present">Present (09:30 AM)</option>
                    <option value="wfh">Work From Home (WFH)</option>
                    <option value="half-day">Half Day</option>
                    <option value="leave">On Leave</option>
                    <option value="unmarked">Unmarked</option>
                  </select>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="p-2.5 bg-[#FAF9F5] rounded-xl border border-[#d6c180]/30 text-[11px] text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>Staff Roster only. CRM Portal login is managed by Admin.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingEmployee}
                  className="w-full py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmittingEmployee ? "Registering Employee..." : "+ Save & Add to Attendance Roster"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Attendance Record Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative my-auto">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200"
            >
              ✕
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Edit Attendance Record</h3>
            <p className="text-xs text-slate-500 mb-6">{editEmployeeName} ({date})</p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-bold"
                >
                  {statuses.map(st => (
                    <option key={st.key} value={st.key}>{st.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Check-in Time</label>
                  <input
                    type="time"
                    step="1"
                    value={editCheckIn}
                    onChange={(e) => setEditCheckIn(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Check-out Time</label>
                  <input
                    type="time"
                    step="1"
                    value={editCheckOut}
                    onChange={(e) => setEditCheckOut(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Remarks / Note</label>
                <textarea
                  rows={2}
                  value={editRemarks}
                  onChange={(e) => setEditRemarks(e.target.value)}
                  placeholder="e.g. Client meeting in morning, approved by manager"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSavingEdit}
                className="w-full py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 disabled:opacity-50 mt-2"
              >
                {isSavingEdit ? 'Saving Attendance...' : 'Update Record'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Download Attendance Modal */}
      {isExportModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsExportModalOpen(false);
          }}
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 max-w-2xl w-full shadow-2xl relative max-h-[90vh] flex flex-col my-auto overflow-hidden">
            {/* Sticky Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-[#d6c180]/40 text-[#856E2E] flex items-center justify-center shrink-0">
                  <DownloadIcon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Download Attendance</h3>
                  <p className="text-xs text-slate-500">Filter by date, staff, and status to export attendance sheets</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="Close"
              >
                <XIcon size={18} />
              </button>
            </div>

            {exportFeedback && (
              <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckIcon size={16} />
                <span>{exportFeedback}</span>
              </div>
            )}

            {/* Scrollable Content Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Step 1: Date Range */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  1. Select Date Range (From &amp; To):
                </label>
                
                {/* Quick Preset Chips with Dynamic Active Highlight */}
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { key: 'today', label: 'Today' },
                    { key: '7days', label: 'Last 7 Days' },
                    { key: '30days', label: 'Last 30 Days' },
                    { key: 'this_month', label: 'This Month' },
                    { key: 'last_month', label: 'Last Month' },
                    { key: 'ytd', label: 'Year to Date' },
                  ].map((p) => {
                    const isActive = activePreset === p.key;
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => handleSetPresetDate(p.key as any)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'border-[#d6c180] bg-[#FAF9F5] text-[#856E2E] shadow-xs ring-1 ring-[#d6c180]'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={exportStartDate}
                      onChange={(e) => {
                        setExportStartDate(e.target.value);
                        setActivePreset(null);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-[#d6c180]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">End Date</label>
                    <input
                      type="date"
                      value={exportEndDate}
                      onChange={(e) => {
                        setExportEndDate(e.target.value);
                        setActivePreset(null);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-[#d6c180]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Employee Filter */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    2. Choose Staff Selection:
                  </label>
                  {exportEmployeeMode === 'selected' && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSelectAllEmployees}
                        className="text-[11px] font-bold text-[#856E2E] hover:underline cursor-pointer"
                      >
                        Select All
                      </button>
                      <span className="text-slate-300">•</span>
                      <button
                        type="button"
                        onClick={handleClearAllEmployees}
                        className="text-[11px] font-bold text-slate-400 hover:underline cursor-pointer"
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="empMode"
                      checked={exportEmployeeMode === 'all'}
                      onChange={() => setExportEmployeeMode('all')}
                      className="text-[#856E2E] focus:ring-0"
                    />
                    <span>All Staff ({allEmployeesList.length})</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="empMode"
                      checked={exportEmployeeMode === 'selected'}
                      onChange={() => setExportEmployeeMode('selected')}
                      className="text-[#856E2E] focus:ring-0"
                    />
                    <span>Select Specific Employees ({selectedEmployeeIds.length} chosen)</span>
                  </label>
                </div>

                {exportEmployeeMode === 'selected' && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                    <input
                      type="text"
                      placeholder="Search employee by name, code or department..."
                      value={employeeSearchTerm}
                      onChange={(e) => setEmployeeSearchTerm(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#d6c180]"
                    />

                    <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                      {allEmployeesList
                        .filter(emp => {
                          if (!employeeSearchTerm) return true;
                          const term = employeeSearchTerm.toLowerCase();
                          return (
                            (emp.name || '').toLowerCase().includes(term) ||
                            (emp.employee_code || '').toLowerCase().includes(term) ||
                            (emp.department || '').toLowerCase().includes(term)
                          );
                        })
                        .map(emp => {
                          const isChecked = selectedEmployeeIds.includes(emp.id);
                          return (
                            <label
                              key={emp.id}
                              className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                                isChecked
                                  ? 'bg-[#FAF9F5] border-[#d6c180] text-slate-900 font-bold'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 font-medium'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleToggleEmployee(emp.id)}
                                  className="rounded border-slate-300 text-[#856E2E] focus:ring-0"
                                />
                                <span className="truncate">{emp.name}</span>
                                <span className="text-[10px] text-slate-400 font-normal">
                                  {emp.employee_code} • {emp.department}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400 uppercase tracking-wider">{emp.designation}</span>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Status Filter */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Status Filter (Optional):
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[{ key: 'all', label: 'All Statuses' }, ...statuses].map(st => (
                    <button
                      key={st.key}
                      type="button"
                      onClick={() => setExportStatus(st.key)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                        exportStatus === st.key
                          ? 'bg-[#0F172A] text-white border-[#0F172A]'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Report Format / Layout */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  4. Choose Primary Excel Sheet / Layout:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setExportLayoutMode('combo')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      exportLayoutMode === 'combo'
                        ? 'border-[#d6c180] bg-[#FAF9F5] shadow-xs ring-1 ring-[#d6c180]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">All-in-One Workbook</span>
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-[#F5EFE0] text-[#856E2E]">Recommended</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Full 3-sheet Excel workbook: Daily Log, Matrix Grid &amp; Staff Summary
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportLayoutMode('matrix')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      exportLayoutMode === 'matrix'
                        ? 'border-[#d6c180] bg-[#FAF9F5] shadow-xs ring-1 ring-[#d6c180]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 block mb-1">Calendar Matrix First</span>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Opens directly on day-by-day P / A / WFH attendance grid
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportLayoutMode('detailed')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      exportLayoutMode === 'detailed'
                        ? 'border-[#d6c180] bg-[#FAF9F5] shadow-xs ring-1 ring-[#d6c180]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 block mb-1">Detailed Time Log First</span>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Opens directly on check-in, check-out &amp; auto calculated hours
                    </p>
                  </button>
                </div>
              </div>

              {/* Preview Table if Requested */}
              {showPreviewTable && previewData && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Report Preview ({previewData.total_days || 0} Days • {previewData.total_employees || 0} Staff)
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Period: {previewData.start_date} to {previewData.end_date}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setPreviewTab('matrix')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          previewTab === 'matrix'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Matrix Grid
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewTab('detailed')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          previewTab === 'detailed'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Detailed Log ({previewData.total_records || 0})
                      </button>
                    </div>
                  </div>

                  {previewTab === 'matrix' ? (
                    <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                      <table className="w-full text-left text-xs text-slate-700 whitespace-nowrap">
                        <thead className="bg-[#FAF9F5] border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase sticky top-0 z-10">
                          <tr>
                            <th className="px-3 py-2 bg-[#FAF9F5]">Staff</th>
                            {previewData.date_list?.map((d: any) => (
                              <th key={d.date} className="px-2 py-2 text-center bg-[#FAF9F5]">
                                {d.label}
                              </th>
                            ))}
                            <th className="px-2 py-2 text-center bg-[#FAF9F5]">Days</th>
                            <th className="px-2 py-2 text-center bg-[#FAF9F5]">Present</th>
                            <th className="px-2 py-2 text-center bg-[#FAF9F5]">WFH</th>
                            <th className="px-2 py-2 text-center bg-[#FAF9F5]">Absent</th>
                            <th className="px-2 py-2 text-right bg-[#FAF9F5]">Rate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {previewData.matrix?.map((m: any) => (
                            <tr key={m.id} className="hover:bg-slate-50">
                              <td className="px-3 py-2 font-bold text-slate-900">
                                <div>{m.name}</div>
                                <span className="text-[10px] text-slate-400 font-normal">{m.code}</span>
                              </td>
                              {previewData.date_list?.map((d: any) => {
                                const st = m.daily?.[d.date]?.status || 'UNMARKED';
                                return (
                                  <td key={d.date} className="px-2 py-2 text-center">
                                    <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-black ${
                                      st === 'PRESENT' ? 'bg-emerald-100 text-emerald-800' :
                                      st === 'WFH' ? 'bg-blue-100 text-blue-800' :
                                      st === 'HALF-DAY' ? 'bg-amber-100 text-amber-800' :
                                      st === 'LEAVE' ? 'bg-purple-100 text-purple-800' :
                                      st === 'ABSENT' ? 'bg-red-100 text-red-800' :
                                      st === 'WEEK-OFF' ? 'bg-slate-100 text-slate-500' :
                                      'bg-slate-50 text-slate-400'
                                    }`}>
                                      {st === 'PRESENT' ? 'P' :
                                       st === 'WFH' ? 'WFH' :
                                       st === 'HALF-DAY' ? 'HD' :
                                       st === 'LEAVE' ? 'L' :
                                       st === 'ABSENT' ? 'A' :
                                       st === 'WEEK-OFF' ? 'OFF' : '-'}
                                    </span>
                                  </td>
                                );
                              })}
                              <td className="px-2 py-2 text-center font-bold text-slate-500">{m.total_days}</td>
                              <td className="px-2 py-2 text-center font-bold text-emerald-600">{m.present}</td>
                              <td className="px-2 py-2 text-center font-bold text-blue-600">{m.wfh}</td>
                              <td className="px-2 py-2 text-center font-bold text-red-600">{m.absent}</td>
                              <td className="px-2 py-2 text-right font-black text-slate-900">{m.attendance_rate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                      <table className="w-full text-left text-xs text-slate-700 whitespace-nowrap">
                        <thead className="bg-[#FAF9F5] border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase sticky top-0 z-10">
                          <tr>
                            <th className="px-3 py-2 bg-[#FAF9F5]">Date &amp; Day</th>
                            <th className="px-3 py-2 bg-[#FAF9F5]">Employee</th>
                            <th className="px-2 py-2 bg-[#FAF9F5]">Status</th>
                            <th className="px-2 py-2 bg-[#FAF9F5]">Check-In</th>
                            <th className="px-2 py-2 bg-[#FAF9F5]">Check-Out</th>
                            <th className="px-2 py-2 bg-[#FAF9F5]">Hours</th>
                            <th className="px-3 py-2 bg-[#FAF9F5]">Remarks</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {previewData.detailed_logs?.map((l: any, idx: number) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="px-3 py-2 font-mono text-[11px] text-slate-800">
                                <div className="font-bold">{l.date}</div>
                                <span className="text-[10px] text-slate-400">{l.day}</span>
                              </td>
                              <td className="px-3 py-2 font-bold text-slate-900">
                                <div>{l.employee_name}</div>
                                <span className="text-[10px] text-slate-400 font-normal">{l.employee_code}</span>
                              </td>
                              <td className="px-2 py-2">
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                  l.status === 'PRESENT' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                  l.status === 'WFH' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                  l.status === 'HALF-DAY' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                  l.status === 'LEAVE' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                  l.status === 'ABSENT' ? 'bg-red-50 text-red-700 border border-red-200' :
                                  'bg-slate-100 text-slate-600'
                                }`}>
                                  {l.status}
                                </span>
                              </td>
                              <td className="px-2 py-2 font-mono text-[11px] text-slate-600">{l.check_in}</td>
                              <td className="px-2 py-2 font-mono text-[11px] text-slate-600">{l.check_out}</td>
                              <td className="px-2 py-2 font-bold text-slate-800 text-[11px]">{l.working_hours}</td>
                              <td className="px-3 py-2 text-slate-500 text-[11px] truncate max-w-xs">{l.remarks || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sticky Action Bar */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between gap-3 sticky bottom-0 z-10">
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviewReport}
                  disabled={isPreviewLoading}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <EyeIcon size={15} />
                  <span>{isPreviewLoading ? 'Loading Preview...' : 'Preview'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadExcel}
                  disabled={isExporting}
                  className="py-2.5 px-5 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <DownloadIcon size={16} />
                  <span>{isExporting ? 'Generating Report...' : 'Download Attendance (Excel / CSV)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
