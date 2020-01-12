import { RootState } from '../reducers';
import { User, SET_USER, RESET_USER, UserActionTypes, UserState } from '../types/userTypes';
import { Thunk } from '../types/thunk';

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

export const authenticateUser = (): Thunk => async dispatch => {
    fetch('/auth', { mode: 'no-cors'})
        .then((res: Response) => res.json())
        .then((user: User) => dispatch(setUser(user)))
        .catch(err => {
            console.log(err);
            dispatch(resetUser());
        });
}

