import { Temporal } from "temporal-polyfill";

export function plainDateToDate(plainDate: Temporal.PlainDate): Date {
  return new Date(plainDate.year, plainDate.month - 1, plainDate.day);
}

export function dateToPlainDate(date: Date): Temporal.PlainDate {
  return Temporal.PlainDate.from({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
}

export function instantToDate(instant: Temporal.Instant): Date {
  return new Date(instant.epochMilliseconds);
}

export function dateToInstant(date: Date): Temporal.Instant {
  return Temporal.Instant.fromEpochMilliseconds(date.getTime());
}
