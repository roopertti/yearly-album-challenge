import { User, SET_USER, RESET_USER, UserActionTypes } from '../types/userTypes';

export function setUser(user: User): UserActionTypes {
    return {
        type: SET_USER,
        payload: user
    };
}

export function resetUser(): UserActionTypes {
    return {
        type: RESET_USER
    };
}