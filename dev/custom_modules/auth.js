
// modules
const session = require('express-session')
const passport = require('passport')
const NaverStrategy = require('passport-naver').Strategy
const secret = require('./secret.js')


passport.serializeUser( (user, done) => done(null, user) )
passport.deserializeUser( (obj, done) => done(null, obj) )

passport.use(
  new NaverStrategy({
    clientID: secret.naver.id,
    clientSecret: secret.naver.secret,
    callbackURL: '/login/callback'
  },
  (accessToken, refreshToken, profile, done) => {
  	process.nextTick( () => {

  		user = {
        id: profile.emails[0].value.split('@')[0],
  			name: profile.displayName,
  			provider: 'naver',
  			token: profile.id
  		}
  		return done(null, user)
	  })
  })
)

module.exports = {
  session,
  passport
}
