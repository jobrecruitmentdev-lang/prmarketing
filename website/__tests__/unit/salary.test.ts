import { describe, it, expect } from 'vitest';
import { formatSalary } from '../../app/crm/[tenant]/jobs/page';

describe('formatSalary Helper', () => {
  it('formats salary min and max in LPA when >= 1 Lakh', () => {
    expect(formatSalary({
      salary_min: 500000,
      salary_max: 900000,
      is_salary_disclosed: 1,
    })).toBe('₹5 - 9 LPA');

    expect(formatSalary({
      salary_min: 550000,
      salary_max: 920000,
      is_salary_disclosed: 1,
    })).toBe('₹5.5 - 9.2 LPA');
  });

  it('formats salary min and max in INR when < 1 Lakh', () => {
    expect(formatSalary({
      salary_min: 25000,
      salary_max: 40000,
      is_salary_disclosed: 1,
    })).toBe('₹25,000 - ₹40,000');
  });

  it('returns "Not disclosed" when is_salary_disclosed is 0 or false', () => {
    expect(formatSalary({
      salary_min: 500000,
      salary_max: 900000,
      is_salary_disclosed: 0,
    })).toBe('Not disclosed');

    expect(formatSalary({
      salary_min: 500000,
      salary_max: 900000,
      is_salary_disclosed: false,
    })).toBe('Not disclosed');
  });

  it('parses legacy salary_range strings like "500000 - 900000"', () => {
    expect(formatSalary({
      salary_range: '500000 - 900000',
      is_salary_disclosed: 1,
    })).toBe('₹5 - 9 LPA');

    expect(formatSalary({
      salary_range: '80000 - 110000',
      is_salary_disclosed: 1,
    })).toBe('₹0.8 - 1.1 LPA');
  });

  it('preserves pre-formatted strings like "₹8 - ₹14 LPA"', () => {
    expect(formatSalary({
      salary_range: '₹8 - ₹14 LPA',
      is_salary_disclosed: 1,
    })).toBe('₹8 - ₹14 LPA');
  });

  it('handles "Not disclosed" salary_range string correctly', () => {
    expect(formatSalary({
      salary_range: 'Not disclosed',
    })).toBe('Not disclosed');
  });
});
