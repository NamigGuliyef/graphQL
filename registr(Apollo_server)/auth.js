import jwt from 'jsonwebtoken'
import { jwt_secret } from './index.js'
const AuthMiddleWare = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.send('Token yoxdur!')
    }
    jwt.verify(token, jwt_secret, (err, user) => {
        if (err) {
            return res.send('Token yanlisdir!')
        }
        req.user = user
        next()
    })
}

export default AuthMiddleWare
