const durationUnits = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'] as const;
type DurationUnit = (typeof durationUnits)[number];
export const durationPattern = new RegExp(`^(\\d+(?:\\.\\d+)?) +(${durationUnits.join('|')})s?$`);

const second = 1;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;
const month = 30 * day;
const year = 365 * day;
const secondsForUnit = { second, minute, hour, day, week, month, year };

export function durationToTimestamp(duration: string): number {
  const match = duration.trim().match(durationPattern);

  if (!match || match.length < 2) {
    throw new Error('Bad duration format');
  }

  const value = parseFloat(match[1]!);
  const unit = match[2]! as DurationUnit;

  const durationSeconds = value * secondsForUnit[unit];
  return Math.round(durationSeconds);
}
