export const FOUNDED_YEAR = 1992;

export function yearsSince(year: number = FOUNDED_YEAR): number {
  return new Date().getFullYear() - year;
}

export const thisYear = new Date().getFullYear();
