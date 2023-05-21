import React from "react"
import styled, { css } from "styled-components"
import { minDate, maxDate, dateToHeader, fromToDate, displayAttdFromEntries } from "src/utils"

const AttdTable = ({ students, entries, onClick }) => {
	const startDate = minDate(entries.map(entry => entry.date))
	const endDate = maxDate(entries.map(entry => entry.date))

	return (
		<Container>
			<Column>
				<Cell width="200px"><strong>Students</strong></Cell>
				{students.map(student =>
				<Cell key={student.studentId} width="200px" style={{ cursor: "pointer" }}
						onClick={onClick(student.studentId)}>{student.name}</Cell>
				)}
			</Column>
			<Scrollable>
				{fromToDate(startDate, endDate, (date) => 
					<Column key={date}>
						<Cell center="true"><strong>{dateToHeader(date)}</strong></Cell>
						{students.map((student) => 
							<Cell key={student.studentId} center="true">
								{displayAttdFromEntries(entries, student.studentId, date)}
							</Cell>
						)}
					</Column>
				)}
			</Scrollable>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	border: 1px solid #ccc;
	padding: 0.5rem;
	border-radius: 8px;
	box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
`
const Column = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	min-width: 100px;
`
const Cell = styled.div`
	display: flex;
	height: 2rem;
	width: ${props => props.width || "auto"};
	flex-grow: 1;
	${props => props.center && css`
		justify-content: center;
	`}
`
const Scrollable = styled.div`
	overflow-x: scroll;
	display: flex;
	flex-grow: 1;
`

export default AttdTable

