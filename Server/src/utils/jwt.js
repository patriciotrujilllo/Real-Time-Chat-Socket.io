import jsonwebtoken from 'jsonwebtoken'

export const createAccessToken = (user) => {
    const expiration = new Date()
    expiration.setHours(expiration.getHours() + 2)
    return jsonwebtoken.sign(_tokenPayload({user,expiration}),process.env.SIGN_TOKEN)
}

export const createRefreshToken = (user) => {
    const expiration = new Date()
    expiration.setMonth(expiration.getMonth() + 1)
    return jsonwebtoken.sign(_tokenPayload({user,expiration}),process.env.SIGN_TOKEN)
}

export const decodeToken = (token) => {
    return jsonwebtoken.verify(token,process.env.SIGN_TOKEN)
}

export const _tokenPayload = ({user,expiration,tokenType = 'token'}) =>{
    return {
        tokenType,
        user,
        iat: new Date().getTime(),
        exp: expiration.getTime()
    }
}