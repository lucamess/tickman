import React from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { RecoilRoot } from "recoil"
import { colors, routePathList } from "./config"

import EditDay from "src/views/EditDay"
import StudentProfile from "src/views/StudentProfile"
import ViewIssues from "src/views/ViewIssues"
import ViewAttendance from "src/views/ViewAttendance"
import TeacherHome from "src/views/TeacherHome"
import AdminHome from "src/views/AdminHome"

const GlobalStyle = createGlobalStyle`
	:root {
		--primary: ${props => props.theme.primary};
	}

	body {
		padding: 0;
		margin: 0;
		border: 0;
		outline: 0;
		// background: #f0f0ff;
	}

	* {
		box-sizing: border-box;
		font-family: sans-serif;
	}
`

const App = () => {
	return (
		<RecoilRoot>
		<ThemeProvider theme={colors}>
		<HashRouter>
			<GlobalStyle />
			<Toaster />
			<Routes>
				<Route path={routePathList.teacherHome}
					element={<TeacherHome />} exact />

				<Route path={routePathList.editDay}
					element={<EditDay />} />

				<Route path={routePathList.studentProfile}
					element={<StudentProfile />} />

				<Route path={routePathList.viewIssues}
					element={<ViewIssues />} />

				<Route path={routePathList.viewAttd}
					element={<ViewAttendance />} />

				<Route path={routePathList.adminHome}
					element={<AdminHome />} />
			</Routes>
		</HashRouter>
		</ThemeProvider>
		</RecoilRoot>
	)
}

export default App

