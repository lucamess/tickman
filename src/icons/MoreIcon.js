import React from "react"

const MoreIcon = ({ size = "1rem", style, onClick }) => {
	return <svg xmlns="http://www.w3.org/2000/svg" height={size} onClick={onClick} style={style} viewBox="0 96 960 960" width={size}><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z"/></svg>
}

export default MoreIcon
