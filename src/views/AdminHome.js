import React, { useEffect } from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { Space, Button, MenuButton } from "comp"
import { links } from "src/config"
import { fetchEntries } from "src/api"
import { entriesState, authState } from "src/states"

const fetchToastOptions = {
	loading: "Loading...",
	success: <strong>Data loaded</strong>,
	error: <strong>Connection problem</strong>,
}

const AdminHome = () => {
	const navigate = useNavigate()
	const [entries, setEntries] = useRecoilState(entriesState)
	const authLoggedIn = useRecoilState(authState)[0]

	console.log("entries at adminHome", entries)

	useEffect(() => {
		if(entries.length == 0)
			toast.promise(
				fetchEntries()
					.then(entries => {
						setEntries(entries)
					}),
				fetchToastOptions)

		if(authLoggedIn == false)
			navigate(links.adminLogin)
	}, [])

	return (
		<>
		<Block />
		<Container>
			<MenuButton />
			<Space h="2rem" />
			<Title>Administrator page <Small>(dedicated to Mr. Tesfaye ❤️)</Small></Title>
			<Space h="4rem" />
			<Button type="outline"
				onClick={() => navigate(links.viewIssues)}>View Records</Button>
			<Space h="1rem" />
			<Button type="outline"
				onClick={() => navigate(links.viewAttd)}>View Attendance</Button>
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

const Title = styled.h1`
	color: #212121;
	text-align: center;
`

const Small = styled.span`
	font-size: 1.1rem;
`

const Block = styled.div`
	height: 50px;
	background: teal;
`

export default AdminHome
