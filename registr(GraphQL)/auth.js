import jwt from 'jsonwebtoken'

const userMiddleWare = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        throw new Error('Token yoxdur!')
    }
    jwt.verify(token, 'graphQL', (err, user) => {
        if (err) {
            throw new Error('Token yanlisdir!')
        }
        req.user = user
        next()
    })
}

export default userMiddleWare