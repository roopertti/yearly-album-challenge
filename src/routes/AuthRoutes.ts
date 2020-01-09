import express from 'express';
import passport from 'passport';

const AuthRouter: express.Router = express.Router();

/* Spotify User API scopes */
const SpotifyScopes = ['user-read-email', 'user-read-private'];

AuthRouter.get('/', passport.authenticate('spotify', { scope: SpotifyScopes }));
AuthRouter.get('/callback', passport.authenticate('spotify', { failureRedirect: '/404' }), (req, res) => {
    res.redirect('/app');
});
AuthRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

export default AuthRouter;