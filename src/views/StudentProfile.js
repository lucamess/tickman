import React from "react"
import styled from "styled-components"
import { useRecoilState } from "recoil"
import { useLocation } from "react-router-dom"
import { studentsState, entriesState } from "src/states"
import { IssuesBoard, Button, Block } from "comp"
import { findMostCommonDay, getImageLink } from "src/utils"

const StudentProfile = () => {
	const location = useLocation()
	const studentId = location.state.studentId || 1
	const student = useRecoilState(studentsState)[0]
		.find(student => student.studentId == studentId)
	const entries = useRecoilState(entriesState)[0]
		.filter(entry => entry.studentId == studentId)
	const mostCommonDay = findMostCommonDay(entries)
	const notes = entries.filter(({ note }) => !!note == true)
	const recAction = getRecommendedAction(entries)

	return (
		<>
		<Block />
		<Container>
			<h1>{student.name} - {student.grade}{student.section}</h1>

			<Button onClick={() => window.open("tel:" + student.phonenumber)}>
				Call: {student.phonenumber}
			</Button>

			<Subtitle>Student record</Subtitle>
			<IssuesBoard entries={entries} />

			<Subtitle>
				Most common day: <span style={{ color: "teal" }}>{mostCommonDay}</span>
			</Subtitle>

			<Subtitle>
				Recommended action: <span style={{ color: recAction.color }}>
					{recAction.message}
				</span>
			</Subtitle>

			<Subtitle>Recent notes</Subtitle>
			{notes.length == 0 ? <Nothing>No notes recorded</Nothing> :
				notes.map(({ note, img, entryId }) =>
				<Note key={note}>
					{note}&nbsp;
					{img ? <a href={getImageLink(entryId)}>View Image</a> : null}
				</Note>
				)
			}
			
		</Container>
		</>
	)
}

const getRecommendedAction = (entries) => {
	const issues = {
		A: 0, P: 0, S: 0, L: 0,
	}

	const goodColor = "#7AA874"
	const warnColor = "#F97B22"
	const hardColor = "#F45050"

	const actions = [
		{
			color: warnColor,
			message: "Warn the student about his attendance",
			criteria: ["A", 3], },
		{
			color: hardColor,
			message: "Talk with parents about this case",
			criteria: ["A", 5], },
	]

	let action = { color: goodColor, message: "Fair, just encouragement" }

	entries.forEach(entry => {
		if(entry.attd == "T")
			return
		issues[entry.attd] += 1
	})

	actions.forEach(curAction => {
		if(issues[curAction.criteria[0]] >= curAction.criteria[1]) {
			action = curAction
		}
	})

	return action
	
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	max-width: 500px;
	margin: 0 auto;
`
const Subtitle = styled.h2`
	color: #363636;
`
const Note = styled.div`
	font-size: 1.2rem;
	border: 1px solid #ddd;
	box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
	padding: 1rem 2rem;
	margin: 4px;
	border-radius: 8px;
`
const Nothing = styled.div`
	color: teal;
	font-size: 1.6rem;
	font-weight: bold;
	text-align: center;
`

export default StudentProfile
