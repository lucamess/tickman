import React, { useState } from "react"
import styled from "styled-components"
import { AttdButton, Input, CameraButton } from "comp"
import MoreIcon from "src/icons/MoreIcon"
import LessIcon from "src/icons/LessIcon"
import { toggle } from "src/utils"

const DayTable = ({ entries, onChange }) => {
	return (
		<Container>
			{entries.map(entry =>
				<EntryRow key={entry.name}
					entry={entry} onChange={onChange} />
			)}
		</Container>
	)
}

const EntryRow = ({ entry, onChange }) => {
	const [showMore, setShowMore] = useState(false)
	const ExpandIcon = showMore ? LessIcon : MoreIcon
	return (
		<Row key={entry.name}>
			<Cell fill="true">
				{entry.name}
			</Cell>
			<Cell>
				<AttdButton value={entry.attd}
					onClick={(attd) => onChange(entry.entryId, { ...entry, attd })} />
				<ExpandIcon size="2rem" style={{ cursor: "pointer" }} onClick={() => setShowMore(toggle)} />
			</Cell>
			{showMore &&
			<Cell fill="true" style={{ padding: "0.5rem 1rem" }}>
				<Input placeholder="Type note here..."
					onChange={e => onChange(entry.entryId, { note: e.target.value })}/>
				<br />
				<CameraButton onClick={file => onChange(entry.entryId, { img: file })} />
			</Cell>
			}
		</Row>
	)
}


const Container = styled.div`
`

const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
`
const Cell = styled.div`
	display: flex;
	align-items: center;
	flex-grow: ${props => props.fill ? "1" : "0"};
`

export default DayTable
