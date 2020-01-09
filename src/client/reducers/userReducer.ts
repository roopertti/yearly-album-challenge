import { UserState, UserActionTypes, SET_USER, RESET_USER } from '../types/userTypes';

const initialState: UserState = null;

export function userReducer(state = initialState, action: UserActionTypes): UserState {
    switch(action.type) {
        case SET_USER:
            return action.payload;
        case RESET_USER:
            return null;
        default:
            return state;
    }
}