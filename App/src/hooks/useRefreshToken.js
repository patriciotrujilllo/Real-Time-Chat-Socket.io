import { refreshToken } from "../services/auth";
import { useAuth } from "./useAuth";

const useRefreshToken = () => {
    const {updateAuth} = useAuth()

    const refresh = async() => {

        const result = await refreshToken()
        updateAuth({accessToken: result.accessToken})
        return result.accessToken
    }
    return refresh
}

export default useRefreshToken