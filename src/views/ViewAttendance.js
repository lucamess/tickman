import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useLocation, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { grades, sections, links } from "src/config"
import { Select, Space, AttdTable, Block } from "comp"
import { entriesState, studentsState } from "src/states"

const ViewAttendance = () => {
	const entries = useRecoilState(entriesState)[0]
	const students = useRecoilState(studentsState)[0]
	const navigate = useNavigate()
	const location = useLocation()

	const [selGrade, setSelGrade] = useState(location.state?.grade || "12")
	const [selSection, setSelSection] = useState(location.state?.section || "G")
	const [selStudents, setSelStudents] = useState(students)

	useEffect(() => {
		setSelStudents(students.filter(student =>
			student.grade == selGrade && student.section == selSection
		))
	}, [selGrade, selSection])

	const handleStudent = studentId => () => {
		navigate(links.studentProfile, { state: {
			studentId
		} })
	}

	return (
		<>
		<Block />
		<Container>
			<h1>View Attendance</h1>
			
			<Select value={selGrade} onChange={e => setSelGrade(e.target.value)}>
				{grades.map(grade =>
					<option key={grade} value={grade}>Grade {grade}</option>
				)}
			</Select>

			<Space h="0.5rem" />
			<Select value={selSection} onChange={e => setSelSection(e.target.value)}>
				{sections.map(section =>
					<option key={section} value={section}>Section {section}</option>
				)}
			</Select>

			<Space h="2rem" />
			{entries.length == 0 ? <Nothing>No data here</Nothing> :
			<AttdTable onClick={handleStudent} entries={entries} students={selStudents} />}
		</Container>
		</>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
`
const Nothing = styled.h1`
	color: #545454;
	text-align: center;
`

export default ViewAttendance
