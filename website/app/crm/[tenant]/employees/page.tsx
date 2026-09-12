'use client';

import React, { useState, useEffect, use } from 'react';
import { crmFetch, getAuthToken, getCurrentUser } from '@/lib/crmApi';
import {
  UsersIcon,
  PlusIcon,
  SettingsIcon,
  CheckIcon,
} from '@/components/crm/CrmIcons';

export default function EmployeesManagementPage({ params }: { params: Promise<{ tenant: string }> }) {
  const resolvedParams = use(params);
  const tenantSlug = resolvedParams.tenant;

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Employee Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('Employee@123');
  const [allowPortalAccess, setAllowPortalAccess] = useState(false);
  const [designation, setDesignation] = useState('Executive');
  const [department, setDepartment] = useState('Sales');
  const [employeeCode, setEmployeeCode] = useState('');
  const [selectedModules, setSelectedModules] = useState<string[]>(['sales']);
  const [initialStatus, setInitialStatus] = useState('present');
  const [isSaving, setIsSaving] = useState(false);

  // Password Management in Module Modal
  const [newEmployeePassword, setNewEmployeePassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState<string | null>(null);

  const isMasterOrAdmin = currentUser?.role === 'master' || currentUser?.role === 'admin';

  const handleDepartmentChange = (newDept: string) => {
    setDepartment(newDept);
    if (!isMasterOrAdmin) return;
    const dLower = newDept.toLowerCase();
    const newMods = new Set<string>();
    if (dLower.includes('sale')) {
      newMods.add('sales');
    }
    if (dLower.includes('recruitment') || dLower.includes('candidate') || dLower.includes('hiring')) {
      newMods.add('recruitment');
    }
    setSelectedModules(Array.from(newMods));
  };

  // Module Assignment Modal
  const [activeEmp, setActiveEmp] = useState<any>(null);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [editModules, setEditModules] = useState<string[]>([]);
  const [isSavingModules, setIsSavingModules] = useState(false);

  // Edit Employee Modal
  const [isEditEmpModalOpen, setIsEditEmpModalOpen] = useState(false);
  const [editEmpId, setEditEmpId] = useState<number | null>(null);
  const [editEmpName, setEditEmpName] = useState('');
  const [editEmpPhone, setEditEmpPhone] = useState('');
  const [editEmpDesignation, setEditEmpDesignation] = useState('');
  const [editEmpDepartment, setEditEmpDepartment] = useState('');
  const [editEmpCode, setEditEmpCode] = useState('');
  const [editEmpSalary, setEditEmpSalary] = useState('0');
  const [isUpdatingEmp, setIsUpdatingEmp] = useState(false);

  const loadEmployees = async () => {
    try {
      if (!getAuthToken()) return;
      setLoading(true);
      const res = await crmFetch('/api/admin/employees');
      setEmployees(res.data || []);
    } catch (err: any) {
      console.warn('Failed to load employees:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    loadEmployees();
  }, [tenantSlug]);

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await crmFetch('/api/admin/employees', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          phone,
          password: allowPortalAccess ? password : '',
          designation,
          department,
          employee_code: employeeCode,
          allow_portal_access: isMasterOrAdmin && allowPortalAccess,
          modules: isMasterOrAdmin && allowPortalAccess ? selectedModules : [],
          initial_status: initialStatus,
        }),
      });
      await loadEmployees();
      setIsAddModalOpen(false);
      setName('');
      setEmail('');
      setPhone('');
      setEmployeeCode('');
      setAllowPortalAccess(false);
      setPassword('Employee@123');
      setInitialStatus('present');
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenModuleModal = (emp: any) => {
    setActiveEmp(emp);
    setEditModules(emp.modules || []);
    setNewEmployeePassword('');
    setPasswordSuccessMessage(null);
    setIsModuleModalOpen(true);
  };

  const handleResetEmployeePassword = async () => {
    if (!activeEmp || !newEmployeePassword) return;
    if (newEmployeePassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    try {
      setIsUpdatingPassword(true);
      await crmFetch('/api/admin/employees/reset-password', {
        method: 'POST',
        body: JSON.stringify({
          employee_id: activeEmp.id,
          new_password: newEmployeePassword,
        }),
      });
      setPasswordSuccessMessage('Password updated successfully!');
      setNewEmployeePassword('');
      setTimeout(() => setPasswordSuccessMessage(null), 3500);
    } catch (err: any) {
      alert('Error resetting password: ' + err.message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSaveModules = async () => {
    if (!activeEmp) return;
    try {
      setIsSavingModules(true);
      await crmFetch('/api/admin/employees/assign-modules', {
        method: 'POST',
        body: JSON.stringify({
          employee_id: activeEmp.id,
          modules: editModules,
        }),
      });
      await loadEmployees();
      setIsModuleModalOpen(false);
    } catch (err: any) {
      alert('Error updating modules: ' + err.message);
    } finally {
      setIsSavingModules(false);
    }
  };

  const handleOffboard = async (empId: number, empName: string) => {
    if (!confirm(`Are you sure you want to offboard ${empName}? This will revoke their account access.`)) {
      return;
    }
    try {
      await crmFetch('/api/admin/employees/offboard', {
        method: 'POST',
        body: JSON.stringify({
          employee_id: empId,
          exit_type: 'resigned',
          exit_reason: 'Offboarded via admin dashboard',
        }),
      });
      await loadEmployees();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleOpenEditEmpModal = (emp: any) => {
    setEditEmpId(emp.id);
    setEditEmpName(emp.name || '');
    setEditEmpPhone(emp.phone || '');
    setEditEmpDesignation(emp.designation || 'Associate');
    setEditEmpDepartment(emp.department || 'Operations');
    setEditEmpCode(emp.employee_code || '');
    setEditEmpSalary(emp.salary ? String(emp.salary) : '0');
    setIsEditEmpModalOpen(true);
  };

  const handleUpdateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEmpId) return;
    try {
      setIsUpdatingEmp(true);
      await crmFetch(`/api/admin/employees/${editEmpId}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: editEmpName,
          phone: editEmpPhone,
          designation: editEmpDesignation,
          department: editEmpDepartment,
          employee_code: editEmpCode,
          salary: editEmpSalary,
        }),
      });
      setIsEditEmpModalOpen(false);
      await loadEmployees();
    } catch (err: any) {
      alert('Error updating employee: ' + err.message);
    } finally {
      setIsUpdatingEmp(false);
    }
  };

  const handleDeleteEmployee = async (empId: number, empName: string) => {
    if (!confirm(`CAUTION: Permanently delete employee '${empName}'? This will delete their staff account and login credentials.`)) {
      return;
    }
    try {
      await crmFetch(`/api/admin/employees/${empId}`, { method: 'DELETE' });
      await loadEmployees();
    } catch (err: any) {
      alert('Error deleting employee: ' + err.message);
    }
  };

  const toggleModuleSelection = (mod: string, isEdit = false) => {
    if (isEdit) {
      setEditModules(prev => prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]);
    } else {
      setSelectedModules(prev => prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#d6c180] rounded-full animate-spin"></div>
      </div>
    );
  }

  const moduleOptions = [
    { key: 'recruitment', label: 'Recruitment & Job Pipeline' },
    { key: 'sales', label: 'Sales & Revenue Ledger' },
  ];

  return (
    <div className="space-y-6">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Staff & HR Management</h1>
          <p className="text-xs text-slate-500 mt-1">Employee profiles, role allocations, and module permission control</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#d6c180] text-[#0F172A] text-xs font-bold shadow-sm hover:opacity-90"
        >
          <PlusIcon size={16} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Employees Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#E2E8F0]">
          <h2 className="text-sm font-bold text-slate-900">Active Staff Directory ({employees.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#FAF9F5] border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Employee Name</th>
                <th className="px-5 py-3.5">Designation</th>
                <th className="px-5 py-3.5">Department</th>
                <th className="px-5 py-3.5">Assigned Modules</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-900">
                    <div>{e.name}</div>
                    <span className="text-[11px] text-slate-500 font-normal">{e.email} • {e.employee_code}</span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-800">{e.designation || 'Specialist'}</td>
                  <td className="px-5 py-4 font-semibold text-slate-600">{e.department || 'General'}</td>
                  <td className="px-5 py-4">
                    {e.modules && e.modules.length > 0 ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-emerald-700 tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                          <span>PORTAL ACTIVE</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {e.modules.map((m: string) => (
                            <span key={m} className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F5EFE0] text-[#856E2E]">
                              {m === 'hr' ? 'HR & Staff' : m}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                        <span className="italic">Staff Only (No Portal)</span>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      e.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right space-x-1.5 whitespace-nowrap">
                    {isMasterOrAdmin && (
                      <button
                        onClick={() => handleOpenModuleModal(e)}
                        className="px-2.5 py-1 rounded-lg border border-[#d6c180] bg-[#FAF9F5] text-[#856E2E] hover:bg-[#F5EFE0] text-[11px] font-bold shadow-xs cursor-pointer"
                        title="Manage portal access, modules, and login password"
                      >
                        Access & Password
                      </button>
                    )}
                    {(!isMasterOrAdmin && (e.user_role === 'admin' || e.user_role === 'master')) ? (
                      <span className="text-[11px] text-slate-400 italic px-2">Protected Admin</span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleOpenEditEmpModal(e)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-[11px] font-bold"
                        >
                          Edit
                        </button>
                        {e.status === 'active' && (
                          <button
                            onClick={() => handleOffboard(e.id, e.name)}
                            className="px-2.5 py-1 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50 text-[11px] font-bold"
                          >
                            Offboard
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteEmployee(e.id, e.name)}
                          className="px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-[11px] font-bold"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl relative my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">Add Team Member</h3>
                <p className="text-xs text-slate-500 mt-0.5">Create credentials and assign dashboard permissions</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200 cursor-pointer transition"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleCreateEmployee} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Karan Dave"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="karan@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98250 12345"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Sales Specialist"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department *</label>
                  <select
                    value={department}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-bold text-slate-800 focus:outline-none focus:border-[#d6c180]"
                  >
                    <option value="Sales">Sales (Auto-assigns Sales)</option>
                    <option value="Recruitment">Recruitment (Auto-assigns Recruitment)</option>
                    <option value="Marketing & Design">Marketing & Design</option>
                    <option value="General Staff">General Staff</option>
                    <option value="Engineering & IT">Engineering & IT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Today's Attendance Status</label>
                  <select
                    value={initialStatus}
                    onChange={(e) => setInitialStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-bold text-slate-800 focus:outline-none focus:border-[#d6c180]"
                  >
                    <option value="present">Present (Auto-check-in today)</option>
                    <option value="wfh">Work From Home (WFH)</option>
                    <option value="unmarked">Unmarked (Pending)</option>
                    <option value="half-day">Half-Day</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Employee Code</label>
                  <input
                    type="text"
                    value={employeeCode}
                    onChange={(e) => setEmployeeCode(e.target.value)}
                    placeholder="Auto-generated if empty"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#d6c180]/30 text-[11px] text-slate-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span>Auto-synced: Appears on <strong>Attendance Desk</strong> and in <strong>Sales Rep</strong> assignments.</span>
              </div>

              {isMasterOrAdmin ? (
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowPortalAccess}
                      onChange={(e) => setAllowPortalAccess(e.target.checked)}
                      className="rounded border-slate-300 text-[#856E2E] focus:ring-0 w-4 h-4"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800">Grant CRM Portal Login Access</span>
                      <p className="text-[10px] text-slate-500">Enable this employee to log into the CRM dashboard with email & password</p>
                    </div>
                  </label>

                  {allowPortalAccess ? (
                    <div className="space-y-3 pt-2.5 border-t border-slate-200">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Portal Login Password *</label>
                        <input
                          type="text"
                          required={allowPortalAccess}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Employee@123"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono bg-white focus:outline-none focus:border-[#d6c180]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Assign System Modules:</label>
                        <div className="grid grid-cols-2 gap-2">
                          {moduleOptions.map(({ key, label }) => (
                            <label key={key} className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedModules.includes(key)}
                                onChange={() => toggleModuleSelection(key)}
                                className="rounded border-slate-300 text-[#856E2E] focus:ring-0"
                              />
                              <span className="truncate">{label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0"></span>
                      <span>Staff Only: Registered for Staff Directory & Attendance only (No CRM portal login).</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0"></span>
                  <span>Staff Roster: Registered for Staff Directory & Attendance only. CRM portal login can only be granted by the Main Administrator.</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-[2] py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 disabled:opacity-50 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <span className="inline-block w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                      <span>Creating Employee...</span>
                    </>
                  ) : (
                    'Register Employee'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Module Assignment & Password Management Modal */}
      {isModuleModalOpen && activeEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full max-h-[92vh] flex flex-col shadow-2xl relative my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Portal Access & Permissions</h3>
                <p className="text-xs text-slate-500 mt-0.5">{activeEmp.name} ({activeEmp.email} • {activeEmp.employee_code})</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModuleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200 cursor-pointer transition"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Modules Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Assigned CRM Modules:</label>
                <div className="space-y-2 mb-3">
                  {moduleOptions.map(({ key, label }) => (
                    <label key={key} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                      <span className="text-xs font-bold text-slate-800">{label}</span>
                      <input
                        type="checkbox"
                        checked={editModules.includes(key)}
                        onChange={() => toggleModuleSelection(key, true)}
                        className="rounded border-slate-300 text-[#856E2E] focus:ring-0"
                      />
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleSaveModules}
                  disabled={isSavingModules}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 disabled:opacity-50 cursor-pointer transition flex items-center justify-center gap-2"
                >
                  {isSavingModules ? 'Saving Modules...' : 'Save Module Permissions'}
                </button>
              </div>

              {/* Set / Reset Password Section */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 mb-0.5">Set / Reset Portal Password</h4>
                <p className="text-[11px] text-slate-500 mb-3">Set new login credentials for this employee to access the CRM portal</p>
                
                {passwordSuccessMessage && (
                  <div className="mb-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
                    <span>✓</span>
                    <span>{passwordSuccessMessage}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newEmployeePassword}
                    onChange={(e) => setNewEmployeePassword(e.target.value)}
                    placeholder="New password (min 6 chars)"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#d6c180]"
                  />
                  <button
                    onClick={handleResetEmployeePassword}
                    disabled={isUpdatingPassword || !newEmployeePassword}
                    className="px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-50 cursor-pointer shrink-0 transition"
                  >
                    {isUpdatingPassword ? 'Saving...' : 'Set Password'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {isEditEmpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl relative my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">Edit Team Member</h3>
                <p className="text-xs text-slate-500 mt-0.5">Update employee details, designation, and compensation</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditEmpModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200 cursor-pointer transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateEmployee} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editEmpName}
                  onChange={(e) => setEditEmpName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Employee Code</label>
                  <input
                    type="text"
                    value={editEmpCode}
                    onChange={(e) => setEditEmpCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editEmpPhone}
                    onChange={(e) => setEditEmpPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={editEmpDesignation}
                    onChange={(e) => setEditEmpDesignation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={editEmpDepartment}
                    onChange={(e) => setEditEmpDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Salary (Annual INR)</label>
                <input
                  type="number"
                  value={editEmpSalary}
                  onChange={(e) => setEditEmpSalary(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditEmpModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingEmp}
                  className="flex-[2] py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 disabled:opacity-50 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {isUpdatingEmp ? (
                    <>
                      <span className="inline-block w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    'Save Employee Details'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
