import React, { useState, useEffect } from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import { useLocation } from "react-router-dom"
import { useRecoilState } from "recoil"
import { DayTable, Row, FaceButton, FlexGrow, Button, TimeButton, Space, Block } from "comp"
import { studentsState, entriesState } from "src/states"
import { addTimeToEntries, addDateToEntries, getDate, filterByClass, genEntriesFromStudents } from "src/utils"
import { saveEntries, } from "src/api"


const editEntry = (entryId, edEntry) => entries => {
	return entries.map(entry => {
		if(entry.entryId == entryId) {
			return ({
				...entry,
				...edEntry,
			})
		}
		return entry
	})
}

const fetchToastOptions = {
	loading: "Uploading...",
	success: <strong>Uploaded successfully</strong>,
	error: <strong>Connection problem</strong>
}

const EditDay = () => {
	const location = useLocation()
	const [ grade, section ] = [location.state.grade || "11", location.state.section || "A"]
	const [globalEntries, setGlobalEntries] = useRecoilState(entriesState)
	const students = filterByClass(useRecoilState(studentsState)[0], grade, section)
	const [time, setTime] = useState("M")
	const [date, setDate] = useState(getDate())
	const [detectedStudentId, setDetectedStudentId] = useState("")
	const [entries, setEntries] = useState(
		arrOr(filterEntries(globalEntries, grade, section, date), genEntriesFromStudents(students))
	)

	console.log(entries)
	console.log(students)

	const handleEntryChange = (entryId, entry) => {
		let edEntry = entry
		if(edEntry.attd == "L")
			edEntry.note = "Entered late at " + (new Date()).toLocaleTimeString()

		console.log("fifi", edEntry)

		if(checkSuspend(edEntry.studentId, students)) {
			edEntry.note = "Entered class eventhough student is suspended"
			toast.error(edEntry.name + " is present despite suspension")
		}

		setEntries(editEntry(entryId, edEntry))
		setGlobalEntries(editEntry(entryId, editEntry))
	}

	const handleSave = () => {
		console.log("time for now", time)
		const finalEntries = addTimeToEntries(addDateToEntries(entries, date), time)
		toast.promise(saveEntries(finalEntries, grade, section, date),
			fetchToastOptions)
	}

	useEffect(() => {
		const entry = entries.find(entry => entry.studentId == detectedStudentId)
		if(detectedStudentId == "unknown" || !!entry == false || entry.attd == "T")
			return

		toast.success(entry.name + " present")
		handleEntryChange(entry.entryId, { ...entry, attd: "T" })
		setDetectedStudentId("")
	}, [detectedStudentId, entries])

	
	return (
		<>
		<Block />
		<Container>
			<h1>Today{"'"}s Attendance</h1>
			<FaceButton onDetect={studentId => setDetectedStudentId(studentId)} key={entries} />
			<Space h="1rem" />

			<input width="100px" type="date" value={date}
				onChange={e => setDate(e.target.value)} />
			<Space h="1rem" />
			<Row>
				<TimeButton value={time} onClick={newTime => setTime(newTime)} />
				<FlexGrow />
				<Button size="small" onClick={handleSave}>Save</Button>
			</Row>
			<Space h="1rem" />
			<DayTable entries={entries} onChange={handleEntryChange} />
		</Container>
		</>
	)
}

const filterEntries = (entries, grade, section, date) => {
	return entries.filter(entry =>
		entry.grade == grade &&
		entry.section == section &&
		entry.date == date
	)
}

const arrOr = (arr1, arr2) =>
	arr1.length > 0 ? arr1 : arr2

const checkSuspend = (studentId, students) => {
	return students.find(student => student.studentId == studentId && student.suspended)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	max-width: 500px;
	margin: 0 auto;
`

export default EditDay
