import axios from 'axios'

const PORT = 'http://localhost:4000'

export const instancePrivate = axios.create({
    baseURL: PORT,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})

export const instancePublic = axios.create({
    baseURL: PORT,
    headers: { 'Content-Type': 'application/json' }
})

export const instanceRefresh = axios.create({
    baseURL: PORT,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})