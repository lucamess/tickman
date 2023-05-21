import React from "react"

const CameraIcon = ({ size = "1rem", style, onClick }) =>
	<svg xmlns="http://www.w3.org/2000/svg" height={size} style={style} onClick={onClick} viewBox="0 96 960 960" width={size}><path d="M479.5 790q72.5 0 121.5-49t49-121.5q0-72.5-49-121T479.5 450q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5 0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5ZM140 936q-24 0-42-18t-18-42V363q0-23 18-41.5t42-18.5h147l73-87h240l73 87h147q23 0 41.5 18.5T880 363v513q0 24-18.5 42T820 936H140Zm680-60V363H645l-73-87H388l-73 87H140v513h680ZM480 620Z"/></svg>

export default CameraIcon

