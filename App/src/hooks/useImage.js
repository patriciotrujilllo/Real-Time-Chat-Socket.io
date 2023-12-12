import { useEffect, useState } from "react"
import useAxiosRefresh from "./useAxiosRefresh"

const useImage = () => {
	const [urlImage, setUrlImage] = useState('')
	const [contactsUrlImages, setcontactsUrlImages] = useState('')
	const axios = useAxiosRefresh()

	useEffect(()=> {
		(async()=>{
			const url = userImage()
			const contactsUrl = AlluserImage()
			setUrlImage(url)
			setcontactsUrlImages(contactsUrl)
		})()
	},[])

	const userImage = async() => {
		const img = axios.get('/user/image')

		return img
	}

	const AlluserImage = async() => {
		const img = axios.get('/user/contactsImage')

		return img
	}

	return {
		userImage,
		AlluserImage,
		urlImage,
		contactsUrlImages
	}
}

export default useImage