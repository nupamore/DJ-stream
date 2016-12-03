
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
  		//console.log("profile=");
  		//console.log(profile);
  		// data to be saved in DB
  		user = {
  			name: profile.displayName,
  			email: profile.emails[0].value,
  			username: profile.displayName,
  			provider: 'naver',
  			naver: profile._json
  		}
      console.log( user )

  		return done(null, profile)
	  })
  })
)

module.exports = {
  session,
  passport
}
