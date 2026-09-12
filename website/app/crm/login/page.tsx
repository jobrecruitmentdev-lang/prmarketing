'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCrmUrl, setAuthSession } from '@/lib/crmApi';

export default function CrmLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenantSlug, setTenantSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(getCrmUrl('/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
          slug: tenantSlug ? tenantSlug.trim() : undefined,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Invalid credentials');
        return;
      }

      setAuthSession(data.token, data.user);

      if (data.user.role === 'master') {
        router.push('/crm/master');
      } else {
        const slug = data.user.tenant_slug || 'abc-technologies';
        router.push(`/crm/${slug}/dashboard`);
      }
    } catch {
      setError('Could not connect to CRM authentication server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0F172A] text-[#d6c180] font-black text-xl shadow-sm mb-4">
          PR
        </div>
        <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
          Enterprise CRM Suite
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Multi-Tenant Recruitment, Attendance & Sales Engine
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E8E2D5] shadow-sm">
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#d6c180]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#d6c180]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Company Slug <span className="text-slate-400 font-normal">(Optional for Master Admin)</span>
              </label>
              <input
                type="text"
                value={tenantSlug}
                onChange={(e) => setTenantSlug(e.target.value)}
                placeholder="e.g. abc-technologies"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#d6c180]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold text-sm text-[#0F172A] bg-[#d6c180] shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Verifying Account...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 underline">
            ← Return to PR Marketing Ventures
          </Link>
        </div>
      </div>
    </div>
  );
}
