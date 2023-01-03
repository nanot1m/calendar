import styles from "./index.module.css"

import React, { useMemo } from "react"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import cx from "classnames"
import {
	FirstDayOfTheWeek,
	getDayName,
	getDayOfTheWeek,
	getMonthName,
	getWeekDay,
} from "../src/date"

function Week({
	firstDayOfTheWeek,
	locale,
}: {
	firstDayOfTheWeek: FirstDayOfTheWeek
	locale: string
}) {
	const cells = Array<React.ReactNode>()
	for (let i = 0; i < 7; i++) {
		const weekday = getWeekDay(i, firstDayOfTheWeek)
		cells.push(
			<span
				key={i}
				className={cx(styles.week_day, weekday % 6 === 0 && styles.holiday)}
			>
				{getDayName(weekday, locale)}
			</span>
		)
	}
	return <div className={styles.week}>{cells}</div>
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
					className={cx(styles.month_day, styles.month_day__disabled)}
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
				<span key={"day-" + i} className={styles.month_day}>
					{i}
				</span>
			)
		}

		for (let i = getDayOfTheWeek(lastDayDate, firstDayOfTheWeek); i < 6; i++) {
			result.push(
				<span
					key={"disabled_after-" + i}
					className={cx(styles.month_day, styles.month_day__disabled)}
				>
					{i}
				</span>
			)
		}

		return result
	}, [firstDay, firstDayOfTheWeek])

	return (
		<section className={styles.month}>
			<h2 className={styles.month_title}>{getMonthName(firstDay, locale)}</h2>
			<hr />
			<Week firstDayOfTheWeek={firstDayOfTheWeek} locale={locale} />
			<div className={styles.month_days}>{cells}</div>
		</section>
	)
}

type IndexQuery = {
	locale: string
	year: string
	firstDayOfTheWeek: FirstDayOfTheWeek
}

export const getServerSideProps = async function (context) {
	const query = context.query as IndexQuery
	const year = query.year ? parseInt(query.year) : 2023
	const locale = query.locale ?? "de-DE"
	const firstDayOfTheWeek = query.firstDayOfTheWeek ?? "Monday"
	return { props: { year, locale, firstDayOfTheWeek } }
} satisfies GetServerSideProps

export default function Index({
	firstDayOfTheWeek,
	locale,
	year,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<div className={styles.root}>
			<h1 className={styles.title}>{year}</h1>
			<div className={styles.calendar}>
				{Array.from(Array(12), (_, i) => (
					<Month
						key={i}
						year={year}
						month={i}
						firstDayOfTheWeek={firstDayOfTheWeek}
						locale={locale ?? "de-DE"}
					/>
				))}
			</div>
		</div>
	)
}
