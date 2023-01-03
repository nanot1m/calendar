export const FirstDayOfTheWeek = {
  Monday: 6,
  Sunday: 0
};

export type FirstDayOfTheWeek = keyof typeof FirstDayOfTheWeek;

const LOCALE = "de-DE";

export function getDayOfTheWeek(
  date: Date,
  firstDayOfTheWeek: FirstDayOfTheWeek
) {
  return (date.getDay() + FirstDayOfTheWeek[firstDayOfTheWeek]) % 7;
}

const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: "long" }).format;
export function getMonthName(date: Date) {
  return monthFormat(date);
}

const dayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: "short" }).format;
export function getDayName(weekday: number) {
  const sunday = new Date(2023, 0, 1);
  sunday.setDate(sunday.getDate() + weekday);
  return dayFormat(sunday);
}

function mod(num: number, modular: number) {
  return ((num % modular) + modular) % modular;
}

export function getWeekDay(
  dayNumber: number,
  firstDayOfTheWeek: FirstDayOfTheWeek
) {
  return mod(dayNumber - FirstDayOfTheWeek[firstDayOfTheWeek], 7);
}
