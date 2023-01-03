export const FirstDayOfTheWeek = {
	Monday: 6,
	Sunday: 0,
}

export type FirstDayOfTheWeek = keyof typeof FirstDayOfTheWeek

export function getDayOfTheWeek(
	date: Date,
	firstDayOfTheWeek: FirstDayOfTheWeek
) {
	return (date.getDay() + FirstDayOfTheWeek[firstDayOfTheWeek]) % 7
}

export function getMonthName(date: Date, locale: string) {
	const monthFormat = new Intl.DateTimeFormat(locale, { month: "long" }).format
	return monthFormat(date)
}

export function getDayName(weekday: number, locale: string) {
	const sunday = new Date(2023, 0, 1)
	sunday.setDate(sunday.getDate() + weekday)
	const dayFormat = new Intl.DateTimeFormat(locale, {
		weekday: "short",
	}).format
	return dayFormat(sunday)
}

function mod(num: number, modular: number) {
	return ((num % modular) + modular) % modular
}

export function getWeekDay(
	dayNumber: number,
	firstDayOfTheWeek: FirstDayOfTheWeek
) {
	return mod(dayNumber - FirstDayOfTheWeek[firstDayOfTheWeek], 7)
}
