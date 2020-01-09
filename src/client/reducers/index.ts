import { combineReducers } from 'redux';

import AppState from '../types/appState';

import { userReducer } from './userReducer';

export default combineReducers<AppState>({
    user: userReducer
});