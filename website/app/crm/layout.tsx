'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser, getAuthToken, clearAuthSession, crmFetch } from '@/lib/crmApi';
import {
  BriefcaseIcon,
  UsersIcon,
  CalendarCheckIcon,
  TrendingUpIcon,
  BuildingIcon,
  LogOutIcon,
  ExternalLinkIcon,
} from '@/components/crm/CrmIcons';

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Shift Checkout Confirmation Modal State for Employees
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isShiftOverChecked, setIsShiftOverChecked] = useState(false);
  const [isSubmittingCheckout, setIsSubmittingCheckout] = useState(false);
  const [checkoutStatusData, setCheckoutStatusData] = useState<{
    checkInTime?: string;
    checkOutTime?: string;
    currentTime?: string;
    duration?: string;
    isCheckedOut?: boolean;
  } | null>(null);

  const formatTimeAMPM = (timeStr?: string) => {
    if (!timeStr) return '-';
    const parts = timeStr.split(':');
    if (parts.length < 2) return timeStr;
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const handleLogout = async () => {
    if (user?.role !== 'employee') {
      clearAuthSession();
      router.push('/crm/login');
      return;
    }

    try {
      const res = await crmFetch('/api/attendance/my-status').catch(() => null);
      if (res?.attendance) {
        if (res.attendance.is_checked_out) {
          clearAuthSession();
          router.push('/crm/login');
          return;
        }
        setCheckoutStatusData({
          checkInTime: res.attendance.check_in_time,
          checkOutTime: res.attendance.check_out_time,
          currentTime: res.current_server_time,
          duration: res.attendance.working_duration,
          isCheckedOut: res.attendance.is_checked_out,
        });
      }
    } catch {
      // Fallback: still show modal
    } finally {
      setIsShiftOverChecked(false);
      setIsCheckoutModalOpen(true);
    }
  };

  const handleConfirmCheckout = async () => {
    try {
      setIsSubmittingCheckout(true);
      await crmFetch('/api/attendance/checkout', {
        method: 'POST',
        body: JSON.stringify({ confirmed: true }),
      }).catch((err) => console.warn('Checkout note:', err));
    } finally {
      setIsSubmittingCheckout(false);
      setIsCheckoutModalOpen(false);
      clearAuthSession();
      router.push('/crm/login');
    }
  };

  const handleDirectLogout = () => {
    setIsCheckoutModalOpen(false);
    clearAuthSession();
    router.push('/crm/login');
  };

  useEffect(() => {
    setMounted(true);
    const currentUser = getCurrentUser();
    const token = getAuthToken();
    if ((!currentUser || !token) && !pathname.includes('/crm/login')) {
      router.push('/crm/login');
      return;
    }
    setUser(currentUser);

    // Multi-tab session synchronization: update active session if changed in another tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'crm_token' || e.key === 'crm_user') {
        const updatedUser = getCurrentUser();
        const updatedToken = getAuthToken();
        if ((!updatedUser || !updatedToken) && !pathname.includes('/crm/login')) {
          router.push('/crm/login');
        } else {
          setUser(updatedUser);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [pathname, router]);

  if (!mounted) return null;

  // Don't render sidebar on login page
  if (pathname === '/crm/login' || pathname === '/crm/login/') {
    return <>{children}</>;
  }

  // Guard: If not authenticated, show spinner while redirecting to login
  if (!user && !pathname.includes('/crm/login')) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#d6c180] rounded-full animate-spin"></div>
      </div>
    );
  }

  const isMaster = user?.role === 'master';
  const isTenantAdmin = user?.role === 'admin';
  const userModules: string[] = user?.modules || [];
  const tenantSlug = user?.tenant_slug || 'abc-technologies';

  // Navigation Items with RBAC Module Filter
  let navItems: { label: string; href: string; icon: any; module?: string }[] = [];

  if (isMaster) {
    navItems = [
      { label: 'Master Control', href: '/crm/master', icon: BuildingIcon },
    ];
  } else if (isTenantAdmin) {
    navItems = [
      { label: 'Dashboard', href: `/crm/${tenantSlug}/dashboard`, icon: BuildingIcon },
      { label: 'Jobs & Careers', href: `/crm/${tenantSlug}/jobs`, icon: BriefcaseIcon, module: 'recruitment' },
      { label: 'Candidates', href: `/crm/${tenantSlug}/candidates`, icon: UsersIcon, module: 'recruitment' },
      { label: 'Attendance', href: `/crm/${tenantSlug}/attendance`, icon: CalendarCheckIcon, module: 'attendance' },
      { label: 'Sales & Revenue', href: `/crm/${tenantSlug}/sales`, icon: TrendingUpIcon, module: 'sales' },
      { label: 'Employees HR', href: `/crm/${tenantSlug}/employees`, icon: UsersIcon },
    ];
  } else {
    // Employee Role: ONLY show assigned modules (Recruitment & Sales)
    navItems = [
      { label: 'Dashboard', href: `/crm/${tenantSlug}/dashboard`, icon: BuildingIcon },
    ];

    if (userModules.includes('recruitment')) {
      navItems.push(
        { label: 'Jobs & Careers', href: `/crm/${tenantSlug}/jobs`, icon: BriefcaseIcon, module: 'recruitment' },
        { label: 'Candidates', href: `/crm/${tenantSlug}/candidates`, icon: UsersIcon, module: 'recruitment' }
      );
    }
    if (userModules.includes('sales')) {
      navItems.push(
        { label: 'Sales & Revenue', href: `/crm/${tenantSlug}/sales`, icon: TrendingUpIcon, module: 'sales' }
      );
    }
  }

  // Route-level permission check for employees
  let isAccessDenied = false;
  let deniedModule = '';

  if (pathname.startsWith('/crm/master') && !isMaster) {
    isAccessDenied = true;
    deniedModule = 'Master Super Admin Control (Restricted to Master User)';
  } else if (!isMaster && !isTenantAdmin) {
    if (pathname.includes('/attendance')) {
      isAccessDenied = true;
      deniedModule = 'Staff Attendance (Admin Only)';
    } else if (pathname.includes('/employees')) {
      isAccessDenied = true;
      deniedModule = 'Staff & HR Directory (Admin Only)';
    } else if (pathname.includes('/jobs') && !userModules.includes('recruitment')) {
      isAccessDenied = true;
      deniedModule = 'Jobs & Recruitment';
    } else if (pathname.includes('/candidates') && !userModules.includes('recruitment')) {
      isAccessDenied = true;
      deniedModule = 'Candidates Pipeline';
    } else if (pathname.includes('/sales') && !userModules.includes('sales')) {
      isAccessDenied = true;
      deniedModule = 'Sales & Revenue';
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-[#0F172A]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E2E8F0] sticky top-0 h-screen z-30">
        {/* Company Name at Sidebar Top */}
        <div className="h-16 px-5 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-[#0F172A] text-[#d6c180] font-black flex items-center justify-center text-xs shadow-sm flex-shrink-0">
              {isMaster ? 'PR' : (user?.company_name ? user.company_name.slice(0, 2).toUpperCase() : 'CO')}
            </div>
            <div className="overflow-hidden">
              <span className="font-extrabold text-sm text-slate-900 block tracking-tight truncate" title={isMaster ? 'PR Marketing Ventures' : (user?.company_name || 'Organization')}>
                {isMaster ? 'PR Marketing Ventures' : (user?.company_name || 'Organization')}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">
                {isMaster ? 'Master Control' : (isTenantAdmin ? 'Company Admin' : 'Employee Portal')}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-[#F5EFE0] text-[#856E2E] border border-[#E5DECB]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={17} className={isActive ? 'text-[#856E2E]' : 'text-slate-400'} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {!isMaster && (
            <div className="pt-4 mt-4 border-t border-slate-100">
              <a
                href={`/c/${tenantSlug}/careers`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <BriefcaseIcon size={16} className="text-[#856E2E]" />
                  <span>Live Career Page</span>
                </span>
                <ExternalLinkIcon size={14} className="text-slate-400" />
              </a>
            </div>
          )}
        </nav>

        {/* User Profile Footer in Sidebar */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#FAF9F5]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 flex-shrink-0">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'User'}</p>
                <p className="text-[10px] text-slate-500 capitalize truncate">
                  {user?.role === 'employee' ? `${user?.modules?.join(', ') || 'Staff'}` : user?.role}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
            >
              <LogOutIcon size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area with Dedicated Top Navbar */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar: Role Greeting & Logout */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          {/* Left Side: Role Title / Welcome Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
            >
              ☰
            </button>

            {isMaster ? (
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Master Admin
                </span>
                <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#0F172A] text-[#d6c180]">
                  Super Portal
                </span>
              </div>
            ) : isTenantAdmin ? (
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Welcome, <span className="text-[#856E2E]">{user?.name || 'Admin'}</span>
                </span>
                <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                  Admin
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Welcome, <span className="text-[#856E2E]">{user?.name || 'Employee'}</span>
                </span>
                <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F5EFE0] text-[#856E2E]">
                  {user?.modules?.join(', ') || 'Staff'}
                </span>
              </div>
            )}
          </div>

          {/* Right Side: Logout Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <LogOutIcon size={14} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-1">
            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isMaster ? 'PR Marketing Ventures' : (user?.company_name || 'Organization')}
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-6 max-w-7xl w-full mx-auto">
          {isAccessDenied ? (
            <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-red-200 p-8 text-center shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                🔒
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-2">Module Locked</h2>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                You do not have active permission to access the <strong>{deniedModule}</strong> module. Please contact your company administrator to assign this module to your account.
              </p>
              <Link
                href={`/crm/${tenantSlug}/dashboard`}
                prefetch={false}
                className="inline-block px-5 py-2.5 rounded-xl bg-[#d6c180] text-[#0F172A] text-xs font-bold hover:opacity-90"
              >
                Back to Allowed Dashboard
              </Link>
            </div>
          ) : (
            children
          )}
        </main>
      </div>

      {/* Shift Checkout & Sign Out Modal for Employees */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#FAF9F5] border-b border-[#E8E2D5] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0F172A] text-[#d6c180] flex items-center justify-center font-black text-base shadow-sm">
                  🕒
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight text-slate-900">Sign Out Options</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Shift Attendance & Workday Wrap-Up</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer text-sm font-bold"
                title="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* Compact Real-time Shift Summary Bar */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  <span className="text-slate-500 font-medium text-[11px]">In:</span>
                  <span className="font-extrabold text-slate-900 font-mono text-[11px]">
                    {checkoutStatusData?.checkInTime ? formatTimeAMPM(checkoutStatusData.checkInTime) : '09:30 AM'}
                  </span>
                </div>
                <div className="h-4 w-px bg-slate-200"></div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                  <span className="text-slate-500 font-medium text-[11px]">Now:</span>
                  <span className="font-extrabold text-slate-900 font-mono text-[11px]">
                    {checkoutStatusData?.currentTime ? formatTimeAMPM(checkoutStatusData.currentTime) : new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {checkoutStatusData?.duration && (
                  <>
                    <div className="h-4 w-px bg-slate-200"></div>
                    <div className="text-[11px] text-slate-700 font-bold">
                      {checkoutStatusData.duration}
                    </div>
                  </>
                )}
              </div>

              {/* Path 1: Shift Over (Record checkout timestamp & Sign Out) */}
              <div className="bg-[#FAF9F5] border border-[#E8E2D5] rounded-2xl p-4 space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isShiftOverChecked}
                    onChange={(e) => setIsShiftOverChecked(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-[#856E2E] border-slate-300 rounded focus:ring-[#d6c180] cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-800 leading-snug">
                    <strong>Shift Over</strong> — I confirm my work for today is complete and I am checking out.
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleConfirmCheckout}
                  disabled={!isShiftOverChecked || isSubmittingCheckout}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#d6c180] text-[#0F172A] text-xs font-extrabold shadow-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmittingCheckout ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Recording Checkout...</span>
                    </>
                  ) : (
                    <span>🏁 Confirm Shift Over & Checkout</span>
                  )}
                </button>
              </div>

              {/* Path 2: Or Just Normal Sign Out (Keep shift active) */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDirectLogout}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
                  title="Signs out immediately without closing your daily attendance"
                >
                  <LogOutIcon size={14} className="text-slate-400" />
                  <span>Just Sign Out (Keep Shift Active)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="py-2.5 px-3 rounded-xl text-slate-400 hover:text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
