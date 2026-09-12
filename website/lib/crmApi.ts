/**
 * Multi-User CRM & Career Engine API Client
 * Seamlessly connects to PHP REST backend under /api/crm/
 */

export const CRM_API_BASE = process.env.NEXT_PUBLIC_CRM_API_URL || '';

export function getCrmUrl(endpoint: string): string {
  let clean = endpoint;
  if (clean.startsWith('/api/crm')) {
    // already starts with /api/crm
  } else if (clean.startsWith('/api/')) {
    clean = clean.replace(/^\/api\//, '/api/crm/');
  } else if (clean === '/api') {
    clean = '/api/crm';
  } else {
    clean = '/api/crm' + (clean.startsWith('/') ? clean : '/' + clean);
  }
  return `${CRM_API_BASE}${clean}`;
}

export function getCrmResumeUrl(filename: string, token?: string): string {
  const base = getCrmUrl('/recruitment/resumes');
  const tokenParam = token ? `&token=${encodeURIComponent(token)}` : '';
  return `${base}?file=${encodeURIComponent(filename)}${tokenParam}`;
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('crm_token');
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('crm_user');
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAuthSession(token: string, user: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('crm_token', token);
  localStorage.setItem('crm_user', JSON.stringify(user));
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('crm_token');
  localStorage.removeItem('crm_user');
}

export async function crmFetch(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();

  if (!token && typeof window !== 'undefined') {
    if (!window.location.pathname.includes('/crm/login')) {
      window.location.href = '/crm/login';
    }
    throw new Error('Authentication required. Redirecting to login...');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = getCrmUrl(endpoint);
  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && typeof window !== 'undefined') {
      clearAuthSession();
      if (!window.location.pathname.includes('/crm/login')) {
        window.location.href = '/crm/login';
      }
    }
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }
  return data;
}

// Public Career Portal API Helpers
export async function getPublicCompany(slug: string) {
  const url = getCrmUrl(`/public/v1/companies/${encodeURIComponent(slug)}`);
  const res = await fetch(url, { cache: 'no-store' });
  return res.json();
}

export async function getPublicJobs(slug: string, queryParams: Record<string, string> = {}) {
  const query = new URLSearchParams(queryParams).toString();
  const base = getCrmUrl(`/public/v1/companies/${encodeURIComponent(slug)}/jobs`);
  const url = `${base}${query ? '?' + query : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  return res.json();
}

export async function getPublicJobDetail(slug: string, jobSlug: string) {
  const url = getCrmUrl(`/public/v1/companies/${encodeURIComponent(slug)}/jobs/${encodeURIComponent(jobSlug)}`);
  const res = await fetch(url, { cache: 'no-store' });
  return res.json();
}

export async function submitPublicApplication(jobId: number | string, formData: FormData) {
  const url = getCrmUrl(`/public/v1/jobs/${jobId}/applications`);
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  return res.json();
}
