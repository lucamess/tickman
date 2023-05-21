import React from "react"
import styled from "styled-components"
import { nullFn } from "src/utils"
import { attdEmojis } from "src/config"

const AttdButton = ({ value = "T", onClick = nullFn }) => {
	const values = ["T", "A", "P", "S", "L"]

	return (
		<Container>
			{values.map(curValue => 
			<Value key={curValue} active={curValue == value ? "good" : null}
					onClick={() => onClick(curValue)}>
					{attdEmojis[curValue]}
				</Value>
			)}
		</Container>
	)
}

const Value = styled.div`
	height: 2rem;
	width: 3rem;
	border: 1px solid #ccc;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	background: ${props => props.active ? "teal" : "white"};
`

const Container = styled.div`
	display: flex;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
	width: min-content;
`

export default AttdButton
