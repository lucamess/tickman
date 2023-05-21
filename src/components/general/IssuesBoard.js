import React from "react"
import styled from "styled-components"

const IssuesBoard = ({ entries }) => {
	const emojis = {
		A: "🇦",
		P: "🇵",
		S: "🇸",
		L: "🇱",
	}

	const issues = {
		A: 0,
		P: 0,
		S: 0,
		L: 0,
	}

	entries.forEach(entry => {
		if(entry.attd == "T")
			return

		issues[entry.attd] += 1
	})

	

	return (
		<Container>
			{Object.keys(issues).map(letter =>
				<Stat key={letter}>{issues[letter]} {emojis[letter]}</Stat>
			)}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	border: 1px solid #ccc;
	padding: 2rem 2rem;
	background: #f0f0ff;
	box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	gap: 2rem;
`
const Stat = styled.div`
	font-size: 1.8rem;
`

export default IssuesBoard
