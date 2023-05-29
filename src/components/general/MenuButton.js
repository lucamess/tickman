import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { Select } from "comp"
import { links } from "src/config"

const MenuButton = () => {
	const navigate = useNavigate()
	const handleChange = e => {
		if(e.target.value == "menu")
			return
		navigate(links[e.target.value])
	}

	return (
		<SelectBare onChange={handleChange}>
			<option value="menu">☰ Menu</option>
			<option value="adminHome">Admin</option>
			<option value="teacherHome">Teacher</option>
		</SelectBare>
	)
}

const SelectBare = styled(Select)`
	-moz-appearance: none;
	-webkit-appearance: none;
	background: var(--primary);
	color: #eee;
	width: min-content;
	font-weight: bold;
	padding-left: 1rem;
`

export default MenuButton
