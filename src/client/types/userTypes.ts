export interface User {
    spotifyId: string;
    username: string;
    displayName: string;
}

export type UserState = User | null;

export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';

interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
}

interface ResetUserAction {
    type: typeof RESET_USER;
}

export type UserActionTypes = SetUserAction | ResetUserAction;