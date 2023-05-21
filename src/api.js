import axios from "axios"
import { sleep } from "src/utils"
import { serverBaseUrl } from "src/config"

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

const sendRequest = (url, obj = {}) => {
	const bodyFormData = new FormData()
	Object.keys(obj).forEach(key => {
		bodyFormData.append(key, JSON.stringify(obj[key]))
	})

	return axios({
		method: "post",
		url: serverBaseUrl + url,
		data: bodyFormData,
		headers: { "Content-Type": "multipart/form-data" },
	})
		.then(response => {
			console.log("rizzed", response.data)
			return response.data
		})
		.catch(err => {
			console.log("cheger on network", err)
			return ({ success: false, message: "NETWORK_ERROR" })
		})
		.then(({ success, message, result }) => {
			if(success == false) {
				throw message
			} else {
				return result
			}
		})
}

export const saveEntries = (entries, grade, section, date) => {
	/// DONT FORGET to refresh the local state after saving on the server
	console.log("save entries for", entries, grade, section, date)
	return sendRequest("save-entries.php", { entries, grade, section, date })
}
export const fetchEntries = () => {
	return sendRequest("get-entries.php")
}


