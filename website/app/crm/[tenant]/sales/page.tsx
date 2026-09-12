'use client';

import React, { useState, useEffect, use } from 'react';
import { crmFetch, getAuthToken } from '@/lib/crmApi';
import {
  TrendingUpIcon,
  PlusIcon,
  SearchIcon,
} from '@/components/crm/CrmIcons';

export default function SalesManagementPage({ params }: { params: Promise<{ tenant: string }> }) {
  const resolvedParams = use(params);
  const tenantSlug = resolvedParams.tenant;

  const [activeTab, setActiveTab] = useState<'sales' | 'leads'>('sales');
  const [salesList, setSalesList] = useState<any[]>([]);
  const [leadsList, setLeadsList] = useState<any[]>([]);
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [employees, setEmployees] = useState<any[]>([]);

  // New Sale Modal state
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [serviceName, setServiceName] = useState('Enterprise SEO & Automation');
  const [amount, setAmount] = useState('150000');
  const [paymentMode, setPaymentMode] = useState('bank_transfer');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [saleEmployeeId, setSaleEmployeeId] = useState('');
  const [isSavingSale, setIsSavingSale] = useState(false);

  // New Lead Modal state
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadValue, setLeadValue] = useState('250000');
  const [leadEmployeeId, setLeadEmployeeId] = useState('');
  const [isSavingLead, setIsSavingLead] = useState(false);

  // Edit Sale Modal state
  const [isEditSaleModalOpen, setIsEditSaleModalOpen] = useState(false);
  const [editSaleId, setEditSaleId] = useState<number | null>(null);
  const [editClientName, setEditClientName] = useState('');
  const [editServiceName, setEditServiceName] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editPaymentMode, setEditPaymentMode] = useState('bank_transfer');
  const [editPaymentStatus, setEditPaymentStatus] = useState('completed');
  const [editInvoiceNumber, setEditInvoiceNumber] = useState('');
  const [editSaleEmployeeId, setEditSaleEmployeeId] = useState('');
  const [isUpdatingSale, setIsUpdatingSale] = useState(false);

  // Edit Lead Modal state
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);
  const [editLeadId, setEditLeadId] = useState<number | null>(null);
  const [editLeadName, setEditLeadName] = useState('');
  const [editLeadContact, setEditLeadContact] = useState('');
  const [editLeadEmail, setEditLeadEmail] = useState('');
  const [editLeadCompany, setEditLeadCompany] = useState('');
  const [editLeadValue, setEditLeadValue] = useState('');
  const [editLeadStage, setEditLeadStage] = useState('new');
  const [editLeadEmployeeId, setEditLeadEmployeeId] = useState('');
  const [isUpdatingLead, setIsUpdatingLead] = useState(false);

  const loadData = async () => {
    try {
      if (!getAuthToken()) return;
      setLoading(true);
      const [salesRes, leadsRes, dashRes, empRes] = await Promise.all([
        crmFetch('/api/sales/daily'),
        crmFetch('/api/sales/leads'),
        crmFetch('/api/sales/dashboard'),
        crmFetch('/api/admin/employees').catch(() => ({ data: [] })),
      ]);
      setSalesList(salesRes.data || []);
      setLeadsList(leadsRes.data || []);
      setDashboard(dashRes.data || {});
      setEmployees(empRes.data || []);
    } catch (err: any) {
      console.warn('Failed to load sales data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [tenantSlug]);

  const handleAddSale = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSavingSale(true);
      await crmFetch('/api/sales/daily', {
        method: 'POST',
        body: JSON.stringify({
          client_name: clientName,
          client_contact: clientContact,
          client_email: clientEmail,
          service_or_product: serviceName,
          amount,
          payment_mode: paymentMode,
          invoice_number: invoiceNumber,
          employee_id: saleEmployeeId ? parseInt(saleEmployeeId) : null,
        }),
      });
      await loadData();
      setIsSaleModalOpen(false);
      setClientName('');
      setClientContact('');
      setClientEmail('');
      setAmount('150000');
      setSaleEmployeeId('');
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsSavingSale(false);
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSavingLead(true);
      await crmFetch('/api/sales/leads', {
        method: 'POST',
        body: JSON.stringify({
          lead_name: leadName,
          contact: leadContact,
          email: leadEmail,
          company: leadCompany,
          value: leadValue,
          stage: 'new',
          employee_id: leadEmployeeId ? parseInt(leadEmployeeId) : null,
        }),
      });
      await loadData();
      setIsLeadModalOpen(false);
      setLeadName('');
      setLeadContact('');
      setLeadEmail('');
      setLeadCompany('');
      setLeadEmployeeId('');
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsSavingLead(false);
    }
  };

  const handleLeadStage = async (leadId: number, nextStage: string) => {
    try {
      await crmFetch(`/api/sales/leads/${leadId}/stage`, {
        method: 'PATCH',
        body: JSON.stringify({ stage: nextStage }),
      });
      setLeadsList(prev => prev.map(l => l.id === leadId ? { ...l, stage: nextStage } : l));
    } catch (err: any) {
      alert('Failed to update stage: ' + err.message);
    }
  };

  const handleOpenEditSaleModal = (s: any) => {
    setEditSaleId(s.id);
    setEditClientName(s.client_name || '');
    setEditServiceName(s.service_or_product || '');
    setEditAmount(s.amount ? String(s.amount) : '');
    setEditPaymentMode(s.payment_mode || 'upi');
    setEditPaymentStatus(s.payment_status || 'completed');
    setEditInvoiceNumber(s.invoice_number || '');
    setEditSaleEmployeeId(s.employee_id ? String(s.employee_id) : '');
    setIsEditSaleModalOpen(true);
  };

  const handleUpdateSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editSaleId) return;
    try {
      setIsUpdatingSale(true);
      await crmFetch(`/api/sales/daily/${editSaleId}`, {
        method: 'PUT',
        body: JSON.stringify({
          client_name: editClientName,
          service_or_product: editServiceName,
          amount: editAmount,
          payment_mode: editPaymentMode,
          payment_status: editPaymentStatus,
          invoice_number: editInvoiceNumber,
          employee_id: editSaleEmployeeId ? parseInt(editSaleEmployeeId) : null,
        }),
      });
      setIsEditSaleModalOpen(false);
      await loadData();
    } catch (err: any) {
      alert('Error updating sale: ' + err.message);
    } finally {
      setIsUpdatingSale(false);
    }
  };

  const handleDeleteSale = async (id: number, client: string) => {
    if (!confirm(`Are you sure you want to delete transaction for '${client}'?`)) {
      return;
    }
    try {
      await crmFetch(`/api/sales/daily/${id}`, { method: 'DELETE' });
      await loadData();
    } catch (err: any) {
      alert('Error deleting sale: ' + err.message);
    }
  };

  const handleOpenEditLeadModal = (l: any) => {
    setEditLeadId(l.id);
    setEditLeadName(l.lead_name || '');
    setEditLeadContact(l.contact || '');
    setEditLeadEmail(l.email || '');
    setEditLeadCompany(l.company || '');
    setEditLeadValue(l.value ? String(l.value) : '0');
    setEditLeadStage(l.stage || 'new');
    setEditLeadEmployeeId(l.employee_id ? String(l.employee_id) : '');
    setIsEditLeadModalOpen(true);
  };

  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editLeadId) return;
    try {
      setIsUpdatingLead(true);
      await crmFetch(`/api/sales/leads/${editLeadId}`, {
        method: 'PUT',
        body: JSON.stringify({
          lead_name: editLeadName,
          contact: editLeadContact,
          email: editLeadEmail,
          company: editLeadCompany,
          value: editLeadValue,
          stage: editLeadStage,
          employee_id: editLeadEmployeeId ? parseInt(editLeadEmployeeId) : null,
        }),
      });
      setIsEditLeadModalOpen(false);
      await loadData();
    } catch (err: any) {
      alert('Error updating lead: ' + err.message);
    } finally {
      setIsUpdatingLead(false);
    }
  };

  const handleDeleteLead = async (id: number, leadName: string) => {
    if (!confirm(`Are you sure you want to delete lead '${leadName}'?`)) {
      return;
    }
    try {
      await crmFetch(`/api/sales/leads/${id}`, { method: 'DELETE' });
      await loadData();
    } catch (err: any) {
      alert('Error deleting lead: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#d6c180] rounded-full animate-spin"></div>
      </div>
    );
  }

  const leadStages = ['new', 'contacted', 'qualified', 'converted', 'lost'];

  return (
    <div className="space-y-6">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Sales & Revenue Pipeline</h1>
          <p className="text-xs text-slate-500 mt-1">Daily client invoices, payment collections, and prospective deals</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLeadModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
          >
            <PlusIcon size={14} />
            <span>New Lead</span>
          </button>
          <button
            onClick={() => setIsSaleModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d6c180] text-[#0F172A] text-xs font-bold shadow-sm hover:opacity-90"
          >
            <PlusIcon size={16} />
            <span>Record Sale</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Recognized Revenue
          </span>
          <p className="text-2xl font-black text-slate-900">
            ₹{((dashboard?.total_revenue || 0) / 100000).toFixed(2)} L
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">Completed collections</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            This Month Revenue
          </span>
          <p className="text-2xl font-black text-slate-900">
            ₹{((dashboard?.month_revenue || 0) / 100000).toFixed(2)} L
          </p>
          <span className="text-[11px] text-slate-500 font-medium">Recorded this calendar month</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Active Leads in Pipeline
          </span>
          <p className="text-2xl font-black text-slate-900">{leadsList.length}</p>
          <span className="text-[11px] text-[#856E2E] font-semibold">Prospects being nurtured</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E2E8F0] flex gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('sales')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'sales' ? 'border-[#856E2E] text-[#856E2E]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Daily Sales Logs ({salesList.length})
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'leads' ? 'border-[#856E2E] text-[#856E2E]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Leads Pipeline ({leadsList.length})
        </button>
      </div>

      {/* TAB 1: Sales Transactions Table */}
      {activeTab === 'sales' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#FAF9F5] border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Client & Service</th>
                  <th className="px-5 py-3.5">Sales Rep / Logged By</th>
                  <th className="px-5 py-3.5">Invoice #</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Amount</th>
                  <th className="px-5 py-3.5">Payment Mode</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {salesList.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900">{s.client_name}</div>
                      <span className="text-[11px] text-slate-500">{s.service_or_product}</span>
                    </td>
                    <td className="px-5 py-4">
                      {s.logged_by_name ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-[#FAF9F5] border border-[#d6c180]/40 flex items-center justify-center text-[10px] font-bold text-slate-800">
                            {s.logged_by_name[0]?.toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 leading-tight">{s.logged_by_name}</div>
                            {s.employee_code && <div className="text-[10px] text-slate-400 font-mono">{s.employee_code}</div>}
                          </div>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Company Admin</span>
                      )}
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-slate-500">{s.invoice_number || 'N/A'}</td>
                    <td className="px-5 py-4 text-slate-600">{s.sale_date}</td>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      ₹{parseFloat(s.amount).toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-4 uppercase font-bold text-[10px] text-slate-500">{s.payment_mode}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                        {s.payment_status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEditSaleModal(s)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-[11px] font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSale(s.id, s.client_name)}
                        className="px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-[11px] font-bold"
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
      )}

      {/* TAB 2: Leads Pipeline Table */}
      {activeTab === 'leads' && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#FAF9F5] border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Lead Contact</th>
                  <th className="px-5 py-3.5">Assigned Rep</th>
                  <th className="px-5 py-3.5">Company</th>
                  <th className="px-5 py-3.5">Estimated Value</th>
                  <th className="px-5 py-3.5">Stage</th>
                  <th className="px-5 py-3.5 text-right">Update Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leadsList.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900">{l.lead_name}</div>
                      <span className="text-[11px] text-slate-500">{l.email || l.contact || 'No contact'}</span>
                    </td>
                    <td className="px-5 py-4">
                      {l.assignee_name ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-[#FAF9F5] border border-[#d6c180]/40 flex items-center justify-center text-[10px] font-bold text-slate-800">
                            {l.assignee_name[0]?.toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 leading-tight">{l.assignee_name}</div>
                            {l.employee_code && <div className="text-[10px] text-slate-400 font-mono">{l.employee_code}</div>}
                          </div>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-700">{l.company || 'Direct'}</td>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      ₹{parseFloat(l.value || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F5EFE0] text-[#856E2E]">
                        {l.stage}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <select
                        value={l.stage}
                        onChange={(e) => handleLeadStage(l.id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:border-[#d6c180]"
                      >
                        {leadStages.map(st => (
                          <option key={st} value={st}>{st.toUpperCase()}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleOpenEditLeadModal(l)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-[11px] font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLead(l.id, l.lead_name)}
                        className="px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-[11px] font-bold"
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
      )}

      {/* Record Sale Modal */}
      {isSaleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative my-auto">
            <button
              onClick={() => setIsSaleModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200"
            >
              ✕
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Record Sale Transaction</h3>
            <p className="text-xs text-slate-500 mb-6">Logs transaction directly to company ledger</p>

            <form onSubmit={handleAddSale} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Client / Business Name *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Apex Corp"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service / Package *</label>
                <input
                  type="text"
                  required
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="e.g. Enterprise SEO & Automation"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Amount (INR) *</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="150000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Mode</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="upi">UPI</option>
                    <option value="bank_transfer">Bank Transfer (NEFT/RTGS)</option>
                    <option value="cash">Cash</option>
                    <option value="cheque">Cheque</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sales Representative / Logged By</label>
                <select
                  value={saleEmployeeId}
                  onChange={(e) => setSaleEmployeeId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-semibold text-slate-800 focus:outline-none focus:border-[#d6c180]"
                >
                  <option value="">Company Admin / Direct Sale</option>
                  {employees.filter(emp => emp.status === 'active').map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.employee_code || emp.department})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSavingSale}
                className="w-full py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 disabled:opacity-50 mt-4"
              >
                {isSavingSale ? 'Recording Sale...' : 'Save Transaction'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* New Lead Modal */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative my-auto">
            <button
              onClick={() => setIsLeadModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200"
            >
              ✕
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Create Sales Lead</h3>
            <p className="text-xs text-slate-500 mb-6">Add prospective deal to the conversion funnel</p>

            <form onSubmit={handleAddLead} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact / Person Name *</label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={leadCompany}
                  onChange={(e) => setLeadCompany(e.target.value)}
                  placeholder="e.g. NextGen Retail"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assign Sales Representative</label>
                <select
                  value={leadEmployeeId}
                  onChange={(e) => setLeadEmployeeId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-semibold text-slate-800 focus:outline-none focus:border-[#d6c180]"
                >
                  <option value="">Unassigned (Open Lead Pool)</option>
                  {employees.filter(emp => emp.status === 'active').map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.employee_code || emp.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="priya@nextgen.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deal Value (INR)</label>
                  <input
                    type="number"
                    value={leadValue}
                    onChange={(e) => setLeadValue(e.target.value)}
                    placeholder="250000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSavingLead}
                className="w-full py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 disabled:opacity-50 mt-4"
              >
                {isSavingLead ? 'Adding Lead...' : 'Add to Pipeline'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Sale Modal */}
      {isEditSaleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative my-auto">
            <button
              onClick={() => setIsEditSaleModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200"
            >
              ✕
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Edit Sale Record</h3>
            <p className="text-xs text-slate-500 mb-6">Modify transaction invoice details and payment state</p>

            <form onSubmit={handleUpdateSale} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={editClientName}
                  onChange={(e) => setEditClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service / Product</label>
                <input
                  type="text"
                  required
                  value={editServiceName}
                  onChange={(e) => setEditServiceName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Amount (INR)</label>
                  <input
                    type="number"
                    required
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Mode</label>
                  <select
                    value={editPaymentMode}
                    onChange={(e) => setEditPaymentMode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="upi">UPI</option>
                    <option value="bank_transfer">Bank Transfer (NEFT/RTGS)</option>
                    <option value="cash">Cash</option>
                    <option value="cheque">Cheque</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Status</label>
                  <select
                    value={editPaymentStatus}
                    onChange={(e) => setEditPaymentStatus(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Invoice #</label>
                  <input
                    type="text"
                    value={editInvoiceNumber}
                    onChange={(e) => setEditInvoiceNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sales Representative / Logged By</label>
                <select
                  value={editSaleEmployeeId}
                  onChange={(e) => setEditSaleEmployeeId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-semibold text-slate-800 focus:outline-none focus:border-[#d6c180]"
                >
                  <option value="">Company Admin / Direct Sale</option>
                  {employees.filter(emp => emp.status === 'active').map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.employee_code || emp.department})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isUpdatingSale}
                className="w-full py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 disabled:opacity-50 mt-4"
              >
                {isUpdatingSale ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Lead Modal */}
      {isEditLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative my-auto">
            <button
              onClick={() => setIsEditLeadModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200"
            >
              ✕
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Edit Sales Lead</h3>
            <p className="text-xs text-slate-500 mb-6">Update contact info, estimated value, or stage</p>

            <form onSubmit={handleUpdateLead} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={editLeadName}
                  onChange={(e) => setEditLeadName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company</label>
                <input
                  type="text"
                  value={editLeadCompany}
                  onChange={(e) => setEditLeadCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Sales Representative</label>
                <select
                  value={editLeadEmployeeId}
                  onChange={(e) => setEditLeadEmployeeId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-semibold text-slate-800 focus:outline-none focus:border-[#d6c180]"
                >
                  <option value="">Unassigned (Open Lead Pool)</option>
                  {employees.filter(emp => emp.status === 'active').map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.employee_code || emp.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editLeadEmail}
                    onChange={(e) => setEditLeadEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact / Phone</label>
                  <input
                    type="text"
                    value={editLeadContact}
                    onChange={(e) => setEditLeadContact(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Value (INR)</label>
                  <input
                    type="number"
                    value={editLeadValue}
                    onChange={(e) => setEditLeadValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#d6c180]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stage</label>
                  <select
                    value={editLeadStage}
                    onChange={(e) => setEditLeadStage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    {leadStages.map(st => (
                      <option key={st} value={st}>{st.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdatingLead}
                className="w-full py-3 rounded-xl font-bold text-xs text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 disabled:opacity-50 mt-4"
              >
                {isUpdatingLead ? 'Saving Changes...' : 'Save Lead Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
