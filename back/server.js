const express = require('express')
const { sequelize } = require('./models')
const passport = require('passport')
const passportConfig = require('./passport')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 4000
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'juchan'

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser(COOKIE_SECRET))

const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')

app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true,
}))

sequelize.sync({ force: false})
.then( ()=>{
    console.log('Connect')
})
.catch( ()=>{
    console.log('Disconect')
})

app.use(passport.initialize()) // passport 장착
passportConfig() // 모든 전략을 모아둔파일을 실행하기.

app.use('/user',userRouter)
app.use('/auth',authRouter)

app.listen(PORT,()=>{
    console.log('server start')
})