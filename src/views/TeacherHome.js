import React, { useState, useEffect } from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { Space, Row, Select, Button, MenuButton } from "comp"
import { grades, sections, links } from "src/config"
import { entriesState } from "src/states"
import { fetchEntries } from "src/api"

const fetchToastOptions = {
	loading: "Loading...",
	success: <strong>Data loaded</strong>,
	error: <strong>Connection problem</strong>,
}

const TeacherHome = () => {
	const navigate = useNavigate()
	const [entries, setEntries] = useRecoilState(entriesState)
	const [selGrade, setSelGrade] = useState("11")
	const [selSection, setSelSection] = useState("A")

	const handleViewAttd = () => {
		navigate(links.viewAttd, {
			state: {
				grade: selGrade, section: selSection,
			}
		})
	}

	const handleFillAttd = () => {
		navigate(links.editDay, {
			state: {
				grade: selGrade, section: selSection,
			}
		})
	}

	useEffect(() => {
		if(entries.length == 0)
			toast.promise(
				fetchEntries()
					.then(entries => {
						setEntries(entries)
					}),
				fetchToastOptions)
	}, [])

	return (
		<>
		<Block />
		<Container>
			<MenuButton />
			<Space h="4rem" />
			<Title>Good morning, teacher.</Title>

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

			<Space h="1rem" />
			<Row center="true">
				<Button onClick={handleViewAttd}>View</Button>
				<Space w="1rem" />
				<Button type="outline" onClick={handleFillAttd}>Fill</Button>
			</Row>
		</Container>
		</>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem;
	max-width: 500px;
	margin: 0 auto;
`

const Block = styled.div`
	height: 50px;
	background: teal;
`

const Title = styled.h1`
	color: #212121;
	text-align: center;
`

export default TeacherHome
