import express from 'express';
import passport from 'passport';

import { User as UserReduxType } from '../client/types/userTypes';
import { IUser } from '../models/User';

const AuthRouter: express.Router = express.Router();

/* Spotify User API scopes */
const SpotifyScopes = ['user-read-email', 'user-read-private'];

AuthRouter.get('/', passport.authenticate('spotify', { scope: SpotifyScopes }));
AuthRouter.get('/callback', passport.authenticate('spotify', { failureRedirect: '/404' }), (req, res) => {
    const { id, spotifyId, username, displayName } = req.user as IUser;
    const userData: UserReduxType = { id, spotifyId, username, displayName };
    res.send(userData);
});
AuthRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

export default AuthRouter;