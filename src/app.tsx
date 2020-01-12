import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { rootReducer, RootState} from './client/reducers';
import { StaticRouter } from 'react-router-dom';
import { StaticContext } from 'react-router';
import App from './client/App';
import { html } from './utils/html';
import { IUser } from './models/User';
import { User as UserReduxType } from './client/types/userTypes';
import { setUser } from './client/actions/userActions';

/* Import config */
import { setupPassport } from './utils/passport';

/* Routes */
import AuthRoutes from './routes/AuthRoutes';

/* Express app config */
const app = express();
dotenv.config();

const requiredEnvVars = ['SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_SECRET', 'SESSION_SECRET', 'MONGO_URI'];
const missingEnvVars = requiredEnvVars.filter((envVar) => !Object.keys(process.env).includes(envVar) || !process.env[envVar]);

if(missingEnvVars.length > 0) {
    console.error(`Environment variables missing or defined as empty, define them in .env file. Missing environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(0);
}

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET || ''
}));
app.use(express.static('dist'));

/* MongoDB/Mongoose config */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI || '', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connection succesful');
});

/* Passport config */
app.use(passport.initialize());
app.use(passport.session());
setupPassport();

/* Routes */
app.use('/auth', AuthRoutes);

app.get('/*', (req, res) => {
    const context: StaticContext = {};

    const store = createStore(rootReducer);

    /* If user session is found, update user data to Redux store */
    if(req.user) {
        const { id, spotifyId, username, displayName } = req.user as IUser;
        const userState: UserReduxType = { id, spotifyId, username, displayName };
        store.dispatch(setUser(userState));
    }

    const preloadedState: RootState = store.getState();

    const body = renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );

    if(context.statusCode === 404) {
        res.status(404);
    }

    res.send(html(body, preloadedState));
});

export default app;