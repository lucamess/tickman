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
	const [ grade, section ] = [location.state.grade || "12", location.state.section || "G"]
	const [, setGlobalEntries] = useRecoilState(entriesState)
	const students = filterByClass(useRecoilState(studentsState)[0], grade, section)
	const [entries, setEntries] = useState(genEntriesFromStudents(students))
	const [time, setTime] = useState("M")
	const [date, setDate] = useState(getDate())
	const [detectedStudentId, setDetectedStudentId] = useState("")

	const handleTable = (entryId, edEntry) => {
		setEntries(editEntry(entryId, edEntry))
		setGlobalEntries(editEntry(entryId, editEntry))
	}

	useEffect(() => {
		const entry = entries.find(entry => entry.studentId == detectedStudentId)
		if(detectedStudentId == "unknown" || !!entry == false || entry.attd == "T")
			return

		toast.success(entry.name + " present")
		setEntries(editEntry(entry.entryId, { attd: "T" }))
		setDetectedStudentId("")
	}, [detectedStudentId, entries])

	const handleSave = () => {
		console.log("time for now", time)
		const finalEntries = addTimeToEntries(addDateToEntries(entries, date), time)
		toast.promise(saveEntries(finalEntries, grade, section, date),
			fetchToastOptions)
	}

	
	return (
		<>
		<Block />
		<Container>
			<h1>Today{"'"}s Attendance</h1>
			<FaceButton onDetect={studentId => setDetectedStudentId(studentId)} key={entries} />
			<Space h="1rem" />

			<input width="100px" type="date" value={date} onChange={e => setDate(e.target.value)} />
			<Space h="1rem" />
			<Row>
				<TimeButton value={time} onClick={newTime => setTime(newTime)} />
				<FlexGrow />
				<Button size="small" onClick={handleSave}>Save</Button>
			</Row>
			<Space h="1rem" />
			<DayTable entries={entries} onChange={handleTable} />
		</Container>
		</>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
`

export default EditDay
