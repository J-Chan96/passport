const passport = require('passport');
const {Strategy:KakaoStrategy} = require('passport-kakao')
const  {User}  = require('../models')

const passportKakao = {
    clientID:'3752ab42f2727f6a20ffde67ecfae517', 
    callbackURL: '/auth/kakao/callback'
}

const passportVerify = async(accessToken,refreshToken,profile,done) => {
    // console.log('kakao',profile)
    try {
        // 유저 아이디로 일치하는 유저 검색
        const user = await User.findOne( { where: {email:profile._json.kakao_account.email, provider: "kakao"}  } )
        
        // 검색된 유저 데이터가 없으면 에러 표시
        if(user){
            done(null,user)
        } else {
            const user = await User.create({
                email: profile._json.kakao_account.email,
                nickname: profile.username,
                // nick: profile.displayName,
                provider: "kakao",
              });
              done(null, user);
            }
        } catch (e){
            console.log(e)
            return done(e)
        }
    }


module.exports = () => {
    passport.use('kakao', new KakaoStrategy(passportKakao,passportVerify))
}