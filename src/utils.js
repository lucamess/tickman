import { attdEmojis } from "src/config"
import { months } from "src/config"

export const nullFn = () => null
export const toggle = a => !a
export const filterByClass = (students, grade, section) => {
	return students.filter(student =>
		student.grade == grade && student.section == section)
}
export const generateId = (length = 32) => {
	let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
export const genEntriesFromStudents = students => {
	return students.map(student => ({
		entryId: generateId(),
		studentId: student.studentId,
		name: student.name,
		grade: student.grade,
		section: student.section,
		note: "",
		img: "",
		attd: "A",
		// date & time will be added on submit
	}))
}

export const addTimeToEntries = (entries, time) => {
	if(time == "M" || time == "A")
		return entries.map(entry => ({
			...entry, time
		}))

	return [
		...entries.map(entry => ({
			...entry, time: "M", entryId: generateId(),
		})),
		...entries.map(entry => ({
			...entry, time: "A", entryId: generateId(),
		})),
	]
}
export const addDateToEntries = (entries, date) => {
	return entries.map(entry => ({
		...entry,
		date,
	}))
}
export const getDate = () => {
	const today = new Date();
	return dateToHuman(today)
}
export const dateToHuman = date => {
	const dd = String(date.getDate()).padStart(2, '0');
	const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
	const yyyy = date.getFullYear();

	return yyyy + "-" + mm + "-" + dd;
}

export const findMostCommonDay = (entries) => {
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	const daysCount = [0, 0, 0, 0, 0, 0, 0]

	entries.filter(entry => entry.attd != "T")
		.forEach(entry => {
			const day = (new Date(entry.date)).getDay()
			daysCount[day] += 1
		})

	const mostDayIndex = daysCount.indexOf(Math.max(...daysCount))
	return days[mostDayIndex]
}

export const calculateNOfIssues = (studentId, entries) => {
	return entries.filter(entry => entry.studentId == studentId)
		.filter(entry => entry.attd != "T")
		.length
}

export const sortWithIssues = entries => (student1, student2) => {
	if(calculateNOfIssues(student1.studentId, entries) >
		calculateNOfIssues(student2.studentId, entries))
		return -1
	else
		return 1
}
export const minDate = (dates) => {
	return Math.min(...dates.map(date => Date.parse(date)))
}
export const maxDate = (dates) => {
	return Math.max(...dates.map(date => Date.parse(date)))
}
export const fromToDate = (from, to, fn) => {
	let curDate = from
	let results = []
	do {
		console.log("one etter")
		results.push(fn(dateToHuman(new Date(curDate))))
		curDate += 60 * 60 * 24 * 1000;
	} while(curDate <= to)

	return results
}
export const getAttdFromEntries = (entries, studentId, date) => {
	const attd = {}
	const datedEntries = entries.filter(entry => 
		entry.studentId == studentId &&
		entry.date == date
	)

	datedEntries.forEach(entry => {
		attd[entry.time] = entry.attd
	})

	return [attd.M, attd.A]
}
export const displayAttdFromEntries = (entries, studentId, date) => {
	const [M, A] = getAttdFromEntries(entries, studentId, date)
	return attdEmojis[M] + "" + attdEmojis[A]
}
export const dateToHeader = date => {
	const dateObj = new Date(date)
	return months[dateObj.getMonth()] + " " + dateObj.getDate()
}
export const sleep = (ms) => (value) => {
	return new Promise((res) => {
		setTimeout(() => res(value), ms)
	})
}

