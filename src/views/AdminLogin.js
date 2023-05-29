import React, { useState } from "react"
import toast from "react-hot-toast"
import styled from "styled-components"
import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { Block, MenuButton, Space, Input, Button } from "comp"
import { authConfig, links } from "src/config"
import { authState } from "src/states"

const AdminLogin = () => {
	const [email, setEmail] = useState("admin")
	const [password, setPassword] = useState("admin")
	const navigate = useNavigate()
	const [, setAuth] = useRecoilState(authState)

	const handleSubmit = () => {
		if(email == authConfig.email && password == authConfig.password) {
			setAuth(true)
			navigate(links.adminHome)
		} else {
			toast.error("Incorrect admin email or password")
		}
	}

	return (
		<>
		<Block />
		<Container>
			<MenuButton />
			<Space h="4rem" />
			<Title>Enter your admin email and password to get in</Title>

			<Space h="1rem" />
			<Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
			<Space h="1rem" />
			<Input placeholder="Password" type="password"
				value={password} onChange={e => setPassword(e.target.value)} />

			<Space h="2rem" />
			<Button onClick={handleSubmit}>Login</Button>
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

export default AdminLogin
