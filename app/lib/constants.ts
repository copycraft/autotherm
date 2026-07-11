export const FOUNDED_YEAR = 1992;

export function yearsSince(year: number = FOUNDED_YEAR): number {
  return new Date().getFullYear() - year;
}

export const thisYear = new Date().getFullYear();

export const STATS = {
  customers: 2800,
  annualConversions: 265,
  employees: 32,
} as const;
