const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'juchan'

module.exports = {
    sign: (user) => {
        const payload = {
            email: user.email,
            nickname: user.nickname
        }
        console.log(payload)
        return jwt.sign(payload, JWT_SECRET,{
            algorithm:'HS256',
            // expiresIn:'1h',
        })
    },
}