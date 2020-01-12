import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers';

export type Thunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    null,
    Action<string>
>;