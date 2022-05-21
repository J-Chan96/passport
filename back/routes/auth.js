const express = require('express')
const passport = require('passport')
const router = express.Router()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'juchan'

router.get('/kakao', (req, res, next)=>{
    next()
} ,passport.authenticate('kakao'))


router.get('/kakao/callback', passport.authenticate('kakao',{
    failureRedirect:'/'
}),(req,res)=>{
    console.log('유저',req.user)
    const jwt_token = jwt.sign({
        id:req.user.id,
        email:req.user.email,
        nickname:req.user.username,
        provider: req.user.provider,
    },JWT_SECRET)
    
    // res.cookie('AccessToken', jwt_token, {
    //     path: '/',
    //     httpOnly: true,
    //     secure: true,
    //     domain: 'localhost',
    //     maxAge: 24 * 60 * 60 * 1000
    // })  
    res.cookie('token',jwt_token)
    res.redirect(`http://localhost:3000/`)
})

router.get('/getInfo', (req, res, next)=>{
    const { token } = req.cookies

    res.json({
        result:true,
        payload: jwt.decode(token)
    })
})

module.exports = router