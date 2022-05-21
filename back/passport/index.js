const passport = require('passport');
const local = require('./localStrategy')
const jwt = require('./jwtStrategy')
const kakao = require('./kakaoStrategy')

module.exports = () => {
    // req.login 호출시 실행됨.
    passport.serializeUser((user, done) => {
        const {id,email,provider,username} = user
        return done(null, {
            id,
            email,
            provider,
            username

        });
    });

    local()
    jwt()
    kakao()
}