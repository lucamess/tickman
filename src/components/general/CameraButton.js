import React, { useRef } from "react"
import styled from "styled-components"
import CameraIcon from "src/icons/CameraIcon"

const CameraButton = ({ onClick }) => {
	const inputRef = useRef()
	const handleClick = () => {
		inputRef.current.click()
	}
	return (
		<Container>
			<CameraIcon style={{ cursor: "pointer" }} onClick={handleClick} size="2rem" />
			<Invisible>
				<input ref={inputRef} type="file" accept="image/*;capture=camera"
					onChange={e => {onClick(e.target.files[0]); console.log("file-selected", e.target.files[0])}}/>
			</Invisible>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	padding: 4px;
`
const Invisible = styled.div`
	visibility: hidden;
`

export default CameraButton
