import passport from 'passport';
import fbStrategy from 'passport-facebook';
import {users} from './model/User.js';

const FacebookStrategy = fbStrategy.Strategy;

const initializePassportConfig = () => {
    passport.use('facebook', new FacebookStrategy({
        clientID: '617219482683854',
        clientSecret: '5df4578cbe3de577ad84764f609e652e',
        callbackURL: 'https://27fb-190-18-86-210.ngrok.io/auth/facebook/callback',
        profileFields: ['emails', 'photos', 'displayName']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await users.findOne({email:profile.emails[0].value});
            let fbProfile = {
                name: profile.displayName,
                email: profile.emails[0].value,
                picture: profile.photos[0].value
            }
            console.log(fbProfile);
            done(null, user, fbProfile);
        } catch(error) {
            done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null,user._id)
    })
    passport.deserializeUser((id,done) => {
        users.findById(id, done);
    })
}

export default initializePassportConfig;