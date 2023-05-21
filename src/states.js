import { atom } from "recoil"

const sampleStudents = [
	{ studentId: 1, name: "Amanuel", grade: "12", section: "G", phonenumber: "mom", face: "" },
	{ studentId: 2, name: "Manuhie", grade: "12", section: "G", phonenumber: "dad", face: "" },
	{ studentId: 3, name: "Leul", grade: "12", section: "G", phonenumber: "gashe", face: "" },
	{ studentId: 4, name: "Yosef", grade: "12", section: "G", phonenumber: "abetu", face: "" },
	{ studentId: 5, name: "Hana", grade: "12", section: "E", phonenumber: "father", face: "" },
	{ studentId: 6, name: "Mahlet", grade: "12", section: "E", phonenumber: "ayfelegm", face: "" },
	{ studentId: 7, name: "Meron", grade: "12", section: "E", phonenumber: "AtoBiniam", face: "" },
	{ studentId: 8, name: "Rediet", grade: "12", section: "D", phonenumber: "mother", face: "" },
	{ studentId: 9, name: "Kidus", grade: "12", section: "D", phonenumber: "sirak", face: "" },
]

const sampleEntries = [
	{ entryId: 1, studentId: 1, name: "Euel Mekonnen", grade: "12", section: "G", 
		attd: "T", time: "M", date: "2023-05-19", img: "", note: "",  },
	{ entryId: 2, studentId: 1, name: "Euel Mekonnen", grade: "12", section: "G", 
		attd: "T", time: "A", date: "2023-05-19", img: "", note: "",  },

	{ entryId: 3, studentId: 1, name: "Euel Mekonnen", grade: "12", section: "G", 
		attd: "T", time: "M", date: "2023-05-18", img: "", note: "",  },
	{ entryId: 4, studentId: 1, name: "Euel Mekonnen", grade: "12", section: "G", 
		attd: "T", time: "A", date: "2023-05-18", img: "", note: "",  },

	{ entryId: 5, studentId: 1, name: "Euel Mekonnen", grade: "12", section: "G", 
		attd: "T", time: "M", date: "2023-05-17", img: "", note: "",  },
	{ entryId: 6, studentId: 1, name: "Euel Mekonnen", grade: "12", section: "G", 
		attd: "T", time: "A", date: "2023-05-17", img: "", note: "",  },

]


export const studentsState = atom({
	key: "students",
	default: sampleStudents,
})

export const entriesState = atom({
	key: "entries",
	default: [],
})

