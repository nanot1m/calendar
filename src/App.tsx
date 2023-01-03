import React, { useMemo } from "react"
import "./styles.css"
import {
	FirstDayOfTheWeek,
	getDayName,
	getDayOfTheWeek,
	getMonthName,
	getWeekDay,
} from "./date"

function Week({
	firstDayOfTheWeek,
	locale,
}: {
	firstDayOfTheWeek: FirstDayOfTheWeek
	locale: string
}): JSX.Element {
	const cells = Array<React.ReactNode>()
	for (let i = 0; i < 7; i++) {
		const weekday = getWeekDay(i, firstDayOfTheWeek)
		cells.push(
			<span
				key={i}
				className={"week-day" + (weekday % 6 === 0 ? " holiday" : "")}
			>
				{getDayName(weekday, locale)}
			</span>
		)
	}
	return <div className="week">{cells}</div>
}

function Month({
	month,
	year,
	locale,
	firstDayOfTheWeek,
}: {
	month: number
	year: number
	locale: string
	firstDayOfTheWeek: FirstDayOfTheWeek
}) {
	const firstDay = useMemo(() => new Date(year, month), [month, year])

	const cells = useMemo(() => {
		const result = Array<React.ReactNode>()
		let dayOfTheWeek = getDayOfTheWeek(firstDay, firstDayOfTheWeek)

		while (dayOfTheWeek > 0) {
			const date = new Date(firstDay)
			date.setDate(date.getDate() - dayOfTheWeek)
			result.push(
				<span
					key={"disabled" + dayOfTheWeek}
					className="month-day month-day__disabled"
				>
					{date.getDate()}
				</span>
			)
			dayOfTheWeek--
		}

		const lastDayDate = new Date(firstDay)
		lastDayDate.setMonth(lastDayDate.getMonth() + 1)
		lastDayDate.setDate(lastDayDate.getDate() - 1)
		const lastDate = lastDayDate.getDate()
		for (let i = 1; i <= lastDate; i++) {
			result.push(
				<span key={"day-" + i} className="month-day">
					{i}
				</span>
			)
		}

		for (let i = getDayOfTheWeek(lastDayDate, firstDayOfTheWeek); i < 6; i++) {
			result.push(
				<span
					key={"disabled_after-" + i}
					className="month-day month-day__disabled"
				>
					{i}
				</span>
			)
		}

		return result
	}, [firstDay, firstDayOfTheWeek])

	return (
		<section className="month">
			<h2 className="month-title">{getMonthName(firstDay, locale)}</h2>
			<hr />
			<Week firstDayOfTheWeek={firstDayOfTheWeek} locale={locale} />
			<div className="month-days">{cells}</div>
		</section>
	)
}

export default function App() {
	return (
		<div className="App">
			<h1 className="title">2023</h1>
			<div className="calendar">
				{Array.from(Array(12), (_, i) => (
					<Month
						key={i}
						year={2023}
						month={i}
						firstDayOfTheWeek="Monday"
						locale="de-DE"
					/>
				))}
			</div>
		</div>
	)
}
