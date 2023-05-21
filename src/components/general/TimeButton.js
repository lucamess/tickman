import React from "react"
import styled from "styled-components"
import { nullFn } from "src/utils"

const TimeButton = ({ value = "M", onClick = nullFn }) => {
	const values = ["M", "A", "Both"]

	return (
		<Container>
			{values.map(curValue => 
			<Value key={curValue} active={curValue == value ? "good" : null}
					onClick={() => onClick(curValue)}>
					{curValue}
				</Value>
			)}
		</Container>
	)
}

const Value = styled.div`
	height: 2rem;
	padding: 1rem;
	font-weight: bold;
	border: 1px solid #ccc;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	background: ${props => props.active ? "teal" : "white"};
	color: ${props => props.active ? "white" : "black"};
`

const Container = styled.div`
	display: flex;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
	width: min-content;
`

export default TimeButton
