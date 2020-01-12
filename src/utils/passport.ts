import passport from 'passport';
import moment from 'moment';
import { SpotifyProfile } from '../models/Spotify';
import User, { IUser } from '../models/User';
// No type definition found for Spotify strategy, therefore using require to prevent compiler warnings
const SpotifyStrategy = require('passport-spotify').Strategy;

export const setupPassport = () => {
    passport.serializeUser((user: IUser, done) => done(null, user.id));
    
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    
    passport.use(
        new SpotifyStrategy(
            {
                clientID: process.env.SPOTIFY_CLIENT_ID,
                clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
                callbackURL: 'http://localhost:3000/auth/callback'
            },
            (accessToken: string, refreshToken: string, expires_in: number, profile: SpotifyProfile, done: Function) => {
                const { id, username, displayName = null  } = profile;
                User.findOne({ spotifyId: id })
                    .then(user => {
                        const now: Date = moment().toDate();
                        const refreshTokenExpires: Date = moment().add(expires_in, 'seconds').toDate();

                        if(user) {
                            user.username = username;
                            user.displayName = displayName || '';
                            user.accessToken = accessToken;
                            user.refreshToken = refreshToken;
                            user.refreshTokenExpires = refreshTokenExpires;
                            user.modified = now;
                            user.lastActive = now;
                            return user.save();
                        }

                        const newUser = new User({
                            spotifyId: id,
                            username,
                            displayName,
                            accessToken,
                            refreshToken,
                            refreshTokenExpires: refreshTokenExpires,
                            created: now,
                            modified: now,
                            lastActive: now
                        });
                        return newUser.save();
                    })
                    .then(user =>  done(null, user))
                    .catch(err => done(err));
            }
        )
    );
}