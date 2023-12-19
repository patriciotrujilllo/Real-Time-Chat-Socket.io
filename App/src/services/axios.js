import axios from 'axios'

const PORT = import.meta.env.PORT

export const instancePrivate = axios.create({
	baseURL: PORT,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
})

export const instancePublic = axios.create({
	baseURL: PORT,
	headers: { 'Content-Type': 'application/json' }
})

export const instanceRegister = axios.create({
	baseURL: PORT,
	headers: {  'Content-Type': 'multipart/form-data' }
})

export const instanceRefresh = axios.create({
	baseURL: PORT,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
})