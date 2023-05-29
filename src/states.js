import { atom } from "recoil"

const sampleStudents = [
	{ studentId: 1, name: "Aman Redi", grade: "11", section: "A", phonenumber: "0911203040", face: "" },
	{ studentId: 2, name: "Aymen Kedir", grade: "11", section: "A", phonenumber: "0911203040", face: "" },
	{ studentId: 3, name: "Biruk Million", grade: "11", section: "A", phonenumber: "0911203040", face: "" },
	{ studentId: 4, name: "Amanuel Asheber", grade: "11", section: "B", phonenumber: "0911203040", face: "" },
	{studentId:5,name:"Kaleb Dembelash",grade: "11",section:"B",phonenumber:"0911203040", face: "" },
	{studentId:6,name:"Kirubel Belayneh",grade: "11",section: "B",phonenumber:"0911203040",face: "" },
]


export const studentsState = atom({
	key: "students",
	default: sampleStudents,
})

export const entriesState = atom({
	key: "entries",
	default: [],
})

export const authState = atom({
	key: "auth",
	default: false,
})

