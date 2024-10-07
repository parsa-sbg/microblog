import jwt from 'jsonwebtoken'

type payloadType = {
    username: string
}

export const generateToken = (payload: payloadType) => {

    const secretKey = process.env.PRIVATEKEY

    if (!secretKey) throw new Error('privete key is not defined')

    try {

        const token = jwt.sign(payload, secretKey, {
            expiresIn: '168h'
        })
        return token

    } catch (err) {
        console.error('token generation error. error => ', err)
    }
}