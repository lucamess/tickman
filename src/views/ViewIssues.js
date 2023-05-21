import React, { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { Select, Space, IssuesBoard, Block } from "comp"
import { entriesState, studentsState } from "src/states"
import { sortWithIssues, calculateNOfIssues } from "src/utils"
import { links } from "src/config"

const ViewIssues = () => {
	const [dateRange, setDateRange] = useState()
	const navigate = useNavigate()
	const entries = useRecoilState(entriesState)[0]
	const students = useRecoilState(studentsState)[0]
	const studentsWithRecord = Array.from(students).sort(sortWithIssues(entries)).slice(0, 5)
	const openStudent = studentId => () => {
		navigate(links.studentProfile, { state: {
			studentId
		} })
		console.log("open this student", studentId)
	}

	return (
		<>
		<Block />
		<Container>
			<h1>View records</h1>

			<Select onChange={e => setDateRange(e.target.value)}>
				<option value="today">Today</option>
				<option value="week">This week</option>
				<option value="month">This month</option>
				<option value="all">All</option>
			</Select>

			<Space h="1rem" />
			<IssuesBoard entries={entries} />

			<Space h="1rem" />
			<Subtitle>Students with records</Subtitle>
			{studentsWithRecord.map(student =>
				<Student key={student.studentId} onClick={openStudent(student.studentId)}>
					{student.name} - &nbsp;
					<strong style={{ color: "teal" }}>
						{calculateNOfIssues(student.studentId, entries)}
					</strong>
				</Student>
			)}
		</Container>
		</>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
`
const Subtitle = styled.h2`
	color: #363636;
`
const Student = styled.div`
	font-size: 1.1rem;
	cursor: pointer;
	border: 1px solid #ddd;
	box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
	padding: 1rem 2rem;
	margin: 4px;
	border-radius: 8px;
`

export default ViewIssues

